import authService from '../services/authService.js';
import { successResponse, createdResponse } from '../../../core/utils/response.js';

export class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(createdResponse(result, 'Registration successful'));
    } catch (error) { next(error); }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(successResponse(result, 'Login successful'));
    } catch (error) { next(error); }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refresh(refreshToken);
      res.json(successResponse(result, 'Token refreshed'));
    } catch (error) { next(error); }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(req.user._id, refreshToken);
      res.json(successResponse(null, 'Logout successful'));
    } catch (error) { next(error); }
  }

  async me(req, res, next) {
    try {
      const user = await authService.getUserById(req.user._id);
      res.json(successResponse(user));
    } catch (error) { next(error); }
  }

  async updateProfile(req, res, next) {
    try {
      const user = await authService.updateUser(req.user._id, req.body);
      res.json(successResponse(user, 'Profile updated'));
    } catch (error) { next(error); }
  }
}

export default new AuthController();