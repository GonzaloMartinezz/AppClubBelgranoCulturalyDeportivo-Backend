import { Server } from 'socket.io';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  const matchNS = io.of('/match');

  matchNS.on('connection', (socket) => {
    socket.on('join-match', (matchId) => socket.join(`match-${matchId}`));
    socket.on('leave-match', (matchId) => socket.leave(`match-${matchId}`));

    socket.on('update-score', ({ matchId, score, quarter, quarterTime }) => {
      matchNS.to(`match-${matchId}`).emit('score-update', {
        score, quarter, quarterTime, timestamp: new Date()
      });
    });

    socket.on('update-player-stat', ({ matchId, playerId, stat, value }) => {
      matchNS.to(`match-${matchId}`).emit('player-stat-update', {
        playerId, stat, value, timestamp: new Date()
      });
    });

    socket.on('match-status', ({ matchId, status }) => {
      matchNS.to(`match-${matchId}`).emit('status-change', { status, timestamp: new Date() });
    });
  });

  return io;
};
