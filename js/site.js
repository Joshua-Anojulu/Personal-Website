var projectData = {
    scholarships: {
      kicker: '09 // Striker / live product',
      title: 'Scholarships4U',
      copy: 'A curated scholarship and elite summer-program planner for U.S. students. The GitHub version now goes beyond matching: students can build one profile, compare <b>204 scholarships</b> and <b>52 elite summer programs</b>, see transparent scoring reasons, save opportunities, track application status, export deadlines, and request server-side AI help for essays, draft review, and resume auto-fill.',
      tags: ['FastAPI','Python','Pydantic','SQLAlchemy','Anthropic API','Render'],
      links: [
        ['Live app','https://scholarships4u.dev/'],
        ['Source','https://github.com/Joshua-Anojulu/scholarship-matcher']
      ]
    },
    stellar: {
      kicker: '08 // Midfield / ML experiments',
      title: 'Stellar Classifier',
      copy: 'A reproducible study of how far you can trust a photometric classifier of galaxies, stars, and quasars on <b>100,000 SDSS objects</b>. Five self-contained experiments isolate where accuracy comes from and where it breaks down: redshift leakage, injected noise, useful bands, and brightness-regime generalization.',
      tags: ['scikit-learn','Python','SDSS','pandas','model evaluation'],
      links: [
        ['Source','https://github.com/Joshua-Anojulu/Stellar-Classifier']
      ]
    },
    calibration: {
      kicker: '04 // Defense / reliability under shift',
      title: 'Calibration robustness under magnitude shift',
      copy: 'Sole-author paper measuring whether photometric star, galaxy, and quasar classifiers stay calibrated as sources get fainter across <b>499,995 SDSS objects</b>. Capable models stay well calibrated across the magnitude range, with expected calibration error around <b>0.003 to 0.007</b>; naive Platt scaling on bright sources roughly quintuples faint-end error while temperature scaling transfers best.',
      tags: ['probability calibration','ECE','distribution shift','SDSS','IEEE URTC'],
      links: [
        ['Draft available on request', null]
      ]
    },
    research: {
      kicker: '11 // Winger / in-progress research',
      title: 'Bioinformatics and flu forecasting',
      copy: 'Current research work includes a UNT computational pathogen-detection project using protein language model embeddings, plus a UTD influenza forecasting project that studies season timing and severity from <b>20+ seasons</b> of CDC surveillance data with a calibration-focused angle.',
      tags: ['protein embeddings','pathogen detection','CDC data','forecasting','calibration'],
      links: [
        ['GitHub profile','https://github.com/Joshua-Anojulu']
      ]
    }
  };

  var skillNotes = {
    uiux: '<b>UI/UX Pro Max:</b> gives the site its matchday interaction, reveal states, reduced-motion fallback, and mobile-first control sizing.',
    designsystem: '<b>Design System:</b> keeps the pitch, cards, buttons, stats, and staff controls on one spacing and color system.',
    uistyling: '<b>UI Styling:</b> handles visible focus states, stable hover states, readable panels, and controls that remain tappable on mobile.',
    brand: '<b>Brand:</b> keeps the soccer concept from becoming gimmicky by tying every metaphor back to shipped work and research evidence.',
    slides: '<b>Slides:</b> informs the timeline structure: kickoff, build-up, defensive stand, final whistle.',
    banner: '<b>Design + Banners:</b> could extend this into social headers or project thumbnails using the same matchday identity.'
  };

  (function(){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var report = document.getElementById('match-report');
    var penalty = document.getElementById('penalty-card');
    var goal = document.getElementById('goal-area');
    var target = document.getElementById('target');
    var keeper = document.getElementById('keeper');
    var ball = document.getElementById('ball');
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
      if(reduce || unlocked) return;
      keeperX = [28,41,55,69][Math.floor(Math.random()*4)];
      keeper.style.setProperty('--keeper-x',keeperX + '%');
    }

    function unlockReport(message){
      if(unlocked) return;
      unlocked = true;
      report.classList.add('is-unlocked');
      scoreline.textContent = '1 - 0';
      note.innerHTML = message || '<b>Goal.</b> Match report unlocked.';
      penalty.classList.remove('is-aiming');
      unlock.textContent = 'Report open';
      unlock.disabled = true;
      setTimeout(function(){report.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'});}, 260);
    }

    function takeShot(){
      if(isShooting || unlocked) return;
      attempts += 1;
      isShooting = true;
      shoot.disabled = true;
      note.textContent = 'Shot away...';
      ball.style.setProperty('--ball-x',aim.x + '%');
      ball.style.setProperty('--ball-y',(10 + aim.y * 0.46) + '%');
      ball.classList.add('is-shooting');

      window.setTimeout(function(){
        var topCorner = aim.y < 25;
        var outsideKeeper = Math.abs(aim.x - keeperX) > 17;
        var scored = topCorner || outsideKeeper || attempts >= 3;
        if(scored){
          unlockReport(attempts >= 3 && !outsideKeeper && !topCorner ? '<b>Coach override.</b> Third attempt opens the report.' : '<b>Goal.</b> Match report unlocked.');
        }else{
          note.innerHTML = '<b>Saved.</b> The keeper read that one. Try a corner or go top shelf.';
          ball.classList.remove('is-shooting');
          shoot.disabled = false;
          isShooting = false;
          moveKeeper();
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
    unlock.addEventListener('click',function(){unlockReport('<b>Report opened.</b> You skipped the penalty intro.');});
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
    var players = document.querySelectorAll('.player');
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
      players.forEach(function(player){player.classList.toggle('is-active',player.getAttribute('data-project') === key);});
    }
    players.forEach(function(player){
      player.addEventListener('click',function(){renderProject(player.getAttribute('data-project'));});
    });
  })();

  (function(){
    var note = document.getElementById('playbook-note');
    var buttons = document.querySelectorAll('.staff-btn');
    buttons.forEach(function(button){
      button.addEventListener('click',function(){
        var key = button.getAttribute('data-skill');
        note.innerHTML = skillNotes[key];
        buttons.forEach(function(btn){btn.classList.toggle('is-active',btn === button);});
      });
    });
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
