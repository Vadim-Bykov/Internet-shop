export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors?: any[]) {
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static badRequest(message: string, errors?: any[]) {
    return new ApiError(400, message, errors);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }

  static unauthorized() {
    return new ApiError(401, 'User is unauthorized');
  }
}
