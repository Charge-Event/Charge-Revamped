function toggleEvent(id){

const content = document.getElementById(id)

if(content.style.display === "block"){
content.style.display = "none"
}
else{
content.style.display = "block"
}

}



const canvas = document.getElementById("circuitCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.5,
vy:(Math.random()-0.5)*0.5
})
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

p.x+=p.vx
p.y+=p.vy

if(p.x<0||p.x>canvas.width)p.vx*=-1
if(p.y<0||p.y>canvas.height)p.vy*=-1

ctx.beginPath()
ctx.arc(p.x,p.y,2,0,Math.PI*2)
ctx.fillStyle="#00fff7"
ctx.fill()

particles.forEach(p2=>{
let dist=Math.hypot(p.x-p2.x,p.y-p2.y)

if(dist<120){
ctx.beginPath()
ctx.moveTo(p.x,p.y)
ctx.lineTo(p2.x,p2.y)
ctx.strokeStyle="rgba(0,255,247,0.1)"
ctx.stroke()
}
})

})

requestAnimationFrame(animate)

}

animate()



const eventDate = new Date("April 1, 2026 09:00:00").getTime()

setInterval(()=>{

let now = new Date().getTime()
let distance = eventDate - now

let days = Math.floor(distance/(1000*60*60*24))

document.getElementById("timer").innerHTML = days + " Days"

},1000)
