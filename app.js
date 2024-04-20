// let canvas = document.querySelector('canvas');
// let ctx = canvas.getContext("2d");

// let cellSize = 50;
// let boardWidth = 1000;
// let boardHeight = 600;

// let gameOver = false;

// let direction = "right";
// let foodCell=generateFood();
// let snakeCells = [[0, 0]];


// function draw() { //snake ko sketch krana

//     if(gameOver===true) {
//         clearInterval(id);
//         return ;
//     }

//     //draw snake
//     ctx.clearRect(0, 0, 1000, 600)
//     for (let cell of snakeCells) {
//         ctx.fillStyle = "red";
//         ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
//     }

//     //draw food
//     ctx.fillStyle="green";
//     ctx.fillRect(foodCell[0],foodCell[1],cellSize,cellSize);
// }

// document.addEventListener('keydown', function (e) {
//     if (e.key === "ArrowDown") {
//         direction = "down";
//     }

//     else if (e.key === "ArrowUp") {
//         direction = "up";
//     }

//     else if (e.key === "ArrowLeft") {
//         direction = "left";
//     }

//     else {
//         direction = "right";
//     }

// });

// function update() { //snake ko move krana
//     let headX = snakeCells[snakeCells.length - 1][0]
//     let headY = snakeCells[snakeCells.length - 1][1]

//     let newHeadX;
//     let newHeadY;

//     if (direction === "up") {
//         newHeadX = headX;
//         newHeadY = headY - cellSize;

//         if(newHeadY<0) {
//             gameOver=true;
//         }
//     }

//     else if (direction === "down") {
//         newHeadX = headX;
//         newHeadY = headY + cellSize;

//         if(newHeadY===boardHeight) {
//             gameOver=true;
//         }
//     }

//     else if (direction ==="left") {
//         newHeadX = headX - cellSize;
//         newHeadY = headY;

//         if(newHeadX<0) {
//             gameOver=true;
//         }
//     }

//     else if (direction === "right") {
//         newHeadX = headX + cellSize;
//         newHeadY = headY;

//         if(newHeadX==boardWidth) {
//             gameOver=true;
//         }
//     }

//     snakeCells.push([newHeadX, newHeadY]);
//     snakeCells.shift();
// }

// function generateFood() {
//     return{
//         Math.round((Math.random() * (boardWidth-cellSize)/cellSize) * cellSize),
//         Math.round((Math.random() * (boardWidth-cellSize)/cellSize) * cellSize)
//     }
// }

// let id=setInterval(function () {
//     update();
//     draw();
// },150);


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

let cellSize = 50;
let boardWidth = 1000;
let boardHeight = 600;

let gameOver = false;

let direction = "right";
let foodCell = generateFood();
let snakeCells = [[0, 0]];

function draw() { //snake ko sketch krana
    if (gameOver === true) {
        clearInterval(id);
        ctx.font="50px consolas";
        ctx.fillStyle="red";
        ctx.fillText("GAME OVER !!! ",320,300)
        return;
    }

    //draw snake
    ctx.clearRect(0, 0, 1000, 600)
    for (let cell of snakeCells) {
        ctx.fillStyle = "red";
        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
        ctx.strokeStyle = "white";
        ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
    }

    //draw food
    ctx.fillStyle = "green";
    ctx.fillRect(foodCell[0], foodCell[1], cellSize, cellSize);

    //draw score
    ctx.font="20px san-serif"
    ctx.fillStyle="yellow"
    ctx.fillText(`Score : ${score}`,20,40);
}

document.addEventListener('keydown', function (e) {
    if (e.key === "ArrowDown") {
        direction = "down";
    } 
    
    else if (e.key === "ArrowUp") {
        direction = "up";
    } 
    
    else if (e.key === "ArrowLeft") {
        direction = "left";
    } 
    
    else {
        direction = "right";
    }
});

function update() { //snake ko move krana
    let headX = snakeCells[snakeCells.length - 1][0]
    let headY = snakeCells[snakeCells.length - 1][1]

    let newHeadX;
    let newHeadY;

    if (direction === "up") {
        newHeadX = headX;
        newHeadY = headY - cellSize;
    } 
    
    else if (direction === "down") {
        newHeadX = headX;
        newHeadY = headY + cellSize;
    } 
    
    else if (direction === "left") {
        newHeadX = headX - cellSize;
        newHeadY = headY;
    } 
    
    else if (direction === "right") {
        newHeadX = headX + cellSize;
        newHeadY = headY;
    }

    if (newHeadX < 0 || newHeadX >= boardWidth || newHeadY < 0 || newHeadY >= boardHeight
        || khudEat(newHeadX,newHeadY)) {
        gameOver = true;
    }

    snakeCells.push([newHeadX, newHeadY]);
    if (newHeadX === foodCell[0] && newHeadY === foodCell[1]) {
        foodCell = generateFood();
        score+=1;
    } 
    
    else {
        snakeCells.shift();
    }
}

function generateFood() {
    let x = Math.floor(Math.random() * (boardWidth - cellSize) / cellSize) * cellSize;
    let y = Math.floor(Math.random() * (boardHeight - cellSize) / cellSize) * cellSize;
    return [x, y];
}


function khudEat(newHeadX,newHeadY) {
    for(let item of snakeCells){
        if(newHeadX===item[0] && newHeadY===item[1]){
            return true;
        }
    }

    return false;
}

let id = setInterval(function () {
    update();
    draw();
}, 250);


