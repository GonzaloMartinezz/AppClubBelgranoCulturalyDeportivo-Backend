import Player from '../models/Player.js';
import { MOCK_DATA, isUsingMock } from '../../../config/database.js';

export class PlayerRepository {
  async findAll(query = {}, options = {}) {
    if (isUsingMock()) {
      const { page = 1, limit = 20 } = options;
      const skip = (page - 1) * limit;
      const players = MOCK_DATA.players.slice(skip, skip + limit);
      return { players, total: MOCK_DATA.players.length };
    }
    
    const { page = 1, limit = 20, sort = '-createdAt' } = options;
    const skip = (page - 1) * limit;
    
    const [players, total] = await Promise.all([
      Player.find(query).sort(sort).skip(skip).limit(limit),
      Player.countDocuments(query)
    ]);
    
    return { players, total };
  }

  async findById(id) {
    if (isUsingMock()) return MOCK_DATA.players.find(p => p._id === id);
    return Player.findById(id);
  }

  async findByDni(dni) {
    if (isUsingMock()) return MOCK_DATA.players.find(p => p.dni === dni);
    return Player.findOne({ dni });
  }

  async findByNumber(teamId, number) {
    if (isUsingMock()) return null;
    return Player.findOne({ team: teamId, number });
  }

  async create(data) {
    if (isUsingMock()) {
      const player = { ...data, _id: Date.now().toString() };
      MOCK_DATA.players.push(player);
      return player;
    }
    const player = new Player(data);
    return player.save();
  }

  async update(id, data) {
    if (isUsingMock()) {
      const idx = MOCK_DATA.players.findIndex(p => p._id === id);
      if (idx >= 0) MOCK_DATA.players[idx] = { ...MOCK_DATA.players[idx], ...data };
      return MOCK_DATA.players[idx];
    }
    return Player.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    if (isUsingMock()) {
      const idx = MOCK_DATA.players.findIndex(p => p._id === id);
      if (idx >= 0) MOCK_DATA.players.splice(idx, 1);
      return { _id: id };
    }
    return Player.findByIdAndDelete(id);
  }

  async findByTeam(teamId) {
    if (isUsingMock()) return MOCK_DATA.players;
    return Player.find({ team: teamId }).sort({ number: 1 });
  }

  async findByCategory(categoryId) {
    if (isUsingMock()) return MOCK_DATA.players;
    return Player.find({ category: categoryId }).sort({ number: 1 });
  }
}

export default new PlayerRepository();