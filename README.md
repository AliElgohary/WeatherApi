# Weather API Application

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building the API.
- **Axios**: HTTP client for making API requests to OpenWeatherMap.
- **Node-Cache**: In-memory caching for storing weather data.
- **Jest**: Testing framework for unit and integration tests.
- **Nock**: HTTP server mocking for testing.
- **Dotenv**: Environment variable management.

## Installation

    create a new Create a .env file as the on in the .env.example file

    1. Install dependencies:
    npm install
    2. run the application
    npm run dev
    3. for development mode
    npm run dev
    4. to run tests
    npm run test

## APIs

1. To Get Current Weather by City.

   - Endpoint: [http://localhost:3000/api/weather/current/:city]
   -city: The name of the city.

2. To Get 5-Day Weather Forecast:

   - Endpoint: [http://localhost:3000/api/weather/forecast/:city]
   - city: The name of the city.
