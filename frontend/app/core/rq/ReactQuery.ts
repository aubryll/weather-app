// Import necessary hooks and utilities from @tanstack/react-query and custom modules
import {
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query"; // React Query hook and types for data fetching and caching
import { axiosInstance } from "../util/AxiosInstance"; // Custom configured Axios instance for making HTTP requests
import { apiRoutes } from "../util/routes"; // Defined API route constants used in the application
import { pathToUrl } from "../util/router"; // Utility function to construct URLs from API routes and parameters
import { WeatherResponse } from "../types/Weather";
import { ForecastResponse } from "../types/Forecast";
import { CityResponse } from "../types/City";


// Define the type for the request parameters expected by the API calls
type RequestParam = {
  city?: string;
  country?: string;
};

/**
 * Function to fetch the current weather for a given city and country
 * @param {RequestParam} param - An object containing the city and country
 * @returns {Promise<WeatherResponse>} - Axios promise with the current weather data
 */
const fetchCurrentWeather = ({
  city,
  country,
}: RequestParam): Promise<WeatherResponse> =>
  axiosInstance
    .get(pathToUrl(apiRoutes.getCurrentWeather, { city, country }))
    .then((response) => response.data);

/**
 * Function to fetch the current weather for a given city and country
 * @param {RequestParam} param - An object containing the city and country
 * @returns {Promise<ForecastResponse>} - Axios promise with the current weather data
 * */
const fetchForecast = ({
  city,
  country,
}: RequestParam): Promise<ForecastResponse> =>
  axiosInstance
    .get(pathToUrl(apiRoutes.getForecast, { city, country }))
    .then((response) => response.data);


/**
 * Function to fetch a list of all cities with a similar prefix
 *  * @param {cityPrefix} param - An object containing the country
 * @returns {Promise<CityResponse.Response>} - Axios promise with the cities
 * */
const searchCityAndCountry = (cityPrefix?: String): Promise<CityResponse.Response> =>
  axiosInstance
    .get(`${apiRoutes.searchCityAndCountry}=${cityPrefix}`, {
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPID_API_HOST,
      }
    })
    .then((response) => response.data);

/**
 * Custom React Query hook to fetch the current weather data.
 * @param {RequestParam} param - An object containing the city and country
 * @returns {UseQueryResult<WeatherResponse, Error>} - React Query result containing weather data or an error
 */
export const useCurrentWeather = ({
  city,
  country,
}: RequestParam): UseQueryResult<WeatherResponse, Error> =>
  useQuery({
    queryKey: ["currentWeather", city, country],
    queryFn: () => fetchCurrentWeather({ city, country }),
    enabled: !!city && !!country,
  });

/**
 * Custom React Query hook to fetch the weather forecast data.
 * @param {RequestParam} param - An object containing the city and country
 * @returns {UseQueryResult<ForecastResponse, Error>} - React Query result containing forecast data or an error
 */
export const useForecast = ({
  city,
  country,
}: RequestParam): UseQueryResult<ForecastResponse, Error> =>
  useQuery({
    queryKey: ["weatherForecast", city, country],
    queryFn: () => fetchForecast({ city, country }),
    enabled: !!city && !!country,
  });

/**
 * Custom React Query hook to fetch cities
 * @returns {UseQueryResult<CountryResponse, Error>} - React Query result containing countries data or an error
 */
export const useCities = (prefix?: string): UseQueryResult<CityResponse.Response, Error> =>
  useQuery({
    queryKey: ["cities", prefix],
    queryFn: () => searchCityAndCountry(prefix),
    enabled: !!prefix && prefix.length> 3
  });

