import matchService from '../services/matchService.js';
import { successResponse, createdResponse, paginatedResponse, deletedResponse, errorResponse } from '../utils/response.js';

export class MatchController {
  async getMatches(req, res, next) {
    try {
      const result = await matchService.getMatches(req.query);
      res.json(paginatedResponse(result.matches, result.meta));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async getMatchById(req, res, next) {
    try {
      const match = await matchService.getMatchById(req.params.id);
      res.json(successResponse(match));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async getLatest(req, res, next) {
    try {
      const match = await matchService.getLatestMatch();
      res.json(successResponse(match));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async getNext(req, res, next) {
    try {
      const match = await matchService.getNextMatch();
      res.json(successResponse(match));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async createMatch(req, res, next) {
    try {
      const match = await matchService.createMatch(req.body);
      res.status(201).json(createdResponse(match));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async updateMatch(req, res, next) {
    try {
      const match = await matchService.updateMatch(req.params.id, req.body);
      res.json(successResponse(match, 'Partido actualizado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async updateScore(req, res, next) {
    try {
      const match = await matchService.updateScore(req.params.id, req.body);
      res.json(successResponse(match, 'Score actualizado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async finishMatch(req, res, next) {
    try {
      const match = await matchService.finishMatch(req.params.id, req.body);
      res.json(successResponse(match, 'Partido finalizado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async setMVP(req, res, next) {
    try {
      const match = await matchService.setMVP(req.params.id, req.body);
      res.json(successResponse(match, 'MVP asignado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async deleteMatch(req, res, next) {
    try {
      await matchService.deleteMatch(req.params.id);
      res.json(deletedResponse('Partido eliminado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async getMatchesByTeam(req, res, next) {
    try {
      const matches = await matchService.getMatchesByTeam(req.params.teamId);
      res.json(successResponse(matches));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }
}

export default new MatchController();