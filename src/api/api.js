import axios from "axios";

const key = import.meta.env.VITE_KEY_API;

export const getData = async (edpoint) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com" + edpoint
  );
  return response.data;
};

export const getWeatherData = async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric&lang=ru`
  );

  return response.data;
};
