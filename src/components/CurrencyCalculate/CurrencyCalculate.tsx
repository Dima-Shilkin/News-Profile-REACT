import styles from "./styles.module.css";
import { useState } from "react";
import { getCurrenciesList, getPairConversion } from "../../api/api";
import { Input } from "../Input/Input";
import { SelectS } from "../common/SelectS/SelectS";
import toast from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

interface CurrencyState {
  amount: string;
  from: string;
  to: string;
}

export const CurrencyCalculate = () => {
  const [currencyState, setCurrencyState] = useState<CurrencyState>({
    amount: "",
    from: "USD",
    to: "RUB",
  });
  const [rate, setRate] = useState<number | null>(null);

  const {
    data: currencies,
    isLoading,
    error,
  } = useFetch<[string, string][]>(getCurrenciesList);
  const currencyOptions = currencies ? currencies.map(([code]) => code) : [];

  const handleCalculate = async () => {
    const { amount, from, to } = currencyState;
    if (!amount || !from || !to) {
      toast.error("Пожалуйста, заполините все поля");
      return;
    }

    try {
      const rate = await getPairConversion(from, to);
      setRate(rate);
    } catch (err) {
      console.error(err);
      toast.error("Ошибка. Повторите попытку еще раз");
    }
  };

  const displayResult: string | null = rate
    ? `${currencyState.amount} ${currencyState.from} = ${(
        rate * Number(currencyState.amount)
      ).toFixed(2)} ${currencyState.to}`
    : null;

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}</p>;
  }

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
            value={currencyState.amount}
            onChange={(e) =>
              setCurrencyState((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
        </div>
        <div className={styles.inpBlock}>
          <SelectS
            id="from"
            label="Из"
            value={currencyState.from}
            onChange={(e) =>
              setCurrencyState((prev) => ({ ...prev, from: e.target.value }))
            }
            currencies={currencyOptions}
          />
        </div>
        <div className={styles.inpBlock}>
          <SelectS
            id="to"
            label="В"
            value={currencyState.to}
            onChange={(e) =>
              setCurrencyState((prev) => ({ ...prev, to: e.target.value }))
            }
            currencies={currencyOptions}
          />
        </div>
      </div>
      <button className={styles.buttonCalculate} onClick={handleCalculate}>
        Рассчитать
      </button>
      {rate && <div className={styles.result}>{displayResult}</div>}
    </div>
  );
};
