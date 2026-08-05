/* Osanwë deck — slide chrome, navigation and reveal.
   No dependencies. Progressive: without JS the slides still scroll and read. */

(function () {
  'use strict';

  var deck   = document.getElementById('deck');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotBar = document.querySelector('.dots');
  var curEl  = document.getElementById('cur');
  var totEl  = document.getElementById('total');
  var skip   = document.getElementById('skip');

  if (!deck || !slides.length) return;

  var active = 0;
  var pad = function (n) { return String(n + 1).padStart(2, '0'); };

  totEl.textContent = pad(slides.length - 1);

  /* ── dots ─────────────────────────────────────────────────────── */
  var dots = slides.map(function (slide, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Go to slide ' + (i + 1) + ': ' + (slide.dataset.label || ''));
    b.addEventListener('click', function () { go(i); });
    dotBar.appendChild(b);
    return b;
  });

  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }

  /* ── chrome colour follows the active slide ───────────────────── */
  function paint(slide) {
    var dark = slide.dataset.theme === 'dark';
    var root = document.documentElement.style;
    root.setProperty('--chrome-ink',  dark ? '#eef1f3' : '#0d1217');
    root.setProperty('--chrome-mute', dark ? '#666e75' : '#8b9299');
    root.setProperty('--page-edge',   dark ? '#050607' : '#eff1f1');
    document.body.style.background = dark ? '#050607' : '#eff1f1';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#050607' : '#eff1f1');
  }

  function setActive(i) {
    if (i === active) return;
    active = i;
    curEl.textContent = pad(i);
    dots.forEach(function (d, n) {
      if (n === i) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    paint(slides[i]);
    skip.classList.toggle('hidden', i === slides.length - 1);
  }

  /* ── reveal + active tracking ─────────────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
      if (e.intersectionRatio >= 0.55) setActive(slides.indexOf(e.target));
    });
  }, { threshold: [0.25, 0.55, 0.9] });

  slides.forEach(function (s) { io.observe(s); });

  /* first slide paints immediately, before any scroll happens */
  paint(slides[0]);
  dots[0].setAttribute('aria-current', 'true');
  curEl.textContent = pad(0);
  requestAnimationFrame(function () { slides[0].classList.add('in'); });

  /* ── keyboard ─────────────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); go(active + 1); break;
      case 'ArrowUp': case 'PageUp':
        e.preventDefault(); go(active - 1); break;
      case 'Home':
        e.preventDefault(); go(0); break;
      case 'End':
        e.preventDefault(); go(slides.length - 1); break;
    }
  });

  skip.addEventListener('click', function () { go(active + 1); });
})();
