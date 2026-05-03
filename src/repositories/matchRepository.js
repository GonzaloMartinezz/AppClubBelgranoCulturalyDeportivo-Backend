import Match from '../models/Match.js';

export class MatchRepository {
  async findAll(query = {}, options = {}) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const [matches, total] = await Promise.all([
      Match.find(query).sort(options.sort || '-date').skip(skip).limit(limit)
        .populate('homeTeam', 'name logo').populate('awayTeam', 'name logo'),
      Match.countDocuments(query)
    ]);
    return { matches, total };
  }

  async findById(id) {
    return Match.findById(id)
      .populate('homeTeam', 'name logo').populate('awayTeam', 'name logo')
      .populate('mvp.player', 'name lastName number');
  }

  async findLatest() {
    return Match.findOne({ status: 'FINALIZADO' }).sort({ date: -1 })
      .populate('homeTeam', 'name').populate('awayTeam', 'name')
      .populate('mvp.player', 'name lastName number');
  }

  async findNext() {
    return Match.findOne({ status: 'PROGRAMADO' }).sort({ date: 1 })
      .populate('homeTeam', 'name logo').populate('awayTeam', 'name logo');
  }

  async findByTeam(teamId, query = {}) {
    return Match.find({
      $or: [{ homeTeam: teamId }, { awayTeam: teamId }],
      ...query
    }).sort('-date');
  }

  async create(data) {
    const match = new Match(data);
    return match.save();
  }

  async update(id, data) {
    return Match.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Match.findByIdAndDelete(id);
  }
}

export default new MatchRepository();