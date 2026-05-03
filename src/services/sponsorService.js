import sponsorRepository from '../repositories/sponsorRepository.js';
import { ApiError } from '../utils/ApiError.js';

export class SponsorService {
  async getSponsors(query) {
    const sponsors = await sponsorRepository.findAll(query);
    return sponsors;
  }

  async getSponsorById(id) {
    const sponsor = await sponsorRepository.findById(id);
    if (!sponsor) throw ApiError.notFound('Sponsor no encontrado');
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