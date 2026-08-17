/**
 * Web Audio API Synthesizer for Romantic Melodies & Ambient Soundscapes
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentMelodyTimer: number | null = null;
  private activeNotes: OscillatorNode[] = [];
  private audioElement: HTMLAudioElement | null = null;
  private syntheticStartTime: number = 0;
  
  // Ambient nodes
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;
  private fireNode: AudioNode | null = null;
  private fireGain: GainNode | null = null;
  private waveGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft piano note
  public playPianoNote(freq: number, duration: number = 2.5, type: OscillatorType = 'sine') {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.08); // attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // decay

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);

      this.activeNotes.push(osc);
      setTimeout(() => {
        const index = this.activeNotes.indexOf(osc);
        if (index > -1) this.activeNotes.splice(index, 1);
      }, duration * 1000);
    } catch {
      // Audio fallback
    }
  }

  // Play sound effect: Heartbeat
  public playHeartbeat() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    [0, 0.25].forEach((delay) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, now + delay);
      osc.frequency.exponentialRampToValueAtTime(30, now + delay + 0.15);

      gain.gain.setValueAtTime(0.3, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.2);
    });
  }

  // Play sound effect: Wax Seal Pop / Unfold
  public playEnvelopeOpen() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Chime sweep
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 1.2);
    });
  }

  // Play sound effect: Celestial Stardust Chime
  public playStardustChime() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const chimeNotes = [783.99, 880.00, 1046.50, 1318.51, 1567.98];
    chimeNotes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.4);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 1.4);
    });
  }

  // Play proposal acceptance chime explosion
  public playCelebrationChime() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const scale = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    scale.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 2.5);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 2.5);
    });
  }

  public getCurrentTime(): number {
    if (this.audioElement && this.isPlaying) {
      return this.audioElement.currentTime;
    }
    if (this.isPlaying && this.ctx) {
      return this.ctx.currentTime - this.syntheticStartTime;
    }
    return 0;
  }

  // Play romantic song sequence based on key
  public startSongMelody(songKey: string, audioUrl?: string, onNoteTick?: (currentTime: number) => void) {
    this.stopMelody();
    this.initCtx();
    this.isPlaying = true;
    this.syntheticStartTime = this.ctx ? this.ctx.currentTime : 0;

    if (audioUrl) {
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.crossOrigin = "anonymous";
        this.audioElement.loop = true;
      }
      this.audioElement.src = audioUrl;
      this.audioElement.play().catch(e => console.error("Audio playback error:", e));
      return;
    }

    // Frequencies for C major / A minor romantic chords
    const melodies: Record<string, number[][]> = {
      stardust: [
        [261.63, 329.63, 392.00, 523.25], // C maj
        [220.00, 261.63, 329.63, 440.00], // A min
        [174.61, 220.00, 261.63, 349.23], // F maj
        [196.00, 246.94, 293.66, 392.00], // G maj
      ],
      moonlight: [
        [329.63, 392.00, 493.88, 659.25], // E min
        [261.63, 329.63, 392.00, 523.25], // C maj
        [220.00, 261.63, 329.63, 440.00], // A min
        [246.94, 329.63, 392.00, 493.88], // B7
      ],
      ghibli: [
        [261.63, 392.00, 523.25, 659.25],
        [220.00, 329.63, 440.00, 523.25],
        [174.61, 261.63, 349.23, 523.25],
        [196.00, 293.66, 392.00, 587.33],
      ]
    };

    const chordList = melodies[songKey] || melodies.stardust;
    let step = 0;
    let secondsElapsed = 0;

    const playStep = () => {
      if (!this.isPlaying) return;

      const chord = chordList[step % chordList.length];
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          if (this.isPlaying) {
            this.playPianoNote(freq, 3.2, idx % 2 === 0 ? 'sine' : 'triangle');
          }
        }, idx * 160);
      });

      secondsElapsed += 2;
      if (onNoteTick) onNoteTick(secondsElapsed);

      step++;
      this.currentMelodyTimer = window.setTimeout(playStep, 2000);
    };

    playStep();
  }

  public stopMelody() {
    this.isPlaying = false;
    if (this.currentMelodyTimer !== null) {
      clearTimeout(this.currentMelodyTimer);
      this.currentMelodyTimer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }

  // Toggle ambient Rain sound
  public toggleRain(enable: boolean) {
    this.initCtx();
    if (!this.ctx) return;

    if (!enable) {
      if (this.rainGain) {
        this.rainGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.rainNode?.disconnect();
          this.rainNode = null;
        }, 1000);
      }
      return;
    }

    if (this.rainNode) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.rainGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 1.5);

    whiteNoise.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.ctx.destination);

    whiteNoise.start();
    this.rainNode = whiteNoise;
  }

  // Toggle ambient Campfire crackle
  public toggleCampfire(enable: boolean) {
    this.initCtx();
    if (!this.ctx) return;

    if (!enable) {
      if (this.fireGain) {
        this.fireGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      }
      return;
    }

    const fireInterval = setInterval(() => {
      if (!this.ctx) return;
      if (Math.random() > 0.4) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100 + Math.random() * 300, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.02 + Math.random() * 0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
      }
    }, 120);

    // Save timer reference in fireNode
    this.fireNode = { disconnect: () => clearInterval(fireInterval) } as unknown as AudioNode;
  }
}

export const romanticAudio = new RomanticAudioEngine();
