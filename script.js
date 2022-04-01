console.log("Hello world")
const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width/ tileCount - 2;
let headx = 10;
let heady = 10;
const snakeParts = [];
let tailLength = 0;

let applex = 5;
let appley = 5; 

let xvelocity = 0;
let yvelocity = 0;

let score = 0;  

const gulpSound = new Audio("gulp.mp3");
const gametheOver = new Audio("Gameover.mp3");

//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawSnake();
    drawScore();
    
    if(score > 2){
        speed = 11;
    }
    if(score > 5){
        15;
    }

    drawApple();
    setTimeout(drawGame, 1000/speed)
}

function isGameOver(){
    let gameOver = false;

    if(yvelocity === 0 && xvelocity === 0){
        return false;
    }

    //walls 
    if(headx < 0){
        gameOver = true;
        gametheOver.play();
    }
    else if(headx === tileCount){
        gameOver = true;
        gametheOver.play();

    }
    else if(heady < 0){
        gameOver = true;
        gametheOver.play();

    }
    else if(heady === tileCount){
        gameOver = true;
        gametheOver.play();

    }

    for(let i=0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headx && part.y === heady){
            gameOver = true;
            gametheOver.play();
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);

    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "15px Verdana";
    ctx.fillText("Score " + score, canvas.width - 70, 20);
  }

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function drawSnake(){
   
    ctx.fillStyle = 'lime';
    for(let i=0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(headx, heady));
    if(snakeParts.length > tailLength){
        snakeParts.shift(); // remove the furthest item from the snakeparts, if we have more that a tail size   
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headx * tileCount, heady * tileCount, tileSize, tileSize)
}

function changeSnakePosition(){
    headx = headx + xvelocity;
    heady = heady + yvelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(applex * tileCount, appley * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(applex == headx && appley == heady){
        applex = Math.floor(Math.random() * tileCount);
        appley = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

//listens for any key is pressed 
function keyDown(event){
    //up key
    if(event.keyCode == 38){
        if(yvelocity == 1){
            return; 
        }
        yvelocity = -1;
        xvelocity = 0;
    }

    //down key
    if(event.keyCode == 40){
        if(yvelocity == -1){
            return; 
        }
        yvelocity = 1;
        xvelocity = 0;
    }

    //left key
    if(event.keyCode == 37){
        if(xvelocity == 1){
            return;
        }
        yvelocity = 0;
        xvelocity = -1;
    }

    //right key
    if(event.keyCode == 39){
        if(xvelocity == -1){
            return;
        }
        yvelocity = 0;
        xvelocity = 1;
    }
}

drawGame();