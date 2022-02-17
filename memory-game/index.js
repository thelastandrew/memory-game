const cards = document.querySelectorAll('.memory-card');
const result = document.querySelector('.result');
const refreshBtn = document.querySelector('.refresh-btn');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let currentScoreCounter = 0;

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
  result.innerHTML = currentScoreCounter;
}

function refreshBoard() {
  currentScoreCounter = 0;
  displayCurrentScore();
  cards.forEach((card) => card.classList.remove('flip'));
  cards.forEach((card) => card.addEventListener('click', flipCard));
  shuffle();
}

shuffle();
displayCurrentScore();
cards.forEach((card) => card.addEventListener('click', flipCard));
refreshBtn.addEventListener('click', refreshBoard);
