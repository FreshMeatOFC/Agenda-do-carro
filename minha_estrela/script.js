document.addEventListener('DOMContentLoaded', () => {
    // 1. Starfield Background Animation
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');

    let width, height, stars;

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        stars = [];

        // Number of stars based on screen size
        const numStars = Math.floor(width * height / 3000);

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                alpha: Math.random(),
                speed: Math.random() * 0.05
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw Stars
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();

            // Twinkle effect
            star.alpha += (Math.random() - 0.5) * 0.02;
            if (star.alpha < 0) star.alpha = 0;
            if (star.alpha > 1) star.alpha = 1;

            // Slow Movement
            star.y -= star.speed;
            if (star.y < 0) star.y = height;
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    animate();


    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .card');
    animatedElements.forEach(el => observer.observe(el));


    // 3. Typing Effect for "Minha Estrela"
    const textElement = document.querySelector('.typing-effect');
    const textToType = "Minha Estrela";
    const typingSpeed = 150;

    // Clear initial text (it was in HTML for SEO/fallback)
    textElement.textContent = "";

    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Remove blinking cursor class after typing finishes
             setTimeout(() => {
                 textElement.classList.remove('typing-effect');
                 // Re-add a solid border or just remove the effect depending on CSS
                 // In our CSS, the cursor is ::after on the class, so removing the class removes the cursor.
             }, 1000);
        }
    }

    // Start typing after a short delay
    setTimeout(typeText, 1000);
});
