// Updated JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const heroImage = document.querySelector('.hero-image img');

    // Smooth header animation on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            heroImage.classList.add('zoom');
        } else {
            header.classList.remove('scrolled');
            heroImage.classList.remove('zoom');
        }
    });

    // Zoom effect on hero image hover
    heroImage.addEventListener('mouseenter', function() {
        heroImage.style.transform = 'scale(1.1)';
    });

    heroImage.addEventListener('mouseleave', function() {
        heroImage.style.transform = 'scale(1)';
    });
});
