import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getPopularCurrencies } from "../../api/api";

export const CurrencyRate = () => {
  const [baseCurrency] = useState(() => {
    return localStorage.getItem("baseCurrency") || "USD";
  });
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rates = await getPopularCurrencies(baseCurrency);
        setExchangeRate(rates.RUB);
      } catch (err) {
        setError("Не удалось загрузить курс валюты. Попробуйте позже.");
        console.error(err.message);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency]);

  return (
    <div className={styles.currencyRate}>
      {error ? (
        <span>{error}</span>
      ) : exchangeRate !== null ? (
        <span>
          1 {baseCurrency} = {exchangeRate.toFixed(2)} RUB
        </span>
      ) : (
        <span>Загрузка...</span>
      )}
    </div>
  );
};
