export const state = {
  accounts: [
    {
      name: "Ilija Gocic",
      age: 21,
      username: "ig",
      password: "1111",
      movements: [100, 300, -200],
    },
    {
      name: "George Floyd",
      age: 46,
      username: "gf",
      password: "2222",
      movements: [100, 300, -200, 9999],
    },
  ],
  loggedAccount: {},
};

export const loginUser = function (username, password) {
  const account = state.accounts.find(
    (account) => account.username === username
  );
  if (!account) {
    alert("no account with that name found");
    return false;
  }
  if (account.password !== password) {
    alert("wrong Password");
    return false;
  }
  state.loggedAccount = account;

  alert("Login successful");
  return true;
};

export const registerUser = function (fullname, username, age, password) {
  const account = createAccount(fullname, username, age, password);
  const existingAcc = state.accounts.find((acc) => acc.name === fullname);
  if (existingAcc) {
    alert("account already existing");
    return false;
  }
  state.accounts.push(account);
  // console.log(state.accounts);
  updateBalance(state.accounts);
  updateStoredAccounts();
  return true;
};

export const loadStoredAccounts = function () {
  const storedAccs =
    JSON.parse(localStorage.getItem("accounts")) || state.accounts;
  state.accounts = storedAccs;
  updateBalance(state.accounts);
  // console.log(state.accounts);
};

const createAccount = function (fullname, username, age, password) {
  return {
    name: fullname,
    age: age,
    username: username,
    password: password,
    movements: [50],
  };
};

const updateStoredAccounts = function () {
  localStorage.setItem("accounts", JSON.stringify(state.accounts));
};

const updateBalance = function (accounts) {
  accounts.forEach(
    (acc) => (acc.balance = acc.movements.reduce((acc, cur) => acc + cur))
  );
};

// OPERATIONS

// -transfer
export const transferMoney = function (transferTo, amount) {
  const receiverAcc = state.accounts.find((acc) => acc.username === transferTo);

  if (!receiverAcc) {
    alert("Receiver Account is not found");
    return false;
  }
  if (amount < 10) {
    alert("Amount must be over $10");
    return false;
  }
  if (state.loggedAccount.balance < amount) {
    alert("Not enough money");
    return false;
  }

  // Update movements
  receiverAcc.movements.push(amount);
  state.loggedAccount.movements.push(-amount);

  // Find the index of  logged account and the receiver acc
  const loggedInAccIndex = state.accounts.findIndex(
    (acc) => acc.username === state.loggedAccount.username
  );
  const receiverAccIndex = state.accounts.findIndex(
    (acc) => acc.username === transferTo
  );

  // Update the accounts in the state
  state.accounts[loggedInAccIndex] = state.loggedAccount;
  state.accounts[receiverAccIndex] = receiverAcc;

  // Update stored accounts
  updateBalance(state.accounts);
  updateStoredAccounts();

  alert("Transfer successful");
  return true;
};

// -loan
export const loanMoney = function (loanAmount) {
  if (state.loggedAccount.activeLoan === true) {
    alert("You have loaned money already");
    return false;
  }
  if (loanAmount < 100) {
    alert("loan must be at least 100$");
    return false;
  }
  const highestMovement = Math.max(...state.loggedAccount.movements);
  const maxLoan = Math.trunc(highestMovement * 0.7);
  if (loanAmount > maxLoan) {
    alert("You are not eligible to get this loan");
    return false;
  }
  alert(`${loanAmount} loaned`);

  state.loggedAccount.movements.push(loanAmount);
  state.loggedAccount.activeLoan = true;
  //find logg acc indx
  const loggedInAccIndex = state.accounts.findIndex(
    (acc) => acc.username === state.loggedAccount.username
  );
  // Update the accounts in the state
  state.accounts[loggedInAccIndex] = state.loggedAccount;

  updateBalance(state.accounts);
  updateStoredAccounts();
};

// -delete account
export const deleteAccount = function (user, pin) {
  if (
    user === state.loggedAccount.username &&
    pin === state.loggedAccount.password
  ) {
    // Find the index of the logged-in account
    const loggedInAccIndex = state.accounts.findIndex(
      (acc) => acc.username === state.loggedAccount.username
    );

    // Remove the account from the state.accounts array
    state.accounts.splice(loggedInAccIndex, 1);

    // Clear the loggedAccount since it's been deleted
    state.loggedAccount = {};

    // Update the stored accounts in localStorage
    updateStoredAccounts();

    alert("Account deleted successfully");
    return true;
  } else {
    alert("Wrong username or password");
    return false;
  }
};
// sort movements
export const sort = function (value) {
  if (value === "unsort") {
    // Sort movements from biggest to smallest
    state.loggedAccount.movements.sort((a, b) => b - a);
  } else {
    // Sort movements from smallest to biggest
    state.loggedAccount.movements.sort((a, b) => a - b);
  }
};
