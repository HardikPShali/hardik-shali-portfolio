const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const bar = document.querySelector('.progress span');
const updateProgress = () => {
  const height = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = `${height > 0 ? (scrollY / height) * 100 : 0}%`;
};
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const reveal = document.querySelectorAll('.reveal');
if (reduced) reveal.forEach(el => el.classList.add('visible'));
else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  reveal.forEach(el => observer.observe(el));
}

const toggle = document.querySelector('.proof-toggle');
toggle.addEventListener('click', () => {
  const active = document.body.classList.toggle('proof-on');
  toggle.setAttribute('aria-pressed', String(active));
  toggle.querySelector('.toggle-label').textContent = active ? 'Proof visible' : 'Proof mode';
});

const detail = document.querySelector('.arch-detail');
document.querySelectorAll('.arch-flow button').forEach(button => {
  const show = () => detail.textContent = button.dataset.detail;
  button.addEventListener('mouseenter', show);
  button.addEventListener('focus', show);
  button.addEventListener('click', show);
});

document.querySelector('[data-top]').addEventListener('click', () => {
  scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
});
