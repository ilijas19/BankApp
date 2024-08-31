class NavigationView {
  _navigationLoginBtns = document.querySelectorAll(".nav-btn-login");
  _navigationRegisterBtns = document.querySelectorAll(".nav-btn-register");

  _loginWindow = document.querySelector(".login-div");
  _registerWindow = document.querySelector(".register-div");

  // PHONE MENU ELEMENTS
  _menuOpenIcon = document.querySelector(".menu-icon");
  _menuCloseIcon = document.querySelector(".menu-close-icon");
  _menuItems = document.querySelectorAll(".menu-li");

  _phoneMenu = document.querySelector(".phone-menu");
  // DESKTOP NAV
  addNavigationListeners() {
    this._navigationLoginBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        this._showLoginWindow();
      })
    );

    this._navigationRegisterBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        this._showRegisterWindow();
      })
    );
  }

  _showLoginWindow() {
    this._loginWindow.style.opacity = "1";
    this._loginWindow.style.height = "auto";
    this._loginWindow.style.pointerEvents = "auto";

    this._registerWindow.style.opacity = "0";
    this._registerWindow.style.height = "0";
    this._registerWindow.style.pointerEvents = "none";
  }
  _showRegisterWindow() {
    this._loginWindow.style.opacity = "0";
    this._loginWindow.style.height = "0";
    this._loginWindow.style.pointerEvents = "none";

    this._registerWindow.style.opacity = "1";
    this._registerWindow.style.height = "auto";
    this._registerWindow.style.pointerEvents = "auto";
  }

  //PHONE MENU
  addPhoneMenuListeners() {
    this._menuOpenIcon.addEventListener("click", () => {
      this._phoneMenu.style.right = "0";
      this._phoneMenu.style.width = "100%";
    });

    this._menuCloseIcon.addEventListener("click", () => {
      this._phoneMenu.style.right = "-70rem";
      this._phoneMenu.style.width = "0";
    });
    this._menuItems.forEach((item) =>
      item.addEventListener("click", () => {
        this._phoneMenu.style.right = "-70rem";
        this._phoneMenu.style.width = "0";
      })
    );
  }
}
export default new NavigationView();
