window.addEventListener('DOMContentLoaded', () => {
  // Camouflage colors for each quadrant
  const camoColors = [
    '#78866B', // Top-left
    '#4B5320', // Top-right
    '#3C341F', // Bottom-left
    '#6E6658'  // Bottom-right
  ];
  const defaultColor = '#C4C3B9'; // Silver Sand
  const bgCanvas = document.getElementById('bg-canvas');
  const img = document.querySelector('.home-image');

  function isCursorOnImage(e) {
    if (!img) return false;
    const rect = img.getBoundingClientRect();
    return (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    );
  }

  function drawBlendedOvals(activeIdx) {
    if (!bgCanvas) return;
    const ctx = bgCanvas.getContext('2d');
    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    ctx.fillStyle = defaultColor;
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    // Oval parameters
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ovals = [
      { cx: 0, cy: 0 },        // Top-left
      { cx: w, cy: 0 },        // Top-right
      { cx: 0, cy: h },        // Bottom-left
      { cx: w, cy: h }         // Bottom-right
    ];
    const rx = w * 0.7;
    const ry = h * 0.7;
    // Draw all ovals, but only the active one is strong, others are faint for blending
    for (let i = 0; i < 4; i++) {
      const grad = ctx.createRadialGradient(
        ovals[i].cx, ovals[i].cy, 0,
        ovals[i].cx, ovals[i].cy, Math.max(rx, ry)
      );
      if (i === activeIdx) {
        grad.addColorStop(0, camoColors[i]);
        grad.addColorStop(1, defaultColor);
        ctx.globalAlpha = 0.85;
      } else {
        grad.addColorStop(0, camoColors[i] + '33'); // 20% opacity for blending
        grad.addColorStop(1, defaultColor);
        ctx.globalAlpha = 0.18;
      }
      ctx.save();
      ctx.translate(ovals[i].cx, ovals[i].cy);
      ctx.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry));
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(rx, ry), 0, 2 * Math.PI);
      ctx.closePath();
      ctx.restore();
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1.0;
    }
  }

  function handleMouseMove(e) {
    if (isCursorOnImage(e)) {
      if (bgCanvas) {
        const ctx = bgCanvas.getContext('2d');
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        ctx.fillStyle = defaultColor;
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
      }
      return;
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    let idx = 0;
    if (e.clientY < h / 2) {
      idx = e.clientX < w / 2 ? 0 : 1;
    } else {
      idx = e.clientX < w / 2 ? 2 : 3;
    }
    drawBlendedOvals(idx);
  }

  function handleMouseLeave() {
    if (bgCanvas) {
      const ctx = bgCanvas.getContext('2d');
      ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      ctx.fillStyle = defaultColor;
      ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    }
  }

  function resizeCanvas() {
    if (!bgCanvas) return;
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    handleMouseLeave();
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);
});
