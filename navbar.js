/**
 * Syncross Global Navbar Component
 * Reusable, single-source-of-truth navbar for all pages.
 */
(function() {
  function initNavbar() {
    // Prevent duplicate rendering
    if (document.getElementById('gh') && document.getElementById('gh').dataset.syncrossNav === 'ready') {
      return;
    }

    // Determine current page filename
    const path = window.location.pathname.replace(/\\/g, '/');
    let page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    // Remove query params or hashes if any
    page = page.split('?')[0].split('#')[0];
    if (!page) page = 'index.html';

    // Solutions pages list
    const solutions = [
      { name: 'Energy Management System', file: 'Syncross_EMS_Page.html' },
      { name: 'Utility Management System', file: 'Syncross_UMS_Page.html' },
      { name: 'OEE Monitoring', file: 'Syncross_OEE_Page.html' },
      { name: 'Compressor Management System', file: 'Syncross_CMS_Page.html' },
      { name: 'Maintenance Management', file: 'Syncross_IMMS_Page.html' },
      { name: 'Production Enhancement System', file: 'Syncross_PES_Page.html' }
    ];

    const isSolutionPage = solutions.some(s => s.file === page);

    // Determine CTA behavior based on current page
    let ctaHref = '#demo';
    let ctaAttr = 'data-open-form="demo"';
    if (page === 'contact.html') {
      ctaHref = '#form';
      ctaAttr = '';
    } else if (page === 'projects.html') {
      ctaHref = 'contact.html';
      ctaAttr = '';
    }

    // Generate solutions dropdown HTML
    const ddItemsHtml = solutions.map(s => {
      const activeClass = (page === s.file) ? ' active' : '';
      return `<a href="${s.file}" class="nav-dd-item${activeClass}" role="menuitem">${s.name}</a>`;
    }).join('\n        ');

    // Generate mobile drawer solutions HTML
    const mobDdItemsHtml = solutions.map(s => {
      const activeClass = (page === s.file) ? ' active' : '';
      return `<a href="${s.file}" class="mob-sub-item${activeClass}">${s.name}</a>`;
    }).join('\n        ');

    // Build complete header HTML
    const navHtml = `
<header id="gh" data-syncross-nav="ready">
  <a class="logo" href="index.html" aria-label="Syncross home">
    <img class="lg" src="syncross-logo.png" alt="Syncross">
    <span>Plant digital twin</span>
  </a>
  <div class="tn">
    <a href="index.html"${page === 'index.html' ? ' class="active"' : ''}>Home</a>
    <div class="nav-dd" id="solutionsDropdown">
      <button class="nav-dd-btn${isSolutionPage ? ' active' : ''}" type="button" aria-expanded="false" aria-haspopup="true">
        Solutions
        <svg class="nav-dd-arrow" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>
      </button>
      <div class="nav-dd-menu" role="menu">
        ${ddItemsHtml}
      </div>
    </div>
    <a href="projects.html"${page === 'projects.html' ? ' class="active"' : ''}>Projects</a>
    <a href="about.html"${page === 'about.html' ? ' class="active"' : ''}>About</a>
    <a href="contact.html"${page === 'contact.html' ? ' class="active"' : ''}>Contact</a>
  </div>
  <div class="header-actions">
    <a class="btn pri sm" href="${ctaHref}" ${ctaAttr}>Get Demo</a>
    <button class="mob-menu-btn" id="mobMenuBtn" aria-label="Toggle navigation menu" type="button" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
</header>
<div class="mob-drawer" id="mobDrawer" aria-hidden="true">
  <div class="mob-drawer-sec">
    <a href="index.html"${page === 'index.html' ? ' class="active"' : ''}>Home</a>
    <span class="mob-drawer-title">Solutions</span>
    <div class="mob-sub-list">
      ${mobDdItemsHtml}
    </div>
    <a href="projects.html"${page === 'projects.html' ? ' class="active"' : ''}>Projects</a>
    <a href="about.html"${page === 'about.html' ? ' class="active"' : ''}>About</a>
    <a href="contact.html"${page === 'contact.html' ? ' class="active"' : ''}>Contact</a>
  </div>
  <a class="btn pri" href="${ctaHref}" ${ctaAttr} style="text-align:center;justify-content:center;margin-top:8px;">Get Demo</a>
</div>
`.trim();

    // Clean up any existing header or drawer elements
    const oldHeader = document.getElementById('gh');
    const oldDrawer = document.getElementById('mobDrawer');
    if (oldDrawer) oldDrawer.remove();

    if (oldHeader) {
      oldHeader.outerHTML = navHtml;
    } else {
      const mount = document.getElementById('site-nav') || document.getElementById('site-header');
      if (mount) {
        mount.outerHTML = navHtml;
      } else {
        document.body.insertAdjacentHTML('afterbegin', navHtml);
      }
    }

    // Attach Interactivity
    setupInteractions();
  }

  function setupInteractions() {
    // 1. Solutions Dropdown
    const dd = document.getElementById('solutionsDropdown');
    if (dd) {
      const btn = dd.querySelector('.nav-dd-btn');
      if (btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const isOpen = dd.classList.toggle('open');
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }
      document.addEventListener('click', function(e) {
        if (!dd.contains(e.target)) {
          dd.classList.remove('open');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dd.classList.contains('open')) {
          dd.classList.remove('open');
          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
          }
        }
      });
    }

    // 2. Mobile Drawer
    const mobBtn = document.getElementById('mobMenuBtn');
    const mobDrawer = document.getElementById('mobDrawer');
    if (mobBtn && mobDrawer) {
      mobBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = mobDrawer.classList.toggle('open');
        mobBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      });
      document.addEventListener('click', function(e) {
        if (!mobDrawer.contains(e.target) && !mobBtn.contains(e.target)) {
          mobDrawer.classList.remove('open');
          mobBtn.setAttribute('aria-expanded', 'false');
          mobDrawer.setAttribute('aria-hidden', 'true');
        }
      });
      mobDrawer.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
          mobDrawer.classList.remove('open');
          mobBtn.setAttribute('aria-expanded', 'false');
          mobDrawer.setAttribute('aria-hidden', 'true');
        });
      });
    }

    // 3. Scroll Backdrop Blur
    const gh = document.getElementById('gh');
    if (gh) {
      const onScroll = function() {
        gh.classList.toggle('scrolled', window.scrollY > 24);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  // Execute immediately if body is ready, or on DOMContentLoaded
  if (document.body) {
    initNavbar();
  } else {
    document.addEventListener('DOMContentLoaded', initNavbar);
  }
})();
