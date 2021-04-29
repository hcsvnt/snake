console.log('here!')

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
let width = 10;
let height = 10;
let appleIndex;
let intervalTime = 1000;
let timerId;

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

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    startButton.innerText="Restart"
    if (
        (currentSnake[0] % 10 === 0 && direction === -1) ||
        (currentSnake[0] + direction < 0 && direction === -10) ||
        (currentSnake[0] % 10 === 9 && direction === 1) ||
        (currentSnake[0] + direction > 99 && direction === 10) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        console.log('game over')
        startButton.innerText="Start"
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
        intervalTime = intervalTime * 0.9;
        timerId = setInterval(move, intervalTime);
    }

    squares[currentSnake[0]].classList.add('snake')
    // add new square to the beginning of snake sort of
};
// move(); 

// let timerId = setInterval(move, intervalTime);

function control(e) {
    if (e.key === "ArrowLeft") {
        console.log('left');
        direction = -1;
    }
    if (e.key === "ArrowUp") {
        console.log('up');
        direction = -height;
    }
    if (e.key === "ArrowRight") {
        console.log('right');
        direction = 1;
    }
    if (e.key === "ArrowDown") {
        console.log('down');
        direction = height;
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
        let intervalTime = 1000;
        timerId = setInterval(move, intervalTime);
        direction = 1;
        
    }
    
}

startButton.addEventListener('click', startGame);

// console.log(timerId === true)