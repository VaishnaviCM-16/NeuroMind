import React, { useEffect, useRef, useState } from 'react';
import { Activity, Sliders, Zap, Eye, Cpu, RefreshCw, BarChart2, ShieldAlert, CheckCircle2, Info, BookOpen, ChevronDown, ChevronUp, Home } from 'lucide-react';

interface BciSim3DProps {
  onNavigateToTab?: (tab: string) => void;
}

export const BciSim3D: React.FC<BciSim3DProps> = ({ onNavigateToTab }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Frequency Band Controls
  const [alphaPower, setAlphaPower] = useState<number>(15);
  const [betaPower, setBetaPower] = useState<number>(25);
  const [gammaPower, setGammaPower] = useState<number>(5);

  // Artifact Noise Toggles
  const [enableEogBlink, setEnableEogBlink] = useState<boolean>(false);
  const [enableEmgMuscle, setEnableEmgMuscle] = useState<boolean>(false);
  const [enablePowerline60Hz, setEnablePowerline60Hz] = useState<boolean>(false);

  // DSP Filter Toggles
  const [enableBandpassFilter, setEnableBandpassFilter] = useState<boolean>(true);
  const [enableCspFilter, setEnableCspFilter] = useState<boolean>(true);

  // BCI Paradigm Selection
  const [bciTask, setBciTask] = useState<'rest' | 'left-hand' | 'right-hand' | 'p300' | 'ssvep'>('rest');
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  // Classification Result State
  const [classifiedIntent, setClassifiedIntent] = useState<{ intent: string; confidence: number }>({
    intent: 'Resting State',
    confidence: 88,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    // Buffer arrays for C3, C4, Oz channels
    const numPoints = 300;
    const c3Data = new Array(numPoints).fill(0);
    const c4Data = new Array(numPoints).fill(0);
    const ozData = new Array(numPoints).fill(0);

    const render = () => {
      t += 0.05;

      // Generate base multi-frequency synth signal for C3 and C4
      let c3Val =
        Math.sin(t * 1.5 * 10) * (alphaPower / 2) +
        Math.sin(t * 1.5 * 20) * (betaPower / 2) +
        Math.sin(t * 1.5 * 40) * (gammaPower / 2);

      let c4Val =
        Math.sin(t * 1.5 * 10.2) * (alphaPower / 2) +
        Math.sin(t * 1.5 * 19.8) * (betaPower / 2) +
        Math.sin(t * 1.5 * 40.5) * (gammaPower / 2);

      let ozVal = Math.sin(t * 1.5 * 10) * (alphaPower * 0.8);

      // Paradigm specific dynamics
      if (bciTask === 'left-hand') {
        // Motor Imagery Left Hand -> Right motor strip C4 suppresses (ERD), C3 stays normal
        c4Val *= 0.25;
        c3Val *= 1.4;
      } else if (bciTask === 'right-hand') {
        // Motor Imagery Right Hand -> Left motor strip C3 suppresses (ERD), C4 stays normal
        c3Val *= 0.25;
        c4Val *= 1.4;
      } else if (bciTask === 'ssvep') {
        // SSVEP 12Hz visual resonance over Oz
        ozVal += Math.sin(t * 1.5 * 12) * 35;
      } else if (bciTask === 'p300') {
        // P300 positive peak spike every ~2 seconds
        if (Math.sin(t * 0.8) > 0.92) {
          c3Val += 45;
          c4Val += 45;
        }
      }

      // Inject Noise Artifacts
      if (enablePowerline60Hz) {
        const lineNoise = Math.sin(t * 60) * 15;
        c3Val += lineNoise;
        c4Val += lineNoise;
        ozVal += lineNoise;
      }

      if (enableEmgMuscle) {
        const muscleNoise = (Math.random() - 0.5) * 30;
        c3Val += muscleNoise;
        c4Val += muscleNoise;
      }

      if (enableEogBlink) {
        if (Math.floor(t * 2) % 4 === 0) {
          const blinkPeak = Math.sin((t % 1.5) * Math.PI) * 50;
          c3Val += blinkPeak;
          c4Val += blinkPeak;
        }
      }

      // DSP Bandpass Filtering (attenuates high EMG noise & 60Hz powerline if enabled)
      if (enableBandpassFilter) {
        if (enablePowerline60Hz || enableEmgMuscle) {
          c3Val *= 0.6;
          c4Val *= 0.6;
          ozVal *= 0.6;
        }
      }

      // Shift buffers
      c3Data.push(c3Val);
      c3Data.shift();

      c4Data.push(c4Val);
      c4Data.shift();

      ozData.push(ozVal);
      ozData.shift();

      // Clear Canvas
      ctx.fillStyle = '#020617'; // Slate 950
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid lines
      ctx.strokeStyle = '#1e293b'; // Slate 800
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Helper to draw channel waveform
      const drawChannel = (data: number[], color: string, yOffset: number, label: string) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        const sliceWidth = canvas.width / (numPoints - 1);
        for (let i = 0; i < data.length; i++) {
          const x = i * sliceWidth;
          const y = yOffset - data[i] * 0.8;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw Channel Label
        ctx.fillStyle = color;
        ctx.font = 'bold 12px monospace';
        ctx.fillText(label, 15, yOffset - 25);
      };

      // Draw 3 channels
      drawChannel(c3Data, '#06b6d4', 90, 'Channel 1: C3 (Left Motor Strip)');
      drawChannel(c4Data, '#a855f7', 210, 'Channel 2: C4 (Right Motor Strip)');
      drawChannel(ozData, '#10b981', 330, 'Channel 3: Oz (Occipital Visual Cortex)');

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [
    alphaPower,
    betaPower,
    gammaPower,
    enableEogBlink,
    enableEmgMuscle,
    enablePowerline60Hz,
    enableBandpassFilter,
    bciTask,
  ]);

  // Update AI Classifier Output when paradigm changes
  useEffect(() => {
    switch (bciTask) {
      case 'left-hand':
        setClassifiedIntent({ intent: 'Command: LEFT HAND MOVE', confidence: 96 });
        break;
      case 'right-hand':
        setClassifiedIntent({ intent: 'Command: RIGHT HAND MOVE', confidence: 94 });
        break;
      case 'ssvep':
        setClassifiedIntent({ intent: 'Command: SSVEP TARGET (12 Hz)', confidence: 98 });
        break;
      case 'p300':
        setClassifiedIntent({ intent: 'Command: P300 TARGET SPELLER SELECT', confidence: 91 });
        break;
      default:
        setClassifiedIntent({ intent: 'State: RESTING MU RHYTHM', confidence: 89 });
        break;
    }
  }, [bciTask]);

  const getParadigmExplanation = () => {
    switch (bciTask) {
      case 'left-hand':
        return {
          title: 'Motor Imagery (Left Hand) - Contralateral ERD',
          mechanism: 'When a subject imagines moving their LEFT hand, sensory-motor cortex neurons in the RIGHT hemisphere (C4 electrode) fire synchronously. This causes Event-Related Desynchronization (ERD) — a dramatic drop in 8-12 Hz Mu wave power over C4, while C3 maintains baseline rhythm.',
          cspExplanation: 'Common Spatial Pattern (CSP) spatial filters maximize variance ratio between C3 and C4 channels, projecting raw microvolt traces into distinct 2D feature points for linear classifiers.',
          clinicalApp: 'Allows paralyzed patients or stroke survivors to control robotic prosthetics or wheelchairs without muscle movement.',
        };
      case 'right-hand':
        return {
          title: 'Motor Imagery (Right Hand) - Contralateral ERD',
          mechanism: 'When imagining RIGHT hand movement, neurons over the LEFT motor strip (C3 electrode) desynchronize. C3 power drops significantly while C4 remains high.',
          cspExplanation: 'CSP weights isolate C3 variance attenuation from global EEG noise.',
          clinicalApp: 'Used in neurorehabilitation therapy to restore upper-limb movement pathways.',
        };
      case 'p300':
        return {
          title: 'P300 Event-Related Potential (ERP) Oddball Paradigm',
          mechanism: 'When a user focuses on a desired target key flashing in a grid matrix, the brain generates an involuntary positive deflection (~10-20 microvolts) approximately 300 milliseconds after the target flashes.',
          cspExplanation: 'Averaging 5-10 stimulus trials cancels uncorrelated background EEG, revealing the prominent P300 ERP spike.',
          clinicalApp: 'P300 Spellers allow locked-in ALS patients to type sentences purely with brain activity at 10-15 words per minute.',
        };
      case 'ssvep':
        return {
          title: 'Steady-State Visually Evoked Potential (SSVEP)',
          mechanism: 'Staring at a light source flashing at a fixed frequency (e.g., 12 Hz) forces neurons in the primary visual cortex V1 (Oz electrode) to resonate at the exact same frequency and its harmonics.',
          cspExplanation: 'Canonical Correlation Analysis (CCA) measures cross-correlation between Oz telemetry and reference sine/cosine waves.',
          clinicalApp: 'Provides the highest information transfer rate (ITR > 60 bits/min) for fast menu selection.',
        };
      default:
        return {
          title: 'Resting Sensorimotor Rhythm (SMR) / Mu Rhythm',
          mechanism: 'During idle, relaxed wakefulness with eyes open, motor cortex pyramidal neurons oscillate synchronously at 8-12 Hz (Mu rhythm).',
          cspExplanation: 'Provides the baseline covariance matrix S_rest required to calibrate CSP spatial filters.',
          clinicalApp: 'Establishes individual baseline thresholds before BCI task classification.',
        };
    }
  };

  const exp = getParadigmExplanation();

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab('mind-maps')}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
                  title="Return to Home Dashboard"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>← Back to Home</span>
                </button>
              )}
              <div className="flex items-center space-x-2 text-cyan-400">
                <Activity className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider">Interactive BCI Signal Laboratory & Explanations</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Live Multi-Channel EEG & CSP Signal Simulator</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Simulate live EEG microvolt potentials across motor and occipital electrodes. Test artifact noise injection, Butterworth bandpass filtering, Common Spatial Pattern (CSP) extraction, and real-time neural command classification with deep scientific explanations.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Classifier Intent</div>
              <div className="text-xs font-bold text-emerald-400">{classifiedIntent.intent} ({classifiedIntent.confidence}%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed BCI Science Explanation Accordion Panel */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 shadow-xl space-y-4">
        <div 
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold text-sm">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Scientific Explanation: {exp.title}</span>
          </div>
          <button className="text-slate-400 hover:text-white p-1">
            {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showExplanation && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-400 uppercase font-mono text-[10px]">1. Neurophysiological Mechanism</div>
              <p className="leading-relaxed">{exp.mechanism}</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-indigo-400 uppercase font-mono text-[10px]">2. DSP & CSP Spatial Filtering</div>
              <p className="leading-relaxed">{exp.cspExplanation}</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400 uppercase font-mono text-[10px]">3. Clinical & Real-World Application</div>
              <p className="leading-relaxed">{exp.clinicalApp}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Oscilloscope Canvas View */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-mono text-slate-200">Sampling Rate: 250 Hz | Resolution: 24-bit ADC</span>
            </div>
            <div className="font-mono text-slate-400">Time Window: 1.2s</div>
          </div>

          <canvas ref={canvasRef} width={720} height={380} className="w-full h-[380px] rounded-xl bg-slate-950 border border-slate-800/80" />

          {/* DSP Filter Status Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableBandpassFilter}
                  onChange={(e) => setEnableBandpassFilter(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 font-medium">8-30 Hz Butterworth Bandpass</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableCspFilter}
                  onChange={(e) => setEnableCspFilter(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-indigo-500 focus:ring-0"
                />
                <span className="text-slate-300 font-medium">CSP Spatial Filter Matrix</span>
              </label>
            </div>

            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
              SNR: +18.4 dB
            </span>
          </div>
        </div>

        {/* BCI Controls & Paradigm Selector */}
        <div className="lg:col-span-4 space-y-4">
          {/* Paradigm Selection Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Select BCI Experimental Paradigm</span>
            </h3>

            <div className="space-y-2">
              {[
                { id: 'rest', label: 'Resting Baseline (Mu Rhythm)', desc: '8-12 Hz rhythm across motor cortex' },
                { id: 'left-hand', label: 'Motor Imagery: Left Hand', desc: 'ERD suppression on right motor strip C4' },
                { id: 'right-hand', label: 'Motor Imagery: Right Hand', desc: 'ERD suppression on left motor strip C3' },
                { id: 'p300', label: 'P300 Oddball Target', desc: 'Positive wave peak at 300ms post-stimulus' },
                { id: 'ssvep', label: 'SSVEP 12Hz Visual Flicker', desc: 'Occipital visual cortex frequency resonance' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setBciTask(p.id as any)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    bciTask === p.id
                      ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 border-cyan-500 text-slate-100 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{p.label}</div>
                  <div className="text-[11px] text-slate-400">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Artifact Noise Generator */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Inject Biological & Environmental Noise</span>
            </h3>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300">EOG Eye Blink Artifact (300 uV)</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableEogBlink}
                  onChange={(e) => setEnableEogBlink(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">EMG Jaw Muscle Clench Noise</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableEmgMuscle}
                  onChange={(e) => setEnableEmgMuscle(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-purple-500"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-rose-400" />
                  <span className="text-slate-300">60Hz Powerline Interference</span>
                </div>
                <input
                  type="checkbox"
                  checked={enablePowerline60Hz}
                  onChange={(e) => setEnablePowerline60Hz(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-rose-500"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
