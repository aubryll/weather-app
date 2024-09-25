import React, { memo }  from "react";
import {
  Avatar,
  Divider,
  Grid2,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import { Weather as WeatherType } from "../types/Weather";
import useMyWeatherStore from "../store";
import { CityResponse } from "../types/City";


type WeatherProps = {
    weather?: WeatherType;
    dateFormatter: (date: string) => string
    handleOSearchHistoryClicked: (city: CityResponse.City) => void;
}

const WeatherComponent = ({weather, dateFormatter, handleOSearchHistoryClicked}: WeatherProps) => {
  const { searches } = useMyWeatherStore();
    return(
        <Grid2 size={{ xs: 12, md: 7 }} spacing={6}>
        <Stack spacing={5}>
          {weather && (
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "block", textAlign: "center" }}
            >
              CURRENT WEATHER
            </Typography>
          )}
          {weather && (
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
              spacing={2}
            >
              <Stack spacing={1}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  sx={{ display: "block", fontWeight: "bold" }}
                >
                  {`${weather.city_name}, ${weather.country_code}`}
                </Typography>

                <Typography
                  component="span"
                  variant="body2"
                  sx={{ display: "block" }}
                >
                  {format(Date(), "EE, MM")}
                </Typography>
              </Stack>

              <Stack spacing={1}>
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={weather.weather?.description}
                    src={`https://www.weatherbit.io/static/img/icons/${weather.weather?.icon}.png`}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                </Box>
              </Stack>

              <Stack spacing={1}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  sx={{ display: "block", fontWeight: "bold" }}
                >
                  {weather.temp}°C
                </Typography>

                <Typography
                  component="span"
                  variant="body2"
                  sx={{ display: "block" }}
                >
                  {weather.weather.description}
                </Typography>
              </Stack>
            </Stack>
          )}
          {weather && (
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "block", textAlign: "center" }}
            >
              AIR CONDITION
            </Typography>
          )}
          {weather && (
            <Stack>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
                spacing={2}
              >
                <Stack spacing={1}>
                  <Stack direction={"row"} spacing={1}>
                    <ThermostatIcon />
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: "block" }}
                    >
                      Feels like
                    </Typography>
                  </Stack>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ display: "block", fontWeight: "bold" }}
                  >
                    {weather.temp}°C
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Stack direction={"row"} spacing={1}>
                    <AirIcon />
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: "block" }}
                    >
                      Wind
                    </Typography>
                  </Stack>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ display: "block", fontWeight: "bold" }}
                  >
                    {weather.wind_spd} m/s
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Stack direction={"row"} spacing={1}>
                    <OpacityIcon />
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: "block" }}
                    >
                      Humidity
                    </Typography>
                  </Stack>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ display: "block", fontWeight: "bold" }}
                  >
                    {weather.rh}%
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                mt={2}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ display: "block" }}
                >
                  OB time: {dateFormatter(weather.ob_time)}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ display: "block" }}
                >
                  Air Q index: {weather.aqi}
                </Typography>
              </Stack>
            </Stack>
          )}

          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "block", textAlign: "center" }}
          >
            SEARCH HISTORY
          </Typography>
          <Divider />
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              overflowX: "auto",
            }}
          >
            {searches.map((search) => (
              <Chip
                key={search.id}
                label={`${search.city}, ${search.countryCode}`}
                onClick={() => handleOSearchHistoryClicked(search)}
              />
            ))}
          </Stack>
        </Stack>
      </Grid2>
    )
}


const Weather = memo(WeatherComponent);
export default Weather;