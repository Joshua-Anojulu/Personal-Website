var projectData = {
    scholarships: {
      kicker: '09 // Striker / live product',
      title: 'Scholarships4U',
      copy: 'A curated scholarship and elite summer-program planner for U.S. students. The GitHub version now goes beyond matching: students can build one profile, compare <b>204 scholarships</b> and <b>52 elite summer programs</b>, see transparent scoring reasons, save opportunities, track application status, export deadlines, and request server-side AI help for essays, draft review, and resume auto-fill.',
      tags: ['FastAPI','Python','Pydantic','SQLAlchemy','Anthropic API','Render'],
      links: [
        ['Live app','https://scholarships4u.dev/'],
        ['Source','https://github.com/Joshua-Anojulu/scholarship-matcher']
      ],
      toolkitTitle: 'Scholarships4U toolkit',
      toolkit: [
        {
          label: 'FastAPI backend',
          summary: 'Typed API routes for matching, accounts, AI, and saved data.',
          note: '<b>FastAPI backend:</b> routes the profile flow, matching response, account actions, and server-side AI requests behind one app.'
        },
        {
          label: 'Curated data modeling',
          summary: 'Pydantic schemas for scholarships, programs, and verification states.',
          note: '<b>Curated data modeling:</b> keeps real scholarships, summer programs, special requirements, deadlines, and verification flags explicit instead of hand-wavy.'
        },
        {
          label: 'Account systems',
          summary: 'Saved profiles, bookmarks, tracker statuses, and session cookies.',
          note: '<b>Account systems:</b> optional user accounts save the profile, bookmarks, tracker notes, and application statuses without blocking guest use.'
        },
        {
          label: 'LLM features',
          summary: 'Essay advice, draft review, and resume auto-fill with consent gates.',
          note: '<b>LLM features:</b> Anthropic-powered essay guidance, draft feedback, and resume extraction stay server-side and ask before sending sensitive student content.'
        },
        {
          label: 'Deployment',
          summary: 'Render, Postgres, migrations, password reset, and production env vars.',
          note: '<b>Deployment:</b> Render, Postgres, Alembic migrations, Resend password reset, and env-var handling make the demo usable outside localhost.'
        },
        {
          label: 'Vanilla frontend',
          summary: 'Responsive HTML, CSS, and JavaScript without a build step.',
          note: '<b>Vanilla frontend:</b> the app keeps the interface lightweight while still supporting sorting, filters, saved items, account modals, and theme behavior.'
        }
      ]
    },
    stellar: {
      kicker: '08 // Midfield / ML experiments',
      title: 'Stellar Classifier',
      copy: 'A reproducible study of how far you can trust a photometric classifier of galaxies, stars, and quasars on <b>100,000 SDSS objects</b>. Five self-contained experiments isolate where accuracy comes from and where it breaks down: redshift leakage, injected noise, useful bands, and brightness-regime generalization.',
      tags: ['scikit-learn','Python','SDSS','pandas','model evaluation'],
      links: [
        ['Source','https://github.com/Joshua-Anojulu/Stellar-Classifier']
      ],
      toolkitTitle: 'Stellar Classifier toolkit',
      toolkit: [
        {
          label: 'Python analysis',
          summary: 'Notebook-to-repo workflow with repeatable experiment sections.',
          note: '<b>Python analysis:</b> keeps the study runnable and modular instead of leaving the work as a one-off notebook.'
        },
        {
          label: 'pandas + SDSS',
          summary: 'Tabular cleaning and feature handling for sky-survey data.',
          note: '<b>pandas + SDSS:</b> supports the data preparation needed to compare galaxies, stars, and quasars across photometric features.'
        },
        {
          label: 'scikit-learn',
          summary: 'Classifier training, evaluation, and controlled comparisons.',
          note: '<b>scikit-learn:</b> powers the model training and makes it easier to isolate which experiments actually change performance.'
        },
        {
          label: 'Leakage checks',
          summary: 'Tests whether redshift shortcuts inflate classifier results.',
          note: '<b>Leakage checks:</b> separate real photometric signal from features that make the benchmark look better than it should.'
        },
        {
          label: 'Noise experiments',
          summary: 'Injected-noise tests for robustness under degraded inputs.',
          note: '<b>Noise experiments:</b> show how the classifier behaves when the data gets messier instead of only reporting clean-set accuracy.'
        },
        {
          label: 'Generalization tests',
          summary: 'Brightness-regime train/test splits for distribution shift.',
          note: '<b>Generalization tests:</b> ask whether a model trained on one brightness regime still behaves when evaluated on another.'
        }
      ]
    },
    calibration: {
      kicker: '04 // Defense / reliability under shift',
      title: 'Calibration robustness under magnitude shift',
      copy: 'Sole-author paper measuring whether photometric star, galaxy, and quasar classifiers stay calibrated as sources get fainter across <b>499,995 SDSS objects</b>. Capable models stay well calibrated across the magnitude range, with expected calibration error around <b>0.003 to 0.007</b>; naive Platt scaling on bright sources roughly quintuples faint-end error while temperature scaling transfers best.',
      tags: ['probability calibration','ECE','distribution shift','SDSS','IEEE URTC'],
      links: [
        ['Draft available on request', null]
      ],
      toolkitTitle: 'Calibration paper toolkit',
      toolkit: [
        {
          label: 'Probability calibration',
          summary: 'Reliability analysis beyond raw classification accuracy.',
          note: '<b>Probability calibration:</b> asks whether predicted probabilities mean what they claim, not just whether the top label is correct.'
        },
        {
          label: 'Expected calibration error',
          summary: 'ECE measurement across source brightness regimes.',
          note: '<b>Expected calibration error:</b> gives the paper a concrete way to compare reliability across magnitude ranges.'
        },
        {
          label: 'Magnitude shift',
          summary: 'Distribution-shift framing for fainter astronomical sources.',
          note: '<b>Magnitude shift:</b> turns the study into a stress test: what happens when sources get fainter and the data regime changes?'
        },
        {
          label: 'Recalibration methods',
          summary: 'Platt scaling versus temperature scaling transfer tests.',
          note: '<b>Recalibration methods:</b> compare how calibration fixes transfer, including the bright-source Platt scaling failure case.'
        },
        {
          label: 'Large-scale SDSS audit',
          summary: '499,995-object analysis across galaxy, star, and quasar classes.',
          note: '<b>Large-scale SDSS audit:</b> gives the calibration claims enough volume to be more than a tiny benchmark result.'
        },
        {
          label: 'Research writing',
          summary: 'Sole-author paper framing, results, and IEEE URTC target.',
          note: '<b>Research writing:</b> turns the experiments into a clear argument about where model confidence holds and where it breaks.'
        }
      ]
    },
    research: {
      kicker: '11 // Winger / in-progress research',
      title: 'Bioinformatics and flu forecasting',
      copy: 'Current research work includes a UNT computational pathogen-detection project using protein language model embeddings, plus a UTD influenza forecasting project that studies season timing and severity from <b>20+ seasons</b> of CDC surveillance data with a calibration-focused angle.',
      tags: ['protein embeddings','pathogen detection','CDC data','forecasting','calibration'],
      links: [
        ['GitHub profile','https://github.com/Joshua-Anojulu']
      ],
      toolkitTitle: 'Research-in-progress toolkit',
      toolkit: [
        {
          label: 'Protein language models',
          summary: 'Embedding-based workflows for pathogen-detection research.',
          note: '<b>Protein language models:</b> the bioinformatics work uses learned protein representations as the starting point for pathogen-detection workflows.'
        },
        {
          label: 'Literature review',
          summary: 'Getting oriented on datasets, methods, and lab workflows.',
          note: '<b>Literature review:</b> keeps the early-stage bioinformatics work grounded before making modeling claims.'
        },
        {
          label: 'CDC surveillance data',
          summary: '20+ influenza seasons for timing and severity modeling.',
          note: '<b>CDC surveillance data:</b> gives the flu project its historical signal for season timing and severity prediction.'
        },
        {
          label: 'Forecasting models',
          summary: 'Machine-learning approach to seasonal flu outcomes.',
          note: '<b>Forecasting models:</b> frame flu season timing and severity as predictive targets rather than descriptive summaries only.'
        },
        {
          label: 'Calibration angle',
          summary: 'Checking whether predictions are trustworthy, not just close.',
          note: '<b>Calibration angle:</b> carries the same reliability instinct from the astronomy work into public-health forecasting.'
        },
        {
          label: 'Research collaboration',
          summary: 'Lab onboarding, project constraints, and reproducible handoffs.',
          note: '<b>Research collaboration:</b> means learning existing workflows and making contributions that fit the project instead of freelancing a disconnected analysis.'
        }
      ]
    }
  };

  (function(){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var report = document.getElementById('match-report');
    var penalty = document.getElementById('penalty-card');
    var stage = document.getElementById('penalty-stage');
    var goal = document.getElementById('goal-area');
    var target = document.getElementById('target');
    var keeper = document.getElementById('keeper');
    var ball = document.getElementById('ball');
    var saveBurst = document.getElementById('save-burst');
    var note = document.getElementById('penalty-note');
    var shoot = document.getElementById('shoot-btn');
    var unlock = document.getElementById('unlock-btn');
    var scoreline = document.getElementById('scoreline');
    var laneButtons = document.querySelectorAll('[data-lane]');
    var aim = {x:76,y:34};
    var keeperX = 50;
    var attempts = 0;
    var isShooting = false;
    var unlocked = false;
    var resetTimer = 0;

    function clamp(value,min,max){
      return Math.max(min,Math.min(max,value));
    }

    function clearShotClasses(){
      window.clearTimeout(resetTimer);
      stage.classList.remove('is-goal','is-save');
      penalty.classList.remove('is-goal','is-save');
      keeper.classList.remove('is-diving-left','is-diving-right','is-jumping','is-beaten');
      ball.classList.remove('is-shooting','is-deflected');
    }

    function keeperMoveForShot(x){
      if(x < keeperX - 6) return 'is-diving-left';
      if(x > keeperX + 6) return 'is-diving-right';
      return 'is-jumping';
    }

    function setAim(x,y){
      aim.x = Math.max(8,Math.min(92,x));
      aim.y = Math.max(12,Math.min(82,y));
      target.style.setProperty('--aim-x',aim.x + '%');
      target.style.setProperty('--aim-y',aim.y + '%');
      laneButtons.forEach(function(btn){btn.classList.remove('is-active');});
    }

    function setLane(lane){
      var map = {
        left:[21,35],
        top:[50,19],
        right:[79,35]
      };
      setAim(map[lane][0],map[lane][1]);
      laneButtons.forEach(function(btn){btn.classList.toggle('is-active',btn.getAttribute('data-lane') === lane);});
    }

    function moveKeeper(){
      if(reduce || unlocked || isShooting) return;
      keeperX = [28,41,55,69][Math.floor(Math.random()*4)];
      keeper.style.setProperty('--keeper-x',keeperX + '%');
    }

    function unlockReport(message,scoredGoal){
      if(unlocked) return;
      unlocked = true;
      if(scoredGoal){
        stage.classList.add('is-goal');
        penalty.classList.add('is-goal');
        keeper.classList.add('is-beaten');
        scoreline.textContent = 'GOAL';
        window.setTimeout(function(){scoreline.textContent = '1 - 0';}, reduce ? 120 : 680);
      }else{
        scoreline.textContent = '1 - 0';
      }
      report.classList.add('is-unlocked');
      note.innerHTML = message || '<b>Goal.</b> Match report unlocked.';
      penalty.classList.remove('is-aiming');
      unlock.textContent = 'Report open';
      unlock.disabled = true;
      setTimeout(function(){report.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'});}, scoredGoal ? 920 : 260);
    }

    function takeShot(){
      if(isShooting || unlocked) return;
      attempts += 1;
      isShooting = true;
      shoot.disabled = true;
      note.textContent = 'Shot away...';
      clearShotClasses();
      var shotX = aim.x;
      var shotY = 10 + aim.y * 0.46;
      var topCorner = aim.y < 25;
      var outsideKeeper = Math.abs(aim.x - keeperX) > 17;
      var forcedGoal = attempts >= 3;
      var scored = topCorner || outsideKeeper || forcedGoal;
      var diveClass = keeperMoveForShot(shotX);

      keeper.classList.add(diveClass);
      if(scored) keeper.classList.add('is-beaten');
      ball.style.setProperty('--ball-x',shotX + '%');
      ball.style.setProperty('--ball-y',shotY + '%');
      ball.classList.add('is-shooting');

      window.setTimeout(function(){
        if(scored){
          unlockReport(forcedGoal && !outsideKeeper && !topCorner ? '<b>Goal.</b> Third attempt sneaks through and opens the report.' : '<b>Goal.</b> Net ripple. Match report unlocked.', true);
        }else{
          var deflectDir = shotX < keeperX ? -1 : 1;
          var deflectX = clamp(shotX + deflectDir * 24,10,90);
          var deflectY = clamp(shotY + 17,26,78);
          saveBurst.style.setProperty('--burst-x',shotX + '%');
          saveBurst.style.setProperty('--burst-y',shotY + '%');
          ball.style.setProperty('--deflect-x',deflectX + '%');
          ball.style.setProperty('--deflect-y',deflectY + '%');
          stage.classList.add('is-save');
          penalty.classList.add('is-save');
          ball.classList.add('is-deflected');
          note.innerHTML = '<b>Saved.</b> Gloves got there first. Try a top corner or pull it wider.';
          resetTimer = window.setTimeout(function(){
            clearShotClasses();
            shoot.disabled = false;
            isShooting = false;
            moveKeeper();
          }, reduce ? 180 : 850);
        }
      }, reduce ? 80 : 720);
    }

    goal.addEventListener('pointerdown',function(event){
      var rect = goal.getBoundingClientRect();
      var x = ((event.clientX - rect.left) / rect.width) * 100;
      var y = ((event.clientY - rect.top) / rect.height) * 100;
      setAim(x,y);
    });
    laneButtons.forEach(function(btn){
      btn.addEventListener('click',function(){setLane(btn.getAttribute('data-lane'));});
    });
    shoot.addEventListener('click',takeShot);
    unlock.addEventListener('click',function(){clearShotClasses(); unlockReport('<b>Report opened.</b> You skipped the penalty intro.', false);});
    setLane('right');
    moveKeeper();
    window.setInterval(moveKeeper,2200);
  })();

  (function(){
    var detail = {
      kicker: document.getElementById('detail-kicker'),
      title: document.getElementById('detail-title'),
      copy: document.getElementById('detail-copy'),
      tags: document.getElementById('detail-tags'),
      links: document.getElementById('detail-links')
    };
    var toolkit = {
      title: document.getElementById('toolkit-title'),
      list: document.getElementById('toolkit-list'),
      note: document.getElementById('playbook-note')
    };
    var players = document.querySelectorAll('.player');
    function renderToolkit(data, activeIndex){
      var activeTool = data.toolkit[activeIndex] || data.toolkit[0];
      toolkit.title.textContent = data.toolkitTitle;
      toolkit.list.innerHTML = data.toolkit.map(function(tool,index){
        var activeClass = index === activeIndex ? ' is-active' : '';
        return '<button type="button" class="staff-btn' + activeClass + '" data-tool-index="' + index + '"><b>' + tool.label + '</b><span>' + tool.summary + '</span></button>';
      }).join('');
      toolkit.note.innerHTML = activeTool.note;
    }
    function renderProject(key){
      var data = projectData[key];
      detail.kicker.textContent = data.kicker;
      detail.title.textContent = data.title;
      detail.copy.innerHTML = data.copy;
      detail.tags.innerHTML = data.tags.map(function(tag){return '<span class="tag">' + tag + '</span>';}).join('');
      detail.links.innerHTML = data.links.map(function(link){
        if(!link[1]) return '<a class="muted">' + link[0] + '</a>';
        return '<a href="' + link[1] + '" target="_blank" rel="noopener">' + link[0] + '</a>';
      }).join('');
      renderToolkit(data,0);
      players.forEach(function(player){player.classList.toggle('is-active',player.getAttribute('data-project') === key);});
    }
    players.forEach(function(player){
      player.addEventListener('click',function(){renderProject(player.getAttribute('data-project'));});
    });
    toolkit.list.addEventListener('click',function(event){
      var button = event.target.closest('.staff-btn');
      if(!button) return;
      var activePlayer = document.querySelector('.player.is-active');
      var activeKey = activePlayer ? activePlayer.getAttribute('data-project') : 'scholarships';
      var activeIndex = Number(button.getAttribute('data-tool-index')) || 0;
      renderToolkit(projectData[activeKey],activeIndex);
    });
    renderProject('scholarships');
  })();

  (function(){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = document.querySelectorAll('.reveal');
    if(reduce || !('IntersectionObserver' in window)){
      els.forEach(function(el){el.classList.add('in');});
      return;
    }
    var heroEls = document.querySelectorAll('.hero .reveal');
    heroEls.forEach(function(el,i){setTimeout(function(){el.classList.add('in');},80*i);});
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    els.forEach(function(el){
      if(!el.closest('.hero')) io.observe(el);
    });
  })();
