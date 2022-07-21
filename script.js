// Game Variables for targeting HTML elements.
let gameContainer = document.querySelector('.gameContainer');
let gameBoard = document.querySelector('.gameBoard');
let gameOver = document.querySelector('.gameOver');
let gameScore = document.querySelector('.gameScore');

// Game Variables for manipulating the game.
let lastPaintTime = 0;
let speed = 6;

let snakeElements = [
    { x: 6, y: 11 }
];

let foodElement = { x: 15, y: 11 };

let directions = { x: 0, y: 0 };

let score = 0;

// Function to paint the game window again and again after certain intervals of time.
function mainFunction(x) {
    window.requestAnimationFrame(mainFunction);
    if ((x - lastPaintTime) / 1000 < 1 / speed) {
        return;
    };
    lastPaintTime = x;
    mainGameLoop();
};

// Game over when any type of collision takes place.
function isCollided(elem) {
    // Reset the game to initial frame when snake collides with the walls of the game board.
    if (elem.style.gridColumnStart < 0 || elem.style.gridColumnStart > 21 || elem.style.gridRowStart < 0 || elem.style.gridRowStart > 21) {
        directions = { x: 0, y: 0 };
        snakeElements = [
            { x: 6, y: 11 }
        ];
        foodElement = { x: 15, y: 11 };
        gameOver.style.display = 'flex';
        setTimeout(() => {
            gameOver.style.display = 'none';
        }, 3000);
        
        score = 0;
        speed = 6;
    };

    // Reset the game to initial frame when snake collides with it's own body.
    for (let i = 3; i < snakeElements.length; i++) {
        if (snakeElements[0].x === snakeElements[i].x && snakeElements[0].y === snakeElements[i].y) {
            directions = { x: 0, y: 0 };
            snakeElements = [
                { x: 6, y: 11 }
            ];
            foodElement = { x: 15, y: 11 };
            gameOver.style.display = 'flex';
            setTimeout(() => {
                gameOver.style.display = 'none';
            }, 3000);

            score = 0;
            speed = 6;
        };
    };
};

// Main game loop for running the game.
function mainGameLoop() {
    // Removing every element from the gameBoard so that no gameBoard is totally empty each time loop starts running.
    gameBoard.innerHTML = '';

    // Displaying the score.
    gameScore.innerHTML = `Score : ${score}`;

    // Creating the head of the snake and adding it to the gameBoard.
    snakeElements.forEach(element => {
        snakeBlock = document.createElement('div');
        gameBoard.appendChild(snakeBlock);
        snakeBlock.style.gridColumnStart = element.x;
        snakeBlock.style.gridRowStart = element.y;

        // Giving black color to the snake's head and gray color to the body of the snake.
        snakeBlock.style.backgroundColor = 'gray';
        gameBoard.firstChild.style.backgroundColor = 'black';
    });

    // Creating the food for the snake and adding it to the gameBoard.
    let food = document.createElement('div');
    food.style.backgroundColor = 'red';
    gameBoard.appendChild(food);
    food.style.gridColumnStart = foodElement.x;
    food.style.gridRowStart = foodElement.y;

    // Capturing the food and generating the food at a random place.
    if (snakeElements[0].x === foodElement.x && snakeElements[0].y === foodElement.y) {
        let grid = 21;
        foodElement = { x: Math.round(grid * Math.random()), y: Math.round(grid * Math.random()) };
        snakeElements.push({ x: snakeElements[0].x, y: snakeElements[0].y });
        score += 1;
        if (score > 5) {
            speed = 10
        }
        else if (score > 15) {
            speed = 12
        }
        else if (score > 20) {
            speed = 15
        };
    };

    // Moving the snake's body segments along with snake's head.
    for (let i = snakeElements.length - 2; i >= 0; i--) {
        snakeElements[i + 1] = { ...snakeElements[i] };
    };

    // Changing the snakeElements array so as to generate the snake's body in such a way that it seems moving.
    snakeElements[0].x = snakeElements[0].x + directions.x;
    snakeElements[0].y = snakeElements[0].y + directions.y;

    // Collision function.
    isCollided(snakeBlock);
};

// Function to move the snake according to the command given by the keyboard.
document.addEventListener('keydown', (e) => {
    gameOver.style.display = 'none';
    // Changing the value of directions according to the command given by the keyboard.
    switch (e.key) {
        case 'ArrowUp':
            directions = { x: 0, y: -1 };
            break;
        case 'ArrowRight':
            directions = { x: 1, y: 0 };
            break;
        case 'ArrowDown':
            directions = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            directions = { x: -1, y: 0 };
            break;

        default:
            break;
    };
});

requestAnimationFrame(mainFunction);

// 8002696841