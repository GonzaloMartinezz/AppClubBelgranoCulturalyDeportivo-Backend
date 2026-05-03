import Club from '../models/Club.js';

class ClubRepository {
  async findAll() {
    return await Club.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Club.findById(id);
  }

  async findMain() {
    return await Club.findOne({ active: true });
  }

  async create(data) {
    return await Club.create(data);
  }

  async update(id, data) {
    return await Club.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await Club.findByIdAndDelete(id);
  }
}

export default new ClubRepository();
