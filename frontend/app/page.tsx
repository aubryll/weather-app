"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  useCities,
  useCurrentWeather,
  useForecast,
} from "./core/rq/ReactQuery";
import { Container, Grid2, Card } from "@mui/material";
import { parseISO, format } from "date-fns";
import { useForm } from "react-hook-form";
import { CityResponse } from "./core/types/City";
import useMyWeatherStore from "./core/store";
import Forecast from "./core/components/Forecast";
import Searchbar from "./core/components/Searchbar";
import { CountryCityForm } from "./core/types/Form";
import Weather from "./core/components/Weather";

// Main component
export default function Home() {
  //Store
  const { upsertSearch } = useMyWeatherStore();
  // Initialize the form with default values using react-hook-form
  const { control, watch, setValue } = useForm<CountryCityForm>();
  const [citySearchQuery, setCitySearchQuery] = React.useState("");

  // Update variables when form values change
  const city = watch("city");

  const searchCityApi = useCities(citySearchQuery);

  // Fetch current weather data for the selected city and country
  const currentWeatherApi = useCurrentWeather({
    city: city?.city,
    country: city?.countryCode,
  });

  // Fetch weather forecast data for the selected city and country
  const forecastApi = useForecast({
    city: city?.city,
    country: city?.countryCode,
  });

  // Extract the latest current weather data using useMemo for performance optimization
  const currentWeather = useMemo(() => {
    const responseData = currentWeatherApi.data?.data.data;
    return responseData?.[responseData.length - 1];
  }, [currentWeatherApi.data]);

  // Function to format date strings into a readable format
  const formatDate = useCallback((dateString: string) => {
    try {
      const parsedDate = parseISO(dateString);
      return format(parsedDate, "EE, MMM dd");
    } catch (error) {
      return dateString; // Return the original date string if parsing fails
    }
  }, []);

  //Function to update the store search history
  const handleUpsertSearchHistory = useCallback(() => {
    if (city) {
      upsertSearch(city);
    }
  }, [city, upsertSearch]);

  const handleOSearchHistoryClicked = useCallback(
    (search: CityResponse.City) => setValue("city", search),
    []
  );

  useEffect(() => handleUpsertSearchHistory(), [handleUpsertSearchHistory]);

  return (
    <Container maxWidth="lg">
      <Grid2
        component={Card}
        variant="outlined"
        container
        spacing={6}
        mt={9}
        p={4}
        sx={{
          mt: { xs: 2, md: 9 },
          mb: { xs: 16},
          p: { xs: 2, md: 4 },
          height: { md: "85vh" },
        }}
      >
        <Searchbar
          options={searchCityApi.data?.data}
          control={control}
          handleOnQueryChange={setCitySearchQuery}
          searchQuery={citySearchQuery}
        />
        <Weather
          weather={currentWeather}
          dateFormatter={formatDate}
          handleOSearchHistoryClicked={handleOSearchHistoryClicked}
        />
        <Forecast dateFormatter={formatDate} forecast={forecastApi.data} />
      </Grid2>
    </Container>
  );
}
