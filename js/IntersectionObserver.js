document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const heroParallaxBg = document.querySelector(".hero-parallax-bg");

  if (
    hero &&
    heroParallaxBg &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    let ticking = false;
    const maxShift = 80;

    const updateHeroParallax = () => {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(
        Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0),
        1
      );
      const shift = (progress - 0.5) * maxShift;

      heroParallaxBg.style.transform = `translate3d(0, ${shift}px, 0) scale(1.08)`;
      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHeroParallax);
      }
    };

    updateHeroParallax();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
  }

  const sections = document.querySelectorAll("main section");
  if (!sections.length) return;

  sections.forEach((section, index) => {
    section.classList.add("reveal-section");
    if (index === 0) {
      section.classList.add("is-visible");
    }
  });

  const sectionsToObserve = Array.from(sections).slice(1);

  if (!("IntersectionObserver" in window)) {
    sectionsToObserve.forEach(section => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  sectionsToObserve.forEach(section => observer.observe(section));
});
