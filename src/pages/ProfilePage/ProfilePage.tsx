import styles from "./styles.module.css";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { getData } from "../../api/api";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { User } from "../../interfaces";

export const ProfilePage = () => {
  const { data, isLoading, error } = useFetch<User>(getData, "/users/1");

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.сonteiner}>
      <h2>Данные вашего профиля</h2>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <ProfileCard
          name={data.name}
          email={data.email}
          phone={data.phone}
          city={data.address.city}
          street={data.address.street}
        />
      )}
    </div>
  );
};
