/* ===== STARFIELD ===== */

const sCanvas=document.getElementById("stars");
const sctx=sCanvas.getContext("2d");

function resize(){
 sCanvas.width=innerWidth;
 sCanvas.height=innerHeight;
 mCanvas.width=innerWidth;
 mCanvas.height=innerHeight;
 fCanvas.width=innerWidth;
 fCanvas.height=innerHeight;
}
addEventListener("resize",resize);

let stars=Array.from({length:200},()=>({
 x:Math.random()*innerWidth,
 y:Math.random()*innerHeight,
 r:Math.random()*2
}));

function starAnim(){
 sctx.clearRect(0,0,innerWidth,innerHeight);
 stars.forEach(s=>{
  sctx.beginPath();
  sctx.arc(s.x,s.y,s.r,0,Math.PI*2);
  sctx.fillStyle="white";
  sctx.fill();
 });
 requestAnimationFrame(starAnim);
}
starAnim();

/* ===== METEORS ===== */

const mCanvas=document.getElementById("meteors");
const mctx=mCanvas.getContext("2d");

let meteors=Array.from({length:25},()=>({
 x:Math.random()*innerWidth,
 y:Math.random()*innerHeight,
 l:Math.random()*80+30,
 s:Math.random()*6+4
}));

function meteorRain(){
 mctx.clearRect(0,0,innerWidth,innerHeight);
 meteors.forEach(m=>{
  m.x+=m.s;
  m.y+=m.s;
  mctx.strokeStyle="white";
  mctx.beginPath();
  mctx.moveTo(m.x,m.y);
  mctx.lineTo(m.x-m.l,m.y-m.l);
  mctx.stroke();

  if(m.x>innerWidth||m.y>innerHeight){
   m.x=Math.random()*-200;
   m.y=Math.random()*innerHeight;
  }
 });
 requestAnimationFrame(meteorRain);
}
meteorRain();

/* ===== COUNTDOWN ===== */

const cd=document.getElementById("countdown");
const today=new Date();
const target=new Date(today.getFullYear(),1,9);

setInterval(()=>{
 let diff=target-new Date();
 if(diff<=0){
  cd.innerHTML="🎉 IT'S YOUR DAY 🎉";
  return;
 }
 cd.innerHTML=
  Math.floor(diff/86400000)+" Days "+
  Math.floor(diff/3600000)%24+" Hrs "+
  Math.floor(diff/60000)%60+" Min";
},1000);

/* ===== SCROLL REVEAL ===== */

const obs=new IntersectionObserver(e=>{
 e.forEach(x=>{
  if(x.isIntersecting) x.target.classList.add("unlocked");
 });
},{threshold:.3});

document.querySelectorAll(".day").forEach(d=>obs.observe(d));

/* ===== ASTRO TYPEWRITER ===== */

const msgs=[
"✨ Career breakthroughs await you.",
"💖 Love energies glow brighter this year.",
"💰 Financial stability and surprise gains.",
"🌙 Travel and spiritual growth incoming.",
"🌱 Confidence and joy multiply."
];

document.getElementById("reveal").onclick=()=>{
 let msg=msgs[Math.floor(Math.random()*msgs.length)];
 let i=0;
 const el=document.getElementById("prediction");
 el.innerHTML="";
 const t=setInterval(()=>{
  el.innerHTML+=msg[i++];
  if(i>=msg.length) clearInterval(t);
 },40);
};

/* ===== MUSIC ===== */

const music=document.getElementById("bgMusic");
document.querySelector(".music-toggle").onclick=()=>{
 music.paused?music.play():music.pause();
};

/* ===== FIREWORKS ===== */

const fCanvas=document.getElementById("fireworks");
const fctx=fCanvas.getContext("2d");

document.getElementById("celebrateBtn")?.addEventListener("click",()=>{
 let parts=[];
 for(let i=0;i<300;i++){
  parts.push({
   x:innerWidth/2,
   y:innerHeight/2,
   vx:(Math.random()-.5)*14,
   vy:(Math.random()-.5)*14,
   life:100,
   c:`hsl(${Math.random()*360},100%,60%)`
  });
 }

 function boom(){
  fctx.clearRect(0,0,innerWidth,innerHeight);
  parts.forEach(p=>{
   p.x+=p.vx;
   p.y+=p.vy;
   p.vy+=.2;
   p.life--;
   fctx.fillStyle=p.c;
   fctx.fillRect(p.x,p.y,4,4);
  });
  parts=parts.filter(p=>p.life>0);
  if(parts.length) requestAnimationFrame(boom);
 }
 boom();
});

resize();
