export type WeatherTheme = 'sunny' | 'cloudy' | 'night';

const clearCodes = new Set([0, 1, 2]);
const cloudyCodes = new Set([
    3,
    45,
    48,
    51,
    53,
    55,
    56,
    57,
    61,
    63,
    65,
    66,
    67,
    71,
    73,
    75,
    77,
    80,
    81,
    82,
    85,
    86,
    95,
    96,
    97,
    99,
]);

export function getWeatherTheme(weatherCode?: number, isDay?: number): WeatherTheme {
    if (typeof isDay === 'number' && isDay === 0) {
        return 'night';
    }

    if (typeof weatherCode === 'number') {
        if (clearCodes.has(weatherCode)) {
            return 'sunny';
        }

        if (cloudyCodes.has(weatherCode)) {
            return 'cloudy';
        }
    }

    return 'cloudy';
}

export function applyWeatherTheme(weatherCode?: number, isDay?: number): void {
    const theme = getWeatherTheme(weatherCode, isDay);
    document.body.classList.remove('theme-sunny', 'theme-cloudy', 'theme-night');
    document.body.classList.add(`theme-${theme}`);
}
