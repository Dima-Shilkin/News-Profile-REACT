import styles from "./styles.module.css";

export const Main = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};
