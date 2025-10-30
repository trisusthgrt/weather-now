# Weather Now

A fast, no‑auth React web app to check the current weather for any city using Open‑Meteo APIs.

## Features
- Search by city name (geocoded to latitude/longitude)
- Current conditions: temperature, apparent temperature (feels like), weather code/icon, wind speed
- Humidity and precipitation (via current API fields with hourly fallback)
- Dark, modern UI with responsive layout
- Graceful fallbacks (clear message if data is unavailable)

## Tech Stack
- React 18
- Open‑Meteo Geocoding + Forecast APIs (no API key required)
- Plain CSS (custom, responsive)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```
The app will open at `http://localhost:3000`.

## How It Works

1. Geocoding: Convert a city name to coordinates
   - `GET https://geocoding-api.open-meteo.com/v1/search?name={CITY}`
2. Weather: Fetch current conditions and hourly series for fallback values
   - `GET https://api.open-meteo.com/v1/forecast?latitude=..&longitude=..&timezone=..&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,precipitation&hourly=relative_humidity_2m,precipitation`

The app prefers current values for humidity and precipitation, and falls back to hourly values aligned by the current timestamp when needed.

## Project Structure
```
weather-now/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ ErrorMsg.jsx
│  │  ├─ WeatherDisplay.jsx
│  │  └─ WeatherForm.jsx
│  ├─ App.css
│  ├─ App.jsx
│  └─ index.js
├─ package.json
└─ README.md
```

## Customization
- Styling is centralized in `src/App.css`.
- The weather condition icon currently uses emojis via a simple mapping in `WeatherDisplay.jsx`. You can replace these with SVGs or an icon library easily.
- The "feels like" temperature is approximated when needed; you may switch to using `apparent_temperature` directly in the UI.

## Deployment
You can deploy quickly on:
- Vercel / Netlify: push to GitHub and import the repository
- CodeSandbox / StackBlitz: upload the folder or import GitHub repo

Build for production:
```bash
npm run build
```
The build output will be generated in `build/`.

## Notes
- Some small towns may have incomplete data; the app shows a friendly fallback when the API response is missing fields.
- If you encounter issues, check the browser console for any network errors or logs labeled `Weather fetch error`.

## Credits
- Built for Jamie, the Outdoor Enthusiast persona
- Powered by Open‑Meteo API
