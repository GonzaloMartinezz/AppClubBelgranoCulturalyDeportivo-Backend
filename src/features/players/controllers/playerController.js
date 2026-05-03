import playerService from '../services/playerService.js';
import { successResponse, createdResponse, paginatedResponse, deletedResponse } from '../../../core/utils/response.js';

export class PlayerController {
  async getPlayers(req, res, next) {
    try {
      const result = await playerService.getPlayers({
        page: req.query.page,
        limit: req.query.limit,
        sort: req.query.sort,
        search: req.query.search,
        team: req.query.team,
        category: req.query.category,
        position: req.query.position,
        status: req.query.status
      });
      
      res.json(paginatedResponse(result.players, result.meta));
    } catch (error) {
      next(error);
    }
  }

  async getPlayerById(req, res, next) {
    try {
      const player = await playerService.getPlayerById(req.params.id);
      res.json(successResponse(player));
    } catch (error) {
      next(error);
    }
  }

  async createPlayer(req, res, next) {
    try {
      const player = await playerService.createPlayer(req.body);
      res.status(201).json(createdResponse(player));
    } catch (error) {
      next(error);
    }
  }

  async updatePlayer(req, res, next) {
    try {
      const player = await playerService.updatePlayer(req.params.id, req.body);
      res.json(successResponse(player, 'Player updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async deletePlayer(req, res, next) {
    try {
      await playerService.deletePlayer(req.params.id);
      res.json(deletedResponse('Player deleted successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getPlayersByTeam(req, res, next) {
    try {
      const players = await playerService.getPlayersByTeam(req.params.teamId);
      res.json(successResponse(players));
    } catch (error) {
      next(error);
    }
  }

  async getPlayersByCategory(req, res, next) {
    try {
      const players = await playerService.getPlayersByCategory(req.params.categoryId);
      res.json(successResponse(players));
    } catch (error) {
      next(error);
    }
  }
}

export default new PlayerController();