const prisma = require('./src/db');

async function check() {
  try {
    const list = await prisma.timetable.findMany();
    console.log(`Total records: ${list.length}`);
    const classrooms = await prisma.classroom.findMany();
    
    // Group by classroom and day
    const grouped = {};
    for (const r of list) {
      const cls = classrooms.find(c => c.id === r.classroomId);
      const clsName = cls ? `${cls.className} (${cls.roomNumber})` : `Classroom #${r.classroomId}`;
      if (!grouped[clsName]) grouped[clsName] = {};
      if (!grouped[clsName][r.day]) grouped[clsName][r.day] = 0;
      grouped[clsName][r.day]++;
    }
    
    console.log('Grouped Timetables by Classroom and Day string:');
    console.log(JSON.stringify(grouped, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
