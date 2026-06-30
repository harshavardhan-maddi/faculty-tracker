const xlsx = require('xlsx');
const { STANDARD_PERIODS } = require('./date');

const WEEKDAY_MAPPING = {
  'monday': 'Monday', 'mon': 'Monday',
  'tuesday': 'Tuesday', 'tue': 'Tuesday',
  'wednesday': 'Wednesday', 'wed': 'Wednesday',
  'thursday': 'Thursday', 'thu': 'Thursday',
  'friday': 'Friday', 'fri': 'Friday',
  'saturday': 'Saturday', 'sat': 'Saturday',
  'sunday': 'Sunday', 'sun': 'Sunday'
};

const IGNORED_SUBJECTS = ['lunch', 'break', 'lunch break', 'short break', 'interval', 'recess', 'tea break', 'tea-break'];

function getNormalizedWeekday(val) {
  if (!val) return null;
  const lower = String(val).toLowerCase().trim();
  if (WEEKDAY_MAPPING[lower]) return WEEKDAY_MAPPING[lower];
  
  for (const key of Object.keys(WEEKDAY_MAPPING)) {
    if (lower.includes(key)) {
      return WEEKDAY_MAPPING[key];
    }
  }
  return null;
}

function isWeekday(val) {
  return !!getNormalizedWeekday(val);
}

function isIgnoredSubject(subj) {
  if (!subj) return true;
  const lower = subj.toLowerCase().trim();
  return IGNORED_SUBJECTS.some(ignored => lower.includes(ignored)) || 
         lower === '-' || 
         lower === 'nil' || 
         lower === 'free' || 
         lower === 'no class' ||
         lower === 'n/a';
}

function formatTimeStr(val) {
  if (!val) return '';
  let str = String(val).trim();
  
  // Excel fractional day number (e.g. 0.38194444 for 09:10)
  const num = Number(str);
  if (!isNaN(num) && num > 0 && num < 1) {
    const totalMinutes = Math.round(num * 24 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  // AM/PM adjustment
  const isPM = str.toLowerCase().includes('pm');
  const isAM = str.toLowerCase().includes('am');
  str = str.replace(/(am|pm)/i, '').trim();

  // Parse HH:MM or HH.MM
  const match = str.match(/(\d{1,2})[:.](\d{2})/);
  if (match) {
    let hour = parseInt(match[1]);
    const minute = match[2];
    if (isPM && hour < 12) hour += 12;
    if (isAM && hour === 12) hour = 0;
    return `${String(hour).padStart(2, '0')}:${minute}`;
  }
  return '';
}

function parseCellContent(val) {
  if (!val) return { subject: '', faculty: '' };
  const str = String(val).trim();
  if (!str) return { subject: '', faculty: '' };

  // 1. Newline split
  if (str.includes('\n')) {
    const lines = str.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length >= 2) {
      const faculty = lines[1].replace(/[()]/g, '').trim();
      return { subject: lines[0], faculty };
    }
  }

  // 2. Parentheses match: "Subject Name (Faculty Name)"
  const parenMatch = str.match(/^(.*?)\s*\(([^)]+)\)\s*$/s);
  if (parenMatch) {
    return {
      subject: parenMatch[1].trim(),
      faculty: parenMatch[2].trim()
    };
  }

  // 3. Separator match: "Subject Name - Faculty Name" or "Subject Name / Faculty Name"
  const sepMatch = str.match(/^(.*?)\s*[-/:|]\s*(.*?)$/);
  if (sepMatch) {
    const p1 = sepMatch[1].trim();
    const p2 = sepMatch[2].trim();
    if (p2 && isNaN(Number(p2))) { // make sure it's not a period number or time range
      return { subject: p1, faculty: p2 };
    }
  }

  return {
    subject: str,
    faculty: ''
  };
}

function getCellValue(worksheet, r, c, rows) {
  const merges = worksheet['!merges'] || [];
  for (const merge of merges) {
    if (r >= merge.s.r && r <= merge.e.r && c >= merge.s.c && c <= merge.e.c) {
      const startRow = merge.s.r;
      const startCol = merge.s.c;
      return String(rows[startRow]?.[startCol] || '').trim();
    }
  }
  return String(rows[r]?.[c] || '').trim();
}

function findFlatTableHeaders(rows) {
  for (let r = 0; r < Math.min(rows.length, 10); r++) {
    const row = rows[r];
    if (!Array.isArray(row)) continue;

    let dayCol = -1;
    let periodCol = -1;
    let subjectCol = -1;
    let facultyCol = -1;
    let startCol = -1;
    let endCol = -1;

    for (let c = 0; c < row.length; c++) {
      const val = String(row[c] || '').toLowerCase().trim();
      if (val.includes('day')) dayCol = c;
      else if (val.includes('period')) periodCol = c;
      else if (val.includes('subject') || val === 'course' || val === 'class') subjectCol = c;
      else if (val.includes('faculty') || val.includes('teacher') || val.includes('staff') || val.includes('prof')) facultyCol = c;
      else if (val.includes('start')) startCol = c;
      else if (val.includes('end')) endCol = c;
    }

    if (dayCol !== -1 && subjectCol !== -1 && (periodCol !== -1 || facultyCol !== -1)) {
      return { headerRowIndex: r, dayCol, periodCol, subjectCol, facultyCol, startCol, endCol };
    }
  }
  return null;
}

