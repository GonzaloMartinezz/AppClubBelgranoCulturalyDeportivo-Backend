import Match from '../models/Match.js';
import { MOCK_DATA, isUsingMock } from '../../../config/database.js';

export class MatchRepository {
  async findAll(query = {}, options = {}) {
    if (isUsingMock()) {
      const { page = 1, limit = 20 } = options;
      const skip = (page - 1) * limit;
      const matches = MOCK_DATA.matches.slice(skip, skip + limit);
      return { matches, total: MOCK_DATA.matches.length };
    }
    
    const { page = 1, limit = 20, sort = '-date' } = options;
    const skip = (page - 1) * limit;
    
    const [matches, total] = await Promise.all([
      Match.find(query).sort(sort).skip(skip).limit(limit),
      Match.countDocuments(query)
    ]);
    
    return { matches, total };
  }

  async findById(id) {
    if (isUsingMock()) return MOCK_DATA.matches.find(m => m._id === id);
    return Match.findById(id);
  }

  async findLatest() {
    if (isUsingMock()) {
      const finished = MOCK_DATA.matches.find(m => m.status === 'FINAL');
      return finished || MOCK_DATA.matches[0];
    }
    return Match.findOne({ status: 'FINAL' }).sort({ date: -1 });
  }

  async findNext() {
    if (isUsingMock()) {
      const scheduled = MOCK_DATA.matches.find(m => m.status === 'SCHEDULED');
      return scheduled || null;
    }
    const now = new Date();
    return Match.findOne({ date: { $gte: now }, status: 'SCHEDULED' }).sort({ date: 1 });
  }

  async findByTeam(teamId, query = {}, options = {}) {
    if (isUsingMock()) return { matches: MOCK_DATA.matches.slice(0, 5), total: 5 };
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    const baseQuery = { $or: [{ homeTeam: teamId }, { awayTeam: teamId }], ...query };
    const [matches, total] = await Promise.all([
      Match.find(baseQuery).sort('-date').skip(skip).limit(limit),
      Match.countDocuments(baseQuery)
    ]);
    return { matches, total };
  }

  async create(data) {
    if (isUsingMock()) {
      const match = { ...data, _id: Date.now().toString() };
      MOCK_DATA.matches.push(match);
      return match;
    }
    const match = new Match(data);
    return match.save();
  }

  async update(id, data) {
    if (isUsingMock()) {
      const idx = MOCK_DATA.matches.findIndex(m => m._id === id);
      if (idx >= 0) {
        MOCK_DATA.matches[idx] = { ...MOCK_DATA.matches[idx], ...data };
        return MOCK_DATA.matches[idx];
      }
      return null;
    }
    return Match.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    if (isUsingMock()) {
      const idx = MOCK_DATA.matches.findIndex(m => m._id === id);
      if (idx >= 0) MOCK_DATA.matches.splice(idx, 1);
      return { _id: id };
    }
    return Match.findByIdAndDelete(id);
  }

  async updateScore(id, score) {
    return this.update(id, { score });
  }

  async updateBoxScore(id, boxScoreData) {
    return this.update(id, { boxScore: boxScoreData });
  }

  async setMVP(id, mvpData) {
    return this.update(id, { mvp: mvpData });
  }
}

export default new MatchRepository();