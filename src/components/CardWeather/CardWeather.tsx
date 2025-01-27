import styles from "./styles.module.css";
import { TempIcon } from "../common/Icons/TempIcon";
import { getIconForWeather } from "../../helpers/getIconForWeather";
import { WeatherData } from "../../interfaces";

export const CardWeather = ({
  name,
  img,
  description,
  temperature,
}: WeatherData) => {
  return (
    <div className={styles.cardWeather}>
      <div className={styles.cardWeather_left}>
        <img
          className={styles.weatherImg}
          src={getIconForWeather(img)}
          alt={name}
        />
        <div>
          <h3>{name}</h3>
          <span>{description}</span>
        </div>
      </div>
      <div className={styles.cardWeather_right}>
        <TempIcon className={styles.tempImg} />
        <span> {temperature.toFixed(0)} ℃</span>
      </div>
    </div>
  );
};
