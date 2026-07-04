document.addEventListener('DOMContentLoaded', () => {
  // Initialize Themes and Layouts
  initTheme();
  initRtl();
  initStickyHeader();
  initFadeInAnimations();
  initGalleryFilter();
  initLightbox();
  initFormValidations();
  initTabRouting();
});

/* --- THEME CONTROLLER (Light / Dark) --- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Read saved theme or user preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Apply initial theme
  document.documentElement.setAttribute('data-bs-theme', initialTheme);
  updateThemeIcon(initialTheme);

  // Bind click event
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('#theme-toggle i');
  if (!themeIcon) return;
  if (theme === 'dark') {
    themeIcon.className = 'bi bi-sun-fill';
  } else {
    themeIcon.className = 'bi bi-moon-stars-fill';
  }
}

/* --- RTL LAYOUT CONTROLLER --- */
function initRtl() {
  const rtlToggle = document.getElementById('rtl-toggle');
  if (!rtlToggle) return;

  // Read saved direction
  const savedDir = localStorage.getItem('dir') || 'ltr';
  applyDir(savedDir);

  rtlToggle.addEventListener('click', () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDir(newDir);
  });
}

function applyDir(dir) {
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
  localStorage.setItem('dir', dir);

  // Update button label or styling if needed
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  if (rtlToggleBtn) {
    rtlToggleBtn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  }
}

/* --- STICKY NAV ON SCROLL --- */
function initStickyHeader() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --- FADE-IN SECTIONS ON SCROLL --- */
function initFadeInAnimations() {
  const animatedSections = document.querySelectorAll('.fade-in-section');
  if (animatedSections.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedSections.forEach(section => {
    observer.observe(section);
  });
}

/* --- DYNAMIC GALLERY FILTERING --- */
function initGalleryFilter() {
  const filters = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item-col');
  
  if (filters.length === 0 || items.length === 0) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from other buttons
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.style.display = 'block';
          // Subtle zoom-in animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --- LIGHTBOX MODAL TRIGGER --- */
function initLightbox() {
  const galleryLinks = document.querySelectorAll('.gallery-zoom-link');
  const lightboxModalEl = document.getElementById('lightboxModal');
  
  if (!lightboxModalEl || galleryLinks.length === 0) return;

  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxSvgContainer = document.getElementById('lightboxSvgContainer');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const bsModal = new bootstrap.Modal(lightboxModalEl);

  galleryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = link.getAttribute('data-title');
      lightboxCaption.textContent = title;

      // Check if it's an SVG structure we want to duplicate, or an image src
      const svgSource = link.querySelector('.gallery-svg');
      const imgSrc = link.getAttribute('href');

      if (svgSource) {
        // If it's an inline SVG representation (our beautiful schematics)
        lightboxImg.style.display = 'none';
        lightboxSvgContainer.style.display = 'block';
        lightboxSvgContainer.innerHTML = svgSource.outerHTML;
      } else {
        // Fallback or external image
        lightboxSvgContainer.style.display = 'none';
        lightboxImg.style.display = 'inline-block';
        lightboxImg.src = imgSrc;
      }

      bsModal.show();
    });
  });
}

/* --- FORM VALIDATIONS & FEEDBACK --- */
function initFormValidations() {
  const forms = document.querySelectorAll('.needs-validation-custom');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
      } else {
        form.classList.remove('was-validated');
        
        // Form is valid - trigger success modal or feedback
        const formId = form.getAttribute('id');
        let successMessage = 'Your request has been submitted successfully.';
        let successTitle = 'Submission Received';

        if (formId === 'patient-booking-form') {
          successTitle = 'Consultation Scheduled';
          const name = form.querySelector('#patient-name').value;
          successMessage = `Thank you, ${name}! Your consultation request has been received. Our clinical coordinator will call you to confirm your appointment.`;
        } else if (formId === 'physician-referral-form') {
          successTitle = 'Referral Submitted';
          const drName = form.querySelector('#doctor-name').value;
          const ptName = form.querySelector('#ref-patient-name').value;
          successMessage = `Thank you, Dr. ${drName}! The referral for patient ${ptName} has been securely uploaded to our system. We will contact your clinic with progress updates.`;
        } else if (formId === 'contact-form') {
          successTitle = 'Message Sent';
          const name = form.querySelector('#contact-name').value;
          successMessage = `Hello ${name}, thank you for reaching out. A specialist from our team will respond to your inquiry within 24 business hours.`;
        }

        showNotificationModal(successTitle, successMessage);
        form.reset();
      }
    }, false);
  });
}

/* --- NOTIFICATION MODAL HELPER --- */
function showNotificationModal(title, message) {
  // Create dynamic modal if it doesn't exist, or update existing
  let notificationModal = document.getElementById('notificationModal');
  
  if (!notificationModal) {
    const modalHtml = `
      <div class="modal fade" id="notificationModal" tabindex="-1" aria-labelledby="notificationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content glass-card border-0">
            <div class="modal-header border-0 pb-0 justify-content-between">
              <h5 class="modal-title fw-bold" id="notificationModalLabel"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-4">
              <p class="mb-0 text-muted" id="notificationModalBody"></p>
            </div>
            <div class="modal-footer border-0 pt-0">
              <button type="button" class="btn btn-primary-custom" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    notificationModal = document.getElementById('notificationModal');
  }

  document.getElementById('notificationModalLabel').textContent = title;
  document.getElementById('notificationModalBody').textContent = message;

  const bsNotificationModal = new bootstrap.Modal(notificationModal);
  bsNotificationModal.show();
}

/* --- URL ROUTING FOR TABS (e.g. Booking Page) --- */
function initTabRouting() {
  // Check if we are on booking page and a hash exists
  const hash = window.location.hash;
  if (!hash) return;

  const tabButton = document.querySelector(`.nav-pills-custom button[data-bs-target="${hash}"]`);
  if (tabButton) {
    const triggerEl = document.querySelector(`.nav-pills-custom button[data-bs-target="${hash}"]`);
    if (triggerEl) {
      setTimeout(() => {
        const tab = new bootstrap.Tab(triggerEl);
        tab.show();
      }, 150);
    }
  }
}
