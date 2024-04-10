   
//board
var blockSize = 15;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

var vj =0;
const eatfood = new Audio("eat.mp3");
const end = new Audio("ending.mp3");
const bgsound =new Audio('background.mp3');

window.onload = function() {
    board = document.getElementById("board");
    board.height = window.innerHeight-50;
    board.width = window.innerWidth-10;
    context = board.getContext("2d"); //used for drawing on the board
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    document.getElementById("upButton").addEventListener("click", () => changeDirection({code: "ArrowUp"}));
    document.getElementById("downButton").addEventListener("click", () => changeDirection({code: "ArrowDown"}));
    document.getElementById("leftButton").addEventListener("click", () => changeDirection({code: "ArrowLeft"}));
    document.getElementById("rightButton").addEventListener("click", () => changeDirection({code: "ArrowRight"}));

    update();
    setInterval(update, 100); //100 milliseconds
}

function update() {
    
    if (gameOver) {
        return;
    }
    document.getElementById('score').innerHTML = "Score :" + vj;
    context.fillStyle="white";
    
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="green";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        eatfood.play();
        vj++;
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    

    context.fillStyle="black";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
       
    }

    //game over conditions
    if (snakeX < 0 || snakeX > window.innerWidth-10|| snakeY < 0 || snakeY > window.innerHeight-50) {
        gameOver = true;
        try {
            end.play();
        } catch (error) {
            console.error('Audio play failed:', error);
        }
        
    }
    

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            try {
                end.play();
            } catch (error) {
                console.error('Audio play failed:', error);
            }
            
        }
        

    }
}


function changeDirection(e) {
   
    if (e.code == "ArrowUp" && velocityY != 1 ) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1 ) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1 ) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1 ) {
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code =="Enter"){
        window.location.reload();
    }
}




function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
    