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


// Exemple of a canvas board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); //used for drawing on the board

}