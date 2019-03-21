// Homework by Mabeth Borres of SEI 31

/*Given the following a rectangle object like the one below, write the following functions:

isSquare - Returns whether the rectangle is a square or not
area - Returns the area of the rectangle
perimeter - Returns the perimeter of the rectangle*/

const rectangleAA = {
  length: 4,
  width: 4,
  area: function() {
    return this.length * this.width; 
  },
  isSquare: function() {
  	return this.length===this.width;
  }, 
  perimeter: function() {
  	return 2*(this.length*this.width);
  }
};

const rectangleA = {
  length: 5,
  width: 5
};

console.log(rectangleAA.area());
console.log(rectangleAA.isSquare());
console.log(rectangleAA.perimeter());

const isSquare = function(rectangleA) {
	return rectangleA.length===rectangleA.width;
};

const area = function(rectangleA) {
	return rectangleA.length * rectangleA.width; 
};

const perimeter = function(rectangleA) {
	return 2*(rectangleA.length*rectangleA.width); 
};

console.log("isSquare? " + isSquare(rectangleA));
console.log("Area = " + area(rectangleA));
console.log("Perimeter = " + perimeter(rectangleA));


/*Given the following a triangle object like the one below, write the following functions:

isEquilateral - Returns whether the triangle is equilateral or not
isIsosceles - Returns whether the triangle is isosceles or not
area - Returns the area of the Triangle
isObtuse - Returns whether the triangle is obtuse or not*/

const triangleA = {
  sideA: 3,
  sideB: 4,
  sideC: 4
};

const isEquilateral = function(triangleA) {
	if (triangleA.sideA == triangleA.sideB && triangleA.sideB == triangleA.sideC) {
    	return true;
	}
	return false;
};

console.log("isEquilateral? " + isEquilateral(triangleA));

const isIsosceles = function(triangleA) {
	if (triangleA.sideA === triangleA.sideB || triangleA.sideB === triangleA.sideC 
		|| triangleA.sideA === triangleA.sideC) {
		return true;
	}
	return false;
};

console.log("isIsosceles? " + isIsosceles(triangleA));



////////////TODO isObtuse

const maxOfTwoNumbers = function (num1, num2) {
  let gNum = (num1>num2) ? num1 : num2 ;
  const msg = `The greater number of ${num1} and ${num2} is ${gNum}.`
  console.log(msg);
  return gNum; //function
};

const checkEqualNums = function (num1, num2) {
	//console.log("equality");
	if(parseInt(num1)===parseInt(num2)) {
		//console.log("equal found")
		return true;
	}
	return false;
};

const maxOfThree = function (num1, num2, num3) {
  let gNum = maxOfTwoNumbers( maxOfTwoNumbers(num1, num2), num3);

  const msg = `The greater number of ${num1}, ${num2} and ${num3} is ${gNum}.`
  //console.log(msg);
  return gNum;
};


const isObtuse = function(trian) {
	let isEqual = checkEqualNums( trian.sideA, trian.sideB );
	if (isEqual===false) {
		isEqual = checkEqualNums( trian.sideB, trian.sideC );
	}
	if (isEqual===false) {
		isEqual = checkEqualNums( trian.sideA, trian.sideC );
	}
	if (isEqual===true) {
		return false;
	}
	
	// find biggest side
	let maxSide = maxOfThree(trian.sideA, trian.sideB, trian.sideC);
	let array3 = [trian.sideA, trian.sideB, trian.sideC];
	//let indMax = 0;
	let sideTwo = 0;
	let sideMax = 0;
	// a*2 + b*2 < c*2

	for (let i=0; i<3; i++) {
		if (maxSide === array3[i]) {
			//indMax = i;
			sideMax = maxSide**2;
		} else {
			sideTwo += (array3[i]**2);
		}
	}

	if (sideTwo < sideMax) {
		return true;
	}
	return false;
};

console.log("isObtuse? " + isObtuse(triangleA));

/*if (this.a == this.b && this.b == this.c) {
    return "equilateral";
  } else if (this.a === this.b || this.b === this.c || this.a === this.c) {
    return "isosceles";
  } else {
    return "scalene";
  }
*/

