const weatherCodeMap: Record<number, string> = {
    0: 'Céu limpo',
    1: 'Parcialmente nublado',
    2: 'Parcialmente nublado',
    3: 'Encoberto',
    45: 'Nevoeiro',
    48: 'Nevoeiro',
    51: 'Chuvisco',
    53: 'Chuvisco',
    55: 'Chuvisco',
    56: 'Chuvisco gelado',
    57: 'Chuvisco gelado',
    61: 'Chuva',
    63: 'Chuva',
    65: 'Chuva',
    66: 'Chuva gelada',
    67: 'Chuva gelada',
    71: 'Neve',
    73: 'Neve',
    75: 'Neve',
    77: 'Neve',
    80: 'Pancadas de chuva',
    81: 'Pancadas de chuva',
    82: 'Pancadas de chuva',
    85: 'Pancadas de neve',
    86: 'Pancadas de neve',
    95: 'Tempestade',
    96: 'Tempestade',
    97: 'Tempestade',
    99: 'Tempestade',
};

export function mapWeatherCode(code: number | undefined): string {
    if (typeof code !== 'number') {
        return 'Condição indisponível';
    }

    return weatherCodeMap[code] ?? 'Condição indisponível';
}
