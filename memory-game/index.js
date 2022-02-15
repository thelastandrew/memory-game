const cards = document.querySelectorAll('.memory-card');

//Flip card
function flipCard() {
  this.classList.toggle('flip');
}

cards.forEach((card) => card.addEventListener('click', flipCard));
