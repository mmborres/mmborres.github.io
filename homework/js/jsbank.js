// Homework by Mabeth Borres of SEI 31

/*In this homework, you'll create a basic bank in Javascript. The bank has many accounts and the following capabilities that you need to write.

Bank
There is only one bank. This bank has an array of accounts. The bank needs a method that will return the total sum of money in the accounts. It also needs an addAccount method that will enroll a new account at the bank and add it to the array of accounts. There is no need to create additional functions of the bank to delete accounts, etc.

The bank has many accounts. Accounts should be objects that all share a set of common functionality.

Accounts
Accounts have a current balance and owner's name. You should be able to deposit or withdraw from an account to change the balance.

There is no need to write a user interface. Make sure functions return values -- you may also have your functions console.log() values to help you see your code working.

You should write a basic story through a series of JavaScript commands that shows that the methods do indeed work as expected: add some accounts, show the total balance, make some deposits and withdrawals, show the new total balance.

Tips
Don't overthink this. Shorter code is probably the answer.

Bonus
Ensure that the accounts cannot have negative values.
Write a 'transfer' on the bank that allows you to transfer amounts between two accounts.*/


////// SAMPLE A

//Account object I am comfortable with
function AccountObject(name, currentBalance){
	this.name = name;
	this.currentBalance = currentBalance;
	this.deposit = function(amount) {
		console.log(`${amount} deposited to account of ${this.name}`);
		this.currentBalance += amount;
		return true;
	};
	this.withdraw = function(amount) {
		console.log(`${amount} to be withdrawn from account of ${this.name}`);	
		const tempBal = this.currentBalance;
		if (tempBal-amount < 0) {
			console.log("Transaction denied, will result to negative balance. Apply for an Overdraft account first.")
			return false;
		} else {
			console.log("Transaction allowed.");
			this.currentBalance -= amount;
			return true; //success
		}
	}
};

//accounts to use
const account1 = new AccountObject ("Mabeth B", 300);
const account2 = new AccountObject ("Tony S", 1000);
const account3 = new AccountObject ("Daenerys T", 2000000000);
const account4 = new AccountObject ("Jon Snow", 10);
const account5 = new AccountObject ("Benedict C", 100);
const account6 = new AccountObject ("Apple C", 500);

//Bank object
function BankObject(name) {
	this.name = name;
	this.accounts = [];
	this.totalSum = function() {
		let totSum = 0;
		if (this.accounts.length>0) {
			for (let i=0; i<this.accounts.length; i++) {
				totSum += this.accounts[i].currentBalance;
			}
		} 
		return totSum;
	};
	this.addAccount = function(AccountObject) {
		console.log(`Account of ${AccountObject.name} added to bank with initial amount of ${AccountObject.currentBalance}.`);
		this.accounts.push(AccountObject);
		return true;
	};
	this.transfer = function(AccountObjectFrom, AccountObjectTo, amount) {
		console.log(`To transfer ${amount} from account of ${AccountObjectFrom.name} to ${AccountObjectTo.name}.`);
		if ( AccountObjectFrom.withdraw(amount) === true ) { //allowed
			AccountObjectTo.deposit(amount);
			return true;
		}
		return false;
	};
};

//setup bank
const JSBank = new BankObject("JSBank");
//setup accounts
console.log("Bank name = " + JSBank.name);
console.log("JSBank Current Money = " + JSBank.totalSum());
	
JSBank.addAccount(account1);
JSBank.addAccount(account2);
JSBank.addAccount(account3);
JSBank.addAccount(account6);
JSBank.addAccount(account5);
JSBank.addAccount(account4);

const printBalance = function(acct) {
	console.log("Name: " + acct.name);
	console.log("Bal: " + acct.currentBalance);
};

const callStoryA = function() {
	
	console.log("JSBank Current Money = " + JSBank.totalSum());
	
	printBalance(account1);
	account1.deposit(400);
	printBalance(account1);
	
	printBalance(account3);
	account3.withdraw(1890);
	printBalance(account3);
	
	printBalance(account4);
	account4.withdraw(15);
	printBalance(account4); //jon
	
	//transfer fail
	JSBank.transfer(account4, account2, 50);
	
	//transfer success
	JSBank.transfer(account3, account1, 5000);	
	
	for (let i=0; i<JSBank.accounts.length; i++) {
		printBalance(JSBank.accounts[i]);
	}
	
	console.log("JSBank Current Money = " + JSBank.totalSum());
};

