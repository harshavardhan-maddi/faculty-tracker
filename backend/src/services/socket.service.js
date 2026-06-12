const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

let io = null;
const activeUsers = new Map(); // socket.id -> user info

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    let user = null;

    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_facultytrackerkey_2026');
        activeUsers.set(socket.id, {
          socketId: socket.id,
          id: user.id,
          name: user.name,
          userId: user.userId,
          role: user.role,
          className: user.className,
        });
      } catch (err) {
        console.error('Socket authentication failed:', err.message);
      }
    }

    // Always emit the updated count of online users
    broadcastOnlineUsers();

    // Listen for room join (e.g. CR joins their class room, HODs join 'dashboard')
    socket.on('join_room', (roomName) => {
      socket.join(roomName);
    });

    socket.on('disconnect', () => {
      activeUsers.delete(socket.id);
      broadcastOnlineUsers();
    });
  });

  return io;
};

const broadcastOnlineUsers = () => {
  if (!io) return;
  
  // Count unique users by userId to handle double connections (tabs)
  const uniqueUsers = new Set();
  const list = [];
  
  activeUsers.forEach((user) => {
    uniqueUsers.add(user.userId);
    list.push({ name: user.name, role: user.role, className: user.className });
  });

  io.emit('online_users_update', {
    count: uniqueUsers.size,
    users: list,
  });
};

const emitClassroomStatusUpdate = (classroomData) => {
  if (!io) return;
  // Send to everyone or specifically to HOD / Sub Admin rooms
  io.emit('classroom_status_update', classroomData);
};

const emitNotification = (notification) => {
  if (!io) return;
  // Send a real-time notification to the 'dashboard' room (admins and sub-admins)
  io.to('dashboard').emit('new_notification', {
    id: Date.now().toString(),
    timestamp: new Date(),
    ...notification,
  });
};

const getIo = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};

module.exports = {
  initSocket,
  getIo,
  emitClassroomStatusUpdate,
  emitNotification,
};
