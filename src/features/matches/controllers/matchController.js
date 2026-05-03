import matchService from '../services/matchService.js';
import { successResponse, createdResponse, paginatedResponse, deletedResponse } from '../../../core/utils/response.js';

export class MatchController {
  async getMatches(req, res, next) {
    try {
      const result = await matchService.getMatches({
        page: req.query.page,
        limit: req.query.limit,
        team: req.query.team,
        competition: req.query.competition,
        status: req.query.status,
        dateFrom: req.query.dateFrom,
        dateTo: req.query.dateTo
      });
      
      res.json(paginatedResponse(result.matches, result.meta));
    } catch (error) {
      next(error);
    }
  }

  async getMatchById(req, res, next) {
    try {
      const match = await matchService.getMatchById(req.params.id);
      res.json(successResponse(match));
    } catch (error) {
      next(error);
    }
  }

  async getLatest(req, res, next) {
    try {
      const match = await matchService.getLatestMatch();
      res.json(successResponse(match));
    } catch (error) {
      next(error);
    }
  }

  async getNext(req, res, next) {
    try {
      const match = await matchService.getNextMatch();
      res.json(successResponse(match));
    } catch (error) {
      next(error);
    }
  }

  async createMatch(req, res, next) {
    try {
      const match = await matchService.createMatch(req.body);
      res.status(201).json(createdResponse(match));
    } catch (error) {
      next(error);
    }
  }

  async updateMatch(req, res, next) {
    try {
      const match = await matchService.updateMatch(req.params.id, req.body);
      res.json(successResponse(match, 'Match updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async updateScore(req, res, next) {
    try {
      const match = await matchService.updateScore(req.params.id, req.body);
      res.json(successResponse(match, 'Score updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async finishMatch(req, res, next) {
    try {
      const match = await matchService.finishMatch(req.params.id, req.body);
      res.json(successResponse(match, 'Match finished successfully'));
    } catch (error) {
      next(error);
    }
  }

  async updateBoxScore(req, res, next) {
    try {
      const match = await matchService.updateBoxScore(req.params.id, req.body);
      res.json(successResponse(match, 'Box score updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async setMVP(req, res, next) {
    try {
      const match = await matchService.setMVP(req.params.id, req.body);
      res.json(successResponse(match, 'MVP set successfully'));
    } catch (error) {
      next(error);
    }
  }

  async deleteMatch(req, res, next) {
    try {
      await matchService.deleteMatch(req.params.id);
      res.json(deletedResponse('Match deleted successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getMatchesByTeam(req, res, next) {
    try {
      const result = await matchService.getMatchesByTeam(req.params.teamId, {
        page: req.query.page,
        limit: req.query.limit
      });
      res.json(paginatedResponse(result.matches, result.meta));
    } catch (error) {
      next(error);
    }
  }
}

export default new MatchController();