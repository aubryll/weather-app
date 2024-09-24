"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = exports.FailureMsgResponse = exports.SuccessMsgResponse = exports.InternalErrorResponse = exports.BadRequestResponse = exports.ForbiddenResponse = exports.NotFoundResponse = exports.ApiResponse = void 0;
const axios_1 = require("axios");
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
            statusCode: this.statusCode,
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
            statusCode: this.statusCode,
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
        super(axios_1.HttpStatusCode.NotFound, message);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Access Forbidden') {
        super(axios_1.HttpStatusCode.Forbidden, message);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Request') {
        super(axios_1.HttpStatusCode.BadRequest, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Server Error') {
        super(axios_1.HttpStatusCode.InternalServerError, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
// Success response classes without data
class SuccessMsgResponse extends ApiResponse {
    constructor(message) {
        super(axios_1.HttpStatusCode.Ok, message);
    }
}
exports.SuccessMsgResponse = SuccessMsgResponse;
class FailureMsgResponse extends ApiResponse {
    constructor(message) {
        super(axios_1.HttpStatusCode.InternalServerError, message);
    }
}
exports.FailureMsgResponse = FailureMsgResponse;
// Success response class with data
class SuccessResponse extends ApiResponseWithData {
    constructor(message, data) {
        super(axios_1.HttpStatusCode.Ok, message, data);
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=ApiResponse.js.map