// import styles from "./styles.module.css";

export const BaseCurrencySelect = ({ baseCurrency, handleCurrencyChange }) => {
  return (
    <div>
      <label htmlFor="baseCurrency">Выберите базовую валюту: </label>
      <select
        id="baseCurrency"
        value={baseCurrency}
        onChange={handleCurrencyChange}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CNY">CNY</option>
      </select>
    </div>
  );
};
