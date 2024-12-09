import { getCitiesFromLocalStorage } from "../../helpers/LSforWeather";
import styles from "./styles.module.css";

export const LastRequestCard = ({ handleCityClick }) => {
  return (
    <div className={styles.card_last_request}>
      <h3>Последние запросы:</h3>
      <ul>
        {getCitiesFromLocalStorage().length === 0 ? (
          <p>Нет сохранённых городов</p>
        ) : (
          getCitiesFromLocalStorage().map((city, index) => (
            <li
              className={`${styles.city_name} ${styles.arrow_item}`}
              key={index}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
