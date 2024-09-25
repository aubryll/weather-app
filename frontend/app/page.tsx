"use client";
import React, { useCallback, useMemo } from "react";
import { useCurrentWeather, useForecast } from "./core/ReactQuery";
import {
  Avatar,
  Button,
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { parseISO, format } from "date-fns";

export default function Home() {
  const currentWeatherApi = useCurrentWeather({
    city: "lusaka",
    country: "zm",
  });

  const currentWeather = useMemo(() => {
    const responseData = currentWeatherApi.data?.data.data
    return responseData?.reverse()[0]
  }, [currentWeatherApi.data])

  const forecast = useForecast({
    city: "lusaka",
    country: "zm",
  });

  const formatDate = useCallback((date: string) => {
    try {
      const parsedDate = parseISO(date);
      return format(parsedDate, "EEEE, MMMM do, yyyy");
    } catch (error) {
      return date;
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={6}>
        <Grid2 size={{ xs: 12, md: 7 }} spacing={6}>
          <Grid2
            component={Card}
            variant="outlined"
            p={2}
          >
            <Grid2 size={{ xs: 12 }}>
              <TextField
                label="City"
                placeholder="Provide your city"
                fullWidth
                variant="outlined"
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                label="Country"
                placeholder="Provide your country"
                fullWidth
                variant="outlined"
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button variant="contained" startIcon={<SearchIcon />} fullWidth>
                Search
              </Button>
            </Grid2>
          </Grid2>


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
                    Observation Time:{" "}
                    {formatDate(currentWeather.ob_time)}
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
