import { Response } from 'express';
import { HttpStatusCode } from 'axios';

export abstract class ApiResponse {
  constructor(
    protected statusCode: HttpStatusCode,
    protected message: string,
  ) {}

  protected prepare(res: Response, headers: { [key: string]: string } = {}): Response {
    // Set headers if any
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }

    // Build the response body
    const responseBody = {
      statusCode: this.statusCode,
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
    statusCode: HttpStatusCode,
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
      statusCode: this.statusCode,
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
    super(HttpStatusCode.NotFound, message);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Access Forbidden') {
    super(HttpStatusCode.Forbidden, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Request') {
    super(HttpStatusCode.BadRequest, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Server Error') {
    super(HttpStatusCode.InternalServerError, message);
  }
}

// Success response classes without data
export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatusCode.Ok, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatusCode.InternalServerError, message);
  }
}

// Success response class with data
export class SuccessResponse<T> extends ApiResponseWithData<T> {
  constructor(message: string, data: T) {
    super(HttpStatusCode.Ok, message, data);
  }
}
