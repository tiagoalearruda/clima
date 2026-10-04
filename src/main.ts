import './style.css';
import { getCityWeather, searchCity } from './services/weatherService';
import { mapWeatherCode } from './utils/weatherMapper';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

if (!app) {
  throw new Error('Elemento #app não foi encontrado.');
}

function renderEmptyState(): string {
  return `
    <div class="empty-state">
      <p class="empty-state__label">Seu clima em tempo real</p>
      <h2>Busque por uma cidade para ver a previsão.</h2>
    </div>
  `;
}

function renderLoadingState(): string {
  return `
    <div class="loading-state">
      <div class="spinner" aria-label="Carregando clima"></div>
      <p>Buscando clima...</p>
    </div>
  `;
}

function renderErrorState(message: string): string {
  return `
    <div class="error-state">
      <h2>Não foi possível localizar a cidade</h2>
      <p>${message}</p>
    </div>
  `;
}

function formatDate(): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date());
}

function renderWeatherCard(locationName: string, country: string, weatherData: Awaited<ReturnType<typeof getCityWeather>>) {
  const current = weatherData.current ?? {};
  const temperature = Math.round(Number(current.temperature_2m ?? 0));
  const apparentTemperature = Math.round(Number(current.apparent_temperature ?? 0));
  const humidity = Math.round(Number(current.relative_humidity_2m ?? 0));
  const precipitation = Math.round(Number(current.precipitation_probability ?? 0));
  const windSpeed = Math.round(Number(current.wind_speed_10m ?? 0));
  const windDirection = Math.round(Number(current.wind_direction_10m ?? 0));
  const condition = mapWeatherCode(current.weather_code);
  const dayPhase = current.is_day === 1 ? 'Dia' : 'Noite';

  const weatherContent = document.querySelector<HTMLDivElement>('#weather-content');

  if (!weatherContent) {
    return;
  }

  weatherContent.innerHTML = `
    <div class="weather-card">
      <aside class="weather-sidebar">
        <div class="temperature-row">
          <span class="temperature">${temperature}°C</span>
          <span class="condition">${condition}</span>
        </div>
        <div class="location-block">
          <h2>${locationName}</h2>
          <p>${country}</p>
        </div>
        <div class="date-block">
          <p>${formatDate()}</p>
          <span class="day-phase">${dayPhase}</span>
        </div>
      </aside>

      <section class="weather-main">
        <div class="stat-grid">
          <article class="stat-card">
            <span class="label">Umidade</span>
            <strong>${humidity}%</strong>
          </article>
          <article class="stat-card">
            <span class="label">Temperatura aparente</span>
            <strong>${apparentTemperature}°C</strong>
          </article>
          <article class="stat-card">
            <span class="label">Precipitação</span>
            <strong>${precipitation}%</strong>
          </article>
          <article class="stat-card">
            <span class="label">Vento</span>
            <strong>${windSpeed} km/h • ${windDirection}°</strong>
          </article>
        </div>
      </section>
    </div>
  `;
}

function setupSearch(): void {
  const form = document.querySelector<HTMLFormElement>('#weather-form');
  const input = document.querySelector<HTMLInputElement>('#city-input');
  const weatherContent = document.querySelector<HTMLDivElement>('#weather-content');

  if (!form || !input || !weatherContent) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = input.value.trim();

    if (!city) {
      weatherContent.innerHTML = renderErrorState('Digite o nome de uma cidade.');
      return;
    }

    weatherContent.innerHTML = renderLoadingState();

    try {
      const location = await searchCity(city);

      if (!location) {
        weatherContent.innerHTML = renderErrorState('Cidade não encontrada. Tente outra busca.');
        return;
      }

      const weather = await getCityWeather(location.latitude, location.longitude, location.timezone);
      renderWeatherCard(location.name, location.country, weather);
    } catch {
      weatherContent.innerHTML = renderErrorState('Não foi possível buscar o clima no momento.');
    }
  });
}

function mountApp(): void {
  app.innerHTML = `
    <div class="weather-app">
      <header class="search-header">
        <form id="weather-form" class="search-form">
          <input
            id="city-input"
            type="text"
            name="city"
            placeholder="Buscar cidade"
            aria-label="Buscar cidade"
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main id="weather-content" class="weather-content">
        ${renderEmptyState()}
      </main>
    </div>
  `;

  setupSearch();
}

mountApp();
