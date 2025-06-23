document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Animated gradient
    let t = 0;
    // Animated circles
    const circles = Array.from({length: 12}, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 32 + Math.random() * 38,
        dx: 0.3 + Math.random() * 0.7,
        dy: 0.3 + Math.random() * 0.7,
        color: i % 2 === 0 ? 'rgba(180,180,180,0.18)' : 'rgba(120,120,120,0.13)'
    }));

    function draw() {
        ctx.clearRect(0, 0, w, h);
        // Animated gradient
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#C4C3B9');
        grad.addColorStop(0.5 + 0.2 * Math.sin(t/80), '#e0e0e0');
        grad.addColorStop(1, '#C4C3B9');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        // Draw animated circles
        for (const c of circles) {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
            ctx.fillStyle = c.color;
            ctx.fill();
            // Move
            c.x += c.dx * Math.sin(t/100 + c.r);
            c.y += c.dy * Math.cos(t/120 + c.r);
            // Bounce
            if (c.x < -c.r) c.x = w + c.r;
            if (c.x > w + c.r) c.x = -c.r;
            if (c.y < -c.r) c.y = h + c.r;
            if (c.y > h + c.r) c.y = -c.r;
        }
        t += 1;
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    });
});