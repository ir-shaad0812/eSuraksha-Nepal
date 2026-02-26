/* ═══════════════════════════════════════════════════════════
   language.js — English ↔ Nepali Language Toggle
   Uses data-lang-en / data-lang-np attributes
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const STORAGE_KEY = 'esuraksha-lang';
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');

  if (!langToggle) return;

  /* ─── Get stored language ─── */
  function getStoredLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  /* ─── Apply language to all elements ─── */
  function applyLanguage(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);

    // Update toggle button label
    if (langLabel) {
      langLabel.textContent = lang === 'en' ? 'EN' : 'NP';
    }

    // Find all elements with data-lang-en or data-lang-np
    var elements = document.querySelectorAll('[data-lang-en], [data-lang-np]');
    elements.forEach(function (el) {
      var text = el.getAttribute('data-lang-' + lang);
      if (text) {
        // Handle elements that contain HTML (like safety steps with <strong>)
        if (text.indexOf('<') !== -1) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Handle placeholder attributes
    var inputs = document.querySelectorAll('[data-placeholder-en], [data-placeholder-np]');
    inputs.forEach(function (input) {
      var placeholder = input.getAttribute('data-placeholder-' + lang);
      if (placeholder) {
        input.setAttribute('placeholder', placeholder);
      }
    });

    // Notify other modules to re-render
    if (typeof window.rerenderScamSimulator === 'function') {
      window.rerenderScamSimulator();
    }
    if (typeof window.rerenderPasswordChecker === 'function') {
      window.rerenderPasswordChecker();
    }
    if (typeof window.rerenderQuiz === 'function') {
      window.rerenderQuiz();
    }
  }

  /* ─── Toggle Language ─── */
  langToggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-lang') || 'en';
    var next = current === 'en' ? 'np' : 'en';
    applyLanguage(next);
  });

  /* ─── Initialize ─── */
  applyLanguage(getStoredLang());

})();
