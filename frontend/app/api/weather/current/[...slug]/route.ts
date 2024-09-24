/**
 * Next.js API Route to fetch the weather forecast for that day on the specified city and country.
 * Accessible via the endpoint: /api/weather/forecast/[...slug]
 * Example usage: /api/weather/forecast/lusaka/zambia
 */

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  /**
   * Extracts the dynamic route parameters from the request.
   * `slug` is expected to be an array containing [city, country].
   * For example: ['lusaka', 'zambia']
   */

  const { slug } = params;

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
      return NextResponse.json(data, { status});
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        return NextResponse.json(data, { status});
      } else {

        return NextResponse.json(
          { error: 'An unknown error occurred. Please try again.' },
          { status: 500 }
        );
      }
    }
  } else {
        // Handle the case where city and country are not provided
    return NextResponse.json(
      { error: 'City and country are required parameters.' },
      { status: 400 }
    );
  }
}
