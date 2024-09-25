import React, { memo } from "react";

import {
  Grid2,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { CityResponse } from "../types/City";
import { CountryCityForm } from "../types/Form";


type SearchbarProps = {
    options? : CityResponse.City[];
    searchQuery: string,
    handleOnQueryChange: (query: string) => void;
    control: Control<CountryCityForm, any>
}

const SearchbarComponent = ({control, options, searchQuery, handleOnQueryChange}: SearchbarProps) => {
    return(
        <Grid2 size={{ xs: 12 }}>
        <Controller
          name="city"
          control={control}
          rules={{ required: "Please search for a city" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              id="city-select"
              disableClearable
              fullWidth
              autoHighlight
              value={value}
              onChange={(_e, v, _x) => onChange(v)}
              options={options ?? []}
              inputValue={searchQuery}
              onInputChange={(_, v) => {
                handleOnQueryChange(v);
              }}
              getOptionLabel={({ name, country }) => `${name} - ${country}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={"Search a city"}
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
      </Grid2>
    )
}

const Searchbar = memo(SearchbarComponent);
export default Searchbar;