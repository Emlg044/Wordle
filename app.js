// Get the rows with cells
const rowOne = document.querySelectorAll(".r1");
const rowTwo = document.querySelectorAll(".r2");
const rowThree = document.querySelectorAll(".r3");
const rowFour = document.querySelectorAll(".r4");
const rowFive = document.querySelectorAll(".r5");
const rowSix = document.querySelectorAll(".r6");

// Get the character buttons
const charButtons = document.querySelectorAll(".char");

// Initialize counter of the tries
let tryCount = 0;
let indexCount = 0;
let guessedChars = [];

const word = "COOLT";

const addCharacter = (char) => {
  console.log(char);
};

// Listen for click on the character buttons
charButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    addCharacter(btn.innerHTML);
  });
});
