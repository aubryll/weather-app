"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = exports.FailureMsgResponse = exports.SuccessMsgResponse = exports.InternalErrorResponse = exports.BadRequestResponse = exports.ForbiddenResponse = exports.NotFoundResponse = exports.ApiResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
class ApiResponse {
    statusCode;
    message;
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
    prepare(res, headers = {}) {
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
    send(res, headers = {}) {
        return this.prepare(res, headers);
    }
}
exports.ApiResponse = ApiResponse;
// Base class for responses with data
class ApiResponseWithData extends ApiResponse {
    data;
    constructor(statusCode, message, data) {
        super(statusCode, message);
        this.data = data;
    }
    prepare(res, headers = {}) {
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
    send(res, headers = {}) {
        return this.prepare(res, headers);
    }
}
// Error response classes
class NotFoundResponse extends ApiResponse {
    constructor(message = 'Resource Not Found') {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, message);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Access Forbidden') {
        super(http_status_codes_1.StatusCodes.FORBIDDEN, message);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Request') {
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Server Error') {
        super(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
// Success response classes without data
class SuccessMsgResponse extends ApiResponse {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.OK, message);
    }
}
exports.SuccessMsgResponse = SuccessMsgResponse;
class FailureMsgResponse extends ApiResponse {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}
exports.FailureMsgResponse = FailureMsgResponse;
// Success response class with data
class SuccessResponse extends ApiResponseWithData {
    constructor(message, data) {
        super(http_status_codes_1.StatusCodes.OK, message, data);
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=ApiResponse.js.map