const canvas = document.getElementById("circuitCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let lines = [];

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

window.addEventListener("resize",resize);

/* create particles */
for(let i=0;i<120;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4,
size:Math.random()*2+1

})

}

/* animation loop */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

/* particles */

particles.forEach(p=>{

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle="#00ffcc";
ctx.fill();

p.x+=p.vx;
p.y+=p.vy;

/* wrap edges */

if(p.x<0)p.x=canvas.width;
if(p.x>canvas.width)p.x=0;
if(p.y<0)p.y=canvas.height;
if(p.y>canvas.height)p.y=0;

});

/* draw pcb style connections */

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx=particles[a].x-particles[b].x;
let dy=particles[a].y-particles[b].y;

let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){

ctx.beginPath();
ctx.strokeStyle="rgba(0,255,200,0.15)";
ctx.lineWidth=1;
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();

}

}

}

requestAnimationFrame(animate);

}

animate();

/* electric click ripple */

canvas.addEventListener("click",(e)=>{

for(let i=0;i<15;i++){

particles.push({

x:e.clientX,
y:e.clientY,
vx:(Math.random()-0.5)*3,
vy:(Math.random()-0.5)*3,
size:Math.random()*3

})

}

});

/* lightning flash */

setInterval(()=>{

const flash=document.querySelector(".flash");

flash.style.opacity=0.25;

setTimeout(()=>{

flash.style.opacity=0;

},150);

},9000);


/* event toggle */

function toggleEvent(id){

const el=document.getElementById(id);

if(el.style.display==="block"){
el.style.display="none";
}
else{
el.style.display="block";
}

}
