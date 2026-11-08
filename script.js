/* ══════════════════════════════════════
   CANVAS — Particle Mesh with Mouse Repulsion
══════════════════════════════════════ */
(function () {
  const c   = document.getElementById('canvas-bg');
  const ctx = c.getContext('2d');
  let W, H, pts = [];
  let mouse = { x: -9999, y: -9999 };

  function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const N = 70;
  const palette = ['#7c3aed','#06b6d4','#10b981','#f59e0b','#a78bfa'];
  for (let i = 0; i < N; i++) {
    pts.push({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .5,
      col: palette[i % palette.length],
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124,58,237,${(1 - d / 130) * 0.16})`;
          ctx.lineWidth = .5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    pts.forEach(p => {
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 100 && md > 0) {
        const force = (100 - md) / 100;
        p.vx += (mdx / md) * force * 0.6;
        p.vy += (mdy / md) * force * 0.6;
      }
      p.vx *= .98; p.vy *= .98;
      p.vx = Math.max(-1.2, Math.min(1.2, p.vx));
      p.vy = Math.max(-1.2, Math.min(1.2, p.vy));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + 'aa';
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══════════════════════════════════════
   BENTO CARD — Mouse Radial Glow
══════════════════════════════════════ */
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
  });
});

/* ══════════════════════════════════════
   HAMBURGER
══════════════════════════════════════ */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mobNav');
hbg.addEventListener('click', () => {
  hbg.classList.toggle('open');
  mob.classList.toggle('open');
});
mob.querySelectorAll('.nl').forEach(l => l.addEventListener('click', () => {
  hbg.classList.remove('open');
  mob.classList.remove('open');
}));

/* ══════════════════════════════════════
   NAVBAR — scroll + active link
══════════════════════════════════════ */
const navEl  = document.getElementById('nav');
const secs   = document.querySelectorAll('section[id]');
const nlsAll = document.querySelectorAll('.nl');

window.addEventListener('scroll', () => {
  navEl.classList.toggle('up', scrollY > 20);
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 150) cur = s.id; });
  nlsAll.forEach(l => {
    l.classList.remove('on');
    if (l.getAttribute('href') === '#' + cur) l.classList.add('on');
  });
}, { passive: true });

/* ══════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
  });
});

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
  });
}, { threshold: .07, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.r').forEach(el => obs.observe(el));

/* ══════════════════════════════════════
   TYPEWRITER — Fixed cycling logic
══════════════════════════════════════ */
const roles  = ['Python Developer', 'Django Developer', 'Backend Engineer', 'REST API Builder', 'Full Stack Developer'];
const roleEl = document.getElementById('role');
let ri = 0, ci = 0, deleting = false;

function type() {
  const word = roles[ri];

  if (!deleting) {
    ci++;
    roleEl.textContent = word.slice(0, ci);
    if (ci === word.length) {
      // Finished typing — pause then start deleting
      setTimeout(() => { deleting = true; type(); }, 1800);
      return;
    }
  } else {
    ci--;
    roleEl.textContent = word.slice(0, ci);
    if (ci === 0) {
      // Finished deleting — move to next word
      deleting = false;
      ri = (ri + 1) % roles.length;
      setTimeout(type, 300);
      return;
    }
  }

  setTimeout(type, deleting ? 55 : 95);
}

// Kick off after a short initial delay
setTimeout(type, 500);

/* ══════════════════════════════════════
   CUSTOM CURSOR — Fixed transform syntax
══════════════════════════════════════ */
const curEl  = document.getElementById('cur');
const curREl = document.getElementById('curR');
let mx = 0, my = 0, cx = 0, cy = 0, rx = 0, ry = 0;

// Track mouse
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

// Animate cursor with lerp — use left/top not transform to avoid calc() issues
curEl.style.position  = 'fixed';
curEl.style.pointerEvents = 'none';
curREl.style.position = 'fixed';
curREl.style.pointerEvents = 'none';

(function tick() {
  // Dot follows quickly
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  // Ring follows slowly
  rx += (mx - rx) * 0.08;
  ry += (my - ry) * 0.08;

  // Use left/top with offset for center alignment (avoids calc in transform)
  const dotSize  = 10;
  const ringSize = 38;
  curEl.style.left = (cx - dotSize  / 2) + 'px';
  curEl.style.top  = (cy - dotSize  / 2) + 'px';
  curREl.style.left = (rx - ringSize / 2) + 'px';
  curREl.style.top  = (ry - ringSize / 2) + 'px';

  requestAnimationFrame(tick);
})();

// Cursor hover effects
document.querySelectorAll('a, button, .mpill, .bento-card, .proj-card, .srv-card, .skill-cat, .cert-card, .tcard').forEach(el => {
  el.addEventListener('mouseenter', () => {
    curREl.style.width  = '20px';
    curREl.style.height = '20px';
    curREl.style.borderColor = 'rgba(6,182,212,0.95)';
  });
  el.addEventListener('mouseleave', () => {
    curREl.style.width  = '38px';
    curREl.style.height = '38px';
    curREl.style.borderColor = 'rgba(124,58,237,0.55)';
  });
});

/* ══════════════════════════════════════
   SKILL PILLS — Staggered entrance
══════════════════════════════════════ */
document.querySelectorAll('.skill-cat').forEach(cat => {
  cat.querySelectorAll('.spill').forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(10px)';
    p.style.transition = `opacity .4s ${i * 55}ms, transform .4s ${i * 55}ms`;
  });
});

const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.spill').forEach(p => {
        p.style.opacity = '1';
        p.style.transform = 'translateY(0)';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.skill-cat').forEach(c => skillObs.observe(c));

/* ══════════════════════════════════════
   STAT COUNTERS — Animate on reveal
══════════════════════════════════════ */
function animateValue(el, from, to, suffix, duration) {
  const isDecimal = !Number.isInteger(to);
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = from + (to - from) * eased;
    el.textContent = (isDecimal ? val.toFixed(2) : Math.round(val)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterTargets = [
  { sel: '.bento-val[style*="10b981"]', from: 0, to: 8.36, suffix: '' },
  { sel: '.bento-val[style*="06b6d4"]', from: 0, to: 25,   suffix: '%' },
  { sel: '.bento-val[style*="f59e0b"]', from: 0, to: 3,    suffix: '' },
];

const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    counterTargets.forEach(ct => {
      const el = document.querySelector(ct.sel);
      if (el) animateValue(el, ct.from, ct.to, ct.suffix, 1400);
    });
    countObs.disconnect();
  });
}, { threshold: .5 });
const bentoSection = document.querySelector('.bento');
if (bentoSection) countObs.observe(bentoSection);

/* ══════════════════════════════════════
   PROJECT & SERVICE CARDS — Subtle Tilt
══════════════════════════════════════ */
document.querySelectorAll('.proj-card:not(.feat), .srv-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    card.style.transform = `translateY(-7px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});