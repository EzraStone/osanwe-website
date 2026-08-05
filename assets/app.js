/* Osanwë — reveal on scroll, and a header that recolors over dark sections.
   Scrolling itself is left entirely to the browser: no wheel hijacking, no
   snap container, no scroll listeners. */

(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── reveal ───────────────────────────────────────────────────── */
  var items = document.querySelectorAll('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        revealer.unobserve(e.target);       // reveal once, then stop watching
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(items, function (el) { revealer.observe(el); });
  }

  /* ── header follows the section beneath it ────────────────────── */
  var chrome   = document.getElementById('chrome');
  var sections = document.querySelectorAll('[data-theme]');
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  if (!chrome || !sections.length || !('IntersectionObserver' in window)) return;

  var PALETTE = {
    light: { ink:'#0d1217', mute:'#6f767d', bg:'rgba(239,241,241,.82)', line:'#dbe0e4', meta:'#eff1f1' },
    dark:  { ink:'#eef1f3', mute:'#848d95', bg:'rgba(5,6,7,.80)',       line:'#1c2126', meta:'#050607' }
  };

  var current = null;
  function apply(theme) {
    if (theme === current) return;
    current = theme;
    var c = PALETTE[theme] || PALETTE.light;
    var s = document.documentElement.style;
    s.setProperty('--chrome-ink',  c.ink);
    s.setProperty('--chrome-mute', c.mute);
    s.setProperty('--chrome-bg',   c.bg);
    s.setProperty('--chrome-line', c.line);
    if (themeMeta) themeMeta.setAttribute('content', c.meta);
  }

  /* Fire for whichever section currently sits under the header band. */
  var band = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) apply(e.target.dataset.theme);
    });
  }, { rootMargin: '-64px 0px -100% 0px', threshold: 0 });

  Array.prototype.forEach.call(sections, function (el) { band.observe(el); });

  apply(sections[0].dataset.theme);
})();
