import Staff from '../models/Staff.js';

export class StaffRepository {
  async findAll(query = {}) {
    const filters = {};
    if (query.role) filters.role = query.role;
    if (query.status) filters.status = query.status;
    return Staff.find(filters).populate('team', 'name').sort({ role: 1 });
  }

  async findById(id) { return Staff.findById(id).populate('team', 'name category'); }
  async findByTeam(teamId) { return Staff.find({ team: teamId }).sort({ role: 1 }); }
  async create(data) { const staff = new Staff(data); return staff.save(); }
  async update(id, data) { return Staff.findByIdAndUpdate(id, data, { new: true }); }
  async delete(id) { return Staff.findByIdAndDelete(id); }
}

export default new StaffRepository();