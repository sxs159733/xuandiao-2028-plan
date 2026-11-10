/* 选调计划 · 2028 届 —— 轻量交互增强（无依赖、无网络请求）
   所有内容在不启用 JS 时仍可完整阅读与导航。 */
(function () {
  'use strict';

  // 1. 当前页面导航高亮
  var here = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav a');
  Array.prototype.forEach.call(navLinks, function (a) {
    var target = (a.getAttribute('href') || '').split('#')[0];
    if (target === here) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // 2. 顶部阅读进度条
  var progress = document.getElementById('scrollProgress');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var ratio = max > 0 ? (window.pageYOffset || doc.scrollTop) / max : 0;
    if (progress) { progress.style.width = Math.min(100, Math.max(0, ratio * 100)) + '%'; }
    if (toTop) {
      if ((window.pageYOffset || doc.scrollTop) > 420) { toTop.classList.add('show'); }
      else { toTop.classList.remove('show'); }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // 3. 回到顶部
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. 表格横向滚动提示（仅首次，纯文字，不弹窗）
  var wraps = document.querySelectorAll('.table-wrap');
  Array.prototype.forEach.call(wraps, function (w) {
    if (w.scrollWidth > w.clientWidth + 8) { w.setAttribute('tabindex', '0'); }
  });

  // 5. 外链统一安全属性
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="http"]'), function (a) {
    var rel = a.getAttribute('rel') || '';
    if (rel.indexOf('noopener') === -1) { a.setAttribute('rel', (rel + ' noopener noreferrer').trim()); }
    if (!a.getAttribute('target')) { a.setAttribute('target', '_blank'); }
  });
}());
