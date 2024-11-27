class AuthService {
  static saveIsAuthToLs() {
    localStorage.setItem("isAuth", JSON.stringify(true));
  }

  static getIsAuthFromLs() {
    return JSON.parse(localStorage.getItem("isAuth"));
  }

  static removeFromLs() {
    localStorage.removeItem("isAuth");
  }

  static isLoginUserValid(login, password, AUTH_CREDENTIALS) {
    return (
      AUTH_CREDENTIALS.login === login && AUTH_CREDENTIALS.password === password
    );
  }
}
export default AuthService;
