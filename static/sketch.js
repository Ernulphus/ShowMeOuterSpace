const WIDTH = 800,
      HEIGHT = 540;
const NUM_STARS = 50;

let stars = [];

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

  let closestStar = 0;
  let closestDist = dist(mouseX, mouseY, stars[0].x, stars[0].y);
  for (let i in stars) {
    let distToStar = dist(mouseX, mouseY, stars[i].x, stars[i].y);
    if (distToStar < closestDist) {
      closestStar = i;
      closestDist = distToStar;
    }
  }
  stroke(255, 255, 50);
  point(stars[closestStar].x, stars[closestStar].y);
}
