export class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message) { return new ApiError(400, message); }
  static unauthorized(message = 'No autorizado') { return new ApiError(401, message); }
  static forbidden(message = 'Prohibido') { return new ApiError(403, message); }
  static notFound(message = 'No encontrado') { return new ApiError(404, message); }
  static conflict(message) { return new ApiError(409, message); }
  static internal(message = 'Error interno') { return new ApiError(500, message); }
}