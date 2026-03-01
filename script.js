const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
});

// Random moving dots
class Dot {
  constructor() {
    this.x = Math.random()*width;
    this.y = Math.random()*height;
    this.radius = Math.random()*2+1;
    this.speedX = Math.random()*0.5-0.25;
    this.speedY = Math.random()*0.5-0.25;
  }
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x<0||this.x>width)this.speedX*=-1;
    if(this.y<0||this.y>height)this.speedY*=-1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fillStyle="#00ff99";
    ctx.fill();
  }
}

const dots = [];
for(let i=0;i<150;i++) dots.push(new Dot());

// Meteors
class Meteor{
  constructor(){
    this.reset();
  }
  reset(){
    this.x = Math.random()*width;
    this.y = -10;
    this.length = Math.random()*50+20;
    this.speedY = Math.random()*4+2;
    this.speedX = Math.random()*2-1;
    this.opacity = Math.random()*0.5+0.5;
  }
  move(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.y>height+10)this.reset();
  }
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x-this.speedX*10,this.y-this.length);
    ctx.strokeStyle = `rgba(0,255,153,${this.opacity})`;
    ctx.stroke();
  }
}

const meteors=[];
for(let i=0;i<5;i++) meteors.push(new Meteor());

// Lightning
let lightningTimer = 0;
function lightning(){
  if(Math.random()<0.002){
    lightningTimer = 5;
  }
}

function drawLightning(){
  if(lightningTimer>0){
    ctx.fillStyle = "rgba(0,255,255,0.15)";
    ctx.fillRect(0,0,width,height);
    lightningTimer--;
  }
}

function animate(){
  ctx.clearRect(0,0,width,height);
  
  // dots
  for(let d of dots){ d.move(); d.draw(); }
  
  // meteors
  for(let m of meteors){ m.move(); m.draw(); }
  
  // lightning
  lightning();
  drawLightning();

  requestAnimationFrame(animate);
}
animate();
