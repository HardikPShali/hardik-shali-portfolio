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

// Ask my portfolio: streams answers from /api/ask (grounded in api/profile.js).
const askForm = document.querySelector(".ask-form");
if (askForm) {
  const input = askForm.querySelector("input");
  const submit = askForm.querySelector(".ask-submit");
  const log = document.querySelector(".ask-log");
  const history = [];
  let busy = false;

  const ask = async (question) => {
    question = question.trim();
    if (!question || busy) return;
    busy = true;
    submit.disabled = true;
    input.value = "";

    const turn = document.createElement("div");
    turn.className = "ask-turn";
    const q = document.createElement("p");
    q.className = "q";
    q.textContent = question;
    const a = document.createElement("p");
    a.className = "a pending";
    turn.append(q, a);
    log.prepend(turn);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "The assistant is unavailable right now.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        a.textContent += decoder.decode(value, { stream: true });
      }
      history.push({ role: "user", content: question }, { role: "assistant", content: a.textContent });
      history.splice(0, Math.max(0, history.length - 6));
    } catch (error) {
      a.textContent = `${error.message} You can always email hardikshali1612@gmail.com.`;
      a.classList.add("error");
    } finally {
      a.classList.remove("pending");
      busy = false;
      submit.disabled = false;
    }
  };

  askForm.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(input.value);
  });
  document.querySelectorAll(".ask-chips button").forEach((chip) =>
    chip.addEventListener("click", () => ask(chip.textContent)),
  );
}
