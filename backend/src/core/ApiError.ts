import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from './ApiResponse';

export class ErrorResponse extends ApiResponse {
  constructor(statusCode: StatusCodes, message: string) {
    super(statusCode, message);
  }
}

export abstract class ApiError extends Error {
  constructor(public statusCode: StatusCodes, public message: string = 'error') {
    super(message);
  }

  public static handle(err: ApiError, res: Response): Response {
    let message = err.message;

    // In production, hide detailed error messages for internal server errors
    if (
      process.env.NODE_ENV === 'production' &&
      err.statusCode === StatusCodes.INTERNAL_SERVER_ERROR
    ) {
      message = 'An unexpected error occurred.';
    }

    return new ErrorResponse(err.statusCode, message).send(res);
  }
}


export class ForbiddenError extends ApiError {
  constructor(message = 'Access Forbidden') {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource Not Found') {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal Server Error') {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}



