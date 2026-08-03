/* ===========================================================================
   Joshua Anojulu. Vanilla, no build step, no framework.

   This file ONLY enhances. Every word and number on the page is static markup
   in index.html, because a 404 here must not empty a section. Nothing below
   renders content: reveals, the ambient gate and the nav states, and that is
   the whole job.
   =========================================================================== */
(function () {
  'use strict';

  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ============================== reveals ================================
     Below-the-fold only. Above the fold uses the CSS-only .rise class, so
     first paint never waits on this file.
     ==================================================================== */
  function initReveals() {
    var items = document.querySelectorAll('.reveal');
    if (reduceMQ.matches || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (n) { n.classList.add('is-in'); });
      return;
    }
    // Synchronous first pass, so anything already on screen never waits on an
    // observer. Chrome defers IntersectionObserver callbacks in a background
    // tab, which is exactly how a reveal system ends up showing a blank page.
    function sweep() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(items, function (n) {
        if (n.classList.contains('is-in')) return;
        var r = n.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) n.classList.add('is-in');
      });
    }
    sweep();
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') sweep();
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(items, function (n) { io.observe(n); });
  }

  /* =========================== the ambient gate ==========================
     Pauses off-screen AND when the tab is hidden. CSS default is `running`,
     so a wiring failure costs battery rather than silently freezing the page.
     ==================================================================== */
  function initAmbientGate() {
    var layer = document.getElementById('press');
    if (!layer) return;
    if (reduceMQ.matches) { layer.dataset.ambient = 'paused'; return; }
    var onScreen = true;
    function sync() {
      layer.dataset.ambient =
        (onScreen && document.visibilityState === 'visible') ? 'running' : 'paused';
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; sync(); });
      io.observe(layer);
    }
    document.addEventListener('visibilitychange', sync);
    sync();
  }

  /* ==================== nav: mark the current chapter ==================== */
  function initNavState() {
    var links = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    Array.prototype.forEach.call(links, function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1));
      if (sec) map[sec.id] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Array.prototype.forEach.call(links, function (a) { a.removeAttribute('aria-current'); });
        if (map[e.target.id]) map[e.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ======================= nav: the three states =========================
     hero -> handoff -> solid, driven by two zero-height sentinels in the hero.
     No scroll listener: Ch3.1 bans window scroll events, scrollY in state, and
     rAF loops that touch state.

     Fails to `solid` rather than `hero` when observers are unavailable, because
     a solid bar is legible over every chapter while a transparent one is only
     correct over the hero.
     ==================================================================== */
  function initNavStates() {
    var bar = document.getElementById('bar');
    var sHandoff = document.getElementById('sentinel-handoff');
    var sSolid = document.getElementById('sentinel-solid');
    if (!bar) return;
    if (!sHandoff || !sSolid || !('IntersectionObserver' in window)) {
      bar.dataset.state = 'solid';
      return;
    }

    function apply() {
      var pastHandoff = sHandoff.getBoundingClientRect().top < 0;
      var pastSolid = sSolid.getBoundingClientRect().top < 0;
      bar.dataset.state = pastSolid ? 'solid' : (pastHandoff ? 'handoff' : 'hero');
    }

    // Synchronous first pass, so a reload partway down the page paints the
    // correct state immediately instead of flashing the hero treatment.
    apply();

    var io = new IntersectionObserver(apply, { threshold: 0 });
    io.observe(sHandoff);
    io.observe(sSolid);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') apply();
    });
  }

  initReveals();
  initAmbientGate();
  initNavState();
  initNavStates();
})();
