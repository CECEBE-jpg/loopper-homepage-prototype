/* Horizontal product, brand and review rows.
   Figma draws one round "next" arrow inside each row. Here every row gets a
   hidden scrollbar and two arrows that stay put while the row scrolls:
   "previous" appears once you have scrolled right, and each arrow disappears
   when that end of the row has been reached. */
(function () {
  var ARROW = 'assets/svg.svg';

  // The row is the nearest ancestor whose content is wider than itself.
  // Figma exports some rows as clipped or overflowing rather than
  // scrollable; those are made scrollable here.
  function scrollerFor(el) {
    function wide(n) { return n.scrollWidth > n.clientWidth + 1; }
    function claim(n) {
      n.style.overflowX = 'auto';
      n.style.overflowY = 'hidden';
      return n;
    }
    for (var c = el, p = el.parentElement; p && p.id !== 'main'; c = p, p = p.parentElement) {
      if (wide(p)) return claim(p);
      // the arrow may sit beside the row instead of inside it
      for (var i = 0; i < p.children.length; i++) {
        if (p.children[i] !== c && wide(p.children[i])) return claim(p.children[i]);
      }
    }
    return null;
  }

  function makeButton(src, label, dir) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'carousel-arrow carousel-arrow--' + dir;
    b.setAttribute('aria-label', label);
    b.innerHTML = '<img src="' + src + '" alt="" width="12" height="20">';
    return b;
  }

  function setup(img) {
    var figmaArrow = img.parentElement && img.parentElement.parentElement;
    var track = figmaArrow && scrollerFor(figmaArrow);
    if (!track || track.dataset.carousel) return;
    track.dataset.carousel = '1';

    // Where Figma placed the arrow, relative to the row's right edge.
    var tr = track.getBoundingClientRect();
    var ar = figmaArrow.getBoundingClientRect();
    var scale = tr.width / track.offsetWidth || 1;
    var size = ar.width / scale;
    var inset = (tr.right - ar.right) / scale;
    figmaArrow.remove();

    var host = track.parentElement;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    track.classList.add('carousel-track');

    var prev = makeButton(img.getAttribute('src'), 'Scroll left', 'prev');
    var next = makeButton(img.getAttribute('src'), 'Scroll right', 'next');
    [prev, next].forEach(function (b) {
      b.style.width = b.style.height = size + 'px';
      host.appendChild(b);
    });

    function place() {
      var top = track.offsetTop + track.offsetHeight / 2 - size / 2;
      prev.style.top = next.style.top = top + 'px';
      prev.style.left = track.offsetLeft + inset + 'px';
      next.style.left = track.offsetLeft + track.offsetWidth - inset - size + 'px';
    }

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      prev.classList.toggle('is-hidden', track.scrollLeft <= 2);
      next.classList.toggle('is-hidden', track.scrollLeft >= max - 2);
    }

    function step() {
      var first = track.firstElementChild;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var card = first ? first.offsetWidth + gap : track.clientWidth / 2;
      return Math.max(card, Math.floor(track.clientWidth / card) * card);
    }

    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', function () { place(); update(); });
    place();
    update();
  }

  function init() {
    var imgs = document.querySelectorAll('#main img[src="' + ARROW + '"]');
    for (var i = 0; i < imgs.length; i++) setup(imgs[i]);
  }

  if (document.readyState === 'complete') init();
  else addEventListener('load', init);
})();
