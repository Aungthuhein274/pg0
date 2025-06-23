// Profile Page Animations and Interactivity

function triggerScaleAnimation() {
    const animatedEls = document.querySelectorAll(
        '.profile-header, .profile-content, .profile, .info, .nav, .nav ul, .nav ul li a'
    );
    animatedEls.forEach(el => {
        el.classList.remove('animated-scale');
        void el.offsetWidth;
        el.classList.add('animated-scale');
    });
}

window.addEventListener('resize', () => {
    triggerScaleAnimation();
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.main-container').classList.add('animate-in');
    document.querySelector('.nav').classList.add('animate-in');
});