import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== CORS ====================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

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
  res.json({
    status: 'ok',
    message: '🏀 API del Club Belgrano Cultural y Deportivo',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Contact form (simple)
app.post('/api/contact', (req, res) => {
  const { nombre, apellido, email, telefono, interes, mensaje } = req.body;
  if (!nombre || !apellido || !email) {
    return res.status(400).json({ success: false, message: 'Nombre, apellido y email son requeridos.' });
  }
  console.log('📨 Nuevo mensaje de contacto:', { nombre, apellido, email, telefono, interes, mensaje });
  res.json({ success: true, message: 'Mensaje recibido. Te contactaremos a la brevedad.' });
});

// ==================== ROUTES ====================
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/competitions', competitionRoutes);

// ==================== 404 ====================
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta ${req.originalUrl} no encontrada.` });
});

// ==================== SERVER ====================
app.listen(PORT, () => {
  console.log('\n🚀 Club Belgrano API - Activa');
  console.log(`📡 Puerto: ${PORT}`);
  console.log('📋 Endpoints disponibles:');
  console.log('   GET  /api/health');
  console.log('   POST /api/contact');
  console.log('   GET  /api/club');
  console.log('   GET  /api/players');
  console.log('   GET  /api/matches');
  console.log('   GET  /api/matches/latest');
  console.log('   GET  /api/sponsors');
  console.log('   GET  /api/staff');
  console.log('   GET  /api/competitions\n');
});