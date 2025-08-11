let myArray1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// Array.prototype.length
let myArrayLength = myArray1.length;
console.log(myArrayLength); // Output: 15

// Array.prototype.push()
let myArrayPush = myArray1.push(11);
console.log(myArrayPush); // Output: 11 (new length of the array)   
// Array.prototype.pop()
let myArrayPop = myArray1.pop();
console.log(myArrayPop); // Output: 11 (the last element removed from the array

// Array.prototype.shift()
let myArrayShift = myArray1.shift();
console.log(myArrayShift); // Output: 1 (the first element removed from the array)


// Array.prototype.unshift()

let myArrayUnshift = myArray1.unshift(0);
console.log(myArrayUnshift); // Output: 15 (new length of the array)

// Array.prototype.concat()
let myArrayConcat = myArray1.concat([12, 13]);
console.log(myArrayConcat); // Output: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13]

// Array.prototype.join()
let myArrayjoined = myArray1.join('-');
console.log(myArrayjoined); // Output: "0-2-3-4-5-6-7-8-9-10"

// Array.prototype.slice()
let myArraysliced = myArray1.slice(2, 5);
console.log(myArraysliced); // Output: [3, 4, 5]

// Array.prototype.splice()
let myArraySpliced = myArray1.splice(2, 2, 99, 100);
console.log(myArraySpliced); // Output: [3, 4] 

// Array.prototype.forEach()
let myArrayForEach = myArray1.forEach((item) => console.log(item));

// Array.prototype.map()
let myArrayMapped = myArray1.map(x => x * 2);
console.log(myArrayMapped); // Output: [0, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Array.prototype.filter()
let MyArrayFiltered = myArray1.filter(x => x % 2 === 0);
console.log(MyArrayFiltered); // Output: [0, 2, 4, 6, 8, 10]

// Array.prototype.reduce()
let MyArrayReduced = myArray1.reduce((acc, val) => acc + val, 0);
console.log(MyArrayReduced); // Output: 105

// Array.prototype.reduceRight()
let MyArrayReducedRight = myArray1.reduceRight((acc, val) => acc - val, 0);
console.log(MyArrayReducedRight); // Output: -105


// Array.prototype.find()
let myArrayFound = myArray1.find(x => x > 5);
console.log(myArrayFound); // Output: 6 (the first element greater than 5)

// Array.prototype.findIndex()
let myArrayFoundIndex = myArray1.findIndex(x => x > 5);
console.log(myArrayFoundIndex); // Output: 5 (the index of the first element greater than 5)


// Array.prototype.indexOf()
let myArrayIndex = myArray1.indexOf(99);
console.log(myArrayIndex); // Output: 2 (the index of the first occurrence of 99)

// Array.prototype.lastIndexOf()
let myArraylastIndex = myArray1.lastIndexOf(99);
console.log(myArraylastIndex); // Output: 2 (the index of the last occurrence of 99)
// Array.prototype.includes()
let myArrayHasValue = myArray1.includes(100);
console.log(myArrayHasValue); // Output: true (checks if 100 is in the array)

// Array.prototype.every()
let myArrayAllPositive = myArray1.every(x => x > 0);
console.log(myArrayAllPositive); // Output: true (checks if all elements are positive)
// Array.prototype.some()
let myArraySomeGreaterThanTen = myArray1.some(x => x > 10);
console.log(myArraySomeGreaterThanTen); // Output: true (checks if some elements are greater than 10)
// Array.prototype.reverse()
let myArrayReversed = [...myArray1].reverse();
console.log(myArrayReversed); // Output: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 0]
// Array.prototype.sort()
let myArraySorted = [...myArray1].sort((a, b) => a - b);
console.log(myArraySorted); // Output: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

// Array.prototype.fill()
let myArrayFilled = new Array(5).fill(7);
console.log(myArrayFilled); // Output: [7, 7, 7, 7, 7]

// Array.prototype.copyWithin()
let myArraycopyWithinArray = [1, 2, 3, 4, 5];
myArraycopyWithinArray.copyWithin(0, 3, 5);

// Array.prototype.entries()
for (let [index, value] of myArray1.entries()) {
    console.log(index); // prints the index
}

// Array.prototype.keys()
for (let key of myArray1.keys()) {
    console.log(key); // prints the key (index)
}

// Array.prototype.values()
for (let value of myArray1.values()) {
    console.log(value); // prints the value
}

// Array.prototype.flat()
let nested = [1, [2, [3, 4]]];
let flat = nested.flat(2);
console.log(flat); // Output: [1, 2, 3, 4]
// Array.prototype.flatMap()
let flatMapped = myArray1.flatMap(x => [x, x * 2]);

let myArray2 = myArray1.concat([11, 12, 13, 14, 15]);
console.log(flatMapped); // Output: [0, 0, 2, 2, 3, 6, 4, 8, 5, 10, 6, 12, 7, 14, 8, 16, 9, 18, 10, 20]
