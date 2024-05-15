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

// Get the return and enter buttons
const enterButton = document.querySelector(".enter-btn");
const returnButton = document.querySelector(".return-btn");

// Initialize counter of the tries - represents rows
let tryCount = 0;
// Initialize counter of the current guesses - represent the chars in the words
let indexCount = 0;

// Try setting above variables to session storage, .setItem("key", "value")

const updateTryCountSessionStorage = () => {
  // Update the session storage variable for the tryCount
  sessionStorage.setItem("tryCount", tryCount);
};
const updateIndexCountSessionStorage = () => {
  // Update the session storage variable for the tryCount
  sessionStorage.setItem("indexCount", indexCount);
};

// sessionStorage.setItem("rowOne", JSON.stringify(rowOne));
// sessionRow = sessionStorage.getItem("rowOne");
// console.log(JSON.parse(sessionRow));

// Temporary word to test with
let word = "";

const fetchNewWord = async () => {
  fetch("https://random-word-api.herokuapp.com/word?length=5")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Set word to fetched word
      word = data[0].toUpperCase();
      console.log(word);
      // Set the word in the session storage
      sessionStorage.setItem("word", word);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

// Onload function to generate the playing field from session storage
window.onload = () => {
  // Check if word exists in session storage
  if (sessionStorage.getItem("word") === null) {
    console.log("Setting new word...");
    fetchNewWord();
  }
  // Check if rows exists in session storage, if not create row objects
  if (sessionStorage.getItem("row1") === null) {
    // Initialize object to store row values
    let rowObj = {
      cell1: {
        char: "",
        col: "",
      },
      cell2: {
        char: "yo",
        col: "",
      },
      cell3: {
        char: "",
        col: "",
      },
      cell4: {
        char: "",
        col: "",
      },
      cell5: {
        char: "",
        col: "",
      },
    };
    // Create a loop to create objects for each of the rows
    for (let i = 0; i < 5; i++) {
      sessionStorage.setItem(`row${i + 1}`, JSON.stringify(rowObj));
    }
    console.log("Initiated session storage");
  }
};

// Updates sessionStorage, rowNum - int to represent the row, cellNum - int to represent cell
const updateSessionStorageChar = (rowNum, cellNum, newChar) => {
  // Get the row object from the session storage
  let rowObject = JSON.parse(sessionStorage.getItem(`row${rowNum}`));
  // Update the correct cell using switch
  switch (cellNum) {
    case 1:
      rowObject.cell1.char = newChar;
      break;
    case 2:
      rowObject.cell2.char = newChar;
      break;
    case 3:
      rowObject.cell3.char = newChar;
      break;
    case 4:
      rowObject.cell4.char = newChar;
      break;
    case 5:
      rowObject.cell5.char = newChar;
      break;
  }
  // Set the updated object so session storage
  sessionStorage.setItem(`row${rowNum}`, JSON.stringify(rowObject));
};

// Modal stuff
let modal = document.getElementById("modal");
let modalTitle = document.getElementById("modalTitle");
let modalSpan = document.getElementsByClassName("close")[0];
let modalBtn = document.getElementById("modalBtn");

// Displays the modal
const displayModal = () => {
  modal.style.display = "block";
};

// Hides the modal and resets the game
modalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  // Add restart to the game
  resetGame();
});

// Returns the row element specefied by the tryCount
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

// Returns charBtn element from alphabetical parameter
const getCharBtn = (char) => {
  return charButtonsArray.find((charBtn) => charBtn.innerHTML === char);
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
  updateIndexCountSessionStorage();
};

const removeLastCharacter = () => {
  // Check if the current character index is the first
  if (indexCount == 0) return;

  // Decrement the indexCount
  indexCount--;
  updateIndexCountSessionStorage();

  // Replace the current cell with an _
  const currentRow = getCurrentRow(tryCount);
  currentRow[indexCount].innerHTML = "_";
};

