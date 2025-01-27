import styles from "./styles.module.css";

import Loader from "../Loader/Loader";
import { PopularCurrencies } from "../../interfaces";

interface RatesListProps {
  baseCurrency: string;
  rates: PopularCurrencies | null;
}

export const RatesList = ({ baseCurrency, rates }: RatesListProps) => {
  if (!rates) return <Loader />;
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
