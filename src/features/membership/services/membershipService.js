import membershipRepository from '../repositories/membershipRepository.js';
import { ApiError } from '../../../core/utils/ApiError.js';

export class MembershipService {
  async getMemberships(query) {
    const filters = {};
    if (query.status) filters.status = query.status;
    if (query.type) filters.type = query.type;
    if (query.category) filters.category = query.category;
    
    const result = await membershipRepository.findAll(filters, { page: query.page, limit: query.limit });
    return { memberships: result.memberships, meta: { page: parseInt(query.page) || 1, limit: parseInt(query.limit) || 20, total: result.total } };
  }

  async getMembershipById(id) {
    const membership = await membershipRepository.findById(id);
    if (!membership) throw ApiError.notFound('Membership not found');
    return membership;
  }

  async validateQR(qrToken, matchId, userId) {
    const membership = await membershipRepository.findByQRToken(qrToken);
    if (!membership) throw ApiError.notFound('Invalid QR code');
    if (membership.status !== 'ACTIVE') throw ApiError.forbidden('Membership not active');
    if (membership.endDate < new Date()) throw ApiError.forbidden('Membership expired');
    
    const alreadyUsed = membership.accessHistory.some(
      entry => entry.match.toString() === matchId
    );
    if (alreadyUsed) throw ApiError.conflict('QR already used for this match');
    
    await membershipRepository.addAccessEntry(membership._id, matchId, userId);
    return { valid: true, member: membership.member };
  }

  async generateQR(data) {
    return membershipRepository.create(data);
  }

  async createMembership(data) {
    return membershipRepository.create(data);
  }

  async updateMembership(id, data) {
    await this.getMembershipById(id);
    return membershipRepository.update(id, data);
  }

  async deleteMembership(id) {
    await this.getMembershipById(id);
    return membershipRepository.delete(id);
  }

  async getAttendance(matchId) {
    const result = await membershipRepository.getAttendanceByMatch(matchId);
    return result[0]?.total || 0;
  }
}

export default new MembershipService();