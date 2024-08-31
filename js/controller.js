import navigationView from "./views/NavigationView.js";
import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import appView from "./views/appView.js";
import operationView from "./views/operationView.js";

import * as model from "./model.js";

const navigationControl = function () {
  navigationView.addNavigationListeners();
  navigationView.addPhoneMenuListeners();
};

const registerControl = function () {
  // registerView.addRegisterListeners(model.registerUser);
  registerView.addRegisterListeners((fullName, username, age, password) => {
    const registerSuccessful = model.registerUser(
      fullName,
      username,
      age,
      password
    );
    if (registerSuccessful) {
      alert("account regisred succesfully");
      navigationView._showLoginWindow();
    }
  });
};

const loginControl = function () {
  loginView.addLoginListeners((username, password) => {
    const loginSuccessful = model.loginUser(username, password);
    if (loginSuccessful) {
      appView.openApp();
      appView.updateApp(model.state.loggedAccount);
      appView.addLogoutFunctionality();
      appView.addHelpFunctionality();
    }
  });
};

const operationsControl = function () {
  //TRANSFER
  operationView.addTransferFunctionality((to, amount) => {
    model.transferMoney(to, amount);
    appView.updateApp(model.state.loggedAccount);
  });
  //LOAN
  operationView.addLoanFunctionality((loanAmount) => {
    model.loanMoney(loanAmount);
    appView.updateApp(model.state.loggedAccount);
  });
  // DELETE ACC
  operationView.addDeletefunctionality((user, pin) => {
    const deleteAccSuccesful = model.deleteAccount(user, pin);
    if (deleteAccSuccesful) appView.closeApp();
  });
  // SORT
  operationView.addSortFunctionality((value) => {
    model.sort(value);
    appView.updateApp(model.state.loggedAccount);
  });
};

const init = function () {
  model.loadStoredAccounts();
  navigationControl();
  loginControl();
  registerControl();
  operationsControl();
};

init();
