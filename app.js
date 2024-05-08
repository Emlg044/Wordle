// Get the rows with cells
const rowOne = document.querySelectorAll(".r1");
const rowTwo = document.querySelectorAll(".r2");
const rowThree = document.querySelectorAll(".r3");
const rowFour = document.querySelectorAll(".r4");
const rowFive = document.querySelectorAll(".r5");
const rowSix = document.querySelectorAll(".r6");

// Get the character buttons
const charButtons = document.querySelectorAll(".char");
// Create an array of the charButtons
const charButtonsArray = Array.from(charButtons);

const enterButton = document.querySelector(".enter-btn");
const returnButton = document.querySelector(".return-btn");

// Initialize counter of the tries - represents rows
let tryCount = 0;
// Initialize counter of the current guesses - represent the chars in the words
let indexCount = 0;
// Initialize array to hold the guessed chars
let guessedChars = [];

const word = "COOLT";

// Modal stuff
let modal = document.getElementById("modal");
let modalSpan = document.getElementsByClassName("close")[0];
modalBtn = document.getElementById("modalBtn");

const displayModal = () => {
  modal.style.display = "block";
};

// Close the modal
modalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  // Add restart to the game
});

const getCurrentRow = (tryCount) => {
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

const addCharacter = (char, btn) => {
  // Check if the current row character index is the last
  if (indexCount > 4) return;

  // Set the current row
  const currentRow = getCurrentRow(tryCount);

  // Update the cell with the pressed char
  currentRow[indexCount].innerHTML = char;

  // Increment the counter representing the current character in the word
  indexCount++;
};

// Add - check that all fields are filled before entering
const validateRow = (row) => {
  // Compare the characters in the row with the chosen word and change background color accordingly
  row.forEach((cell, i) => {
    const char = cell.innerHTML;
    let hasChar = false;

    // Check if word contains char at all
    if (word.includes(char)) {
      hasChar = true;
      // Change the color of the charButtons
      charBtn = getCharBtn(char);
      if (char == word[i]) {
        charBtn.classList.add("green-bg");
      } else {
        charBtn.classList.add("yellow-bg");
      }
    } else {
      charButtons.forEach((btn) => {
        if (btn.innerHTML === char) btn.classList.add("disabled");
      });
    }

    setTimeout(() => {
      // Check if the letter is in the same place as in the word
      if (char == word[i]) {
        cell.classList.add("green-bg");
      } else if (hasChar) {
        cell.classList.add("yellow-bg");
      } else {
        cell.classList.add("red-bg");
      }
    }, i * 200);
  });

  // Increment tryCount and reset indexCount
  tryCount++;
  indexCount = 0;
};

const resetGame = () => {
  // Reset the cells
  rowOne.forEach((cell) => {
    cell.innerHTML = "_";
  });
  rowTwo.forEach((cell) => {
    cell.innerHTML = "_";
  });
  rowThree.forEach((cell) => {
    cell.innerHTML = "_";
  });
  rowFour.forEach((cell) => {
    cell.innerHTML = "_";
  });
  rowFive.forEach((cell) => {
    cell.innerHTML = "_";
  });
  rowSix.forEach((cell) => {
    cell.innerHTML = "_";
  });
  // Reset the tryCount and indexCount to zero
  tryCount = 0;
  indexCount = 0;
};

const getCharBtn = (char) => {
  // Create array to find the element and return it
  return charButtonsArray.find((charBtn) => charBtn.innerHTML === char);
};

// Listen for enter click
enterButton.addEventListener("click", (event) => {
  // Check if the the entire row is filled with characters
  if (indexCount < 5) return;

  // Add logic for checking wich characters are guessed correct
  const currentRow = getCurrentRow(tryCount);
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
  const currentRow = getCurrentRow(tryCount);
  currentRow[indexCount].innerHTML = "_";
});

// Listen for click on the character buttons
charButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    addCharacter(btn.innerHTML, btn);
  });
});

// Listen for any key press
window.addEventListener("keydown", (e) => {
  // Check if the key pressed is alphabetical
  let char = e.key.toUpperCase();
  // Get the charBtn element
  let charBtn = getCharBtn(char);

  // Check which key is pressed
  if (e.code === `Key${e.key.toUpperCase()}`) {
    addCharacter(char, charBtn);
  } else if (e.key === "Enter") {
    // Check if the field is filled before being able to submit try
    if (indexCount > 4) {
      const currentRow = getCurrentRow(tryCount);
      validateRow(currentRow);
    }
  } else if (e.key === "Escape") {
    // Reset the playing field
    resetGame();
  }
});
