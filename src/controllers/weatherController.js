import { WeatherService } from '../services/weatherService.js';

const weatherService = new WeatherService();

export const getCurrentWeather = async (req, res, next) => {
  try {
    const { city } = req.params;
    const weatherData = await weatherService.getCurrentWeather(city);
    return res.json(weatherData);
  } catch (error) {
    next(error);
  }
};

export const getForecast = async (req, res, next) => {
  try {
    const { city } = req.params;
    const forecastData = await weatherService.getForecast(city);
    return res.json(forecastData);
  } catch (error) {
    next(error);
  }
};