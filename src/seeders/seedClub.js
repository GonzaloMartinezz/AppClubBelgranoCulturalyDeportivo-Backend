import Club from '../features/club/models/Club.js';

export const seedClub = async () => {
  await Club.deleteMany({});
  await Club.create({
    name: 'Club Belgrano Cultural y Deportivo',
    shortName: 'Belgrano CyD',
    nickname: 'El Patriota',
    foundedYear: 1906,
    primaryColor: '#003087',
    secondaryColor: '#FFFFFF',
    accentColor: '#FFD700',
    venue: 'Estadio Julio César Figueroa',
    location: {
      city: 'San Miguel de Tucumán',
      province: 'Tucumán'
    },
    socialMedia: {
      facebook: 'BelgranoCyDPrensaOficial',
      instagram: '@belgrano_cyd'
    }
  });
  console.log('✅ Club Belgrano CyD seeded');
};
