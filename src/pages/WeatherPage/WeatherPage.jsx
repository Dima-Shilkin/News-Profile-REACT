import styles from "./styles.module.css";
import { Input } from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import { useFetch } from "../../hooks/useFetch";
import { getWeatherData } from "../../api/api";
import { TempIcon } from "../../components/common/Icons/TempIcon";
import { useForm } from "../../hooks/useForm";
import toast from "react-hot-toast";

export const WeatherPage = () => {
  const initialValues = { city: "" };

  const validate = (formData) => {
    if (!formData.city) {
      toast.error("Название города не может быть пустым");
      return "Название города не может быть пустым";
    }
    return null;
  };

  const { formData, formError, handleChange, handlerSubmit, resetForm } =
    useForm(initialValues, validate);
  const { data, isLoading, error } = useFetch(getWeatherData, "Москва");
  //вот тут если передаю в виде строки значения, то все ок.
  console.log(data);

  const onSubmit = (e) => {
    handlerSubmit(e);

    if (!formError) {
      toast.success(`Ищем погоду для города: ${formData.city}`);
      resetForm();
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading || !data) {
    return <Loader />;
  }

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
        {data && (
          <div className={styles.cardWeather}>
            <div className={styles.cardWeather_left}>
              <img
                className={styles.weatherImg}
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt=""
              />
              <div>
                <h3>{data.name}</h3>
                <span>{data.weather[0].description}</span>
              </div>
            </div>
            <div className={styles.cardWeather_right}>
              <TempIcon className={styles.tempImg} />
              <span> {data.main.temp.toFixed(0)} ℃</span>
            </div>
          </div>
        )}
      </div>
      <h2>Последние запросы</h2>
    </>
  );
};
