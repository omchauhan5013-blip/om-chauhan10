// ===== Typing Effect =====
const phrases = ["beautiful websites.", "stunning brand designs.", "e-commerce solutions.", "creative visuals."];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typedText");

function type() {
    if (!typedEl) return;
    const current = phrases[phraseIndex];
    typedEl.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
    let speed = isDeleting ? 30 : 60;
    if (!isDeleting && charIndex > current.length) { speed = 2000; isDeleting = true; }
    if (isDeleting && charIndex < 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 400; }
    setTimeout(type, speed);
}
type();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
});

// ===== Advanced Custom Cursor =====
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let isMoving = false;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving && cursorDot && cursorRing) {
        cursorDot.style.opacity = "1";
        cursorRing.style.opacity = "1";
        isMoving = true;
    }

    if (cursorDot) {
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    }
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover effect for clickable elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .journey-card, input, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ===== Counter Animation =====
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
            count += step;
            if (count >= target) { count = target; clearInterval(timer); }
            el.textContent = count + "+";
        }, 40);
        countObserver.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll(".stat-number").forEach(el => countObserver.observe(el));

// ===== Contact Form =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        let text = `Hi Om, my name is ${name}.`;
        if (subject) text += `\n\n*Subject:* ${subject}`;
        text += `\n\n${message}`;

        // Encode the text for URL
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/919016048054?text=${encodedText}`, '_blank');

        const btn = document.getElementById("submitBtn");
        btn.textContent = 'OPENING WHATSAPP... ✓';
        btn.style.background = "#10b981";
        btn.style.color = "#fff";

        setTimeout(() => {
            btn.textContent = 'SEND MESSAGE';
            btn.style.background = "";
            e.target.reset();
        }, 3000);
    });
}

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        try {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        } catch (err) {
            console.error("Invalid selector:", href);
        }
    });
});
// ===== Background Particle Animation =====
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(90, 82, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        const count = Math.floor((width * height) / 12000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, i) => {
            p.update();
            p.draw();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.strokeStyle = `rgba(90, 82, 255, ${0.12 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();
}
