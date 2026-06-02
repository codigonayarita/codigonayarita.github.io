/* 
   Rutas Nay - Interactive JavaScript Mechanics
   Developer: Código Nayarita (codigonayarita@gmail.com)
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. HEADER SCROLL EFFECT ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 2. MOBILE MENU TOGGLE ---
  const mobileToggle = document.getElementById('mobileToggle');
  const body = document.body;

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      body.classList.toggle('nav-open');
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('nav-open');
    });
  });



  // --- 5. CONTACT FORM VALIDATION & HANDLING ---
  const contactForm = document.getElementById('contactForm');
  const successAlert = document.getElementById('successAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const subjectField = document.getElementById('subject');
      const messageField = document.getElementById('message');

      let isValid = true;

      // Clean previous errors
      document.querySelectorAll('.form-feedback').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.form-control').forEach(el => el.style.borderColor = '');

      // Name Validation
      if (!nameField.value.trim()) {
        showError(nameField, 'Por favor, dinos tu nombre.');
        isValid = false;
      }

      // Email Validation
      if (!emailField.value.trim()) {
        showError(emailField, 'El correo electrónico es requerido.');
        isValid = false;
      } else if (!validateEmail(emailField.value.trim())) {
        showError(emailField, 'Ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Subject Validation
      if (!subjectField.value.trim()) {
        showError(subjectField, 'Por favor, ingresa el asunto de tu mensaje.');
        isValid = false;
      }

      // Message Validation
      if (!messageField.value.trim()) {
        showError(messageField, 'Escribe el mensaje que deseas enviarnos.');
        isValid = false;
      }

      if (isValid) {
        // Mock successful submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        setTimeout(() => {
          // Reset form & show elegant custom alert
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;

          if (successAlert) {
            successAlert.style.display = 'block';
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto hide success alert after 6 seconds
            setTimeout(() => {
              successAlert.style.display = 'none';
            }, 6000);
          }
        }, 1200);
      }
    });
  }

  function showError(inputEl, message) {
    inputEl.style.borderColor = 'var(--color-accent)';
    const feedback = inputEl.nextElementSibling;
    if (feedback && feedback.classList.contains('form-feedback')) {
      feedback.textContent = message;
      feedback.style.display = 'block';
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // --- 6. SCROLL REVEAL ANIMATIONS (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.feature-card, .contact-form-container, .contact-details, .stats-grid, .disclaimer-container');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    // Set initial transition styles via JS to keep styling clean in style.css
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
  });

});
