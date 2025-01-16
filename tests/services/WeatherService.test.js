import { WeatherService } from "../../src/services/weatherService.js";
import { cache } from "../../src/config/cache.js";
import nock from "nock";

describe("WeatherService", () => {
  const weatherService = new WeatherService();
  const city = "Cairo";

  beforeEach(() => {
    cache.flushAll();
    nock.cleanAll();
  });

  afterAll(() => {
    nock.restore();
  });

  it("should return cached weather data if available", async () => {
    const cachedWeather = { city, temperature: 30, description: "sunny" };
    cache.set(`current-${city}`, cachedWeather);

    const result = await weatherService.getCurrentWeather(city);
    expect(result).toEqual(cachedWeather);
  });

  it("should fetch current weather data if not cached", async () => {
    const mockResponse = {
      name: city,
      main: { temp: 30, humidity: 50 },
      weather: [{ description: "clear sky" }],
      wind: { speed: 10 },
    };

    nock(process.env.WEATHER_API_BASE_URL)
      .get("/weather")
      .query(true)
      .reply(200, mockResponse);

    const result = await weatherService.getCurrentWeather(city);

    expect(result).toEqual({
      city: "Cairo",
      temperature: 30,
      description: "clear sky",
      humidity: 50,
      windSpeed: 10,
    });
  });

  it("should throw an error if the API request fails", async () => {
    nock(process.env.WEATHER_API_BASE_URL)
      .get("/weather")
      .query(true)
      .reply(500, { message: "Internal Server Error" });

    await expect(weatherService.getCurrentWeather(city)).rejects.toThrow(
      "Request failed with status code 500"
    );
  });

  it("should process forecast data correctly", () => {
    const rawForecastData = [
      {
        dt_txt: "2025-01-16 12:00:00",
        main: { temp: 30 },
        weather: [{ description: "clear sky" }],
      },
      {
        dt_txt: "2025-01-16 15:00:00",
        main: { temp: 32 },
        weather: [{ description: "clear sky" }],
      },
      {
        dt_txt: "2025-01-17 12:00:00",
        main: { temp: 28 },
        weather: [{ description: "cloudy" }],
      },
    ];

    const processed = weatherService._processForecastData(rawForecastData);

    expect(processed).toEqual([
      {
        date: "2025-01-16",
        averageTemperature: "31.0",
        descriptions: ["clear sky"],
      },
      {
        date: "2025-01-17",
        averageTemperature: "28.0",
        descriptions: ["cloudy"],
      },
    ]);
  });
});
