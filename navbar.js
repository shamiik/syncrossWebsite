/**
 * Syncross Global Navbar Component
 * Reusable, single-source-of-truth navbar for all pages.
 */
(function() {
  // Apply saved theme immediately, default to 'light' per user request
  try {
    const savedTheme = localStorage.getItem('syncross_theme') || 'light';
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch(e) {}

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

    // Solutions pages list with icons, descriptions, and accent colors
    const solutions = [
      {
        name: 'Energy Management System',
        shortTitle: 'Energy Management',
        desc: 'Real-time power, peak demand & carbon tracking',
        file: 'Syncross_EMS_Page.html',
        color: '#f59e0b',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
      },
      {
        name: 'Utility Management System',
        shortTitle: 'Utility Management',
        desc: 'Water, steam, gas & flow meter analytics',
        file: 'Syncross_UMS_Page.html',
        color: '#0ea5e9',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>'
      },
      {
        name: 'OEE Monitoring',
        shortTitle: 'OEE Monitoring',
        desc: 'Availability, performance & quality scores',
        file: 'Syncross_OEE_Page.html',
        color: '#10b981',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>'
      },
      {
        name: 'Compressor Management System',
        shortTitle: 'Compressor Management',
        desc: 'Header pressure, SEC & air leak detection',
        file: 'Syncross_CMS_Page.html',
        color: '#f97316',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>'
      },
      {
        name: 'Maintenance Management',
        shortTitle: 'Maintenance Management',
        desc: 'Predictive work orders & asset health scoring',
        file: 'Syncross_IMMS_Page.html',
        color: '#8b5cf6',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
      },
      {
        name: 'Production Enhancement System',
        shortTitle: 'Production Enhancement',
        desc: 'Sewing line output, efficiency & defect rates',
        file: 'Syncross_PES_Page.html',
        color: '#3b82f6',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'
      }
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
      return `<a href="${s.file}" class="nav-dd-item${activeClass}" role="menuitem" style="--mc:${s.color}">
          <span class="nav-dd-ico" aria-hidden="true">${s.icon}</span>
          <span class="nav-dd-txt">
            <span class="nav-dd-title">${s.shortTitle}<svg class="nav-dd-go" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>
            <span class="nav-dd-desc">${s.desc}</span>
          </span>
        </a>`;
    }).join('\n        ');

    // Generate mobile drawer solutions HTML
    const mobDdItemsHtml = solutions.map(s => {
      const activeClass = (page === s.file) ? ' active' : '';
      return `<a href="${s.file}" class="mob-sub-item${activeClass}" style="--mc:${s.color}">
          <span class="mob-sub-ico" aria-hidden="true">${s.icon}</span>
          <span class="mob-sub-txt">
            <span class="mob-sub-title">${s.shortTitle}</span>
            <span class="mob-sub-desc">${s.desc}</span>
          </span>
        </a>`;
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
        <div class="nav-dd-grid">
          ${ddItemsHtml}
        </div>
      </div>
    </div>
    <a href="projects.html"${page === 'projects.html' ? ' class="active"' : ''}>Projects</a>
    <a href="about.html"${page === 'about.html' ? ' class="active"' : ''}>About</a>
    <a href="https://blogs.syncross.ai" target="_blank" rel="noopener noreferrer">Blogs</a>
    <a href="contact.html"${page === 'contact.html' ? ' class="active"' : ''}>Contact</a>
  </div>
  <div class="header-actions">
    <button class="theme-toggle-btn" id="themeToggleBtn" aria-label="Toggle theme" title="Toggle light/dark theme" type="button">
      <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
    <a class="btn pri sm" href="${ctaHref}" ${ctaAttr}>Get Demo</a>
    <button class="mob-menu-btn" id="mobMenuBtn" aria-label="Toggle navigation menu" type="button" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
</header>
<div class="mob-drawer" id="mobDrawer" aria-hidden="true">
  <div class="mob-drawer-sec">
    <a href="index.html"${page === 'index.html' ? ' class="active"' : ''}>Home</a>
    <button class="mob-solutions-btn" id="mobSolutionsToggle" type="button" aria-expanded="false">
      <span>Solutions</span>
      <svg class="mob-solutions-arrow" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>
    </button>
    <div class="mob-sub-list" id="mobSolutionsList">
      ${mobDdItemsHtml}
    </div>
    <a href="projects.html"${page === 'projects.html' ? ' class="active"' : ''}>Projects</a>
    <a href="about.html"${page === 'about.html' ? ' class="active"' : ''}>About</a>
    <a href="https://blogs.syncross.ai" target="_blank" rel="noopener noreferrer">Blogs</a>
    <a href="contact.html"${page === 'contact.html' ? ' class="active"' : ''}>Contact</a>
  </div>
  <a class="btn pri" href="${ctaHref}" ${ctaAttr} style="text-align:center;justify-content:center;margin-top:8px;">Get Demo</a>
</div>
`.trim();

    // Immediately purge any empty or stray rogue footers that may exist before main content
    document.querySelectorAll('footer').forEach(function(f) {
      if (!f.querySelector('.footer-grid') && !f.querySelector('.wrap')) {
        f.remove();
      }
    });

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
    // 1. Solutions Dropdown (with hover grace delay so cursor can travel smoothly)
    const dd = document.getElementById('solutionsDropdown');
    if (dd) {
      const btn = dd.querySelector('.nav-dd-btn');
      let closeTimer = null;

      const openDd = function() {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        dd.classList.add('open');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      };

      const scheduleCloseDd = function() {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(function() {
          dd.classList.remove('open');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }, 200);
      };

      dd.addEventListener('mouseenter', openDd);
      dd.addEventListener('mouseleave', scheduleCloseDd);

      if (btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
          }
          const isOpen = dd.classList.toggle('open');
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }
      document.addEventListener('click', function(e) {
        if (!dd.contains(e.target)) {
          if (closeTimer) clearTimeout(closeTimer);
          dd.classList.remove('open');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dd.classList.contains('open')) {
          if (closeTimer) clearTimeout(closeTimer);
          dd.classList.remove('open');
          if (btn) {
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
          }
        }
      });
    }

    // Solutions Accordion in Mobile Drawer
    const mobSolToggle = document.getElementById('mobSolutionsToggle');
    const mobSolList = document.getElementById('mobSolutionsList');
    if (mobSolToggle && mobSolList) {
      mobSolToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = mobSolToggle.classList.toggle('open');
        mobSolList.classList.toggle('open', isOpen);
        mobSolToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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

    // 3. Theme Toggle Button
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try {
          localStorage.setItem('syncross_theme', next);
        } catch(err) {}
        window.dispatchEvent(new CustomEvent('syncrossthemechange', { detail: { theme: next } }));
        // Also notify any embedded iframes (e.g. IMMS dashboard)
        document.querySelectorAll('iframe').forEach(function(f) {
          try {
            if (f.contentDocument && f.contentDocument.documentElement) {
              f.contentDocument.documentElement.dataset.theme = next;
            }
            if (f.contentWindow) {
              f.contentWindow.postMessage({ type: 'syncrossthemechange', theme: next }, '*');
            }
          } catch(e) {}
        });
      });
    }

    // 4. Scroll Backdrop Blur
    const gh = document.getElementById('gh');
    if (gh) {
      const onScroll = function() {
        gh.classList.toggle('scrolled', window.scrollY > 24);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // 5. Back to Top Floating Button
    function initBackToTop() {
      let btn = document.getElementById('backToTopBtn');
      if (!btn) {
        btn = document.createElement('button');
        btn.id = 'backToTopBtn';
        btn.className = 'back-to-top-btn';
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-label', 'Back to top');
        btn.setAttribute('title', 'Scroll to top');
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
        document.body.appendChild(btn);
      }

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      let ticking = false;
      const onScrollTop = function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            if (window.scrollY > 280) {
              btn.classList.add('visible');
            } else {
              btn.classList.remove('visible');
            }
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScrollTop, { passive: true });
      onScrollTop();
    }
    initBackToTop();

    // 6. Universal Footer Component (Single-source-of-truth matching index.html)
    function initFooter() {
      // Ensure no footer ever appears before main content or top section
      const topSection = document.getElementById('top') || document.getElementById('hero') || document.querySelector('main') || document.getElementById('lp');
      const allFooters = document.querySelectorAll('footer');

      allFooters.forEach(function(f) {
        // Remove empty rogue footers
        if (!f.querySelector('.footer-grid') && !f.querySelector('.wrap')) {
          f.remove();
          return;
        }
        // If a footer appears physically BEFORE the top/main content, remove it
        if (topSection && (topSection.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_PRECEDING)) {
          f.remove();
        }
      });

      // Keep only the single legitimate footer at the end of the document
      const remainingFooters = document.querySelectorAll('footer');
      if (remainingFooters.length > 1) {
        for (let i = 0; i < remainingFooters.length - 1; i++) {
          remainingFooters[i].remove();
        }
      }

      // Only configure the legitimate footer at the bottom of the page
      const footer = document.querySelector('footer#contact') || document.querySelector('footer');
      if (!footer) return;

      footer.id = 'contact';
      footer.setAttribute('data-syncross-footer', 'ready');

      // Ensure footer is always at the bottom of body
      if (footer.parentElement === document.body && document.body.lastElementChild !== footer) {
        document.body.appendChild(footer);
      }

      // Interactive newsletter subscription handler
      const forms = footer.querySelectorAll('.newsletter-form');
      forms.forEach(function(form) {
        if (!form.dataset.bound) {
          form.dataset.bound = 'true';
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button');
            if (input && input.value.trim() && btn) {
              const origText = btn.textContent;
              btn.textContent = 'Subscribed!';
              btn.style.pointerEvents = 'none';
              input.value = '';
              setTimeout(function() {
                btn.textContent = origText;
                btn.style.pointerEvents = '';
              }, 3000);
            }
          });
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFooter);
    } else {
      initFooter();
    }
  }

  // Execute immediately if body is ready, or on DOMContentLoaded
  if (document.body) {
    initNavbar();
  } else {
    document.addEventListener('DOMContentLoaded', initNavbar);
  }
})();
