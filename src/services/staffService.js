import staffRepository from '../repositories/staffRepository.js';
import { ApiError } from '../utils/ApiError.js';

export class StaffService {
  async getStaff(query) { return staffRepository.findAll(query); }
  async getStaffById(id) { const s = await staffRepository.findById(id); if (!s) throw ApiError.notFound('Staff no encontrado'); return s; }
  async getStaffByTeam(teamId) { return staffRepository.findByTeam(teamId); }
  async createStaff(data) { return staffRepository.create(data); }
  async updateStaff(id, data) { await this.getStaffById(id); return staffRepository.update(id, data); }
  async deleteStaff(id) { await this.getStaffById(id); return staffRepository.delete(id); }
}

export default new StaffService();