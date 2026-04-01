<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Firework Animation</title>
  <style>
    body {
      margin: 0;
      background: rgb(149, 116, 9);
      overflow: hidden;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;
    this.alpha = 1;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.01;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

let particles = [];

function createFirework(x, y) {
  const colors = ["red", "yellow", "blue", "green", "purple", "orange"];
  for (let i = 0; i < 100; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) {
      particles.splice(index, 1);
    }
  });

  
  ctx.save();
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Eugine Lunzalu - sct221-0117/2024", canvas.width / 2, canvas.height - 50);
  ctx.restore();

  requestAnimationFrame(animate);
}

animate();


setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  createFirework(x, y);
}, 1000);
</script>
</body>
</html>
