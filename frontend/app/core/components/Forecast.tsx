import React, { memo} from "react";
import {
  Avatar,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";
import { ForecastResponse } from "../types/Forecast";


type ForecastProps = {
    forecast?: ForecastResponse
    dateFormatter: (date: string) => string
}

const ForecastComponent = ({forecast, dateFormatter}: ForecastProps) => {

    const data = forecast?.data

    return(
        <Grid2 size={{ xs: 12, md: 5 }}>
        {data && (
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "block", textAlign: "center" }}
          >
            16 DAYS FORECAST
          </Typography>
        )}
        <List
          sx={{
            height: "50vh",
            overflowY: "auto",
          }}
        >
          {data?.data.map((item, index, array) => (
            <React.Fragment key={item.datetime || index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={item.weather?.description}
                    src={`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={dateFormatter(item.datetime)}
                  secondary={
                    <React.Fragment>
                      <Stack spacing={1}>
                        <Typography
                          component="span"
                          variant="overline"
                          sx={{ display: "block", fontWeight: "bold" }}
                        >
                          {item.weather?.description}
                        </Typography>
                        <Stack
                          direction={"row"}
                          sx={{ width: "100%" }}
                          spacing={2}
                        >
                          <Stack direction={"row"} spacing={1}>
                            <ThermostatIcon />
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ display: "block" }}
                            >
                              {item.max_temp}°C - {item.min_temp}
                              °C
                            </Typography>
                          </Stack>

                          <Stack direction={"row"} spacing={1}>
                            <WaterDropIcon />
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ display: "block" }}
                            >
                              {item.precip} mm
                            </Typography>
                          </Stack>
                        </Stack>

                        <Stack
                          direction={"row"}
                          sx={{ width: "100%" }}
                          spacing={2}
                        >
                          <Stack direction={"row"} spacing={1}>
                            <WbSunnyIcon />
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ display: "block" }}
                            >
                              {item.uv}
                            </Typography>
                          </Stack>

                          <Stack direction={"row"} spacing={1}>
                            <AirIcon />
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ display: "block" }}
                            >
                              {item.wind_cdir_full} at {item.wind_spd} m/s
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
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
    )

}

const Forecast = memo(ForecastComponent);
export default Forecast;