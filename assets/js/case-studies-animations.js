function initCaseStudiesAnimations() {
  
  // 1. Initialize Lenis Smooth Scroll
  let lenis;
  if (window.lenis) {
    lenis = window.lenis;
  } else {
    lenis = new Lenis({
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
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Sync GSAP with Lenis
  gsap.registerPlugin(ScrollTrigger);

  // 2. Section 1 & Section 3: Before/After Comparison Sliders (Generic multi-slider logic)
  const sliders = document.querySelectorAll(".ba-slider-container");
  sliders.forEach(container => {
    const clipWrapper = container.querySelector(".ba-clip-wrapper");
    const handle = container.querySelector(".ba-handle");
    let isDragging = false;

    const updateSlider = (clientX) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      clipWrapper.style.width = percent + "%";
      handle.style.left = percent + "%";
    };

    // Mouse events
    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });
    window.addEventListener("mouseup", () => {
      isDragging = false;
    });
    container.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    // Touch events
    container.addEventListener("touchstart", (e) => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener("touchend", () => {
      isDragging = false;
    });
    container.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });
  });

  // 3. Counter Animations (General ScrollTrigger)
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    gsap.fromTo(counter, {
      innerHTML: 0
    }, {
      innerHTML: target,
      duration: 2,
      ease: "power2.out",
      snap: { innerHTML: 1 },
      scrollTrigger: {
        trigger: counter,
        start: "top 90%",
      }
    });
  });

  // 4. Progress Bars Animation (Section 3)
  const progressBars = document.querySelectorAll(".custom-progress");
  progressBars.forEach(bar => {
    const widthVal = bar.getAttribute("data-width");
    gsap.to(bar, {
      width: widthVal,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 92%"
      }
    });
  });

  // 5. Masonry Grid Cards entrance (Section 2)
  gsap.fromTo(".masonry-card", 
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.15, 
      ease: "power2.out", 
      scrollTrigger: {
        trigger: ".masonry-grid",
        start: "top 85%"
      }
    }
  );

  // 6. Horizontal Timeline draws path & step cards reveal (Section 4)
  const timelineSection = document.querySelector(".timeline-container");
  if (timelineSection) {
    gsap.to(".timeline-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: timelineSection,
        start: "top 75%",
        end: "bottom 30%",
        scrub: 1.2
      }
    });

    gsap.fromTo(".timeline-card", 
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.75, 
        stagger: 0.15, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".horizontal-scroll-container",
          start: "top 80%"
        }
      }
    );
  }

  // 7. Outcomes Circle Progress & Graph Bars (Section 5)
  const circle = document.querySelector('.custom-circle-progress');
  if (circle) {
    ScrollTrigger.create({
      trigger: circle,
      start: "top 85%",
      onEnter: () => {
        circle.style.strokeDasharray = "99.1, 100";
      }
    });
  }

  // Graph bars height transition
  const bars = document.querySelectorAll(".graph-bars > div > div");
  bars.forEach((bar, index) => {
    const targetHeight = bar.getAttribute("data-height");
    gsap.to(bar, {
      height: targetHeight,
      duration: 1.2,
      delay: index * 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 90%"
      }
    });
  });

  // 8. Magnetic Buttons subtle interactive hover (CTA section)
  const magneticBtns = document.querySelectorAll(".magnetic-btn");
  magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
  });

  // 9. Floating Particles Background builder (CTA section)
  const ctaParticles = document.getElementById("cta-particles");
  if (ctaParticles) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      
      const size = Math.random() * 8 + 4;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      
      // Delay and duration variance
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 10 + 8 + "s";
      
      ctaParticles.appendChild(particle);
    }
  }

  // 10. General Page Entrance reveal sequence
  const reveals = document.querySelectorAll(".reveal-element");
  reveals.forEach(el => {
    gsap.fromTo(el, 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%"
        }
      }
    );
  });

  // Remove skeleton loader wrapper
  const loader = document.querySelector(".skeleton-wrapper");
  const actualContent = document.querySelector(".actual-content");
  if (loader && actualContent) {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          loader.classList.add("hidden");
          gsap.to(actualContent, { opacity: 1, duration: 0.5 });
        }
      });
    }, 600);
  }

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCaseStudiesAnimations);
} else {
  initCaseStudiesAnimations();
}
