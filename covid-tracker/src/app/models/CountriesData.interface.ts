export interface All {
    confirmed: number,
    recovered: number,
    deaths: number,
    country: string,
    population: number,
    sq_km_area: number,
    life_expectancy: string
    elevation_in_meters: string,
    continent: string,
    abbreviation: string,
    location: string,
    iso: number,
    capital_city: string,
    lat: string,
    long: string,
    updated: string
}

export interface Country {
    [key: string]: {
        All: All
    }
}

export interface CountryData {

    confirmed: number,
    active: number,
    recovered: number,
    deaths: number,
    population: number

}