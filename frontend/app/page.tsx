"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  useCountries,
  useCountryCities,
  useCurrentWeather,
  useForecast,
} from "./core/ReactQuery";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Container,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  Card,
  Box,
  Autocomplete,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { parseISO, format } from "date-fns";
import { CountryResponse } from "./core/types/Country";
import { Controller, useForm } from "react-hook-form";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

type CountryCityForm = {
  country: CountryResponse.Country;
  city: string;
};

const defaultValues: CountryCityForm = {
  country: {
    name: "Zambia",
    flag: "https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Zambia.svg",
    iso2: "ZM",
    iso3: "ZMB",
  },
  city: "Lusaka",
};

export default function Home() {
  //Hook forms
  const { control, watch, setValue } = useForm<CountryCityForm>({
    defaultValues,
  });
  const country = React.useRef<CountryResponse.Country>(defaultValues.country);
  country.current = watch("country");

  const city = React.useRef<string>(defaultValues.city);
  city.current = watch("city");

  //APIs
  const countriesApi = useCountries();
  const citiesMutation = useCountryCities();
  const currentWeatherApi = useCurrentWeather({
    city: city.current,
    country: country.current.iso2,
  });
  const forecast = useForecast({
    city: city.current,
    country: country.current.iso2,
  });

  //Processed data
  const currentWeather = useMemo(() => {
    const responseData = currentWeatherApi.data?.data.data;
    return responseData?.reverse()[0];
  }, [currentWeatherApi.data]);

  const formatDate = useCallback((date: string) => {
    try {
      const parsedDate = parseISO(date);
      return format(parsedDate, "EEEE, MMMM do, yyyy");
    } catch (error) {
      return date;
    }
  }, []);

  //Data loaders
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  //Data manipulations
  const handleOnCountryChange = useCallback(
    ({ name }: CountryResponse.Country) =>
      citiesMutation.mutate({
        country: name,
      }),
    []
  );

  const handleOnCitiesLoaded = useCallback(() => {
    const firstCity = citiesMutation.data?.data[0]
    if(firstCity && firstCity !== city.current){
      setValue("city", firstCity);
    }
  }, [citiesMutation.data])

  useEffect(() => handleOnCountryChange(defaultValues.country), [])
  useEffect(() => handleOnCitiesLoaded(), [handleOnCitiesLoaded])

  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={6}>
        <Grid2 size={{ xs: 12, md: 7 }} spacing={6}>
          <Stack component={Card} variant="outlined" p={2} spacing={2}>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Please select a country" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Autocomplete
                  id="country-select"
                  disableClearable
                  fullWidth
                  autoHighlight
                  disabled={isLoading}
                  value={value}
                  onChange={(_e, v, _x) => {
                    onChange(v);
                    handleOnCountryChange(v);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.iso2 === value.iso2
                  }
                  options={countriesApi.data?.data ?? []}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box
                        key={key}
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          srcSet={option.flag}
                          src={option.flag}
                        />
                        {option.name} ({option.iso2})
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      placeholder={"Please select a country"}
                      error={!!error}
                      helperText={error ? error.message : null}
                      slotProps={{
                        htmlInput: {
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        },
                      }}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              rules={{ required: "Please select a city" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Autocomplete
                  id="city-select"
                  disableClearable
                  fullWidth
                  autoHighlight
                  disabled={isLoading}
                  value={value}
                  onChange={(_e, v, _x) => onChange(v)}
                  options={citiesMutation.data?.data ?? []}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a city"
                      placeholder={"Please select a city"}
                      error={!!error}
                      helperText={error ? error.message : null}
                      slotProps={{
                        htmlInput: {
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        },
                      }}
                    />
                  )}
                />
              )}
            />

            <LoadingButton
              variant="contained"
              startIcon={<SearchIcon />}
              fullWidth
              loading={isLoading}
              onClick={() => currentWeatherApi.refetch()}
            >
              Search
            </LoadingButton>
          </Stack>

          <Grid2>
            {currentWeather && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Current Weather</Typography>
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={currentWeather.weather?.description}
                    src={`https://www.weatherbit.io/static/img/icons/${currentWeather.weather?.icon}.png`}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h5">
                      {currentWeather.temp}°C
                    </Typography>
                    <Typography variant="subtitle1">
                      Feels like: {currentWeather.app_temp}°C
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    {currentWeather.description}
                  </Typography>
                  <Typography variant="body2">
                    Wind: {currentWeather.wind_spd} m/s
                  </Typography>
                  <Typography variant="body2">
                    Humidity: {currentWeather.rh}%
                  </Typography>
                  <Typography variant="body2">
                    Air Quality Index: {currentWeather.aqi}
                  </Typography>
                  <Typography variant="body2">
                    Location: {currentWeather.city_name},{" "}
                    {currentWeather.country_code}
                  </Typography>
                  <Typography variant="body2">
                    Observation Time: {formatDate(currentWeather.ob_time)}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid2>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 5 }}>
          <List>
            {forecast.data?.data.data.map((item, index, array) => (
              <React.Fragment key={item.datetime || index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={item.weather?.description}
                      src={`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.weather?.description}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ display: "block" }}
                        >
                          Max Temp: {item.max_temp}°C, Min Temp: {item.min_temp}
                          °C
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ display: "block" }}
                        >
                          Precipitation: {item.precip} mm, UV Index: {item.uv}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ display: "block" }}
                        >
                          Wind: {item.wind_cdir_full} at {item.wind_spd} m/s
                        </Typography>
                        <Typography
                          component="span"
                          variant="overline"
                          sx={{ display: "block" }}
                        >
                          Date: {formatDate(item.datetime)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < array.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Grid2>
      </Grid2>
    </Container>
  );
}
