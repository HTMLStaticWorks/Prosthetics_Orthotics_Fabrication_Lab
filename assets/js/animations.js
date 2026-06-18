/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   APEXFLEX — PREMIUM HEALTHCARE-TECH ANIMATION ENGINE v2    ║
 * ║   18+ Unique Section Animation Patterns                      ║
 * ║   GSAP · ScrollTrigger · Lenis · IntersectionObserver        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initMouseSpotlight();
  initNavAnimations();
  initHeroAnimations();
  initRippleButtons();

  // Register GSAP plugins if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initScrollAnimations();
  } else {
    // Fallback to IntersectionObserver only
    initIOAnimations();
  }
});

/* ============================================================
   2. SMOOTH SCROLL — Lenis
   ============================================================ */
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;
  if (window.lenis) return;
  const lenis = new Lenis({
    duration: 1.25,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.8,
  });
  window.lenis = lenis;
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
}

/* ============================================================
   3. CURSOR SPOTLIGHT — radial glow follows mouse (desktop)
   ============================================================ */
function initMouseSpotlight() {
  if (window.matchMedia('(hover: none)').matches) return; // Skip touch

  const spot = document.createElement('div');
  spot.id = 'cursor-spotlight';
  document.body.appendChild(spot);

  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  let tx = cx, ty = cy;

  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  function tickSpot() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    spot.style.background = `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(103,232,249,0.07), transparent 70%)`;
    requestAnimationFrame(tickSpot);
  }
  tickSpot();
}

/* ============================================================
   4. NAVBAR — glass blur on scroll + magnetic links
   ============================================================ */
function initNavAnimations() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Slide-down on load
  nav.style.transform = 'translateY(-100%)';
  nav.style.opacity = '0';
  nav.style.transition = 'transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease';
  setTimeout(() => {
    nav.style.transform = 'translateY(0)';
    nav.style.opacity = '1';
  }, 200);

  // Glass blur on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 20) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    // Hide on scroll down, show on scroll up
    if (y > lastScroll + 50 && y > 150) {
      nav.style.transform = 'translateY(-110%)';
    } else if (y < lastScroll - 10) {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = y;
  }, { passive: true });

  // Magnetic hover on nav links (desktop only)
  if (!window.matchMedia('(hover: none)').matches) {
    nav.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = 'transform 0.2s ease';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0,0)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      });
    });

    // CTA button pulse glow
    nav.querySelectorAll('a[href*="signup"]').forEach(btn => {
      btn.classList.add('cta-glow-pulse');
    });
  }
}

/* ============================================================
   5. HERO — Ken Burns + word-reveal + floating stats + particles
   ============================================================ */
function initHeroAnimations() {
  const hero = document.querySelector('header');
  if (!hero) return;

  // Ken Burns on background (gradient-based hero)
  hero.style.backgroundSize = '100%';
  hero.style.transition = 'background-size 12s ease-out';
  setTimeout(() => { hero.style.backgroundSize = '110%'; }, 100);

  // Word-by-word heading reveal
  hero.querySelectorAll('h1').forEach(h1 => {
    const words = h1.innerHTML.split(' ');
    h1.innerHTML = words.map(w => `<span class="hero-word-reveal" style="display:inline-block;overflow:hidden;"><span class="hero-word-inner" style="display:inline-block;">${w}</span></span>`).join(' ');
    const inners = h1.querySelectorAll('.hero-word-inner');
    inners.forEach((inner, i) => {
      inner.style.opacity = '0';
      inner.style.transform = 'translateY(110%)';
      inner.style.transition = `opacity 0.6s ease ${0.15 + i * 0.07}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.07}s`;
      setTimeout(() => {
        inner.style.opacity = '1';
        inner.style.transform = 'translateY(0)';
      }, 50);
    });
  });

  // Paragraphs fade up
  hero.querySelectorAll('p').forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(20px)';
    p.style.transition = `opacity 0.7s ease ${0.5 + i * 0.12}s, transform 0.7s ease ${0.5 + i * 0.12}s`;
    setTimeout(() => { p.style.opacity = '1'; p.style.transform = 'translateY(0)'; }, 50);
  });

  // CTA buttons scale in
  hero.querySelectorAll('a, button').forEach((btn, i) => {
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.85) translateY(12px)';
    btn.style.transition = `opacity 0.5s ease ${0.65 + i * 0.1}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.65 + i * 0.1}s`;
    setTimeout(() => { btn.style.opacity = '1'; btn.style.transform = 'scale(1) translateY(0)'; }, 50);
  });

  // Hero image float
  hero.querySelectorAll('img').forEach(img => {
    img.classList.add('hero-float-anim');
  });

  // Animated blob orbs
  hero.querySelectorAll('.blob-animate, .blob-animate-slow, .blob-animate-medium').forEach((blob, i) => {
    blob.style.animation = `blobOrbit ${8 + i * 3}s ease-in-out infinite`;
    blob.style.animationDelay = `${-i * 2}s`;
  });
}

