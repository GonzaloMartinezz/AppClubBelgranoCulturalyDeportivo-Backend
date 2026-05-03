import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==================== MONGOOSE CONNECTION ====================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/belgrano_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('🏀 Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// ==================== IMPORTS DE RUTAS ====================
import playerRoutes from './src/routes/playerRoutes.js';
import matchRoutes from './src/routes/matchRoutes.js';
import sponsorRoutes from './src/routes/sponsorRoutes.js';
import staffRoutes from './src/routes/staffRoutes.js';
import clubRoutes from './src/routes/clubRoutes.js';
import competitionRoutes from './src/routes/competitionRoutes.js';

// ==================== RUTAS PRINCIPALES ====================

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API del Club Belgrano', version: '1.0.0' });
});

// ==================== ROUTES ====================
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/competitions', competitionRoutes);

// ==================== SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Club Belgrano API - Puerto ${PORT}`);
  console.log('📋 Endpoints disponibles:');
  console.log('   /api/health');
  console.log('   /api/club');
  console.log('   /api/players');
  console.log('   /api/matches');
  console.log('   /api/sponsors');
  console.log('   /api/staff');
  console.log('   /api/competitions');
});