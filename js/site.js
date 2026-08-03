/* ===========================================================================
   Joshua Anojulu, matchday portfolio.
   Vanilla, no build step, no framework. Loaded at the end of <body>.

   Every value below is real. No invented statistics (house-style ban 3):
   the calibration matrix is measured output from the study's own
   results/metrics_by_magnitude_agg.csv, and the satellite and influenza
   figures come from those projects' own reported results.
   =========================================================================== */
(function () {
  'use strict';

  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* =========================================================================
     DATA: the squad. Shirt number is diegetic information, not an eyebrow.
     ====================================================================== */
  var SQUAD = [
    {
      num: '01', name: 'EnsureCollege', role: 'Striker / shipped',
      body: 'A live college-planning app that matches students to national scholarships and selective summer programs, with transparent scoring, source-linked requirements, saved plans and deadline tracking.',
      tags: ['FastAPI', 'Python', 'Postgres', 'Alembic', 'Vercel', 'Neon'],
      status: { label: 'Live', kind: 'live' },
      link: { label: 'ensurecollege.com', href: 'https://ensurecollege.com/' },
      restricted: 'Source: private',
      skillTitle: 'EnsureCollege', skillKicker: '01 // Striker',
      skills: [
        ['API', 'FastAPI backend', 'Typed routes for matching, accounts, saved plans and server-side AI.'],
        ['DATA', 'Curated data model', 'Real scholarships and programs with explicit requirements, deadlines and verification state.'],
        ['AUTH', 'Accounts and sessions', 'Profiles, bookmarks and application status, without blocking guest use.'],
        ['OPS', 'Deploy and migrations', 'Vercel and Neon Postgres, Alembic migrations applied deliberately rather than on boot.']
      ]
    },
    {
      num: '02', name: 'localflow', role: 'Midfield / shipped',
      body: 'Local-first, system-wide dictation for Windows 11. Hold Left Ctrl, transcribe with faster-whisper large-v3-turbo on your own GPU, paste into whatever app has focus. No cloud, no quota, and no audio leaves the machine.',
      tags: ['Python', 'faster-whisper', 'CUDA', 'Qt', 'Win32'],
      status: { label: 'Shipped', kind: 'live' },
      link: { label: 'github.com/Joshua-Anojulu/localflow', href: 'https://github.com/Joshua-Anojulu/localflow' },
      skillTitle: 'localflow', skillKicker: '02 // Midfield',
      skills: [
        ['ASR', 'Local transcription', 'faster-whisper large-v3-turbo running on the local GPU, no network call in the hot path.'],
        ['HOOK', 'Global keyboard hook', 'A push-to-talk key that survives focus changes across arbitrary applications.'],
        ['UX', 'Paste into focus', 'Text lands in the focused control, so it works in apps with no integration.'],
        ['PRIV', 'Nothing leaves', 'Audio is captured, transcribed and discarded locally by design.']
      ]
    },
    {
      num: '03', name: 'plan-hardening', role: 'Midfield / shipped',
      body: 'An adversarial plan-review harness. One model drafts an implementation plan, a second attacks it in a read-only sandbox and returns a verdict, and the loop repeats until the plan survives or hits a round cap. Read-only is enforced by mechanism, not by asking politely.',
      tags: ['Shell', 'Node', 'adapters', 'sandboxing'],
      status: { label: 'Shipped', kind: 'live' },
      link: { label: 'github.com/Joshua-Anojulu/plan-hardening', href: 'https://github.com/Joshua-Anojulu/plan-hardening' },
      skillTitle: 'plan-hardening', skillKicker: '03 // Midfield',
      skills: [
        ['LOOP', 'Bounded review loop', 'Caps on both successful rounds and total launches, so the loop always terminates.'],
        ['SAFE', 'Enforced read-only', 'Each adapter must pass an acceptance test with a working positive control before it counts as verified.'],
        ['PROV', 'Provenance binding', 'A verdict is bound to a hash of the plan body it actually reviewed, or it is not a claim.'],
        ['MULTI', 'Reviewer adapters', 'Repo-grounded and plan-only reviewers, each with its own gate and failure taxonomy.']
      ]
    },
    {
      num: '04', name: 'Calibration robustness', role: 'Defence / research',
      body: 'Do photometric star, galaxy and quasar classifiers give probabilities you can actually trust, and does that hold as sources get fainter? Measured on 499,995 SDSS DR17 sources. The full result is in the table below.',
      tags: ['scikit-learn', 'SDSS DR17', 'calibration', 'bootstrap'],
      // "Written up for" rather than "in submission": the paper is ready but the
      // venue deadline has not passed yet, so the stronger claim would be false.
      status: { label: 'URTC 2026', kind: 'open' },
      restricted: 'Source: restricted',
      skillTitle: 'Calibration robustness', skillKicker: '04 // Defence',
      skills: [
        ['ECE', 'Calibration metrics', 'Expected and class-wise calibration error with bootstrap intervals, not a single point estimate.'],
        ['SHIFT', 'Magnitude split', 'Train bright, evaluate faint, so the reported failure is a transfer failure rather than noise.'],
        ['RECAL', 'Three methods compared', 'Platt, isotonic and temperature scaling, each fitted on bright sources and tested on faint.'],
        ['REPRO', 'Seeded pipeline', 'Fixed splits and a locked requirements file so the numbers regenerate.']
      ]
    },
    {
      num: '05', name: 'Domain shift in remote sensing', role: 'Defence / research',
      body: 'A ResNet50 fine-tuned on EuroSAT reaches 98% benchmark accuracy, then collapses out of biome: F1 of 0.001 in the Congo Basin, on a composite the diagnostics show to be clean. A label-free AdaBN pass recovers it to 0.397. Benchmark accuracy does not transfer for free.',
      tags: ['PyTorch', 'ResNet50', 'EuroSAT', 'Sentinel-2', 'AdaBN'],
      status: { label: 'Result held', kind: 'live' },
      restricted: 'Source: restricted',
      skillTitle: 'Domain shift in remote sensing', skillKicker: '05 // Defence',
      skills: [
        ['CV', 'Transfer learning', 'ImageNet ResNet50 adapted to Sentinel-2 land cover with seeded splits and checkpointing.'],
        ['GEO', 'Geospatial pipeline', 'Two-date composites tiled into georeferenced patches, then scored into change maps.'],
        ['ADAPT', 'Label-free adaptation', 'AdaBN recomputes batch statistics on the target biome without a single new label.'],
        ['VALID', 'External validation', 'Detected loss compared against Global Forest Watch rather than judged by eye.']
      ]
    },
    {
      num: '06', name: 'Anti-virulence screen', role: 'Defence / research',
      body: 'A structure-based docking screen against a bacterial virulence target. The result is null, and the SpeB positive control failed. A screen that cannot recover its own positive control cannot rank actives, so the work is being reframed as a benchmark of the pipeline itself.',
      tags: ['docking', 'AutoDock', 'RDKit', 'controls'],
      status: { label: 'Null result', kind: 'null' },
      restricted: 'Source: restricted',
      skillTitle: 'Anti-virulence screen', skillKicker: '06 // Defence',
      skills: [
        ['DOCK', 'Structure-based screen', 'Ligand preparation, receptor setup and scoring across a compound library.'],
        ['CTRL', 'Positive controls', 'The control is the finding here: it failed, and that invalidates the ranking.'],
        ['HONEST', 'Reported as null', 'Published as a negative result rather than reframed into a win.'],
        ['NEXT', 'Benchmark reframe', 'The pipeline becomes the object of study instead of the compounds.']
      ]
    },
    {
      num: '07', name: 'Influenza timing', role: 'Substitute / preliminary',
      body: 'Forecasting the timing and severity of US influenza season peaks from CDC surveillance data, standing at a fixed decision week inside an ongoing season. 19 seasons modelled. These results are preliminary and descriptive, and nothing here is a final claim.',
      tags: ['pandas', 'CDC ILINet', 'time series', 'scikit-learn'],
      status: { label: 'Preliminary', kind: 'null' },
      restricted: 'Source: restricted',
      skillTitle: 'Influenza timing', skillKicker: '07 // Substitute',
      skills: [
        ['DATA', 'CDC surveillance', 'Weighted ILI by MMWR week, assembled across seasons with explicit inclusion rules.'],
        ['TASK', 'Within-season framing', 'Forecast from a fixed decision week using only data available by then.'],
        ['TIERS', 'Severity tiers', 'CDC-anchored thresholds rather than tiers invented to fit the data.'],
        ['LIMIT', 'Small sample, stated', 'Nineteen seasons is a small n, and the write-up says so rather than burying it.']
      ]
    }
  ];

  /* =========================================================================
     DATA: measured calibration matrix. Expected calibration error, lower is
     better. "bright fit" means the recalibrator was fitted on bright sources
     and then applied to this magnitude bin, which is the transfer test.
     ====================================================================== */
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

  /* ========================== small helpers ============================== */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function fmt(v) { return v.toFixed(5); }

  /* ====================== render: the team sheet ========================= */
  var sheet = document.getElementById('teamsheet');
  var selected = 0;

  function renderSquad() {
    if (!sheet) return;
    SQUAD.forEach(function (p, i) {
      var li = el('li', 'ts-row reveal');
      li.appendChild(el('span', 'ts-num', p.num));

      var head = el('div', 'ts-head');
      var nameBtn = el('button', 'ts-name', p.name);
      nameBtn.type = 'button';
      nameBtn.setAttribute('aria-describedby', 'h-toolkit');
      nameBtn.addEventListener('click', function () { select(i, true); });
      head.appendChild(nameBtn);
      head.appendChild(el('span', 'ts-role', p.role));
      li.appendChild(head);

      li.appendChild(el('p', 'ts-body', p.body));

      var meta = el('div', 'ts-meta');
      p.tags.forEach(function (t) { meta.appendChild(el('span', 'ts-tag', t)); });
      li.appendChild(meta);

      var side = el('div', 'ts-side');
      side.appendChild(el('span', 'lamp lamp-' + p.status.kind, p.status.label));
      if (p.link) {
        var a = el('a', 'ts-link', p.link.label);
        a.href = p.link.href;
        a.target = '_blank';
        a.rel = 'noopener';
        side.appendChild(a);
      }
      if (p.restricted) side.appendChild(el('span', 'ts-restricted', p.restricted));
      li.appendChild(side);

      sheet.appendChild(li);
    });
  }

  /* ================ render: the skills panel, follows selection ========== */
  var kicker = document.getElementById('toolkit-kicker');
  var title = document.getElementById('toolkit-title');
  var list = document.getElementById('skill-list');

  function select(i, moveFocus) {
    selected = i;
    var p = SQUAD[i];
    if (kicker) kicker.textContent = p.skillKicker;
    if (title) title.textContent = p.skillTitle;
    if (!list) return;
    list.textContent = '';
    p.skills.forEach(function (s) {
      var li = el('li');
      li.appendChild(el('b', null, s[0]));
      li.appendChild(el('span', 'skill-name', s[1]));
      li.appendChild(el('span', 'skill-note', s[2]));
      list.appendChild(li);
    });
    if (moveFocus) {
      var target = document.getElementById('toolkit');
      if (target) {
        target.scrollIntoView({ behavior: reduceMQ.matches ? 'auto' : 'smooth', block: 'start' });
        if (title) { title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true }); }
      }
    }
  }

  /* ====================== render: the stats table ======================== */
  var filterRow = document.getElementById('filter-row');
  var statsBody = document.getElementById('stats-body');
  var activeBin = 4; // open on [20,22), where the transfer failure is largest

  function renderTable() {
    if (!statsBody) return;
    statsBody.textContent = '';
    Object.keys(CALIB).forEach(function (model) {
      var row = CALIB[model][activeBin];
      var tr = el('tr');
      var th = el('th', 'cell-model', model);
      th.scope = 'row';
      tr.appendChild(th);

      var raw = row[0];
      tr.appendChild(el('td', null, fmt(raw)));

      // Compare the three recalibration methods against EACH OTHER, per row.
      // Green marks the best transfer in this row, red the worst.
      //
      // The earlier version compared each method to raw ECE, which read as
      // green on LogReg temperature (0.07583) even though that is 2.4x worse
      // than its own raw 0.03117, while leaving RandomForest temperature
      // (0.01747) unmarked, which is the value that actually held. Same real
      // numbers, but the emphasis contradicted the caption above the table.
      var methods = [row[1], row[2], row[3]];
      var best = Math.min.apply(null, methods);
      var worst = Math.max.apply(null, methods);
      methods.forEach(function (v) {
        var cls = v === best ? 'cell-good' : (v === worst ? 'cell-bad' : null);
        tr.appendChild(el('td', cls, fmt(v)));
      });
      statsBody.appendChild(tr);
    });
  }

  function renderFilters() {
    if (!filterRow) return;
    BINS.forEach(function (b, i) {
      var btn = el('button', 'filter', b);
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(i === activeBin));
      btn.addEventListener('click', function () {
        activeBin = i;
        Array.prototype.forEach.call(filterRow.children, function (c, j) {
          c.setAttribute('aria-pressed', String(j === activeBin));
        });
        renderTable();
      });
      filterRow.appendChild(btn);
    });
  }

  /* ============================ reveals ================================== */
  function initReveals() {
    var items = document.querySelectorAll('.reveal');
    if (reduceMQ.matches || !('IntersectionObserver' in window)) {
      // End state, immediately. Never an empty stage (Ch7.1).
      Array.prototype.forEach.call(items, function (n) { n.classList.add('is-in'); });
      return;
    }

    // Synchronous first pass. Anything already on screen is revealed without
    // waiting for an observer callback, so above-the-fold content never
    // depends on IO delivering. Chrome defers IO callbacks entirely while a
    // tab is in the background, which would otherwise paint a blank hero for
    // anyone who opens the page in a background tab and switches to it later.
    function sweep() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(items, function (n) {
        if (n.classList.contains('is-in')) return;
        var r = n.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) n.classList.add('is-in');
      });
    }
    sweep();
    // A tab that was hidden at load gets a correct first paint on reveal.
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') sweep();
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(items, function (n) { io.observe(n); });
  }

  /* ======================= the ambient gate ==============================
     Pauses when off-screen AND when the tab is hidden. The CSS default is
     `running`, so if this never runs the page still animates rather than
     silently freezing with no error.
     ==================================================================== */
  function initAmbientGate() {
    var layer = document.getElementById('floodlights');
    if (!layer) return;
    if (reduceMQ.matches) { layer.dataset.ambient = 'paused'; return; }
    var onScreen = true;
    function sync() {
      layer.dataset.ambient =
        (onScreen && document.visibilityState === 'visible') ? 'running' : 'paused';
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting; sync();
      });
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
      var id = a.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Array.prototype.forEach.call(links, function (a) { a.removeAttribute('aria-current'); });
        var a = map[e.target.id];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ========================= the penalty =================================
     Signposted play (Ch4.4): real buttons, a written label, a rewarded click.
     Not a gate. Nothing on the page is hidden behind it.
     ==================================================================== */
  function initPenalty() {
    var goal = document.getElementById('goal');
    var keeper = document.getElementById('keeper');
    var ball = document.getElementById('ball');
    var out = document.getElementById('penalty-out');
    var lanes = document.querySelectorAll('.lane');
    if (!goal || !keeper || !ball || !out || !lanes.length) return;

    var taken = 0, scored = 0, busy = false;
    var OFFSET = { left: '-120%', middle: '0%', right: '120%' };

    function shoot(lane) {
      if (busy) return;
      busy = true;                                    // duplicate-fire protection
      var keys = ['left', 'middle', 'right'];
      var dive = keys[Math.floor(Math.random() * 3)];
      var saved = dive === lane;

      keeper.style.setProperty('--keeper-x', OFFSET[dive]);
      ball.style.setProperty('--bx', OFFSET[lane]);
      ball.style.setProperty('--by', '-260%');

      taken += 1;
      if (!saved) scored += 1;

      window.setTimeout(function () {
        out.textContent = (saved ? 'Saved. ' : 'Scored. ') + 'Scored ' + scored + ' of ' + taken + '.';
        window.setTimeout(function () {
          ball.style.setProperty('--bx', '0%');
          ball.style.setProperty('--by', '0%');
          keeper.style.setProperty('--keeper-x', '0%');
          busy = false;
        }, reduceMQ.matches ? 0 : 420);
      }, reduceMQ.matches ? 0 : 380);
    }

    Array.prototype.forEach.call(lanes, function (b) {
      b.addEventListener('click', function () { shoot(b.dataset.lane); });
    });
  }

  /* ============================== boot =================================== */
  renderSquad();
  renderFilters();
  renderTable();
  select(0, false);
  initReveals();
  initAmbientGate();
  initNavState();
  initPenalty();
})();
