/**
 * Premium Particle Cursor Effect
 * Adds a trail of glowing particles following the mouse cursor.
 */

(function () {
    // strict mode
    'use strict';

    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-particles';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Canvas Styles
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998'; // Just below the main cursor (z-index 9999)
    canvas.style.mixBlendMode = 'screen'; // Blends nicely with dark background

    // Configuration
    let width = window.innerWidth;
    let height = window.innerHeight;
    const particles = [];
    const colors = [
        '255, 255, 255', // White
        '59, 130, 246',  // Primary Blue (from CSS)
        '100, 180, 255'  // Lighter Blue
    ];

    // Resize Handler
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle Class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // Random size between 0.5 and 2.5
            this.size = Math.random() * 2 + 0.5;
            // Random velocity
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            // Random color from palette
            this.color = colors[Math.floor(Math.random() * colors.length)];
            // Initial opacity
            this.alpha = 1;
            // Decay rate (lifespan)
            this.decay = Math.random() * 0.02 + 0.01;
            // Shape: circle or square
            this.shape = Math.random() > 0.8 ? 'square' : 'circle';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            // Shrink slightly
            if (this.size > 0.2) this.size -= 0.05;
            // Fade out
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = `rgb(${this.color})`;
            ctx.beginPath();

            if (this.shape === 'circle') {
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            } else {
                ctx.rect(this.x, this.y, this.size * 2, this.size * 2);
            }

            ctx.fill();
            // Glow effect
            ctx.shadowBlur = 5;
            ctx.shadowColor = `rgb(${this.color})`;
            ctx.restore();
        }
    }

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false; // Optional optimization

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Spawn particles on move
        // Increase number for denser trail (e.g. 2-4)
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    });

    // Animation Loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Enable additive blending for glow effect
        ctx.globalCompositeOperation = 'lighter';

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Remove dead particles
            if (particles[i].alpha <= 0 || particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }
    animate();

})();
