import { useState } from "react";
import { getPopularCurrencies } from "../../api/api";
import { RatesList } from "../../components/RatesList/RatesList";
import styles from "./styles.module.css";
import { BaseCurrencySelect } from "../../components/BaseCurrencySelect/BaseCurrencySelect";
import {
  getBaseCurrencyFromLS,
  saveBaseCurrencyToLS,
} from "../../helpers/LSforCurrencyPage";
import { CurrencyCalculate } from "../../components/CurrencyCalculate/CurrencyCalculate";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";

export const CurrencyPage = () => {
  const [baseCurrency, setBaseCurrency] = useState(
    () => getBaseCurrencyFromLS() || "USD"
  );

  const { data, isLoading, error } = useFetch(
    getPopularCurrencies,
    baseCurrency
  );

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
    saveBaseCurrencyToLS(e.target.value);
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.popularConteiner}>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <BaseCurrencySelect
              baseCurrency={baseCurrency}
              handleCurrencyChange={handleCurrencyChange}
            />
            <RatesList baseCurrency={baseCurrency} rates={data} />
          </>
        )}
      </div>
      <CurrencyCalculate />
    </>
  );
};
