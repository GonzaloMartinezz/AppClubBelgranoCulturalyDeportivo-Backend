import mongoose from 'mongoose';
import 'dotenv/config';
import Team from '../models/Team.js';
import Player from '../models/Player.js';
import Match from '../models/Match.js';
import Competition from '../models/Competition.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/belgrano_db';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data (optional, but good for a fresh start)
    await Team.deleteMany({});
    await Player.deleteMany({});
    await Match.deleteMany({});
    await Competition.deleteMany({});

    // 1. Create Competition
    const competition = await Competition.create({
      name: 'Liga Federal 2026',
      season: '2026',
      startDate: new Date('2026-02-01'),
      isActive: true,
      type: 'league'
    });

    // 2. Create Teams
    const teamsData = [
      { name: 'Belgrano Cultural y Deportivo', shortName: 'Belgrano', season: '2026', colors: { primary: '#1A3FA8', secondary: '#F05A00' } },
      { name: 'Talleres de Tafí Viejo', shortName: 'Talleres', season: '2026' },
      { name: 'Nicolás Avellaneda de Tucumán', shortName: 'Nicolás Av.', season: '2026' },
      { name: 'Asociación Mitre', shortName: 'Mitre', season: '2026' },
      { name: 'San Martín de Tucumán', shortName: 'San Martín', season: '2026' },
      { name: 'Jujuy Básquet', shortName: 'Jujuy', season: '2026' },
      { name: 'Gimnasia y Tiro de Salta', shortName: 'Gimnasia y Tiro', season: '2026' }
    ];

    const teams = {};
    for (const t of teamsData) {
      const created = await Team.create(t);
      teams[t.shortName] = created._id;
    }

    // ... (players creation remains same)

    // 5. Update Standings in Competition
    competition.standings = [
      { team: 'Belgrano', played: 15, won: 10, lost: 5, points: 25, drawn: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: 'San Martín', played: 15, won: 11, lost: 4, points: 26, drawn: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: 'Talleres', played: 15, won: 9, lost: 6, points: 24, drawn: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: 'Jujuy', played: 14, won: 8, lost: 6, points: 22, drawn: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: 'Gimnasia y Tiro', played: 14, won: 7, lost: 7, points: 21, drawn: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: 'Mitre', played: 15, won: 5, lost: 10, points: 20, drawn: 0, goalsFor: 0, goalsAgainst: 0 },
      { team: 'Nicolás Av.', played: 15, won: 3, lost: 12, points: 18, drawn: 0, goalsFor: 0, goalsAgainst: 0 }
    ];
    await competition.save();

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
