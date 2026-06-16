// ============================================================
//  APEXFLEX — MAIN ANIMATION ENGINE
//  Premium Healthcare SaaS Animation System
// ============================================================

// Global Image Fallback Handler
window.handleImageError = function(img) {
  img.onerror = null;
  img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%233B0764' opacity='0.05'/><rect width='100%' height='100%' stroke='%233B0764' stroke-width='2' fill='none' opacity='0.1'/><path d='M370 260h60v80h-60zm-40 40h140v20H330z' fill='%233B0764' opacity='0.3'/><text x='50%' y='65%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='600' fill='%233B0764' opacity='0.4'>ApexFlex Lab Care</text></svg>";
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initMobileMenu();
  initSkeletonLoaders();
  initScrollAnimations();
  initTestimonialSliders();
  initHeroAnimations();
  initCounterAnimations();
  initProgressBars();
  initParallax();
  initPageTransition();
  applyHoverEnhancements();
});

// ============================================================
//  THEME MANAGEMENT
// ============================================================
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggleIcons();
    });
  });

  updateThemeToggleIcons();
}

function updateThemeToggleIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-toggle-moon').forEach(i => i.classList.toggle('hidden', isDark));
  document.querySelectorAll('.theme-toggle-sun').forEach(i => i.classList.toggle('hidden', !isDark));
}

// ============================================================
//  RTL MANAGEMENT
// ============================================================
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const savedRTL = localStorage.getItem('rtl') === 'true';
  document.documentElement.setAttribute('dir', savedRTL ? 'rtl' : 'ltr');

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
      localStorage.setItem('rtl', String(!isRTL));
      window.dispatchEvent(new Event('rtlchanged'));
    });
  });
}

// ============================================================
//  MOBILE MENU
// ============================================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isOpen = !mobileMenu.classList.contains('hidden');
      const paths = menuBtn.querySelectorAll('path');
      if (paths[0]) {
        paths[0].setAttribute('d', isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const paths = menuBtn.querySelectorAll('path');
        if (paths[0]) paths[0].setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      });
    });
  }
}

// ============================================================
//  SKELETON LOADERS
// ============================================================
function initSkeletonLoaders() {
  setTimeout(() => {
    document.querySelectorAll('.skeleton-wrapper').forEach(l => l.classList.add('hidden'));
    document.querySelectorAll('.actual-content').forEach(c => {
      c.classList.remove('opacity-0');
      c.classList.add('opacity-100', 'transition-opacity', 'duration-500', 'page-transition');
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
    // Kick off scroll animations after content is visible
    setTimeout(initScrollAnimations, 100);
  }, 550);
}

// ============================================================
//  HERO SECTION ANIMATIONS (load-based, not scroll)
// ============================================================
function initHeroAnimations() {
  // Auth pages: scale-in card
  document.querySelectorAll('.auth-card').forEach(card => {
    card.classList.add('auth-card-enter');
  });

  // Apply hero animation classes to hero section children
  const heroSection = document.querySelector('header');
  if (!heroSection) return;

  // Headlines
  heroSection.querySelectorAll('h1').forEach(el => {
    if (!el.classList.contains('hero-headline')) el.classList.add('hero-headline');
  });
  heroSection.querySelectorAll('p').forEach((el, i) => {
    if (!el.classList.contains('hero-subtext')) {
      el.classList.add('hero-subtext');
      el.style.animationDelay = `${0.15 + i * 0.08}s`;
    }
  });
  heroSection.querySelectorAll('a, button').forEach((el, i) => {
    if (!el.classList.contains('hero-cta')) {
      el.classList.add('hero-cta');
      el.style.animationDelay = `${0.3 + i * 0.06}s`;
    }
  });
  heroSection.querySelectorAll('img').forEach(el => {
    if (!el.classList.contains('hero-image')) el.classList.add('hero-image');
  });

  // Floating blob animation
  heroSection.querySelectorAll('.blob-animate, .blob-animate-slow, .blob-animate-medium').forEach(blob => {
    // classes already applied in HTML
  });
}

// ============================================================
//  MASTER SCROLL ANIMATION SYSTEM
// ============================================================
function initScrollAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observerOpts = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (reducedMotion) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        obs.unobserve(el);
        return;
      }

      el.classList.add('active');
      obs.unobserve(el);
    });
  }, observerOpts);

  // All reveal classes
  const selectors = [
    '.reveal-element', '.reveal-fade-in', '.reveal-scale-in',
    '.reveal-left', '.reveal-right', '.reveal-zoom',
    '.reveal-bounce', '.reveal-flip', '.stagger-children',
    '.timeline-connector', '.section-divider'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      revealObserver.observe(el);
    });
  });

  // Stagger cards: observe parent, activate children with delay
  const staggerObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent = entry.target;
      parent.classList.add('active');
      obs.unobserve(parent);
    });
  }, { ...observerOpts, threshold: 0.05 });

  document.querySelectorAll('.stagger-children').forEach(el => staggerObs.observe(el));

  // Glass shimmer on cards
  document.querySelectorAll('.glass-panel').forEach(card => {
    if (!card.classList.contains('glass-shimmer')) card.classList.add('glass-shimmer');
  });

  // Progress bars
  initProgressBars();

  // Counter values
  initCounterAnimations();
}

