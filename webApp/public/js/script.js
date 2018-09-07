// List all apple-card elements
const cards = document.querySelectorAll('.apple-card'); 

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard(){
   if (lockBoard) return;
   if (this === firstCard) return;
    this.classList.toggle('flip');
    if(!hasFlippedCard){
        //First Click
       hasFlippedCard = true;
       firstCard = this;
    return;
   }
        // Second Click
       secondCard = this;
    CheckForMatch();
}

//Check for match function
function CheckForMatch(){
    // Checks if cards matched, used html data attribute set to 'device'
    let isMatch = firstCard.dataset.device === secondCard.dataset.device;

    isMatch ? disableCards() : unFlipCards();
    
}
// Function disables cards if it's a match.
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardsMatched();
   
}

function unFlipCards(){
    lockBoard = true;
  
    // setTimeout to view card flip
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        cardsMatched();
    }, 1500);
}

function cardsMatched(){
    //ES6 distructuring assingment
   [hasFlippedCard, lockBoard] = [false, false]; 
   [firstCard, secondCard] = [null, null];
   
}

// Shuffle function wrapped with immediately invoked function expression
(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

//Button clicked function resets board
function buttonClicked(){
    location.reload();

}

// Used forEach to loop through apple-card elements with event listener
cards.forEach(card => card.addEventListener('click', flipCard));
    
