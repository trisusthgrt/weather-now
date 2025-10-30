import React from 'react';

function WeatherDisplay({ weather }) {
  if (!weather) return null;

  const isDataValid =
    typeof weather.temperature === 'number' &&
    typeof weather.windspeed === 'number' &&
    typeof weather.weathercode === 'number';

  // Defensive "feels like" calc
  let feelsLike = null;
  if (isDataValid) {
    feelsLike = weather.temperature;
    if (weather.windspeed > 15) feelsLike -= 2;
    if (weather.humidity > 85) feelsLike += 2;
  }

  if (!isDataValid) {
    return (
      <div className="weather-display no-data">
        <div className="weather-icon" title="No data">❌</div>
        <div className="location">{weather.name}</div>
        <div className="country">{weather.country}</div>
        <div className="temp-main" style={{color:'#f86868'}}>No weather data</div>
        <div style={{color:'#b7bbd4', margin:'0.3rem 0 1.2rem 0'}}>Unable to retrieve weather for this city.</div>
        <div className="stats-row">
          <div className="stat-card"><span className="stat-label">Humidity</span><span className="stat-value">–</span></div>
          <div className="stat-card"><span className="stat-label">Wind Speed</span><span className="stat-value">–</span></div>
          <div className="stat-card"><span className="stat-label">Precipitation</span><span className="stat-value">–</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-display">
      <div className="weather-icon" title={codeMap[weather.weathercode]}>{iconForCode(weather.weathercode)}</div>
      <div className="location">{weather.name}</div>
      <div className="country">{weather.country}</div>
      <div className="temp-main">{weather.temperature}&deg;C</div>
      <div className="feels-like">Feels like {feelsLike !== null ? Math.round(feelsLike) + '°C' : '–'}</div>
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{weather.humidity !== null && typeof weather.humidity === 'number' ? weather.humidity+ '%' : '–'}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Wind Speed</span>
          <span className="stat-value">{typeof weather.windspeed === 'number' ? weather.windspeed + ' km/h' : '–'}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Precipitation</span>
          <span className="stat-value">{weather.precipitation !== null && typeof weather.precipitation === 'number' ? weather.precipitation + ' mm' : '–'}</span>
        </div>
      </div>
    </div>
  );
}

// Weather code translation
const codeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Freezing drizzle',
  61: 'Slight rain',
  63: 'Rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Freezing rain',
  71: 'Slight snow fall',
  73: 'Snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with hail',
};

function iconForCode(code) {
  // Simple icon mapping using emoji
  if (code == null) return '❓';
  if (code === 0) return '☀️';
  if (code === 1 || code === 2) return '🌤️';
  if (code === 3) return '☁️';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌦️';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '🌨️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '❓';
}

export default WeatherDisplay;

