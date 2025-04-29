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
  
  // Initialize typewriter effect
  let currentTextIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeWriter() {
      const currentText = typewriterTexts[currentTextIndex];
      
      if (isDeleting) {
          // Deleting text
          typewriterElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 50; // Faster when deleting
      } else {
          // Typing text
          typewriterElement.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 100; // Normal typing speed
      }
      
      // Check if word is complete
      if (!isDeleting && charIndex === currentText.length) {
          // Pause at end of word
          isDeleting = true;
          typingSpeed = 1500; // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
          // Move to next word
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
          typingSpeed = 500; // Pause before typing new word
      }
      
      setTimeout(typeWriter, typingSpeed);
  }
  
  // Start the typewriter effect
  if (typewriterElement) {
      setTimeout(typeWriter, 1000); // Initial delay before starting
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
          e.stopPropagation();
          navLinks.classList.toggle('active');
          socialIcons.classList.toggle('active');
          this.classList.toggle('active');
      });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
      if (hamburger && navLinks.classList.contains('active')) {
          const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
          if (!isClickInsideNav) {
              navLinks.classList.remove('active');
              socialIcons.classList.remove('active');
              hamburger.classList.remove('active');
          }
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
  
  // Window resize event handler
  window.addEventListener('resize', function() {
      // Reset any mobile menu state on window resize
      if (window.innerWidth > 768) {
          if (navLinks) navLinks.classList.remove('active');
          if (socialIcons) socialIcons.classList.remove('active');
          if (hamburger) hamburger.classList.remove('active');
      }
  });
});