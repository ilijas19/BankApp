class RegisterView {
  _fullNameField = document.querySelector(".register-fullname");
  _usernameField = document.querySelector(".register-username");
  _ageField = document.querySelector(".register-age");
  _passwordField = document.querySelector(".register-password");
  _repeatField = document.querySelector(".register-repeat");
  _registerBtn = document.querySelector(".reg-btn");

  addRegisterListeners(callBackFunction) {
    this._registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = this._fullNameField.value;
      const username = this._usernameField.value;
      const age = Number(this._ageField.value);
      const password = this._passwordField.value;
      const rePassword = this._repeatField.value;

      // Check if name contains numbers
      const nameContainsNumbers = /\d/.test(name);
      // Check if name follows "First Name Last Name" format
      const nameFormat = /^[A-Za-z]+ [A-Za-z]+$/.test(name);

      if (nameContainsNumbers || !nameFormat) {
        alert("Enter Valid full name e.g. John Smith");
        return;
      }
      if (username.length < 4) {
        alert("username must be at least 4 char long");
        return;
      }
      if (age < 18) {
        alert("You must be over 18");
        return;
      }
      if (password.length < 4) {
        alert("Password must be at least 4 char long");
        return;
      }
      if (password !== rePassword) {
        alert("Passwords are not the same");
        return;
      }
      callBackFunction(name, username, age, password);
    });
  }
}

export default new RegisterView();
