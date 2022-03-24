"use strict";

let howToPlayButton = document.querySelector(".how-to-play");
let headerElement = document.querySelector(".header");
let closeButton = document.querySelector("#btn-close");
let usersGuessedNum1 = document.querySelector("#users-input-1");
let usersGuessedNum2 = document.querySelector("#users-input-2");
let usersGuessedNum3 = document.querySelector("#users-input-3");
let usersGuessedNum4 = document.querySelector("#users-input-4");
let submitButton = document.querySelector("#submit");
let displayGuessedNum = document.querySelector("#display-guess");
let announcment = document.querySelector("#result");
let retriesNumber = document.querySelector(".num-tries");
let restartButton = document.querySelector("#restart");

// OPENS THE HOW-TO-PLAY DESCRIPTION
howToPlayButton.addEventListener("click", () => {
  headerElement.classList.add("open-description");
});

closeButton.addEventListener("click", () => {
  headerElement.classList.remove("open-description");
});

// GENERATE A 4 DIGIT NUMBER
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateNumber = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let numbers = [];
  for (let i = 0; i < 4; i++) {
    const num = randomNumber(0, arr.length);
    numbers.push(arr[num]);
    arr.splice(num, 1);
  }

  return numbers;
};

// RESTARTS THE GAME
const restartGame = () => {
  restartButton.classList.remove("visible");
  restartButton.classList.add("hidden");

  announcment.classList.add("hidden");
  announcment.classList.remove("visible");

  usersGuessedNum1.value = "";
  usersGuessedNum2.value = "";
  usersGuessedNum3.value = "";
  usersGuessedNum4.value = "";
  displayGuessedNum.textContent = "";
  retriesNumber.textContent = 10;

  retries = 0;
  secretNumber = generateNumber();

  generateNumber();
};

// START THE GAME WHEN CLICKED ON SUBMIT BUTTON
let secretNumber = generateNumber();
let retries = 0;
submitButton.addEventListener("click", () => {
  let str = "";
  let arr = [];

  arr.push(Number(usersGuessedNum1.value));
  arr.push(Number(usersGuessedNum2.value));
  arr.push(Number(usersGuessedNum3.value));
  arr.push(Number(usersGuessedNum4.value));
  let usersNumber = arr;
  console.log(secretNumber);
  console.log(usersNumber);

  usersGuessedNum1.value = "";
  usersGuessedNum2.value = "";
  usersGuessedNum3.value = "";
  usersGuessedNum4.value = "";

  for (let i = 0; i < secretNumber.length; i++) {
    if (secretNumber[i] === usersNumber[i]) {
      str = str.concat("A");
    } else if (secretNumber.includes(usersNumber[i])) {
      str = str.concat("B");
    } else {
      str = str.concat(usersNumber[i]);
    }
  }
  console.log(str);
  retries++;

  retriesNumber.textContent = 10 - retries;
  displayGuessedNum.textContent = str;
  if (str === "AAAA") {
    announcment.textContent = "Congradulations! You Won!";

    restartButton.classList.remove("hidden");
    restartButton.classList.add("visible");
  }

  if (retries === 10) {
    announcment.textContent = "You lost! Try Again!";

    restartButton.classList.remove("hidden");
    restartButton.classList.add("visible");
  }
});

// RESTARTS THE GAME WHEN RESTART BUTTON CLICKED
restartButton.addEventListener("click", () => {
  restartGame();
});
