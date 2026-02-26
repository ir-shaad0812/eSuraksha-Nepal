/* ═══════════════════════════════════════════════════════════
   quiz.js — 10-Question Cybersecurity Quiz + Pledge Certificate
   Nepal-specific scenarios, bilingual support
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Quiz Questions Database ─── */
  const questions = [
    {
      q_en: 'You receive an SMS: "Your eSewa account is locked! Click here to unlock." What should you do?',
      q_np: 'तपाईंलाई SMS आउँछ: "तपाईंको eSewa खाता लक भयो! अनलक गर्न यहाँ क्लिक गर्नुहोस्।" तपाईंले के गर्नुपर्छ?',
      options_en: ['Click the link to unlock', 'Open the eSewa app directly to check', 'Reply with your PIN', 'Ignore and share with friends'],
      options_np: ['अनलक गर्न लिंक क्लिक गर्नुहोस्', 'जाँच गर्न eSewa एप सिधै खोल्नुहोस्', 'आफ्नो PIN रिप्लाई गर्नुहोस्', 'बेवास्ता गरेर साथीहरूलाई सेयर गर्नुहोस्'],
      correct: 1,
      tip_en: 'Always verify through the official app. eSewa never asks for credentials via SMS.',
      tip_np: 'सधैं आधिकारिक एप मार्फत प्रमाणित गर्नुहोस्। eSewa ले कहिल्यै SMS मार्फत प्रमाण माग्दैन।'
    },
    {
      q_en: 'What does "2FA" (Two-Factor Authentication) provide?',
      q_np: '"2FA" (दुई-कारक प्रमाणीकरण) ले के प्रदान गर्छ?',
      options_en: ['Faster internet speed', 'An extra layer of security beyond just a password', 'Free antivirus protection', 'Automatic password reset'],
      options_np: ['छिटो इन्टरनेट स्पीड', 'पासवर्ड मात्र भन्दा बाहिर थप सुरक्षा तह', 'नि:शुल्क एन्टिभाइरस सुरक्षा', 'स्वचालित पासवर्ड रिसेट'],
      correct: 1,
      tip_en: '2FA adds a second verification step (like an OTP) making accounts much harder to hack.',
      tip_np: '2FA ले दोस्रो प्रमाणीकरण चरण (OTP जस्तो) थप्छ जसले खाताहरू ह्याक गर्न धेरै गाह्रो बनाउँछ।'
    },
    {
      q_en: 'A friend sends you a Facebook Messenger link saying "Is this you in this video?" What is this most likely?',
      q_np: 'एक साथीले तपाईंलाई Facebook Messenger मा लिंक पठाउँछन् भन्दै "यो भिडियोमा तपाईं हुनुहुन्छ?" यो के हुन सक्छ?',
      options_en: ['A genuine video sharing link', 'A phishing attack to steal your Facebook login', 'A Facebook official security check', 'A virus-free link'],
      options_np: ['वास्तविक भिडियो सेयरिङ लिंक', 'तपाईंको Facebook लगइन चोर्ने फिसिङ आक्रमण', 'Facebook आधिकारिक सुरक्षा जाँच', 'भाइरस-मुक्त लिंक'],
      correct: 1,
      tip_en: 'This is a very common phishing attack in Nepal. Your friend\'s account was likely hacked.',
      tip_np: 'यो नेपालमा धेरै सामान्य फिसिङ आक्रमण हो। तपाईंको साथीको खाता ह्याक भएको हुन सक्छ।'
    },
    {
      q_en: 'Which of the following is the strongest password?',
      q_np: 'तल कुन पासवर्ड सबैभन्दा बलियो छ?',
      options_en: ['nepal2024', 'P@$$w0rd', 'Kath#m4ndu!Rain2024', 'qwerty123'],
      options_np: ['nepal2024', 'P@$$w0rd', 'Kath#m4ndu!Rain2024', 'qwerty123'],
      correct: 2,
      tip_en: 'Strong passwords are long, use mixed characters, and aren\'t based on common words.',
      tip_np: 'बलियो पासवर्डहरू लामा हुन्छन्, मिश्रित अक्षरहरू प्रयोग गर्छन्, र सामान्य शब्दहरूमा आधारित हुँदैनन्।'
    },
    {
      q_en: 'Someone on Hamrobazar wants to buy your phone. They send an eSewa payment screenshot. What should you verify?',
      q_np: 'Hamrobazar मा कसैले तपाईंको फोन किन्न चाहन्छ। उनीहरूले eSewa भुक्तानी स्क्रिनसट पठाउँछन्। तपाईंले के प्रमाणित गर्नुपर्छ?',
      options_en: ['Just trust the screenshot', 'Check your actual eSewa/bank balance', 'Ask them to send another screenshot', 'Reply with your account details'],
      options_np: ['स्क्रिनसट मात्र विश्वास गर्नुहोस्', 'आफ्नो वास्तविक eSewa/बैंक ब्यालेन्स जाँच गर्नुहोस्', 'अर्को स्क्रिनसट पठाउन भन्नुहोस्', 'आफ्नो खाता विवरण रिप्लाई गर्नुहोस्'],
      correct: 1,
      tip_en: 'Fake payment screenshots are extremely common in Nepal. Always check your actual balance.',
      tip_np: 'नक्कली भुक्तानी स्क्रिनसटहरू नेपालमा अत्यन्त सामान्य छन्। सधैं आफ्नो वास्तविक ब्यालेन्स जाँच गर्नुहोस्।'
    },
    {
      q_en: 'What should you do if someone creates a fake Facebook profile using your photos?',
      q_np: 'यदि कसैले तपाईंको फोटो प्रयोग गरी नक्कली Facebook प्रोफाइल बनाउँछ भने के गर्नुपर्छ?',
      options_en: ['Nothing, it will be removed automatically', 'Report the fake profile and inform friends', 'Create a fake profile of them in revenge', 'Delete your own account'],
      options_np: ['केही गर्नुपर्दैन, स्वचालित रूपमा हटाइनेछ', 'नक्कली प्रोफाइल रिपोर्ट गर्नुहोस् र साथीहरूलाई जानकारी दिनुहोस्', 'बदलामा उनीहरूको नक्कली प्रोफाइल बनाउनुहोस्', 'आफ्नो खाता मेटाउनुहोस्'],
      correct: 1,
      tip_en: 'Report impersonation to the platform and file a police report at Nepal Cyber Bureau (01-4412835).',
      tip_np: 'प्लेटफर्ममा नक्कलीकरण रिपोर्ट गर्नुहोस् र नेपाल साइबर ब्यूरो (०१-४४१२८३५) मा प्रहरी रिपोर्ट दिनुहोस्।'
    },
    {
      q_en: 'You get a call: "This is Nepal Telecom. Share your OTP to prevent SIM deactivation." What is this?',
      q_np: 'तपाईंलाई फोन आउँछ: "यो Nepal Telecom हो। SIM निष्क्रिय हुनबाट रोक्न OTP दिनुहोस्।" यो के हो?',
      options_en: ['A legitimate security verification', 'A social engineering scam', 'A routine SIM check', 'A network upgrade notice'],
      options_np: ['वैध सुरक्षा प्रमाणीकरण', 'सोसल इन्जिनियरिङ स्क्याम', 'नियमित SIM जाँच', 'नेटवर्क अपग्रेड सूचना'],
      correct: 1,
      tip_en: 'Telecom companies never ask for OTPs via phone. This is a SIM swap/social engineering scam.',
      tip_np: 'टेलिकम कम्पनीहरूले कहिल्यै फोनमा OTP माग्दैनन्। यो SIM स्वाप/सोसल इन्जिनियरिङ स्क्याम हो।'
    },
    {
      q_en: 'Under Nepal\'s Electronic Transactions Act 2063, unauthorized computer access is punishable by:',
      q_np: 'नेपालको इलेक्ट्रोनिक कारोबार ऐन २०६३ अन्तर्गत, अनाधिकृत कम्प्युटर पहुँच सजायोग्य छ:',
      options_en: ['A fine of up to Rs 200,000 or up to 3 years imprisonment', 'Only a verbal warning', 'No punishment exists', 'Community service only'],
      options_np: ['रु २,००,००० सम्म जरिवाना वा ३ वर्ष सम्म कैद', 'मौखिक चेतावनी मात्र', 'कुनै सजाय छैन', 'सामुदायिक सेवा मात्र'],
      correct: 0,
      tip_en: 'Nepal has real cybercrime laws. Report incidents to Nepal Police Cyber Bureau.',
      tip_np: 'नेपालमा वास्तविक साइबर अपराध कानुनहरू छन्। घटनाहरू नेपाल प्रहरी साइबर ब्यूरोमा रिपोर्ट गर्नुहोस्।'
    },
    {
      q_en: 'You see a WhatsApp group promising "Rs 5,000 daily by working from home — just invest Rs 1,000." What is this?',
      q_np: 'तपाईंले WhatsApp समूह देख्नुहुन्छ "घरबाटै काम गरेर दैनिक रु ५,००० — केवल रु १,००० लगानी गर्नुहोस्।" यो के हो?',
      options_en: ['A genuine work-from-home opportunity', 'A pyramid/task-based scam', 'A government employment scheme', 'A legitimate freelance platform'],
      options_np: ['वास्तविक घरबाटै काम गर्ने अवसर', 'पिरामिड/कार्य-आधारित स्क्याम', 'सरकारी रोजगार योजना', 'वैध फ्रिल्यान्स प्लेटफर्म'],
      correct: 1,
      tip_en: 'Task-based scams have cheated thousands of Nepalis. No job pays Rs 5,000/day for "easy tasks."',
      tip_np: 'कार्य-आधारित स्क्यामहरूले हजारौं नेपालीलाई ठगेका छन्। कुनै कामले "सजिलो कार्य" को लागि दैनिक रु ५,००० तिर्दैन।'
    },
    {
      q_en: 'Which is the safest practice for public Wi-Fi (like in cafes)?',
      q_np: 'सार्वजनिक Wi-Fi (जस्तै क्याफेमा) को लागि कुन सबैभन्दा सुरक्षित अभ्यास हो?',
      options_en: ['Do online banking freely', 'Use a VPN and avoid banking/sensitive logins', 'Share the network password with others', 'Keep Bluetooth always on'],
      options_np: ['स्वतन्त्र रूपमा अनलाइन बैंकिङ गर्नुहोस्', 'VPN प्रयोग गर्नुहोस् र बैंकिङ/संवेदनशील लगइनबाट बच्नुहोस्', 'नेटवर्क पासवर्ड अरूसँग साझा गर्नुहोस्', 'Bluetooth सधैं अन राख्नुहोस्'],
      correct: 1,
      tip_en: 'Public Wi-Fi is unsafe for sensitive activities. Use a VPN or mobile data for banking.',
      tip_np: 'सार्वजनिक Wi-Fi संवेदनशील गतिविधिहरूको लागि असुरक्षित छ। बैंकिङको लागि VPN वा मोबाइल डाटा प्रयोग गर्नुहोस्।'
    }
  ];

  /* ─── State ─── */
  let currentQ = 0;
  let score = 0;
  let answered = false;
  let answers = []; // track which questions were wrong for tips

  /* ─── DOM ─── */
  const startView = document.getElementById('quizStart');
  const questionWrap = document.getElementById('quizQuestionWrap');
  const resultsView = document.getElementById('quizResults');
  const startBtn = document.getElementById('quizStartBtn');
  const progressBar = document.getElementById('quizProgressBar');
  const progressText = document.getElementById('quizProgressText');
  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const nextBtn = document.getElementById('quizNextBtn');
  const scoreFill = document.getElementById('scoreFill');
  const scoreText = document.getElementById('scoreText');
  const scoreLabel = document.getElementById('quizScoreLabel');
  const tipsEl = document.getElementById('quizTips');
  const retakeBtn = document.getElementById('quizRetake');
  const pledgeBtn = document.getElementById('pledgeBtn');
  const pledgeModal = document.getElementById('pledgeModal');
  const pledgeClose = document.getElementById('pledgeModalClose');
  const pledgeName = document.getElementById('pledgeName');
  const pledgeSignBtn = document.getElementById('pledgeSignBtn');
  const certPreview = document.getElementById('certificatePreview');
  const certCanvas = document.getElementById('certificateCanvas');
  const downloadBtn = document.getElementById('downloadCertBtn');

  if (!startBtn) return; // Guard

  /* ─── Helpers ─── */
  function getLang() {
    return document.documentElement.getAttribute('data-lang') || 'en';
  }

  /* ─── Start Quiz ─── */
  startBtn.addEventListener('click', function () {
    currentQ = 0;
    score = 0;
    answered = false;
    answers = [];
    startView.hidden = true;
    questionWrap.hidden = false;
    resultsView.hidden = true;
    showQuestion();
  });

  /* ─── Show Question ─── */
  function showQuestion() {
    answered = false;
    nextBtn.disabled = true;
    nextBtn.classList.add('disabled');
    const lang = getLang();
    const q = questions[currentQ];

    progressBar.style.width = ((currentQ + 1) / questions.length * 100) + '%';
    progressText.textContent = (currentQ + 1) + ' / ' + questions.length;

    questionEl.textContent = lang === 'np' ? q.q_np : q.q_en;

    const opts = lang === 'np' ? q.options_np : q.options_en;
    optionsEl.innerHTML = '';
    opts.forEach(function (opt, i) {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        if (answered) return;
        selectOption(i, btn);
      });
      optionsEl.appendChild(btn);
    });

    // Update next button text for last question
    const nextSpanEn = nextBtn.querySelector('[data-lang-en]');
    const nextSpanNp = nextBtn.querySelector('[data-lang-np]');
    if (currentQ === questions.length - 1) {
      if (nextSpanEn) nextSpanEn.textContent = 'See Results →';
      if (nextSpanNp) nextSpanNp.textContent = 'परिणाम हेर्नुहोस् →';
    } else {
      if (nextSpanEn) nextSpanEn.textContent = 'Next Question →';
      if (nextSpanNp) nextSpanNp.textContent = 'अर्को प्रश्न →';
    }
  }

  /* ─── Select Option ─── */
  function selectOption(chosen, btnEl) {
    answered = true;
    nextBtn.disabled = false;
    nextBtn.classList.remove('disabled');
    const q = questions[currentQ];
    const allBtns = optionsEl.querySelectorAll('.quiz-option');

    allBtns.forEach(function (b, i) {
      b.style.pointerEvents = 'none';
      if (i === q.correct) b.classList.add('correct');
      if (i === chosen && chosen !== q.correct) b.classList.add('wrong');
    });

    if (chosen === q.correct) {
      score++;
      answers.push({ correct: true, index: currentQ });
    } else {
      answers.push({ correct: false, index: currentQ });
    }
  }

  /* ─── Next Question / Show Results ─── */
  nextBtn.addEventListener('click', function () {
    if (!answered) return;
    currentQ++;
    if (currentQ >= questions.length) {
      showResults();
    } else {
      showQuestion();
    }
  });

  /* ─── Show Results ─── */
  function showResults() {
    questionWrap.hidden = true;
    resultsView.hidden = false;
    const lang = getLang();

    const pct = Math.round((score / questions.length) * 100);
    scoreText.textContent = pct + '%';

    // Animate ring
    const circumference = 326.73;
    const offset = circumference - (pct / 100) * circumference;
    setTimeout(function () {
      scoreFill.style.strokeDashoffset = offset;
    }, 100);

    // Score label
    if (pct >= 90) {
      scoreLabel.textContent = lang === 'np' ? '🏆 उत्कृष्ट! तपाईं साइबर चैम्पियन हुनुहुन्छ!' : '🏆 Excellent! You\'re a Cyber Champion!';
    } else if (pct >= 70) {
      scoreLabel.textContent = lang === 'np' ? '👏 राम्रो! तपाईंसँग बलियो ज्ञान छ!' : '👏 Good job! You have solid knowledge!';
    } else if (pct >= 50) {
      scoreLabel.textContent = lang === 'np' ? '📚 ठीकठाक! अझ सिक्नुपर्छ।' : '📚 Not bad! There\'s room to learn more.';
    } else {
      scoreLabel.textContent = lang === 'np' ? '⚠️ सावधान! साइबर सुरक्षा बारे थप सिक्नुहोस्।' : '⚠️ Be careful! Learn more about cyber safety.';
    }

    // Show tips for wrong answers
    const wrongAnswers = answers.filter(function (a) { return !a.correct; });
    if (wrongAnswers.length > 0) {
      let tipsHtml = '<ul>';
      wrongAnswers.forEach(function (a) {
        const q = questions[a.index];
        const tip = lang === 'np' ? q.tip_np : q.tip_en;
        tipsHtml += '<li>' + tip + '</li>';
      });
      tipsHtml += '</ul>';
      tipsEl.innerHTML = tipsHtml;
    } else {
      tipsEl.innerHTML = '<p style="text-align:center;color:var(--success);font-weight:600">' +
        (lang === 'np' ? '🎉 सबै सही! तपाईं पूर्ण रूपमा तयार हुनुहुन्छ!' : '🎉 All correct! You\'re fully prepared!') + '</p>';
    }
  }

  /* ─── Retake ─── */
  retakeBtn.addEventListener('click', function () {
    resultsView.hidden = true;
    startView.hidden = false;
    scoreFill.style.strokeDashoffset = 326.73;
  });

  /* ─── Pledge Modal ─── */
  pledgeBtn.addEventListener('click', function () {
    pledgeModal.hidden = false;
    certPreview.hidden = true;
    pledgeName.value = '';
  });

  pledgeClose.addEventListener('click', function () {
    pledgeModal.hidden = true;
  });

  pledgeModal.addEventListener('click', function (e) {
    if (e.target === pledgeModal) pledgeModal.hidden = true;
  });

  /* ─── Generate Certificate ─── */
  pledgeSignBtn.addEventListener('click', function () {
    const name = pledgeName.value.trim();
    if (!name) {
      pledgeName.style.borderColor = 'var(--danger)';
      pledgeName.focus();
      return;
    }
    pledgeName.style.borderColor = '';
    generateCertificate(name);
    certPreview.hidden = false;
  });

  function generateCertificate(name) {
    const ctx = certCanvas.getContext('2d');
    const W = certCanvas.width;
    const H = certCanvas.height;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);

    // Border
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#1b6ec2');
    grad.addColorStop(1, '#dc143c');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, W - 24, H - 24);

    // Inner border
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(24, 24, W - 48, H - 48);

    // Shield icon
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🛡️', W / 2, 70);

    // Title
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 28px Poppins, sans-serif';
    ctx.fillText('Digital Safety Pledge Certificate', W / 2, 120);

    // Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Poppins, sans-serif';
    ctx.fillText('eSuraksha Nepal — Secure Minds, Safer Digital Nepal', W / 2, 150);

    // Divider
    ctx.strokeStyle = '#1b6ec2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 170);
    ctx.lineTo(600, 170);
    ctx.stroke();

    // "This certifies that"
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px Poppins, sans-serif';
    ctx.fillText('This certifies that', W / 2, 210);

    // Name
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 32px Poppins, sans-serif';
    ctx.fillText(name, W / 2, 255);

    // Underline under name
    const nameWidth = ctx.measureText(name).width;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - nameWidth / 2 - 10, 265);
    ctx.lineTo(W / 2 + nameWidth / 2 + 10, 265);
    ctx.stroke();

    // Pledge text
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '14px Poppins, sans-serif';
    const pledgeLines = [
      'has pledged to practice safe digital habits,',
      'protect personal information online, and spread',
      'cybersecurity awareness in their community.'
    ];
    pledgeLines.forEach(function (line, i) {
      ctx.fillText(line, W / 2, 300 + i * 24);
    });

    // Score
    var pct = Math.round((score / questions.length) * 100);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 18px Poppins, sans-serif';
    ctx.fillText('Quiz Score: ' + pct + '% (' + score + '/' + questions.length + ')', W / 2, 395);

    // Date
    var dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = '#64748b';
    ctx.font = '13px Poppins, sans-serif';
    ctx.fillText('Date: ' + dateStr, W / 2, 430);

    // Footer
    ctx.fillStyle = '#475569';
    ctx.font = '11px Poppins, sans-serif';
    ctx.fillText('esuraksha-nepal | Web Wizards Innovation Lab', W / 2, 475);
  }

  /* ─── Download Certificate ─── */
  downloadBtn.addEventListener('click', function () {
    var link = document.createElement('a');
    link.download = 'eSuraksha_Nepal_Pledge_Certificate.png';
    link.href = certCanvas.toDataURL('image/png');
    link.click();
  });

  /* ─── Re-render on language switch ─── */
  window.rerenderQuiz = function () {
    // If quiz is in progress, re-render current question
    if (!questionWrap.hidden && !answered) {
      showQuestion();
    }
  };

})();
