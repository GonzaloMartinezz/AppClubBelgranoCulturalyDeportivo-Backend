import membershipService from '../services/membershipService.js';
import { successResponse, createdResponse, paginatedResponse, deletedResponse } from '../../../core/utils/response.js';

export class MembershipController {
  async getMemberships(req, res, next) {
    try {
      const result = await membershipService.getMemberships(req.query);
      res.json(paginatedResponse(result.memberships, result.meta));
    } catch (error) { next(error); }
  }

  async getMembershipById(req, res, next) {
    try {
      const membership = await membershipService.getMembershipById(req.params.id);
      res.json(successResponse(membership));
    } catch (error) { next(error); }
  }

  async validateQR(req, res, next) {
    try {
      const result = await membershipService.validateQR(req.body.qrToken, req.body.matchId, req.user?._id);
      res.json(successResponse(result, 'QR validated successfully'));
    } catch (error) { next(error); }
  }

  async createMembership(req, res, next) {
    try {
      const membership = await membershipService.createMembership(req.body);
      res.status(201).json(createdResponse(membership));
    } catch (error) { next(error); }
  }

  async updateMembership(req, res, next) {
    try {
      const membership = await membershipService.updateMembership(req.params.id, req.body);
      res.json(successResponse(membership, 'Membership updated'));
    } catch (error) { next(error); }
  }

  async deleteMembership(req, res, next) {
    try {
      await membershipService.deleteMembership(req.params.id);
      res.json(deletedResponse('Membership deleted'));
    } catch (error) { next(error); }
  }

  async getAttendance(req, res, next) {
    try {
      const attendance = await membershipService.getAttendance(req.params.matchId);
      res.json(successResponse({ attendance }));
    } catch (error) { next(error); }
  }
}

export default new MembershipController();