import User from '../models/User.js';

export class UserRepository {
  async findAll(query = {}, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find(query).select('-password -refreshTokens').skip(skip).limit(limit),
      User.countDocuments(query)
    ]);
    return { users, total };
  }

  async findById(id) {
    return User.findById(id).select('-password -refreshTokens');
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async create(data) {
    const user = new User(data);
    return user.save();
  }

  async update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-password -refreshTokens');
  }

  async delete(id) {
    return User.findByIdAndDelete(id);
  }

  async updateLastLogin(id) {
    return User.findByIdAndUpdate(id, { lastLogin: new Date() });
  }

  async addRefreshToken(id, token) {
    return User.findByIdAndUpdate(id, { $push: { refreshTokens: token } });
  }

  async removeRefreshToken(id, token) {
    return User.findByIdAndUpdate(id, { $pull: { refreshTokens: token } });
  }
}

export default new UserRepository();