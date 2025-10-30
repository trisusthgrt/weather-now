import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorMsg from './components/ErrorMsg';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      // 1) Geocode the city name
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        setError('City not found. Please try another search.');
        setLoading(false);
        return;
      }
      const { latitude, longitude, name, country, timezone } = geoData.results[0];

      // 2) Fetch weather using new "current" fields + correct hourly keys
      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        timezone,
        current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
        hourly: 'relative_humidity_2m,precipitation'
      });
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
      const weatherData = await weatherRes.json();

      if (!weatherData.current) {
        setError('No current weather data available for this location.');
        setLoading(false);
        return;
      }

      let humidity = null, precipitation = null;
      if (weatherData.hourly && weatherData.current.time) {
        const idx = weatherData.hourly.time.indexOf(weatherData.current.time);
        if (idx >= 0) {
          const rh = weatherData.hourly.relative_humidity_2m?.[idx];
          const pr = weatherData.hourly.precipitation?.[idx];
          humidity = typeof rh === 'number' ? rh : null;
          precipitation = typeof pr === 'number' ? pr : null;
        }
      }

      setWeather({
        // normalize to previous component expectations
        temperature: weatherData.current.temperature_2m,
        windspeed: weatherData.current.wind_speed_10m,
        weathercode: weatherData.current.weather_code,
        apparent_temperature: weatherData.current.apparent_temperature,
        name,
        country,
        humidity,
        precipitation
      });
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (val) => setCity(val);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }
    fetchWeather(city.trim());
  };

  return (
    <>
      <div className="app-container">
        <h1>Weather Now</h1>
        <div className="subtitle">Your quick and easy weather checker.</div>
        <WeatherForm
          city={city}
          onCityChange={handleCityChange}
          onFormSubmit={handleFormSubmit}
          loading={loading}
        />
        {error && <ErrorMsg message={error} />}
        {weather && !error && <WeatherDisplay weather={weather} />}
      </div>
      <div className="footer">
        Built for Jamie, the Outdoor Enthusiast.<br/>
        <span className="credit">Powered by Open-Meteo API.</span>
      </div>
    </>
  );
}

export default App;

