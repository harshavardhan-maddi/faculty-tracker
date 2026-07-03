const prisma = require('./src/db');
const { getNormalizedWeekday } = require('./src/utils/excelParser');

async function fix() {
  try {
    const list = await prisma.timetable.findMany();
    console.log(`Found ${list.length} total timetable records to check.`);
    
    let updatedCount = 0;
    for (const record of list) {
      const normalized = getNormalizedWeekday(record.day);
      if (normalized && normalized !== record.day) {
        await prisma.timetable.update({
          where: { id: record.id },
          data: { day: normalized }
        });
        updatedCount++;
      }
    }
    console.log(`Successfully normalized ${updatedCount} timetable records.`);
  } catch (err) {
    console.error('Error during fix:', err);
  } finally {
    await prisma.$disconnect();
  }
}

fix();
