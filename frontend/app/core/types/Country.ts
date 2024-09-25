export declare module CountryResponse {
export interface Response {
    error: boolean;
    msg:   string;
    data:  Country[];
}

export interface Country {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
}
}