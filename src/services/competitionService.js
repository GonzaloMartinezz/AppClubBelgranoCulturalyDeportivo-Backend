import competitionRepository from '../repositories/competitionRepository.js';

class CompetitionService {
  async getAll(params) {
    return await competitionRepository.findAll(params);
  }

  async getById(id) {
    const competition = await competitionRepository.findById(id);
    if (!competition) throw new Error('Competición no encontrada');
    return competition;
  }

  async getActive() {
    const competition = await competitionRepository.findActive();
    return competition || { name: 'Liga Federal 2026', type: 'league', season: '2026', isActive: true, standings: [] };
  }

  async getStandings(id) {
    const competition = await this.getById(id);
    return competition.standings;
  }

  async create(data) {
    return await competitionRepository.create(data);
  }

  async update(id, data) {
    return await competitionRepository.update(id, data);
  }

  async delete(id) {
    await competitionRepository.delete(id);
  }
}

export default new CompetitionService();
