import styles from "./styles.module.css";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { getData } from "../../api/api";

export const ProfilePage = () => {
  const { data, isLoading, error } = useFetch(getData, "/users/1");

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.сonteiner}>
      <h2>Данные вашего профиля</h2>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <ul className={styles.list}>
          <li>Имя: {data.name}</li>
          <li>Email: {data.email}</li>
          <li>Телефон: {data.phone}</li>
          <li>Город: {data.address.city}</li>
          <li>Улица: {data.address.street}</li>
        </ul>
      )}
    </div>
  );
};
