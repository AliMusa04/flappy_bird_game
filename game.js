const canvasElem = document.getElementById("cnv");
const canvasCont = canvasElem.getContext("2d");
console.log(canvasElem);

let frame = 0;

const allImage = new Image();
allImage.src = "img/sprite.png";

const background = {
  sX: 123,
  sY: 23,
  sWidth: 213,
  sHeight: 123,
  x: 12,
  y: 23,
};
function paint() {
  //SKY COLOR SET
  canvasCont.fillStyle = "#70c5ce";
  canvasCont.fillRect(0, 0, canvasElem.width, canvasElem.height);
}

function update() {}

function loop() {
  update();
  paint();
  frames++;

  requestAnimationFrame(loop);
}
loop();
