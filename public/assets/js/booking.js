/* Vibe Worthy booking enquiry — calendar picker + mailto assembly.
   Everything stays in the visitor's browser: submitting opens their own
   email app with the brief pre-filled, addressed to Vibe Worthy. Nothing
   is stored or sent anywhere else, and no rates appear by design. */
(function () {
  'use strict';

  /* ---- calendar: pick a date or a range ---- */
  var MONTHS = ['January','February','March','April','May','June','July',
    'August','September','October','November','December'];
  var mount = document.querySelector('.cal');
  var pickOut = document.querySelector('.cal-pick');
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var view = new Date(today.getFullYear(), today.getMonth(), 1);
  var start = null, end = null;

  function fmt(d) {
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function iso(d) { return d.toISOString().slice(0, 10); }

  function render() {
    var y = view.getFullYear(), m = view.getMonth();
    var first = new Date(y, m, 1);
    var startCol = (first.getDay() + 6) % 7; // Monday first
    var days = new Date(y, m + 1, 0).getDate();
    var h = '<div class="cal-head">' +
      '<button type="button" class="nav" data-nav="-1" aria-label="Previous month">&#8592;</button>' +
      '<b>' + MONTHS[m] + ' ' + y + '</b>' +
      '<button type="button" class="nav" data-nav="1" aria-label="Next month">&#8594;</button></div>' +
      '<table><thead><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr></thead><tbody><tr>';
    var col = 0, i;
    for (i = 0; i < startCol; i++) { h += '<td></td>'; col++; }
    for (i = 1; i <= days; i++) {
      var d = new Date(y, m, i);
      var cls = [];
      if (start && d.getTime() === start.getTime()) cls.push('sel');
      if (end && d.getTime() === end.getTime()) cls.push('sel');
      if (start && end && d > start && d < end) cls.push('inrange');
      h += '<td><button type="button" data-day="' + i + '"' +
        (d < today ? ' disabled' : '') +
        (cls.length ? ' class="' + cls.join(' ') + '"' : '') + '>' + i + '</button></td>';
      if (++col === 7 && i < days) { h += '</tr><tr>'; col = 0; }
    }
    h += '</tr></tbody></table>';
    mount.innerHTML = h;
    pickOut.textContent = !start ? 'No dates picked yet — optional.'
      : (end ? fmt(start) + ' \u2192 ' + fmt(end) : fmt(start));
  }

  mount.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.nav) {
      view.setMonth(view.getMonth() + Number(b.dataset.nav)); render(); return;
    }
    if (!b.dataset.day || b.disabled) return;
    var d = new Date(view.getFullYear(), view.getMonth(), Number(b.dataset.day));
    if (!start || (start && end)) { start = d; end = null; }
    else if (d < start) { start = d; }
    else if (d.getTime() === start.getTime()) { start = null; end = null; }
    else { end = d; }
    render();
  });
  render();

  /* ---- enquiry: assemble the brief into the visitor's own email ---- */
  var form = document.getElementById('enquiry');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var who = form.dataset.creative, handle = form.dataset.handle;
    var dates = !start ? 'To be discussed'
      : (end ? fmt(start) + ' to ' + fmt(end) + ' (' + iso(start) + '/' + iso(end) + ')'
             : fmt(start) + ' (' + iso(start) + ')');
    var body = [
      'Booking enquiry \u2014 ' + who + ' (' + handle + ')',
      '',
      'Name: ' + (f.get('name') || '\u2014'),
      'Company / project: ' + (f.get('company') || '\u2014'),
      'Email: ' + (f.get('email') || '\u2014'),
      'Type of work: ' + (f.get('type') || '\u2014'),
      'Preferred dates: ' + dates,
      '',
      'The brief:',
      (f.get('brief') || '\u2014'),
      '',
      'Sent from the Vibe Worthy site \u2014 ' + who + '\u2019s page.'
    ].join('\n');
    var a = document.createElement('a');
    a.href = 'mailto:kalpna@vibeworthy.co' +
      '?subject=' + encodeURIComponent('Booking enquiry \u2014 ' + who) +
      '&body=' + encodeURIComponent(body);
    document.body.appendChild(a); a.click(); a.remove();
  });
}());
