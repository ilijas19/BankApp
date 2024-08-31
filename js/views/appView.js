class AppView {
  _app = document.querySelector(".app");
  _loginWindow = document.querySelector(".login-div");
  _registerWindow = document.querySelector(".register-div");

  _navText = document.querySelector(".nav-text");
  _movementsContainer = document.querySelector(".movements");
  _balanceValue = document.querySelector(".balance-value");

  _summaryIn = document.querySelector(".summary__value--in");
  _summaryOut = document.querySelector(".summary__value--out");
  _summaryInterest = document.querySelector(".summary__value--interest");

  // navigation buttons
  _navigationLoginBtns = document.querySelectorAll(".nav-btn-login");
  _navigationRegisterBtns = document.querySelectorAll(".nav-btn-register");
  _navigationLogoutBtns = document.querySelectorAll(".nav-btn-logout");
  _navigationHelpBtns = document.querySelectorAll(".nav-btn-help");
  _helpPopup = document.querySelector(".help-popup");
  _closePopupBtn = document.querySelector(".popup-close-btn");

  movementCounter = 0;

  addHelpFunctionality() {
    this._navigationHelpBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        this._toggleHelpPopup();
      })
    );
  }

  _toggleHelpPopup() {
    // Toggle the visibility of the help popup
    this._helpPopup.classList.toggle("visible");
    this._closePopupBtn.addEventListener("click", () => {
      this._toggleHelpPopup();
    });
  }

  addLogoutFunctionality() {
    this._navigationLogoutBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        this.closeApp();
      })
    );
  }

  closeApp() {
    this._app.style.opacity = "0";
    this._app.style.pointerEvents = "none";

    // Closing the login window
    this._loginWindow.style.opacity = "1";
    this._loginWindow.style.height = "auto";
    this._loginWindow.style.pointerEvents = "auto";

    this._showCloseAppBtns();

    // Update navigation text
    this._navText.textContent = "Login";
  }

  openApp() {
    this._app.style.opacity = "1";
    this._app.style.pointerEvents = "auto";

    // closing the login window
    this._loginWindow.style.opacity = "0";
    this._loginWindow.style.height = "0";
    this._loginWindow.style.pointerEvents = "none";

    // showing buttons when user is logged in / app is open
    this._showOpenAppBtns();
  }

  _showOpenAppBtns() {
    //removing login/registerbtns
    this._navigationLoginBtns.forEach((btn) => {
      btn.style.display = "none";
    });
    this._navigationRegisterBtns.forEach((btn) => {
      btn.style.display = "none";
    });
    // adding help/logout btns
    this._navigationLogoutBtns.forEach((btn) => {
      btn.style.opacity = "1";
      btn.style.width = "auto";
      btn.style.height = "auto";
      btn.style.pointerEvents = "auto";
    });
    this._navigationHelpBtns.forEach((btn) => {
      btn.style.opacity = "1";
      btn.style.width = "auto";
      btn.style.height = "auto";
      btn.style.pointerEvents = "auto";
    });
  }

  _showCloseAppBtns() {
    //adding login/registerbtns
    this._navigationLoginBtns.forEach((btn) => {
      btn.style.display = "block";
    });
    this._navigationRegisterBtns.forEach((btn) => {
      btn.style.display = "block";
    });
    // removing help/logout btns
    this._navigationLogoutBtns.forEach((btn) => {
      btn.style.opacity = "0";
      btn.style.width = "0";
      btn.style.height = "0";
      btn.style.pointerEvents = "none";
    });
    this._navigationHelpBtns.forEach((btn) => {
      btn.style.opacity = "0";
      btn.style.width = "0";
      btn.style.height = "0";
      btn.style.pointerEvents = "none";
    });
    if (window.innerWidth < 750) {
      document.querySelector(".navigation-login-btn").style.display = "none";
      document.querySelector(".navigation-register-btn").style.display = "none";
    }
  }

  updateApp(currentAccount) {
    this.movementCounter = 0;
    this._navText.textContent = currentAccount.name.split(" ")[0];
    this._balanceValue.textContent = currentAccount.balance + "$";
    this.renderMovements(currentAccount.movements);
  }

  renderMovements(movements) {
    this._movementsContainer.innerHTML = "";
    movements.forEach((movement) =>
      this._movementsContainer.insertAdjacentHTML(
        "afterbegin",
        this._generateMovementMarkup(movement)
      )
    );
    this._updateSummary(movements);
  }

  _updateSummary(movements) {
    const interestRate = 0.012; // 1.2% interest rate

    this._summaryIn.textContent =
      movements.filter((mov) => mov > 0).reduce((acc, cur) => acc + cur, 0) +
      "$";

    this._summaryOut.textContent =
      movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + cur, 0) +
      "$";

    const interest = movements
      .filter((mov) => mov > 0)
      .map((deposit) => deposit * interestRate)
      .reduce((acc, cur) => acc + cur, 0);

    this._summaryInterest.textContent = interest.toFixed(2) + "$";
  }

  _generateMovementMarkup(movement) {
    this.movementCounter++;
    return ` 
    <div class="movement">
            <p class="type type-${movement > 0 ? "deposit" : "withdrawal"}">${
      this.movementCounter
    } ${movement > 0 ? "deposit" : "withdrawal"}</p>
            <p class="value">${movement} $</p>
          </div>
          `;
  }
}

export default new AppView();
