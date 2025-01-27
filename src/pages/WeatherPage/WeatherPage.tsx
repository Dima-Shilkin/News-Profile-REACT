import styles from "./styles.module.css";
import { Input } from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import { useForm } from "../../hooks/useForm";
import toast from "react-hot-toast";
import { FormEvent, useState } from "react";
import { getWeatherData } from "../../api/api";
import { IncorrectData } from "../../components/IncorrectData/IncorrectData";
import { CardWeather } from "../../components/CardWeather/CardWeather";
import { LastRequestCard } from "../../components/LastRequestCard/LastRequestCard";
import { saveCityToLocalStorage } from "../../helpers/LSforWeather";
import { FormData, WeatherData } from "../../interfaces";

export const WeatherPage = () => {
  const initialValues = { city: "" };

  const validate = (formData: FormData) => {
    if (!formData.city) {
      toast.error("Название города не может быть пустым");
      return "Название города не может быть пустым";
    }
    return null;
  };

  const { formData, formError, handleChange, handlerSubmit, resetForm } =
    useForm(initialValues, validate);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchWeatherData = async (city: string) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      saveCityToLocalStorage(city);
    } catch (err) {
      console.log(`Ошибка: ${err}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handlerSubmit(e);

    if (!formError) {
      await fetchWeatherData(formData.city);
      resetForm();
    }
  };

  const handleCityClick = async (city: string) => {
    await fetchWeatherData(city);
  };

  return (
    <>
      <div className={styles.weatherContainer}>
        <form onSubmit={onSubmit}>
          <Input
            className={styles.weatherInput}
            placeholder={"Введите город"}
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </form>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <IncorrectData />
        ) : weatherData ? (
          <CardWeather
            name={weatherData.name}
            img={weatherData.img}
            description={weatherData.description}
            temperature={weatherData.temperature}
          />
        ) : null}
      </div>
      <LastRequestCard handleCityClick={handleCityClick} />
    </>
  );
};
