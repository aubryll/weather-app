import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCodes,
    protected message: string,
  ) {}

  protected prepare(res: Response, headers: { [key: string]: string } = {}): Response {
    // Set headers if any
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }

    // Build the response body
    const responseBody = {
      message: this.message,
    };

    // Send the response
    return res.status(this.statusCode).json(responseBody);
  }

  public send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare(res, headers);
  }
}

// Base class for responses with data
abstract class ApiResponseWithData<T> extends ApiResponse {
  constructor(
    statusCode: StatusCodes,
    message: string,
    protected data: T,
  ) {
    super(statusCode, message);
  }

  protected prepare(res: Response, headers: { [key: string]: string } = {}): Response {
    // Set headers if any
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }

    // Build the response body
    const responseBody = {
      message: this.message,
      data: this.data,
    };

    // Send the response
    return res.status(this.statusCode).json(responseBody);
  }

  public send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare(res, headers);
  }
}

// Error response classes
export class NotFoundResponse extends ApiResponse {
  constructor(message = 'Resource Not Found') {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Access Forbidden') {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Request') {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Server Error') {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

// Success response classes without data
export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCodes.OK, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

// Success response class with data
export class SuccessResponse<T> extends ApiResponseWithData<T> {
  constructor(message: string, data: T) {
    super(StatusCodes.OK, message, data);
  }
}
