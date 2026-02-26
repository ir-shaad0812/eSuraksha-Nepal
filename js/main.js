/* ═══════════════════════════════════════════════════════════
   main.js — Scroll Reveal, Hero Stats Counter, Initializations
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ═══════════════════════════════════
     SCROLL REVEAL (Intersection Observer)
     ═══════════════════════════════════ */
  var aosElements = document.querySelectorAll('[data-aos]');

  if ('IntersectionObserver' in window && aosElements.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-visible');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    aosElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    aosElements.forEach(function (el) {
      el.classList.add('aos-visible');
    });
  }

  /* ═══════════════════════════════════
     HERO STATS COUNTER ANIMATION
     ═══════════════════════════════════ */
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (statNumbers.length > 0) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      statsObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 2000; // ms
    var start = 0;
    var startTime = null;
    var suffix = el.querySelector('.stat-suffix');
    var suffixText = suffix ? suffix.textContent : '';

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);

      // Update text content, preserving suffix element
      if (suffix) {
        el.childNodes[0].textContent = current.toLocaleString();
      } else {
        el.textContent = current.toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (suffix) {
          el.childNodes[0].textContent = target.toLocaleString();
        } else {
          el.textContent = target.toLocaleString();
        }
      }
    }

    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════
     TOOLS PAGE — TAB SWITCHING
     ═══════════════════════════════════ */
  var toolTabs = document.querySelectorAll('.tool-tab');
  var toolPanels = document.querySelectorAll('.tool-panel');

  if (toolTabs.length > 0) {
    toolTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetId = 'panel-' + this.getAttribute('data-tab');

        // Deactivate all tabs and panels
        toolTabs.forEach(function (t) { t.classList.remove('active'); });
        toolPanels.forEach(function (p) { p.classList.remove('active'); });

        // Activate selected
        this.classList.add('active');
        var targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  /* ═══════════════════════════════════
     CHECKLIST PROGRESS (resources page)
     ═══════════════════════════════════ */
  var checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  if (checklistItems.length > 0) {
    checklistItems.forEach(function (cb) {
      cb.addEventListener('change', function () {
        var parent = this.closest('.checklist-item');
        if (this.checked) {
          parent.classList.add('checked');
        } else {
          parent.classList.remove('checked');
        }
      });
    });
  }

  /* ═══════════════════════════════════
     SMOOTH HOVER EFFECT ON CARDS
     ═══════════════════════════════════ */
  // Add keyboard accessibility for clickable cards
  document.querySelectorAll('.feature-card, .info-card-link').forEach(function (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

})();
