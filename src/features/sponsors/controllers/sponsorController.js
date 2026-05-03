import sponsorService from '../services/sponsorService.js';
import { successResponse, createdResponse, paginatedResponse, deletedResponse } from '../../../core/utils/response.js';

export class SponsorController {
  async getSponsors(req, res, next) {
    try {
      const result = await sponsorService.getSponsors(req.query);
      res.json(paginatedResponse(result.sponsors, result.meta));
    } catch (error) { next(error); }
  }

  async getSponsorById(req, res, next) {
    try {
      const sponsor = await sponsorService.getSponsorById(req.params.id);
      res.json(successResponse(sponsor));
    } catch (error) { next(error); }
  }

  async getForHome(req, res, next) {
    try {
      const sponsors = await sponsorService.getSponsorsForHome();
      res.json(successResponse(sponsors));
    } catch (error) { next(error); }
  }

  async createSponsor(req, res, next) {
    try {
      const sponsor = await sponsorService.createSponsor(req.body);
      res.status(201).json(createdResponse(sponsor));
    } catch (error) { next(error); }
  }

  async updateSponsor(req, res, next) {
    try {
      const sponsor = await sponsorService.updateSponsor(req.params.id, req.body);
      res.json(successResponse(sponsor, 'Sponsor updated'));
    } catch (error) { next(error); }
  }

  async deleteSponsor(req, res, next) {
    try {
      await sponsorService.deleteSponsor(req.params.id);
      res.json(deletedResponse('Sponsor deleted'));
    } catch (error) { next(error); }
  }
}

export default new SponsorController();