const account = {
	savings: 100, //starting money
  checking: 100, //starting money

  deposit: function(amount, savingsOrChecking) {
		this[savingsOrChecking] += amount;
    this.displayAccounts();
  	return true;
	},

  displayAccounts: function() {
    if (this["savings"] === 0) {
      $('#savings-balance').addClass("zero");
    } else {
      $('#savings-balance').removeClass("zero");
    }
    if (this["checking"] === 0) {
      $('#checking-balance').addClass("zero");
    } else {
      $('#checking-balance').removeClass("zero");
    }
    $('#checking-balance').html("$" + account.checking);
    $('#savings-balance').html("$" + account.savings);
  },

  withdraw: function(amount, savingsOrChecking) {
		const tempBal = this[savingsOrChecking];
    const total = this.savings + this.checking;
		if (total-amount < 0) { //two accts together, still not enough money
			return false; //ignore
		} else {
      if (tempBal-amount<0) { // one account can't handle it, apply overdraft
        // handle overdraft protection
        if (savingsOrChecking==="checking") {
          //current transaction first
          const bal = this[savingsOrChecking];
          const remainder = amount - bal;
          this[savingsOrChecking] -= bal; // account is now zero
          this["savings"] -= remainder;
        } else {
          const bal = this[savingsOrChecking];
          const remainder = amount - bal;
          this[savingsOrChecking] -= bal; // account is now zero
          this["checking"] -= remainder;
        }
      } else {
        //one account can handle it, proceed transaction
        this[savingsOrChecking] -= amount;
      }
      this.displayAccounts();
			return true; //success
		}
	}
};

const checkingDeposit = function() {
  const amount = $('#checking-amount').val();
  account.deposit(Number(amount), "checking");
};

const savingsDeposit = function() {
  const amount = $('#savings-amount').val();
  account.deposit(Number(amount), "savings");
};

const savingsWithdraw = function() {
  const amount = $('#savings-amount').val();
  account.withdraw(Number(amount), "savings");
};

const checkingWithdraw = function() {
  const amount = $('#checking-amount').val();
  account.withdraw(Number(amount), "checking");
};

const startBank = function() {
  //display balances
  account.displayAccounts();

  //transactions
  $('#checking-deposit').on('click', checkingDeposit);
  $('#savings-deposit').on('click', savingsDeposit);
  $('#checking-withdraw').on('click', checkingWithdraw);
  $('#savings-withdraw').on('click', savingsWithdraw);
};

$(document).ready( startBank );
