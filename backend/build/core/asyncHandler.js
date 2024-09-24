"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (execution) => (req, res, next) => {
    execution(req, res, next).catch(next);
};
//# sourceMappingURL=asyncHandler.js.map