document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // Wait 1.5s for the logo animation to play fully
    });

    // 2. Typing Animation
    const typingText = document.querySelector('.typing-text');
    const words = ["Front-End Developer", "UI Enthusiast", "Creative Coder"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
            typingText.textContent = currentWord.substring(0, charIndex);
        } else {
            charIndex++;
            typingText.textContent = currentWord.substring(0, charIndex);
        }

        // Typing Speed
        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end to display full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 2000); // Delay start slightly

    // 3. Scroll Reveal Animation
    const sr = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => sr.observe(el));

    // 4. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // Optional: Add animation to hamburger icon later
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 5. Smooth Scroll for Anchor Links (Legacy support + smooth behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Particle Background Animation
    const canvas = document.getElementById('particles');
    // Check if canvas exists to avoid errors on pages without it (just in case)
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let particlesArray;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; // Random size between 1 and 3
                this.speedX = Math.random() * 1 - 0.5; // Random horizontal speed
                this.speedY = Math.random() * 1 - 0.5; // Random vertical speed
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`; // Transparent white
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Boundary check - bounce off walls
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = (canvas.width * canvas.height) / 15000; // Density
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        initParticles();
        animateParticles();
    }
});
