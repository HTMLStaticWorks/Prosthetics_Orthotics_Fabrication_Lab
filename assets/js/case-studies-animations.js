document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP with Lenis
  gsap.registerPlugin(ScrollTrigger);
  
  // Section 1: Hero Featured Animation
  const tlHero = gsap.timeline();
  
  tlHero.to(".image-placeholder", {
    opacity: 0,
    duration: 0.5,
    delay: 0.2
  })
  .to(".feature-image", {
    opacity: 1,
    duration: 1.5,
    ease: "power2.out"
  }, "-=0.5")
  .fromTo(".feature-image-wrapper", {
    clipPath: "inset(10% 10% 10% 10% round 24px)"
  }, {
    clipPath: "inset(0% 0% 0% 0% round 24px)",
    duration: 1.5,
    ease: "power3.inOut"
  }, "-=1.5")
  .fromTo(".feature-content > *", {
    y: 40,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  }, "-=1.0");

  // Counter Animation function
  function animateCounters(elements) {
    elements.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
        }
      });
    });
  }
  
  // Initialize Counters
  animateCounters(document.querySelectorAll(".counter"));

  // Section 2: Masonry Grid Stagger
  gsap.utils.toArray(".reveal-header").forEach(header => {
    gsap.fromTo(header, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: header, start: "top 85%" } }
    );
  });

  gsap.fromTo(".masonry-card", 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", 
      scrollTrigger: {
        trigger: ".masonry-grid",
        start: "top 80%"
      }
    }
  );

  // Section 3: Before/After Slider Logic
  const baContainer = document.querySelector(".ba-slider-container");
  if(baContainer) {
    const clipWrapper = baContainer.querySelector(".ba-clip-wrapper");
    const handle = baContainer.querySelector(".ba-handle");
    let isDown = false;

    baContainer.addEventListener('mousedown', (e) => { isDown = true; });
    baContainer.addEventListener('mouseup', () => { isDown = false; });
    baContainer.addEventListener('mouseleave', () => { isDown = false; });
    
    baContainer.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const rect = baContainer.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      clipWrapper.style.width = percent + "%";
      handle.style.left = percent + "%";
    });

    // Touch support
    baContainer.addEventListener('touchstart', (e) => { isDown = true; });
    baContainer.addEventListener('touchend', () => { isDown = false; });
    baContainer.addEventListener('touchmove', (e) => {
      if(!isDown) return;
      // prevent scrolling when sliding
      e.preventDefault();
      const rect = baContainer.getBoundingClientRect();
      const touch = e.touches[0];
      const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      clipWrapper.style.width = percent + "%";
      handle.style.left = percent + "%";
    }, {passive: false});

    // Progress Bars Animation
    gsap.utils.toArray(".custom-progress").forEach(bar => {
      const width = bar.getAttribute("data-width");
      gsap.to(bar, {
        width: width,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar.closest(".progress-bar-item"),
          start: "top 85%"
        }
      });
    });
  }

  // Section 4: Timeline Animation
  const timelineContainer = document.querySelector(".timeline-container");
  if(timelineContainer) {
    gsap.to(".timeline-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: timelineContainer,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    gsap.fromTo(".timeline-card", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: {
          trigger: timelineContainer,
          start: "top 70%"
        }
      }
    );
  }

  // Section 5: Dashboard Analytics
  gsap.fromTo(".dashboard-card", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
      scrollTrigger: {
        trigger: ".dashboard-grid",
        start: "top 80%"
      }
    }
  );

  // SVG Circle Progress
  const circle = document.querySelector('.custom-circle-progress');
  if(circle) {
    // Circumference of r=15.9155 is exactly 100
    ScrollTrigger.create({
      trigger: circle,
      start: "top 85%",
      onEnter: () => {
        circle.style.strokeDasharray = "98, 100";
      }
    });
  }

  // Graph Bars
  gsap.utils.toArray(".graph-bars > div").forEach((bar, index) => {
    const height = bar.getAttribute("data-height");
    gsap.to(bar, {
      height: height,
      duration: 1,
      delay: index * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bar.closest(".graph-bars"),
        start: "top 85%"
      }
    });
  });

  // Testimonial Auto-scroll Carousel
  const track = document.getElementById('testimonial-carousel');
  if(track) {
    // Clone the track content to allow infinite scrolling effect
    // We already cloned it manually in HTML for simplicity, but let's animate it
    // Create a continuous marquee
    gsap.to(track, {
      x: "-50%",
      ease: "none",
      duration: 20,
      repeat: -1
    });

    // Pause on hover
    track.addEventListener("mouseenter", () => gsap.getTweensOf(track)[0].pause());
    track.addEventListener("mouseleave", () => gsap.getTweensOf(track)[0].play());
  }

});
