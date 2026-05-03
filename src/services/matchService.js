import matchRepository from '../repositories/matchRepository.js';
import { ApiError } from '../utils/ApiError.js';

export class MatchService {
  async getMatches(query) {
    const filters = {};
    if (query.status) filters.status = query.status;
    if (query.competition) filters.competition = query.competition;
    
    const result = await matchRepository.findAll(filters, { page: query.page, limit: query.limit });
    
    return {
      matches: result.matches,
      meta: { page: parseInt(query.page) || 1, limit: parseInt(query.limit) || 20, total: result.total }
    };
  }

  async getMatchById(id) {
    const match = await matchRepository.findById(id);
    if (!match) throw ApiError.notFound('Partido no encontrado');
    return match;
  }

  async getLatestMatch() {
    const match = await matchRepository.findLatest();
    if (!match) throw ApiError.notFound('No hay partidos jugados');
    return match;
  }

  async getNextMatch() {
    const match = await matchRepository.findNext();
    if (!match) throw ApiError.notFound('No hay próximos partidos');
    return match;
  }

  async createMatch(data) {
    return matchRepository.create(data);
  }

  async updateMatch(id, data) {
    await this.getMatchById(id);
    return matchRepository.update(id, data);
  }

  async updateScore(id, score) {
    const match = await this.getMatchById(id);
    if (match.status === 'FINALIZADO') {
      throw ApiError.badRequest('No se puede modificar un partido finalizado');
    }
    return matchRepository.update(id, { score, status: 'EN_JUEGO' });
  }

  async finishMatch(id, score) {
    const match = await this.getMatchById(id);
    return matchRepository.update(id, {
      status: 'FINALIZADO',
      score: { home: score.home, away: score.away, quarter: 4 }
    });
  }

  async setMVP(id, mvpData) {
    await this.getMatchById(id);
    return matchRepository.update(id, { mvp: mvpData });
  }

  async deleteMatch(id) {
    await this.getMatchById(id);
    return matchRepository.delete(id);
  }

  async getMatchesByTeam(teamId) {
    return matchRepository.findByTeam(teamId);
  }
}

export default new MatchService();