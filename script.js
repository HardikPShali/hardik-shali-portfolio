const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const bar = document.querySelector(".progress span");
const updateProgress = () => {
  const height = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = `${height > 0 ? (scrollY / height) * 100 : 0}%`;
};
addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const reveal = document.querySelectorAll(".reveal");
if (reduced) reveal.forEach((el) => el.classList.add("visible"));
else {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  reveal.forEach((el) => observer.observe(el));
}

const toggle = document.querySelector(".proof-toggle");
toggle.addEventListener("click", () => {
  const active = document.body.classList.toggle("proof-on");
  toggle.setAttribute("aria-pressed", String(active));
  toggle.querySelector(".toggle-label").textContent = active
    ? "Evidence shown"
    : "Show evidence";
});

const detail = document.querySelector(".arch-detail");
document.querySelectorAll(".arch-flow button").forEach((button) => {
  const show = () => (detail.textContent = button.dataset.detail);
  button.addEventListener("mouseenter", show);
  button.addEventListener("focus", show);
  button.addEventListener("click", show);
});

document.querySelector("[data-top]").addEventListener("click", () => {
  scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
});

const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");
const setMenu = (open) => {
  topbar.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
};
menuToggle.addEventListener("click", () =>
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true"),
);
document
  .querySelectorAll(".header-panel nav a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", (event) => {
  if (event.key === "Escape" && topbar.classList.contains("menu-open")) {
    setMenu(false);
    menuToggle.focus();
  }
});
