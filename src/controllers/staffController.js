import staffService from '../services/staffService.js';
import { successResponse, createdResponse, deletedResponse, errorResponse } from '../utils/response.js';

export class StaffController {
  async getStaff(req, res, next) {
    try { res.json(successResponse(await staffService.getStaff(req.query))); }
    catch (error) { res.status(error.statusCode || 500).json(errorResponse(error)); }
  }

  async getStaffById(req, res, next) {
    try { res.json(successResponse(await staffService.getStaffById(req.params.id))); }
    catch (error) { res.status(error.statusCode || 500).json(errorResponse(error)); }
  }

  async getStaffByTeam(req, res, next) {
    try { res.json(successResponse(await staffService.getStaffByTeam(req.params.teamId))); }
    catch (error) { res.status(error.statusCode || 500).json(errorResponse(error)); }
  }

  async createStaff(req, res, next) {
    try { res.status(201).json(createdResponse(await staffService.createStaff(req.body))); }
    catch (error) { res.status(error.statusCode || 500).json(errorResponse(error)); }
  }

  async updateStaff(req, res, next) {
    try { res.json(successResponse(await staffService.updateStaff(req.params.id, req.body), 'Staff actualizado')); }
    catch (error) { res.status(error.statusCode || 500).json(errorResponse(error)); }
  }

  async deleteStaff(req, res, next) {
    try { res.json(deletedResponse('Staff eliminado')); }
    catch (error) { res.status(error.statusCode || 500).json(errorResponse(error)); }
  }
}

export default new StaffController();