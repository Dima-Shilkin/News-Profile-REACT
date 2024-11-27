const mockWeatherData = {
  base: "stations",
  clouds: { all: 13 },
  cod: 200,
  coord: { lon: 33.4464, lat: 52.9336 },
  dt: 1732625706,
  id: 508656,
  main: {
    temp: -5.32,
    feels_like: -8.65,
    temp_min: -5.32,
    temp_max: -5.32,
    pressure: 1027,
    humidity: 95,
  },
  name: "Почеп",
  sys: {
    country: "RU",
    sunrise: 1732598950,
    sunset: 1732628304,
  },
  timezone: 10800,
  visibility: 10000,
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  wind: { speed: 2, deg: 136, gust: 1.86 },
};
export default mockWeatherData;
