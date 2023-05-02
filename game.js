//BOARD
let canvasElem;
let canvasElemHeight = 640;
let canvasElemWidth = 360;
let canvasCont;

//BIRD setup

let birdWidth = 34;
let birdHeight = 24;
let birdX = canvasElemWidth / 8;
let birdY = canvasElemHeight / 2;
let birdImg;

let bird = {
  width: birdWidth,
  height: birdHeight,
  x: birdX,
  y: birdY,
};

window.onload = function () {
  canvasElem = document.getElementById("cnv");
  canvasElem.height = canvasElemHeight;
  canvasElem.width = canvasElemWidth;
  canvasCont = canvasElem.getContext("2d");

  // canvasCont.fillStyle = "green";
  // canvasCont.fillRect(bird.x, bird.y, bird.width, bird.height);

  birdImg = new Image();
  birdImg.src = "./img/flappybird.png";

  birdImg.onload = function () {
    canvasCont.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };
};
