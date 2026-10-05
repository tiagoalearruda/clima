import { describe, expect, it } from 'vitest';
import { getWeatherTheme } from './theme';

describe('getWeatherTheme', () => {
    it('deve retornar tema ensolarado para dia limpo', () => {
        expect(getWeatherTheme(0, 1)).toBe('sunny');
    });

    it('deve retornar tema cinza para dia nublado', () => {
        expect(getWeatherTheme(3, 1)).toBe('cloudy');
    });

    it('deve retornar tema noturno com estrelas', () => {
        expect(getWeatherTheme(0, 0)).toBe('night');
    });
});
