import React from 'react';

function WeatherForm({ city, onCityChange, onFormSubmit, loading }) {
  return (
    <form className="weather-form" onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={e => onCityChange(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !city.trim()}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
    </form>
  );
}

export default WeatherForm;

