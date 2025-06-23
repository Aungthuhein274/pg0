window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animated circles (bubbles) for a lively effect
    const circles = Array.from({length: 18}, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 18 + Math.random() * 22,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
        color: `rgba(131,112,96,${0.10 + Math.random() * 0.18})` // subtle brownish
    }));

    function drawBackground() {
        // Silver Sand base color #C4C3B9
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#C4C3B9');
        grad.addColorStop(1, '#E0DFD6');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawCircles() {
        for (const c of circles) {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
            ctx.fillStyle = c.color;
            ctx.fill();
        }
    }

    function updateCircles() {
        for (const c of circles) {
            c.x += c.dx;
            c.y += c.dy;
            // Bounce off edges
            if (c.x - c.r < 0 || c.x + c.r > canvas.width) c.dx *= -1;
            if (c.y - c.r < 0 || c.y + c.r > canvas.height) c.dy *= -1;
        }
    }

    function animate() {
        drawBackground();
        drawCircles();
        updateCircles();
        requestAnimationFrame(animate);
    }
    animate();
});