import Staff from '../features/staff/models/Staff.js';

const STAFF_2025 = [
  { name: 'Hugo', lastName: 'Angelicola', role: 'HEAD_COACH', roleDisplay: 'Director Técnico' },
  { name: 'Luciano', lastName: 'Saran', role: 'ASSISTANT_COACH', roleDisplay: 'Asistente Técnico' },
  { name: 'David', lastName: 'Torres', role: 'ASSISTANT_COACH', roleDisplay: 'Asistente Técnico' },
  { name: 'Ariel', lastName: 'Abregú', role: 'FITNESS_COACH', roleDisplay: 'Preparador Físico' },
  { name: 'Carlos', lastName: 'Ledesma', role: 'UTILITY', roleDisplay: 'Utilero' }
];

export const seedStaff = async () => {
  await Staff.deleteMany({});
  await Staff.insertMany(
    STAFF_2025.map((s, i) => ({
      ...s,
      status: 'ACTIVE',
      dni: `SEED-ST-${String(i + 1).padStart(4, '0')}`
    }))
  );
  console.log(`✅ ${STAFF_2025.length} staff seeded`);
};
