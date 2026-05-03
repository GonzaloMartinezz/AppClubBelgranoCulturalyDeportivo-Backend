import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
import { ApiError } from '../../../core/utils/ApiError.js';

export class AuthService {
  generateTokens(userId) {
    const accessToken = jwt.sign(
      { userId, type: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    const refreshToken = jwt.sign(
      { userId, type: 'refresh' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    return { accessToken, refreshToken };
  }

  async register(data) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) throw ApiError.conflict('Email already registered');
    
    const user = await userRepository.create(data);
    const tokens = this.generateTokens(user._id);
    
    await userRepository.addRefreshToken(user._id, tokens.refreshToken);
    
    return { user, ...tokens };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw ApiError.unauthorized('Invalid credentials');
    
    const isValid = await user.comparePassword(password);
    if (!isValid) throw ApiError.unauthorized('Invalid credentials');
    
    if (!user.isActive) throw ApiError.forbidden('Account is suspended');
    
    const tokens = this.generateTokens(user._id);
    await userRepository.addRefreshToken(user._id, tokens.refreshToken);
    await userRepository.updateLastLogin(user._id);
    
    return { user, ...tokens };
  }

  async refresh(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      if (decoded.type !== 'refresh') throw ApiError.unauthorized('Invalid token');
      
      const user = await userRepository.findById(decoded.userId);
      if (!user || !user.refreshTokens.includes(refreshToken)) {
        throw ApiError.unauthorized('Invalid token');
      }
      
      await userRepository.removeRefreshToken(user._id, refreshToken);
      const tokens = this.generateTokens(user._id);
      await userRepository.addRefreshToken(user._id, tokens.refreshToken);
      
      return { user, ...tokens };
    } catch (error) {
      throw ApiError.unauthorized('Invalid or expired token');
    }
  }

  async logout(userId, refreshToken) {
    await userRepository.removeRefreshToken(userId, refreshToken);
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw ApiError.notFound('User not found');
    return user;
  }

  async updateUser(id, data) {
    if (data.password) {
      throw ApiError.badRequest('Use updatePassword to change password');
    }
    return userRepository.update(id, data);
  }
}

export default new AuthService();