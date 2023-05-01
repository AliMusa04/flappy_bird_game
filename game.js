const canvasElem = document.getElementById("cnv");
const canvasCont = canvasElem.getContext("2d");
console.log(canvasElem);

let frame = 0;

const allImage = new Image();
allImage.src = "img/sprite.png";

const bird = {
  animation: [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 },
  ],
  x: 50,
  y: 150,
  width: 34,
  height: 26,
  frame: 0,

  draw: function () {
    let bird = this.animation[this.frame];
    canvasCont.drawImage(
      allImage,
      bird.sX,
      bird.sY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  },
};
const background = {
  sX: 0,
  sY: 0,
  width: 275,
  height: 226,
  x: 0,
  y: canvasElem.height - 130,
  draw: function () {
    canvasCont.drawImage(
      allImage,
      this.sX,
      this.sY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasCont.drawImage(
      allImage,
      this.sX,
      this.sY,
      this.width,
      this.height,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  },
};
const foreground = {
  sX: 276,
  sY: 0,
  width: 224,
  height: 112,
  x: 0,
  y: canvasElem.height - 35,

  draw: function () {
    canvasCont.drawImage(
      allImage,
      this.sX,
      this.sY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasCont.drawImage(
      allImage,
      this.sX,
      this.sY,
      this.width,
      this.height,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  },
};

function paint() {
  //SKY COLOR SET
  canvasCont.fillStyle = "#70c5ce";
  canvasCont.fillRect(0, 0, canvasElem.width, canvasElem.height);

  background.draw();
  foreground.draw();
  bird.draw();
}

function update() {}

function loop() {
  update();
  paint();
  frames++;

  requestAnimationFrame(loop);
}
loop();
