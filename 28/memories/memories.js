window.addEventListener('DOMContentLoaded', () => {
    const bgCanvas = document.getElementById('bg-canvas');
    function drawBg(offsetX = 0, offsetY = 0) {
        if (!bgCanvas) return;
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
        const ctx = bgCanvas.getContext('2d');
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        // Silver Sand base
        ctx.fillStyle = '#C4C3B9';
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        // Parallax ellipse (subtle)
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.ellipse(
            bgCanvas.width / 2 + offsetX * 40,
            bgCanvas.height / 2 + offsetY * 30,
            bgCanvas.width * 0.55,
            bgCanvas.height * 0.35,
            0, 0, 2 * Math.PI
        );
        ctx.fillStyle = '#b0b0a8';
        ctx.fill();
        ctx.restore();
    }
    drawBg();
    window.addEventListener('resize', () => drawBg());
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        drawBg(x, y);
    });

    // Animate in nav header and links on load
    const navHeader = document.querySelector('.core-memories-title');
    const navLinks = document.querySelectorAll('.core-memories-title .nav ul li');
    if (navHeader) {
        setTimeout(() => {
            navHeader.classList.add('loaded');
        }, 80);
    }
    navLinks.forEach((li, idx) => {
        setTimeout(() => {
            li.classList.add('loaded');
        }, 200 + idx * 100);
    });
    // Animate in memory items on load
    const container = document.querySelector('.memories-container');
    const items = document.querySelectorAll('.memory-item');
    items.forEach((item, idx) => {
        setTimeout(() => {
            item.classList.add('loaded');
        }, 400 + idx * 120);
    });
    // Memory item pop-up and blur effect
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            container.classList.add('blur-bg');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
            container.classList.remove('blur-bg');
        });
    });
});
