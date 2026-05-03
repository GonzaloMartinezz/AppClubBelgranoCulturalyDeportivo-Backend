import clubRepository from '../repositories/clubRepository.js';
import { ApiError } from '../../../core/utils/ApiError.js';

export class ClubService {
  async getClubs() {
    return clubRepository.findAll();
  }

  async getClubById(id) {
    const club = await clubRepository.findById(id);
    if (!club) throw ApiError.notFound('Club not found');
    return club;
  }

  async getMainClub() {
    const club = await clubRepository.findMain();
    if (!club) throw ApiError.notFound('Club not configured');
    return club;
  }

  async createClub(data) {
    return clubRepository.create(data);
  }

  async updateClub(id, data) {
    await this.getClubById(id);
    return clubRepository.update(id, data);
  }
}

export default new ClubService();