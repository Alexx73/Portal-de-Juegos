const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
var audio1 = new Audio('./img/pain 1 .mp3');
var song = new Audio ('./img/metropolis.mp3')
song.volume = 0.2;
audio1.volume = 0.4;


let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countDown;

function pickRandonHole (holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandonHole(holes);
    }
    lastHole = hole;
    return hole;
}

function  popOut() {
    const time = Math.random() * 1300 + 400;
    const hole = pickRandonHole(holes);
    hole.classList.add('up');
    setTimeout(function() {
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time)
}

function startGame(){
    song.play();

    countDown = timeLimit / 1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countDown;
    timeUp =  false;
    score = 0;
    popOut();
    setTimeout(function() {
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(() => {
        countDown -= 1;
        countdownBoard.textContent = countDown;
        if (countDown < 0 ) {
            countDown = 0;
            clearInterval(startCountdown);
            countdownBoard.textContent = 'Time is UP!!';
            song.pause();

        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

function whack (e) {
    score++;
    audio1.play();
    this.style.backgroundImage = 'url("./img/yoda2.png")';
    setTimeout(() => {
        this.style.backgroundImage = 'url("./img/yoda1.png")';
    }, 800);
    scoreBoard.textContent = score;

}

moles.forEach(mole => mole.addEventListener('click', whack));

