

//This script manages the timing for hiding the preloader and showing your main content.

// Add this new code to the top of your script.js file
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Set a timeout to remove the preloader
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                if (mainContent) {
                    mainContent.style.display = 'block';
                    setTimeout(() => {
                        mainContent.classList.remove('hidden');
                        mainContent.classList.add('visible');
                    }, 50); // Small delay to allow fade-in
                }
            }, 1000); // Wait for the fade-out transition to complete
        }
    }, 2500); // Total animation duration: 2.5s (pulse) + 1s (fade-out)
});





document.addEventListener('DOMContentLoaded', () => {

    // ========== Modal and Form Handling ==========
    const modal = document.getElementById("authModal");
    const signinBtn = document.getElementById("signinBtn");
    const closeBtn = document.querySelector(".close");
    const signinForm = document.getElementById("signinForm");
    const signupForm = document.getElementById("signupForm");
    const contactForm = document.getElementById("contactForm");
    const sendBtn = document.getElementById("sendBtn");




    if (signinBtn) {
        signinBtn.onclick = () => {
            modal.style.display = "flex";
            signinForm.style.display = "block";
            signupForm.style.display = "none";
        };
    }
    if (closeBtn) {
        closeBtn.onclick = () => { modal.style.display = "none"; };
    }
    if (modal) {
        window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
    }

    window.showSignUp = function() {
        signinForm.style.display = "none";
        signupForm.style.display = "block";
    };
    window.showSignIn = function() {
        signupForm.style.display = "none";
        signinForm.style.display = "block";
    };

    // ========== Hero Slider ==========
    let slideIndex = 0;
    const slides = document.querySelectorAll(".hero-slider .slide");
    const dots = document.querySelectorAll(".slider-dots .dot");

    if (slides.length > 0) {
        function showSlide(n) {
            slides.forEach((slide, i) => {
                slide.classList.remove("active");
                if (dots[i]) dots[i].classList.remove("active");
            });
            slides[n].classList.add("active");
            if (dots[n]) dots[n].classList.add("active");
        }

        function nextSlide() {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
        }
        setInterval(nextSlide, 4000);

        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.addEventListener("click", () => {
                    slideIndex = i;
                    showSlide(i);
                });
            });
        }
    }

    // ========== Canvas Background ==========
    const canvas = document.getElementById('techCanvas');
    let particles = [];
    const maxParticles = 100;
    const connectionDistance = 120;
    const particleSpeed = 0.5;
    
    // Load the Logo Image
    const kibotechLogo = new Image();
    kibotechLogo.src = 'images/Kibotech.logo.jpeg'; 
    let logoLoaded = false;
    kibotechLogo.onload = () => {
        logoLoaded = true;
    };
    
    // Only run canvas code if the canvas element exists
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Particle(x, y) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * particleSpeed;
            this.vy = (Math.random() - 0.5) * particleSpeed;
            this.radius = Math.random() * 2 + 1;
            this.color = 'rgba(255, 255, 255, 0.6)';
        }

        Particle.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        };

        Particle.prototype.update = function() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) this.vx *= -1;
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) this.vy *= -1;
        };

        function initParticles() {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / connectionDistance)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function drawCompanyName() {
            if (logoLoaded) {
                const logoWidth = 200;
                const logoHeight = (kibotechLogo.naturalHeight / kibotechLogo.naturalWidth) * logoWidth;
                const x = (canvas.width / 2) - (logoWidth / 2);
                const y = (canvas.height / 2) - (logoHeight / 2);

                ctx.globalAlpha = 0.1;
                ctx.drawImage(kibotechLogo, x, y, logoWidth, logoHeight);
                ctx.globalAlpha = 1.0;
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawConnections();
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            drawCompanyName(); 
            requestAnimationFrame(animate);
        }
        initParticles();
        animate();

        canvas.addEventListener('mousemove', (e) => {
            if (particles.length < maxParticles + 10) {
                const newParticle = new Particle(e.clientX, e.clientY);
                newParticle.radius = 0;
                newParticle.color = 'rgba(255, 184, 0, 0.8)';
                particles.push(newParticle);
            }
        });
    }

    // ========== Contact Form Submission ==========
    if (contactForm && sendBtn) {
        sendBtn.addEventListener('click', async (e) => {
            console.log('Button click event triggered!'); 
            e.preventDefault(); 
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log('Success:', result);
                alert('Message sent successfully!');
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});