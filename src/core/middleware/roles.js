import { ApiError } from '../utils/apiError.js';

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(ApiError.unauthorized('Authentication required'));
        }

        if (!roles.includes(req.user.role)) {
            return next(ApiError.forbidden('Insufficient permissions'));
        }

        next();
    };
};

export const isAdmin = authorize('ADMIN');
export const isStaff = authorize('ADMIN', 'STAFF');
export const isSocio = authorize('ADMIN', 'STAFF', 'SOCIO');