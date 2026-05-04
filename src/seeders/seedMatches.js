import Match from '../features/matches/models/Match.js';

const MATCHES_2025 = [
  {
    date: new Date('2025-02-25'), time: '21:00',
    homeTeamName: 'San Martín', awayTeamName: 'Belgrano CyD',
    venue: 'Cancha San Martín (visitante)', round: 'Fecha 1', isHome: false,
    status: 'FINAL', score: { home: 78, away: 65, quarter: 4 },
    competitionName: 'Liga Federal 2025'
  },
  {
    date: new Date('2025-03-15'), time: '21:00',
    homeTeamName: 'Belgrano CyD', awayTeamName: 'Bochas Sport Club',
    venue: 'Estadio Julio César Figueroa', round: 'Playoffs', isHome: true,
    status: 'FINAL', score: { home: 81, away: 72, quarter: 4 },
    competitionName: 'Liga Federal 2025'
  },
  {
    date: new Date('2025-03-22'), time: '20:30',
    homeTeamName: 'Belgrano CyD', awayTeamName: 'Unión y Juventud de Bandera',
    venue: 'Estadio Julio César Figueroa', round: 'Playoffs', isHome: true,
    status: 'FINAL', score: { home: 92, away: 91, quarter: 4 },
    competitionName: 'Liga Federal 2025'
  },
  {
    date: new Date('2025-04-05'), time: '21:00',
    homeTeamName: 'Mitre', awayTeamName: 'Belgrano CyD',
    venue: 'Estadio Mitre (visitante)', round: 'Penúltima fecha', isHome: false,
    status: 'FINAL', score: { home: 102, away: 98, quarter: 4 },
    competitionName: 'Liga Federal 2025'
  },
  {
    date: new Date('2025-04-20'), time: '21:00',
    homeTeamName: 'Belgrano CyD', awayTeamName: 'Unión y Juventud',
    venue: 'Estadio Julio César Figueroa', round: 'Playoffs Final', isHome: true,
    status: 'FINAL', score: { home: 107, away: 114, quarter: 6 },
    competitionName: 'Liga Federal 2025',
    mvp: { playerName: 'Iván Albornoz', reason: '18 PTS, 12 REB' }
  }
];

export const seedMatches = async () => {
  await Match.deleteMany({});
  await Match.insertMany(MATCHES_2025);
  console.log(`✅ ${MATCHES_2025.length} partidos seeded`);
};
