const WIDTH = 800,
      HEIGHT = 540;
const NUM_STARS = 10;

let stars = [];
let closestStar = 0;

let firstSelectedStar = null;
let secondSelectedStar = null;

let firstSelectedArr = [];
let secondSelectedArr = [];

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({x: random(WIDTH),
                y: random(HEIGHT),
                size: random(5, 10)
               });
  }
  
}

function draw() {
  background(50);

  stroke(150, 150, 50);
  for (let i in stars) {
    strokeWeight(stars[i].size);
    point(stars[i].x, stars[i].y);
  }

  let closestDist = dist(mouseX, mouseY, stars[0].x, stars[0].y);
  closestStar = 0;
  for (let i in stars) {
    let distToStar = dist(mouseX, mouseY, stars[i].x, stars[i].y);
    if (distToStar < closestDist) {
      closestStar = i;
      closestDist = distToStar;
    }
  }
  stroke(255, 255, 50);
  point(stars[closestStar].x, stars[closestStar].y);
  drawLines();
}

function mouseClicked() {
  if (firstSelectedStar === null) {
    firstSelectedStar = closestStar;
    firstSelectedArr.push(stars[firstSelectedStar]);
  }
  else {
    secondSelectedStar = closestStar;
    if (firstSelectedStar !== secondSelectedStar) {
      secondSelectedArr.push(stars[secondSelectedStar]);
      firstSelectedStar = null;
      console.log(firstSelectedArr);
      console.log(secondSelectedArr);
      console.log(closestStar);
    }
    else {
      firstSelectedStar = null;
      secondSelectedStar = null;
    }
  }
}

function drawLines() {
  for (i = 0; i < secondSelectedArr.length; i++) {
    let { x: x1, y: y1 } = firstSelectedArr[i];
    let { x: x2, y: y2 } = secondSelectedArr[i];
    strokeWeight(3);
    stroke(150);
    line(x1, y1, x2, y2);
  }
}