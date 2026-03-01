const canvas = document.getElementById("circuitCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);

// create small glowing circuits
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: Math.random() * 0.4 - 0.2,
    speedY: Math.random() * 0.4 - 0.2,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,255,150,0.8)";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// subtle thunder flash
setInterval(() => {
  const flash = document.querySelector(".flash");
  flash.style.opacity = 0.2;
  setTimeout(() => (flash.style.opacity = 0), 200);
}, 8000);

// interactive electric ripple
canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 8; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 3,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
    });
  }
});
