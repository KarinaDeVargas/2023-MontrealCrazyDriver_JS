/*
FSD10 - User Interfaces
Final Project
Group: Charlie
    Claudiu || ID:
    Sophie || ID:
    Karina de Vargas Pereira || ID:2300594
Date: September 15, 2023
Description: js file for game "GAME NAME"
*/

window.addEventListener('load', prepForm ); //onload event listener (same as Stephanie uses)

// Variables to define the board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// Variables to define the car
let carWidth = 100;
let carHeight = 100;
let carX = 50;
let carY = boardHeight - carHeight;
let carImg;

let car = {
    x : carX,
    y : carY,
    width : carWidth,
    height : carHeight
}

// Variables to define the Montreal cones
let coneArray = [];

let cone1Width = 82;
let cone2Width = 82;
let cone3Width = 82;

let coneHeight = 101;
let coneX = 700;
let coneY = boardHeight - coneHeight;

let cone1Img;
let cone2Img;
let cone3Img;

// Variables related to the physics of the game 
let velocityX = -5; //speed for the cones moving to the left (the orinal speed was -8, I thought it could be a little bit slower, so a switched to -5)
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

function prepForm (){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); //used for drawing on the board

    carImg = new Image();
    carImg.src = "./img/green_car.jpg";
    carImg.onload = function() {
        context.drawImage(carImg, car.x, car.y, car.width, car.height);
    }

    cone1Img = new Image();
    cone1Img.src = "./img/cone1.png";

    cone2Img = new Image();
    cone2Img.src = "./img/cone2.png"; // Charlie Group, we need to change this image

    cone3Img = new Image();
    cone3Img.src = "./img/cone3.png"; // Charlie Group, we need to change this image

    requestAnimationFrame(update);
    setInterval(placeCone, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", moveCar);
}
 

function update() {
    requestAnimationFrame(update);
    
    //car
    context.drawImage(carImg, car.x, car.y, car.width, car.height);

    //cone
    for (let i = 0; i < coneArray.length; i++) {
        let cone = coneArray[i];
        context.drawImage(cone.img, cone.x, cone.y, cone.width, cone.height);
    }
}


function placeCone() { 
    //
    let cone = {
        img : null,
        x : coneX,
        y : coneY,
        width : null,
        height : coneHeight,
    }

    let placeConeRandom = Math.random(); // 

    if (placeConeRandom > .90) { // 10% chance you get a cone3
        cone.img = cone3Img;
        cone.width = cone3Width;
        coneArray.push(cone);
    }
    else if (placeConeRandom > .70) { //30% chance you get a cone2
        cone.img = cone2Img;
        cone.width = cone3Width;
        coneArray.push(cone);
    }
    else if (placeConeRandom > .50) { //50% chance you get a cone1
        cone.img = cone1Img;
        cone.width = cone3Width;
        coneArray.push(cone);
    } 

    if (coneArray.length > 5) {
        coneArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}



// I've stop here: 21:14 
// https://www.youtube.com/watch?v=lgck-txzp9o 
