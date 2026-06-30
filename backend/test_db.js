const prisma = require('./src/db');

async function test() {
  try {
    const count = await prisma.timetable.count();
    console.log('Total timetable records in DB:', count);
    
    const samples = await prisma.timetable.findMany({
      take: 10,
    });
    console.log('Sample records in DB:', JSON.stringify(samples, null, 2));
  } catch (err) {
    console.error('Database connection / query failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
