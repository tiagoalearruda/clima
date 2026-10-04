export interface GeocodingResult {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
}

export interface CurrentWeather {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    precipitation_probability?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
    is_day?: number;
}

export interface WeatherApiResponse {
    latitude?: number;
    longitude?: number;
    timezone?: string;
    current?: CurrentWeather;
}

const OPEN_METEO_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const OPEN_METEO_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export async function searchCity(city: string): Promise<GeocodingResult | null> {
    const params = new URLSearchParams({
        name: city,
        count: '1',
        language: 'pt',
        format: 'json',
    });

    const response = await fetch(`${OPEN_METEO_GEOCODING_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error('Não foi possível consultar a cidade informada.');
    }

    const data = (await response.json()) as { results?: GeocodingResult[] };
    return data.results?.[0] ?? null;
}

export async function getCityWeather(
    latitude: number,
    longitude: number,
    timezone: string,
): Promise<WeatherApiResponse> {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        timezone,
        current:
            'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m,is_day',
    });

    const response = await fetch(`${OPEN_METEO_FORECAST_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error('Não foi possível consultar o clima desta cidade.');
    }

    const data = (await response.json()) as WeatherApiResponse;

    if (!data.current) {
        throw new Error('Dados meteorológicos indisponíveis para esta cidade.');
    }

    return data;
}
