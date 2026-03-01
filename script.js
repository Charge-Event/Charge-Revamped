const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const dots = [];
const lines = [];
const lightning = [];

function random(min,max){ return Math.random()*(max-min)+min; }

/* Dots */
for(let i=0;i<120;i++){
  dots.push({x:random(0,width), y:random(0,height), r:Math.random()*2+1});
}

/* Lines (diagonal) */
for(let i=0;i<60;i++){
  lines.push({x:random(0,width), y:random(0,height), len:random(80,150), speed:random(0.2,0.8)});
}

/* Lightning flashes */
function addLightning(){
  lightning.push({x:random(0,width), y:0, w:2, h:height, alpha:1});
}

setInterval(addLightning, 10000);

function animate(){
  ctx.clearRect(0,0,width,height);

  // dots
  ctx.fillStyle = '#0f0';
  dots.forEach(d=>{
    ctx.beginPath();
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fill();
  });

  // diagonal lines
  ctx.strokeStyle='rgba(0,255,0,0.2)';
  lines.forEach(l=>{
    ctx.beginPath();
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x+l.len,l.y+l.len);
    ctx.stroke();
    l.x+=l.speed; l.y+=l.speed;
    if(l.x>width) l.x=0;
    if(l.y>height) l.y=0;
  });

  // lightning
  lightning.forEach((l,i)=>{
    ctx.fillStyle='rgba(255,255,255,'+l.alpha+')';
    ctx.fillRect(l.x, l.y, l.w, l.h);
    l.alpha -=0.05;
    if(l.alpha<=0) lightning.splice(i,1);
  });

  requestAnimationFrame(animate);
}
animate();

/* Resize */
window.addEventListener('resize',()=>{
  width=canvas.width=window.innerWidth;
  height=canvas.height=window.innerHeight;
});
