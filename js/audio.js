/**
 * Quizy Audio Synthesizer Engine
 * Uses the Web Audio API to create zero-dependency sound effects, chimes,
 * timer clicks, fanfares, and buzzers.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem('quizy_muted') === 'true';
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('quizy_muted', this.isMuted);
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    setTimeout(() => {
      try {
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gainNode.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      } catch (e) {
        console.warn('Audio playback error', e);
      }
    }, delay * 1000);
  }

  playClick() {
    this.playTone(800, 'triangle', 0.05, 0.04);
  }

  playSlide() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.audioCtx.currentTime + 0.12);

      gainNode.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.12);
    } catch (e) {}
  }

  playCorrect() {
    // Joyful ascending arpeggio: C5 (523), E5 (659), G5 (784), C6 (1046)
    this.playTone(523.25, 'sine', 0.18, 0.08, 0);
    this.playTone(659.25, 'sine', 0.18, 0.08, 0.07);
    this.playTone(783.99, 'sine', 0.22, 0.09, 0.14);
    this.playTone(1046.50, 'triangle', 0.4, 0.11, 0.21);
  }

  playWrong() {
    // Discordant descending buzz
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(160, this.audioCtx.currentTime);
      osc1.frequency.linearRampToValueAtTime(110, this.audioCtx.currentTime + 0.35);

      osc2.frequency.setValueAtTime(168, this.audioCtx.currentTime); // Dissonant beat
      osc2.frequency.linearRampToValueAtTime(118, this.audioCtx.currentTime + 0.35);

      gainNode.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.35);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.audioCtx.currentTime + 0.35);
      osc2.stop(this.audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  playTick() {
    this.playTone(1200, 'triangle', 0.03, 0.02);
  }

  playUrgentTick() {
    this.playTone(1600, 'sawtooth', 0.05, 0.05);
  }

  playLifeline() {
    this.playTone(440, 'sine', 0.1, 0.06, 0);
    this.playTone(880, 'sine', 0.2, 0.08, 0.08);
    this.playTone(1320, 'triangle', 0.3, 0.07, 0.16);
  }

  playStreak() {
    // Multiplier fanfare
    const freqs = [440, 554.37, 659.25, 880, 1108.73];
    freqs.forEach((f, i) => {
      this.playTone(f, 'triangle', 0.25, 0.07, i * 0.06);
    });
  }

  playVictory() {
    // Grand celebration fanfare chord progression
    const notes = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 659.25, d: 0.15, t: 0.12 },
      { f: 783.99, d: 0.15, t: 0.24 },
      { f: 1046.50, d: 0.5, t: 0.36 },
      { f: 880, d: 0.2, t: 0.5 },
      { f: 1046.5, d: 0.6, t: 0.65 }
    ];
    notes.forEach(n => this.playTone(n.f, 'sine', n.d, 0.1, n.t));
  }
}

window.soundEngine = new SoundEngine();
