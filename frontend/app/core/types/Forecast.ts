export interface ForecastResponse {
    statusCode: number
    message: string
    data: Data
  }
  
  export interface Data {
    city_name: string
    country_code: string
    data: Forecase[]
    lat: string
    lon: string
    state_code: string
    timezone: string
  }
  
  export interface Forecase {
    app_max_temp: number
    app_min_temp: number
    clouds: number
    clouds_hi: number
    clouds_low: number
    clouds_mid: number
    datetime: string
    dewpt: number
    high_temp: number
    low_temp: number
    max_dhi: string
    max_temp: number
    min_temp: number
    moon_phase: number
    moon_phase_lunation: number
    moonrise_ts: number
    moonset_ts: number
    ozone: number
    pop: number
    precip: number
    pres: number
    rh: number
    slp: number
    snow: number
    snow_depth: number
    sunrise_ts: number
    sunset_ts: number
    temp: number
    ts: number
    uv: number
    valid_date: string
    vis: number
    weather: Weather
    wind_cdir: string
    wind_cdir_full: string
    wind_dir: number
    wind_gust_spd: number
    wind_spd: number
  }
  
  export interface Weather {
    code: number
    icon: string
    description: string
  }
  