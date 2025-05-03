document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const header = document.querySelector('.site-header');
  const heroImage = document.querySelector('.hero-image img');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const socialIcons = document.querySelector('.social-icons');
  const typewriterElement = document.getElementById('typewriter');
  
  // Typewriter effect text options
  const typewriterTexts = [
      "Building robust database solutions.",
      "Creating powerful data analytics.",
      "Developing Python applications.",
      "Designing FastAPI backends.",
      "Transforming data into insights."
  ];
  
  // Enhanced Typewriter Effect
  let currentTextIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50; // Faster initial typing speed
  let deletingSpeed = 30; // Faster deleting speed
  let pauseTime = 1500; // Pause at end of word
  let startDelay = 1000; // Initial delay before starting
  
  function typeWriter() {
      const currentText = typewriterTexts[currentTextIndex];
      
      // Calculate typing speed with random variation
      const randomSpeed = Math.random() * 20 - 10; // Random variation between -10 and +10
      
      if (isDeleting) {
          // Deleting text with smooth effect
          typewriterElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = deletingSpeed + randomSpeed;
      } else {
          // Typing text with smooth effect
          typewriterElement.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 50 + randomSpeed; // Base typing speed with variation
      }
      
      // Add cursor effect
      typewriterElement.classList.add('typing');
      
      // Check if word is complete
      if (!isDeleting && charIndex === currentText.length) {
          // Pause at end of word
          isDeleting = true;
          typingSpeed = pauseTime;
          typewriterElement.classList.remove('typing');
      } else if (isDeleting && charIndex === 0) {
          // Move to next word
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
          typingSpeed = 500; // Pause before typing new word
          typewriterElement.classList.remove('typing');
      }
      
      setTimeout(typeWriter, typingSpeed);
  }
  
  // Start the typewriter effect with initial delay
  if (typewriterElement) {
      setTimeout(typeWriter, startDelay);
  }
  
  // Scroll event handler for header animation
  function handleScroll() {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
          if (window.innerWidth > 768 && heroImage) {
              heroImage.classList.add('zoom');
          }
      } else {
          header.classList.remove('scrolled');
          if (heroImage) {
              heroImage.classList.remove('zoom');
          }
      }
      
      // Check elements for scroll animations
      checkVisibility();
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
  
  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle menu visibility with animation
      const isOpening = !navLinks.classList.contains('active');
      
      if (isOpening) {
        // Opening animation
        navLinks.style.display = 'flex';
        socialIcons.style.display = 'flex';
        
        // Force reflow
        navLinks.offsetHeight;
        
        navLinks.classList.add('active');
        socialIcons.classList.add('active');
        this.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        // Closing animation
        navLinks.classList.remove('active');
        socialIcons.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove display after animation
        setTimeout(() => {
          if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
            socialIcons.style.display = 'none';
          }
        }, 300);
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (hamburger && navLinks.classList.contains('active')) {
      const isClickInsideNav = navLinks.contains(event.target) || 
                             socialIcons.contains(event.target) || 
                             hamburger.contains(event.target);
      if (!isClickInsideNav) {
        navLinks.classList.remove('active');
        socialIcons.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove display after animation
        setTimeout(() => {
          if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
            socialIcons.style.display = 'none';
          }
        }, 300);
      }
    }
  });
  
  // Close mobile menu when window is resized above mobile breakpoint
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      socialIcons.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
      
      // Remove display after animation
      setTimeout(() => {
        if (!navLinks.classList.contains('active')) {
          navLinks.style.display = 'none';
          socialIcons.style.display = 'none';
        }
      }, 300);
    }
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          
          if (targetId === '#') {
              // Scroll to top for # links
              window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
              });
          } else {
              const targetElement = document.querySelector(targetId);
              
              if (targetElement) {
                  const headerHeight = header.offsetHeight;
                  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                  
                  window.scrollTo({
                      top: targetPosition - headerHeight - 20, // 20px extra padding
                      behavior: 'smooth'
                  });
              }
          }
          
          // Close mobile menu after clicking a link
          if (window.innerWidth <= 768 && hamburger) {
              navLinks.classList.remove('active');
              socialIcons.classList.remove('active');
              hamburger.classList.remove('active');
          }
      });
  });
  
  // Intersection Observer for scroll animations
  function checkVisibility() {
      const elements = document.querySelectorAll('.expertise-item, .project-item, .about-content, .reveal-left, .reveal-right');
      
      elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
          const windowHeight = window.innerHeight;
          
          // Element is in viewport
          if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
              element.classList.add('in-view');
          }
      });
  }
  
  // Initialize animations
  handleScroll();
  
  // Newsletter form handling (prevent default)
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const emailInput = this.querySelector('input[type="email"]');
          
          if (emailInput.value) {
              // Show success message (in real implementation, would send to server)
              const formParent = this.parentNode;
              this.style.display = 'none';
              
              const successMsg = document.createElement('p');
              successMsg.className = 'success-message';
              successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for subscribing!';
              successMsg.style.color = '#4cc9f0';
              successMsg.style.fontWeight = 'bold';
              
              // Insert after the form
              formParent.insertBefore(successMsg, this.nextSibling);
          }
      });
  }
  
  // Image hover effects for desktop
  if (window.matchMedia('(min-width: 1024px)').matches) {
      const projectImages = document.querySelectorAll('.project-image');
      
      projectImages.forEach(container => {
          const img = container.querySelector('img');
          
          container.addEventListener('mousemove', function(e) {
              const xPos = (e.clientX - container.getBoundingClientRect().left) / container.offsetWidth;
              const yPos = (e.clientY - container.getBoundingClientRect().top) / container.offsetHeight;
              
              // Subtle parallax effect
              img.style.transform = `scale(1.1) translate(${(xPos - 0.5) * -10}px, ${(yPos - 0.5) * -10}px)`;
          });
          
          container.addEventListener('mouseleave', function() {
              img.style.transform = 'scale(1)';
          });
      });
  }
  
  // Basic form validation
  const inputs = document.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
      input.addEventListener('blur', function() {
          if (this.value.trim() !== '') {
              this.classList.add('has-value');
          } else {
              this.classList.remove('has-value');
          }
      });
  });
  
  // Initialize animations on page load
  setTimeout(function() {
      document.body.classList.add('loaded');
      checkVisibility();
  }, 300);
});

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Hide loading overlay after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 1000); // Show loading for at least 1 second
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close menu after clicking a link
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.social-icons').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        }
    });
});