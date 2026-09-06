const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const bar=document.querySelector('.progress span');
const progress=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=`${h>0?scrollY/h*100:0}%`};
addEventListener('scroll',progress,{passive:true});progress();
if(!reduced){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
document.querySelector('[data-top]').addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'}));
