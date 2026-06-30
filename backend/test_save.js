const { importBulkTimetable } = require('./src/controllers/timetable.controller');
const prisma = require('./src/db');

async function run() {
  const req = {
    body: {
      classroomId: 18,
      periods: [
        {
          day: 'Monday',
          periodNo: 1,
          startTime: '09:10',
          endTime: '10:00',
          subjectName: 'Computer Networks',
          facultyName: 'Dr. Srinivas Rao'
        },
        {
          day: 'Monday',
          periodNo: 2,
          startTime: '10:00',
          endTime: '10:50',
          subjectName: 'Artificial Intelligence',
          facultyName: 'Dr. Sarah Thomas'
        }
      ]
    }
  };

  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      console.log('API Response Status:', this.statusCode);
      console.log('API Response Data:', JSON.stringify(data, null, 2));
    }
  };

  try {
    console.log('Simulating bulk import...');
    await importBulkTimetable(req, res);
    
    // Check if inserted successfully
    const records = await prisma.timetable.findMany({
      where: { classroomId: 18 }
    });
    console.log('Records currently in DB for classroom 18 after import:', JSON.stringify(records, null, 2));
  } catch (err) {
    console.error('Import failed with exception:', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
