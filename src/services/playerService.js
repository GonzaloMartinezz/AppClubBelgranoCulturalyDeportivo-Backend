import playerRepository from '../repositories/playerRepository.js';
import { ApiError } from '../utils/ApiError.js';

export class PlayerService {
  async getPlayers(query) {
    const { page, limit, skip } = query;
    const filters = {};
    
    if (query.search) {
      filters.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { lastName: { $regex: query.search, $options: 'i' } }
      ];
    }
    if (query.position) filters.position = query.position;
    if (query.status) filters.status = query.status;

    const result = await playerRepository.findAll(filters, { page, limit, skip });

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
    if (!player) throw ApiError.notFound('Jugador no encontrado');
    return player;
  }

  async createPlayer(data) {
    const existing = await playerRepository.findByDni(data.dni);
    if (existing) throw ApiError.conflict('Ya existe un jugador con este DNI');

    if (data.number && data.team) {
      const numberTaken = await playerRepository.findByNumber(data.team, data.number);
      if (numberTaken) throw ApiError.conflict('Este número ya está usado');
    }

    return playerRepository.create(data);
  }

  async updatePlayer(id, data) {
    await this.getPlayerById(id);
    
    if (data.dni) {
      const existing = await playerRepository.findByDni(data.dni);
      if (existing && existing._id.toString() !== id) throw ApiError.conflict('DNI ya usado');
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
}

export default new PlayerService();