console.log('here!')

const scrollKeys = [' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

function preventScroll(e) {
    if (scrollKeys.includes(e.key)) {
        e.preventDefault();
    }
}

window.addEventListener('keydown', preventScroll)

const kubok = document.querySelector('.kubok');

const grid = document.querySelector('.grid');
const startButton = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score');
let score = 0;
// scoreDisplay.innerText = score;
const squares = []; 
let currentSnake = [2, 1, 0]; 
//  so currentSnake[0] will be the head
let direction = 1;
let width = 30;
let height = 20;
let appleIndex;
let intervalTime = 350;
let timerId;

// new additions 3210
const left = document.querySelector("#left");
const up = document.querySelector("#up");
const down = document.querySelector("#down");
const right = document.querySelector("#right");

const rightWall = [];



function createGrid() {    
     for (let i = 0; i < width * height; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        grid.append(square)
        squares.push(square);
        // square.innerText = i;
     }
}
createGrid();

function buildWall() {
    for (let i = 29; i <= 599; i += 30) {
        rightWall.push(i);
    }
}
buildWall();

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    // startButton.innerText="Restart"
    if (
        (currentSnake[0] % 30 === 0 && direction === -1) ||
        (currentSnake[0] + direction < 0 && direction === -30) ||
        // (currentSnake[0] % 30 === 9 && direction === 1) ||
        (rightWall.includes(currentSnake[0]) && direction === 1 ) ||
        (currentSnake[0] + direction > 599 && direction === 30) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        console.log('game over')
        // startButton.innerText="Start"
        return clearInterval(timerId);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    // remove last square from the snake
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[appleIndex].classList.remove('apple')
        generateApples();
        score ++;
        scoreDisplay.innerText = score;
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        clearInterval(timerId);
        intervalTime = intervalTime * 0.95;
        timerId = setInterval(move, intervalTime);
    }

    squares[currentSnake[0]].classList.add('snake')
    // add new square to the beginning of snake sort of
};
// move(); 

// let timerId = setInterval(move, intervalTime);

function control(e) {
    if  (
        (e.key === "ArrowLeft" || e.target.value === 'left') && 
        (direction !== 1)
        ) {
        console.log('left');
        direction = -1;
    }
    if  (
        (e.key === "ArrowUp" || e.target.value === 'up') &&
        (direction !== 30)
        ) {
        console.log('up');
        direction = -30;
    }
    if  (
        (e.key === "ArrowRight" || e.target.value === 'right') &&
        (direction !== -1)
        ) {
        console.log('right');
        direction = 1;
    }
    if  (
        (e.key === "ArrowDown" || e.target.value === 'down') &&
        (direction !== -30)
        ) {
        console.log('down');
        direction = 30;
    }
}

document.addEventListener('keydown', control);

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}
generateApples();

function startGame() {
    if (!timerId) {
        timerId = setInterval(move, intervalTime);
    } else {
        clearInterval(timerId);
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        currentSnake = [2, 1, 0];
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        score = 0;
        scoreDisplay.innerText = score;
        squares[appleIndex].classList.remove('apple');
        generateApples();
        let intervalTime = 350;
        timerId = setInterval(move, intervalTime);
        direction = 1;
        
    }
    
}

startButton.addEventListener('click', startGame);

function test(e) {
    console.log(e.target.value)
}

left.addEventListener('click', control);
up.addEventListener('click', control);
down.addEventListener('click', control);
right.addEventListener('click', control);



// console.log(timerId === true)