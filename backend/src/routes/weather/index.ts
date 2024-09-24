import express from "express";
import { SuccessResponse } from "../../core/ApiResponse";
import asyncHandler from "../../core/asyncHandler";
import { BadRequestError } from "../../core/ApiError";
import { axiosInstance } from "../../core/AxiosInstance";

const router = express.Router();

/**
 * @route   GET /current/:city/:country
 * @desc    Returns the current weather for the provided city and country.
 * @param   {string} city - Name of the city (URL parameter).
 * @param   {string} country - Country code (ISO 3166 country code, URL parameter).
 * @returns {Object} JSON object containing weather data.
 */
router.get(
  "/current/:city/:country",
  asyncHandler(async (req, res, next) => {
    const { city, country } = req.params;

    if (!city || !country) {
      return next(new BadRequestError("City and country are required"));
    }

    const response = await axiosInstance.get("/current", {
      params: { city, country },
    });

    return new SuccessResponse("Success", response.data).send(res);
  })
);

/**
 * @route   GET /forecast/:city/:country
 * @desc    Returns the 16 day weather forcast for the provided city and country.
 * @param   {string} city - Name of the city (URL parameter).
 * @param   {string} country - Country code (ISO 3166 country code, URL parameter).
 * @returns {Object} JSON object containing weather data.
 */
router.get(
  "/forecast/:city/:country",
  asyncHandler(async (req, res, next) => {
    const { city, country } = req.params;

    if (!city || !country) {
      return next(new BadRequestError("City and country are required"));
    }

    const response = await axiosInstance.get("/forecast/daily", {
      params: { city, country },
    });
    return new SuccessResponse("Success", response.data).send(res);
  })
);

export default router;
