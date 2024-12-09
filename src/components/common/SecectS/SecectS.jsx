import styles from "./styles.module.css";

export const SecectS = ({ id, label, value, onChange, currencies }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        className={styles.select}
        id={id}
        value={value}
        onChange={onChange}
      >
        {currencies.map(([code]) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </>
  );
};
