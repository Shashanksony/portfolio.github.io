document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const heroImage = document.querySelector('.hero-image img');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const socialIcons = document.querySelector('.social-icons');
    
    // Smooth header animation on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (window.innerWidth > 768) {
                heroImage.classList.add('zoom');
            }
        } else {
            header.classList.remove('scrolled');
            heroImage.classList.remove('zoom');
        }
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Zoom effect on hero image hover for non-touch devices
    if (!('ontouchstart' in window)) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            socialIcons.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            socialIcons.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    socialIcons.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Responsive image loading
    function loadResponsiveImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = window.innerWidth <= 768 ? img.getAttribute('data-src-mobile') : img.getAttribute('data-src');
            if (src) {
                img.src = src;
            }
        });
    }

    // Initial load and resize event
    loadResponsiveImages();
    window.addEventListener('resize', loadResponsiveImages);

    // Intersection Observer for lazy loading and animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.expertise-item, .project-item, .about-content').forEach(el => {
        observer.observe(el);
    });
});