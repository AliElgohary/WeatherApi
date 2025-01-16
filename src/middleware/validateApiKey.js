import { config } from "../config/index.js";

export const validateApiKey = (req, res, next) => {
  if (!config.weatherApi.key) {
    return res.status(500).json({ error: "Weather API key not configured" });
  }
  next();
};
