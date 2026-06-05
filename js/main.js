const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const mobile=$('#mobilePanel'), hamb=$('#hamb'); if(hamb){hamb.addEventListener('click',()=>mobile.classList.toggle('open'));}
// active link
const path=location.pathname.split('/').pop()||'index.html'; $$('.nav-links a,.mobile-panel a').forEach(a=>{const href=a.getAttribute('href'); if(href===path || (path===''&&href==='index.html')) a.classList.add('active')});
// reveal animations, low cost
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show'); io.unobserve(e.target)}})},{threshold:.12}); $$('.reveal').forEach(el=>io.observe(el));
// panel pointer glow
$$('.panel').forEach(p=>p.addEventListener('pointermove',e=>{const r=p.getBoundingClientRect(); p.style.setProperty('--mx',`${e.clientX-r.left}px`); p.style.setProperty('--my',`${e.clientY-r.top}px`)}));
// cursor glow throttled via rAF
const glow=$('.cursor-glow'); let mx=innerWidth/2,my=innerHeight/2, ticking=false; if(glow && matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{mx=e.clientX; my=e.clientY; if(!ticking){requestAnimationFrame(()=>{glow.style.transform=`translate3d(${mx-180}px,${my-180}px,0)`; ticking=false}); ticking=true;}})}
// magnetic buttons lightweight
$$('.btn').forEach(btn=>{btn.addEventListener('pointermove',e=>{if(!matchMedia('(pointer:fine)').matches)return; const r=btn.getBoundingClientRect(); const x=(e.clientX-r.left-r.width/2)*.12; const y=(e.clientY-r.top-r.height/2)*.12; btn.style.transform=`translate3d(${x}px,${y}px,0)`}); btn.addEventListener('pointerleave',()=>btn.style.transform='')});
function buildMessage(form){const data=new FormData(form); let lines=[]; for(const [k,v] of data.entries()){if(v) lines.push(`${k}: ${v}`)} return encodeURIComponent(`Fuelerz enquiry\n\n${lines.join('\n')}`)}
$$('form[data-whatsapp]').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault(); const msg=buildMessage(form); location.href=`https://wa.me/917722011476?text=${msg}`;})});
