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
  if (window.initializeSharedLayout) window.initializeSharedLayout();
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
  
  // Initialize modern premium features
  initModernComponents();
  initBeforeAfterSliders();
  initFAQAccordions();
  initLightboxGallery();
});

// ============================================================
//  THEME MANAGEMENT
// ============================================================
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  updateThemeToggleIcons();

  themeToggles.forEach(toggle => {
    toggle.style.display = '';
    
    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggleIcons();
      window.dispatchEvent(new Event('themechanged'));
    });
  });
}

function updateThemeToggleIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const moons = document.querySelectorAll('.theme-toggle-moon');
  const suns = document.querySelectorAll('.theme-toggle-sun');
  
  moons.forEach(m => isDark ? m.classList.add('hidden') : m.classList.remove('hidden'));
  suns.forEach(s => isDark ? s.classList.remove('hidden') : s.classList.add('hidden'));
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

// ============================================================
//  MODERN COMPONENTS (Progress, FABs, Sticky Nav)
// ============================================================
function initModernComponents() {
  // 1. Scroll Progress Bar
  if (!document.getElementById('scroll-progress')) {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.appendChild(bar);
    
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      bar.style.width = scrolled + '%';
    });
  }
  
  // 2. Sticky Nav Scroll Behavior
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('backdrop-blur-md', 'bg-white/80', 'dark:bg-gray-950/80', 'shadow-md');
        nav.classList.remove('bg-white/65', 'dark:bg-gray-950/65');
      } else {
        nav.classList.remove('backdrop-blur-md', 'bg-white/80', 'dark:bg-gray-950/80', 'shadow-md');
        nav.classList.add('bg-white/65', 'dark:bg-gray-950/65');
      }
    });
  }
}

// ============================================================
//  BEFORE/AFTER INTERACTIVE SLIDER
// ============================================================
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.before-after-container');
  
  sliders.forEach(slider => {
    const afterImg = slider.querySelector('.after-image');
    const handle = slider.querySelector('.slider-handle');
    if (!afterImg || !handle) return;
    
    let isResizing = false;
    
    function setSliderWidth(clientX) {
      const rect = slider.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      
      afterImg.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }
    
    // Mouse events
    handle.addEventListener('mousedown', () => { isResizing = true; });
    window.addEventListener('mouseup', () => { isResizing = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      setSliderWidth(e.clientX);
    });
    
    // Touch events
    handle.addEventListener('touchstart', () => { isResizing = true; });
    window.addEventListener('touchend', () => { isResizing = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isResizing) return;
      if (e.touches[0]) {
        setSliderWidth(e.touches[0].clientX);
      }
    });
  });
}

