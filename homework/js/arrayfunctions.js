



/*Define a function maxOfTwoNumbers that takes two numbers as arguments and
returns the largest of them. Use the if-then-else construct available in Javascript.
You'll have to remember your pre-work, or do some googling to figure this out.*/

const maxOfTwoNumbers = function (num1, num2) {
  let gNum = (num1>num2) ? num1 : num2 ;
  const msg = `The greater number of ${num1} and ${num2} is ${gNum}.`
  console.log(msg);
  return gNum;
};

maxOfTwoNumbers(5, 10);
maxOfTwoNumbers(90, 10);

/*Define a function maxOfThree that takes three numbers as arguments and
returns the largest of them.*/

const maxOfThree = function (num1, num2, num3) {
  let gNum = maxOfTwoNumbers( maxOfTwoNumbers(num1, num2), num3);

  console.log("From maxOfThree " + gNum);
};

maxOfThree(12, 9, 1);
maxOfThree(12, 9, 100);
maxOfThree(12, 90, 51);

/*Write a function that takes a character (i.e. a string of length 1)
and returns true if it is a vowel, false otherwise.*/

const isConsonant = function(str) {
  const ch = str.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/);
  //console.log("ch = " + ch);
  if (ch==="" || ch===null) {
    return false;
  }
  return true;
};


const isVowel = function(str) {
  if (str.length>1) {
    //sorry not allowed
    return;
  }

  console.log(`${str} is${isConsonant(str) ? " not" : ""} a vowel`);
}

isVowel("a");
isVowel("b");
isVowel("C");


/*Define a function sumArray and a function multiplyArray that sums and multiplies (respectively)
all the numbers in an array of numbers. For example, sumArray([1,2,3,4]) should return 10,
and multiplyArray([1,2,3,4]) should return 24.*/


const sumArray = function (array) {
  let sumOfNums = 0;
  if (array instanceof Array) {
    for (let i=0; i<array.length; i++) {
        sumOfNums += array[i];
    }
  }

  console.log(sumOfNums);
  return sumOfNums;
};

sumArray([1,2,3,4]);


const multiplyArray = function (array) {
  let product = 1;

  if (array instanceof Array) {
    for (let i=0; i<array.length; i++) {
        product = product * array[i];
    }
  }

  console.log(product);
  return product;
};

multiplyArray([1,2,3,4]);


/*Define a function reverseString that computes the reversal of a string.
For example, reverseString("jag testar") should return the string "ratset gaj".*/

const reverseString = function (str) {
  const newStr = str.split("").reverse().join("");//str.split().reverse();
  //console.log(str.split());
  //console.log(str.split().reverse());
  console.log(newStr);
};

reverseString("jag testar");


/*Write a function findLongestWord that takes an array of words and
returns the length of the longest one.*/

const findLongestWord = function (array) {
  let longestWord = "";

  if (array instanceof Array) {
    for (let i=0; i<array.length-1; i++) {

        let str1len = array[i].length;
        let str2len = 0;

        if ( i<array.length ) {
          str2len = array[i+1].length;
        }
        if ( str1len > str2len ) {
          longestWord = array[i];
        }
    }
  }

  console.log(longestWord);
  return longestWord;
}

findLongestWord(["dgfsdgfgsdfugdsgfjsdf","hkfhsdkhfkjsd","ashdasdfhalsdfhaslhdkashdlasjfhashfkjsdhf","a"]);


/*Write a function filterLongWords that takes an array of words and an number i
and returns the array of words that are longer than i.*/

const filterLongWords = function (array, num) {
  let newArray = [];

  if (array instanceof Array) {
    for (let i=0; i<array.length; i++) {

        if ( array[i].length > num ) {
          newArray.push(array[i]);
        }
    }
  }

  console.log(num, newArray);
  return newArray;

};


filterLongWords(["adghdnfksdf", "hds", "hfkdshfkshf", "hdksh"], 5);
filterLongWords(["adghdnfksdf", "hds", "hfkdshfkshf", "hdksh"], 2);
filterLongWords(["adghdnfksdf", "hds", "hfkdshfkshf", "hdksh", "fhsdhfksdhfhsdjfhsdkhf"], 6);
