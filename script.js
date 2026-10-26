'use strict';
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const progress = $('#scrollProgress');
const siteHeader = $('#siteHeader');
let scrollTicking = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  siteHeader.classList.toggle('scrolled', window.scrollY > 20);
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) { requestAnimationFrame(updateScroll); scrollTicking = true; }
}, {passive: true});
window.addEventListener('resize', updateScroll);
updateScroll();

const menuToggle = $('#menuToggle');
const mobileNav = $('#mobileNav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Mở menu' : 'Đóng menu');
  mobileNav.hidden = expanded;
});
$$('a', mobileNav).forEach(a => a.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Mở menu');
  mobileNav.hidden = true;
}));

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
  });
}, {threshold: 0.06, rootMargin: '0px 0px 20px 0px'}) : null;
$$('.reveal').forEach((el,i) => {
  if (observer) observer.observe(el);
  else el.classList.add('visible');
});

const previews = {
  cpu: {src:'assets/cpu.png', alt:'Ảnh chụp giao diện CPU v4.0 với thông số nhân, luồng, xung nhịp, cache và ảo hóa', tab:'tabCpu'},
  overview: {src:'assets/overview.png', alt:'Ảnh chụp giao diện Tổng quan công cụ Hardware Inspector v4.0', tab:'tabOverview'}
};
const previewImage = $('#previewImage');
const fullPreviewLink = $('#fullPreviewLink');
const previewPanel = $('#previewPanel');
$$('[data-preview]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.preview;
  if (!Object.hasOwn(previews, key)) return;
  const p = previews[key];
  $$('[data-preview]').forEach(b => {
    const active = b === button;
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', String(active));
    b.tabIndex = active ? 0 : -1;
  });
  previewImage.src = p.src;
  previewImage.alt = p.alt;
  fullPreviewLink.href = p.src;
  previewPanel.setAttribute('aria-labelledby', p.tab);
}));

let toastTimer;
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}
$('#copyChecksum').addEventListener('click', async () => {
  const value = $('#checksumValue').textContent.trim();
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      const area = document.createElement('textarea');
      area.value = value; area.style.position = 'fixed'; area.style.opacity = '0';
      document.body.appendChild(area); area.select();
      if (!document.execCommand('copy')) throw new Error('Copy not supported');
      area.remove();
    }
    toast('Đã sao chép mã SHA-256');
  } catch (error) {
    toast('Không thể sao chép tự động. Hãy chọn và sao chép mã bên cạnh.');
  }
});

// The animated perspective is a decorative effect. It does not read hardware or collect data.
const tiltCard = $('#tiltCard');
if (window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  const area = $('.hero-visual');
  let frame = 0;
  area.addEventListener('pointermove', event => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = area.getBoundingClientRect();
      const x = ((event.clientX - r.left) / r.width - .5) * 2;
      const y = ((event.clientY - r.top) / r.height - .5) * 2;
      tiltCard.style.transform = `rotateY(${(-9 + x * 4).toFixed(2)}deg) rotateX(${(3 - y * 4).toFixed(2)}deg) rotateZ(-2deg)`;
    });
  }, {passive:true});
  area.addEventListener('pointerleave', () => {tiltCard.style.transform = ''});
}
