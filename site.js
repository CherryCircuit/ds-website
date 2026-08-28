// DuraSleeve shared runtime for ALL pages (static, stable name). Mega-menu + reveal + footer + Supabase.
(function () {
  const BASE = window.__BASE__ || '/ds-website';

  const NAV = [
    { label: 'Home', href: 'index.html', active: '/index.html' },
    { label: 'Products', href: 'products.html', active: '/products.html', mega: [
      ['Browse all sizes','products.html'], ['Find by measurement','products.html#finder'], ['Size conversion','products.html#finder'] ]},
    { label: 'Industries', href: 'industries.html', active: '/industries.html', mega: [
      ['Agriculture','industries.html#agriculture'], ['Mining','industries.html#mining'], ['Rail','industries.html#rail'], ['Marine','industries.html#marine'], ['Trucking','industries.html#trucking'], ['Industrial','industries.html#industrial'] ]},
    { label: 'Proof', href: 'proof.html', active: '/proof.html' },
    { label: 'Resources', href: 'blog.html', active: '/blog.html', mega: [
      ['Articles','blog.html'], ['Cost calculator','calculator.html'], ['Shaft repair vs replace','blog.html'], ['Hard chrome explained','blog.html'] ]},
    { label: 'History', href: 'history.html', active: '/history.html' },
  ];

  function currentPath() {
    const p = window.location.pathname.replace(/\/$/, '');
    // match by ending segment
    for (const n of NAV) {
      const last = n.href.replace('.html','');
      if (p.endsWith('/'+last) || p.endsWith('/'+n.href)) return n.active;
    }
    return NAV[0].active;
  }

  function buildHeader() {
    const el = document.querySelector('.hdr').querySelector('.hdr-inner');
    const navHtml = NAV.map(n => {
      if (n.mega) {
        const items = n.mega.map(m => `<a class="item" href="${BASE}/${m[1]}"><b>${m[0]}</b><span>${m[1]}</span></a>`).join('');
        return `<div class="nv"><button>${n.label} <span style="font-size:9px;">&#9662;</span></button><div class="mega"><h5>${n.label}</h5><div class="mega-grid">${items}</div></div></div>`;
      }
      return `<div class="nv"><a href="${BASE}/${n.href}">${n.label}</a></div>`;
    }).join('');
    const logo = `<a class="logo" href="${BASE}/index.html"><img src="${BASE}/media/Dura-Sleeve-Inc-logo.webp" alt="DuraSleeve" /><span>DuraSleeve<small>Repair, don't replace</small></span></a>`;
    const cta = `<a class="cta" href="${BASE}/contest.html">Enter Contest</a>`;
    el.innerHTML = logo + `<nav class="nav" id="nav">${navHtml}${cta}</nav><button class="nav-toggle" aria-label="Menu">&#9776;</button>`;
    const bt = el.querySelector('.nav-toggle');
    if (bt) bt.addEventListener('click', () => el.querySelector('.nav').classList.toggle('open'));
  }

  function buildFooter() {
    const el = document.querySelector('.ftr');
    if (!el) return;
    el.innerHTML = `
      <div class="wrap">
        <div class="ftr-grid">
          <div>
            <a class="logo" href="${BASE}/index.html"><img src="${BASE}/media/Dura-Sleeve-Inc-logo.webp" alt="DuraSleeve" /><span>DuraSleeve</span></a>
            <p class="desc">Repair worn or damaged shaft seal surfaces with a hard-chrome wear sleeve built to outlast. Made in North America from US Steel.</p>
          </div>
          <div><h5>Products</h5><a href="${BASE}/products.html">All sizes</a><a href="${BASE}/products.html#finder">Find my size</a><a href="${BASE}/products.html">Specifications</a></div>
          <div><h5>Industries</h5><a href="${BASE}/industries.html#agriculture">Agriculture</a><a href="${BASE}/industries.html#mining">Mining</a><a href="${BASE}/industries.html#rail">Rail</a><a href="${BASE}/industries.html#marine">Marine</a><a href="${BASE}/industries.html#trucking">Trucking</a><a href="${BASE}/industries.html#industrial">Industrial</a></div>
          <div><h5>Company</h5><a href="${BASE}/history.html">History</a><a href="${BASE}/proof.html">Proof</a><a href="${BASE}/blog.html">Resources</a><a href="${BASE}/calculator.html">Calculator</a><a href="${BASE}/contest.html">Repair contest</a><a href="${BASE}/privacy.html">Privacy</a></div>
        </div>
        <div class="legal">&copy; ${new Date().getFullYear()} Dura Sleeve Inc. &middot; Abbotsford, BC &middot; 1-866-365-1279 &middot; durasleeve.com<br/>DuraSleeve is a thin-walled shaft repair sleeve for worn or damaged shaft seal surfaces. Results vary by application; see sizing chart and installation guide.</div>
      </div>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildHeader(); buildFooter();
    const hdr = document.querySelector('.hdr');
    function onScroll() { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 20); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const els = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (en) {
        en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (e) { io.observe(e); });
    } else { els.forEach(function (e) { e.classList.add('in'); }); }
    document.querySelectorAll('.acc').forEach(function (acc) {
      acc.querySelectorAll('details').forEach(function (d) {
        d.addEventListener('toggle', function () {
          if (d.open) acc.querySelectorAll('details').forEach(function (o) { if (o !== d) o.open = false; });
        });
      });
    });
    // Safety net: never leave content invisible if the observer fails to fire.
    setTimeout(function () {
      document.querySelectorAll('[data-reveal]').forEach(function (e) { e.classList.add('in'); });
    }, 1200);
  });

  window.__Supabase = function (url, anonKey) {
    if (!url || !anonKey) return null;
    if (window.supabase) return window.supabase.createClient(url, anonKey);
    return null;
  };
})();
