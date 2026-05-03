import clubRepository from '../repositories/clubRepository.js';

class ClubService {
  async getAll() {
    return await clubRepository.findAll();
  }

  async getById(id) {
    const club = await clubRepository.findById(id);
    if (!club) throw new Error('Club no encontrado');
    return club;
  }

  async getMain() {
    const club = await clubRepository.findMain();
    return club || {
      name: 'Club Belgrano Cultural y Deportivo',
      shortName: 'Belgrano',
      foundedYear: 1920,
      colors: { primary: '#0033A0', secondary: '#FFFFFF' },
      location: { city: 'San Miguel de Tucumán', province: 'Tucumán', stadium: 'Palacio del Gigante', stadiumCapacity: 35000 }
    };
  }

  async create(data) {
    return await clubRepository.create(data);
  }

  async update(id, data) {
    return await clubRepository.update(id, data);
  }

  async delete(id) {
    await clubRepository.delete(id);
  }
}

export default new ClubService();
