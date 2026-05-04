import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/database.js';
import { seedClub } from './seedClub.js';
import { seedPlayers } from './seedPlayers.js';
import { seedStaff } from './seedStaff.js';
import { seedMatches } from './seedMatches.js';

const run = async () => {
  try {
    await connectDB();
    await seedClub();
    await seedPlayers();
    await seedStaff();
    await seedMatches();
    console.log('✅ Todos los seeders ejecutados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seeders:', error);
    process.exit(1);
  }
};

run();
