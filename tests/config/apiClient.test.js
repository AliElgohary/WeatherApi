import { apiClient } from "../../src/utils/apiClient.js";
import nock from "nock";

describe("apiClient", () => {
  const baseUrl = process.env.WEATHER_API_BASE_URL;

  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll(); 
  });

  afterAll(() => {
    nock.restore();
  });

  it("should make a successful GET request", async () => {
    const mockResponse = { message: "success" };

    nock(baseUrl)
      .get("/weather") 
      .query(true) 
      .reply(200, mockResponse, {
        'Content-Type': 'application/json'
      });

    const response = await apiClient.get("/weather");
    expect(response.data).toEqual(mockResponse);
  });

  it("should throw an error on failed requests", async () => {
    nock(baseUrl)
      .get("/weather")
      .query(true)
      .reply(500, {
        error: "Internal Server Error"
      });

    await expect(apiClient.get("/weather")).rejects.toThrow("Request failed with status code 500");
  });
});