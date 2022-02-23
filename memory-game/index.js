const cards = document.querySelectorAll('.memory-card');
const result = document.querySelectorAll('.result');
const restartBtn = document.querySelectorAll('.restart-btn');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let currentScoreCounter = 0;
let recordsList = [];
const scoreRecord = document.querySelectorAll('.score-rec');
const congratsBoard = document.querySelector('.congrats-bg');

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  currentScoreCounter += 1;
  displayCurrentScore();

  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    return;
  }
  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 16);
    card.style.order = ramdomPos;
  });
}

function displayCurrentScore() {
  result.forEach((e) => {
    e.innerHTML = currentScoreCounter;
  });
}

function refreshBoard() {
  currentScoreCounter = 0;
  displayCurrentScore();
  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  shuffle();
  showScore();
  hideCongrats();
  cards.forEach((card) => card.addEventListener('click', isOver));
}

function isOver() {
  let flippedCards = document.querySelectorAll('.flip');
  if (flippedCards.length === 16) {
    setTimeout(() => {
      showCongrats();
    }, 1000);
    writeRecord();
  }
}

function writeRecord() {
  if (isOver) {
    recordsList.unshift(currentScoreCounter);
    recordsList.length = 10;
    cards.forEach((card) => card.removeEventListener('click', isOver));
  }
}

function showScore() {
  scoreRecord.forEach((record, n) => {
    if (record.classList.contains(`${n + 1}`)) {
      if (recordsList[n] === undefined) {
        record.innerHTML = '0';
      } else {
        record.innerHTML = recordsList[n];
      }
    }
  });
}

function setLocalStorage() {
  for (let i = 0; i < 10; i++) {
    localStorage.setItem(`rec${i}`, recordsList[i]);
  }
}

function getLocalStorage() {
  for (let i = 0; i < 10; i++) {
    if (localStorage.getItem(`rec${i}`) === 'null') {
      recordsList[i] = 0;
    } else {
      recordsList[i] = localStorage.getItem(`rec${i}`);
    }
  }
}

function showCongrats() {
  congratsBoard.classList.remove('hidden');
}

function hideCongrats() {
  congratsBoard.classList.add('hidden');
}

shuffle();
displayCurrentScore();
showScore();
cards.forEach((card) => card.addEventListener('click', flipCard));
cards.forEach((card) => card.addEventListener('click', isOver));
restartBtn.forEach((btn) => {
  btn.addEventListener('click', refreshBoard);
});

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', showScore);
