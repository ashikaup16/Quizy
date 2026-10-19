/**
 * Quizy - Application Controller
 * Handles Featured Slider, Quiz Engine, 3D Sliding Transitions, Scoring,
 * Lifelines, Review Carousel, Leaderboard Drawer, and Certificate Generation.
 */

(function () {
  'use strict';

  // =========================================================================
  // APP STATE
  // =========================================================================
  const state = {
    currentCategory: null,
    questions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    userAnswers: [], // { question, selected, correct, isCorrect }
    mode: 'standard', // 'casual', 'standard', 'blitz'
    timeLimit: 30, // seconds per question based on mode
    timeRemaining: 30,
    timerId: null,
    startTime: null,
    totalElapsed: 0,
    lifelines: {
      fiftyFiftyUsed: false,
      hintUsed: false,
      freezeUsed: false
    },
    // Featured Slider State
    sliderIndex: 0,
    sliderInterval: null,
    // Review Slider State
    reviewIndex: 0
  };

  // DOM Elements Cache
  const dom = {
    // Nav
    btnSoundToggle: document.getElementById('btn-sound-toggle'),
    soundIcon: document.getElementById('sound-icon'),
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    btnOpenLeaderboard: document.getElementById('btn-open-leaderboard'),
    btnOpenCreator: document.getElementById('btn-open-creator'),
    navBrandHome: document.getElementById('nav-brand-home'),
    globalStreakBadge: document.getElementById('global-streak-badge'),

    // Screens
    homeScreen: document.getElementById('home-screen'),
    quizScreen: document.getElementById('quiz-screen'),
    resultsScreen: document.getElementById('results-screen'),

    // Slider
    sliderTrack: document.getElementById('slider-track'),
    sliderBtnPrev: document.getElementById('slider-btn-prev'),
    sliderBtnNext: document.getElementById('slider-btn-next'),
    sliderDotsContainer: document.getElementById('slider-dots-container'),
    heroSlider: document.getElementById('hero-slider'),

    // Category Grid & Filter
    categoryGrid: document.getElementById('category-grid'),
    difficultySelector: document.getElementById('difficulty-selector'),
    categorySearchInput: document.getElementById('category-search-input'),

    // Quiz HUD
    btnQuitQuiz: document.getElementById('btn-quit-quiz'),
    hudCategoryTag: document.getElementById('hud-category-tag'),
    hudQuestionCounter: document.getElementById('hud-question-counter'),
    hudScoreVal: document.getElementById('hud-score-val'),
    timerWidget: document.getElementById('quiz-timer-widget'),
    timerProgressRing: document.getElementById('timer-progress-ring'),
    timerDisplayText: document.getElementById('timer-display-text'),
    quizProgressBar: document.getElementById('quiz-progress-bar'),

    // Lifelines
    btnLifeline5050: document.getElementById('btn-lifeline-5050'),
    btnLifelineHint: document.getElementById('btn-lifeline-hint'),
    btnLifelineFreeze: document.getElementById('btn-lifeline-freeze'),

    // Question Card
    questionViewport: document.getElementById('question-viewport'),
    activeQuestionCard: document.getElementById('active-question-card'),
    questionPhotoContainer: document.getElementById('question-photo-container'),
    questionPhotoImg: document.getElementById('question-photo-img'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    questionHintBox: document.getElementById('question-hint-box'),
    hintTextContent: document.getElementById('hint-text-content'),
    questionExplanationPanel: document.getElementById('question-explanation-panel'),
    explanationTextContent: document.getElementById('explanation-text-content'),
    btnNextQuestion: document.getElementById('btn-next-question'),

    // Results Screen
    resultArenaName: document.getElementById('result-arena-name'),
    resultTitleHeadline: document.getElementById('result-title-headline'),
    resultSubtitleDesc: document.getElementById('result-subtitle-desc'),
    gaugeCircleFill: document.getElementById('gauge-circle-fill'),
    resultPercentageDisplay: document.getElementById('result-percentage-display'),
    statTotalScore: document.getElementById('stat-total-score'),
    statCorrectCount: document.getElementById('stat-correct-count'),
    statTimeSpent: document.getElementById('stat-time-spent'),
    statMaxStreak: document.getElementById('stat-max-streak'),
    btnRetakeQuiz: document.getElementById('btn-retake-quiz'),
    btnDownloadCert: document.getElementById('btn-download-cert'),
    btnBackHome: document.getElementById('btn-back-home'),

    // Review Carousel
    reviewSlideCounter: document.getElementById('review-slide-counter'),
    reviewCardContainer: document.getElementById('review-card-container'),
    btnReviewPrev: document.getElementById('btn-review-prev'),
    btnReviewNext: document.getElementById('btn-review-next'),

    // Leaderboard Drawer
    leaderboardBackdrop: document.getElementById('leaderboard-backdrop'),
    btnCloseLeaderboard: document.getElementById('btn-close-leaderboard'),
    leaderboardListItems: document.getElementById('leaderboard-list-items'),
    footerLeaderboardLink: document.getElementById('footer-leaderboard-link'),
    footerNewQuizLink: document.getElementById('footer-new-quiz-link'),

    // Quiz Creator Modal
    creatorModalBackdrop: document.getElementById('creator-modal-backdrop'),
    btnCloseCreator: document.getElementById('btn-close-creator'),
    btnCancelCreator: document.getElementById('btn-cancel-creator'),
    quizCreatorForm: document.getElementById('quiz-creator-form'),
    certificateCanvas: document.getElementById('certificate-canvas')
  };

  // =========================================================================
  // INITIALIZATION & THEME HANDLING
  // =========================================================================
  function init() {
    initTheme();
    initAudioIcon();
    renderFeaturedSlider();
    renderCategoryGrid();
    setupEventListeners();
    loadLeaderboard();
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('quizy_theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      dom.themeIcon.textContent = '☀️';
    } else {
      document.body.classList.remove('light-theme');
      dom.themeIcon.textContent = '🌙';
    }
  }

  function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('quizy_theme', isLight ? 'light' : 'dark');
    dom.themeIcon.textContent = isLight ? '☀️' : '🌙';
    window.soundEngine.playClick();
  }

  function initAudioIcon() {
    const isMuted = localStorage.getItem('quizy_muted') === 'true';
    dom.soundIcon.textContent = isMuted ? '🔇' : '🔊';
  }

  function toggleSound() {
    const isMuted = window.soundEngine.toggleMute();
    dom.soundIcon.textContent = isMuted ? '🔇' : '🔊';
    if (!isMuted) window.soundEngine.playClick();
  }

  // =========================================================================
  // FEATURED HERO SLIDER
  // =========================================================================
  function renderFeaturedSlider() {
    dom.sliderTrack.innerHTML = '';
    dom.sliderDotsContainer.innerHTML = '';

    window.FEATURED_SLIDES.forEach((slide, idx) => {
      // Slide Element
      const slideEl = document.createElement('div');
      slideEl.className = 'slide';
      slideEl.style.backgroundImage = `url('${slide.image}')`;

      slideEl.innerHTML = `
        <div class="slide-overlay"></div>
        <div class="slide-content">
          <div class="slide-badge" style="background: ${slide.tagColor}">
            <span>✨</span> <span>${slide.tag}</span>
          </div>
          <h2 class="slide-title">${slide.title}</h2>
          <div class="slide-subtitle">${slide.subtitle}</div>
          <p class="slide-desc">${slide.summary}</p>
          <div class="slide-meta">
            <span class="meta-item">👥 ${slide.stats.players} played</span>
            <span class="meta-item">⚡ ${slide.stats.xp}</span>
            <span class="meta-item">🎯 ${slide.stats.difficulty}</span>
          </div>
          <button class="nav-btn primary slide-play-btn" data-category="${slide.categoryId}">
            <span>Play Challenge</span> <span>→</span>
          </button>
        </div>
      `;

      slideEl.querySelector('.slide-play-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        startQuiz(slide.categoryId);
      });

      dom.sliderTrack.appendChild(slideEl);

      // Dot Indicator
      const dot = document.createElement('div');
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(idx));
      dom.sliderDotsContainer.appendChild(dot);
    });

    startSliderTimer();
  }

  function goToSlide(index) {
    const total = window.FEATURED_SLIDES.length;
    state.sliderIndex = (index + total) % total;
    dom.sliderTrack.style.transform = `translateX(-${state.sliderIndex * 100}%)`;

    // Update dots
    const dots = dom.sliderDotsContainer.querySelectorAll('.dot');
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === state.sliderIndex);
    });

    window.soundEngine.playSlide();
  }

  function nextSlide() {
    goToSlide(state.sliderIndex + 1);
  }

  function prevSlide() {
    goToSlide(state.sliderIndex - 1);
  }

  function startSliderTimer() {
    clearInterval(state.sliderInterval);
    state.sliderInterval = setInterval(nextSlide, 5500);
  }

  function stopSliderTimer() {
    clearInterval(state.sliderInterval);
  }

  // Touch Swipe for Hero Slider
  let touchStartX = 0;
  let touchEndX = 0;

  dom.heroSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopSliderTimer();
  }, { passive: true });

  dom.heroSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    startSliderTimer();
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + threshold) {
      prevSlide();
    }
  }

  // =========================================================================
  // CATEGORY GRID & SEARCH
  // =========================================================================
  function renderCategoryGrid(filterText = '') {
    dom.categoryGrid.innerHTML = '';
    const query = filterText.toLowerCase().trim();

    // Fetch custom categories from localStorage if any
    const customCats = JSON.parse(localStorage.getItem('quizy_custom_categories') || '[]');
    const allCategories = [...window.QUIZ_CATEGORIES, ...customCats];

    const filtered = allCategories.filter(cat => {
      return cat.name.toLowerCase().includes(query) ||
             cat.description.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      dom.categoryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h3>No categories match "${filterText}"</h3>
          <p>Try searching for Space, Tech, Cinema, Geography, or create your own custom quiz!</p>
        </div>
      `;
      return;
    }

    filtered.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${cat.image}" alt="${cat.name}" class="card-img" loading="lazy">
          <div class="card-img-overlay"></div>
          <span class="card-badge">${cat.badge || 'Arena'}</span>
          <div class="card-icon" style="background: ${cat.gradient || 'var(--gradient-brand)'};">
            ${cat.icon}
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${cat.name}</h3>
          <p class="card-desc">${cat.description}</p>
          <div class="card-footer">
            <span>⏱️ ${cat.avgTime || '3 mins'}</span>
            <div class="play-action-btn">
              <span>Enter Arena</span> <span>→</span>
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        window.soundEngine.playClick();
        startQuiz(cat.id);
      });

      dom.categoryGrid.appendChild(card);
    });
  }

  // =========================================================================
  // QUIZ ENGINE & ACTIVE GAMEPLAY
  // =========================================================================
  function startQuiz(categoryId) {
    const customCats = JSON.parse(localStorage.getItem('quizy_custom_categories') || '[]');
    const allCats = [...window.QUIZ_CATEGORIES, ...customCats];
    const cat = allCats.find(c => c.id === categoryId) || window.QUIZ_CATEGORIES[0];
    
    // Fetch questions
    let questions = window.QUIZ_QUESTIONS[categoryId];
    if (!questions) {
      // Check custom questions
      const customQuestionsMap = JSON.parse(localStorage.getItem('quizy_custom_questions') || '{}');
      questions = customQuestionsMap[categoryId] || window.QUIZ_QUESTIONS.tech;
    }

    // Shuffle questions copy
    state.currentCategory = cat;
    state.questions = [...questions].sort(() => Math.random() - 0.5);
    state.currentIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.maxStreak = 0;
    state.userAnswers = [];
    state.startTime = Date.now();
    state.lifelines = {
      fiftyFiftyUsed: false,
      hintUsed: false,
      freezeUsed: false
    };

    // Determine time limit based on mode
    if (state.mode === 'casual') {
      state.timeLimit = 0; // No timer
    } else if (state.mode === 'blitz') {
      state.timeLimit = 15;
    } else {
      state.timeLimit = 30; // standard
    }

    // Reset lifelines UI
    dom.btnLifeline5050.disabled = false;
    dom.btnLifelineHint.disabled = false;
    dom.btnLifelineFreeze.disabled = (state.timeLimit === 0);

    // Switch screen with slide
    dom.homeScreen.style.display = 'none';
    dom.resultsScreen.style.display = 'none';
    dom.quizScreen.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update HUD Category
    dom.hudCategoryTag.textContent = cat.name;

    renderQuestion(0, 'none');
  }

  function renderQuestion(index, transitionDirection = 'right') {
    const q = state.questions[index];
    if (!q) {
      finishQuiz();
      return;
    }

    // Reset state & panels
    clearInterval(state.timerId);
    dom.btnNextQuestion.style.display = 'none';
    dom.questionHintBox.style.display = 'none';
    dom.questionExplanationPanel.style.display = 'none';

    // Apply 3D Sliding Animation
    dom.activeQuestionCard.classList.remove('slide-enter-right', 'slide-exit-left', 'slide-enter-left', 'slide-exit-right');
    void dom.activeQuestionCard.offsetWidth; // Trigger reflow

    if (transitionDirection === 'right') {
      dom.activeQuestionCard.classList.add('slide-enter-right');
      window.soundEngine.playSlide();
    } else if (transitionDirection === 'left') {
      dom.activeQuestionCard.classList.add('slide-enter-left');
      window.soundEngine.playSlide();
    }

    // HUD Update
    dom.hudQuestionCounter.textContent = `Question ${index + 1} / ${state.questions.length}`;
    dom.hudScoreVal.textContent = `${state.score} PTS`;

    // Progress Bar
    const progressPercent = ((index) / state.questions.length) * 100;
    dom.quizProgressBar.style.width = `${progressPercent}%`;

    // Question Image
    if (q.image) {
      dom.questionPhotoContainer.style.display = 'block';
      dom.questionPhotoImg.src = q.image;
      dom.questionPhotoImg.alt = `Question ${index + 1} illustration`;
    } else {
      dom.questionPhotoContainer.style.display = 'none';
    }

    // Question Text
    dom.questionText.textContent = q.question;

    // Options Rendering
    dom.optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.index = optIdx;
      btn.innerHTML = `
        <span class="option-key">${letters[optIdx]}</span>
        <span class="option-text">${optText}</span>
      `;

      btn.addEventListener('click', () => handleOptionSelect(optIdx, btn));
      dom.optionsContainer.appendChild(btn);
    });

    // Start Timer
    if (state.timeLimit > 0) {
      dom.timerWidget.style.display = 'block';
      startTimer(state.timeLimit);
    } else {
      dom.timerWidget.style.display = 'none';
    }
  }

  // =========================================================================
  // TIMER & COUNTDOWN LOGIC
  // =========================================================================
  function startTimer(seconds) {
    clearInterval(state.timerId);
    state.timeRemaining = seconds;
    updateTimerVisual(seconds, seconds);

    state.timerId = setInterval(() => {
      state.timeRemaining--;
      updateTimerVisual(state.timeRemaining, seconds);

      if (state.timeRemaining <= 5 && state.timeRemaining > 0) {
        window.soundEngine.playUrgentTick();
        dom.timerWidget.classList.add('urgent');
      } else {
        dom.timerWidget.classList.remove('urgent');
      }

      if (state.timeRemaining <= 0) {
        clearInterval(state.timerId);
        handleTimeout();
      }
    }, 1000);
  }

  function updateTimerVisual(remaining, total) {
    dom.timerDisplayText.textContent = Math.max(0, remaining);
    // 2 * PI * 20 = ~125.66
    const circumference = 125.66;
    const progress = Math.max(0, remaining / total);
    const offset = circumference * (1 - progress);
    dom.timerProgressRing.style.strokeDashoffset = offset;
  }

  function handleTimeout() {
    window.soundEngine.playWrong();
    // Reveal correct answer and mark as missed
    const q = state.questions[state.currentIndex];
    state.streak = 0;

    state.userAnswers.push({
      question: q.question,
      options: q.options,
      selected: -1, // timed out
      correct: q.answer,
      isCorrect: false,
      explanation: q.explanation || 'Time ran out before an answer was chosen.'
    });

    // Highlight correct answer
    const buttons = dom.optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) {
        btn.classList.add('correct');
      }
    });

    showExplanation(q.explanation || 'Time limit reached!');
  }

  // =========================================================================
  // OPTION SELECTION & SCORING
  // =========================================================================
  function handleOptionSelect(selectedIndex, selectedBtn) {
    clearInterval(state.timerId);
    dom.timerWidget.classList.remove('urgent');

    const q = state.questions[state.currentIndex];
    const isCorrect = (selectedIndex === q.answer);

    // Disable all options
    const buttons = dom.optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.answer) {
        b.classList.add('correct');
      } else if (idx === selectedIndex && !isCorrect) {
        b.classList.add('wrong');
      }
    });

    // Scoring & Streaks
    if (isCorrect) {
      state.streak++;
      if (state.streak > state.maxStreak) {
        state.maxStreak = state.streak;
      }

      // Base points + Speed bonus + Streak multiplier
      let points = 100;
      if (state.timeLimit > 0) {
        const speedBonus = Math.floor((state.timeRemaining / state.timeLimit) * 50);
        points += speedBonus;
      }
      
      const multiplier = state.streak >= 4 ? 2.0 : state.streak >= 3 ? 1.5 : state.streak >= 2 ? 1.25 : 1.0;
      const totalAwarded = Math.round(points * multiplier);
      state.score += totalAwarded;

      dom.hudScoreVal.textContent = `${state.score} PTS`;

      if (state.streak >= 3) {
        window.soundEngine.playStreak();
      } else {
        window.soundEngine.playCorrect();
      }
    } else {
      state.streak = 0;
      window.soundEngine.playWrong();
    }

    // Save for review
    state.userAnswers.push({
      question: q.question,
      options: q.options,
      selected: selectedIndex,
      correct: q.answer,
      isCorrect: isCorrect,
      explanation: q.explanation || ''
    });

    showExplanation(q.explanation);
  }

  function showExplanation(explanationText) {
    if (explanationText) {
      dom.explanationTextContent.textContent = explanationText;
      dom.questionExplanationPanel.style.display = 'block';
    }

    // Show Next Button
    const isLast = (state.currentIndex === state.questions.length - 1);
    dom.btnNextQuestion.querySelector('span:first-child').textContent = isLast ? 'Finish Quiz' : 'Next Question';
    dom.btnNextQuestion.style.display = 'inline-flex';
  }

  function nextQuestion() {
    // Animate out active card to left
    dom.activeQuestionCard.classList.remove('slide-enter-right', 'slide-enter-left');
    dom.activeQuestionCard.classList.add('slide-exit-left');

    setTimeout(() => {
      state.currentIndex++;
      renderQuestion(state.currentIndex, 'right');
    }, 300);
  }

  // =========================================================================
  // LIFELINES LOGIC
  // =========================================================================
  function use5050() {
    if (state.lifelines.fiftyFiftyUsed) return;
    state.lifelines.fiftyFiftyUsed = true;
    dom.btnLifeline5050.disabled = true;
    window.soundEngine.playLifeline();

    const q = state.questions[state.currentIndex];
    const buttons = Array.from(dom.optionsContainer.querySelectorAll('.option-btn'));
    
    // Pick two incorrect options to hide
    const wrongIndices = [];
    buttons.forEach((_, idx) => {
      if (idx !== q.answer) wrongIndices.push(idx);
    });

    // Shuffle and pick 2
    wrongIndices.sort(() => Math.random() - 0.5);
    const toHide = wrongIndices.slice(0, 2);

    toHide.forEach(idx => {
      buttons[idx].classList.add('hidden-lifeline');
      buttons[idx].disabled = true;
    });
  }

  function useHint() {
    if (state.lifelines.hintUsed) return;
    state.lifelines.hintUsed = true;
    dom.btnLifelineHint.disabled = true;
    window.soundEngine.playLifeline();

    const q = state.questions[state.currentIndex];
    dom.hintTextContent.textContent = q.hint || 'Focus carefully on the historical timeframe and key milestones!';
    dom.questionHintBox.style.display = 'block';
  }

  function useFreeze() {
    if (state.lifelines.freezeUsed || state.timeLimit === 0) return;
    state.lifelines.freezeUsed = true;
    dom.btnLifelineFreeze.disabled = true;
    window.soundEngine.playLifeline();

    // Add 15 seconds
    state.timeRemaining += 15;
    updateTimerVisual(state.timeRemaining, state.timeLimit + 15);
    dom.timerWidget.classList.remove('urgent');
  }

  // =========================================================================
  // RESULTS & SCORING DASHBOARD
  // =========================================================================
  function finishQuiz() {
    clearInterval(state.timerId);
    state.totalElapsed = Math.floor((Date.now() - state.startTime) / 1000);

    // Switch screen
    dom.quizScreen.style.display = 'none';
    dom.resultsScreen.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Calculate accuracy
    const totalQ = state.questions.length;
    const correctCount = state.userAnswers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctCount / totalQ) * 100);

    // Update Headline & Performance Tier
    dom.resultArenaName.textContent = `${state.currentCategory.name} Challenge`;
    if (accuracy === 100) {
      dom.resultTitleHeadline.textContent = '🌟 Omniscient Grandmaster!';
      dom.resultSubtitleDesc.textContent = 'Flawless execution! You attained 100% accuracy and etched your name in legend.';
      window.soundEngine.playVictory();
      window.confettiManager.burst(150);
    } else if (accuracy >= 80) {
      dom.resultTitleHeadline.textContent = '⚡ Trivia Prodigy!';
      dom.resultSubtitleDesc.textContent = 'Exceptional performance! Your knowledge and reflexes are top-tier.';
      window.soundEngine.playVictory();
      window.confettiManager.burst(100);
    } else if (accuracy >= 60) {
      dom.resultTitleHeadline.textContent = '🚀 Keen Explorer!';
      dom.resultSubtitleDesc.textContent = 'Great run! A little more study and you will conquer this realm effortlessly.';
      window.soundEngine.playCorrect();
    } else {
      dom.resultTitleHeadline.textContent = '🌱 Resilient Apprentice!';
      dom.resultSubtitleDesc.textContent = 'Every mistake is a stepping stone. Review the breakdown below and try again!';
      window.soundEngine.playClick();
    }

    // Animated Score Gauge
    animateScoreGauge(accuracy);

    // Update Stats Breakdown
    dom.statTotalScore.textContent = state.score;
    dom.statCorrectCount.textContent = `${correctCount} / ${totalQ}`;
    
    const minutes = Math.floor(state.totalElapsed / 60);
    const seconds = state.totalElapsed % 60;
    dom.statTimeSpent.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    dom.statMaxStreak.textContent = `${state.maxStreak}x`;

    // Save to Leaderboard
    saveToLeaderboard({
      name: 'You (Player)',
      avatar: state.currentCategory.icon,
      score: state.score,
      accuracy: `${accuracy}%`,
      category: state.currentCategory.name,
      date: 'Just now'
    });

    // Render Review Carousel
    state.reviewIndex = 0;
    renderReviewCard(state.reviewIndex);
  }

  function animateScoreGauge(targetPercentage) {
    // 2 * PI * 70 = ~439.8
    const circumference = 439.8;
    const offset = circumference * (1 - (targetPercentage / 100));
    dom.gaugeCircleFill.style.strokeDashoffset = offset;

    // Number counting animation
    let count = 0;
    const step = Math.max(1, Math.floor(targetPercentage / 30));
    const timer = setInterval(() => {
      count += step;
      if (count >= targetPercentage) {
        count = targetPercentage;
        clearInterval(timer);
      }
      dom.resultPercentageDisplay.textContent = `${count}%`;
    }, 25);
  }

  // =========================================================================
  // SLIDING QUESTION REVIEW CAROUSEL
  // =========================================================================
  function renderReviewCard(index) {
    const total = state.userAnswers.length;
    if (total === 0) return;

    state.reviewIndex = (index + total) % total;
    const item = state.userAnswers[state.reviewIndex];

    dom.reviewSlideCounter.textContent = `${state.reviewIndex + 1} of ${total}`;

    const tagClass = item.isCorrect ? 'correct' : 'wrong';
    const tagText = item.isCorrect ? '✓ Correctly Answered' : (item.selected === -1 ? '⏱️ Timed Out' : '✗ Incorrect');

    let answersHtml = '';
    item.options.forEach((opt, optIdx) => {
      let optClass = '';
      let badge = '';

      if (optIdx === item.correct) {
        optClass = 'correct-ans';
        badge = '<span style="font-weight: 700; color: var(--success);">✓ Correct Answer</span>';
      } else if (optIdx === item.selected && !item.isCorrect) {
        optClass = 'user-wrong';
        badge = '<span style="font-weight: 700; color: var(--danger);">✗ Your Pick</span>';
      }

      answersHtml += `
        <div class="review-answer-item ${optClass}">
          <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}</span>
          ${badge}
        </div>
      `;
    });

    dom.reviewCardContainer.innerHTML = `
      <div class="review-question-tag ${tagClass}">${tagText}</div>
      <h4 class="review-q-title">${item.question}</h4>
      <div class="review-answers-grid">
        ${answersHtml}
      </div>
      ${item.explanation ? `
        <div style="margin-top: 0.75rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.45; background: rgba(255,255,255,0.03); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--brand-accent);">
          <strong>Did you know?</strong> ${item.explanation}
        </div>
      ` : ''}
    `;

    window.soundEngine.playSlide();
  }

  // =========================================================================
  // CERTIFICATE GENERATION (HTML5 Canvas)
  // =========================================================================
  function generateCertificate() {
    const canvas = dom.certificateCanvas;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#0a0b14');
    bgGrad.addColorStop(0.5, '#121424');
    bgGrad.addColorStop(1, '#1e1635');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Border Frame
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, w - 90, h - 90);

    // Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 36px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', w / 2, 130);

    ctx.fillStyle = '#06b6d4';
    ctx.font = '600 20px "Space Grotesk", sans-serif';
    ctx.fillText('THIS PRESTIGIOUS CITATION IS PROUDLY CONFERRED UPON', w / 2, 180);

    // Player Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px "Outfit", sans-serif';
    ctx.fillText('Trivia Master', w / 2, 270);

    // Underline
    ctx.beginPath();
    ctx.moveTo(w / 2 - 200, 290);
    ctx.lineTo(w / 2 + 200, 290);
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Summary Text
    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`For outstanding intellect and mastery displayed in the`, w / 2, 350);

    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 28px "Outfit", sans-serif';
    ctx.fillText(`${state.currentCategory ? state.currentCategory.name : 'Cosmic Arena'} Challenge`, w / 2, 395);

    // Score & Accuracy Box
    const totalQ = state.questions.length;
    const correctCount = state.userAnswers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctCount / totalQ) * 100);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(w / 2 - 300, 440, 600, 110);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(w / 2 - 300, 440, 600, 110);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 32px "Space Grotesk", monospace';
    ctx.fillText(`${state.score} POINTS`, w / 2 - 150, 495);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('FINAL SCORE', w / 2 - 150, 525);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 32px "Space Grotesk", monospace';
    ctx.fillText(`${accuracy}% ACCURACY`, w / 2 + 150, 495);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ACCURACY RATE', w / 2 + 150, 525);

    // Gold Seal Medal
    ctx.save();
    ctx.translate(w / 2, 640);
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#000';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('🏆', 0, 12);
    ctx.restore();

    // Date & Signature
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    ctx.fillStyle = '#64748b';
    ctx.font = '18px "Space Grotesk", monospace';
    ctx.fillText(`Issued on: ${today}`, 180, 720);
    ctx.fillText(`QUIZY VERIFIED CITATION #QZ-${Math.floor(100000 + Math.random() * 900000)}`, w - 280, 720);

    // Download trigger
    const link = document.createElement('a');
    link.download = `Quizy_Certificate_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    window.soundEngine.playCorrect();
  }

  // =========================================================================
  // LEADERBOARD DRAWER
  // =========================================================================
  function loadLeaderboard() {
    const stored = JSON.parse(localStorage.getItem('quizy_leaderboard'));
    const list = stored || window.INITIAL_LEADERBOARD;
    renderLeaderboardItems(list);
  }

  function saveToLeaderboard(entry) {
    let list = JSON.parse(localStorage.getItem('quizy_leaderboard')) || [...window.INITIAL_LEADERBOARD];
    list.push(entry);
    list.sort((a, b) => b.score - a.score);
    list = list.slice(0, 12); // Keep top 12

    // Reassign ranks
    list.forEach((item, idx) => item.rank = idx + 1);
    localStorage.setItem('quizy_leaderboard', JSON.stringify(list));
    renderLeaderboardItems(list);
  }

  function renderLeaderboardItems(list) {
    dom.leaderboardListItems.innerHTML = '';
    list.forEach(item => {
      const row = document.createElement('div');
      row.className = 'leaderboard-item';

      let rankClass = '';
      if (item.rank === 1) rankClass = 'gold';
      else if (item.rank === 2) rankClass = 'silver';
      else if (item.rank === 3) rankClass = 'bronze';

      row.innerHTML = `
        <div class="rank-badge ${rankClass}">#${item.rank}</div>
        <div class="player-avatar">${item.avatar || '⭐'}</div>
        <div class="player-info">
          <div class="player-name">${item.name}</div>
          <div class="player-category">${item.category} • ${item.accuracy || '90%'}</div>
        </div>
        <div class="player-score">${item.score}</div>
      `;

      dom.leaderboardListItems.appendChild(row);
    });
  }

  function toggleLeaderboard(show) {
    dom.leaderboardBackdrop.classList.toggle('open', show);
    if (show) window.soundEngine.playSlide();
  }

  // =========================================================================
  // CUSTOM QUIZ CREATOR
  // =========================================================================
  function toggleCreatorModal(show) {
    dom.creatorModalBackdrop.classList.toggle('open', show);
    if (show) window.soundEngine.playClick();
  }

  function handleCreateQuizSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('custom-category-title').value.trim();
    const desc = document.getElementById('custom-category-desc').value.trim();
    const icon = document.getElementById('custom-category-icon').value.trim() || '✨';
    const image = document.getElementById('custom-category-image').value.trim() || 
                  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
    
    const qText = document.getElementById('custom-q-text').value.trim();
    const opt0 = document.getElementById('custom-opt-0').value.trim();
    const opt1 = document.getElementById('custom-opt-1').value.trim();
    const opt2 = document.getElementById('custom-opt-2').value.trim();
    const opt3 = document.getElementById('custom-opt-3').value.trim();
    const correctVal = parseInt(document.querySelector('input[name="custom-correct-ans"]:checked').value, 10);
    const explanation = document.getElementById('custom-q-explanation').value.trim();

    const categoryId = 'custom_' + Date.now();
    const newCategory = {
      id: categoryId,
      name: title,
      icon: icon,
      badge: 'Custom',
      image: image,
      description: desc,
      questionsCount: 1,
      avgTime: '1 min'
    };

    const newQuestion = {
      id: `${categoryId}-1`,
      question: qText,
      image: image,
      options: [opt0, opt1, opt2, opt3],
      answer: correctVal,
      hint: 'Think about the core concept in the prompt.',
      explanation: explanation || 'Great job answering your custom question!'
    };

    // Save custom category
    const customCats = JSON.parse(localStorage.getItem('quizy_custom_categories') || '[]');
    customCats.unshift(newCategory);
    localStorage.setItem('quizy_custom_categories', JSON.stringify(customCats));

    // Save custom questions
    const customQuestionsMap = JSON.parse(localStorage.getItem('quizy_custom_questions') || '{}');
    customQuestionsMap[categoryId] = [newQuestion];
    localStorage.setItem('quizy_custom_questions', JSON.stringify(customQuestionsMap));

    // Close Modal and Refresh Grid
    toggleCreatorModal(false);
    dom.quizCreatorForm.reset();
    renderCategoryGrid();
    window.soundEngine.playVictory();

    // Launch newly created quiz!
    setTimeout(() => {
      startQuiz(categoryId);
    }, 300);
  }

  // =========================================================================
  // EVENT LISTENERS BINDING
  // =========================================================================
  function setupEventListeners() {
    // Theme & Audio
    dom.btnThemeToggle.addEventListener('click', toggleTheme);
    dom.btnSoundToggle.addEventListener('click', toggleSound);

    // Nav Brand Home click
    dom.navBrandHome.addEventListener('click', (e) => {
      e.preventDefault();
      clearInterval(state.timerId);
      dom.quizScreen.style.display = 'none';
      dom.resultsScreen.style.display = 'none';
      dom.homeScreen.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Slider Prev/Next
    dom.sliderBtnPrev.addEventListener('click', () => {
      prevSlide();
      startSliderTimer();
    });
    dom.sliderBtnNext.addEventListener('click', () => {
      nextSlide();
      startSliderTimer();
    });

    // Pause slider on hover
    dom.heroSlider.addEventListener('mouseenter', stopSliderTimer);
    dom.heroSlider.addEventListener('mouseleave', startSliderTimer);

    // Difficulty pill buttons
    dom.difficultySelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-option');
      if (!btn) return;
      dom.difficultySelector.querySelectorAll('.pill-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.mode = btn.dataset.difficulty;
      window.soundEngine.playClick();
    });

    // Search filter
    dom.categorySearchInput.addEventListener('input', (e) => {
      renderCategoryGrid(e.target.value);
    });

    // Quit quiz
    dom.btnQuitQuiz.addEventListener('click', () => {
      if (confirm('Are you sure you want to abandon this quiz? Your current progress will be lost.')) {
        clearInterval(state.timerId);
        dom.quizScreen.style.display = 'none';
        dom.homeScreen.style.display = 'block';
        window.soundEngine.playClick();
      }
    });

    // Next Question Button
    dom.btnNextQuestion.addEventListener('click', nextQuestion);

    // Lifelines
    dom.btnLifeline5050.addEventListener('click', use5050);
    dom.btnLifelineHint.addEventListener('click', useHint);
    dom.btnLifelineFreeze.addEventListener('click', useFreeze);

    // Results Actions
    dom.btnRetakeQuiz.addEventListener('click', () => {
      if (state.currentCategory) {
        startQuiz(state.currentCategory.id);
      }
    });

    dom.btnBackHome.addEventListener('click', () => {
      dom.resultsScreen.style.display = 'none';
      dom.homeScreen.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.soundEngine.playClick();
    });

    dom.btnDownloadCert.addEventListener('click', generateCertificate);

    // Review Carousel Prev/Next
    dom.btnReviewPrev.addEventListener('click', () => {
      renderReviewCard(state.reviewIndex - 1);
    });
    dom.btnReviewNext.addEventListener('click', () => {
      renderReviewCard(state.reviewIndex + 1);
    });

    // Leaderboard Drawer
    dom.btnOpenLeaderboard.addEventListener('click', () => toggleLeaderboard(true));
    dom.btnCloseLeaderboard.addEventListener('click', () => toggleLeaderboard(false));
    dom.leaderboardBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.leaderboardBackdrop) toggleLeaderboard(false);
    });
    if (dom.footerLeaderboardLink) {
      dom.footerLeaderboardLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLeaderboard(true);
      });
    }

    // Custom Quiz Creator Modal
    dom.btnOpenCreator.addEventListener('click', () => toggleCreatorModal(true));
    dom.btnCloseCreator.addEventListener('click', () => toggleCreatorModal(false));
    dom.btnCancelCreator.addEventListener('click', () => toggleCreatorModal(false));
    dom.quizCreatorForm.addEventListener('submit', handleCreateQuizSubmit);
    if (dom.footerNewQuizLink) {
      dom.footerNewQuizLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCreatorModal(true);
      });
    }
  }

  // Run on DOM load
  document.addEventListener('DOMContentLoaded', init);
})();
