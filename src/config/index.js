import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  weatherApi: {
    key: process.env.WEATHER_API_KEY,
    baseUrl: process.env.WEATHER_API_BASE_URL,
    units: 'metric'
  },
  cache: {
    ttl: 300
  }
};