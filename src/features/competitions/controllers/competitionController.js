import competitionService from '../services/competitionService.js';
import { successResponse, createdResponse, paginatedResponse, deletedResponse } from '../../../core/utils/response.js';

export class CompetitionController {
  async getCompetitions(req, res, next) {
    try {
      const result = await competitionService.getCompetitions({
        page: req.query.page,
        limit: req.query.limit,
        status: req.query.status,
        season: req.query.season,
        division: req.query.division
      });
      res.json(paginatedResponse(result.competitions, result.meta));
    } catch (error) {
      next(error);
    }
  }

  async getCompetitionById(req, res, next) {
    try {
      const competition = await competitionService.getCompetitionById(req.params.id);
      res.json(successResponse(competition));
    } catch (error) {
      next(error);
    }
  }

  async getActive(req, res, next) {
    try {
      const competition = await competitionService.getActiveCompetition();
      res.json(successResponse(competition));
    } catch (error) {
      next(error);
    }
  }

  async createCompetition(req, res, next) {
    try {
      const competition = await competitionService.createCompetition(req.body);
      res.status(201).json(createdResponse(competition));
    } catch (error) {
      next(error);
    }
  }

  async updateCompetition(req, res, next) {
    try {
      const competition = await competitionService.updateCompetition(req.params.id, req.body);
      res.json(successResponse(competition, 'Competition updated'));
    } catch (error) {
      next(error);
    }
  }

  async getStandings(req, res, next) {
    try {
      const standings = await competitionService.getStandings(req.params.id);
      res.json(successResponse(standings));
    } catch (error) {
      next(error);
    }
  }

  async updateStandings(req, res, next) {
    try {
      const competition = await competitionService.updateStandings(req.params.id, req.body);
      res.json(successResponse(competition, 'Standings updated'));
    } catch (error) {
      next(error);
    }
  }

  async deleteCompetition(req, res, next) {
    try {
      await competitionService.deleteCompetition(req.params.id);
      res.json(deletedResponse('Competition deleted'));
    } catch (error) {
      next(error);
    }
  }
}

export default new CompetitionController();