// Add - check that all fields are filled before entering
const validateRow = (row) => {
  const colorsArr = [];

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
        if (!charBtn.classList.contains("green-bg")) {
          charBtn.classList.add("yellow-bg");
        }
      }
    } else {
      charButtons.forEach((btn) => {
        if (btn.innerHTML === char) btn.classList.add("disabled");
      });
    }

    // Set timeout so that the background colors of the row changes in a sequense
    setTimeout(() => {
      // Check if the letter is in the same place as in the word
      if (char == word[i]) {
        cell.classList.add("green-bg");
        colorsArr.push("green-bg");
      } else if (hasChar) {
        cell.classList.add("yellow-bg");
        colorsArr.push("yellow-bg");
      } else {
        cell.classList.add("red-bg");
        colorsArr.push("red-bg");
      }
    }, i * 200);
  });

  createRowObjectForSessionStorage(row, colorsArr);

  // Check if the user guessed the word correct
  if (checkForWin(row)) {
    // Set the title on the modal
    modalTitle.innerHTML = "Congratulations, you won!";
    // Display the modal
    displayModal();
    return;
  }

  // Check if the last row has been played, if it has passed the checkForWin it means that the player lost the game
  if (tryCount == 5) {
    // Set the title on the modal
    modalTitle.innerHTML = "You guessed incorrectly, you lost!";
    // Display the modal
    displayModal();
    return;
  }

  // Increment tryCount and reset indexCount
  tryCount++;
  updateTryCountSessionStorage();
  indexCount = 0;
  updateIndexCountSessionStorage();
};

const checkForWin = (row) => {
  // Set allMatch variable to check if all cells in the row matches the characters in the word
  let allMatch = true;

  // Loop through the cells
  row.forEach((cell, i) => {
    if (cell.innerHTML !== word[i]) allMatch = false;
  });

  // Return result
  return allMatch;
};

const removeClasses = (element) => {
  if (element.classList.contains("disabled"))
    element.classList.remove("disabled");
  if (element.classList.contains("green-bg"))
    element.classList.remove("green-bg");
  if (element.classList.contains("yellow-bg"))
    element.classList.remove("yellow-bg");
  if (element.classList.contains("red-bg")) element.classList.remove("red-bg");
};

const resetGame = () => {
  // Reset the cells
  rowOne.forEach((cell) => {
    cell.innerHTML = "_";
    removeClasses(cell);
  });
  rowTwo.forEach((cell) => {
    cell.innerHTML = "_";
    removeClasses(cell);
  });
  rowThree.forEach((cell) => {
    cell.innerHTML = "_";
    removeClasses(cell);
  });
  rowFour.forEach((cell) => {
    cell.innerHTML = "_";
    removeClasses(cell);
  });
  rowFive.forEach((cell) => {
    cell.innerHTML = "_";
    removeClasses(cell);
  });
  rowSix.forEach((cell) => {
    cell.innerHTML = "_";
    removeClasses(cell);
  });

  // Reset the background colors of the rows

  // Reset the charButtons - remove colors and disabled from classlist
  charButtons.forEach((charBtn) => {
    // Check the class list for added classes and remove them if they exist
    removeClasses(charBtn);
  });

  // Set new word
  fetchNewWord();

  // Reset the tryCount and indexCount to zero
  tryCount = 0;
  updateTryCountSessionStorage();
  indexCount = 0;
  updateIndexCountSessionStorage();
};

// Listen for enter click
enterButton.addEventListener("click", (event) => {
  // Check if the the entire row is filled with characters
  if (indexCount < 5) return;

  // Add logic for checking wich characters are guessed correct
  const currentRow = getCurrentRow(tryCount);
  validateRow(currentRow);
});

// Listen for return key click
returnButton.addEventListener("click", (event) => {
  removeLastCharacter();
});

// Listen for click on the character buttons
charButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    addCharacter(btn.innerHTML, btn);
  });
});

// Listen for any key press
window.addEventListener("keydown", (e) => {
  // Get the alphabetic character
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
  } else if (e.key === "Backspace") {
    removeLastCharacter();
  } else if (e.key === "Escape") {
    // Just for testing the method - remove after development
    // Reset the playing field
    resetGame();
  }
});
