import Player from '../features/players/models/Player.js';

const PLANTEL_2025 = [
  { name: 'Iván', lastName: 'Albornoz', position: 'PIVOT', isCaptain: true, number: 10, origin: 'Rosario de la Frontera, Salta', birthDate: new Date('1995-01-01') },
  { name: 'Juan Cruz', lastName: 'Rodríguez', position: 'ALERO', number: 7, birthDate: new Date('1997-01-01') },
  { name: 'Luciano', lastName: 'Maróstica', position: 'ESCOLTA', number: 4, birthDate: new Date('1996-01-01') },
  { name: 'Tomás', lastName: 'Monteros', position: 'BASE', number: 5, birthDate: new Date('1998-01-01') },
  { name: 'Juan Pablo', lastName: 'Vigiani', position: 'ALERO', number: 23, birthDate: new Date('1996-01-01') },
  { name: 'Nataniel', lastName: 'Rodríguez', position: 'ALA-PIVOT', number: 14, origin: 'Chaco', birthDate: new Date('1997-01-01') },
  { name: 'Matías', lastName: 'Nuñez', position: 'ESCOLTA', number: 3, origin: 'Chaco', birthDate: new Date('1998-01-01') },
  { name: 'Gonzalo', lastName: 'Gerez', position: 'ALERO', number: 11, origin: 'Charata, Chaco', birthDate: new Date('1999-01-01') },
  { name: 'Lucca', lastName: 'Theiler', position: 'BASE', number: 0, origin: 'Santa Fe', birthDate: new Date('2004-01-01') },
  { name: 'Bautista', lastName: 'Casares', position: 'ALERO', number: 15, birthDate: new Date('2005-01-01') },
  { name: 'Mauro', lastName: 'Ponce', position: 'BASE', number: 6, birthDate: new Date('2005-01-01') },
  { name: 'Juan Cruz', lastName: 'Villarreal', position: 'ESCOLTA', number: 8, birthDate: new Date('2006-01-01') },
  { name: 'Benjamín', lastName: 'Trejo', position: 'ALA-PIVOT', number: 12, birthDate: new Date('2006-01-01') },
  { name: 'Armando', lastName: 'Simón', position: 'PIVOT', number: 21, birthDate: new Date('2006-01-01') }
];

export const seedPlayers = async () => {
  await Player.deleteMany({});
  await Player.insertMany(
    PLANTEL_2025.map((p, i) => ({
      ...p,
      status: 'ACTIVE',
      dni: `SEED-PL-${String(i + 1).padStart(4, '0')}`
    }))
  );
  console.log(`✅ ${PLANTEL_2025.length} jugadores seeded`);
};
