let points = [];
let numPoints = 10;
let angleStep = 0.1;
let radiusStep = 0.1;
let angle = 0;
let radius = 0;

class Point {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
  update() {
    // Update the radius and angle of the spiral
    // angle += angleStep;
    // radius += radiusStep;
    // Use the updated radius and angle to set the x and y position of the point
    // this.x = cos(angle) * radius;
    // this.y = sin(angle) * radius;
    let noiseScale = 0.01;
    let noiseAmt = 0.01;
    let noiseVal = noise(this.x * noiseScale, this.y * noiseScale);
    this.x = cos(angle) * radius + map(noiseVal, 0, 1, -noiseAmt, noiseAmt);
    this.y = sin(angle) * radius + map(noiseVal, 0, 1, -noiseAmt, noiseAmt);
  }
}

function setup() {
  createCanvas(400, 400);
  background(220);
  translate(width / 2, height / 2);

  let numPoints = 150;
  let angleStep = 0.2;
  let radiusStep = 2;

  for (let i = 0; i < numPoints; i++) {
    let x = cos(i * angleStep) * (i * radiusStep);
    let y = sin(i * angleStep) * (i * radiusStep);
    let size = random(10, 30);
    let colorc = color(random(255), random(255), random(255));
    let point = new Point(x, y, size, colorc);
    points.push(point);
  }
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    point.draw();
    point.update();
  }
}
