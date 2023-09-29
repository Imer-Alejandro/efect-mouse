let starsArr = [];
let hue = 0;
let mouse = {
  x: undefined,
  y: undefined
};

class Star {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 30 + 1;
    this.directionX = Math.random() * 3 - 1.5;
    this.directionY = Math.random() * 3 - 1.5;
    this.color = hue;
  }

  update() {
    this.x = this.x + this.directionX;
    this.y = this.y + this.directionY;

    if (this.size > 0.2) {
      this.size -= 0.2;
    }
  }

  draw() {
    let star = document.createElement("star");
    star.style.width = this.size + "px";
    star.style.height = this.size + "px";
    star.style.left = this.x - this.size / 2 + "px";
    star.style.top = this.y - this.size / 2 + "px";
    star.style.borderColor = "hsl(" + this.color + ", 100%, 50%)";
    document.body.appendChild(star);
  }
}
document.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 2; i++) {
    starsArr.push(new Star());
  }

  hue += 3;
});

document.addEventListener("click", (e) => {
  for (let i = 0; i < 2; i++) {
    starsArr.push(new Star());
  }
});

function starFactory() {
  for (let i = 0; i < starsArr.length; i++) {
    starsArr[i].draw();
    starsArr[i].update();

    for (let j = i; j < starsArr.length; j++) {
      const dx = starsArr[i].x - starsArr[j].x;
      const dy = starsArr[i].y - starsArr[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 20 && distance > 5) {
        createLine(
          starsArr[i].x,
          starsArr[i].y,
          starsArr[j].x,
          starsArr[j].y,
          hue
        );
      }
    }

    if (starsArr[i].size <= 0.3) {
      starsArr.splice(i, 1);
      i--;
    }
  }
}

function createLine(x1, y1, x2, y2, color) {
  distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  xMid = (x1 + x2) / 2;
  yMid = (y1 + y2) / 2;

  let salopeInRadian = Math.atan2(y1 - y2, x1 - x2);
  let salopeInDegres = (salopeInRadian * 180) / Math.PI;

  let line = document.createElement("line");
  line.style.width = distance + "px";
  line.style.top = yMid + "px";
  line.style.left = xMid - distance / 2 + "px";
  line.style.transform = "rotate(" + salopeInDegres + "deg)";
  line.style.borderColor = "hsl(" + color + ", 100%, 50%)";
  document.body.appendChild(line);
}

function animate() {
  let starsArr = document.querySelectorAll("star");
  for (let i = 0; i < starsArr.length; i++) {
    starsArr[i].remove();
  }

  let linesArr = document.querySelectorAll("line");
  for (let i = 0; i < linesArr.length; i++) {
    linesArr[i].remove();
  }

  requestAnimationFrame(animate);
  starFactory();
}
animate();
