const prisma = require('../db');
const { getTodayDay, getCurrentTimeInHHMM, getLocalDayBounds, STANDARD_PERIODS } = require('../utils/date');
const { parseExcelTimetable, splitPeriods, getNormalizedWeekday } = require('../utils/excelParser');

const upsertTimetable = async (req, res) => {
  const { classroomId, day, periodNo, startTime, endTime, facultyName, subjectName } = req.body;

  if (!classroomId || !day || !periodNo || !startTime || !endTime || !facultyName || !subjectName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const normalizedDay = getNormalizedWeekday(day) || day || 'Monday';

  try {
    const classroom = await prisma.classroom.findUnique({
      where: { id: parseInt(classroomId) },
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Check if entry already exists
    const existing = await prisma.timetable.findFirst({
      where: {
        classroomId: parseInt(classroomId),
        day: normalizedDay,
        periodNo: parseInt(periodNo),
      },
    });

    let timetable;
    if (existing) {
      timetable = await prisma.timetable.update({
        where: { id: existing.id },
        data: {
          startTime,
          endTime,
          facultyName,
          subjectName,
        },
      });
    } else {
      timetable = await prisma.timetable.create({
        data: {
          classroomId: parseInt(classroomId),
          day: normalizedDay,
          periodNo: parseInt(periodNo),
          startTime,
          endTime,
          facultyName,
          subjectName,
        },
      });
    }

    // Add faculty to list if new
    await prisma.faculty.upsert({
      where: { facultyName },
      update: {},
      create: { facultyName },
    });

    res.json(timetable);
  } catch (error) {
    console.error('Error upserting timetable:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const getTimetableByClassroom = async (req, res) => {
  const { classroomId } = req.params;

  try {
    const timetable = await prisma.timetable.findMany({
      where: { classroomId: parseInt(classroomId) },
      orderBy: [
        { day: 'asc' },
        { periodNo: 'asc' },
      ],
    });
    res.json(timetable);
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const deleteTimetable = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.timetable.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting timetable:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const getCRSchedule = async (req, res) => {
  try {
    const trackingSetting = await prisma.systemSetting.findUnique({
      where: { key: 'trackingEnabled' },
    });
    const trackingEnabled = trackingSetting ? trackingSetting.value === 'true' : true;

    if (!trackingEnabled) {
      return res.status(403).json({ message: 'Tracking is disabled. College is on Holiday.' });
    }

    if (req.user.role !== 'CR') {
      return res.status(403).json({ message: 'Access denied: CR role required' });
    }

    if (!req.user.className) {
      return res.status(400).json({ message: 'CR user is not assigned to a class' });
    }

    const classroom = await prisma.classroom.findFirst({
      where: { className: req.user.className },
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found for CR class name' });
    }

    const today = getTodayDay();
    const { start: startOfToday, end: endOfToday } = getLocalDayBounds();

    // Fetch all logs and timetable entries for today
    const [logsToday, timetablesToday] = await Promise.all([
      prisma.facultyLog.findMany({
        where: {
          classroomId: classroom.id,
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      }),
      prisma.timetable.findMany({
        where: {
          classroomId: classroom.id,
          day: today,
        },
      }),
    ]);

    const currentTime = getCurrentTimeInHHMM();
    const schedule = [];

    for (const stdPeriod of STANDARD_PERIODS) {
      // Find matching log and timetable if any
      const log = logsToday.find(l => l.periodNo === stdPeriod.periodNo);
      const timetable = timetablesToday.find(t => t.periodNo === stdPeriod.periodNo);

      let status = 'Future';
      const isActive = stdPeriod.startTime <= currentTime && currentTime < stdPeriod.endTime;
      const isPast = stdPeriod.endTime <= currentTime;

      if (log) {
        status = log.status; // 'Present' or 'Not Entered'
      } else if (isActive) {
        status = 'Active'; // Current active period
      } else if (isPast) {
        status = 'Not Entered'; // Time has elapsed, marked as not entered
      }

      schedule.push({
        id: `std-${stdPeriod.periodNo}`,
        periodNo: stdPeriod.periodNo,
        startTime: stdPeriod.startTime,
        endTime: stdPeriod.endTime,
        facultyName: log ? log.facultyName : (timetable ? timetable.facultyName : 'Faculty'),
        subjectName: timetable ? timetable.subjectName : 'Class',
        status,
        entryTime: log ? log.entryTime : null,
      });
    }

    res.json({
      classroom: {
        id: classroom.id,
        roomNumber: classroom.roomNumber,
        className: classroom.className,
      },
      schedule,
    });
  } catch (error) {
    console.error('Error fetching CR schedule:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const getFaculties = async (req, res) => {
  try {
    const faculties = await prisma.faculty.findMany({
      orderBy: { facultyName: 'asc' },
    });
    res.json(faculties);
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const importBulkTimetable = async (req, res) => {
  const { classroomId, periods } = req.body;

  if (!classroomId || !Array.isArray(periods)) {
    return res.status(400).json({ message: 'Classroom ID and periods array are required' });
  }

  try {
    const classroom = await prisma.classroom.findUnique({
      where: { id: parseInt(classroomId) },
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Delete existing timetable for this class
    await prisma.timetable.deleteMany({
      where: { classroomId: parseInt(classroomId) },
    });

    const createdPeriods = [];
    const processedPeriods = splitPeriods(periods);

    for (const p of processedPeriods) {
      const periodNo = parseInt(p.periodNo || p.periodno || p.period);
      const day = p.day;
      const startTime = p.startTime || p.starttime || p.start;
      const endTime = p.endTime || p.endtime || p.end;
      const facultyName = p.facultyName || p.facultyname || p.faculty;
      const subjectName = p.subjectName || p.subjectname || p.subject;

      if (!day || !periodNo || !startTime || !endTime || !facultyName || !subjectName) {
        throw new Error(`Missing required fields: day, periodNo, startTime, endTime, facultyName, subjectName.`);
      }

      const timetableItem = await prisma.timetable.create({
        data: {
          classroomId: parseInt(classroomId),
          day,
          periodNo,
          startTime,
          endTime,
          facultyName,
          subjectName,
        },
      });

      // Keep faculties list in sync
      await prisma.faculty.upsert({
        where: { facultyName },
        update: {},
        create: { facultyName },
      });

      createdPeriods.push(timetableItem);
    }

    res.json({
      message: `Successfully imported ${createdPeriods.length} timetable periods`,
      count: createdPeriods.length,
    });
  } catch (error) {
    console.error('Bulk import error:', error);
    res.status(400).json({ message: error.message || 'Failed to import timetable' });
  }
};

// Polyfill DOMMatrix for pdf-parse in Node environment
if (typeof globalThis.DOMMatrix === 'undefined') {
  globalThis.DOMMatrix = class DOMMatrix {
    constructor() {
      this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
    }
    static fromMatrix() { return new DOMMatrix(); }
    static fromFloat32Array() { return new DOMMatrix(); }
    static fromFloat64Array() { return new DOMMatrix(); }
    translate() { return this; }
    scale() { return this; }
    multiply() { return this; }
    inverse() { return this; }
    transformPoint(p) { return p; }
  };
}

const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');

const analyzeTimetableFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileBuffer = req.file.buffer;
  const mimeType = req.file.mimetype;
  const isExcel = mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                  mimeType === 'application/vnd.ms-excel' ||
                  req.file.originalname.endsWith('.xlsx') ||
                  req.file.originalname.endsWith('.xls');

  // Try local Excel parsing first to bypass Groq API key completely
  if (isExcel) {
    try {
      console.log('[Local Parser] Attempting to parse Excel file locally...');
      const localPeriods = parseExcelTimetable(fileBuffer);
      if (localPeriods && localPeriods.length > 0) {
        console.log(`[Local Parser] Successfully parsed ${localPeriods.length} periods locally! Bypassing Groq AI.`);
        return res.json(localPeriods);
      }
      console.log('[Local Parser] Local parsing returned no periods, falling back to AI.');
    } catch (localError) {
      console.error('[Local Parser] Failed to parse Excel file locally:', localError);
    }
  }

  // Fallback to Groq AI parsing. Groq API Key must be configured.
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    return res.status(500).json({ message: 'Groq API Key is not configured on the server.' });
  }

  try {
    let extractedText = '';

    if (mimeType === 'application/pdf') {
      const uint8Data = new Uint8Array(fileBuffer);
      const pdfInstance = new pdfParse.PDFParse(uint8Data);
      await pdfInstance.load();
      const parsedPdf = await pdfInstance.getText();
      extractedText = parsedPdf.text;
    } else if (isExcel) {
      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        extractedText += `\n--- Sheet: ${sheetName} ---\n`;
        extractedText += xlsx.utils.sheet_to_csv(worksheet);
      });
    } else {
      return res.status(400).json({ message: 'Invalid file format. Only PDF and Excel (.xlsx, .xls) files are supported.' });
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ message: 'Could not extract any text content from the uploaded file.' });
    }

    console.log(`[AI Parser] Extracted ${extractedText.length} characters of text. Prompting Groq API...`);

    // Call Groq Chat Completion with JSON mode enabled
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Use Groq's high-capacity Llama3.3 70B model for parsing layouts
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `You are an expert academic schedule parser.
Analyze the provided text extracted from a timetable sheet (PDF or Excel).

IMPORTANT — The academic day uses this EXACT period structure (each period is 50 minutes):
  Period 1: 09:10 – 10:00
  Period 2: 10:00 – 10:50
  (Short Break: 10:50 – 11:00)
  Period 3: 11:00 – 11:50
  Period 4: 11:50 – 12:40
  (Lunch Break: 12:40 – 13:30)
  Period 5: 13:30 – 14:20
  Period 6: 14:20 – 15:10
  Period 7: 15:10 – 16:00

MULTI-PERIOD / LAB HANDLING:
Some classes (especially labs) span multiple consecutive periods. When you detect a single entry that covers more than one period slot, you MUST split it into separate entries for each period it occupies using the start/end times from the schedule above.
Examples:
  • A lab listed as "9:10 – 10:50" spans P1 and P2. Create TWO entries:
      { periodNo: 1, startTime: "09:10", endTime: "10:00", ... }
      { periodNo: 2, startTime: "10:00", endTime: "10:50", ... }
  • A lab listed as "9:10 – 12:40" spans P1, P2, P3, and P4. Create FOUR entries (one per period).
  • A lab listed as "13:30 – 15:10" spans P5 and P6. Create TWO entries.
Keep the same subjectName and facultyName for every split entry.

Extract all weekly repeating timetable periods and output them in a structured JSON object containing a "periods" key, which is an array of objects.
Each object in the array must contain the following keys exactly:
- day: String (Capitalized weekday name, e.g. "Monday", "Tuesday", etc. — valid days are Monday through Saturday)
- periodNo: Integer (Period number 1–7 as defined above)
- startTime: String (Format: HH:MM in 24-hour, e.g. "09:10")
- endTime: String (Format: HH:MM in 24-hour, e.g. "10:00")
- subjectName: String (Name of the subject/course/lab)
- facultyName: String (Name of the faculty member)

Validate start and end times to be in HH:MM 24-hour format.
Do not return any explanation or other text. Return ONLY the raw JSON object containing the "periods" array.`
          },
          {
            role: 'user',
            content: `Extracted Timetable Sheet Content:\n${extractedText}`
          }
        ],
        temperature: 0.1,
      }),
    });

    const completion = await groqResponse.json();
    
    if (!groqResponse.ok) {
      console.error('Groq API Error Response:', completion);
      throw new Error(completion.error?.message || 'Groq API completion request failed');
    }

    const jsonText = completion.choices[0]?.message?.content;
    if (!jsonText) {
      throw new Error('AI failed to generate a response.');
    }

    const parsedData = JSON.parse(jsonText);
    if (!parsedData.periods || !Array.isArray(parsedData.periods)) {
      throw new Error('AI response did not contain a valid periods array');
    }

    console.log(`[AI Parser] Successfully parsed ${parsedData.periods.length} schedule periods via Groq.`);
    res.json(parsedData.periods);
  } catch (error) {
    console.error('AI Timetable Parser error:', error);
    res.status(500).json({ message: error.message || 'Failed to analyze timetable file' });
  }
};

module.exports = {
  upsertTimetable,
  getTimetableByClassroom,
  deleteTimetable,
  getCRSchedule,
  getFaculties,
  importBulkTimetable,
  analyzeTimetableFile,
};
