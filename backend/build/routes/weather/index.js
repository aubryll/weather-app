"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../core/ApiResponse");
const asyncHandler_1 = __importDefault(require("../../core/asyncHandler"));
const ApiError_1 = require("../../core/ApiError");
const AxiosInstance_1 = require("../../core/AxiosInstance");
const router = express_1.default.Router();
/**
 * @route   GET /current/:city/:country
 * @desc    Returns the current weather for the provided city and country.
 * @param   {string} city - Name of the city (URL parameter).
 * @param   {string} country - Country code (ISO 3166 country code, URL parameter).
 * @returns {Object} JSON object containing weather data.
 */
router.get("/current/:city/:country", (0, asyncHandler_1.default)(async (req, res, next) => {
    const { city, country } = req.params;
    if (!city || !country) {
        return next(new ApiError_1.BadRequestError("City and country are required"));
    }
    const response = await AxiosInstance_1.axiosInstance.get("/current", {
        params: { city, country },
    });
    return new ApiResponse_1.SuccessResponse("Success", response.data).send(res);
}));
/**
 * @route   GET /forecast/:city/:country
 * @desc    Returns the 16 day weather forcast for the provided city and country.
 * @param   {string} city - Name of the city (URL parameter).
 * @param   {string} country - Country code (ISO 3166 country code, URL parameter).
 * @returns {Object} JSON object containing weather data.
 */
router.get("/forecast/:city/:country", (0, asyncHandler_1.default)(async (req, res, next) => {
    const { city, country } = req.params;
    if (!city || !country) {
        return next(new ApiError_1.BadRequestError("City and country are required"));
    }
    const response = await AxiosInstance_1.axiosInstance.get("forecast", {
        params: { city, country },
    });
    return new ApiResponse_1.SuccessResponse("Success", response.data).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map