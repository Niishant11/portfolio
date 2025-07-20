// Background Animation: Floating Dots/Particles
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
let particles = [];
const particleCount = w > 700 ? 52 : 28;

function resizeCanvas() {
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w; canvas.height = h;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function makeParticles() {
  particles = [];
  for(let i=0;i<particleCount;++i) {
    particles.push({
      x: Math.random()*w, y: Math.random()*h,
      r: 1.1 + Math.random()*1.7,
      s: 0.5 + Math.random()*1.2,
      a: Math.random()*Math.PI*2,
      color: `hsla(${180+Math.random()*90},75%,65%,.24)`
    });
  }
}
makeParticles();

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.x += Math.cos(p.a)*p.s*0.7; 
    p.y += Math.sin(p.a)*p.s*0.7;
    if(p.x<0 || p.x>w || p.y<0 || p.y>h) {
      p.x = Math.random()*w;
      p.y = Math.random()*h;
    }
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color; ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => { makeParticles(); });

/* Section Animation On Scroll */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.animate-section').forEach(sec => observer.observe(sec));

/* Smooth Scroll for Navigation */
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) window.scrollTo({top:target.offsetTop-44, behavior:'smooth'});
  });
});

/* Contact Demo */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('formStatus').textContent = "Demo only. Replace with Formspree or server to receive real messages.";
  this.reset();
});
