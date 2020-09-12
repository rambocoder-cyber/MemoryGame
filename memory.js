const cards = document.querySelectorAll(".memory-card");

let hasFlippedcard = false;
let lockBoard = false;
let firstCard , secondCard;

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;
  this.classList.add('flip');
  if(!hasFlippedcard){
    // first click
    hasFlippedcard=true;
    firstCard=this;
    return;
  }
    // second click
  hasFlippedcard=false;
  secondCard=this;
  checkFormatch()
  
}

function checkFormatch(){
//  match
  let isMatch=firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards():unflipCards();
}

function disableCards(){
  firstCard.removeEventListener('click',flipCard)
  secondCard.removeEventListener('click',flipCard)
  resetBoard();
}

function unflipCards(){

  lockBoard=true;
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard();
  },1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle(){
cards.forEach(card => {
  let randomPos= Math.floor( Math.random()*12);
  card.style.order = randomPos;
})
})();
cards.forEach(card => card.addEventListener('click',flipCard));