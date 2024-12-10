import styles from "./styles.module.css";

export const SecectS = ({ id, label, value, onChange, currencies }) => {
  const validCurrencies = currencies ? currencies : [];

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        className={styles.select}
        id={id}
        value={value}
        onChange={onChange}
      >
        {validCurrencies.map(([code]) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </>
  );
};
