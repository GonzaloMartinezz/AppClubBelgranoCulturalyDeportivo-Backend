import Competition from '../models/Competition.js';

export class CompetitionRepository {
  async findAll(query = {}, options = {}) {
    const { page = 1, limit = 20, sort = '-startDate' } = options;
    const skip = (page - 1) * limit;
    
    const [competitions, total] = await Promise.all([
      Competition.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('category', 'name'),
      Competition.countDocuments(query)
    ]);
    
    return { competitions, total };
  }

  async findById(id) {
    return Competition.findById(id)
      .populate('category', 'name')
      .populate('teams', 'name logo')
      .populate('matches', 'date homeTeam awayTeam status score');
  }

  async findActive() {
    return Competition.findOne({ status: 'ACTIVE' })
      .sort({ startDate: -1 })
      .populate('category', 'name');
  }

  async create(data) {
    const competition = new Competition(data);
    return competition.save();
  }

  async update(id, data) {
    return Competition.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Competition.findByIdAndDelete(id);
  }

  async updateStandings(id, standings) {
    return Competition.findByIdAndUpdate(id, { standings }, { new: true });
  }

  async addMatch(competitionId, matchId) {
    return Competition.findByIdAndUpdate(
      competitionId,
      { $addToSet: { matches: matchId } },
      { new: true }
    );
  }

  async addTeam(competitionId, teamId) {
    return Competition.findByIdAndUpdate(
      competitionId,
      { $addToSet: { teams: teamId } },
      { new: true }
    );
  }
}

export default new CompetitionRepository();