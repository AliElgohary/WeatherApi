import express from "express";
import {
  getCurrentWeather,
  getForecast,
} from "../controllers/weatherController.js";
import { validateApiKey } from "../middleware/validateApiKey.js";

const weatherRoutes = express.Router();

weatherRoutes.get("/current/:city", validateApiKey, getCurrentWeather);
weatherRoutes.get("/forecast/:city", validateApiKey, getForecast);

export default weatherRoutes;
