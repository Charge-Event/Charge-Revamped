const canvas = document.getElementById("circuitCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

// Diagonal moving dots
const dots = [];
for (let i = 0; i < 150; i++) {
  dots.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0.3 + Math.random() * 0.7,
    vy: 0.3 + Math.random() * 0.7,
    radius: Math.random() * 2 + 1
  });
}

// Meteors
const meteors = [];
for (let i = 0; i < 3; i++) {
  meteors.push({
    x: Math.random() * width,
    y: Math.random() * height / 2,
    length: Math.random() * 150 + 50,
    speed: Math.random() * 4 + 2
  });
}

// Lightning
let lightningFlash = false;
let lightningTimer = 0;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
});

function animate() {
  ctx.fillStyle = "#000020";
  ctx.fillRect(0, 0, width, height);

  // Draw diagonal moving dots
  ctx.fillStyle = "#00f0ff";
  dots.forEach(dot => {
    dot.x += dot.vx;
    dot.y += dot.vy;
    if (dot.x > width) dot.x = 0;
    if (dot.y > height) dot.y = 0;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Lines between close dots
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(0, 255, 234, ${1 - dist / 120})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  // Meteors
  meteors.forEach(m => {
    ctx.strokeStyle = "rgba(0,255,150,0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.length, m.y + m.length / 4);
    ctx.stroke();
    m.x += m.speed;
    if (m.x > width + 100) {
      m.x = -200;
      m.y = Math.random() * height / 2;
      m.length = Math.random() * 150 + 50;
      m.speed = Math.random() * 4 + 2;
    }
  });

  // Lightning
  lightningTimer++;
  if (lightningTimer > 600) {
    lightningFlash = Math.random() < 0.5;
    lightningTimer = 0;
  }
  if (lightningFlash) {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(0, 0, width, height);
  }

  requestAnimationFrame(animate);
}

animate();
