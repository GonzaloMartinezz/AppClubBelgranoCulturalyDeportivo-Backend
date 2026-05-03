import mongoose from 'mongoose';

const MOCK_DATA = {
    players: [
        { _id: '1', name: 'Santiago', lastName: 'García', dni: '35123456', birthDate: new Date('2005-03-15'), position: 'BASE', number: 7, photo: '', careerStats: { matchesPlayed: 25, points: 320, rebounds: 45, assists: 89, steals: 28, blocks: 5, fouls: 40 }, status: 'ACTIVE', team: null, category: null },
        { _id: '2', name: 'Mateo', lastName: 'Rodríguez', dni: '35123457', birthDate: new Date('2004-08-22'), position: 'ESCOLTA', number: 9, photo: '', careerStats: { matchesPlayed: 28, points: 450, rebounds: 60, assists: 35, steals: 45, blocks: 8, fouls: 55 }, status: 'ACTIVE', team: null, category: null },
        { _id: '3', name: 'Thiago', lastName: 'López', dni: '35123458', birthDate: new Date('2006-01-10'), position: 'ALERO', number: 11, photo: '', careerStats: { matchesPlayed: 22, points: 280, rebounds: 120, assists: 25, steals: 18, blocks: 15, fouls: 35 }, status: 'ACTIVE', team: null, category: null },
        { _id: '4', name: 'Bruno', lastName: 'Martínez', dni: '35123459', birthDate: new Date('2005-05-18'), position: 'ALA-PIVOT', number: 15, photo: '', careerStats: { matchesPlayed: 26, points: 380, rebounds: 180, assists: 42, steals: 22, blocks: 35, fouls: 65 }, status: 'ACTIVE', team: null, category: null },
        { _id: '5', name: 'Lautaro', lastName: 'González', dni: '35123460', birthDate: new Date('2004-11-25'), position: 'PIVOT', number: 20, photo: '', careerStats: { matchesPlayed: 30, points: 520, rebounds: 250, assists: 28, steals: 15, blocks: 65, fouls: 80 }, status: 'ACTIVE', team: null, category: null },
    ],
    matches: [
        { _id: '1', date: new Date('2026-04-27'), time: '21:00', homeTeam: { _id: 'h1', name: 'Belgrano' }, awayTeam: { _id: 'a1', name: 'Ateneo' }, competition: { name: 'Liga Federal', season: '2026' }, venue: 'Palacio de los Deportes', status: 'FINAL', score: { home: 85, away: 72 }, mvp: { player: { _id: '2', name: 'Mateo', lastName: 'Rodríguez', number: 9 }, reason: '最佳表现' } },
        { _id: '2', date: new Date('2026-05-04'), time: '21:00', homeTeam: { _id: 'h1', name: 'Belgrano' }, awayTeam: { _id: 'a2', name: 'Gimnasia' }, competition: { name: 'Liga Federal', season: '2026' }, venue: 'Palacio de los Deportes', status: 'SCHEDULED', score: { home: 0, away: 0 } },
        { _id: '3', date: new Date('2026-05-11'), time: '21:00', homeTeam: { _id: 'h1', name: 'Belgrano' }, awayTeam: { _id: 'a3', name: 'Rosario' }, competition: { name: 'Liga Federal', season: '2026' }, venue: 'Palacio de los Deportes', status: 'SCHEDULED', score: { home: 0, away: 0 } },
        { _id: '4', date: new Date('2026-05-18'), time: '21:00', homeTeam: { _id: 'h1', name: 'Belgrano' }, awayTeam: { _id: 'a4', name: 'Cordoba' }, competition: { name: 'Liga Federal', season: '2026' }, venue: 'Palacio de los Deportes', status: 'SCHEDULED', score: { home: 0, away: 0 } },
    ],
    staff: [
        { _id: '1', name: 'Carlos', lastName: 'Mendoza', dni: '22123456', role: 'HEAD_COACH', roleDisplay: 'Director Técnico', photo: '', bio: 'Ex jugador profesional con 15 años de experiencia', status: 'ACTIVE', team: null, category: null },
        { _id: '2', name: 'Javier', lastName: 'Arias', dni: '23123457', role: 'ASSISTANT_COACH', roleDisplay: 'Ayudante de Campo', photo: '', status: 'ACTIVE', team: null, category: null },
        { _id: '3', name: 'María', lastName: 'López', dni: '24123458', role: 'PHYSIO', roleDisplay: 'Kinesióloga', photo: '', credentials: { license: 'Mat. 1234' }, status: 'ACTIVE', team: null, category: null },
        { _id: '4', name: 'Diego', lastName: 'Fernández', dni: '25123459', role: 'FITNESS_COACH', roleDisplay: 'Preparador Físico', photo: '', credentials: { license: 'Mat. 5678' }, status: 'ACTIVE', team: null, category: null },
    ],
    sponsors: [
        { _id: '1', name: 'Indigo Vision', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/256px-Google_2015_logo.svg.png', website: 'https://indigo.vision', level: 'PLATINUM', displayOrder: 1, isActive: true, showOnHome: true },
        { _id: '2', name: 'Carratú Home', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/256px-Amazon_logo.svg.png', website: 'https://carratuhomestore.it', level: 'GOLD', displayOrder: 2, isActive: true, showOnHome: true },
        { _id: '3', name: 'Box Briganti', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/256px-IBM_logo.svg.png', website: 'https://www.boxbriganti.it', level: 'SILVER', displayOrder: 3, isActive: true, showOnHome: true },
        { _id: '4', name: 'G eff Sport', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/256px-IBM_logo.svg.png', website: 'https://geffsport.com', level: 'BRONZE', displayOrder: 4, isActive: true, showOnHome: true },
    ],
    club: {
        _id: '1',
        name: 'Club Belgrano Cultural y Deportivo',
        shortName: 'Belgrano',
        primaryColor: '#0033A0',
        secondaryColor: '#FFFFFF',
        foundedYear: 1920,
        location: { city: 'San Miguel de Tucumán', province: 'Tucumán', address: 'Av. Belgrano 1234' },
        contact: { email: 'contacto@belgranocba.com', phone: '+54 381 4000 000' },
        socialMedia: { instagram: '@clubbelgrano', facebook: 'ClubBelgrano' }
    }
};

let useMockData = true;
let isConnected = false;

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/belgrano_club';

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 3000,
        });
        console.log('✅ MongoDB Connected');
        isConnected = true;
        useMockData = false;
    } catch (error) {
        console.log('⚠️ MongoDB no disponible - Usando modo OFFLINE (datos de prueba)');
        useMockData = true;
    }
};

export const isUsingMock = () => useMockData;
export { connectDB, MOCK_DATA };
export default connectDB;