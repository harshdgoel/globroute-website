// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
// This script uses the Intersection Observer API to trigger fade-in animations
// when elements come into view. This creates smooth, performance-optimized
// scroll-based animations without relying on external libraries.

document.addEventListener('DOMContentLoaded', function() {
  // Configuration for the Intersection Observer
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
  };

  // Callback function executed when elements intersect with viewport
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add 'fade-in' class to trigger the animation
        entry.target.classList.add('fade-in');
        // Stop observing this element to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  };

  // Create the Intersection Observer instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Select all elements with the 'fade-in-up' class and start observing them
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // ===== PAGE LOAD ANIMATIONS =====
  // Add fade-in class to elements immediately for page load effects
  setTimeout(() => {
    const immediateFadeElements = document.querySelectorAll('.fade-in-up:not(.delay-1):not(.delay-2):not(.delay-3):not(.delay-4)');
    immediateFadeElements.forEach(element => {
      element.classList.add('fade-in');
    });
  }, 100);

  // ===== STAGGERED ANIMATIONS =====
  // Add fade-in class to delayed elements with timing
  const delays = [
    { selector: '.delay-1', delay: 200 },
    { selector: '.delay-2', delay: 400 },
    { selector: '.delay-3', delay: 600 },
    { selector: '.delay-4', delay: 800 }
  ];

  delays.forEach(({ selector, delay }) => {
    setTimeout(() => {
      const elements = document.querySelectorAll(`${selector}.fade-in-up`);
      elements.forEach(element => {
        element.classList.add('fade-in');
      });
    }, delay);
  });

  // ===== FORM VALIDATION (OPTIONAL ENHANCEMENT) =====
  // Basic form validation for the contact form
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent actual form submission for demo

      // Basic validation
      const name = contactForm.querySelector('input[placeholder*="Name"]');
      const email = contactForm.querySelector('input[type="email"]');

      let isValid = true;

      if (name && name.value.trim() === '') {
        name.style.borderColor = '#dc3545';
        isValid = false;
      } else if (name) {
        name.style.borderColor = '#198754';
      }

      if (email && !email.value.includes('@')) {
        email.style.borderColor = '#dc3545';
        isValid = false;
      } else if (email) {
        email.style.borderColor = '#198754';
      }

      if (isValid) {
        // In a real application, you would submit the form here
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        contactForm.reset();
      }
    });
  }

  // ===== WHATSAPP BUTTON ENHANCEMENT =====
  // Add click tracking or additional functionality to WhatsApp buttons
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
  whatsappButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Could add analytics tracking here
      console.log('WhatsApp inquiry initiated');
    });
  });

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  // Smooth scroll behavior for internal links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== PERFORMANCE OPTIMIZATION =====
  // Debounce scroll events if needed for additional scroll-based features
  let scrollTimeout;
  const handleScroll = () => {
    // Could add parallax effects or other scroll-based interactions here
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Scroll-based logic can be added here
    }, 16); // ~60fps
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
});
