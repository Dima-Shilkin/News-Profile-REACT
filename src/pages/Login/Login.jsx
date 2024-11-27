import { useForm } from "../../hooks/useForm";
import { formValidationAuth } from "../../helpers/formValidationAuth";
import AuthService from "../../helpers/authHelpers";
import { AUTH_CREDENTIALS } from "../../config/authConfig";
import toast from "react-hot-toast";
import styles from "./styles.module.css";
import { Input } from "../../components/Input/Input";
import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const initialValues = {
    login: "",
    password: "",
  };

  const validate = (formData) => {
    const errorMessage = formValidationAuth(formData, (login, password) =>
      AuthService.isLoginUserValid(login, password, AUTH_CREDENTIALS)
    );
    if (errorMessage) {
      toast.error(errorMessage);
      return errorMessage;
    }
    return null;
  };

  const { formData, formError, handleChange, handlerSubmit, handlerBlur } =
    useForm(initialValues, validate);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthSuccess = () => {
    AuthService.saveIsAuthToLs(true);
    navigate(location.state?.from || "/");
    toast.success("Вы успешно вошли");
  };

  const onSubmit = (e) => {
    handlerSubmit(e);

    if (!formError) {
      if (
        AuthService.isLoginUserValid(
          formData.login,
          formData.password,
          AUTH_CREDENTIALS
        )
      ) {
        handleAuthSuccess();
      }
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>Вход на News Profile</p>
      <p className={styles.description1}>Войдите, чтобы продолжить</p>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <div className={styles.input_conteiner}>
          <Input
            label="Введите логин"
            value={formData.login}
            onChange={handleChange}
            onBlur={handlerBlur}
            name="login"
            placeholder="Login"
            error={formError}
          />
        </div>
        <div className={styles.input_conteiner}>
          <Input
            label="Введите пароль"
            value={formData.password}
            onChange={handleChange}
            onBlur={handlerBlur}
            name="password"
            type="password"
            placeholder="Password"
            error={formError}
          />
        </div>
        <button className={styles.button} type="submit">
          Вход
        </button>
      </form>
    </div>
  );
};
