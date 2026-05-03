import Sponsor from '../models/Sponsor.js';

export class SponsorRepository {
  async findAll(query = {}) {
    const { level, isActive } = query;
    const filters = {};
    if (level) filters.level = level;
    if (isActive !== undefined) filters.isActive = isActive === 'true';

    return Sponsor.find(filters).sort({ level: 1, displayOrder: 1 });
  }

  async findById(id) { return Sponsor.findById(id); }
  async findForHome() { return Sponsor.find({ showOnHome: true, isActive: true }).sort({ displayOrder: 1 }); }
  async create(data) { const sponsor = new Sponsor(data); return sponsor.save(); }
  async update(id, data) { return Sponsor.findByIdAndUpdate(id, data, { new: true }); }
  async delete(id) { return Sponsor.findByIdAndDelete(id); }
}

export default new SponsorRepository();