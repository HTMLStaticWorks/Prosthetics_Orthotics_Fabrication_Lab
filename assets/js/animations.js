/**
 * APEXFLEX - PREMIUM ADVANCED ANIMATIONS ENGINE
 * Powered by GSAP, ScrollTrigger, and Lenis Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scrolling
  initSmoothScroll();

  // 2. Page Entrance
  triggerEntranceAnimations();

  // 3. Mouse Follow Spotlight & Magnetic Buttons
  initMouseEffects();

  // 4. Section Specific GSAP & ScrollTrigger Animations
  initSectionAnimations();
});

// Smooth Scrolling
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

function triggerEntranceAnimations() {
  if (typeof gsap === 'undefined') return;

  // Header content fade
  gsap.from('header h1', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('header p', {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });

  // Nav slide down
  gsap.from('nav', {
    y: -80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
}

// Mouse Follow Glow and Magnetic Elements
function initMouseEffects() {
  const spotlight = document.createElement('div');
  spotlight.className = 'pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300 mix-blend-screen bg-[radial-gradient(600px_at_var(--x,_0px)_var(--y,_0px),rgba(103,232,249,0.08),transparent_80%)]';
  document.body.appendChild(spotlight);

  window.addEventListener('mousemove', (e) => {
    spotlight.style.opacity = '1';
    spotlight.style.setProperty('--x', `${e.clientX}px`);
    spotlight.style.setProperty('--y', `${e.clientY}px`);
  });

  // Magnetic button effect on hover
  document.querySelectorAll('.theme-toggle, .rtl-toggle, nav a, nav button').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// Section Specific Animations (GSAP & ScrollTrigger)
function initSectionAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // 1. Ken Burns Zoom on Hero backgrounds
  document.querySelectorAll('header[style*="background-image"]').forEach(heroBg => {
    gsap.to(heroBg, {
      backgroundSize: '115%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroBg,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // 2. Cinematic Reveal for Hero content (heading word-by-word reveal)
  document.querySelectorAll('header h1').forEach(heading => {
    const text = heading.innerText;
    heading.innerHTML = text.split(' ').map(word => `<span class="inline-block opacity-0 translate-y-4 translate-x-1">${word}&nbsp;</span>`).join('');
    gsap.to(heading.querySelectorAll('span'), {
      opacity: 1,
      y: 0,
      x: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });
  });

  // 3. Stagger scale-in for Hero CTAs
  document.querySelectorAll('header a, header button').forEach((btn, i) => {
    gsap.from(btn, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      delay: 0.5 + i * 0.1,
      ease: 'back.out(1.7)'
    });
  });

  // 4. Advanced Prosthetics Section (Layered Card Reveal + 3D Tilt)
  const prostheticsSec = document.querySelector('#prosthetics-section');
  if (prostheticsSec) {
    gsap.from('#prosthetics-section .image-mask-reveal', {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0,
      duration: 1.4,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: prostheticsSec,
        start: 'top 75%'
      }
    });

    gsap.from('#prosthetics-section .floating-card', {
      y: 80,
      x: (i) => i === 0 ? 50 : -50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: prostheticsSec,
        start: 'top 70%'
      }
    });
  }

  // 3D Perspective Tilt on cards
  document.querySelectorAll('.tech-card, #prosthetics-section .glass-panel, #orthotics-section .glass-panel').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        rotateY: x * 0.08,
        rotateX: -y * 0.08,
        transformPerspective: 1000,
        boxShadow: '0 25px 50px -12px rgba(103,232,249,0.25)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        boxShadow: 'none',
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // 5. Custom Orthotics (SVG connect line draw + Alt slide contents)
  const orthoticsSec = document.querySelector('#orthotics-section');
  if (orthoticsSec) {
    gsap.fromTo('#svg-connect-line', {
      strokeDashoffset: 1000,
      strokeDasharray: 1000
    }, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '#orthotics-section',
        start: 'top 40%',
        end: 'bottom 80%',
        scrub: 1
      }
    });
  }

  // 6. Patient Success & Rehab (Before/After sliding reveal & Testimonials cascade)
  const rehabSec = document.querySelector('#rehab-section');
  if (rehabSec) {
    gsap.from('#rehab-section .before-after-container', {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: rehabSec,
        start: 'top 75%'
      }
    });

    gsap.from('#rehab-section .testimonial-card-slide', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: rehabSec,
        start: 'top 70%'
      }
    });
  }

  // 7. Interactive Timeline Drawing (Process Section on index.html)
  const processSec = document.querySelector('#fabrication-process-section');
  if (processSec) {
    gsap.fromTo('#timeline-path-draw', {
      strokeDashoffset: 1000,
      strokeDasharray: 1000
    }, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '#fabrication-process-section',
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1
      }
    });
  }

  // 8. Statistics Counter animation
  const stats = document.querySelectorAll('[data-counter]');
  stats.forEach(stat => {
    const val = parseInt(stat.getAttribute('data-counter'), 10);
    const prefix = stat.getAttribute('data-counter-prefix') || '';
    const suffix = stat.getAttribute('data-counter-suffix') || '';
    
    gsap.fromTo(stat, {
      innerText: 0
    }, {
      innerText: val,
      duration: 2.2,
      ease: 'power2.out',
      snap: { innerText: 1 },
      onUpdate: function() {
        stat.innerText = prefix + Math.floor(stat.innerText) + suffix;
      },
      scrollTrigger: {
        trigger: stat,
        start: 'top 85%'
      }
    });
  });

  // 9. Infinite Logo Marquee track
  const logoTrack = document.querySelector('.logo-marquee-track');
  if (logoTrack) {
    gsap.to(logoTrack, {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1
    });
  }
}
