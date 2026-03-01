const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Dots & lines
const dots = [];
for(let i=0;i<120;i++){
  dots.push({
    x: Math.random()*width,
    y: Math.random()*height,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5,
    size: Math.random()*2+1
  });
}

// Lightning flash
function lightning(){
  const flash = document.querySelector('.flash');
  flash.style.opacity = 0.6;
  setTimeout(()=> flash.style.opacity = 0, 100 + Math.random()*200);
}

// Animation
function animate(){
  ctx.clearRect(0,0,width,height);

  // Diagonal streaks
  for(let i=0;i<dots.length;i++){
    let d = dots[i];
    d.x += d.vx; d.y += d.vy;

    if(d.x<0||d.x>width) d.vx*=-1;
    if(d.y<0||d.y>height) d.vy*=-1;

    ctx.beginPath();
    ctx.arc(d.x,d.y,d.size,0,Math.PI*2);
    ctx.fillStyle = '#7fff00';
    ctx.fill();
    ctx.closePath();
  }

  // Connect dots with lines if close
  for(let i=0;i<dots.length;i++){
    for(let j=i+1;j<dots.length;j++){
      let d1 = dots[i], d2 = dots[j];
      let dist = Math.hypot(d1.x-d2.x,d1.y-d2.y);
      if(dist<120){
        ctx.beginPath();
        ctx.moveTo(d1.x,d1.y);
        ctx.lineTo(d2.x,d2.y);
        ctx.strokeStyle = 'rgba(127,255,0,'+(1-dist/120)+')';
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Window resize
window.addEventListener('resize', ()=>{
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Random lightning every 8-12 seconds
setInterval(lightning, 8000 + Math.random()*4000);
