import styles from "./styles.module.css";

export const Input = ({
  label,
  value,
  onChange,
  name,
  id,
  placeholder,
  type,
  error,
  onBlur,
  className,
  readOnly,
}) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        className={`${className} ${error ? styles.error : ""}`}
        onBlur={onBlur}
        readOnly={readOnly}
      />
    </>
  );
};
