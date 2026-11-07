import React from 'react';
import { 
  Activity, 
  Brain, 
  Cpu, 
  Layers, 
  Network, 
  Sparkles, 
  Radio, 
  Zap, 
  CheckCircle2, 
  Lightbulb, 
  Eye, 
  Volume2, 
  ArrowRight,
  Database
} from 'lucide-react';

interface InfographicCardProps {
  nodeId: string;
}

export const InfographicCard: React.FC<InfographicCardProps> = ({ nodeId }) => {
  // Render visual SVG & Step-by-Step Diagram depending on the Concept Node ID

  // 1. Biological Neuron
  if (nodeId === 'node-0-1') {
    return (
      <div className="bg-[#08080a] light:bg-slate-50 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 light:text-cyan-700 font-mono text-xs font-bold uppercase tracking-wider">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span>Infographic Revision Poster: Biological Neuron Architecture</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 light:bg-cyan-100 text-cyan-300 light:text-cyan-800 font-bold border border-cyan-800/40">
            Scratch Level 0
          </span>
        </div>

        {/* Vector Schematic */}
        <div className="w-full bg-[#050507] light:bg-white rounded-xl p-3 border border-slate-800 light:border-slate-200 overflow-x-auto">
          <svg viewBox="0 0 550 200" className="w-full h-auto min-w-[480px]">
            {/* Background Grid */}
            <pattern id="infogrid1" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <rect width="550" height="200" fill="url(#infogrid1)" />

            {/* Dendrites */}
            <path d="M 40 40 Q 70 80 110 100 M 30 100 Q 70 100 110 100 M 40 160 Q 70 120 110 100" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="40" cy="40" r="4" fill="#38bdf8" />
            <circle cx="30" cy="100" r="4" fill="#38bdf8" />
            <circle cx="40" cy="160" r="4" fill="#38bdf8" />
            <text x="15" y="25" fill="#0284c7" fontSize="10" fontFamily="monospace" fontWeight="bold">1. Dendrites (Inputs)</text>

            {/* Soma / Cell Body */}
            <circle cx="125" cy="100" r="28" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="125" cy="100" r="10" fill="#0284c7" />
            <text x="100" y="145" fill="#0284c7" fontSize="10" fontFamily="monospace" fontWeight="bold">2. Soma & Nucleus</text>

            {/* Axon Hillock */}
            <polygon points="150,90 170,95 170,105 150,110" fill="#f59e0b" />
            <text x="140" y="165" fill="#b45309" fontSize="9" fontFamily="monospace">Hillock (-55mV Threshold)</text>

            {/* Axon & Myelin Sheaths */}
            <line x1="170" y1="100" x2="420" y2="100" stroke="#38bdf8" strokeWidth="4" />

            {/* Myelin Blocks */}
            {[180, 240, 300, 360].map((x, i) => (
              <g key={i}>
                <rect x={x} y="86" width="45" height="28" rx="6" fill="#10b981" fillOpacity="0.8" stroke="#047857" strokeWidth="1.5" />
                <text x={x + 6} y="103" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">Myelin</text>
              </g>
            ))}
            <text x="240" y="72" fill="#047857" fontSize="10" fontFamily="monospace" fontWeight="bold">3. Saltatory Conduction (Nodes of Ranvier)</text>

            {/* Axon Terminal & Synapse */}
            <path d="M 420 100 Q 450 80 480 60 M 420 100 Q 460 100 490 100 M 420 100 Q 450 120 480 140" stroke="#a855f7" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="480" cy="60" r="5" fill="#a855f7" />
            <circle cx="490" cy="100" r="5" fill="#a855f7" />
            <circle cx="480" cy="140" r="5" fill="#a855f7" />
            <text x="430" y="170" fill="#6b21a8" fontSize="10" fontFamily="monospace" fontWeight="bold">4. Synaptic Terminals</text>
          </svg>
        </div>

        {/* Key Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#050507] light:bg-white p-3 rounded-xl border border-slate-800 light:border-slate-200 space-y-1">
            <div className="font-bold text-cyan-400 light:text-cyan-700 font-mono">Resting State</div>
            <div className="text-slate-300 light:text-slate-700">-70 mV baseline voltage created by Na+/K+ ATPase pumps (3 Na+ out, 2 K+ in).</div>
          </div>
          <div className="bg-[#050507] light:bg-white p-3 rounded-xl border border-slate-800 light:border-slate-200 space-y-1">
            <div className="font-bold text-amber-400 light:text-amber-700 font-mono">Threshold Spike</div>
            <div className="text-slate-300 light:text-slate-700">-55 mV depolarization breaches threshold, triggering rapid Na+ ion influx.</div>
          </div>
          <div className="bg-[#050507] light:bg-white p-3 rounded-xl border border-slate-800 light:border-slate-200 space-y-1">
            <div className="font-bold text-purple-400 light:text-purple-700 font-mono">Synaptic Gap</div>
            <div className="text-slate-300 light:text-slate-700">20nm synaptic cleft crossed by chemical neurotransmitters (GABA, Glutamate).</div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Action Potential
  if (nodeId === 'node-0-2') {
    return (
      <div className="bg-[#08080a] light:bg-slate-50 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 light:text-cyan-700 font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Infographic Revision Poster: Action Potential Voltage Curve</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 light:bg-amber-100 text-amber-300 light:text-amber-800 font-bold border border-amber-800/40">
            Ionic Flux
          </span>
        </div>

        <div className="w-full bg-[#050507] light:bg-white rounded-xl p-3 border border-slate-800 light:border-slate-200 overflow-x-auto">
          <svg viewBox="0 0 550 200" className="w-full h-auto min-w-[480px]">
            {/* Axis */}
            <line x1="50" y1="20" x2="50" y2="170" stroke="#64748b" strokeWidth="2" />
            <line x1="50" y1="170" x2="520" y2="170" stroke="#64748b" strokeWidth="2" />
            <text x="10" y="30" fill="#0284c7" fontSize="9" fontFamily="monospace">+40mV</text>
            <text x="10" y="110" fill="#b45309" fontSize="9" fontFamily="monospace">-55mV</text>
            <text x="10" y="140" fill="#64748b" fontSize="9" fontFamily="monospace">-70mV</text>

            {/* Threshold & Resting Lines */}
            <line x1="50" y1="110" x2="520" y2="110" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
            <line x1="50" y1="140" x2="520" y2="140" stroke="#64748b" strokeDasharray="2 2" strokeWidth="1" />

            {/* Action Potential Curve */}
            <path d="M 50 140 L 130 140 Q 150 140 165 110 L 220 25 L 270 175 Q 310 155 350 140 L 520 140" stroke="#06b6d4" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Stage Callouts */}
            <circle cx="220" cy="25" r="5" fill="#10b981" />
            <text x="230" y="25" fill="#047857" fontSize="10" fontWeight="bold" fontFamily="monospace">1. Peak Depolarization (+40mV Na+ Influx)</text>

            <circle cx="270" cy="175" r="5" fill="#6b21a8" />
            <text x="280" y="180" fill="#6b21a8" fontSize="10" fontWeight="bold" fontFamily="monospace">2. Hyperpolarization Undershoot (K+ Efflux)</text>

            <rect x="70" y="148" width="80" height="18" rx="4" fill="#bae6fd" />
            <text x="75" y="160" fill="#0284c7" fontSize="9" fontWeight="bold" fontFamily="monospace">Resting State</text>
          </svg>
        </div>
      </div>
    );
  }

  // 10-20 EEG System
  if (nodeId === 'node-1-1' || nodeId === 'node-1-3') {
    return (
      <div className="bg-[#08080a] light:bg-slate-50 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 light:text-cyan-700 font-mono text-xs font-bold uppercase tracking-wider">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Infographic Revision Poster: International 10-20 Scalp Map</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 light:bg-emerald-100 text-emerald-300 light:text-emerald-800 font-bold border border-emerald-800/40">
            BCI Telemetry
          </span>
        </div>

        <div className="w-full bg-[#050507] light:bg-white rounded-xl p-3 border border-slate-800 light:border-slate-200 overflow-x-auto">
          <svg viewBox="0 0 550 190" className="w-full h-auto min-w-[480px]">
            {/* Scalp Ring */}
            <circle cx="160" cy="95" r="75" fill="none" stroke="#64748b" strokeWidth="3" />
            <path d="M 152 20 L 160 5 L 168 20 Z" fill="#0284c7" />
            <text x="145" y="0" fill="#0284c7" fontSize="9" fontFamily="monospace" fontWeight="bold">Nasion (Front)</text>

            {/* Electrodes */}
            {[
              { name: 'Fp1', x: 130, y: 45, col: '#0284c7' },
              { name: 'Fp2', x: 190, y: 45, col: '#0284c7' },
              { name: 'Fz', x: 160, y: 70, col: '#0284c7' },
              { name: 'C3', x: 110, y: 95, col: '#6b21a8' },
              { name: 'Cz', x: 160, y: 95, col: '#6b21a8' },
              { name: 'C4', x: 210, y: 95, col: '#6b21a8' },
              { name: 'Pz', x: 160, y: 125, col: '#b45309' },
              { name: 'O1', x: 130, y: 150, col: '#047857' },
              { name: 'O2', x: 190, y: 150, col: '#047857' },
            ].map((el, idx) => (
              <g key={idx}>
                <circle cx={el.x} cy={el.y} r="11" fill={el.col} />
                <text x={el.x} y={el.y + 3} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">{el.name}</text>
              </g>
            ))}

            {/* Right Side Frequency Band Legend */}
            <g transform="translate(280, 20)">
              <rect x="0" y="0" width="240" height="150" rx="10" fill="#0284c7" fillOpacity="0.05" stroke="#bae6fd" strokeWidth="1" />
              <text x="15" y="25" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="monospace">EEG Frequency Bands:</text>

              <text x="15" y="50" fill="#0284c7" fontSize="10" fontFamily="monospace">• Delta (0.5-4 Hz): Deep sleep</text>
              <text x="15" y="72" fill="#4338ca" fontSize="10" fontFamily="monospace">• Theta (4-8 Hz): Drowsiness / Memory</text>
              <text x="15" y="94" fill="#047857" fontSize="10" fontFamily="monospace">• Alpha/Mu (8-12 Hz): Relaxed / Motor Imagery</text>
              <text x="15" y="116" fill="#b45309" fontSize="10" fontFamily="monospace">• Beta (13-30 Hz): Active thinking / Motor execution</text>
              <text x="15" y="138" fill="#6b21a8" fontSize="10" fontFamily="monospace">• Gamma (&gt;30 Hz): Binding / High cognitive load</text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  // EEGNet & Deep Learning Pipeline
  if (nodeId === 'node-2-2' || nodeId === 'node-2-1') {
    return (
      <div className="bg-[#08080a] light:bg-slate-50 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 light:text-cyan-700 font-mono text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Infographic Revision Poster: EEGNet Architecture Flowchart</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 light:bg-indigo-100 text-indigo-300 light:text-indigo-800 font-bold border border-indigo-800/40">
            Deep Learning
          </span>
        </div>

        <div className="w-full bg-[#050507] light:bg-white rounded-xl p-3 border border-slate-800 light:border-slate-200 overflow-x-auto">
          <svg viewBox="0 0 550 180" className="w-full h-auto min-w-[480px]">
            {/* Input Box */}
            <rect x="10" y="40" width="90" height="100" rx="8" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="2" />
            <text x="55" y="85" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="monospace">EEG Signal</text>
            <text x="55" y="105" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">(C Channels, T Samples)</text>

            <path d="M 105 90 L 135 90" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Block 1: Temporal Conv */}
            <rect x="140" y="40" width="110" height="100" rx="8" fill="#4338ca" fillOpacity="0.2" stroke="#4338ca" strokeWidth="2" />
            <text x="195" y="75" textAnchor="middle" fill="#4338ca" fontSize="10" fontWeight="bold" fontFamily="monospace">1. Temporal Conv</text>
            <text x="195" y="95" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">Bandpass Filter</text>
            <text x="195" y="115" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">(F1 Kernels)</text>

            <path d="M 255 90 L 285 90" stroke="#4338ca" strokeWidth="2" />

            {/* Block 2: Depthwise Conv */}
            <rect x="290" y="40" width="110" height="100" rx="8" fill="#047857" fillOpacity="0.2" stroke="#047857" strokeWidth="2" />
            <text x="345" y="75" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold" fontFamily="monospace">2. Depthwise Conv</text>
            <text x="345" y="95" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">Spatial Electrodes</text>
            <text x="345" y="115" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">(D Depth Multiplier)</text>

            <path d="M 405 90 L 435 90" stroke="#047857" strokeWidth="2" />

            {/* Block 3: Separable Conv & Output */}
            <rect x="440" y="40" width="100" height="100" rx="8" fill="#6b21a8" fillOpacity="0.2" stroke="#6b21a8" strokeWidth="2" />
            <text x="490" y="75" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="bold" fontFamily="monospace">3. Separable Conv</text>
            <text x="490" y="95" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">Softmax Output</text>
            <text x="490" y="115" textAnchor="middle" fill="#6b21a8" fontSize="9" fontWeight="bold" fontFamily="monospace">Intent Class</text>
          </svg>
        </div>
      </div>
    );
  }

  // Vision Transformer & Mind-Vis Generative AI
  if (nodeId === 'node-3-2' || nodeId === 'node-4-1' || nodeId === 'node-4-2') {
    return (
      <div className="bg-[#08080a] light:bg-slate-50 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 light:text-cyan-700 font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Infographic Revision Poster: Mind-Vis Latent Diffusion Visual Reconstruction</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 light:bg-purple-100 text-purple-300 light:text-purple-800 font-bold border border-purple-800/40">
            Generative AI
          </span>
        </div>

        <div className="w-full bg-[#050507] light:bg-white rounded-xl p-3 border border-slate-800 light:border-slate-200 overflow-x-auto">
          <svg viewBox="0 0 550 180" className="w-full h-auto min-w-[480px]">
            {/* fMRI / ECoG Input */}
            <rect x="10" y="35" width="100" height="110" rx="8" fill="#0284c7" fillOpacity="0.15" stroke="#0284c7" strokeWidth="2" />
            <text x="60" y="75" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold" fontFamily="monospace">Cortical fMRI</text>
            <text x="60" y="95" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">Voxel Activations</text>

            <path d="M 115 90 L 145 90" stroke="#0284c7" strokeWidth="2" />

            {/* Neural Encoder */}
            <rect x="150" y="35" width="110" height="110" rx="8" fill="#4338ca" fillOpacity="0.15" stroke="#4338ca" strokeWidth="2" />
            <text x="205" y="75" textAnchor="middle" fill="#4338ca" fontSize="10" fontWeight="bold" fontFamily="monospace">Neural Encoder</text>
            <text x="205" y="95" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">ViT Attention</text>

            <path d="M 265 90 L 295 90" stroke="#4338ca" strokeWidth="2" />

            {/* CLIP Latent Vector */}
            <rect x="300" y="55" width="80" height="70" rx="8" fill="#b45309" fillOpacity="0.2" stroke="#b45309" strokeWidth="2" />
            <text x="340" y="85" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="bold" fontFamily="monospace">CLIP Latent</text>
            <text x="340" y="102" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">512-D Vector</text>

            <path d="M 385 90 L 415 90" stroke="#b45309" strokeWidth="2" />

            {/* Latent Diffusion Synthesis */}
            <rect x="420" y="35" width="120" height="110" rx="8" fill="#6b21a8" fillOpacity="0.15" stroke="#6b21a8" strokeWidth="2" />
            <text x="480" y="75" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="bold" fontFamily="monospace">Latent Diffusion</text>
            <text x="480" y="95" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">50 Denoising Steps</text>
            <text x="480" y="115" textAnchor="middle" fill="#6b21a8" fontSize="9" fontWeight="bold" fontFamily="monospace">HD Image Output</text>
          </svg>
        </div>
      </div>
    );
  }

  // Default Generic Infographic Revision Poster
  return (
    <div className="bg-[#08080a] light:bg-slate-50 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-400 light:text-cyan-700 font-mono text-xs font-bold uppercase tracking-wider">
          <Network className="w-4 h-4 text-cyan-400" />
          <span>Infographic Revision Poster: Concept Architecture</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 light:bg-cyan-100 text-cyan-300 light:text-cyan-800 font-bold border border-cyan-800/40">
          Curriculum Revision
        </span>
      </div>

      <div className="w-full bg-[#050507] light:bg-white rounded-xl p-3 border border-slate-800 light:border-slate-200 overflow-x-auto">
        <svg viewBox="0 0 550 160" className="w-full h-auto min-w-[480px]">
          {/* Node 1 */}
          <rect x="20" y="40" width="130" height="80" rx="8" fill="#0284c7" fillOpacity="0.15" stroke="#0284c7" strokeWidth="2" />
          <text x="85" y="75" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold" fontFamily="monospace">1. Biological Signal</text>
          <text x="85" y="95" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">Microvolt Potential</text>

          <path d="M 155 80 L 185 80" stroke="#0284c7" strokeWidth="2" />

          {/* Node 2 */}
          <rect x="190" y="40" width="150" height="80" rx="8" fill="#4338ca" fillOpacity="0.15" stroke="#4338ca" strokeWidth="2" />
          <text x="265" y="75" textAnchor="middle" fill="#4338ca" fontSize="10" fontWeight="bold" fontFamily="monospace">2. DSP & Feature Filter</text>
          <text x="265" y="95" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="monospace">Bandpass / CSP Matrix</text>

          <path d="M 345 80 L 375 80" stroke="#4338ca" strokeWidth="2" />

          {/* Node 3 */}
          <rect x="380" y="40" width="150" height="80" rx="8" fill="#047857" fillOpacity="0.15" stroke="#047857" strokeWidth="2" />
          <text x="455" y="75" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold" fontFamily="monospace">3. AI Model Classifier</text>
          <text x="455" y="95" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold" fontFamily="monospace">Decoded Neural Command</text>
        </svg>
      </div>
    </div>
  );
};
