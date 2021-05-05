const cards =document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let contador = 0;
// const puntaje = document.getElementById('puntaje').innerText = 'Puntaje: 50'

var audio1 = new Audio('./img2/Card-flip-sound-effect.mp3');
var audio2 = new Audio('./img2/Ta Da .mp3');


cards.forEach(card => card.addEventListener('click', flipcard))

function flipcard () {
    if (lockBoard) return
    if (this === firstCard) return;

    this.classList.toggle('flip')
    audio1.play();
    // console.log(this.classList.value);

    if (!hasFlippedCard) {

        // First click
        hasFlippedCard = true;
        firstCard = this;
        // console.log({hasFlippedCard, firstCard});

    } else {
        // Second Click
        hasFlippedCard = false;
        secondCard = this;
        // console.log({firstCard, secondCard});
        checkForMatch ();      
    }
}


function checkForMatch () {
    // Do cards match?
    console.log(firstCard.dataset.framework );
    console.log(secondCard.dataset.framework );

    if(firstCard.dataset.framework === secondCard.dataset.framework ) {

        setTimeout(() => {
             
            disableCards();
            audio2.play();
        }, 500);     

    } else {
        unFlipCards();           
    }  
};

function disableCards(){

    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);
   

}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }, 1500);     
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos
    });
})();


// document.getElementById('game').innerHTML = 'hello memoory game!'