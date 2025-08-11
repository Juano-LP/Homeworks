// Regular function
function checkOddEven(number) {
  if (number % 2 === 0) {
    console.log(`${number} is even`);
  } else {
    console.log(`${number} is odd`);
  }
}

// Arrow function
const checkOddEvenArrow = (number) => {
  if (number % 2 === 0) {
    console.log(`${number} is even`);
  } else {
    console.log(`${number} is odd`);
  }
};

// Example usage:
checkOddEven(9);       
checkOddEvenArrow(10);  