function tryParseFlatTable(rows) {
  const headers = findFlatTableHeaders(rows);
  if (!headers) return null;

  const periods = [];
  const { headerRowIndex, dayCol, periodCol, subjectCol, facultyCol, startCol, endCol } = headers;

  for (let r = headerRowIndex + 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row) continue;

    const rawDay = String(row[dayCol] || '').trim();
    if (!rawDay) continue;

    const day = getNormalizedWeekday(rawDay);
    if (!day) continue;

    const rawSubject = String(row[subjectCol] || '').trim();
    if (isIgnoredSubject(rawSubject)) continue;

    const facultyName = facultyCol !== -1 ? String(row[facultyCol] || '').trim() : 'Faculty';
    
    let periodNo = 1;
    if (periodCol !== -1) {
      const rawPeriod = String(row[periodCol] || '').trim();
      const parsedNum = parseInt(rawPeriod.replace(/\D/g, ''));
      if (!isNaN(parsedNum)) {
        periodNo = parsedNum;
      }
    }

    let startTime = '';
    let endTime = '';
    if (startCol !== -1) startTime = formatTimeStr(String(row[startCol] || '').trim());
    if (endCol !== -1) endTime = formatTimeStr(String(row[endCol] || '').trim());

    if (!startTime || !endTime) {
      const std = STANDARD_PERIODS.find(p => p.periodNo === periodNo);
      if (std) {
        startTime = startTime || std.startTime;
        endTime = endTime || std.endTime;
      } else {
        startTime = startTime || '09:10';
        endTime = endTime || '10:00';
      }
    }

    periods.push({
      day,
      periodNo,
      startTime,
      endTime,
      subjectName: rawSubject,
      facultyName: facultyName || 'Faculty',
    });
  }

  return periods;
}

function findDayColumnIndex(rows) {
  let bestCol = -1;
  let maxCount = 0;
  const colCount = rows.reduce((max, r) => Math.max(max, r.length), 0);
  const checkLimit = Math.min(colCount, 15);

  for (let c = 0; c < checkLimit; c++) {
    let weekdayCount = 0;
    for (let r = 0; r < Math.min(rows.length, 30); r++) {
      const cellVal = String(rows[r][c] || '').trim();
      if (isWeekday(cellVal)) {
        weekdayCount++;
      }
    }
    if (weekdayCount > maxCount) {
      maxCount = weekdayCount;
      bestCol = c;
    }
  }
  return maxCount >= 3 ? bestCol : -1;
}

function parsePeriodNoFromLabel(label, colIdx, dayColIdx) {
  if (!label) return colIdx - dayColIdx;
  const str = String(label).toLowerCase().trim();
  
  for (const std of STANDARD_PERIODS) {
    if (str.includes(std.startTime) || str.includes(std.startTime.replace(/^0/, ''))) {
      return std.periodNo;
    }
  }

  const numMatch = str.match(/(?:period|p|pt)?\s*([1-7])/);
  if (numMatch) {
    return parseInt(numMatch[1]);
  }

  const numberOnly = parseInt(str.replace(/\D/g, ''));
  if (!isNaN(numberOnly) && numberOnly >= 1 && numberOnly <= 7) {
    return numberOnly;
  }

  return colIdx - dayColIdx;
}

function tryParseGrid(rows, worksheet) {
  const dayColIdx = findDayColumnIndex(rows);
  if (dayColIdx === -1) return null;

  let firstDayRowIdx = -1;
  for (let r = 0; r < rows.length; r++) {
    if (isWeekday(rows[r][dayColIdx])) {
      firstDayRowIdx = r;
      break;
    }
  }
  if (firstDayRowIdx === -1) return null;

  const headerRowIdx = firstDayRowIdx > 0 ? firstDayRowIdx - 1 : 0;
  const periods = [];

  for (let r = firstDayRowIdx; r < rows.length; r++) {
    const rawDay = rows[r][dayColIdx];
    const day = getNormalizedWeekday(rawDay);
    if (!day) continue; // skip non-weekday rows in between

    const rowLength = rows[r].length;
    for (let c = 0; c < rowLength; c++) {
      if (c === dayColIdx) continue;

      const rawCellVal = getCellValue(worksheet, r, c, rows);
      if (!rawCellVal) continue;

      const { subject, faculty } = parseCellContent(rawCellVal);
      if (isIgnoredSubject(subject)) continue;

      const headerLabel = rows[headerRowIdx]?.[c];
      const periodNo = parsePeriodNoFromLabel(headerLabel, c, dayColIdx);

      const std = STANDARD_PERIODS.find(p => p.periodNo === periodNo);
      const startTime = std ? std.startTime : '09:10';
      const endTime = std ? std.endTime : '10:00';

      periods.push({
        day,
        periodNo,
        startTime,
        endTime,
        subjectName: subject,
        facultyName: faculty || 'Faculty',
      });
    }
  }

  return periods;
}

function parseExcelTimetable(fileBuffer) {
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  const allPeriods = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    if (!rows || rows.length === 0) continue;

    const tablePeriods = tryParseFlatTable(rows);
    if (tablePeriods && tablePeriods.length > 0) {
      allPeriods.push(...tablePeriods);
      continue;
    }

    const gridPeriods = tryParseGrid(rows, worksheet);
    if (gridPeriods && gridPeriods.length > 0) {
      allPeriods.push(...gridPeriods);
    }
  }

  return allPeriods;
}

module.exports = {
  parseExcelTimetable,
};