const areaTriangle = function(trian) {
	const s = (trian.sideA + trian.sideB + trian.sideC) / 2;
	//console.log ("s=" + s)
	// formula taken from
	// https://www.mathsisfun.com/geometry/herons-formula.html
	const bf = s*(s-trian.sideA)*(s-trian.sideB)*(s-trian.sideC) ;
	//console.log("bf=" + bf);
	const area = Math.sqrt( bf );
	
	return area;
};

console.log("areaTriangle = " + areaTriangle(triangleA).toFixed(2));



/*Write a function called cashRegister that takes a shopping cart object. 
The object contains item names and prices (itemName: itemPrice). 
The function should return the total price of the shopping cart. 
Example*/

// Input
const cartForParty = {  
  banana: "1.25",
  handkerchief: ".99",
  Tshirt: "25.01",
  apple: "0.60",
  nalgene: "10.34",
  proteinShake: "22.36"
};

const cashRegister = function(cartForParty) {
	const cRegKeys = Object.keys(cartForParty);
	let total = 0;
	//console.log(cRegKeys);

	for (key of cRegKeys) {
		//console.log(key);
		//console.log(cartForParty[key]);

		total += parseFloat(cartForParty[key]);
	}

	return total;
};


// Output
console.log("Total in Cash Register = " + cashRegister(cartForParty)); // 60.55


////////////

/*You're starting your own credit card business. 
You've come up with a new way to validate credit cards 
with a simple function called validateCreditCard that 
returns true or false.

Here are the rules for a valid number:

Number must be 16 digits, all of them must be numbers
You must have at least two different digits represented 
(all of the digits cannot be the same)
The final digit must be even
The sum of all the digits must be greater than 16

The following credit card numbers are valid:

9999-9999-8888-0000
6666-6666-6666-1666

The following credit card numbers are invalid:

a923-3211-9c01-1112 invalid characters
4444-4444-4444-4444 only one type of number
1111-1111-1111-1110 sum less than 16
6666-6666-6666-6661 odd final number



validateCreditCard('9999-9999-8888-0000'); // Returns: true

Hint: Remove the dashed from the input string before checking 
if the input credit card number is valid.

Bonus: Return an object indicating whether the credit card is valid, 
and if not, what the error is

{ valid: true, number: 'a923-3211-9c01-1112' } 
{ valid: false, number: 'a923-3211-9c01-1112', error: ‘wrong_length’ }
Double Bonus: Make your credit card scheme even more advanced! 
\What are the rules, and what are some numbers that pass or fail? 
Ideas: check expiration date! Check out the Luhn Algorithm for inspiration.*/


const hasRepeated = function (str){
  const result = [];
  const strArr = str.toLowerCase().split("").sort().join("").match(/(.)\1+/g);
  
  if (strArr != null) {
    strArr.forEach((elem) => {
      result.push(elem[0]);
    });
  }
  if(result.length === 1) {
  	return true;
  } 
  return false;
};

//console.log("rep" + howManyRepeated("4444-4444-8888-4444"));

const reverseString = function (str) {
  const newStr = str.split("").reverse().join("");
  //console.log(str.split());
  //console.log(str.split().reverse());
  //console.log(newStr);
  
  return newStr;
};

const processLuhn = function (str) {
	//Drop the last digit
	const lastDigit = parseInt(str.charAt(str.length-1));
	//console.log("last=" + lastDigit);
	let nStr = str.substring(0, str.length-1);
	//console.log("luhn = " + nStr);
	
	//Reverse the digits
	let revs = reverseString(nStr);
	
	//Multiply odd digits by 2
	let strArr = revs.split('');
	const len = strArr.length;
	for (let i=0; i<len; i=i+2) {
		let num = parseInt(strArr[i]);
		strArr[i] = num*2;
	}
	//console.log("mult2=" + strArr);
	
	//Subtract 9 to numbers over 9:
	for (let i=0; i<len; i++) {
		let num = parseInt(strArr[i]);
		if (num>9) { //more than 9
			strArr[i] = num-9;
		}
	}
	//console.log("9y=" + strArr);
	
	let sum = 0;
	//Add all numbers:
	for (let i=0; i<len; i++) {
		let num = parseInt(strArr[i]);
		sum += num;
	}
	//console.log("add=" + sum);
	
	//mod 10
	if (sum%10===lastDigit) {
		return true;
	} 
	return false;
};

