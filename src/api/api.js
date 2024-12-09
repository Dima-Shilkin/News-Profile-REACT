import axios from "axios";

const KEYweather = import.meta.env.VITE_KEY_API;

const KEYexchange = import.meta.env.VITE_EXCHANGE_API_KEY;

export const getData = async (edpoint) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com" + edpoint
  );
  return response.data;
};

export const getWeatherData = async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEYweather}&units=metric&lang=ru`
  );

  return response.data;
};

//для популярных валют
export const getPopularCurrencies = async (base) => {
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
export const getPairConversion = async (from, to) => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${KEYexchange}/pair/${from}/${to}`
  );
  return response;
};

// для списка всех валют (в селект)
export const getCurrenciesList = async () => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${KEYexchange}/codes`
  );
  return response.data.supported_codes;
};
