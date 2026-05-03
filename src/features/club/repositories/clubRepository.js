import Club from '../models/Club.js';
import { MOCK_DATA, isUsingMock } from '../../../config/database.js';

export class ClubRepository {
  async findAll() {
    if (isUsingMock()) return [MOCK_DATA.club];
    return Club.find({ isActive: true });
  }

  async findById(id) {
    if (isUsingMock()) return MOCK_DATA.club;
    return Club.findById(id);
  }

  async findMain() {
    if (isUsingMock()) return MOCK_DATA.club;
    return Club.findOne({ isActive: true }).sort({ createdAt: 1 });
  }

  async create(data) {
    if (isUsingMock()) {
      const club = { ...data, _id: Date.now().toString() };
      return club;
    }
    const club = new Club(data);
    return club.save();
  }

  async update(id, data) {
    if (isUsingMock()) return { ...MOCK_DATA.club, ...data };
    return Club.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    if (isUsingMock()) return { _id: id };
    return Club.findByIdAndUpdate(id, { isActive: false });
  }
}

export default new ClubRepository();