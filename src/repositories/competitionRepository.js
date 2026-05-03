import Competition from '../models/Competition.js';

class CompetitionRepository {
  async findAll(params = {}) {
    const { page = 1, limit = 20, ...filters } = params;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    return await Competition.find(filters).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Competition.findById(id);
  }

  async findActive() {
    return await Competition.findOne({ isActive: true });
  }

  async create(data) {
    return await Competition.create(data);
  }

  async update(id, data) {
    return await Competition.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await Competition.findByIdAndDelete(id);
  }
}

export default new CompetitionRepository();