const validateCreditCard = function(num) {
	let retValidate = true;
	const newNumStr = num.split("-").join("");
	const newNum = parseInt(newNumStr);
	//console.log(newNum);
	//console.log(newNumStr.length);

	// length is 16
	if ( newNumStr.length !== 16 ) {
		retValidate = false;
	}

	if (hasRepeated(newNumStr)===true) {
		retValidate = false;
	}

	// valid numbers - last check
	//console.log("integer = " + Number.isInteger(newNum));

	if (Number.isInteger(newNum)===false) {
		retValidate = false;
	}
	
	// sum of all numbers
	let summ = 0;
	for (let i=0; i<newNumStr.length; i++) {
		summ += parseInt(newNumStr.charAt(i));
	}
	if (summ < 16) {
		retValidate = false;
	}

	// final number must be even
	const last = newNumStr.charAt(newNumStr.length-1);
	if ( parseInt(last) % 2 !== 0  ) {
		retValidate = false;
	}

	//try the Luhn if false
	if (retValidate===false) {
		retValidate = processLuhn(newNumStr);
	}
	
	
	return retValidate;
};

console.log("9999-9999-8888-0000 | " + validateCreditCard('9999-9999-8888-0000'));

console.log("a923-3211-9c01-1112 | " + validateCreditCard('a923-3211-9c01-1112'));

console.log("4444-4444-4444-4444 | " + validateCreditCard('4444-4444-4444-4444')); 

console.log("1111-1111-1111-1110 | " + validateCreditCard('1111-1111-1111-1110'));

console.log("6666-6666-6666-6661 | " + validateCreditCard('6666-6666-6666-6661'));

console.log("4556737586899855 | " + validateCreditCard('4556737586899855'));

//console.log(processLuhn("4556737586899855"));

function CreditCard(valid, number, errorMsg){
	this.valid = valid;
	this.number = number;
	this.errorMsg = errorMsg;
};

	
const validateCreditCardObj = function(num) {
	let retValidate = true;
	let errorMsg = "";
	const newNumStr = num.split("-").join("");
	const newNum = parseInt(newNumStr);
	//console.log(newNum);
	//console.log(newNumStr.length);

	// length is 16
	if ( newNumStr.length !== 16 ) {
		retValidate = false;
		errorMsg = "less than 16 in length"
	}

	if (hasRepeated(newNumStr)===true) {
		retValidate = false;
		errorMsg = "only one type of number";
	}

	// valid numbers - last check
	//console.log("integer = " + Number.isInteger(newNum));

	if (Number.isInteger(newNum)===false) {
		retValidate = false;
		errorMsg = "invalid characters";
	}
	
	// sum of all numbers
	let summ = 0;
	for (let i=0; i<newNumStr.length; i++) {
		summ += parseInt(newNumStr.charAt(i));
	}
	if (summ < 16) {
		retValidate = false;
		errorMsg = "sum less than 16"
	}

	// final number must be even
	const last = newNumStr.charAt(newNumStr.length-1);
	if ( parseInt(last) % 2 !== 0  ) {
		retValidate = false;
		errorMsg = "odd final number";
	}

	//try the Luhn if false
	if (retValidate===false) {
		retValidate = processLuhn(newNumStr);
		
		if (retValidate===false) {
			errorMsg = "failed Luhn Algorithm test"
		} else {
			errorMsg = "passed Luhn Algorithm test"
		}
	}
	
	const cardObj = new CreditCard(retValidate, newNumStr, errorMsg);
	console.log(cardObj);
	return cardObj;
};

validateCreditCardObj('9999-9999-8888-0000');

validateCreditCardObj('a923-3211-9c01-1112');

validateCreditCardObj('4444-4444-4444-4444'); 

validateCreditCardObj('1111-1111-1111-1110');

validateCreditCardObj('6666-6666-6666-6661');

validateCreditCardObj('4556737586899855');






