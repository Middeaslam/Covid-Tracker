
export interface All {
    confirmed: number;
    recovered: number;
    deaths: number;
    country: string;
    population: number;
    sq_km_area: number;
    life_expectancy: string;
    elevation_in_meters: number;
    continent: string;
    abbreviation: string;
    location: string;
    iso: number;
    capital_city: string;
}

export interface States {
    lat: string;
    long: string;
    confirmed: number;
    recovered: number;
    deaths: number;
    updated: Date;
}

export interface StateData {
    [key: string]: States
}

export type StatesData = StateData & {
    All: All
}
