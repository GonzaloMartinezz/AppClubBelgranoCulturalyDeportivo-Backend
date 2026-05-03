import playerService from '../services/playerService.js';
import { successResponse, createdResponse, paginatedResponse, deletedResponse, errorResponse } from '../utils/response.js';

export class PlayerController {
  async getPlayers(req, res, next) {
    try {
      const result = await playerService.getPlayers({
        page: req.query.page,
        limit: req.query.limit,
        search: req.query.search,
        position: req.query.position,
        status: req.query.status,
        sort: req.query.sort
      });
      
      res.json(paginatedResponse(result.players, result.meta));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async getPlayerById(req, res, next) {
    try {
      const player = await playerService.getPlayerById(req.params.id);
      res.json(successResponse(player));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async createPlayer(req, res, next) {
    try {
      const player = await playerService.createPlayer(req.body);
      res.status(201).json(createdResponse(player));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async updatePlayer(req, res, next) {
    try {
      const player = await playerService.updatePlayer(req.params.id, req.body);
      res.json(successResponse(player, 'Jugador actualizado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async deletePlayer(req, res, next) {
    try {
      await playerService.deletePlayer(req.params.id);
      res.json(deletedResponse('Jugador eliminado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async getPlayersByTeam(req, res, next) {
    try {
      const players = await playerService.getPlayersByTeam(req.params.teamId);
      res.json(successResponse(players));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }
}

export default new PlayerController();