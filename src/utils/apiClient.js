import axios from 'axios';
import { config } from '../config/index.js';

export const apiClient = axios.create({
  baseURL: config.weatherApi.baseUrl,
  params: {
    appid: config.weatherApi.key,
    units: config.weatherApi.units
  }
});