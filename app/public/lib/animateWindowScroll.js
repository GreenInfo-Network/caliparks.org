/**
 *
 * Animate window scrolling
 * Based on -> https://github.com/madebysource/animated-scrollto
 *
 */

const currentWindowProperties = function() {
  if (typeof window !== 'undefined') {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  }
};

const requestAnimFrame = (function() {
  return currentWindowProperties() || function(callback) {window.setTimeout(callback, 1000 / 60);};
})();

const easeInOutQuad = function(t, b, c, d) {
  let delta = t / (d / 2);
  if (delta < 1) return c / 2 * delta * delta + b;
  delta--;
  return -c / 2 * (delta * (delta - 2) - 1) + b;
};

const currentPositionY = function() {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
  return supportPageOffset ? window.pageYOffset : isCSS1Compat ?
         document.documentElement.scrollTop : document.body.scrollTop;
};

export default function animateWindowScroll(to, duration, callback) {
  const start = currentPositionY();
  const change = to - start;
  const animationStart = +new Date();
  let animating = true;
  let lastpos = null;

  const animateScroll = function() {
    if (!animating) {
      return;
    }
    requestAnimFrame(animateScroll);
    const now = +new Date();
    const val = Math.floor(easeInOutQuad(now - animationStart, start, change, duration));
    if (lastpos) {
      if (lastpos === currentPositionY()) {
        lastpos = val;
        window.scrollTo(0, val);
      } else {
        animating = false;
      }
    } else {
      lastpos = val;
      window.scrollTo(0, val);
    }
    if (now > animationStart + duration) {
      window.scrollTo(0, to);
      animating = false;
      if (callback) { callback(); }
    }
  };

  requestAnimFrame(animateScroll);
}
