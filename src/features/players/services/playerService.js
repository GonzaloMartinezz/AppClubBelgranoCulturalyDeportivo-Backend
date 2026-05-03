import playerRepository from '../repositories/playerRepository.js';
import { ApiError } from '../../../core/utils/ApiError.js';
import { getFilters } from '../../../core/utils/pagination.js';

export class PlayerService {
  async getPlayers(query) {
    const { page, limit, skip } = query;
    const sort = query.sort || '-careerStats.matchesPlayed';
    const filters = getFilters({
      search: query.search,
      team: query.team,
      category: query.category,
      position: query.position,
      status: query.status
    });
    
    const result = await playerRepository.findAll(filters, { page, limit, sort, skip });
    
    return {
      players: result.players,
      meta: {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        total: result.total,
        totalPages: Math.ceil(result.total / (parseInt(limit) || 20))
      }
    };
  }

  async getPlayerById(id) {
    const player = await playerRepository.findById(id);
    if (!player) {
      throw ApiError.notFound('Player not found');
    }
    return player;
  }

  async createPlayer(data) {
    const existingPlayer = await playerRepository.findByDni(data.dni);
    if (existingPlayer) {
      throw ApiError.conflict('Player with this DNI already exists');
    }
    
    if (data.number && data.team) {
      const numberExists = await playerRepository.findByNumber(data.team, data.number);
      if (numberExists) {
        throw ApiError.conflict('This jersey number is already taken in the team');
      }
    }
    
    return playerRepository.create(data);
  }

  async updatePlayer(id, data) {
    await this.getPlayerById(id);
    
    if (data.dni) {
      const existingPlayer = await playerRepository.findByDni(data.dni);
      if (existingPlayer && existingPlayer._id.toString() !== id) {
        throw ApiError.conflict('Player with this DNI already exists');
      }
    }
    
    if (data.number && data.team) {
      const numberExists = await playerRepository.findByNumber(data.team, data.number);
      if (numberExists && numberExists._id.toString() !== id) {
        throw ApiError.conflict('This jersey number is already taken in the team');
      }
    }
    
    return playerRepository.update(id, data);
  }

  async deletePlayer(id) {
    await this.getPlayerById(id);
    return playerRepository.delete(id);
  }

  async getPlayersByTeam(teamId) {
    return playerRepository.findByTeam(teamId);
  }

  async getPlayersByCategory(categoryId) {
    return playerRepository.findByCategory(categoryId);
  }

  async updateStats(playerId, statsToAdd) {
    const player = await this.getPlayerById(playerId);
    
    const updatedStats = {
      $inc: {
        'careerStats.matchesPlayed': 1,
        'careerStats.points': statsToAdd.points || 0,
        'careerStats.rebounds': statsToAdd.rebounds || 0,
        'careerStats.assists': statsToAdd.assists || 0,
        'careerStats.steals': statsToAdd.steals || 0,
        'careerStats.blocks': statsToAdd.blocks || 0,
        'careerStats.fouls': statsToAdd.fouls || 0
      }
    };
    
    return playerRepository.update(playerId, updatedStats);
  }
}

export default new PlayerService();