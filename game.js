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
let score = 0;

let gameOver = false;

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
  if (gameOver) {
    return;
  }
  canvasContxt.clearRect(0, 0, canvasElemWidth, canvasElemHeight);

  if (bird.y > canvasElem.height) {
    gameOver = true;
  }
  // draw bird
  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  canvasContxt.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  //DRAW PIPE
  pipesArr.forEach((pipe) => {
    pipe.x += velocityX;
    canvasContxt.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }
    if (detectFail(bird, pipe)) {
      gameOver = true;
    }
  });

  //CLEAR PIPES
  while (pipesArr.length > 0 && pipesArr[0].x < -topPipeWidth) {
    pipesArr.shift();
  }
  //SCORE
  canvasContxt.fillStyle = "white";
  canvasContxt.font = "45px sans-serif";
  canvasContxt.fillText(score, 5, 45);

  if (gameOver) {
    canvasContxt.fillText("GAME OVER", 40, canvasElem.height / 2);
  }
}

function createPipe() {
  if (gameOver || bird.y > canvasElem.height) {
    return;
  }
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

  //RESET
  if (gameOver) {
    bird.y = birdY;
    pipesArr = [];
    score = 0;
    gameOver = false;
  }
}

function detectFail(bird, pipe) {
  return (
    bird.x < pipe.x + pipe.width &&
    bird.x + bird.width > pipe.x &&
    bird.y < pipe.y + pipe.height &&
    bird.y + bird.height > pipe.y
  );
}
