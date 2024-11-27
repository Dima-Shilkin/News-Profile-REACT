export const formValidationAuth = (formData, isLoginUserValid) => {
  if (!formData.login || !formData.password) {
    return "Пожалуйста заполните все поля";
  }

  if (!isLoginUserValid(formData.login, formData.password)) {
    return "Неверный логин или пароль";
  }
};
