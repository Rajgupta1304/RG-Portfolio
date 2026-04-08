document.addEventListener("DOMContentLoaded", () => {

  const glow = document.getElementById("glow");

  // Mouse Move Effects
  document.addEventListener("mousemove", (e) => {
    // Glow
    glow.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(59,130,246,0.15), transparent 150px)`;

    // Ripple
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = e.clientX - 30 + "px";
    ripple.style.top = e.clientY - 40 + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  // Scroll Animation
  const scrollobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll(".hidden").forEach((el) => scrollobserver.observe(el));

  document
    .querySelector(".contact-form")
    .addEventListener("submit", function (e) {
        setTimeout(() => {
      this.reset();
    }, 3000);
    });
    
});


// antigravity effect code in js

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 3 + 1;

    this.speedY = Math.random() * -1.5 - 0.5; // upward motion
    this.speedX = Math.random() * 1 - 0.5;

    this.color = Math.random() > 0.5 ? "#38bdf8" : "#6366f1";
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    // slight floating effect
    this.x += Math.sin(this.y * 0.01);

    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

init();
animate();

// responsive resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

//projects code 
const cards = document.querySelectorAll(".project-card");

const cardobserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
 cardobserver.observe(card);
});

// about section code
const aboutCard = document.querySelector(".about-card");

const aboutobserve = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutCard.classList.add("show");
    }
  });
});

aboutobserve.observe(aboutCard);

emailjs.init("fFfCmrsL8KtOCyfFk");

document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.send("service_txkdeol", "template_i0cqjrk", {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  }).then(() => {
    alert("Message sent successfully!");
  }).catch((err) => {
    alert("Failed to send message");
    console.log(err);
  });
});