callStoryA();


console.log("=============== A Different Version =====================");


///// SAMPLE B
const account1b = {
	name: "Mabeth Borres",
	currentBalance: 300,
	deposit: function(amount) {
		console.log(`${amount} deposited to account of ${this.name}`);
		this.currentBalance += amount;
		return true;
	},
	withdraw: function(amount) {
		console.log(`${amount} to be withdrawn from account of ${this.name}`);	
		const tempBal = this.currentBalance;
		if (tempBal-amount < 0) {
			console.log("Transaction denied, will result to negative balance. Apply for an Overdraft account first.")
			return false;
		} else {
			console.log("Transaction allowed.");
			this.currentBalance -= amount;
			return true; //success
		}
	}
};

const account2b = {
	name: "Daenerys T",
	currentBalance: 2000000000,
	deposit: function(amount) {
		console.log(`${amount} deposited to account of ${this.name}`);
		this.currentBalance += amount;
		return true;
	},
	withdraw: function(amount) {
		console.log(`${amount} to be withdrawn from account of ${this.name}`);	
		const tempBal = this.currentBalance;
		if (tempBal-amount < 0) {
			console.log("Transaction denied, will result to negative balance. Apply for an Overdraft account first.")
			return false;
		} else {
			console.log("Transaction allowed.");
			this.currentBalance -= amount;
			return true; //success
		}
	}
};

const account3b = {
	name: "Tony S",
	currentBalance: 1000,
	deposit: function(amount) {
		console.log(`${amount} deposited to account of ${this.name}`);
		this.currentBalance += amount;
		return true;
	},
	withdraw: function(amount) {
		console.log(`${amount} to be withdrawn from account of ${this.name}`);	
		const tempBal = this.currentBalance;
		if (tempBal-amount < 0) {
			console.log("Transaction denied, will result to negative balance. Apply for an Overdraft account first.")
			return false;
		} else {
			console.log("Transaction allowed.");
			this.currentBalance -= amount;
			return true; //success
		}
	}
};

const account4b = {
	name: "Jon Snow",
	currentBalance: 10,
	deposit: function(amount) {
		console.log(`${amount} deposited to account of ${this.name}`);
		this.currentBalance += amount;
		return true;
	},
	withdraw: function(amount) {
		console.log(`${amount} to be withdrawn from account of ${this.name}`);	
		const tempBal = this.currentBalance;
		if (tempBal-amount < 0) {
			console.log("Transaction denied, will result to negative balance. Apply for an Overdraft account first.")
			return false;
		} else {
			console.log("Transaction allowed.");
			this.currentBalance -= amount;
			return true; //success
		}
	}
};

const Bank = {
	name: "Javascript",
	accounts: [],
	totalSum: function() {
		let totSum = 0;
		if (this.accounts.length>0) {
			for (let i=0; i<this.accounts.length; i++) {
				totSum += this.accounts[i].currentBalance;
			}
		} 
		return totSum;
	},
	addAccount: function(account) {
		console.log(`Account of ${account.name} added to bank with initial amount of ${account.currentBalance}.`);
		this.accounts.push(account);
		return true;
	},
	transfer: function(acctFrom, acctTo, amount) {
		console.log(`To transfer ${amount} from account of ${acctFrom.name} to ${acctTo.name}.`);
		if ( acctFrom.withdraw(amount) === true ) { //allowed
			acctTo.deposit(amount);
			return true;
		}
		return false;
	}
};

//setup bank
console.log("Bank name = " + Bank.name);
console.log("Current Money = " + Bank.totalSum());

//add accounts
Bank.addAccount(account1b);
Bank.addAccount(account2b);
Bank.addAccount(account3b);
Bank.addAccount(account4b); //jon

const callStoryB = function() {
	printBalance(account1b);
	account1b.deposit(400);
	printBalance(account1b);
	
	printBalance(account2b);
	account2b.withdraw(1890);
	printBalance(account2b);
	
	printBalance(account4b);
	account4b.withdraw(15);
	printBalance(account4b); //jon
	
	console.log("Bank Money = " + Bank.totalSum());
	
	//transfer fail
	Bank.transfer(account4b, account3b, 50);
	
	//transfer success
	Bank.transfer(account2b, account1b, 5000);	
	
	for (let i=0; i<Bank.accounts.length; i++) {
		printBalance(Bank.accounts[i]);
	}
	
	console.log("Current Money = " + Bank.totalSum());
	
};

callStoryB();







