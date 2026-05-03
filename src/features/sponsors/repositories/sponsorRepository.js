import Sponsor from '../models/Sponsor.js';
import { MOCK_DATA, isUsingMock } from '../../../config/database.js';

export class SponsorRepository {
  async findAll(query = {}, options = {}) {
    if (isUsingMock()) {
      const { page = 1, limit = 20 } = options;
      const skip = (page - 1) * limit;
      const sponsors = MOCK_DATA.sponsors.slice(skip, skip + limit);
      return { sponsors, total: MOCK_DATA.sponsors.length };
    }
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    const [sponsors, total] = await Promise.all([
      Sponsor.find(query).sort({ level: 1, displayOrder: 1 }).skip(skip).limit(limit),
      Sponsor.countDocuments(query)
    ]);
    return { sponsors, total };
  }

  async findById(id) {
    if (isUsingMock()) return MOCK_DATA.sponsors.find(s => s._id === id);
    return Sponsor.findById(id);
  }

  async findForHome() {
    if (isUsingMock()) return MOCK_DATA.sponsors.filter(s => s.showOnHome && s.isActive);
    return Sponsor.find({ showOnHome: true, isActive: true }).sort({ level: 1, displayOrder: 1 });
  }

  async create(data) {
    if (isUsingMock()) {
      const sponsor = { ...data, _id: Date.now().toString() };
      MOCK_DATA.sponsors.push(sponsor);
      return sponsor;
    }
    const sponsor = new Sponsor(data);
    return sponsor.save();
  }

  async update(id, data) {
    if (isUsingMock()) {
      const idx = MOCK_DATA.sponsors.findIndex(s => s._id === id);
      if (idx >= 0) MOCK_DATA.sponsors[idx] = { ...MOCK_DATA.sponsors[idx], ...data };
      return MOCK_DATA.sponsors[idx];
    }
    return Sponsor.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    if (isUsingMock()) {
      const idx = MOCK_DATA.sponsors.findIndex(s => s._id === id);
      if (idx >= 0) MOCK_DATA.sponsors.splice(idx, 1);
      return { _id: id };
    }
    return Sponsor.findByIdAndDelete(id);
  }
}

export default new SponsorRepository();