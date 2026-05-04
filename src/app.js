import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';

import connectDB from './config/database.js';
import { initializeSocket } from './sockets/socketManager.js';
import { errorHandler, notFound } from './core/middleware/errorHandler.js';

import authRoutes from './features/auth/routes/authRoutes.js';
import clubRoutes from './features/club/routes/clubRoutes.js';
import playerRoutes from './features/players/routes/playerRoutes.js';
import matchRoutes from './features/matches/routes/matchRoutes.js';
import competitionRoutes from './features/competitions/routes/competitionRoutes.js';
import staffRoutes from './features/staff/routes/staffRoutes.js';
import sponsorRoutes from './features/sponsors/routes/sponsorRoutes.js';
import membershipRoutes from './features/membership/routes/membershipRoutes.js';
import statRoutes from './features/stats/routes/statRoutes.js';
import galleryRoutes from './features/gallery/routes/galleryRoutes.js';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_, res) => res.json({
  status: 'OK',
  club: 'Belgrano CyD — El Patriota',
  timestamp: new Date()
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/club', clubRoutes);
app.use('/api/v1/players', playerRoutes);
app.use('/api/v1/matches', matchRoutes);
app.use('/api/v1/competitions', competitionRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/sponsors', sponsorRoutes);
app.use('/api/v1/membership', membershipRoutes);
app.use('/api/v1/stats', statRoutes);
app.use('/api/v1/gallery', galleryRoutes);

app.use(notFound);
app.use(errorHandler);

export const startServer = async () => {
  try {
    await connectDB();
    const io = initializeSocket(httpServer);
    app.set('io', io);
    httpServer.listen(PORT, () => {
      console.log(`🏀 Belgrano CyD API — Puerto ${PORT}`);
      console.log(`🔌 Socket.io activo`);
    });
  } catch (error) {
    console.error('Error iniciando servidor:', error);
    process.exit(1);
  }
};

export default app;