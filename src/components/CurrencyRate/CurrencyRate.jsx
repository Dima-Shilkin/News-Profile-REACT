import styles from "./styles.module.css";
import { getPopularCurrencies } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

export const CurrencyRate = () => {
  const baseCurrency = localStorage.getItem("baseCurrency") || "USD";
  const { data, isLoading, error } = useFetch(
    getPopularCurrencies,
    baseCurrency
  );

  return (
    <div className={styles.currencyRate}>
      {isLoading && <Loader />}
      {error && <span>{error}</span>}
      {!isLoading && !error && data?.RUB && (
        <span className={styles.val}>
          1 {baseCurrency} = {data.RUB.toFixed(2)}
        </span>
      )}
    </div>
  );
};
