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
let youWonAnnouncment = document.querySelector("#result");
let retriesNumber = document.querySelector(".num-tries");
let restartButton = document.querySelector("#restart");

howToPlayButton.addEventListener("click", () => {
  headerElement.classList.add("open-description");
});

closeButton.addEventListener("click", () => {
  headerElement.classList.remove("open-description");
});

// generate a 4 digit number
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const removeItem = (str) => {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ",") {
      newStr += str[i];
    }
  }
  return newStr;
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

const restartGame = () => {
  restartButton.classList.remove("visible");
  restartButton.classList.add("hidden");

  youWonAnnouncment.classList.add("hidden");
  youWonAnnouncment.classList.remove("visible");

  usersGuessedNum1.value = "";
  usersGuessedNum2.value = "";
  usersGuessedNum3.value = "";
  usersGuessedNum4.value = "";
  displayGuessedNum.textContent = "";

  removeItem(generateNumber());
};

let secretNumber = generateNumber();
let retries = 0;
submitButton.addEventListener("click", () => {
  let str = "";
  let arr = [];
  let num1 = Number(usersGuessedNum1.value);
  let num2 = Number(usersGuessedNum2.value);
  let num3 = Number(usersGuessedNum3.value);
  let num4 = Number(usersGuessedNum4.value);
  arr.push(num1);
  arr.push(num2);
  arr.push(num3);
  arr.push(num4);
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
    youWonAnnouncment.textContent = "Congradulations! You Won!";

    restartButton.classList.remove("hidden");
    restartButton.classList.add("visible");
  }

  if (retries === 10) {
    youWonAnnouncment.textContent = "You lost! Try Again!";

    restartButton.classList.remove("hidden");
    restartButton.classList.add("visible");
  }
});

restartButton.addEventListener("click", () => {
  restartGame();
});
