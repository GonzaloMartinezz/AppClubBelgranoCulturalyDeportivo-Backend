import Player from '../models/Player.js';

const getPagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export class PlayerRepository {
  async findAll(query = {}, options = {}) {
    const { page, limit, skip } = getPagination(query);
    const [players, total] = await Promise.all([
      Player.find(query).sort(options.sort || '-createdAt').skip(skip).limit(limit).populate('team', 'name'),
      Player.countDocuments(query)
    ]);
    return { players, total };
  }

  async findById(id) {
    return Player.findById(id).populate('team', 'name category');
  }

  async findByDni(dni) {
    return Player.findOne({ dni });
  }

  async findByNumber(teamId, number) {
    return Player.findOne({ team: teamId, number });
  }

  async create(data) {
    const player = new Player(data);
    return player.save();
  }

  async update(id, data) {
    return Player.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Player.findByIdAndDelete(id);
  }

  async findByTeam(teamId) {
    return Player.find({ team: teamId }).sort({ number: 1 });
  }
}

export default new PlayerRepository();