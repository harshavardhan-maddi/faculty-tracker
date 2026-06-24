const prisma = require('../db');

// Get all faculty
const getAllFaculty = async (req, res) => {
  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: { facultyName: 'asc' },
    });
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

// Update or create single faculty
const upsertFaculty = async (req, res) => {
  const { facultyName, phoneNumber } = req.body;

  if (!facultyName) {
    return res.status(400).json({ message: 'Faculty name is required' });
  }

  try {
    const faculty = await prisma.faculty.upsert({
      where: { facultyName },
      update: { phoneNumber },
      create: { facultyName, phoneNumber },
    });

    res.json(faculty);
  } catch (error) {
    console.error('Error upserting faculty:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

// Bulk update/create faculty
const bulkUpsertFaculty = async (req, res) => {
  const { facultyList } = req.body; // Array of { facultyName, phoneNumber }

  if (!facultyList || !Array.isArray(facultyList)) {
    return res.status(400).json({ message: 'Invalid faculty list provided' });
  }

  try {
    // Upsert each faculty sequentially (or use transactions, but sequential is fine for this scale)
    const results = [];
    for (const item of facultyList) {
      if (item.facultyName) {
        const faculty = await prisma.faculty.upsert({
          where: { facultyName: item.facultyName.trim() },
          update: { phoneNumber: item.phoneNumber ? item.phoneNumber.trim() : null },
          create: { 
            facultyName: item.facultyName.trim(), 
            phoneNumber: item.phoneNumber ? item.phoneNumber.trim() : null 
          },
        });
        results.push(faculty);
      }
    }

    res.json({ message: `Successfully updated ${results.length} faculty records.`, data: results });
  } catch (error) {
    console.error('Error bulk upserting faculty:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

// Delete faculty
const deleteFaculty = async (req, res) => {
  const { id } = req.params;

  try {
    const faculty = await prisma.faculty.findUnique({
      where: { id: parseInt(id) },
    });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    await prisma.faculty.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  getAllFaculty,
  upsertFaculty,
  bulkUpsertFaculty,
  deleteFaculty,
};
