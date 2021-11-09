/* Variables - containers that store values
multi line comment */

var name; // a declared variable, but not initialized (no value) and it's in the global scope (BAD)

let foo; // a declared variable that can be changed

const bar = "Bar"; // a declared variable that cannot be changed - short for 'constant'
// '=' is the assignment operator, read it as "is assigned the value of..."

const ANSWER = 42; // const is declared and initialized with the value 42

// = is an assignment operater, not an "equal"

// strings

let string1 = "Hello World" // perferred way

let string2 = new String("Hello World!") //constructor, don't need to do it this way

// Number

let myNum = 235423;

let myNum2 = 435.89;

// you can check what type of number your myNum is by using typeof

"i" == 1; // this statement is true because it's loose equality checking. Changes the data types to match

"i" === 1; // pretty much ALWAYS USE THIS strict equality checking

let myBool = false;

// Array

let myArray = []; //this is an empty array

//              0     1      2        3     4
let myArray2 = [42, "Bob", myBool, ANSWER, true];

let secondElement = myArray2[1];


myArray2.push("Alli"); // added an element to the end of myArray2

myArray2.unshift("Hello World!");

let myLongString =
  "woiru4875875nswiufiuro248u5kdsjfowieurewlkjfoweurlehroihsfdadfasdf";

myLongString.length; //tells you how many characters long a string is

// object

let minObject = {};

let myCar = {
    make:'Honda',
    model: 'Civic',
    color: 'Maroon',
    year: '2015',
} 

myCar.numDoors = 4; 

// use dot notation to find items in an object ex. myCar.make will retirn "Honda"

// SQUARE BRACE [] MEANS ARRAY

// CURLY BRACE {} MEANS OBJECT

const anotherObject = {
  wordz: ["foo", "bar", "baz"],
  car: {
    make: "McLaren",
    model: "675LT"
  },
  awesome: true
};

// Functions

function myFunction() {
  return "My greeting to you...";
}

function sumTwoThings(one, two) {
  return one + two; // if numbers, it will add them. If strings, it will concatenate WATCH FOR DATA TYPE ISSUES
}

// () tend to be functions

// Arrow Functions

element => console.log(element) // implicit 'return' when only one line for the funtion
element => {
  let foo = 'bar' + 'bazz'
  console.log(element) // explicit return because of multiple lines
}
(num1, num2) => num1 + num2

// Arrow Functions

const theFunction = () => "I am awesome";

// a higher order function is a function that accepts another function as a parameter.
// filter, map and reduce are the most popular, but forEach, every, find, and some are also HOFs

// Filter method example.  Filter returns an array of all elements that 'pass the test'

const pilots = [
  {
    id: 2,
    name: "Wedge Antilles",
    faction: "Rebels"
  },
  {
    id: 8,
    name: "Ciena Ree",
    faction: "Empire"
  },
  {
    id: 40,
    name: "Iden Versio",
    faction: "Empire"
  },
  {
    id: 66,
    name: "Thane Kyrell",
    faction: "Rebels"
  }
];

const rebels = pilots.filter((pilot) => pilot.faction === "Rebels");
const empire = pilots.filter((pilot) => {
  return pilot.faction === "Empire";
});

// "map" array helper method, creates a new array
let filmURLs = [
  "https://swapi.co/api/films/",
  "https://swapi.co/api/films/5/",
  "https://swapi.co/api/films/4/this one is longer... even longer",
  "https://swapi.co/api/films/6/",
  "https: ",
  "https://swapi.co/api/films/1/"
];

const filmLengths = filmURLs.map((filmURL) => filmURL.length);
