document.addEventListener("DOMContentLoaded", () => {
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
