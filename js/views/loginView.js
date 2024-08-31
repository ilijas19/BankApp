class LoginView {
  _usernameField = document.querySelector(".login-user");
  _passwordField = document.querySelector(".login-password");
  _loginBtn = document.querySelector(".log-in-btn");

  addLoginListeners(callBackFunction) {
    this._loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const username = this._usernameField.value;
      const password = this._passwordField.value;

      if (password.length < 4) {
        alert("password must be at least 4 char long");
        return;
      }

      callBackFunction(username, password);
    });
  }
}

export default new LoginView();
