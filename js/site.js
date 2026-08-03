/* ===========================================================================
   Joshua Anojulu. Vanilla, no build step, no framework.

   Every number below is measured. No invented statistics (house-style ban 3):
   the calibration matrix is real output from the study's own
   results/metrics_by_magnitude_agg.csv, and the satellite and influenza
   figures come from those projects' reported results.
   =========================================================================== */
(function () {
  'use strict';

  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* The seven plates are STATIC MARKUP in index.html, not injected from here.
     They used to live in a PLATES array at this spot, which meant a 404 on this
     file emptied the Work section. Everything else on the page fails open, so
     the content does too. Edit the plates in index.html. */

  /* ============= measured calibration matrix, lower is better ============= */
  var BINS = ['[14,17)', '[17,18)', '[18,19)', '[19,20)', '[20,22)'];
  var CALIB = {
    'LogReg':       [[0.17217,0.14274,0.11987,0.12215],[0.13074,0.15292,0.13491,0.08214],
                     [0.16458,0.12927,0.06462,0.15090],[0.09525,0.09733,0.06223,0.08807],
                     [0.03117,0.04809,0.08936,0.07583]],
    'RandomForest': [[0.00644,0.00799,0.00236,0.00281],[0.00775,0.00668,0.00275,0.00283],
                     [0.01151,0.01156,0.00429,0.00406],[0.00937,0.03176,0.00891,0.00619],
                     [0.00362,0.06336,0.02366,0.01747]],
    'HistGB':       [[0.00265,0.00875,0.00834,0.00264],[0.00352,0.00906,0.00856,0.00248],
                     [0.00626,0.00662,0.00571,0.00500],[0.00530,0.00528,0.00606,0.00452],
                     [0.00453,0.00702,0.00945,0.00863]],
    'MLP':          [[0.00324,0.00806,0.00286,0.00269],[0.00293,0.00625,0.00250,0.00255],
                     [0.00412,0.01162,0.00422,0.00388],[0.00525,0.03133,0.00623,0.00516],
                     [0.00603,0.06192,0.00967,0.00652]]
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function fmt(v) { return v.toFixed(5); }

  /* ======================== render: the readout ==========================
     activeBin MUST match the static tbody in index.html, which is written out
     for [20,22), the bin where the transfer failure is largest. */
  var activeBin = 4;

  function renderTable() {
    var body = document.getElementById('data-body');
    if (!body) return;
    body.textContent = '';
    var current = document.getElementById('bin-current');
    if (current) current.textContent = BINS[activeBin];
    Object.keys(CALIB).forEach(function (model) {
      var row = CALIB[model][activeBin];
      var tr = el('tr');
      var th = el('th', 'cell-model', model);
      th.scope = 'row';
      tr.appendChild(th);
      tr.appendChild(el('td', null, fmt(row[0])));

      // Compare the three recalibration methods against EACH OTHER, per row.
      // Comparing them to raw ECE instead would mark LogReg temperature as good
      // at 0.07583 despite being 2.4x worse than its own raw 0.03117, which
      // contradicts the caption above the table.
      var methods = [row[1], row[2], row[3]];
      var best = Math.min.apply(null, methods);
      var worst = Math.max.apply(null, methods);
      methods.forEach(function (v) {
        tr.appendChild(el('td', v === best ? 'cell-good' : (v === worst ? 'cell-bad' : null), fmt(v)));
      });
      body.appendChild(tr);
    });
  }

  function renderFilters() {
    var row = document.getElementById('filter-row');
    if (!row) return;
    BINS.forEach(function (b, i) {
      var btn = el('button', 'filter', b);
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(i === activeBin));
      btn.addEventListener('click', function () {
        activeBin = i;
        Array.prototype.forEach.call(row.children, function (c, j) {
          c.setAttribute('aria-pressed', String(j === activeBin));
        });
        renderTable();
      });
      row.appendChild(btn);
    });
  }

  /* ============================== reveals ================================ */
  function initReveals() {
    var items = document.querySelectorAll('.reveal');
    if (reduceMQ.matches || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (n) { n.classList.add('is-in'); });
      return;
    }
    // Synchronous first pass, so above-the-fold never waits on an observer.
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

  renderFilters();
  renderTable();
  initReveals();
  initAmbientGate();
  initNavState();
  initNavStates();
})();