/* ============================================================
   6. RIPPLE EFFECT — on all primary CTA buttons
   ============================================================ */
function initRippleButtons() {
  document.querySelectorAll('a, button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position:absolute;border-radius:50%;pointer-events:none;
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.25);
        transform:scale(0);animation:rippleOut 0.6s ease-out forwards;
      `;
      if (getComputedStyle(this).position === 'static') this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* ============================================================
   7. GSAP + ScrollTrigger — All Section Animations
   ============================================================ */
function initScrollAnimations() {

  // ── 7A. TRUST LOGOS — Infinite marquee
  const marquee = document.querySelector('.logo-marquee-track');
  if (marquee) {
    gsap.to(marquee, { xPercent: -50, ease: 'none', duration: 22, repeat: -1 });
    marquee.parentElement.addEventListener('mouseenter', () => gsap.globalTimeline.pause());
    marquee.parentElement.addEventListener('mouseleave', () => gsap.globalTimeline.resume());
  }

  // ── 7B. ABOUT SECTION — Clip-path split reveal
  const aboutImg = document.querySelector('.about-image-reveal, [data-anim="clip-reveal"]');
  if (aboutImg) {
    gsap.fromTo(aboutImg,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.4, ease: 'power4.inOut',
        scrollTrigger: { trigger: aboutImg, start: 'top 75%' }
      });
  }

  // About text opposite-direction slide
  document.querySelectorAll('.about-text-reveal, [data-anim="slide-right"]').forEach(el => {
    gsap.fromTo(el,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
      });
  });

  // Floating stat cards in About
  gsap.from('.floating-stat-card', {
    y: 60, opacity: 0, scale: 0.9, stagger: 0.15, duration: 0.8, ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.floating-stat-card', start: 'top 80%' }
  });

  // ── 7C. SERVICES CARDS — Staggered scale-up + rotating icon bg
  gsap.from('.services-card, .glass-panel', {
    y: 60, opacity: 0, scale: 0.94, stagger: 0.12, duration: 0.9, ease: 'power3.out',
    scrollTrigger: {
      trigger: document.querySelector('.services-card, .glass-panel'),
      start: 'top 80%'
    }
  });

  // Service card hover tilt (3D)
  if (!window.matchMedia('(hover:none)').matches) {
    document.querySelectorAll('.glass-panel').forEach(card => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -14;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        card.style.boxShadow = `0 24px 60px rgba(20,184,166,0.15)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        card.style.boxShadow = '';
      });
    });
  }

  // ── 7D. WHY CHOOSE US — Zig-zag sequential + connecting line draw
  const whySec = document.querySelector('#why-us, [data-section="why"], .why-choose-section');
  if (whySec) {
    whySec.querySelectorAll('.feature-item, .why-item, .why-card').forEach((item, i) => {
      gsap.fromTo(item,
        { x: i % 2 === 0 ? -70 : 70, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 82%' }
        });
    });

    // SVG connection line draw
    const svgLine = whySec.querySelector('svg line, svg path');
    if (svgLine) {
      const len = 400;
      gsap.fromTo(svgLine,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: whySec, start: 'top 60%', end: 'bottom 80%', scrub: 1 }
        });
    }
  }

  // ── 7E. PATIENT JOURNEY / FABRICATION — SVG path draws, cards alternate slide
  const pjSection = document.querySelector('#patient-journey, #fabrication-process');
  if (pjSection) {
    const drawLine = pjSection.querySelector('#pj-draw-line, #timeline-main-line');
    if (drawLine) {
      const len = parseFloat(drawLine.getAttribute('stroke-dasharray')) || 3000;
      gsap.fromTo(drawLine,
        { strokeDashoffset: len },
        { strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: pjSection, start: 'top 60%', end: 'bottom 85%', scrub: 1.5 }
        });
    }

    pjSection.querySelectorAll('.pj-step, .fab-step-card').forEach((step, i) => {
      const fromX = i % 2 === 0 ? -60 : 60;
      gsap.fromTo(step,
        { x: fromX, opacity: 0, y: 30 },
        { x: 0, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 83%' }
        });
    });
  }

  // ── 7F. TECHNOLOGY CARDS — Scanning line + 3D tilt
  document.querySelectorAll('.tech-card, [data-anim="tech-card"]').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 80, opacity: 0, rotateY: 15 },
      { y: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out', delay: i * 0.15,
        scrollTrigger: { trigger: card, start: 'top 82%' }
      });

    // Scanning line effect on hover
    if (!window.matchMedia('(hover:none)').matches) {
      card.addEventListener('mouseenter', () => {
        const scanner = document.createElement('div');
        scanner.className = 'scan-line-effect';
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(scanner);
        setTimeout(() => scanner.remove(), 800);
      });
    }
  });

  // ── 7G. TESTIMONIALS — Alternating slide-in with mask reveal
  document.querySelectorAll('.testimonial-card, .slider-slide, [data-anim="testimonial"]').forEach((card, i) => {
    gsap.fromTo(card,
      { x: i % 2 === 0 ? -80 : 80, opacity: 0, clipPath: 'inset(0 50% 0 50%)' },
      { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0%)', duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 82%' }
      });

    // Animate star ratings
    card.querySelectorAll('.star, [data-lucide="star"]').forEach((star, si) => {
      gsap.fromTo(star,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, delay: si * 0.08, ease: 'back.out(2)',
          scrollTrigger: { trigger: card, start: 'top 82%' }
        });
    });
  });

  // ── 7H. STATISTICS — Number count-up + circular rings
  document.querySelectorAll('[data-counter], .stat-number, .counter-value').forEach(stat => {
    const raw = stat.getAttribute('data-counter') || stat.textContent.trim();
    const target = parseFloat(raw.replace(/[^0-9.]/g, '')) || 0;
    const suffix = stat.getAttribute('data-counter-suffix') || raw.replace(/[0-9.]/g, '') || '';
    const prefix = stat.getAttribute('data-counter-prefix') || '';

    if (!target) return;

    gsap.fromTo(stat,
      { innerText: 0 },
      { innerText: target, duration: 2.5, ease: 'power2.out',
        snap: { innerText: target % 1 === 0 ? 1 : 0.1 },
        onUpdate() { stat.textContent = prefix + Math.floor(parseFloat(stat.innerText)).toLocaleString() + suffix; },
        scrollTrigger: { trigger: stat, start: 'top 85%' }
      });
  });

  // ── 7I. BLOG CARDS — Cascade waterfall reveal
  document.querySelectorAll('[data-section="blog"] .glass-panel, .blog-card, article.glass-panel').forEach((card, i) => {
    const col = i % 3;
    gsap.fromTo(card,
      { y: 50 + col * 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: col * 0.12,
        scrollTrigger: { trigger: card, start: 'top 85%' }
      });
  });

  // ── 7J. CTA SECTIONS — 5 different effects
  // CTA 1: Floating particles
  const cta1 = document.querySelector('[data-cta="1"], .cta-particles');
  if (cta1) injectParticleField(cta1, 20);

  // CTA 2: Animated gradient sweep
  const cta2 = document.querySelector('[data-cta="2"], .cta-gradient-sweep');
  if (cta2) cta2.classList.add('gradient-sweep-anim');

  // CTA 3: Wave motion
  const cta3 = document.querySelector('[data-cta="3"], .cta-wave');
  if (cta3) cta3.classList.add('wave-bg-anim');

  // CTA 4: Light sweep (shimmer)
  const cta4 = document.querySelector('[data-cta="4"], .cta-light-sweep');
  if (cta4) cta4.classList.add('light-sweep-anim');

  // CTA 5: Geometric shapes
  const cta5 = document.querySelector('[data-cta="5"], .cta-geometric');
  if (cta5) injectGeometricShapes(cta5);

  // ── 7K. BEFORE/AFTER — Circular reveal
  const ba = document.querySelector('.before-after-container');
  if (ba) {
    gsap.fromTo(ba,
      { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
      { clipPath: 'circle(70% at 50% 50%)', opacity: 1, duration: 1.5, ease: 'power3.inOut',
        scrollTrigger: { trigger: ba, start: 'top 75%' }
      });
  }

  // ── 7L. FAQ ACCORDION — Smooth expand + icon rotate
  document.querySelectorAll('.accordion-header, [data-accordion-header]').forEach(header => {
    const chevron = header.querySelector('svg, i[data-lucide]');
    header.addEventListener('click', () => {
      const isOpen = header.classList.contains('active');
      const content = header.nextElementSibling;
      if (!content) return;

      if (isOpen) {
        gsap.to(content, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in' });
        if (chevron) gsap.to(chevron, { rotation: 0, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(content, { height: 'auto', opacity: 0 });
        const h = content.offsetHeight;
        gsap.fromTo(content,
          { height: 0, opacity: 0 },
          { height: h, opacity: 1, duration: 0.4, ease: 'power2.out' });
        if (chevron) gsap.to(chevron, { rotation: 45, duration: 0.3, ease: 'power2.out' });
      }
    });
  });

  // ── 7M. GALLERY — Masonry stagger reveal
  document.querySelectorAll('.gallery-item, [data-anim="gallery"]').forEach((item, i) => {
    const row = Math.floor(i / 3);
    gsap.fromTo(item,
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out',
        delay: (i % 3) * 0.1 + row * 0.05,
        scrollTrigger: { trigger: item, start: 'top 87%' }
      });

    // Overlay reveal on hover
    const overlay = item.querySelector('.gallery-overlay, .overlay');
    if (overlay && !window.matchMedia('(hover:none)').matches) {
      overlay.style.opacity = '0';
      overlay.style.transform = 'translateY(8px)';
      overlay.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      item.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1'; overlay.style.transform = 'translateY(0)';
      });
      item.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0'; overlay.style.transform = 'translateY(8px)';
      });
    }
  });

  // ── 7N. REFERRAL PATHWAY — Flowchart line draw + node pulse
  const referral = document.querySelector('[data-section="referral"], .referral-pathway');
  if (referral) {
    referral.querySelectorAll('svg path, svg line').forEach(path => {
      const len = path.getTotalLength ? path.getTotalLength() : 200;
      gsap.fromTo(path,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: referral, start: 'top 65%', end: 'bottom 85%', scrub: 1 }
        });
    });

    referral.querySelectorAll('.node, .step-node, .referral-step').forEach((node, i) => {
      gsap.fromTo(node,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: i * 0.2,
          scrollTrigger: { trigger: referral, start: 'top 70%' }
        });
    });
  }

  // ── 7O. FOOTER — Reveal from bottom + staggered social icons
  const footer = document.querySelector('footer');
  if (footer) {
    gsap.fromTo(footer,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: footer, start: 'top 90%' }
      });

    footer.querySelectorAll('[aria-label*="inkedIn"], [aria-label*="acebook"], [aria-label*="witter"], [aria-label*="nstagram"], [aria-label*="ouTube"]').forEach((icon, i) => {
      gsap.fromTo(icon,
        { y: 20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: i * 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: footer, start: 'top 90%' }
        });

      // Bounce on hover
      if (!window.matchMedia('(hover:none)').matches) {
        icon.addEventListener('mouseenter', () => gsap.to(icon, { y: -5, scale: 1.15, duration: 0.25, ease: 'power2.out' }));
        icon.addEventListener('mouseleave', () => gsap.to(icon, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.4)' }));
      }
    });
  }

  // ── 7P. REVEAL ELEMENT FALLBACK — generic sections
  document.querySelectorAll('.reveal-element:not([style])').forEach((el, i) => {
    gsap.fromTo(el,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%' }
      });
  });

  // Stagger children
  document.querySelectorAll('.stagger-children:not([style])').forEach(parent => {
    const children = parent.children;
    gsap.fromTo(children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: parent, start: 'top 82%' }
      });
  });

  // ── 7Q. CONTACT FORM SECTION — Slide in from right
  const contactSection = document.querySelector('#contact, .contact-section, [data-section="contact"]');
  if (contactSection) {
    gsap.fromTo(contactSection.querySelector('form, .contact-form'),
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: contactSection, start: 'top 75%' }
      });
    gsap.fromTo(contactSection.querySelector('.contact-info, h2'),
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: contactSection, start: 'top 75%' }
      });
  }

  // ── 7R. PROGRESS BARS — Rise animation
  document.querySelectorAll('.progress-bar, [data-progress]').forEach(bar => {
    const target = bar.getAttribute('data-width') || bar.getAttribute('data-progress') || '80';
    gsap.fromTo(bar,
      { width: '0%' },
      { width: `${target}%`, duration: 1.5, ease: 'power3.out',
        scrollTrigger: { trigger: bar, start: 'top 85%' }
      });
  });

  // ── 7S. SECTION DIVIDERS — Line draw
  document.querySelectorAll('.section-divider, hr.divider').forEach(div => {
    gsap.fromTo(div,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.out', transformOrigin: 'left center',
        scrollTrigger: { trigger: div, start: 'top 85%' }
      });
  });
}

