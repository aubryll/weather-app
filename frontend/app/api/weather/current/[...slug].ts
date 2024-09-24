/**
 * Next.js API Route to fetch the weather forecast for that day on the specified city and country.
 * Accessible via the endpoint: /api/weather/current/[...slug]
 * Example usage: /api/weather/forecast/lusaka/zambia
 */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API Route Handler
 * @param req - The HTTP request object
 * @param res - The HTTP response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  /**
   * Extracts the dynamic route parameters from the request.
   * `slug` is expected to be an array containing [city, country].
   * For example: ['lusaka', 'zambia']
   */
  const slug = req.query.slug as string[];

  /**
   * Validate that both city and country parameters are provided.
   * If valid, proceed to fetch the weather forecast.
   * If not, respond with a 400 Bad Request error.
   */
  if (Array.isArray(slug) && slug.length >= 2) {
    const [city, country] = slug;

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}/current/${city}/${country}`;
      const { data, status } = await axios.get(apiUrl);
      res.status(status).json(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        res.status(status).json(data);
      } else {
        res.status(500).json({
          error_description: "An unknown error occurred. Please try again.",
        });
      }
    }
  } else {
    res.status(400).json({
      error_description: "City and country are required parameters.",
    });
  }
}
