const account = {
	savings: 100, //starting money
	checking: 100, //starting money

	deposit: function(amount, savingsOrChecking) {
		$('#result').html("");
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
		$('#result').html("");
		const tempBal = this[savingsOrChecking];
		const total = this.savings + this.checking;
		if (total-amount < 0) { //two accts together, still not enough money
			$('#result').html("Transaction not allowed. Insufficient funds.");
			return false; 
		} else {
			if (tempBal-amount<0) { // one account can't handle it, apply overdraft
				const bal = this[savingsOrChecking];
				const remainder = amount - bal;
				this[savingsOrChecking] -= bal; // account is now zero
				if (savingsOrChecking==="checking") {
					this["savings"] -= remainder;
				} else {
					this["checking"] -= remainder;
				}
				$('#result').html("Overdraft Protection applied.");
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
	if ( isNaN(amount)===false ) { account.deposit(Number(amount), "checking"); }
};

const savingsDeposit = function() {
	const amount = $('#savings-amount').val();
	if ( isNaN(amount)===false ) { account.deposit(Number(amount), "savings"); }
};

const savingsWithdraw = function() {
	const amount = $('#savings-amount').val();
	if ( isNaN(amount)===false ) { account.withdraw(Number(amount), "savings"); }
};

const checkingWithdraw = function() {
	const amount = $('#checking-amount').val();
	if ( isNaN(amount)===false ) { account.withdraw(Number(amount), "checking"); }
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
