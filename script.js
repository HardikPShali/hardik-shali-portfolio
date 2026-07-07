const glow = document.querySelector(".cursor-glow");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (glow && !reducedMotion) {
  window.addEventListener("pointermove", (event) => {
    glow.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
  });
}

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.count);
      const suffix = target === 40 ? "%" : "+";
      const start = performance.now();
      const duration = 1100;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        entry.target.textContent = `${value.toLocaleString()}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.65 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const filters = document.querySelectorAll(".filter");
const skills = document.querySelectorAll(".skill-cloud button");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const target = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("active", item === filter));
    skills.forEach((skill) => {
      const shouldDim = target !== "all" && skill.dataset.type !== target;
      skill.classList.toggle("is-dimmed", shouldDim);
    });
  });
});

const canvas = document.getElementById("perfCanvas");
const ctx = canvas?.getContext("2d");

function resizeCanvas() {
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawCockpit(time = 0) {
  if (!canvas || !ctx) return;

  const { width, height } = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, width, height);

  const centerX = width * 0.54;
  const centerY = height * 0.35;
  const pulse = reducedMotion ? 0 : Math.sin(time / 650) * 0.5 + 0.5;

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255, 253, 247, 0.12)";
  for (let x = -30; x < width + 30; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height * 0.18, height);
    ctx.stroke();
  }

  const rings = [
    { radius: 78, color: "#d6d64b", speed: 0.0014 },
    { radius: 128, color: "#46c2a8", speed: -0.001 },
    { radius: 186, color: "#e4572e", speed: 0.00072 },
  ];

  rings.forEach((ring, index) => {
    const angle = reducedMotion ? index : time * ring.speed + index;
    ctx.beginPath();
    ctx.arc(centerX, centerY, ring.radius, angle, angle + Math.PI * 1.46);
    ctx.strokeStyle = ring.color;
    ctx.lineWidth = 8 - index;
    ctx.lineCap = "round";
    ctx.stroke();

    const dotX = centerX + Math.cos(angle + Math.PI * 1.46) * ring.radius;
    const dotY = centerY + Math.sin(angle + Math.PI * 1.46) * ring.radius;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 8 + pulse * 3, 0, Math.PI * 2);
    ctx.fillStyle = ring.color;
    ctx.fill();
  });

  const cards = [
    { x: width * 0.09, y: height * 0.13, w: 150, h: 76, label: "FCP", value: "1.2s", color: "#d6d64b" },
    { x: width * 0.64, y: height * 0.12, w: 156, h: 76, label: "UX", value: "A11y", color: "#46c2a8" },
    { x: width * 0.1, y: height * 0.45, w: 178, h: 82, label: "Bundle", value: "-40%", color: "#e4572e" },
  ];

  cards.forEach((card) => {
    ctx.fillStyle = "rgba(255, 253, 247, 0.92)";
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.fillRect(card.x, card.y, card.w, card.h);
    ctx.strokeRect(card.x, card.y, card.w, card.h);
    ctx.fillStyle = card.color;
    ctx.fillRect(card.x + 12, card.y + 12, 34, 10);
    ctx.fillStyle = "#111827";
    ctx.font = "700 13px Inter";
    ctx.fillText(card.label, card.x + 12, card.y + 42);
    ctx.font = "800 25px Space Grotesk";
    ctx.fillText(card.value, card.x + 72, card.y + 50);
  });

  ctx.fillStyle = "rgba(255, 253, 247, 0.94)";
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 2;
  const coreSize = 118 + pulse * 8;
  ctx.fillRect(centerX - coreSize / 2, centerY - coreSize / 2, coreSize, coreSize);
  ctx.strokeRect(centerX - coreSize / 2, centerY - coreSize / 2, coreSize, coreSize);
  ctx.fillStyle = "#111827";
  ctx.font = "800 28px Space Grotesk";
  ctx.textAlign = "center";
  ctx.fillText("React", centerX, centerY - 2);
  ctx.font = "700 13px Inter";
  ctx.fillText("TypeScript UI", centerX, centerY + 24);
  ctx.textAlign = "start";

  if (!reducedMotion) {
    requestAnimationFrame(drawCockpit);
  }
}

if (canvas && ctx) {
  resizeCanvas();
  drawCockpit();
  window.addEventListener("resize", () => {
    resizeCanvas();
    drawCockpit();
  });
}
