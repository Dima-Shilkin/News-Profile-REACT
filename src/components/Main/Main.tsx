import styles from "./styles.module.css";

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};
