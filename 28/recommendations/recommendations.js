document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#C4C3B9'; // Silver Sand
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw subtle diagonal lines pattern
        ctx.strokeStyle = 'rgba(120,120,120,0.10)';
        ctx.lineWidth = 1.2;
        const spacing = 36;
        for (let i = -canvas.height; i < canvas.width; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + canvas.height, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.width + canvas.height; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i - canvas.height, canvas.height);
            ctx.stroke();
        }
    }
});