/* ═══════════════════════════════════════════════════════════
   password-checker.js — Real-time Password Strength Analyzer
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM References ─── */
  const input = document.getElementById('passwordInput');
  const bar = document.getElementById('strengthBar');
  const label = document.getElementById('strengthLabel');
  const toggleBtn = document.getElementById('togglePwVis');
  const suggestions = document.getElementById('pwSuggestions');

  const criteria = {
    len: document.getElementById('critLen'),
    upper: document.getElementById('critUpper'),
    lower: document.getElementById('critLower'),
    num: document.getElementById('critNum'),
    special: document.getElementById('critSpecial')
  };

  if (!input) return; // Guard: only run on password tool page

  /* ─── Common weak passwords (Nepal-specific additions) ─── */
  const weakPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123', 'password1',
    'nepal123', 'kathmandu', 'namaste', 'nepal2024', 'sagarmatha',
    'buddha123', 'nepal', 'ilovenepal', 'admin', 'welcome', 'letmein'
  ];

  /* ─── Analyze Password ─── */
  function analyze(pw) {
    const checks = {
      len: pw.length >= 8,
      upper: /[A-Z]/.test(pw),
      lower: /[a-z]/.test(pw),
      num: /[0-9]/.test(pw),
      special: /[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?`~]/.test(pw)
    };

    // Update criteria UI
    Object.keys(criteria).forEach(function (key) {
      if (criteria[key]) {
        criteria[key].classList.toggle('met', checks[key]);
      }
    });

    // Calculate score (0-5)
    let score = Object.values(checks).filter(Boolean).length;

    // Bonus for longer passwords
    if (pw.length >= 12) score += 0.5;
    if (pw.length >= 16) score += 0.5;

    // Penalties
    if (weakPasswords.includes(pw.toLowerCase())) score = Math.min(score, 1);
    if (/(.)\1{2,}/.test(pw)) score -= 0.5; // repeating chars
    if (/^[0-9]+$/.test(pw)) score = Math.min(score, 1.5); // only numbers
    if (/^[a-zA-Z]+$/.test(pw)) score = Math.min(score, 2); // only letters

    score = Math.max(0, Math.min(6, score));

    return { score: score, checks: checks };
  }

  /* ─── Get Level from Score ─── */
  function getLevel(score) {
    if (score <= 1) return { level: 'weak', label_en: 'Weak', label_np: 'कमजोर', color: 'weak' };
    if (score <= 2) return { level: 'fair', label_en: 'Fair', label_np: 'ठीकठाक', color: 'fair' };
    if (score <= 3.5) return { level: 'medium', label_en: 'Medium', label_np: 'मध्यम', color: 'medium' };
    if (score <= 5) return { level: 'strong', label_en: 'Strong', label_np: 'बलियो', color: 'strong' };
    return { level: 'very-strong', label_en: 'Very Strong', label_np: 'धेरै बलियो', color: 'very-strong' };
  }

  /* ─── Get Suggestions ─── */
  function getSuggestions(checks, pw) {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const tips = [];

    if (!checks.len) {
      tips.push(lang === 'np' ? '• कम्तिमा ८ अक्षर प्रयोग गर्नुहोस्' : '• Use at least 8 characters');
    }
    if (!checks.upper) {
      tips.push(lang === 'np' ? '• ठूलो अक्षर थप्नुहोस् (A-Z)' : '• Add uppercase letters (A-Z)');
    }
    if (!checks.lower) {
      tips.push(lang === 'np' ? '• सानो अक्षर थप्नुहोस् (a-z)' : '• Add lowercase letters (a-z)');
    }
    if (!checks.num) {
      tips.push(lang === 'np' ? '• संख्या थप्नुहोस् (0-9)' : '• Add numbers (0-9)');
    }
    if (!checks.special) {
      tips.push(lang === 'np' ? '• विशेष चिन्ह थप्नुहोस् (!@#$%...)' : '• Add special characters (!@#$%...)');
    }
    if (weakPasswords.includes(pw.toLowerCase())) {
      tips.push(lang === 'np' ? '⚠️ यो एक सामान्य पासवर्ड हो — अद्वितीय बनाउनुहोस्' : '⚠️ This is a commonly used password — make it unique');
    }
    if (/(.)\1{2,}/.test(pw)) {
      tips.push(lang === 'np' ? '• दोहोरिने अक्षरहरू बेवास्ता गर्नुहोस्' : '• Avoid repeating characters');
    }

    return tips;
  }

  /* ─── Update UI ─── */
  function updateUI() {
    const pw = input.value;

    if (!pw) {
      bar.className = 'strength-bar';
      label.textContent = '';
      suggestions.classList.remove('visible');
      suggestions.textContent = '';
      Object.values(criteria).forEach(function (el) {
        if (el) el.classList.remove('met');
      });
      return;
    }

    const result = analyze(pw);
    const level = getLevel(result.score);
    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    // Strength bar
    bar.className = 'strength-bar ' + level.color;

    // Label
    label.textContent = lang === 'np' ? level.label_np : level.label_en;

    // Suggestions
    const tips = getSuggestions(result.checks, pw);
    if (tips.length > 0) {
      suggestions.innerHTML = tips.join('<br>');
      suggestions.classList.add('visible');
    } else {
      const noTips = lang === 'np' ? '✅ राम्रो पासवर्ड! तपाईं सुरक्षित हुनुहुन्छ।' : '✅ Great password! You\'re well protected.';
      suggestions.innerHTML = noTips;
      suggestions.classList.add('visible');
    }
  }

  /* ─── Event Listeners ─── */
  input.addEventListener('input', updateUI);

  // Toggle visibility
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggleBtn.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // Re-render on language change
  window.rerenderPasswordChecker = function () {
    updateUI();
  };

})();
