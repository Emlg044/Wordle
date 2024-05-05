// Get the rows with cells
const rowOne = document.querySelectorAll(".r1");
const rowTwo = document.querySelectorAll(".r2");
const rowThree = document.querySelectorAll(".r3");
const rowFour = document.querySelectorAll(".r4");
const rowFive = document.querySelectorAll(".r5");
const rowSix = document.querySelectorAll(".r6");

// Get the character buttons
const charButtons = document.querySelectorAll(".char");
const enterButton = document.querySelector(".enter-btn");
const returnButton = document.querySelector(".return-btn");

// Initialize counter of the tries - represents rows
let tryCount = 0;
// Initialize counter of the current guesses - represent the chars in the words
let indexCount = 0;
// Initialize array to hold the guessed chars
let guessedChars = [];

const word = "COOLT";

const setCurrentRow = (tryCount) => {
  let currentRow;
  switch (tryCount) {
    case 0:
      currentRow = rowOne;
      break;
    case 1:
      currentRow = rowTwo;
      break;
    case 2:
      currentRow = rowThree;
      break;
    case 3:
      currentRow = rowFour;
      break;
    case 4:
      currentRow = rowFive;
      break;
    case 5:
      currentRow = rowSix;
      break;
  }
  return currentRow;
};

const addCharacter = (char) => {
  // Check if the current row character index is the last
  if (indexCount > 4) return;

  // Set the current row
  const currentRow = setCurrentRow(tryCount);

  // Update the cell with the pressed char
  currentRow[indexCount].innerHTML = char;

  // Increment the counter representing the current character in the word
  indexCount++;
};

const validateRow = (row) => {
  // Compare the characters in the row with the chosen word and change background color accordingly
  row.forEach((cell, i) => {
    const char = cell.innerHTML;
    setTimeout(() => {
      // Check if the letter is in the same place as in the word
      if (char == word[i]) {
        cell.classList.add("green-bg");
        return;
      } else if (word.includes(char)) {
        cell.classList.add("yellow-bg");
      } else {
        cell.classList.add("red-bg");
      }
    }, i * 200);
  });
};

// Listen for enter click
enterButton.addEventListener("click", (event) => {
  // Check if the the entire row is filled with characters
  if (indexCount < 5) return;

  // Add logic for checking wich characters are guessed correct
  const currentRow = setCurrentRow(tryCount);
  validateRow(currentRow);

  // Increment the tryCount
  tryCount++;
  // Reset the indexCount
  indexCount = 0;
});

// Listen for return click
returnButton.addEventListener("click", (event) => {
  // Check if the current character index is the first
  if (indexCount == 0) return;

  // Decrement the indexCount
  indexCount--;

  // Replace the current cell with an _
  const currentRow = setCurrentRow(tryCount);
  currentRow[indexCount].innerHTML = "_";
});

// Listen for click on the character buttons
charButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    addCharacter(btn.innerHTML);
  });
});
