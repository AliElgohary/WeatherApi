import { apiClient } from "../utils/apiClient.js";
import { cache } from "../config/cache.js";

export class WeatherService {
  async getCurrentWeather(city) {
    const cacheKey = `current-${city}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await apiClient.get("/weather", {
      params: { q: city },
    });

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };

    cache.set(cacheKey, weatherData);
    return weatherData;
  }

  async getForecast(city) {
    const cacheKey = `forecast-${city}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await apiClient.get("/forecast", {
      params: { q: city },
    });

    const forecast = this._processForecastData(response.data.list);
    cache.set(cacheKey, forecast);
    return forecast;
  }

  _processForecastData(forecastList) {
    const dailyForecasts = forecastList.reduce((acc, forecast) => {
      const date = forecast.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          temperatures: [],
          descriptions: new Set(),
        };
      }

      acc[date].temperatures.push(forecast.main.temp);
      acc[date].descriptions.add(forecast.weather[0].description);

      return acc;
    }, {});

    return Object.values(dailyForecasts).map((day) => ({
      date: day.date,
      averageTemperature: (
        day.temperatures.reduce((sum, temp) => sum + temp, 0) /
        day.temperatures.length
      ).toFixed(1),
      descriptions: Array.from(day.descriptions),
    }));
  }
}
