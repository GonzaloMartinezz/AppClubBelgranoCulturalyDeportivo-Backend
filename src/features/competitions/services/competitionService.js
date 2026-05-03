import competitionRepository from '../repositories/competitionRepository.js';
import { ApiError } from '../../../core/utils/ApiError.js';

export class CompetitionService {
  async getCompetitions(query) {
    const { page, limit } = query;
    const filters = {};
    
    if (query.status) filters.status = query.status;
    if (query.season) filters.season = query.season;
    if (query.division) filters.division = query.division;
    
    const result = await competitionRepository.findAll(filters, { page, limit });
    
    return {
      competitions: result.competitions,
      meta: {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        total: result.total
      }
    };
  }

  async getCompetitionById(id) {
    const competition = await competitionRepository.findById(id);
    if (!competition) {
      throw ApiError.notFound('Competition not found');
    }
    return competition;
  }

  async getActiveCompetition() {
    const competition = await competitionRepository.findActive();
    if (!competition) {
      throw ApiError.notFound('No active competition');
    }
    return competition;
  }

  async createCompetition(data) {
    return competitionRepository.create(data);
  }

  async updateCompetition(id, data) {
    await this.getCompetitionById(id);
    return competitionRepository.update(id, data);
  }

  async updateStandings(id, standings) {
    await this.getCompetitionById(id);
    return competitionRepository.updateStandings(id, standings);
  }

  async deleteCompetition(id) {
    await this.getCompetitionById(id);
    return competitionRepository.delete(id);
  }

  async getStandings(id) {
    const competition = await this.getCompetitionById(id);
    const standings = competition.standings.sort((a, b) => b.points - a.points);
    return {
      competition: {
        _id: competition._id,
        name: competition.name,
        season: competition.season,
        division: competition.division
      },
      standings: standings.map((team, index) => ({
        position: index + 1,
        team: team.team,
        played: team.played,
        won: team.won,
        lost: team.lost,
        pointsFor: team.pointsFor,
        pointsAgainst: team.pointsAgainst,
        difference: team.difference,
        points: team.points
      }))
    };
  }
}

export default new CompetitionService();