import { Response } from 'express';
import { ApiResponse } from './ApiResponse';
import { HttpStatusCode } from 'axios';
export class ErrorResponse extends ApiResponse {
  constructor(statusCode: HttpStatusCode, message: string) {
    super(statusCode, message);
  }
}

export abstract class ApiError extends Error {
  constructor(
    public statusCode: HttpStatusCode, 
    public message: string = 'error',
  ) {
    super(message);
  }

  public static handle(err: ApiError, res: Response): Response {
    let message = err.message;

    // In production, hide detailed error messages for internal server errors
    if (
      process.env.NODE_ENV === 'production' &&
      err.statusCode === HttpStatusCode.InternalServerError
    ) {
      message = 'An unexpected error occurred.';
    }

    return new ErrorResponse(err.statusCode, message).send(res);
  }
}


export class ForbiddenError extends ApiError {
  constructor(message = 'Access Forbidden') {
    super(HttpStatusCode.Forbidden, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(HttpStatusCode.BadRequest, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource Not Found') {
    super(HttpStatusCode.NotFound, message);
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal Server Error') {
    super(HttpStatusCode.InternalServerError, message);
  }
}



