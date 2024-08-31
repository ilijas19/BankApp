class OperationView {
  // TRANSFER
  _transferBtn = document.querySelector(".form__btn--transfer");
  _transferTo = document.querySelector(".form__input--to");
  _transferAmount = document.querySelector(".form__input-transfer-amount");
  // LOAN
  _loanBtn = document.querySelector(".form__btn--loan");
  _loanAmount = document.querySelector(".form__input-loan-amount");
  // DELETE ACCOUNT
  _deleteBtn = document.querySelector(".form__btn--delete");
  _confirmUser = document.querySelector(".form__input--user");
  _confirmPin = document.querySelector(".form__input--pin");
  // SORT
  _sortBtn = document.querySelector(".btn--sort");

  addTransferFunctionality(callBackFunction) {
    this._transferBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const transferTo = this._transferTo.value;
      const amount = Number(this._transferAmount.value);
      callBackFunction(transferTo, amount);
    });
  }

  addLoanFunctionality(callBackFunction) {
    this._loanBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const loanAmount = Number(this._loanAmount.value);
      callBackFunction(loanAmount);
    });
  }

  addDeletefunctionality(callBackFunction) {
    this._deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const confirmUser = this._confirmUser.value;
      const confirmPin = this._confirmPin.value;
      callBackFunction(confirmUser, confirmPin);
    });
  }

  addSortFunctionality(callBackFunction) {
    this._sortBtn.addEventListener("click", () => {
      this._sortBtn.classList.toggle("sorted");
      if (this._sortBtn.classList.contains("sorted")) {
        callBackFunction("unsort");
      } else {
        callBackFunction("sort");
      }
    });
  }
}
export default new OperationView();
