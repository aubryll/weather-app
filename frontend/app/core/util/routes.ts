export const apiRoutes = {
    getCurrentWeather: "/api/weather/current/:city/:country",
    getForecast: "/api/weather/forecast/:city/:country",
    searchCityAndCountry: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix",
  };