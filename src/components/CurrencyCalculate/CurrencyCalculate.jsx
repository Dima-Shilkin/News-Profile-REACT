import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getCurrenciesList, getPairConversion } from "../../api/api";
import { Input } from "../Input/Input";
import { SecectS } from "../common/SecectS/SecectS";
import toast from "react-hot-toast";

export const CurrencyCalculate = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchCurrenciesList = async () => {
      try {
        const data = await getCurrenciesList();
        setCurrencies(data);
        if (data.length > 0) {
          setFromCurrency("USD");
          setToCurrency("RUB");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrenciesList();
  }, []);

  const handleCalculate = async () => {
    if (!amount || !fromCurrency || !toCurrency) {
      toast.error("Пожалуйста, заполините все поля");
      return;
    }

    try {
      const data = await getPairConversion(fromCurrency, toCurrency);
      const rate = data.data.conversion_rate;

      const convertedAmount = (rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    } catch (err) {
      console.error(err);
      toast.error("Ошибка. Повторите попытку еще раз");
    }
  };

  return (
    <div className={styles.calculateContainer}>
      <h2>Калькулятор валют</h2>
      <div className={styles.calculateBlock}>
        <div className={styles.inpBlock}>
          <Input
            className={styles.inp}
            type={"number"}
            label={"Сумма"}
            placeholder={"Введите сумму"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={styles.inpBlock}>
          <SecectS
            id="from"
            label="Из"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            currencies={currencies}
          />
        </div>
        <div className={styles.inpBlock}>
          <SecectS
            id="to"
            label="В"
            value={toCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            currencies={currencies}
          />
        </div>
      </div>
      <button className={styles.buttonCalculate} onClick={handleCalculate}>
        Рассчитать
      </button>
      {result && <div className={styles.result}>{result}</div>}
    </div>
  );
};
