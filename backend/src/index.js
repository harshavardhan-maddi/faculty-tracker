require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const prisma = require('./db');
const { initSocket } = require('./services/socket.service');
const { startCron } = require('./services/cron.service');

const authRoutes = require('./routes/auth.routes');
const classroomRoutes = require('./routes/classroom.routes');
const timetableRoutes = require('./routes/timetable.routes');
const logRoutes = require('./routes/log.routes');
const reportRoutes = require('./routes/report.routes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error Logger]', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('[Database] Connected to PostgreSQL via Prisma ORM.');

    // Start background auto-expiry cron
    startCron();

    server.listen(PORT, () => {
      console.log(`[Server] Live on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[Startup Error] Failed to initialize server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n[Server] Shutting down gracefully...');
  await prisma.$disconnect();
  console.log('[Database] Disconnected Prisma.');
  process.exit(0);
};

if (!process.env.VERCEL) {
  startServer();
} else {
  console.warn('[Vercel Serverless] Running in serverless mode. WebSockets (Socket.IO) and background cron jobs are not supported.');
}

module.exports = app;
