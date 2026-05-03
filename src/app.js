import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import { errorHandler, notFound } from './core/middleware/errorHandler.js';

import playerRoutes from './features/players/routes/playerRoutes.js';
import matchRoutes from './features/matches/routes/matchRoutes.js';
import competitionRoutes from './features/competitions/routes/competitionRoutes.js';
import sponsorRoutes from './features/sponsors/routes/sponsorRoutes.js';
import staffRoutes from './features/staff/routes/staffRoutes.js';
import clubRoutes from './features/club/routes/clubRoutes.js';
import membershipRoutes from './features/membership/routes/membershipRoutes.js';
import authRoutes from './features/auth/routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date(), service: 'Club Belgrano API' });
});

app.use('/api/v1/players', playerRoutes);
app.use('/api/v1/matches', matchRoutes);
app.use('/api/v1/competitions', competitionRoutes);
app.use('/api/v1/sponsors', sponsorRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/club', clubRoutes);
app.use('/api/v1/membership', membershipRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Club Belgrano API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;