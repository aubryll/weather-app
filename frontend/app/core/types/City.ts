export interface CityResponse {
    error: boolean;
    msg:   string;
    data:  string[];
}

export interface CityRequest {
    country: string;
}