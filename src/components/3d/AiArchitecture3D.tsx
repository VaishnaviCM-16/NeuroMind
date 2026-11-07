import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Sparkles, 
  Sliders, 
  RefreshCcw, 
  Activity, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  Brain, 
  Zap, 
  Network, 
  SlidersHorizontal,
  FileCode2,
  Lightbulb,
  Radio,
  Home
} from 'lucide-react';

interface AiArchitecture3DProps {
  onNavigateToTab?: (tab: string) => void;
}

export const AiArchitecture3D: React.FC<AiArchitecture3DProps> = ({ onNavigateToTab }) => {
  const [activeTab, setActiveTab] = useState<'cnn' | 'gan' | 'vit' | 'bci'>('cnn');

  // CNN Interactive Controls
  const [inputSize, setInputSize] = useState<number>(64); // 64 time samples
  const [kernelSize, setKernelSize] = useState<number>(8); // 8-length kernel
  const [stride, setStride] = useState<number>(1);
  const [padding, setPadding] = useState<number>(0);

  // Calculate Conv output dimension formula
  const convOutputSize = Math.floor((inputSize - kernelSize + 2 * padding) / stride) + 1;

  // GAN Latent Interpolation state
  const [latentZ, setLatentZ] = useState<number>(50);

  // ViT Attention Patch index
  const [selectedPatch, setSelectedPatch] = useState<number>(2);

  // BCI Pipeline Stage
  const [bciStage, setBciStage] = useState<number>(1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border border-indigo-500/30 p-6 shadow-2xl text-slate-100 light:text-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
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
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/80 light:bg-indigo-100 border border-indigo-500/40 text-indigo-300 light:text-indigo-900 text-xs font-mono font-bold">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Scratch-to-Advanced Deep Learning & Neuro-AI Architecture</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 light:text-slate-900 font-serif">
              CNN, GAN, ViT & BCI Pipeline Deep Dive
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 max-w-2xl font-sans">
              Learn how Convolutional Neural Networks, Generative Adversarial Networks, Vision Transformers, and Brain-Computer Interface pipelines operate from fundamental mathematics to production neurotech.
            </p>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex flex-wrap p-1.5 bg-[#050507] light:bg-slate-200 rounded-2xl border border-white/10 light:border-slate-300 shrink-0 gap-1">
            <button
              onClick={() => setActiveTab('cnn')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'cnn' 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50' 
                  : 'text-slate-400 light:text-slate-700 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. CNN & EEGNet</span>
            </button>
            <button
              onClick={() => setActiveTab('gan')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'gan' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50' 
                  : 'text-slate-400 light:text-slate-700 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>2. GAN EEG Synth</span>
            </button>
            <button
              onClick={() => setActiveTab('vit')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'vit' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50' 
                  : 'text-slate-400 light:text-slate-700 hover:text-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>3. Vision Transformer</span>
            </button>
            <button
              onClick={() => setActiveTab('bci')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'bci' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50' 
                  : 'text-slate-400 light:text-slate-700 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>4. BCI Pipeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: CNN & EEGNET ================= */}
      {activeTab === 'cnn' && (
        <div className="space-y-6">
          {/* Section 1: Scratch Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-300 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                <span>What is a CNN? (From Absolute Scratch)</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 font-serif">
                Convolutional Neural Networks (CNN) Explained
              </h2>
              <div className="text-xs text-slate-300 light:text-slate-700 leading-relaxed space-y-2 font-sans">
                <p>
                  A <strong>Convolutional Neural Network (CNN)</strong> is a deep learning architecture designed to process grid-like matrix data (such as 2D images or multi-channel time-series signals like 64-channel EEG recordings).
                </p>
                <p>
                  Unlike standard dense feedforward networks where every input neuron connects to every output, CNNs pass a small sliding window matrix called a <strong>Kernel (or Filter)</strong> across the input to compute dot products.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#050507] light:bg-white border border-cyan-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 light:text-cyan-800">4 Core Building Blocks of CNNs:</span>
                <ul className="text-xs text-slate-300 light:text-slate-700 space-y-1.5 list-disc pl-4 font-mono">
                  <li><strong>1. Convolution Layer:</strong> Slides kernels to extract features (edges, oscillations, frequency bands).</li>
                  <li><strong>2. ReLU Activation:</strong> Introduces non-linearity ($f(x) = \max(0, x)$).</li>
                  <li><strong>3. Pooling Layer:</strong> Downsamples dimensions (Max Pooling or Average Pooling) to reduce compute.</li>
                  <li><strong>4. Dense / Softmax Output:</strong> Classifies extracted feature maps into final intent classes.</li>
                </ul>
              </div>
            </div>

            {/* Interactive Conv Math Calculator */}
            <div className="bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-300 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>Interactive Convolution Math Calculator</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 font-serif">
                Convolution Matrix Output Calculator
              </h2>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 light:text-slate-700">
                    <span>Input Dimension (W):</span>
                    <span className="text-cyan-400 font-bold">{inputSize} time samples</span>
                  </div>
                  <input
                    type="range" min={32} max={256} step={16}
                    value={inputSize} onChange={(e) => setInputSize(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 light:text-slate-700">
                    <span>Kernel / Filter Length (F):</span>
                    <span className="text-cyan-400 font-bold">{kernelSize} samples</span>
                  </div>
                  <input
                    type="range" min={2} max={32} step={2}
                    value={kernelSize} onChange={(e) => setKernelSize(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-300 light:text-slate-700">Stride (S):</span>
                    <select
                      value={stride} onChange={(e) => setStride(Number(e.target.value))}
                      className="w-full bg-[#050507] light:bg-white border border-white/10 light:border-slate-300 rounded-lg p-2 text-xs text-slate-200 light:text-slate-900 mt-1"
                    >
                      <option value={1}>1 (Smooth sliding)</option>
                      <option value={2}>2 (Downsample by 2)</option>
                      <option value={4}>4 (Downsample by 4)</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-slate-300 light:text-slate-700">Padding (P):</span>
                    <select
                      value={padding} onChange={(e) => setPadding(Number(e.target.value))}
                      className="w-full bg-[#050507] light:bg-white border border-white/10 light:border-slate-300 rounded-lg p-2 text-xs text-slate-200 light:text-slate-900 mt-1"
                    >
                      <option value={0}>0 (Valid Padding)</option>
                      <option value={1}>1 (Same Padding)</option>
                      <option value={2}>2 (Extra Padding)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Formula & Result Display */}
              <div className="p-4 rounded-xl bg-cyan-950/50 light:bg-cyan-100 border border-cyan-500/40 text-center space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 light:text-cyan-800 font-bold">
                  Output Dimension Formula: Output = ⌊(W - F + 2P) / S⌋ + 1
                </div>
                <div className="text-2xl font-black text-cyan-300 light:text-cyan-900 font-mono">
                  Output Feature Map Length = {convOutputSize}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: EEGNet Architecture for BCI */}
          <div className="bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-300 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-white/10 light:border-slate-300 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100 light:text-slate-900 font-serif">
                  EEGNet: Advanced Compact Convolutional Architecture for BCI
                </h3>
                <p className="text-xs text-slate-400 light:text-slate-600 font-mono">
                  Specifically engineered for brain signals with only ~2,400 trainable parameters
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 light:bg-cyan-100 text-cyan-300 light:text-cyan-900 text-xs font-mono font-bold border border-cyan-500/30">
                State of the Art in BCI Decoding
              </span>
            </div>

            {/* Pipeline Stage Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#050507] light:bg-white border border-cyan-500/30 space-y-2">
                <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Stage 1: Input</div>
                <div className="text-xs font-bold text-slate-200 light:text-slate-800">EEG Time Series Matrix</div>
                <p className="text-[11px] text-slate-400 light:text-slate-600">
                  Matrix of shape (C x T) where C = 64 scalp channels, T = 250 Hz time samples.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#050507] light:bg-white border border-indigo-500/30 space-y-2">
                <div className="text-[10px] font-mono font-bold text-indigo-400 uppercase">Stage 2: Conv2D Temporal</div>
                <div className="text-xs font-bold text-slate-200 light:text-slate-800">Bandpass Frequency Filters</div>
                <p className="text-[11px] text-slate-400 light:text-slate-600">
                  Filters along the time dimension to isolate Mu (8-12Hz) and Beta (18-26Hz) rhythms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#050507] light:bg-white border border-purple-500/30 space-y-2">
                <div className="text-[10px] font-mono font-bold text-purple-400 uppercase">Stage 3: Depthwise Conv</div>
                <div className="text-xs font-bold text-slate-200 light:text-slate-800">Spatial Electrode Weighting</div>
                <p className="text-[11px] text-slate-400 light:text-slate-600">
                  Learns spatial filters combining channels (e.g., C3 vs C4 motor cortex contrast).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#050507] light:bg-white border border-emerald-500/30 space-y-2">
                <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Stage 4: Separable Conv</div>
                <div className="text-xs font-bold text-slate-200 light:text-slate-800">Feature Aggregation</div>
                <p className="text-[11px] text-slate-400 light:text-slate-600">
                  Aggregates feature maps with Batch Normalization & Dropout to output intent probabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: GAN EEG SYNTHESIS ================= */}
      {activeTab === 'gan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scratch Explanation */}
            <div className="bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-300 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 font-bold uppercase">
                <Lightbulb className="w-4 h-4 text-indigo-400" />
                <span>What is a GAN? (From Absolute Scratch)</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 font-serif">
                Generative Adversarial Networks (GAN) Explained
              </h2>
              <div className="text-xs text-slate-300 light:text-slate-700 leading-relaxed space-y-2 font-sans">
                <p>
                  A <strong>Generative Adversarial Network (GAN)</strong> consists of two competing deep neural networks trained simultaneously in a Zero-Sum Minimax Game:
                </p>
                <ul className="list-disc pl-4 space-y-1 font-mono text-xs">
                  <li><strong>Generator ($G$):</strong> Takes a random noise vector $z$ and tries to forge realistic synthetic data (e.g., fake EEG trials).</li>
                  <li><strong>Discriminator ($D$):</strong> A detective network that classifies whether an input is real clinical EEG or fake generated EEG.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 light:bg-indigo-50 border border-indigo-500/30 text-xs font-mono text-indigo-300 light:text-indigo-900 space-y-1">
                <span className="font-bold">Minimax Loss Equation:</span>
                <p className="text-[11px] font-mono font-semibold">
                  min_G max_D V(D, G) = E_x[log D(x)] + E_z[log(1 - D(G(z)))]
                </p>
              </div>
            </div>

            {/* Interactive Latent Space Generator */}
            <div className="bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-300 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 font-bold uppercase">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Interactive Latent Vector $z$ Interpolator</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 font-serif">
                WGAN-GP Synthetic EEG Waveform Generator
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 light:text-slate-700">Latent Vector Noise Parameter $z$:</span>
                  <span className="text-indigo-400 font-bold">{latentZ}%</span>
                </div>
                <input
                  type="range" min={0} max={100} value={latentZ}
                  onChange={(e) => setLatentZ(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Simulated Synthetic Waveform */}
              <div className="p-4 rounded-xl bg-[#050507] light:bg-white border border-indigo-500/30 space-y-3 text-center">
                <div className="text-xs font-mono text-slate-300 light:text-slate-800 font-bold">
                  Generated Synthetic Trial (Motor Imagery: {latentZ < 33 ? 'Left Hand' : latentZ < 66 ? 'Right Hand' : 'Both Feet'})
                </div>

                <div className="h-28 bg-slate-950 rounded-lg p-2 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 400 100" className="w-full h-full">
                    <path
                      d={`M 0 50 ${Array.from({ length: 40 }).map((_, i) => {
                        const x = i * 10;
                        const freq = 0.05 + (latentZ / 1000);
                        const amp = 20 + Math.sin(i * freq) * 15;
                        const y = 50 + Math.sin(i * 0.4 + latentZ) * amp;
                        return `L ${x} ${y}`;
                      }).join(' ')}`}
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                <div className="text-[11px] font-mono text-indigo-400 light:text-indigo-800">
                  Frequency Peak: {(8 + (latentZ % 12)).toFixed(1)} Hz (Mu Band) | Discriminator Authenticity Score: 98.4% REAL
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: VISION TRANSFORMERS (ViT) ================= */}
      {activeTab === 'vit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scratch Explanation */}
            <div className="bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-300 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 font-bold uppercase">
                <Lightbulb className="w-4 h-4 text-purple-400" />
                <span>What is a Vision Transformer (ViT)? (From Scratch)</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 font-serif">
                Transformers & Multi-Head Self-Attention
              </h2>
              <div className="text-xs text-slate-300 light:text-slate-700 leading-relaxed space-y-2 font-sans">
                <p>
                  A <strong>Vision Transformer (ViT)</strong> adapts the revolutionary self-attention mechanism from language processing (LLMs) to 2D image grids or spatial EEG electrode topographies.
                </p>
                <p>
                  Instead of local convolutional kernels, ViT splits the input image or multi-channel EEG matrix into non-overlapping <strong>Patches (Tokens)</strong>, projects them into linear vector embeddings, adds 1D Positional Encodings, and processes them through Multi-Head Self-Attention layers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/40 light:bg-purple-50 border border-purple-500/30 text-xs font-mono text-purple-300 light:text-purple-900 space-y-1">
                <span className="font-bold">Scaled Dot-Product Attention Equation:</span>
                <p className="text-[11px] font-mono font-semibold">
                  Attention(Q, K, V) = softmax( (Q * K^T) / √(d_k) ) * V
                </p>
              </div>
            </div>

            {/* Interactive Patch Selector */}
            <div className="bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-300 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 font-bold uppercase">
                <Network className="w-4 h-4 text-purple-400" />
                <span>Interactive Brain Patch Attention Matrix</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 font-serif">
                Select Cortical Token Patch
              </h2>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: 0, title: 'Patch 1: Prefrontal (Fp1/Fp2)', target: 'Occipital V1 (0.88)' },
                  { id: 1, title: 'Patch 2: Premotor (Fz/F3/F4)', target: 'M1 Motor Cortex (0.94)' },
                  { id: 2, title: 'Patch 3: Sensorimotor (C3/Cz/C4)', target: 'Somatosensory S1 (0.96)' },
                  { id: 3, title: 'Patch 4: Occipital (O1/Oz/O2)', target: 'Parietal Hub (0.82)' },
                ].map((patch) => (
                  <button
                    key={patch.id}
                    onClick={() => setSelectedPatch(patch.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedPatch === patch.id
                        ? 'bg-purple-950 light:bg-purple-100 border-purple-500 text-purple-200 light:text-purple-900 font-bold shadow-md'
                        : 'bg-[#050507] light:bg-white border-white/10 light:border-slate-300 text-slate-400 light:text-slate-700'
                    }`}
                  >
                    <div>{patch.title}</div>
                    <div className="text-[10px] text-purple-400 mt-1">Highest Weight: {patch.target}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: END-TO-END BCI PIPELINE ================= */}
      {activeTab === 'bci' && (
        <div className="bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-300 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 light:border-slate-300 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 font-serif">
                End-to-End Brain-Computer Interface (BCI) Pipeline
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-600 font-mono">
                From microvolt scalp potential acquisition to real-time robotic limb control
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950 light:bg-emerald-100 text-emerald-300 light:text-emerald-900 text-xs font-mono font-bold border border-emerald-500/30">
              Closed-Loop Control
            </span>
          </div>

          {/* Interactive BCI Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { num: 1, title: '1. Signal Acquisition', detail: 'Scalp electrodes + Differential Amplifier' },
              { num: 2, title: '2. Preprocessing & DSP', detail: '50Hz Notch filter + Bandpass (0.5-40Hz)' },
              { num: 3, title: '3. Feature Extraction', detail: 'Common Spatial Patterns (CSP) & PSD' },
              { num: 4, title: '4. ML Classification', detail: 'EEGNet / SNN / SVM Intent Decoder' },
              { num: 5, title: '5. Device Actuation', detail: 'Prosthetic hand / Wheelchair command' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setBciStage(s.num)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  bciStage === s.num
                    ? 'bg-emerald-950 light:bg-emerald-100 border-emerald-500 text-emerald-200 light:text-emerald-900 font-bold shadow-lg'
                    : 'bg-[#050507] light:bg-white border-white/10 light:border-slate-300 text-slate-400 light:text-slate-700'
                }`}
              >
                <div className="text-xs font-mono font-bold">{s.title}</div>
                <div className="text-[10px] text-slate-400 light:text-slate-600 mt-1">{s.detail}</div>
              </button>
            ))}
          </div>

          {/* Detailed Stage Description */}
          <div className="p-5 rounded-xl bg-[#050507] light:bg-white border border-emerald-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400 light:text-emerald-800">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Stage {bciStage} In-Depth Engineering Details</span>
            </div>
            <p className="text-xs text-slate-300 light:text-slate-800 leading-relaxed font-sans">
              {bciStage === 1 && 'Scalp electrodes detect μV potential differences generated by synchronized pyramidal post-synaptic dendritic currents. High CMRR amplifiers reject common-mode line noise.'}
              {bciStage === 2 && 'Applies digital infinite impulse response (IIR) notch filters to erase 50/60 Hz mains interference, followed by a 4th-order Butterworth bandpass filter isolating brain waves.'}
              {bciStage === 3 && 'Common Spatial Patterns (CSP) calculates spatial projection matrices that maximize signal variance between two motor imagery classes (e.g. Left Hand vs Right Hand).'}
              {bciStage === 4 && 'The extracted spatial-spectral features are fed into EEGNet or Spiking Neural Networks to produce softmax intent probabilities with <50ms latency.'}
              {bciStage === 5 && 'High-probability intent outputs trigger CAN-bus motor commands sent to a robotic orthotic hand or wheelchair motor driver, completing the closed loop.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
