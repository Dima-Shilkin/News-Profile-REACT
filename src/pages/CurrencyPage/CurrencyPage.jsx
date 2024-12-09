import { useState, useEffect } from "react";
import { getPopularCurrencies } from "../../api/api";
import { RatesList } from "../../components/RatesList/RatesList";
import styles from "./styles.module.css";
import { BaseCurrencySelect } from "../../components/BaseCurrencySelect/BaseCurrencySelect";
import {
  getBaseCurrencyFromLS,
  saveBaseCurrencyToLS,
} from "../../helpers/LSforCurrencyPage";
import { CurrencyCalculate } from "../../components/CurrencyCalculate/CurrencyCalculate";

export const CurrencyPage = () => {
  const [baseCurrency, setBaseCurrency] = useState(
    () => getBaseCurrencyFromLS() || "USD"
  );
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const popularRates = await getPopularCurrencies(baseCurrency);
        setRates(popularRates);
      } catch (error) {
        setError("Не удалось загрузить данные о валюте. Попробуйте позже");
        console.error(error.message);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
    saveBaseCurrencyToLS(e.target.value);
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.popularConteiner}>
        <BaseCurrencySelect
          baseCurrency={baseCurrency}
          handleCurrencyChange={handleCurrencyChange}
        />
        {/*список популярных валют*/}
        <RatesList baseCurrency={baseCurrency} rates={rates} />
      </div>
      <CurrencyCalculate />
    </>
  );
};
