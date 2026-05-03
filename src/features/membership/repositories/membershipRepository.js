import Membership from '../models/Membership.js';

export class MembershipRepository {
  async findAll(query = {}, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    const [memberships, total] = await Promise.all([
      Membership.find(query).populate('category', 'name').skip(skip).limit(limit),
      Membership.countDocuments(query)
    ]);
    return { memberships, total };
  }

  async findById(id) {
    return Membership.findById(id).populate('category', 'name');
  }

  async findByQRToken(qrToken) {
    return Membership.findOne({ qrToken });
  }

  async findByDni(dni) {
    return Membership.findOne({ 'member.dni': dni, status: 'ACTIVE' });
  }

  async findActive() {
    const now = new Date();
    return Membership.find({
      status: 'ACTIVE',
      endDate: { $gte: now }
    }).populate('category', 'name');
  }

  async create(data) {
    const membership = new Membership(data);
    return membership.save();
  }

  async update(id, data) {
    return Membership.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Membership.findByIdAndDelete(id);
  }

  async addAccessEntry(id, matchId, userId) {
    return Membership.findByIdAndUpdate(id, {
      $push: {
        accessHistory: { match: matchId, entryTime: new Date(), validatedBy: userId }
      }
    }, { new: true });
  }

  async getAttendanceByMatch(matchId) {
    return Membership.aggregate([
      { $unwind: '$accessHistory' },
      { $match: { 'accessHistory.match': matchId } },
      { $count: 'total' }
    ]);
  }
}

export default new MembershipRepository();