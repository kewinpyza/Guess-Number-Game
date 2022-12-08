'use strict';

// DOM Variables
const numContainer = document.querySelector('.box-numbers');
const inpNumber = document.querySelector('.guess');
const playAgainBtn = document.querySelector('.again');
const checkNumberBtn = document.querySelector('.check');
const message = document.querySelector('.info');
const displayNumber = document.querySelector('.display-number');
const scoreLabel = document.querySelector('.score');
const highscoreLabel = document.querySelector('.highscore');
const body = document.querySelector('body');
const leftLabel = document.querySelector('.left');
const rightLabel = document.querySelector('.right');
const backArrow = document.querySelector('.back-arrow');
const heading = document.querySelector('h1');
const footer = document.querySelector('footer');
const article = document.querySelector('article');
const winningMessage = document.querySelector('.win-header');

const numbersQuantity = 25;
let gameNumber = Math.trunc(Math.random() * 25) + 1;
let score = 15;
let highscore = 0;
let gameOver = false;

const displayMessage = msg => {
  message.textContent = msg;
};

// Creating 25 box number buttons
for (let i = 0; i < numbersQuantity; i++) {
  const button = document.createElement('button');
  button.textContent = i + 1;
  numContainer.append(button);
  button.classList.add('box-item');
}
const boxNumbers = document.querySelectorAll('.box-item');

boxNumbers.forEach(num => {
  if (!gameOver) {
    num.addEventListener('click', chooseNumber);
  }
  if (gameOver) {
    num.removeEventListener('click', chooseNumber);
  }
});

function chooseNumber() {
  if (!gameOver) {
    inpNumber.value = this.textContent;
  }
}

// Game Logic
function gameLogic() {
  if (!gameOver) {
    const guessNum = +inpNumber.value;

    // There is no input value
    if (!guessNum || guessNum > 25 || guessNum < 1) {
      displayMessage('❌ Invalid input. Please select correct value.');
    }

    // Player wins
    if (guessNum === gameNumber) {
      const html = `<h2>🏆Congratulations! Correct Number🎯 Your score is ${score}/15</h2>`;

      displayNumber.textContent = gameNumber;
      displayNumber.style.width = '44vh';
      displayNumber.style.height = '44vh';
      displayNumber.style.fontSize = '25vh';
      displayNumber.style.fontWeight = 'bold';
      displayNumber.style.backgroundColor = '#096e0b';
      displayNumber.style.color = 'white';
      body.style.backgroundColor = '#25d11f';
      boxNumbers[gameNumber - 1].disabled = true;
      leftLabel.classList.add('hidden');
      rightLabel.classList.add('hidden');
      boxNumbers.forEach(num => {
        num.classList.add('hidden');
      });
      backArrow.style.opacity = '0.4';
      heading.style.opacity = '0.4';
      footer.classList.add('hidden');
      winningMessage.insertAdjacentHTML('beforeend', html);
      gameOver = true;
      // Saving best score
      if (score > highscore) {
        highscore = score;
        highscoreLabel.textContent = highscore;
      }
    }

    // Guess Number is incorrect
    if (guessNum !== gameNumber) {
      if (score > 1) {
        displayMessage(
          `The selected number is too ${
            guessNum < gameNumber ? 'LOW 📉' : 'HIGH 📈'
          }`
        );
        score--;
        scoreLabel.textContent = score;
        boxNumbers[guessNum - 1].disabled = true;
      } else {
        displayMessage('YOU LOST THE GAME! 🤬');
        scoreLabel.textContent = 0;
        gameOver = true;
      }
    }
  }
}

// Play Again Button Logic
function playAgain() {
  gameNumber = Math.trunc(Math.random() * 25) + 1;
  score = 15;
  gameOver = false;
  displayMessage('Select the number to start guessing 😀');
  displayNumber.textContent = '?';
  scoreLabel.textContent = score;
  inpNumber.value = '';
  body.style.backgroundColor = '#040437';
  displayNumber.style.width = '15vh';
  displayNumber.style.height = '15vh';
  displayNumber.style.fontSize = '12vh';
  backArrow.style.opacity = '1';
  heading.style.opacity = '1';
  footer.classList.remove('hidden');
  leftLabel.classList.remove('hidden');
  rightLabel.classList.remove('hidden');
  displayNumber.style.fontWeight = 'normal';
  displayNumber.style.backgroundColor = 'white';
  displayNumber.style.color = 'black';
  winningMessage.textContent = '';
  boxNumbers.forEach(num => {
    num.classList.remove('hidden');
    num.disabled = false;
  });
}

checkNumberBtn.addEventListener('click', gameLogic);
playAgainBtn.addEventListener('click', playAgain);
