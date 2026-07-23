const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db');

const login = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'User ID and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid User ID or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid User ID or password' });
    }


    const token = jwt.sign(
      {
        id: user.id,
        userId: user.userId,
        role: user.role,
        name: user.name,
        className: user.className,
      },
      process.env.JWT_SECRET || 'supersecret_facultytrackerkey_2026',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        userId: user.userId,
        name: user.name,
        role: user.role,
        className: user.className,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error', errorDetail: String(error) });
  }
};

const register = async (req, res) => {
  const { name, userId, password, className, role } = req.body;

  if (!name || !userId || !password || !role) {
    return res.status(400).json({ message: 'All fields except class_name (for HOD/Sub Admin) are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User ID already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        userId,
        password: hashedPassword,
        role,
        className: role === 'CR' ? className : null, // Class Name is relevant only for CRs
      },
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        userId: newUser.userId,
        name: newUser.name,
        role: newUser.role,
        className: newUser.className,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.userId === req.user.userId) {
      return res.status(400).json({ message: 'You cannot delete yourself' });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
        role: true,
        className: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        userId: true,
        role: true,
        className: true,
        createdAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateProfile = async (req, res) => {
  const { name, userId, password } = req.body;
  const currentUserId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (userId && userId !== user.userId) {
      const existing = await prisma.user.findUnique({
        where: { userId },
      });
      if (existing) {
        return res.status(400).json({ message: 'User ID is already taken' });
      }
      updateData.userId = userId;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: updateData,
    });

    const token = jwt.sign(
      {
        id: updatedUser.id,
        userId: updatedUser.userId,
        role: updatedUser.role,
        name: updatedUser.name,
        className: updatedUser.className,
      },
      process.env.JWT_SECRET || 'supersecret_facultytrackerkey_2026',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Profile updated successfully',
      token,
      user: {
        id: updatedUser.id,
        userId: updatedUser.userId,
        name: updatedUser.name,
        role: updatedUser.role,
        className: updatedUser.className,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  login,
  register,
  deleteUser,
  getUsers,
  me,
  updateProfile,
};
