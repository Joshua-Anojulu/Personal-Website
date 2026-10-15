// Personal-Website: one load sequence for the chart, and a readout for each point.
// The chart is complete without this file; the script only adds motion and the readout.
(function () {
  var chart = document.getElementById('chart');
  if (!chart) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    chart.classList.add('armed');
    // Two frames so the armed state paints before the transition starts.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { chart.classList.add('run'); });
    });
  }

  var tip = document.getElementById('tip');
  var box = document.getElementById('tip-box');
  var label = document.getElementById('tip-text');

  function show(point) {
    var text = point.getAttribute('data-name') + ': promised ' + point.getAttribute('data-promised') +
      '%, delivered ' + point.getAttribute('data-delivered') + '%';
    label.textContent = text;
    var shape = point.firstElementChild.getBBox();
    var width = label.getComputedTextLength() + 16;
    var height = 24;
    var x = shape.x + shape.width / 2 - width / 2;
    var y = shape.y - height - 8;
    if (x + width > 436) x = 436 - width;
    if (x < 4) x = 4;
    if (y < 2) y = shape.y + shape.height + 8;
    box.setAttribute('x', x);
    box.setAttribute('y', y);
    box.setAttribute('width', width);
    box.setAttribute('height', height);
    label.setAttribute('x', x + 8);
    label.setAttribute('y', y + 16);
    tip.classList.add('on');
  }
  function hide() { tip.classList.remove('on'); }

  var points = chart.querySelectorAll('.point');
  for (var i = 0; i < points.length; i++) {
    points[i].addEventListener('pointerenter', function () { show(this); });
    points[i].addEventListener('pointerleave', hide);
    points[i].addEventListener('focus', function () { show(this); });
    points[i].addEventListener('blur', hide);
  }
})();
