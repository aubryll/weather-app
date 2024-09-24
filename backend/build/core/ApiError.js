"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.NotFoundError = exports.BadRequestError = exports.ForbiddenError = exports.ApiError = exports.ErrorResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = require("./ApiResponse");
class ErrorResponse extends ApiResponse_1.ApiResponse {
    constructor(statusCode, message) {
        super(statusCode, message);
    }
}
exports.ErrorResponse = ErrorResponse;
class ApiError extends Error {
    statusCode;
    message;
    constructor(statusCode, message = 'error') {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
    static handle(err, res) {
        let message = err.message;
        // In production, hide detailed error messages for internal server errors
        if (process.env.NODE_ENV === 'production' &&
            err.statusCode === http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
            message = 'An unexpected error occurred.';
        }
        return new ErrorResponse(err.statusCode, message).send(res);
    }
}
exports.ApiError = ApiError;
class ForbiddenError extends ApiError {
    constructor(message = 'Access Forbidden') {
        super(http_status_codes_1.StatusCodes.FORBIDDEN, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, message);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends ApiError {
    constructor(message = 'Resource Not Found') {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
class InternalError extends ApiError {
    constructor(message = 'Internal Server Error') {
        super(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=ApiError.js.map