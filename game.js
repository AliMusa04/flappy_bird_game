//BOARD
let canvasElem;
let canvasElemHeight = 640;
let canvasElemWidth = 360;
let canvasContxt;

//BIRD SETUP

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
//PIPES SETUP
let pipesArr = [];
let topPipe;
let topPipeWidth = 64;
let topPipeHeight = 512;
let pipeX = canvasElemWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//GAME PHYSIQUE
let velocityX = -2;
let velocityY = 0;
let gravity = 0.3;

window.onload = function () {
  canvasElem = document.getElementById("cnv");
  canvasElem.height = canvasElemHeight;
  canvasElem.width = canvasElemWidth;
  canvasContxt = canvasElem.getContext("2d");

  // canvasCont.fillStyle = "green";
  // canvasCont.fillRect(bird.x, bird.y, bird.width, bird.height);

  birdImg = new Image();
  birdImg.src = "./img/flappybird.png";

  birdImg.onload = function () {
    canvasContxt.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  //PIPES IMG
  topPipeImg = new Image();
  topPipeImg.src = "./img/toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./img/bottompipe.png";

  requestAnimationFrame(update);
  setInterval(createPipe, 1500);
  canvasElem.addEventListener("click", moveBird);
};

function update() {
  requestAnimationFrame(update);
  canvasContxt.clearRect(0, 0, canvasElemWidth, canvasElemHeight);

  // draw bird
  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  canvasContxt.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  //DRAW PIPE
  pipesArr.forEach((pipe) => {
    pipe.x += velocityX;
    canvasContxt.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
  });
}

function createPipe() {
  let randomPipeY =
    pipeY - topPipeHeight / 4 - Math.random() * (topPipeHeight / 2);

  let space = canvasElem.height / 4.5;

  console.log(space);
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: topPipeWidth,
    height: topPipeHeight,
    passed: false,
  };

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + topPipeHeight + space,
    width: topPipeWidth,
    height: topPipeHeight,
    passed: false,
  };
  pipesArr.push(topPipe);
  pipesArr.push(bottomPipe);
}

function moveBird() {
  velocityY = -6;
}
