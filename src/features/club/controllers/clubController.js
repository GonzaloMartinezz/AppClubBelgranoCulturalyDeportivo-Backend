import clubService from '../services/clubService.js';
import { successResponse, createdResponse } from '../../../core/utils/response.js';

export class ClubController {
  async getClubs(req, res, next) {
    try {
      const clubs = await clubService.getClubs();
      res.json(successResponse(clubs));
    } catch (error) { next(error); }
  }

  async getClubById(req, res, next) {
    try {
      const club = await clubService.getClubById(req.params.id);
      res.json(successResponse(club));
    } catch (error) { next(error); }
  }

  async getMainClub(req, res, next) {
    try {
      const club = await clubService.getMainClub();
      res.json(successResponse(club));
    } catch (error) { next(error); }
  }

  async createClub(req, res, next) {
    try {
      const club = await clubService.createClub(req.body);
      res.status(201).json(createdResponse(club));
    } catch (error) { next(error); }
  }

  async updateClub(req, res, next) {
    try {
      const club = await clubService.updateClub(req.params.id, req.body);
      res.json(successResponse(club, 'Club updated'));
    } catch (error) { next(error); }
  }
}

export default new ClubController();