// ============================================================
//  FAQ ACCORDION
// ============================================================
function initFAQAccordions() {
  const faqHeaders = document.querySelectorAll('.accordion-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = header.classList.contains('active');
      
      // Close other accordions in the same group if desired, but toggle is fine
      header.classList.toggle('active');
      content.classList.toggle('active');
      
      if (content.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
}

// ============================================================
//  IMAGE LIGHTBOX GALLERY
// ============================================================
function initLightboxGallery() {
  const images = document.querySelectorAll('[data-lightbox]');
  if (!images.length) return;
  
  // Create modal markup dynamically if not exists
  let modal = document.querySelector('.lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-close">&times;</div>
      <img class="lightbox-content" src="" alt="">
    `;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
      if (e.target.className === 'lightbox-modal' || e.target.className === 'lightbox-close') {
        modal.classList.remove('active');
      }
    });
  }
  
  const modalImg = modal.querySelector('.lightbox-content');
  
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSrc = img.getAttribute('href') || img.getAttribute('src') || img.querySelector('img')?.getAttribute('src');
      const targetAlt = img.getAttribute('title') || img.getAttribute('alt') || img.querySelector('img')?.getAttribute('alt') || 'Prosthetic Care';
      
      if (targetSrc) {
        modalImg.src = targetSrc;
        modalImg.alt = targetAlt;
        modal.classList.add('active');
      }
    });
  });
}

// ============================================================
//  APEXFLEX CLIENT-SIDE SPA ROUTER & PRELOAD ENGINE
// ============================================================
(function() {
  const pageCache = {};
  let loaderTimer = null;
  let preloadedUrls = new Set();

  // 1. Loader functions (disabled)
  function showLoader() {}
  function hideLoader() {}


  // 2. Preload assets
  function preloadPageAssets(htmlText, targetUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    
    // Find Hero image source
    const header = doc.querySelector('header');
    if (header) {
      const bgStyle = header.getAttribute('style');
      if (bgStyle && bgStyle.includes('url(')) {
        const match = bgStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (match && match[1]) {
          const imgUrl = new URL(match[1], targetUrl).href;
          const img = new Image();
          img.src = imgUrl;
        }
      }
    }
    
    // Preload critical images in main
    const criticalImgs = doc.querySelectorAll('main img');
    criticalImgs.forEach((img, idx) => {
      if (idx < 3) {
        const src = img.getAttribute('src');
        if (src) {
          const absoluteImgUrl = new URL(src, targetUrl).href;
          const preloadedImg = new Image();
          preloadedImg.src = absoluteImgUrl;
        }
      }
    });
  }

  function fetchAndCache(urlStr) {
    const cleanUrl = urlStr.split('#')[0];
    if (pageCache[cleanUrl]) return Promise.resolve(pageCache[cleanUrl]);
    
    const promise = fetch(cleanUrl)
      .then(res => res.text())
      .then(html => {
        pageCache[cleanUrl] = html;
        preloadPageAssets(html, cleanUrl);
        return html;
      });
    pageCache[cleanUrl] = promise;
    return promise;
  }

  // 3. Relative depth mapping logic
  function adjustPersistentLinks(inPages) {
    const homePrefix = inPages ? '../' : '';

    document.querySelectorAll('#nav-container a, #footer-container a').forEach(a => {
      const href = a.getAttribute('data-orig-href') || a.getAttribute('href');
      if (!href) return;
      if (!a.getAttribute('data-orig-href')) {
        a.setAttribute('data-orig-href', href);
      }

      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;

      const basename = href.split('/').pop();
      if (basename === 'index.html') {
        a.setAttribute('href', homePrefix + 'index.html');
      } else {
        a.setAttribute('href', basename);
      }
    });

    const assetPrefix = inPages ? '../assets/' : 'assets/';
    document.querySelectorAll('#nav-container img, #footer-container img, #nav-container svg, #footer-container svg').forEach(img => {
      let src = img.getAttribute('data-orig-src') || img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        if (!img.getAttribute('data-orig-src')) {
          img.setAttribute('data-orig-src', src);
        }
        const basename = src.split('assets/').pop();
        img.setAttribute('src', assetPrefix + basename);
      }
    });
  }

  function adjustMainContentPaths(mainEl, inPages) {
    const assetPrefix = inPages ? '../assets/' : 'assets/';
    mainEl.querySelectorAll('img, source').forEach(el => {
      let src = el.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        const basename = src.split('assets/').pop();
        el.setAttribute('src', assetPrefix + basename);
      }
    });

    mainEl.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;

      const basename = href.split('/').pop();
      if (basename === 'index.html') {
        a.setAttribute('href', 'index.html');
      } else {
        a.setAttribute('href', basename);
      }
    });
  }

  function updateActiveNavLink(targetPath) {
    const targetBasename = targetPath.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu-link').forEach(a => {
      const origHref = a.getAttribute('data-orig-href') || a.getAttribute('href');
      if (!origHref) return;
      const linkBasename = origHref.split('/').pop();
      
      const isMobile = a.closest('#mobile-menu') !== null;
      
      if (linkBasename === targetBasename) {
        if (isMobile) {
          a.className = 'nav-menu-link block w-full px-3 py-2.5 rounded-xl text-brand-primary dark:text-brand-secondary bg-brand-light dark:bg-[#171717] font-semibold';
        } else {
          a.className = 'nav-menu-link text-brand-primary dark:text-brand-secondary font-bold';
        }
      } else {
        if (isMobile) {
          a.className = 'nav-menu-link block w-full px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors font-medium text-gray-700 dark:text-gray-300';
        } else {
          a.className = 'nav-menu-link hover:text-brand-primary dark:hover:text-brand-secondary transition-colors font-medium text-gray-700 dark:text-gray-300';
        }
      }
    });
  }

  function executePageScripts(doc) {
    // Re-execute any page specific scripts (like case-studies-animations.js)
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(oldScript => {
      if (oldScript.src && (oldScript.src.includes('main.js') || oldScript.src.includes('gsap') || oldScript.src.includes('ScrollTrigger') || oldScript.src.includes('lenis'))) {
        return; // Skip main library and global script
      }
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      document.body.appendChild(newScript);
      setTimeout(() => newScript.remove(), 1200);
    });
  }

  // 4. Main transition sequence
  function navigateTo(urlStr, addToHistory = true) {
    const targetUrl = new URL(urlStr, window.location.href);
    const inPages = targetUrl.pathname.toLowerCase().includes('/pages/');

    showLoader();

    fetchAndCache(targetUrl.href).then(htmlText => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const newMain = doc.querySelector('main');
      const currentMain = document.querySelector('main');

      if (!newMain || !currentMain) {
        window.location.href = urlStr;
        return;
      }

      // Exit Animation
      gsap.to(currentMain, {
        opacity: 0,
        scale: 0.96,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          // Replace Content
          currentMain.innerHTML = newMain.innerHTML;
          
          // Adjust Paths
          adjustPersistentLinks(inPages);
          adjustMainContentPaths(currentMain, inPages);
          updateActiveNavLink(targetUrl.pathname);

          // Update Document Properties
          document.title = doc.title;
          if (addToHistory) {
            history.pushState({ inPages }, doc.title, targetUrl.href);
          }

          // Trigger Page entrance and re-run initializers
          executePageScripts(doc);
          
          // Re-init general page elements
          initScrollAnimations();
          initTestimonialSliders();
          initHeroAnimations();
          initCounterAnimations();
          initProgressBars();
          initParallax();
          applyHoverEnhancements();
          initModernComponents();
          initBeforeAfterSliders();
          initFAQAccordions();
          initLightboxGallery();
          if (typeof lucide !== 'undefined') lucide.createIcons();

          // Enter Animation
          gsap.fromTo(currentMain, 
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
          );

          hideLoader();

          // Handle hash scrolling if present
          if (targetUrl.hash) {
            const hashTarget = document.querySelector(targetUrl.hash);
            if (hashTarget) {
              hashTarget.scrollIntoView({ behavior: 'smooth' });
              return;
            }
          }
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      });
    }).catch(err => {
      console.warn("SPA navigation failed, falling back to full load.", err);
      window.location.href = urlStr;
    });
  }

  // Hook up hover preloading and click interception
  function setupSpaListeners() {
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (!link) return;
  
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.getAttribute('target') === '_blank') {
          if (link.getAttribute('aria-label') === 'Back to top' || href === '#') {
            e.preventDefault();
            if (window.lenis) {
              window.lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
          return;
        }
  
        e.preventDefault();
        navigateTo(link.href);
      });

    document.body.addEventListener('mouseenter', e => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.getAttribute('target') === '_blank') return;

      if (!preloadedUrls.has(link.href)) {
        preloadedUrls.add(link.href);
        fetchAndCache(link.href);
      }
    }, { capture: true, passive: true });
  }

  window.addEventListener('popstate', e => {
    navigateTo(window.location.href, false);
  });

  setupSpaListeners();
  
  // Master Header & Footer Template Constants
  const MASTER_HEADER = `
    <nav class="glass-panel transition-colors duration-300 shadow-sm border-b border-gray-200/50 dark:border-gray-800/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo & Brand Redirect -->
          <div class="flex-shrink-0">
            <a href="index.html" class="flex items-center space-x-2 rtl:space-x-reverse" style="display: flex !important; flex-direction: row !important; align-items: center !important; gap: 8px !important;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#0F4C81] dark:text-[#67E8F9]" style="flex-shrink: 0 !important;">
                  <path d="M4.5 16.5c-1.5-1.5-2.5-3.5-2.5-6s2-8 6-8 8 2.5 8 6.5-1.5 5-4.5 6.5-4 1.5-7 1z" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 13v7M9 20h6" />
                </svg>
                <span class="font-heading font-semibold text-2xl tracking-tight bg-gradient-to-r from-[#0F4C81] via-[#0F4C81] to-[#14B8A6] bg-clip-text text-transparent dark:from-[#67E8F9] dark:via-[#67E8F9] dark:to-[#67E8F9]">
                  ApexFlex
                </span>
              </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-6 rtl:space-x-reverse font-medium text-sm text-gray-700 dark:text-gray-300">
            <a href="index.html" class="nav-menu-link hover:text-[#0F4C81] dark:hover:text-[#67E8F9] transition-colors font-medium text-gray-700 dark:text-gray-300">Home 1</a>
            <a href="home2.html" class="nav-menu-link hover:text-[#0F4C81] dark:hover:text-[#67E8F9] transition-colors font-medium text-gray-700 dark:text-gray-300">Home 2</a>
            <a href="about.html" class="nav-menu-link hover:text-[#0F4C81] dark:hover:text-[#67E8F9] transition-colors font-medium text-gray-700 dark:text-gray-300">About</a>
            <a href="services.html" class="nav-menu-link hover:text-[#0F4C81] dark:hover:text-[#67E8F9] transition-colors font-medium text-gray-700 dark:text-gray-300">Services</a>
            <a href="case-studies.html" class="nav-menu-link hover:text-[#0F4C81] dark:hover:text-[#67E8F9] transition-colors font-medium text-gray-700 dark:text-gray-300">Case Studies</a>
            <a href="blog.html" class="nav-menu-link hover:text-[#0F4C81] dark:hover:text-[#67E8F9] transition-colors font-medium text-gray-700 dark:text-gray-300">Blog</a>
            <a href="contact.html" class="nav-menu-link hover:text-[#0F4C81] dark:hover:text-[#67E8F9] transition-colors font-medium text-gray-700 dark:text-gray-300">Contact</a>
          </div>

          <!-- Action Switches & CTA -->
          <div class="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            <!-- Theme Toggle -->
            <button class="theme-toggle p-2.5 rounded-xl text-gray-655 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-gray-200/50 dark:border-gray-800" aria-label="Toggle theme">
              <i data-lucide="moon" class="w-5 h-5 theme-toggle-moon"></i>
              <i data-lucide="sun" class="w-5 h-5 theme-toggle-sun hidden"></i>
            </button>

            <!-- RTL Toggle -->
            <button class="rtl-toggle p-2.5 rounded-xl text-gray-655 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-gray-200/50 dark:border-gray-800 flex items-center justify-center" aria-label="Toggle RTL mode">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
  <path d="M8 3 4 7l4 4"/>
  <path d="M4 7h16"/>
  <path d="m16 21 4-4-4-4"/>
  <path d="M20 17H4"/>
</svg>
              </button>

            <!-- Primary CTA: Signup -->
            <a href="signup.html" class="px-5 py-2.5 bg-[#14B8A6] hover:bg-[#109f8f] text-white dark:bg-[#67E8F9] dark:hover:bg-[#4fdbeb] dark:text-[#0B1F33] rounded-xl text-sm font-semibold transition-all shadow-md shadow-[#14B8A6]/20 hover:scale-[1.02] active:scale-[0.98] btn-pulse magnetic-btn">
              Sign Up
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="flex lg:hidden items-center space-x-2 rtl:space-x-reverse">

            <button id="mobile-menu-btn" class="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-850 transition-all" aria-expanded="false">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Menu drawer -->
      <div id="mobile-menu" class="hidden lg:hidden glass-panel border-t border-gray-200/50 dark:border-gray-800/30 transition-all">
        <div class="px-4 pt-4 pb-8 flex flex-col space-y-3">
          <a href="index.html" class="nav-menu-link block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850">Home 1</a>
          <a href="home2.html" class="nav-menu-link block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850">Home 2</a>
          <a href="about.html" class="nav-menu-link block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850">About</a>
          <a href="services.html" class="nav-menu-link block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850">Services</a>
          <a href="case-studies.html" class="nav-menu-link block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850">Case Studies</a>
          <a href="blog.html" class="nav-menu-link block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850">Blog</a>
          <a href="contact.html" class="nav-menu-link block px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850">Contact</a>
          <div class="border-t border-gray-200 dark:border-gray-800 my-2"></div>
          <a href="signup.html" class="block mt-4 text-center px-4 py-3 bg-[#14B8A6] text-white rounded-xl font-semibold">Sign Up</a>
        </div>
      </div>
    </nav>
  `;

  const MASTER_FOOTER = `
    <footer class="bg-white text-gray-700 dark:bg-[#0A0A0A] dark:text-gray-300 border-t border-gray-200 dark:border-[#171717] transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <!-- Column 1: Branding -->
          <div class="space-y-4">
            <a href="index.html" class="flex items-center space-x-2 rtl:space-x-reverse" style="display: flex !important; flex-direction: row !important; align-items: center !important; gap: 8px !important;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#0F4C81] dark:text-[#67E8F9]" style="flex-shrink: 0 !important;">
                  <path d="M4.5 16.5c-1.5-1.5-2.5-3.5-2.5-6s2-8 6-8 8 2.5 8 6.5-1.5 5-4.5 6.5-4 1.5-7 1z" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 13v7M9 20h6" />
                </svg>
                <span class="font-heading font-semibold text-2xl tracking-tight bg-gradient-to-r from-[#0F4C81] via-[#0F4C81] to-[#14B8A6] bg-clip-text text-transparent dark:from-[#67E8F9] dark:via-[#67E8F9] dark:to-[#67E8F9]">
                  ApexFlex
                </span>
              </a>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              State-of-the-art orthotics and prosthetics fabrication lab. Restoring patient confidence and biological walking capacity via advanced design.
            </p>
            <!-- Social Icons -->
            <div class="flex space-x-4 rtl:space-x-reverse pt-2">
              <a href="#" class="p-2 bg-gray-100 dark:bg-[#171717] hover:bg-brand-secondary rounded-lg text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all" aria-label="LinkedIn">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" class="p-2 bg-gray-100 dark:bg-[#171717] hover:bg-brand-secondary rounded-lg text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all" aria-label="Twitter">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" class="p-2 bg-gray-100 dark:bg-[#171717] hover:bg-brand-secondary rounded-lg text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all" aria-label="YouTube">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation Links -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 font-heading">Solutions</h4>
            <ul class="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><a href="index.html" class="hover:text-brand-secondary transition-colors">Home 1</a></li>
              <li><a href="home2.html" class="hover:text-brand-secondary transition-colors">Home 2</a></li>
              <li><a href="about.html" class="hover:text-brand-secondary transition-colors">About Journey</a></li>
              <li><a href="services.html" class="hover:text-brand-secondary transition-colors">Lab Services</a></li>
            </ul>
          </div>

          <!-- Column 3: Resources -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 font-heading">Resources</h4>
            <ul class="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><a href="case-studies.html" class="hover:text-brand-secondary transition-colors">Case Analytics</a></li>
              <li><a href="blog.html" class="hover:text-brand-secondary transition-colors">Clinical Blog</a></li>
              <li><a href="contact.html" class="hover:text-brand-secondary transition-colors">Contact & Map</a></li>
              <li><a href="login.html" class="hover:text-brand-secondary transition-colors">Portal Access</a></li>
            </ul>
          </div>

          <!-- Column 4: Contact Info -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 font-heading">Lab Contact</h4>
            <address class="not-italic text-xs text-gray-600 dark:text-gray-400 space-y-2">
              <p class="flex items-start"><i data-lucide="map-pin" class="w-4 h-4 text-brand-secondary mr-2 rtl:ml-2 mt-0.5 flex-shrink-0"></i> 104 Bio-Medical Dr, Suite D, Seattle, WA 98101</p>
              <p class="flex items-center"><i data-lucide="phone" class="w-4 h-4 text-brand-secondary mr-2 rtl:ml-2 flex-shrink-0"></i> +1 (800) 555-0199</p>
              <p class="flex items-center"><i data-lucide="mail" class="w-4 h-4 text-brand-secondary mr-2 rtl:ml-2 flex-shrink-0"></i> support@apexflexlab.com</p>
              <p class="flex items-center"><i data-lucide="clock" class="w-4 h-4 text-brand-secondary mr-2 rtl:ml-2 flex-shrink-0"></i> Mon-Fri: 8:00 AM - 5:00 PM</p>
            </address>
          </div>

        </div>

        <!-- Bottom Copyright Bar -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-[#171717] text-center text-xs text-gray-600 dark:text-gray-500 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p>© 2026 ApexFlex, Inc. All rights reserved.</p>
          <a href="#" class="p-2.5 bg-gray-100 dark:bg-[#171717] hover:bg-brand-secondary text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white rounded-xl transition-all border border-gray-200 dark:border-[#222222] hover:border-brand-secondary flex items-center justify-center" aria-label="Back to top">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  `;

  function initializeSharedLayout() {
    const path = window.location.pathname.toLowerCase();
    const isAuth = path.includes('login.html') || path.includes('signup.html');
    const navContainer = document.getElementById('nav-container');
    const footerContainer = document.getElementById('footer-container');

    if (isAuth) {
      if (navContainer) navContainer.innerHTML = '';
      if (footerContainer) footerContainer.innerHTML = '';
      return;
    }

    const inPages = path.includes('/pages/');

    if (navContainer) {
      navContainer.innerHTML = MASTER_HEADER;
    }
    if (footerContainer) {
      footerContainer.innerHTML = MASTER_FOOTER;
    }

    adjustPersistentLinks(inPages);
    updateActiveNavLink(path);
  }

  // Expose globally
  window.initializeSharedLayout = initializeSharedLayout;

})();


