import jwt from 'jsonwebtoken';
import userRepository from '../../features/auth/repositories/userRepository.js';
import { ApiError } from '../utils/apiError.js';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw ApiError.unauthorized('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type !== 'access') {
            throw ApiError.unauthorized('Invalid token type');
        }

        const user = await userRepository.findById(decoded.userId);
        if (!user) {
            throw ApiError.unauthorized('User not found');
        }

        if (!user.isActive) {
            throw ApiError.forbidden('Account is suspended');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(ApiError.unauthorized('Invalid token'));
        } else if (error instanceof jwt.TokenExpiredError) {
            next(ApiError.unauthorized('Token expired'));
        } else {
            next(error);
        }
    }
};

export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.type === 'access') {
                const user = await userRepository.findById(decoded.userId);
                if (user && user.isActive) {
                    req.user = user;
                    req.token = token;
                }
            }
        }
        next();
    } catch (error) {
        next();
    }
};