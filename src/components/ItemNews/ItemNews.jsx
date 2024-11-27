import styles from "./styles.module.css";

export const ItemNews = ({ item }) => {
  return (
    <li className={styles.item}>
      <h3 className={styles.title}>{item.title}</h3>
      <span className={styles.description}>{item.body}</span>
    </li>
  );
};
