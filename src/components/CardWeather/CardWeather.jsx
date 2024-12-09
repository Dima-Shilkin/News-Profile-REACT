import styles from "./styles.module.css";
import { TempIcon } from "../../components/common/Icons/TempIcon";

export const CardWeather = ({ weatherData }) => {
  return (
    <div className={styles.cardWeather}>
      <div className={styles.cardWeather_left}>
        <img
          className={styles.weatherImg}
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.name}
        />
        <div>
          <h3>{weatherData.name}</h3>
          <span>{weatherData.weather[0].description}</span>
        </div>
      </div>
      <div className={styles.cardWeather_right}>
        <TempIcon className={styles.tempImg} />
        <span> {weatherData.main.temp.toFixed(0)} ℃</span>
      </div>
    </div>
  );
};
