const prisma = require('./src/db');

async function check() {
  try {
    const users = await prisma.user.findMany();
    console.log('Seeded Users in Database:', users.map(u => ({ id: u.id, name: u.name, userId: u.userId, role: u.role })));
    const classrooms = await prisma.classroom.findMany();
    console.log('Classrooms:', classrooms.map(c => ({ id: c.id, roomNumber: c.roomNumber, className: c.className })));
    const timetablesCount = await prisma.timetable.count();
    console.log('Timetables count:', timetablesCount);
  } catch (err) {
    console.error('Error querying database:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
