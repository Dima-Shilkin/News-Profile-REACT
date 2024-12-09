import styles from "./styles.module.css";

import Loader from "../Loader/Loader";

export const RatesList = ({ baseCurrency, rates }) => {
  if (!rates) return <Loader>Загрузка...</Loader>;
  return (
    <ul className={styles.listRates}>
      {Object.entries(rates).map(([currency, rate]) => (
        <li className={styles.rateItem} key={currency}>
          1 {baseCurrency} = {rate} {currency}
        </li>
      ))}
    </ul>
  );
};
