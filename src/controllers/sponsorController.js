import sponsorService from '../services/sponsorService.js';
import { successResponse, createdResponse, deletedResponse, errorResponse } from '../utils/response.js';

export class SponsorController {
  async getSponsors(req, res, next) {
    try {
      const sponsors = await sponsorService.getSponsors(req.query);
      res.json(successResponse(sponsors));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async getSponsorById(req, res, next) {
    try {
      const sponsor = await sponsorService.getSponsorById(req.params.id);
      res.json(successResponse(sponsor));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async getForHome(req, res, next) {
    try {
      const sponsors = await sponsorService.getSponsorsForHome();
      res.json(successResponse(sponsors));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async createSponsor(req, res, next) {
    try {
      const sponsor = await sponsorService.createSponsor(req.body);
      res.status(201).json(createdResponse(sponsor));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async updateSponsor(req, res, next) {
    try {
      const sponsor = await sponsorService.updateSponsor(req.params.id, req.body);
      res.json(successResponse(sponsor, 'Sponsor actualizado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }

  async deleteSponsor(req, res, next) {
    try {
      await sponsorService.deleteSponsor(req.params.id);
      res.json(deletedResponse('Sponsor eliminado'));
    } catch (error) {
      res.status(error.statusCode || 500).json(errorResponse(error));
    }
  }
}

export default new SponsorController();