// ============================================================
//  COUNTER ANIMATION (number count-up)
// ============================================================
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');

  const counterObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  // Auto-detect stat numbers in metrics sections
  document.querySelectorAll('.reveal-scale-in').forEach(el => {
    const text = el.querySelector('.text-4xl, .text-5xl, .text-3xl');
    if (text && !text.hasAttribute('data-counter')) {
      const raw = text.textContent.trim();
      const match = raw.match(/[\d,\.]+/);
      if (match) {
        text.setAttribute('data-counter', match[0].replace(/,/g, ''));
        text.setAttribute('data-counter-suffix', raw.replace(/[\d,\.]+/, ''));
        text.setAttribute('data-counter-prefix', raw.split(/[\d,\.]+/)[0] || '');
        counterObs.observe(text);
      }
    }
  });

  counters.forEach(el => counterObs.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-counter') || '0');
  const suffix = el.getAttribute('data-counter-suffix') || '';
  const prefix = el.getAttribute('data-counter-prefix') || '';
  const duration = 1800;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = target * eased;

    let formatted;
    if (target >= 1000) {
      formatted = Math.floor(current).toLocaleString();
    } else if (isDecimal) {
      formatted = current.toFixed(1);
    } else {
      formatted = Math.floor(current).toString();
    }

    el.textContent = `${prefix}${formatted}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ============================================================
//  PROGRESS BAR ANIMATION
// ============================================================
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar, [data-progress]');

  const barObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = el.getAttribute('data-width') || el.getAttribute('data-progress') || '80';
      setTimeout(() => {
        el.style.width = `${target}%`;
      }, 200);
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });

  bars.forEach(b => barObs.observe(b));
}

// ============================================================
//  PARALLAX (subtle, performance-safe)
// ============================================================
function initParallax() {
  const heroHeaders = document.querySelectorAll('header[style*="background-image"]');
  if (!heroHeaders.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        heroHeaders.forEach(header => {
          // Subtle parallax — move bg at 30% of scroll speed
          header.style.backgroundPositionY = `calc(50% + ${scrollY * 0.3}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ============================================================
//  PAGE TRANSITION
// ============================================================
function initPageTransition() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.25s ease';
      setTimeout(() => { window.location.href = href; }, 250);
    });
  });

  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
}

// ============================================================
//  HOVER ENHANCEMENTS (programmatic)
// ============================================================
function applyHoverEnhancements() {
  // Cards — add hover-lift if not already applied
  document.querySelectorAll('.glass-panel, [class*="rounded-2xl"], [class*="rounded-3xl"]').forEach(card => {
    if (!card.classList.contains('hover-lift') && !card.closest('nav') && !card.closest('footer')) {
      card.classList.add('hover-lift');
    }
  });

  // Social icon hover scale
  document.querySelectorAll('[aria-label="LinkedIn"], [aria-label="Twitter / X"], [aria-label="Facebook"], [aria-label="YouTube"], [aria-label="Instagram"], [aria-label="Twitter"]').forEach(icon => {
    icon.classList.add('social-hover');
  });

  // Images — add zoom effect wrapper
  document.querySelectorAll('section img').forEach(img => {
    const parent = img.parentElement;
    if (parent && !parent.classList.contains('img-hover-zoom')) {
      parent.classList.add('img-hover-zoom');
    }
  });

  // Lucide icons in cards
  document.querySelectorAll('.glass-panel i[data-lucide]').forEach(icon => {
    icon.classList.add('icon-hover');
  });

  // CTA pulse buttons (primary CTAs)
  document.querySelectorAll('a[class*="bg-purple-950"], a[class*="bg-sky-500"]').forEach(btn => {
    if (!btn.closest('nav') && !btn.closest('footer')) {
      btn.classList.add('btn-pulse');
    }
  });
}

// ============================================================
//  TESTIMONIALS SLIDER
// ============================================================
function initTestimonialSliders() {
  document.querySelectorAll('.slider-container').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dotsContainer = slider.querySelector('.slider-dots');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const total = slides.length;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `h-2 rounded-full transition-all duration-300 ${i === 0 ? 'w-6 bg-purple-900 dark:bg-sky-400' : 'w-2 bg-purple-200 dark:bg-gray-700'}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function update() {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      track.style.transform = `translateX(${isRTL ? currentIndex * 100 : -currentIndex * 100}%)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('button').forEach((d, i) => {
          d.className = i === currentIndex
            ? 'h-2 w-6 rounded-full bg-purple-950 dark:bg-sky-400 transition-all duration-300'
            : 'h-2 w-2 rounded-full bg-purple-200 dark:bg-gray-700 transition-all duration-300';
        });
      }
    }

    function goTo(i) { currentIndex = i; update(); }
    prevBtn?.addEventListener('click', () => { currentIndex = currentIndex > 0 ? currentIndex - 1 : total - 1; update(); });
    nextBtn?.addEventListener('click', () => { currentIndex = currentIndex < total - 1 ? currentIndex + 1 : 0; update(); });
    window.addEventListener('rtlchanged', update);

    // Auto-advance
    setInterval(() => { currentIndex = currentIndex < total - 1 ? currentIndex + 1 : 0; update(); }, 6000);
  });
}
