/* ═══════════════════════════════════════════════════════════
   navigation.js — Header, Mobile Menu, Theme Toggle, Scroll
   Multi-page compatible
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM References ─── */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const backToTop = document.getElementById('backToTop');

  /* ─── Scroll: sticky header shadow + back-to-top ─── */
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollY = window.scrollY;
        // Header shadow
        header.classList.toggle('scrolled', scrollY > 20);
        // Back to top
        if (backToTop) backToTop.classList.toggle('visible', scrollY > 500);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── Mobile Menu Toggle ─── */
  hamburger.addEventListener('click', function () {
    const isOpen = !navMobile.hidden;
    navMobile.hidden = isOpen;
    hamburger.classList.toggle('open', !isOpen);
    hamburger.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link-m').forEach(function (link) {
    link.addEventListener('click', function () {
      navMobile.hidden = true;
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ─── Dark Mode Toggle ─── */
  function getStoredTheme() {
    return localStorage.getItem('esuraksha-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('esuraksha-theme', theme);
  }

  // Initialize theme from storage
  applyTheme(getStoredTheme());

  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ─── Back to Top ─── */
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Smooth scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#main') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── Accordion (Privacy Tips) ─── */
  document.querySelectorAll('.accordion-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item').forEach(function (i) {
        i.classList.remove('open');
      });
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

})();
