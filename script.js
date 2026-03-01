const canvas=document.getElementById("circuitCanvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

for(let i=0;i<120;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4,
size:Math.random()*2+1

})

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle="#00ffcc";
ctx.fill();

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0)p.x=canvas.width;
if(p.x>canvas.width)p.x=0;
if(p.y<0)p.y=canvas.height;
if(p.y>canvas.height)p.y=0;

})

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx=particles[a].x-particles[b].x;
let dy=particles[a].y-particles[b].y;

let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){

ctx.beginPath();
ctx.strokeStyle="rgba(0,255,200,0.15)";
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();

}

}

}

requestAnimationFrame(animate);

}

animate();


setInterval(()=>{

const flash=document.querySelector(".flash");

flash.style.opacity=0.2;

setTimeout(()=>{

flash.style.opacity=0;

},150);

},9000);


document.addEventListener("mousemove",(e)=>{

const spark=document.createElement("div");

spark.className="spark";

spark.style.left=e.clientX+"px";
spark.style.top=e.clientY+"px";

document.body.appendChild(spark);

setTimeout(()=>{

spark.remove();

},600);

});


function toggleEvent(id){

const el=document.getElementById(id);

if(el.style.display==="block"){

el.style.display="none";

}else{

el.style.display="block";

}

}


const eventDate=new Date("March 25, 2026 09:00:00").getTime();

setInterval(()=>{

const now=new Date().getTime();

const distance=eventDate-now;

const days=Math.floor(distance/(1000*60*60*24));
const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
const seconds=Math.floor((distance%(1000*60))/1000);

document.getElementById("days").innerText=days;
document.getElementById("hours").innerText=hours;
document.getElementById("minutes").innerText=minutes;
document.getElementById("seconds").innerText=seconds;

},1000);
