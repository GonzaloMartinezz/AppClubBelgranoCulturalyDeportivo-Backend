import sponsorRepository from '../repositories/sponsorRepository.js';
import { ApiError } from '../../../core/utils/ApiError.js';

export class SponsorService {
  async getSponsors(query) {
    const filters = {};
    if (query.level) filters.level = query.level;
    if (query.isActive) filters.isActive = query.isActive === 'true';
    
    const result = await sponsorRepository.findAll(filters, { page: query.page, limit: query.limit });
    
    return {
      sponsors: result.sponsors,
      meta: { page: parseInt(query.page) || 1, limit: parseInt(query.limit) || 20, total: result.total }
    };
  }

  async getSponsorById(id) {
    const sponsor = await sponsorRepository.findById(id);
    if (!sponsor) throw ApiError.notFound('Sponsor not found');
    return sponsor;
  }

  async getSponsorsForHome() {
    return sponsorRepository.findForHome();
  }

  async createSponsor(data) {
    return sponsorRepository.create(data);
  }

  async updateSponsor(id, data) {
    await this.getSponsorById(id);
    return sponsorRepository.update(id, data);
  }

  async deleteSponsor(id) {
    await this.getSponsorById(id);
    return sponsorRepository.delete(id);
  }
}

export default new SponsorService();