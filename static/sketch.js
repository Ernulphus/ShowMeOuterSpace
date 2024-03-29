const WIDTH = 700,
      HEIGHT = 540;
const NUM_STARS = 20;

let canvas = null,
  nameInput = null;

let stars = [];
let closestStar = 0;

let firstSelectedStar = null;
let secondSelectedStar = null;

let firstSelectedArr = [];
let secondSelectedArr = [];

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent('p5-container');

  nameInput = select("#constellationName");

  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({x: random(10, WIDTH - 10),
                y: random(10, HEIGHT - 10),
                size: random(5, 8)
               });
  }
}

function draw() {
  smooth();

  drawLines();

  stroke(150, 150, 50);
  for (let i in stars) {
    strokeWeight(stars[i].size);
    point(stars[i].x, stars[i].y);
  }

  stroke(255, 255, 50);
  point(stars[closestStar].x, stars[closestStar].y);

  if (firstSelectedStar) {
    stroke(255, 0, 0);
    point(stars[firstSelectedStar].x, stars[firstSelectedStar].y);
  }
}

function mouseMoved() {
  let closestDist = dist(mouseX, mouseY, stars[0].x, stars[0].y);
  closestStar = 0;
  for (let i in stars) {
    let distToStar = dist(mouseX, mouseY, stars[i].x, stars[i].y);
    if (distToStar < closestDist) {
      closestStar = i;
      closestDist = distToStar;
    }
  }
}

function isWithinCanvas() {
  let insideX = (0 <= mouseX && mouseX <= WIDTH);
  let insideY = (0 <= mouseY && mouseY <= HEIGHT);
  if (insideX && insideY) {
    return true;
  }
  return false;
}

function mouseClicked() {
  if (!isWithinCanvas()) return;
  if (firstSelectedStar === null) {
    firstSelectedStar = closestStar;
    firstSelectedArr.push(stars[firstSelectedStar]);
    // console.log("First : " + firstSelectedStar);
  }
  else {
    secondSelectedStar = closestStar;
    if (firstSelectedStar !== secondSelectedStar) {
      secondSelectedArr.push(stars[secondSelectedStar]);
      // console.log("First : " + firstSelectedStar);
      // console.log("Second : " + secondSelectedStar);
      firstSelectedStar = null;
    }
    else {
      firstSelectedStar = null;
      secondSelectedStar = null;
    }
  }
}

function drawLines() {
  strokeWeight(3);
  stroke(150);
  for (i = 0; i < secondSelectedArr.length; i++) {
    let { x: x1, y: y1 } = firstSelectedArr[i];
    let { x: x2, y: y2 } = secondSelectedArr[i];
    line(x1, y1, x2, y2);
  }
}

function sendToServer() {
  let c = get();
  let imgURL = c.canvas.toDataURL("image/png");
  imgURL = imgURL.replace(/^data:image\/(png|jpg);base64,/, "");
  let formData = new FormData();
  formData.append("constellationImg", imgURL);
  let constellationName = nameInput.value();
  formData.append("constellationName", constellationName);
  axios.post('/saves', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

function saveToComputer() {
  let name = nameInput.value() || "constellation";
  saveCanvas(name);
}

/*
 *function saveImageToComputer() {
 *  let constellationName = document.querySelector(".constellation-name");
 *  saveCanvas(constellationName.value, 'png');
 *}
 *
 *function setListeners() {
 *  // let saveButton = document.querySelector(".button-save");
 *  // saveButton.addEventListener("click", saveImage);
 *  let saveButton = document.querySelector(".button-save");
 *  saveButton.addEventListener("click", saveImageToComputer);
 *}
 *
 *window.onload = setListeners;
 */
