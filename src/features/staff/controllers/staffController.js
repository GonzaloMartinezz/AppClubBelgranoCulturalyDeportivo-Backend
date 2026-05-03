import staffService from '../services/staffService.js';
import { successResponse, createdResponse, paginatedResponse, deletedResponse } from '../../../core/utils/response.js';

export class StaffController {
  async getStaff(req, res, next) {
    try {
      const result = await staffService.getStaff(req.query);
      res.json(paginatedResponse(result.staff, result.meta));
    } catch (error) { next(error); }
  }

  async getStaffById(req, res, next) {
    try {
      const staff = await staffService.getStaffById(req.params.id);
      res.json(successResponse(staff));
    } catch (error) { next(error); }
  }

  async getStaffByTeam(req, res, next) {
    try {
      const staff = await staffService.getStaffByTeam(req.params.teamId);
      res.json(successResponse(staff));
    } catch (error) { next(error); }
  }

  async createStaff(req, res, next) {
    try {
      const staff = await staffService.createStaff(req.body);
      res.status(201).json(createdResponse(staff));
    } catch (error) { next(error); }
  }

  async updateStaff(req, res, next) {
    try {
      const staff = await staffService.updateStaff(req.params.id, req.body);
      res.json(successResponse(staff, 'Staff updated'));
    } catch (error) { next(error); }
  }

  async deleteStaff(req, res, next) {
    try {
      await staffService.deleteStaff(req.params.id);
      res.json(deletedResponse('Staff deleted'));
    } catch (error) { next(error); }
  }
}

export default new StaffController();