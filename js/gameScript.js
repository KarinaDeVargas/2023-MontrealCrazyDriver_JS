/*
FSD10 - User Interfaces
Final Project
Group: Charlie
    Claudiu Mihael Terenche || ID:6268599
    Sophie || ID: 0754336
    Karina de Vargas Pereira || ID:2300594
Date: September 15, 2023
Description: js file for game "Montreal Crazy Driver"
*/

window.addEventListener("load", game); //onload event listener (same as Stephanie uses)

/* -----------------------------Variables-----------------------------------*/
// Variables to define the board
let board;
let boardWidth = 900;
let boardHeight = 350;
let context;

// Variables to define the car
let carWidth = 148;
let carHeight = 100;
let carX = 50;
let carY = boardHeight - carHeight;
let carImg;

let car = {
  x: carX,
  y: carY,
  width: carWidth,
  height: carHeight,
};

// Variables to define the Montreal cones + poutine
let itemArray = [];

let cone1Width = 40;
let cone2Width = 100;
let poutineWidth = 40;

let itemHeight = 50;
let coneX = 1200;
let coneY = boardHeight - itemHeight;

let cone1Img;
let cone2Img;
let poutineImg;

// Game physics variables
let velocityX = -8; //speed for the cones moving to the left (the orinal speed was -8, I thought it could be a little bit slower, so a switched to -4)
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

function setVariables() {
  // Variables to define the car
  carWidth = 148;
  carHeight = 100;
  carX = 50;
  carY = boardHeight - carHeight;

  car = {
    x: carX,
    y: carY,
    width: carWidth,
    height: carHeight,
  };

  itemHeight = 50;
  coneX = 1200;
  coneY = boardHeight - itemHeight;

  gameOver = false;
  score = 0;
}

/* -----------------------------Main Game-----------------------------------*/
// Main function of the game
function game() {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d"); //used for drawing on the board

  // Car image
  carImg = new Image();
  carImg.src = "./img/red_car.png";
  carImg.onload = function () {
    context.drawImage(carImg, car.x, car.y, car.width, car.height);
  };
  // Cone images
  cone1Img = new Image();
  cone1Img.src = "./img/cone1.png";

  cone2Img = new Image();
  cone2Img.src = "./img/cone2.png";

  // Poutine image
  poutineImg = new Image();
  poutineImg.src = "./img/poutine.jpeg"; // Charlie Group, attemping using poutine

  // Method to tell browser to perform an animation
  requestAnimationFrame(update);

  // Method to place cones or poutine
  setInterval(placeItem, 1000); //1000 milliseconds = 1 second

  // Add event listener for keyboard press
  document.addEventListener("keydown", moveCar);
}

// Main function of the gameplay
function update() {
  //If the car crashes with the cone, there's no need to draw any image
  context.clearRect(0, 0, board.width, board.height);

  // Draw car image
  velocityY += gravity;
  car.y = Math.min(car.y + velocityY, carY); // gravity places role, current car.y does not exceed the ground
  context.drawImage(carImg, car.x, car.y, car.width, car.height);

  // Draw item image
  for (let i = 0; i < itemArray.length; i++) {
    let item = itemArray[i];
    item.x += velocityX; // going negative is going to the left
    context.drawImage(item.img, item.x, item.y, item.width, item.height);

    // Detect collision
    if (detectCrash(car, item) && item.type) {
      if (item.type == "poutine") {
        if (!item.passed) {
          item.passed = true;
          increaseScore();
        }
      } else {
        gameOver = true;
        carImg.src = "./img/crashed.png";
        carImg.onload = function () {
          context.drawImage(carImg, car.x, car.y, car.width, car.height);
          setTimeout(function () {
            alert("BOOM ‼️ Game over ‼️ \nYour score is " + score);
          }, 100);
        };
      }
    } else if (item.x + item.width < car.x && !item.passed) {
      if (item.type == "cone") {
        // Car successfully avoided the cone
        item.passed = true;
        increaseScore(); // Increase the score
      }
    }
  }
  // Display the score
  context.font = "30px monospace";
  context.fillStyle = "black";
  context.fillText("Score: " + score, 20, 30);

  if (gameOver) {
    return;
  } else {
    requestAnimationFrame(update);
  }
}

/* -----------------------------Functions for the game-----------------------------------*/
// Increase Score function
function increaseScore() {
  score += 10; // Increase the score by 10 (you can adjust this value)
}

// Move car Function
function moveCar(e) {
  if (gameOver) {
    return;
  }

  // Key events keyboard Space
  if (e.code == "Space") {
    if (car.y == carY) {
      // being car.y is the car object property and carY is the default y position of the car (car on the ground)
      // when the car jumps
      velocityY = -10;
    }
  }
}

// Place Items function
function placeItem() {
  //If the car crashes with the cone, there's no need to draw any image
  if (gameOver) {
    return;
  }

  let cone = {
    img: null,
    x: coneX,
    y: coneY,
    width: null,
    height: itemHeight,
    type: "cone",
    passed: false,
  };

  let poutine = {
    img: null,
    x: coneX,
    y: coneY,
    width: null,
    height: itemHeight,
    type: "poutine",
    passed: false,
  };

  let placeRandomItem = Math.random();

  if (placeRandomItem > 0.8) {
    poutine.img = poutineImg;
    poutine.width = poutineWidth;
    itemArray.push(poutine);
  } else if (placeRandomItem > 0.7) {
    cone.img = cone2Img;
    cone.width = cone2Width;
    itemArray.push(cone);
  } else if (placeRandomItem > 0.5) {
    cone.img = cone1Img;
    cone.width = cone1Width;
    itemArray.push(cone);
  }

  // Avoid accumulation of cones and poutine images to save memory
  if (itemArray.length > 8) {
    itemArray.shift(); //remove the first element from the array
  }
}

// Detect collision function
function detectCrash(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

document.addEventListener("keydown", function (e) {
  if (e.code == "Space" && gameOver) {
    this.location.reload();
  }
});
