import axios from "axios";
import { PopularCurrencies, Post, User, WeatherData } from "../interfaces";

const KEYweather = import.meta.env.VITE_KEY_API;

const KEYexchange = import.meta.env.VITE_EXCHANGE_API_KEY;

export const getData = async <T extends User | Post[]>(edpoint?: string): Promise<T> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com" + edpoint
  );
  return response.data;
};


export const getWeatherData = async (location: string): Promise<WeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEYweather}&units=metric&lang=ru`
  );
  const { main, name, weather } = response.data;
  return {
    temperature: main.temp,
    name,
    description: weather[0].description,
    img: weather[0].icon,
  };
};

//для популярных валют
export const getPopularCurrencies = async (base?: string): Promise<PopularCurrencies> => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${KEYexchange}/latest/${base}`
  );

  const { conversion_rates } = response.data;
  return {
    EUR: conversion_rates.EUR,
    CNY: conversion_rates.CNY,
    RUB: conversion_rates.RUB,
  };
};

//для калькулятора
export const getPairConversion = async (from: string, to: string): Promise<number> => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${KEYexchange}/pair/${from}/${to}`
  );
  return response.data.conversion_rate;
};

// для списка всех валют (в селект)
export const getCurrenciesList = async (): Promise<[string, string][]> => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${KEYexchange}/codes`
  );
  return response.data.supported_codes;
};
