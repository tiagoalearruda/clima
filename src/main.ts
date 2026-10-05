import './style.css';
import { getCityWeather, searchCity } from './services/weatherService';
import { applyWeatherTheme } from './theme';
import { mapWeatherCode } from './utils/weatherMapper';

const STORAGE_KEY = 'clima:last-city';

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
    <div class="loading-state" role="status" aria-live="polite" aria-atomic="true">
      <div class="spinner" aria-hidden="true"></div>
      <p>Buscando clima...</p>
    </div>
  `;
}

function renderErrorState(message: string): string {
  return `
    <div class="error-state" role="alert" aria-live="assertive">
      <h2>Não foi possível localizar a cidade</h2>
      <p>${message}</p>
    </div>
  `;
}

function setSearchValidity(input: HTMLInputElement, isInvalid: boolean): void {
  input.setAttribute('aria-invalid', String(isInvalid));
}

function formatDate(): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date());
}

function getWindDirectionLabel(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % directions.length;

  return directions[index];
}

function renderWeatherCard(
  locationName: string,
  country: string,
  countryCode: string | undefined,
  weatherData: Awaited<ReturnType<typeof getCityWeather>>,
) {
  const current = weatherData.current ?? {};
  const temperature = Math.round(Number(current.temperature_2m ?? 0));
  const apparentTemperature = Math.round(Number(current.apparent_temperature ?? 0));
  const humidity = Math.round(Number(current.relative_humidity_2m ?? 0));
  const precipitation = Math.round(Number(current.precipitation_probability ?? 0));
  const windSpeed = Math.round(Number(current.wind_speed_10m ?? 0));
  const windDirection = Math.round(Number(current.wind_direction_10m ?? 0));
  const windDirectionLabel = getWindDirectionLabel(windDirection);
  const condition = mapWeatherCode(current.weather_code);
  const dayPhase = current.is_day === 1 ? 'Dia' : 'Noite';
  const countryLabel = countryCode ? `${country} • ${countryCode}` : country;

  applyWeatherTheme(current.weather_code, current.is_day);

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
          <p>${countryLabel}</p>
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
            <strong>${windSpeed} km/h • ${windDirection}° ${windDirectionLabel}</strong>
          </article>
        </div>
      </section>
    </div>
  `;
}

async function performSearch(city: string): Promise<void> {
  const form = document.querySelector<HTMLFormElement>('#weather-form');
  const input = document.querySelector<HTMLInputElement>('#city-input');
  const weatherContent = document.querySelector<HTMLDivElement>('#weather-content');
  const submitButton = document.querySelector<HTMLButtonElement>('#weather-submit');

  if (!form || !input || !weatherContent || !submitButton) {
    return;
  }

  const normalizedCity = city.trim();

  if (!normalizedCity) {
    setSearchValidity(input, true);
    weatherContent.innerHTML = renderErrorState('Digite o nome de uma cidade.');
    input.focus();
    return;
  }

  setSearchValidity(input, false);
  submitButton.disabled = true;
  submitButton.textContent = 'Buscando...';
  input.setAttribute('aria-busy', 'true');
  form.setAttribute('aria-busy', 'true');
  weatherContent.innerHTML = renderLoadingState();

  try {
    const location = await searchCity(normalizedCity);

    if (!location) {
      setSearchValidity(input, true);
      weatherContent.innerHTML = renderErrorState('Cidade não encontrada. Tente outra busca.');
      input.focus();
      return;
    }

    const weather = await getCityWeather(location.latitude, location.longitude, location.timezone);
    input.value = location.name;
    setSearchValidity(input, false);
    localStorage.setItem(STORAGE_KEY, normalizedCity);
    renderWeatherCard(location.name, location.country, location.country_code, weather);
  } catch {
    setSearchValidity(input, true);
    weatherContent.innerHTML = renderErrorState('Não foi possível buscar o clima no momento.');
    input.focus();
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Buscar';
    input.setAttribute('aria-busy', 'false');
    form.setAttribute('aria-busy', 'false');
  }
}

function setupSearch(): void {
  const form = document.querySelector<HTMLFormElement>('#weather-form');
  const input = document.querySelector<HTMLInputElement>('#city-input');
  const weatherContent = document.querySelector<HTMLDivElement>('#weather-content');

  if (!form || !input || !weatherContent) {
    return;
  }

  input.addEventListener('input', () => {
    if (input.value.trim()) {
      setSearchValidity(input, false);
    }

    if (input.value.trim() && weatherContent.querySelector('.error-state')) {
      weatherContent.innerHTML = renderEmptyState();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await performSearch(input.value);
  });
}

async function restoreLastSearch(): Promise<void> {
  const input = document.querySelector<HTMLInputElement>('#city-input');

  if (!input) {
    return;
  }

  const savedCity = localStorage.getItem(STORAGE_KEY);

  if (!savedCity) {
    return;
  }

  input.value = savedCity;
  await performSearch(savedCity);
}

function mountApp(): void {
  applyWeatherTheme(0, 1);

  app.innerHTML = `
    <div class="weather-app">
      <header class="search-header">
        <form id="weather-form" class="search-form">
          <input
            id="city-input"
            type="search"
            name="city"
            placeholder="Buscar cidade"
            aria-label="Buscar cidade"
            aria-invalid="false"
            autocomplete="off"
          />
          <button id="weather-submit" type="submit">Buscar</button>
        </form>
      </header>

      <main id="weather-content" class="weather-content" aria-live="polite" aria-atomic="true">
        ${renderEmptyState()}
      </main>
    </div>
  `;

  setupSearch();
  void restoreLastSearch();
}

mountApp();
