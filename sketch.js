let lines = [];
let offset = 0;
function setup() {
  createCanvas(600, 1100);

  // create some lines
  for (let i = 0; i < 15; i++) {
    lines.push({
      x: random(width),
      y: random(height),
      angle: 0,
      colorOfShape: color(random(255), random(255), random(255)),
      noiseOffsetX: random(100),
      noiseOffsetY: random(100),
      noiseOffsetL: random(100),
      lineLength: random(500, 1550),
      amplitude: random(20, 80),
      frequency: random(0.01, 0.1),
    });
  }
}

function draw() {
  background(0);

  for (let i = 0; i < lines.length; i++) {
    let lineCoord = lines[i];
    let noiseX = noise(lineCoord.noiseOffsetX);
    let noiseY = noise(lineCoord.noiseOffsetY);

    // update the position of the line
    lineCoord.x = map(noiseX, 0, 1, 0, width);
    lineCoord.y = map(noiseY, 0, 1, 0, height);

    // update the angle and length of the line
    let noiseAngle = noise(lineCoord.noiseOffsetX + 100);
    let noiseLength = noise(lineCoord.noiseOffsetL + 200);
    lineCoord.angle =
      map(noiseAngle, 0, 1, 0, TWO_PI) + sin(frameCount * 0.01 + i) * 0.5;
    lineCoord.lineLength =
      map(noiseLength, 0, 1, 50, 150) + sin(frameCount * 0.01 + i) * 50;

    // create the shape of the line using beginShape and vertex
    let shape = beginShape();
    let points = [];
    for (let x = 0; x < lineCoord.lineLength; x++) {
      let y = lineCoord.amplitude * sin(lineCoord.frequency * x + offset);
      points.push({ x: x, y: y });
    }
    for (let j = points.length - 1; j >= 0; j--) {
      let p = points[j];
      let px =
        lineCoord.x + p.x * cos(lineCoord.angle) - p.y * sin(lineCoord.angle);
      let py =
        lineCoord.y + p.x * sin(lineCoord.angle) + p.y * cos(lineCoord.angle);
      vertex(px, py);
    }
    endShape();

    for (let j = 0; j < 10; j++) {
      let size = map(frameCount % 100, 0, 50, 0, 20);
      if (frameCount % 100 > 50) {
        size = map(frameCount % 100, 50, 100, 20, 0);
      }
      let distance = map(j, 0, 10, 0, 50);
      let colorc = lerpColor(
        lineCoord.colorOfShape,
        color(0),
        distance / lineCoord.lineLength
      );
      stroke(colorc);
      strokeWeight(5);
      fill(0, 0, 0, 0);
      ellipse(distance, 0, size, size);
    }
    // noStroke();
    strokeWeight(2);
    lineCoord.noiseOffsetX += 0.001;
    lineCoord.noiseOffsetY += 0.001;
    lineCoord.noiseOffsetL += 0.001;

    let spacing = 5;
    for (let j = 0; j < lineCoord.lineLength; j += spacing) {
      let p = points[j];
      let px =
        lineCoord.x + p.x * cos(lineCoord.angle) - p.y * sin(lineCoord.angle);
      let py =
        lineCoord.y + p.x * sin(lineCoord.angle) + p.y * cos(lineCoord.angle);
      let shape2 = beginShape();
      for (let k = 0; k < 10; k++) {
        let r = map(k, 0, 10, 10, 2);
        let theta = map(frameCount % 100, 0, 100, 0, TWO_PI);
        let x = px + r * cos(theta + k * 0.5);
        let y = py + r * sin(theta + k * 0.5);
        let x2 = px - r * cos(theta + k * 0.5);
        let y2 = py - r * sin(theta + k * 0.5);
        vertex(x, y);
        vertex(x2, y2);
      }
      endShape();
    }
  }
  offset += 0.0001;
}
