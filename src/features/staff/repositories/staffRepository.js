import Staff from '../models/Staff.js';
import { MOCK_DATA, isUsingMock } from '../../../config/database.js';

export class StaffRepository {
  async findAll(query = {}, options = {}) {
    if (isUsingMock()) {
      const { page = 1, limit = 20 } = options;
      const skip = (page - 1) * limit;
      const staff = MOCK_DATA.staff.slice(skip, skip + limit);
      return { staff, total: MOCK_DATA.staff.length };
    }
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    const [staff, total] = await Promise.all([
      Staff.find(query).skip(skip).limit(limit),
      Staff.countDocuments(query)
    ]);
    return { staff, total };
  }

  async findById(id) {
    if (isUsingMock()) return MOCK_DATA.staff.find(s => s._id === id);
    return Staff.findById(id);
  }

  async findByTeam(teamId) {
    if (isUsingMock()) return MOCK_DATA.staff;
    return Staff.find({ team: teamId }).sort({ role: 1 });
  }

  async create(data) {
    if (isUsingMock()) {
      const staff = { ...data, _id: Date.now().toString() };
      MOCK_DATA.staff.push(staff);
      return staff;
    }
    const staff = new Staff(data);
    return staff.save();
  }

  async update(id, data) {
    if (isUsingMock()) {
      const idx = MOCK_DATA.staff.findIndex(s => s._id === id);
      if (idx >= 0) MOCK_DATA.staff[idx] = { ...MOCK_DATA.staff[idx], ...data };
      return MOCK_DATA.staff[idx];
    }
    return Staff.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    if (isUsingMock()) {
      const idx = MOCK_DATA.staff.findIndex(s => s._id === id);
      if (idx >= 0) MOCK_DATA.staff.splice(idx, 1);
      return { _id: id };
    }
    return Staff.findByIdAndDelete(id);
  }
}

export default new StaffRepository();