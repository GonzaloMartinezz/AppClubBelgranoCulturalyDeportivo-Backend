import staffRepository from '../repositories/staffRepository.js';
import { ApiError } from '../../../core/utils/ApiError.js';

export class StaffService {
  async getStaff(query) {
    const filters = {};
    if (query.team) filters.team = query.team;
    if (query.role) filters.role = query.role;
    if (query.status) filters.status = query.status;
    
    const result = await staffRepository.findAll(filters, { page: query.page, limit: query.limit });
    return { staff: result.staff, meta: { page: parseInt(query.page) || 1, limit: parseInt(query.limit) || 20, total: result.total } };
  }

  async getStaffById(id) {
    const staff = await staffRepository.findById(id);
    if (!staff) throw ApiError.notFound('Staff member not found');
    return staff;
  }

  async getStaffByTeam(teamId) {
    return staffRepository.findByTeam(teamId);
  }

  async createStaff(data) {
    return staffRepository.create(data);
  }

  async updateStaff(id, data) {
    await this.getStaffById(id);
    return staffRepository.update(id, data);
  }

  async deleteStaff(id) {
    await this.getStaffById(id);
    return staffRepository.delete(id);
  }
}

export default new StaffService();