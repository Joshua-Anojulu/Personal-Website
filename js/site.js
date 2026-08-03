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

  /* ===================== the proof sheet: seven plates ==================== */
  var PLATES = [
    {
      num: '01', name: 'EnsureCollege', kind: 'Shipped, live',
      body: 'A college-planning app that matches students to national scholarships and selective summer programs, with transparent scoring, source-linked requirements, saved plans and deadline tracking.',
      tags: ['FastAPI', 'Python', 'Postgres', 'Alembic', 'Vercel', 'Neon'],
      state: { label: 'Live', kind: 'live' },
      link: { label: 'ensurecollege.com', href: 'https://ensurecollege.com/' },
      restricted: 'Source private'
    },
    {
      num: '02', name: 'localflow', kind: 'Shipped, open source',
      body: 'Local-first, system-wide dictation for Windows 11. Hold Left Ctrl, transcribe with faster-whisper large-v3-turbo on your own GPU, paste into whatever app has focus. No cloud, no quota, and no audio leaves the machine.',
      tags: ['Python', 'faster-whisper', 'CUDA', 'Qt', 'Win32'],
      state: { label: 'Shipped', kind: 'live' },
      link: { label: 'github.com/Joshua-Anojulu/localflow', href: 'https://github.com/Joshua-Anojulu/localflow' }
    },
    {
      num: '03', name: 'plan-hardening', kind: 'Shipped, open source',
      body: 'An adversarial plan-review harness. One model drafts an implementation plan, a second attacks it in a read-only sandbox and returns a verdict, and the loop repeats until the plan survives or hits a round cap. Read-only is enforced by mechanism, not by asking politely.',
      tags: ['Shell', 'Node', 'sandboxing', 'adapters'],
      state: { label: 'Shipped', kind: 'live' },
      link: { label: 'github.com/Joshua-Anojulu/plan-hardening', href: 'https://github.com/Joshua-Anojulu/plan-hardening' }
    },
    {
      num: '04', name: 'Calibration under magnitude shift', kind: 'Research',
      body: 'Do photometric star, galaxy and quasar classifiers give probabilities you can actually trust, and does that hold as sources get fainter? Measured on 499,995 SDSS DR17 sources. The full result is in the next section.',
      tags: ['scikit-learn', 'SDSS DR17', 'calibration', 'bootstrap'],
      state: { label: 'URTC 2026', kind: 'open' },
      restricted: 'Source restricted'
    },
    {
      num: '05', name: 'Domain shift in remote sensing', kind: 'Research',
      body: 'A ResNet50 fine-tuned on EuroSAT reaches 98% benchmark accuracy, then collapses out of biome: F1 of 0.001 in the Congo Basin, on a composite the diagnostics show to be clean. A label-free AdaBN pass recovers it to 0.397. Benchmark accuracy does not transfer for free.',
      tags: ['PyTorch', 'ResNet50', 'EuroSAT', 'Sentinel-2', 'AdaBN'],
      state: { label: 'Result held', kind: 'live' },
      restricted: 'Source restricted'
    },
    {
      num: '06', name: 'Anti-virulence screen', kind: 'Research, null result',
      body: 'A structure-based docking screen against a bacterial virulence target. The result is null, and the SpeB positive control failed. A screen that cannot recover its own positive control cannot rank actives, so the work is being reframed as a benchmark of the pipeline itself.',
      tags: ['docking', 'AutoDock', 'RDKit', 'controls'],
      state: { label: 'Null', kind: 'null' },
      restricted: 'Source restricted'
    },
    {
      num: '07', name: 'Influenza peak timing', kind: 'Research, preliminary',
      body: 'Forecasting the timing and severity of US influenza season peaks from CDC surveillance data, standing at a fixed decision week inside an ongoing season. 19 seasons modelled. These results are preliminary and descriptive, and nothing here is a final claim.',
      tags: ['pandas', 'CDC ILINet', 'time series', 'scikit-learn'],
      state: { label: 'Preliminary', kind: 'null' },
      restricted: 'Source restricted'
    }
  ];

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

  /* =========================== render: plates ============================ */
  function renderPlates() {
    var host = document.getElementById('plates');
    if (!host) return;
    PLATES.forEach(function (p) {
      var li = el('li', 'plate reveal');
      li.appendChild(el('span', 'plate-num', p.num));

      var head = el('div', 'plate-head');
      head.appendChild(el('h3', 'plate-name', p.name));
      head.appendChild(el('span', 'plate-kind', p.kind));
      li.appendChild(head);

      li.appendChild(el('p', 'plate-body', p.body));

      var meta = el('div', 'plate-meta');
      p.tags.forEach(function (t) { meta.appendChild(el('span', 'plate-tag', t)); });
      li.appendChild(meta);

      var side = el('div', 'plate-side');
      side.appendChild(el('span', 'state state-' + p.state.kind, p.state.label));
      if (p.link) {
        var a = el('a', 'plate-link', p.link.label);
        a.href = p.link.href; a.target = '_blank'; a.rel = 'noopener';
        side.appendChild(a);
      }
      if (p.restricted) side.appendChild(el('span', 'plate-restricted', p.restricted));
      li.appendChild(side);

      host.appendChild(li);
    });
  }

  /* ======================== render: the readout ========================== */
  var activeBin = 4; // open on [20,22), where the transfer failure is largest

  function renderTable() {
    var body = document.getElementById('data-body');
    if (!body) return;
    body.textContent = '';
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

  renderPlates();
  renderFilters();
  renderTable();
  initReveals();
  initAmbientGate();
  initNavState();
})();