/* ============================================================
   8. INTERSECTION OBSERVER FALLBACK (no GSAP)
   ============================================================ */
function initIOAnimations() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('active');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll(
    '.reveal-element, .stagger-children, .glass-panel, .reveal-fade-in, .reveal-scale-in'
  ).forEach(el => io.observe(el));
}

/* ============================================================
   9. HELPER — Particle field injection
   ============================================================ */
function injectParticleField(container, count = 15) {
  if (!container) return;
  container.style.position = 'relative';
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const colors = ['rgba(20,184,166,', 'rgba(103,232,249,', 'rgba(255,255,255,'];
    const col = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;border-radius:50%;pointer-events:none;
      background:${col}${(Math.random() * 0.5 + 0.1)});
      left:${Math.random() * 100}%;top:${Math.random() * 100}%;
      animation:particleFloat ${(Math.random() * 8 + 5).toFixed(1)}s ease-in-out infinite;
      animation-delay:${(Math.random() * 4).toFixed(1)}s;
    `;
    container.appendChild(p);
  }
}

/* ============================================================
   10. HELPER — Geometric shapes injection (CTA 5)
   ============================================================ */
function injectGeometricShapes(container) {
  if (!container) return;
  container.style.position = 'relative';
  const shapes = [
    { size: 80, shape: 'rotate(45deg)', color: 'rgba(20,184,166,0.08)', top: '10%', left: '5%' },
    { size: 50, shape: 'rotate(0deg)', color: 'rgba(103,232,249,0.1)', top: '60%', left: '90%' },
    { size: 100, shape: 'rotate(30deg)', color: 'rgba(15,76,129,0.07)', top: '80%', left: '15%' },
    { size: 60, shape: 'rotate(60deg)', color: 'rgba(20,184,166,0.06)', top: '20%', right: '10%' },
  ];
  shapes.forEach((s, i) => {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;width:${s.size}px;height:${s.size}px;border-radius:12px;
      background:${s.color};transform:${s.shape};pointer-events:none;
      top:${s.top || 'auto'};left:${s.left || 'auto'};right:${s.right || 'auto'};
      animation:geoFloat ${8 + i * 2}s ease-in-out infinite;
      animation-delay:${-i * 1.5}s;
    `;
    container.appendChild(el);
  });
}
