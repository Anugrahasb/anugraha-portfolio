document.documentElement.classList.add("js-ready");

// Flip the profile badge between a short profile and the main technical focus.
const identityBadge = document.getElementById("identityBadge");
identityBadge?.addEventListener("click", () => identityBadge.classList.toggle("flipped"));

// The profile companion appears after the hero and can be dismissed for the session.
const companion = document.getElementById("floatingCompanion");
const hideCompanion = document.getElementById("hideCompanion");
let companionDismissed = false;
const updateCompanion = () => {
  if (!companion || companionDismissed) return;
  companion.classList.toggle("visible", window.scrollY > Math.max(320, window.innerHeight * 0.62));
};
window.addEventListener("scroll", updateCompanion, { passive: true });
window.addEventListener("resize", updateCompanion);
hideCompanion?.addEventListener("click", () => {
  companionDismissed = true;
  companion?.classList.remove("visible");
  companion?.classList.add("hidden");
});
updateCompanion();

// Animate counters only when a future metric is explicitly marked up in the page.
const counters = document.querySelectorAll("[data-count]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const start = performance.now();
      const duration = 1200;
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = `${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${el.dataset.suffix || ""}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.35 });
  counters.forEach(el => observer.observe(el));
}


// Profile badge flip and scroll companion.
(() => {
  const badge = document.querySelector('.identity-badge');
  if (badge) badge.addEventListener('click', () => badge.classList.toggle('flipped'));
  const companion = document.querySelector('.floating-companion');
  const hide = companion?.querySelector('button');
  let dismissed = false;
  const updateCompanion = () => {
    if (!companion || dismissed) return;
    companion.classList.toggle('visible', window.scrollY > 560);
  };
  window.addEventListener('scroll', updateCompanion, { passive: true });
  hide?.addEventListener('click', () => { dismissed = true; companion.classList.remove('visible'); companion.classList.add('hidden'); });
  updateCompanion();
})();
