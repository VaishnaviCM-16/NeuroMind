import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Video, CheckCircle2, Film, Volume2, VolumeX, Plus, Send, Square, Home } from 'lucide-react';

export interface SimulationVideo {
  id: string;
  nodeId?: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  description: string;
  steps: { time: number; label: string; detail: string }[];
}

export const SIMULATION_VIDEOS: SimulationVideo[] = [
  {
    id: 'vid-node-0-1',
    nodeId: 'node-0-1',
    title: '1. What is a Biological Neuron? (3D Anatomy)',
    subtitle: 'Dendrites, Soma, Axon Hillock, Myelin Sheath & Synapse',
    category: 'Scratch Biology',
    level: 'Scratch',
    description: '3D cellular motion journey inside a biological neuron: dendrite signal reception, soma integration, myelin saltatory conduction, and chemical synaptic transmission.',
    steps: [
      { time: 0, label: '0.0s - Dendritic Potential Reception', detail: 'Dendrites collect chemical signals and generate graded postsynaptic membrane potentials.' },
      { time: 2.5, label: '2.5s - Soma & Axon Hillock Summation', detail: 'Potentials summate at the axon hillock; -70 mV resting potential shifts toward -55 mV threshold.' },
      { time: 5.0, label: '5.0s - Saltatory Conduction along Myelin', detail: 'Action potential hops rapidly across Nodes of Ranvier at up to 120 m/s.' },
      { time: 7.5, label: '7.5s - Synaptic Terminal Exocytosis', detail: 'Voltage-gated Ca2+ influx forces neurotransmitter vesicles to fuse and release into the 20nm cleft.' },
    ]
  },
  {
    id: 'vid-node-0-2',
    nodeId: 'node-0-2',
    title: '2. Action Potential & Ionic Flux',
    subtitle: 'Hodgkin-Huxley Membrane Depolarization & Ion Channels',
    category: 'Neurophysiology',
    level: 'Scratch',
    description: 'Millisecond-by-millisecond 3D breakdown of voltage-gated Na+ and K+ channel gate dynamics during a +40mV action potential spike.',
    steps: [
      { time: 0, label: '0.0s - Resting State (-70 mV)', detail: 'Na+/K+ ATPase pumps maintain -70 mV baseline gradient (3 Na+ out, 2 K+ in).' },
      { time: 2.5, label: '2.5s - Na+ Channel Opening (-55 mV Threshold)', detail: 'Voltage-gated Na+ channels burst open, driving rapid depolarization to +40 mV in <1ms.' },
      { time: 5.0, label: '5.0s - K+ Channel Efflux & Repolarization', detail: 'Na+ channels inactivate; K+ channels open, allowing K+ efflux to restore negative potential.' },
      { time: 7.5, label: '7.5s - Hyperpolarization & Refractory Period', detail: 'Undershoot to -80 mV prevents immediate re-firing and enforces forward signal propagation.' },
    ]
  },
  {
    id: 'vid-node-0-3',
    nodeId: 'node-0-3',
    title: '3. Cerebral Cortex Anatomy & Lobes',
    subtitle: 'Frontal, Parietal, Temporal, Occipital, Thalamus & Cerebellum',
    category: 'Anatomy',
    level: 'Beginner',
    description: 'Interactive 3D anatomical tour through the 4 cerebral cortex lobes, motor homunculus, subcortical Thalamus sensory relay, and Cerebellum.',
    steps: [
      { time: 0, label: '0.0s - Cortical Lobes & Motor Strip (M1)', detail: 'Frontal Lobe (M1 motor cortex), Parietal (S1 touch), Temporal (auditory/Wernicke), and Occipital (V1 visual).' },
      { time: 2.5, label: '2.5s - Subcortical Thalamus & Limbic System', detail: 'Thalamus relays sensory signals to cortex; Hippocampus consolidates long-term memory; Amygdala processes emotions.' },
      { time: 5.0, label: '5.0s - Cerebellum & Fine Motor Coordination', detail: 'Cerebellum houses 50 billion Purkinje neurons for fine motor precision, timing, and balance.' },
      { time: 7.5, label: '7.5s - Brainstem & Spinal Cord Axon Pathways', detail: 'Pons and Medulla Oblongata regulate autonomic functions and corticospinal motor tracts.' },
    ]
  },
  {
    id: 'vid-node-1-1',
    nodeId: 'node-1-1',
    title: '4. Non-Invasive EEG & 10-20 Electrode System',
    subtitle: 'Scalp Microvolts, 10-20 Geometry & Brain Wave Rhythms',
    category: 'BCI Signals',
    level: 'Beginner',
    description: 'Visualization of scalp electrode placement (C3, C4, Cz, Oz) and real-time microvolt neural oscillations across Alpha, Beta, Theta, and Gamma bands.',
    steps: [
      { time: 0, label: '0.0s - 10-20 System Electrode Layout', detail: 'Standardized positioning based on 10% and 20% distances between Nasion, Inion, and Preauricular points.' },
      { time: 2.5, label: '2.5s - Alpha & Mu Oscillations (8-12 Hz)', detail: 'Relaxed focus with eyes closed produces strong 10Hz Alpha waves over Oz and Mu waves over motor strip.' },
      { time: 5.0, label: '5.0s - Beta Rhythms (13-30 Hz)', detail: 'Active cognitive engagement and motor execution trigger high-frequency Beta desynchronization.' },
      { time: 7.5, label: '7.5s - Volume Conduction & Skull Attenuation', detail: 'Extracellular currents pass through dura, skull, and scalp, dampening microvolts to 10-100 uV.' },
    ]
  },
  {
    id: 'vid-node-1-2',
    nodeId: 'node-1-2',
    title: '5. Invasive ECoG & Utah Microelectrode Arrays',
    subtitle: 'Subdural Cortical Grids & Intracortical Spike Sorting',
    category: 'Invasive BCI',
    level: 'Intermediate',
    description: '3D simulation of ECoG subdural grid recording and Utah Array silicon micro-needles recording single-unit action potentials directly in motor cortex.',
    steps: [
      { time: 0, label: '0.0s - Subdural ECoG Grid Placement', detail: 'Platinum electrode grid rests directly on cortical surface beneath dura mater.' },
      { time: 2.5, label: '2.5s - High-Gamma Band Power (70-150 Hz)', detail: 'High-gamma power provides high-density readout of localized cortical population firing.' },
      { time: 5.0, label: '5.0s - Utah Microelectrode Penetration', detail: '100 silicon needles penetrate Layer V motor cortex to record individual neuron spikes.' },
      { time: 7.5, label: '7.5s - Spike Sorting & Waveform Clustering', detail: 'Threshold detection and PCA spike sorting isolate individual single-unit action potentials.' },
    ]
  },
  {
    id: 'vid-node-1-3',
    nodeId: 'node-1-3',
    title: '6. Core BCI Paradigms: Motor Imagery, SSVEP & P300',
    subtitle: 'The 3 Main Paradigms Translating Thought into Action',
    category: 'BCI Systems',
    level: 'Intermediate',
    description: '3D animated comparison of Motor Imagery ERD/ERS, SSVEP visual frequency resonance, and P300 oddball event-related potentials.',
    steps: [
      { time: 0, label: '0.0s - Motor Imagery (ERD/ERS)', detail: 'Imagining left hand grasp suppresses 10Hz Mu rhythm over contralateral C4 sensorimotor cortex.' },
      { time: 2.5, label: '2.5s - Steady-State Visual Evoked Potential (SSVEP)', detail: 'Staring at a 12Hz flickering icon elicits visual cortex resonance matching 12Hz, 24Hz, and 36Hz.' },
      { time: 5.0, label: '5.0s - P300 Oddball Event-Related Potential', detail: 'Target letter flashing in a grid triggers a sharp positive deflection ~300ms post-stimulus over Pz.' },
      { time: 7.5, label: '7.5s - Command Translation & Output', detail: 'Feature vectors are mapped to robotic movement, speller selection, or cursor navigation.' },
    ]
  },
  {
    id: 'vid-node-2-1',
    nodeId: 'node-2-1',
    title: '7. Common Spatial Patterns (CSP) Algorithm',
    subtitle: 'Spatial Variance Filtering to Maximize Class Separability',
    category: 'Signal Processing',
    level: 'Intermediate',
    description: 'Visualizing how CSP diagonalizes multi-channel covariance matrices to maximize signal variance for Left Hand vs Right Hand Motor Imagery.',
    steps: [
      { time: 0, label: '0.0s - Multi-Channel Covariance Matrix', detail: 'Compute spatial covariance matrix R_1 and R_2 for Class 1 and Class 2 trials.' },
      { time: 2.5, label: '2.5s - Composite Covariance Whitening', detail: 'Whitening transformation equalizes overall variance across all electrode channels.' },
      { time: 5.0, label: '5.0s - Eigenvalue Projection', detail: 'Eigenvectors maximize class 1 variance while simultaneously minimizing class 2 variance.' },
      { time: 7.5, label: '7.5s - Log-Variance Feature Extraction', detail: 'Filtered signal log-variances form highly discriminative 2D/4D feature vectors for LDA/SVM.' },
    ]
  },
  {
    id: 'vid-node-2-2',
    nodeId: 'node-2-2',
    title: '8. EEGNet Convolutional Neural Architecture',
    subtitle: 'Depthwise Spatial & Separable Convolutions for BCI',
    category: 'Deep Learning',
    level: 'Advanced',
    description: '3D neural layer walkthrough of EEGNet: 2D temporal bandpass convs, depthwise spatial electrode convs, and pointwise separable convs.',
    steps: [
      { time: 0, label: '0.0s - Raw EEG Input Tensor', detail: 'Accepts 1xCxT multi-channel EEG time-series matrix directly without manual hand-engineering.' },
      { time: 2.5, label: '2.5s - Temporal Convolutions', detail: 'Learns frequency bandpass filters (e.g. 8-30Hz) across time using 1xF_s/2 kernel filters.' },
      { time: 5.0, label: '5.0s - Depthwise Spatial Convolutions', detail: 'Learns spatial electrode weights across channels, acting as a trainable neural CSP filter.' },
      { time: 7.5, label: '7.5s - Separable Convolution & Classification', detail: 'Summarizes temporal-spatial maps into clean class probabilities with only ~2,000 parameters.' },
    ]
  },
  {
    id: 'vid-node-2-3',
    nodeId: 'node-2-3',
    title: '9. Spiking Neural Networks (SNN) & Neuromorphic Hardware',
    subtitle: 'Leaky Integrate-and-Fire (LIF) Spike Dynamics & STDP',
    category: 'Neuromorphic',
    level: 'Advanced',
    description: '3D event-driven simulation of LIF spiking neurons, temporal spike train propagation, and STDP synaptic learning rules on neuromorphic chips.',
    steps: [
      { time: 0, label: '0.0s - Membrane Potential Accumulation', detail: 'LIF neuron integrates input synaptic currents over time into membrane voltage V_m.' },
      { time: 2.5, label: '2.5s - Threshold Spike Emission', detail: 'When V_m reaches V_th (-55mV), a discrete binary spike S(t)=1 is emitted and V_m resets.' },
      { time: 5.0, label: '5.0s - STDP Synaptic Plasticity', detail: 'Synaptic weights adjust based on millisecond arrival difference between pre- and post-spikes.' },
      { time: 7.5, label: '7.5s - Neuromorphic Hardware Deployment', detail: 'SNNs execute on Intel Loihi with 100x lower milliwatt power consumption for edge BCIs.' },
    ]
  },
  {
    id: 'vid-node-3-1',
    nodeId: 'node-3-1',
    title: '10. GANs & WGAN-GP for EEG Data Augmentation',
    subtitle: 'Wasserstein Distance & Gradient Penalty for Synthetic EEG',
    category: 'Generative AI',
    level: 'Advanced',
    description: '3D adversarial training loop of Generator vs Discriminator using Wasserstein Gradient Penalty to produce realistic multi-channel synthetic EEG trials.',
    steps: [
      { time: 0, label: '0.0s - Latent Vector Input & Generator', detail: 'Generator G converts random Gaussian noise vector z into synthetic 64-channel EEG trial.' },
      { time: 2.5, label: '2.5s - Discriminator / Critic Evaluation', detail: 'Discriminator D evaluates synthetic vs real trial signals using Earth Mover\'s Distance.' },
      { time: 5.0, label: '5.0s - Gradient Penalty Enforcement', detail: 'Enforces 1-Lipschitz continuity constraint, eliminating mode collapse and vanishing gradients.' },
      { time: 7.5, label: '7.5s - Data Augmentation & BCI Boost', detail: 'Augmenting small BCI datasets with WGAN-GP synthetic trials boosts classifier accuracy by +20%.' },
    ]
  },
  {
    id: 'vid-node-3-2',
    nodeId: 'node-3-2',
    title: '11. Vision Transformers (ViT) & Self-Attention in BCI',
    subtitle: 'Patch Tokenization & Multi-Head Spatial-Temporal Self-Attention',
    category: 'Transformers',
    level: 'Advanced',
    description: 'Converting multi-channel EEG spectrograms into patch tokens, applying Multi-Head Self-Attention to capture non-local cross-hemispheric brain correlations.',
    steps: [
      { time: 0, label: '0.0s - EEG Spectrogram Patchification', detail: 'Transforms time-frequency EEG matrices into 16x16 2D spatial-temporal patch sequence tokens.' },
      { time: 2.5, label: '2.5s - Positional Encoding Injection', detail: 'Adds 2D electrode spatial position embeddings and 1D temporal time-step embeddings.' },
      { time: 5.0, label: '5.0s - Multi-Head Self-Attention (MHSA)', detail: 'Computes pairwise Query-Key-Value attention across distant cortical lobes (e.g. Frontal-Occipital).' },
      { time: 7.5, label: '7.5s - Global Brain State Classification', detail: 'CLS classification token aggregates global context for multi-class Motor Imagery decoding.' },
    ]
  },
  {
    id: 'vid-node-4-1',
    nodeId: 'node-4-1',
    title: '12. Mind-Vis: Brain-to-Image Reconstruction via Diffusion',
    subtitle: 'fMRI Voxel Signals -> CLIP Latent Vector -> Latent Diffusion',
    category: 'Mind Decoding',
    level: 'Advanced',
    description: 'Full 3D pipeline decoding visual cortex fMRI BOLD activations into CLIP visual latent embeddings to synthesize high-definition reconstructed images.',
    steps: [
      { time: 0, label: '0.0s - fMRI BOLD Scan Acquisition', detail: 'Subject views a photograph; 3T fMRI records voxel blood-oxygenation responses in V1-V4.' },
      { time: 2.5, label: '2.5s - Sparse Neural Encoder Mapping', detail: 'Translates 3D voxel matrices into a 512-dimensional CLIP visual feature embedding.' },
      { time: 5.0, label: '5.0s - Latent Diffusion Denoising', detail: 'Stable Diffusion model uses brain CLIP embedding as cross-attention condition across 50 steps.' },
      { time: 7.5, label: '7.5s - HD Image Reconstruction', detail: 'Synthesizes high-definition photograph of what the subject viewed with 88% semantic accuracy.' },
    ]
  },
  {
    id: 'vid-node-4-2',
    nodeId: 'node-4-2',
    title: '13. Speech Reconstruction from ECoG Activity',
    subtitle: 'Broca Area ECoG Grid -> Vocal Tract Kinematics -> Neural Speech',
    category: 'Speech Decoding',
    level: 'Advanced',
    description: 'Synthesizing natural spoken words and articulatory vocal tract movements from high-density ECoG recordings over Broca\'s motor speech cortex.',
    steps: [
      { time: 0, label: '0.0s - High-Density ECoG Recording', detail: '128-channel grid over Broca\'s area (BA 44/45) captures High-Gamma (70-150Hz) speech intent.' },
      { time: 2.5, label: '2.5s - Articulatory Kinematics Decoding', detail: 'Recurrent Transformer decodes 3D movement parameters of lip, tongue, jaw, and larynx.' },
      { time: 5.0, label: '5.0s - Phoneme Stream Prediction', detail: 'Predicts target phonemes and word sequences at 78+ words per minute with low error rate.' },
      { time: 7.5, label: '7.5s - Neural Vocoder Audio Synthesis', detail: 'HiFi-GAN neural vocoder synthesizes natural spoken audio output and digital avatar voice.' },
    ]
  }
];

interface MotionVideoViewerProps {
  initialVideoId?: string;
  onNavigateToTab?: (tab: any) => void;
}

export const MotionVideoViewer: React.FC<MotionVideoViewerProps> = ({
  initialVideoId,
  onNavigateToTab,
}) => {
  const [videoList, setVideoList] = useState<SimulationVideo[]>(SIMULATION_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<SimulationVideo>(() => {
    if (initialVideoId) {
      const match = SIMULATION_VIDEOS.find((v) => v.id === initialVideoId || v.nodeId === initialVideoId);
      if (match) return match;
    }
    return SIMULATION_VIDEOS[0];
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(true);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGeneratingCustom, setIsGeneratingCustom] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSpokenStepRef = useRef<string>('');

  useEffect(() => {
    if (initialVideoId) {
      const match = videoList.find((v) => v.id === initialVideoId || v.nodeId === initialVideoId);
      if (match) {
        setSelectedVideo(match);
        setCurrentTime(0);
        setIsPlaying(true);
      }
    }
  }, [initialVideoId, videoList]);

  // Clean up speech synthesis when unmounting or pausing
  useEffect(() => {
    if (!isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);

  const activeStep = selectedVideo.steps.reduce((acc, step) => {
    if (currentTime >= step.time) return step;
    return acc;
  }, selectedVideo.steps[0]);

  // Voice Narration via Web Speech API
  useEffect(() => {
    if (!isVoiceEnabled || !isPlaying || !('speechSynthesis' in window)) return;

    if (activeStep.label !== lastSpokenStepRef.current) {
      lastSpokenStepRef.current = activeStep.label;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeStep.detail);
      utterance.rate = 1.0 * playbackSpeed;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [activeStep, isVoiceEnabled, isPlaying, playbackSpeed]);

  // Generate Custom Concept Video
  const handleGenerateCustomVideo = () => {
    if (!customPrompt.trim()) return;
    setIsGeneratingCustom(true);

    setTimeout(() => {
      const newVideo: SimulationVideo = {
        id: `custom-vid-${Date.now()}`,
        title: `AI Generated: ${customPrompt}`,
        subtitle: `Custom AI Generated Visual Explanation for "${customPrompt}"`,
        category: 'AI Generated',
        level: 'Interactive',
        description: `Custom video lesson generated by NeuroMind AI explaining ${customPrompt} with frame-by-frame 3D animation and voice narration.`,
        steps: [
          { time: 0, label: '0.0s - Concept Initialization', detail: `Introducing ${customPrompt}: Fundamental mechanism and biological/computational foundations.` },
          { time: 2.5, label: '2.5s - Core Signal Mechanics', detail: `Dynamic interaction and mathematical formulation governing ${customPrompt}.` },
          { time: 5.0, label: '5.0s - Neural Network Integration', detail: `How ${customPrompt} connects to deep learning layers, feature extraction, and cortex processing.` },
          { time: 7.5, label: '7.5s - Practical BCI & Neuro-AI Application', detail: `Real-world clinical and engineering applications of ${customPrompt} in modern Brain-Computer Interfaces.` },
        ]
      };

      setVideoList([newVideo, ...videoList]);
      setSelectedVideo(newVideo);
      setCurrentTime(0);
      setIsPlaying(true);
      setCustomPrompt('');
      setIsGeneratingCustom(false);
    }, 1200);
  };

  const animIdRef = useRef<number | null>(null);
  const currentTimeRef = useRef<number>(currentTime);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  // Canvas Motion Animation Engine - Smooth 60 FPS Continuous Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    lastTimeRef.current = performance.now();
    let stepCount = currentTimeRef.current * 10;

    const renderFrame = (now: number) => {
      const delta = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      if (isPlaying) {
        stepCount += delta * 5 * playbackSpeed;
        currentTimeRef.current += delta * playbackSpeed;
        if (currentTimeRef.current >= 10) {
          currentTimeRef.current = 0;
        }
        setCurrentTime(currentTimeRef.current);
      }

      const width = canvas.width;
      const height = canvas.height;

      // Dark Editorial Stage Background
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      // Subtle Stage Grid
      ctx.strokeStyle = '#ffffff08';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const progress = currentTimeRef.current / 10;

      // Render video-specific 3D/2D animation canvas graphics
      if (selectedVideo.id.includes('0-1')) {
        // NEURON ANATOMY: Dendrites, Soma, Axon, Vesicles
        ctx.fillStyle = '#0891b220';
        ctx.strokeStyle = '#0891b2';
        ctx.lineWidth = 3;

        // Soma
        ctx.beginPath();
        ctx.arc(width * 0.3, height * 0.5, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Axon
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(width * 0.3 + 45, height * 0.5);
        ctx.lineTo(width * 0.8, height * 0.5);
        ctx.stroke();

        // Action potential traveling pulse
        const pulseX = width * 0.3 + 45 + (width * 0.5 - 45) * progress;
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(pulseX, height * 0.5, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (selectedVideo.id.includes('0-2')) {
        // ACTION POTENTIAL SPIKE GRAPH
        ctx.strokeStyle = '#0891b2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const normX = x / width;
          let y = height * 0.7; // -70mV
          if (normX > 0.3 && normX < 0.5) {
            // Spike up to +40mV
            const peak = Math.sin((normX - 0.3) / 0.2 * Math.PI);
            y -= peak * (height * 0.5);
          } else if (normX >= 0.5 && normX < 0.65) {
            // Undershoot
            y += Math.sin((normX - 0.5) / 0.15 * Math.PI) * 20;
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Scanline pointer
        const scanX = width * progress;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(scanX, 0);
        ctx.lineTo(scanX, height);
        ctx.stroke();
      } else if (selectedVideo.id.includes('3-2') || selectedVideo.id.includes('vit')) {
        // VISION TRANSFORMER: Patch Tokens & Self-Attention Matrix Lines
        const cols = 4;
        const rows = 4;
        const patchW = 50;
        const patchH = 35;
        const startX = width * 0.15;
        const startY = height * 0.25;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const px = startX + c * (patchW + 10);
            const py = startY + r * (patchH + 10);
            ctx.fillStyle = (r + c) % 2 === 0 ? '#0891b230' : '#6366f130';
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 1.5;
            ctx.fillRect(px, py, patchW, patchH);
            ctx.strokeRect(px, py, patchW, patchH);
          }
        }

        // Self-Attention connection lines
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1;
        const targetX = width * 0.75;
        const targetY = height * 0.5;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const px = startX + (i % 4) * 60 + 25;
          const py = startY + Math.floor(i / 4) * 45 + 17;
          ctx.moveTo(px, py);
          ctx.lineTo(targetX, targetY + (i - 4) * 20);
        }
        ctx.stroke();
      } else {
        // DEFAULT DYNAMIC NEURAL SPECTRUM / BCI PIPELINE
        ctx.lineWidth = 2;
        for (let ch = 0; ch < 4; ch++) {
          const yCenter = (height / 5) * (ch + 1);
          ctx.strokeStyle = ch % 2 === 0 ? '#06b6d4' : '#a855f7';
          ctx.beginPath();
          for (let x = 0; x < width; x++) {
            const t = (x / width) * 10 + stepCount + ch;
            const wave = Math.sin(t * (2 + ch)) * 20 + Math.cos(t * (5 + ch)) * 8;
            if (x === 0) ctx.moveTo(x, yCenter + wave);
            else ctx.lineTo(x, yCenter + wave);
          }
          ctx.stroke();
        }
      }

      // Time overlay marker
      ctx.fillStyle = '#ffffff30';
      ctx.font = '11px monospace';
      ctx.fillText(`Frame Time: ${currentTimeRef.current.toFixed(1)}s / 10.0s`, 20, height - 20);

      animIdRef.current = requestAnimationFrame(renderFrame);
    };

    animIdRef.current = requestAnimationFrame(renderFrame);
    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [selectedVideo, isPlaying, playbackSpeed]);

  const handlePause = () => {
    setIsPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">3D Motion & Video Lesson Studio</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Interactive 3D Concept Video Lessons</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              From Scratch biological neurons to Action Potentials, 10-20 EEG, CSP spatial filters, EEGNet, GANs, ViTs, and Mind-Vis Diffusion.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
            <Video className="w-4 h-4" />
            <span>{videoList.length} Lessons Available</span>
          </div>
        </div>
      </div>

      {/* Main Video & Playlist Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active 3D Video Player */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-cyan-950 border border-cyan-500/30 px-2 py-0.5 rounded">
                {selectedVideo.category} • {selectedVideo.level} Level
              </span>
              <span className="text-xs font-mono text-slate-400">Time: {currentTime.toFixed(1)}s / 10.0s</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100">{selectedVideo.title}</h3>
            <p className="text-xs text-slate-400">{selectedVideo.subtitle}</p>
          </div>

          {/* Canvas Animation Screen */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#050507] shadow-inner">
            <canvas ref={canvasRef} width={640} height={320} className="w-full h-auto block" />

            {/* Overlaid Active Step Callout */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md border border-white/10 p-3 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-400">
                <span>{activeStep.label}</span>
                <span className="text-[10px] text-slate-400">Audio Narration {isVoiceEnabled ? 'ON' : 'OFF'}</span>
              </div>
              <p className="text-xs text-slate-200 leading-snug">{activeStep.detail}</p>
            </div>
          </div>

          {/* Video Control Bar */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            {/* Scrubber Progress Bar */}
            <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all"
                style={{ width: `${(currentTime / 10) * 100}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center space-x-2">
                {isPlaying ? (
                  <button
                    onClick={handlePause}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center space-x-1.5 transition-all shadow-md"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePlay}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center space-x-1.5 transition-all shadow-md"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Play</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 flex items-center space-x-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 transition-all ${
                    isVoiceEnabled
                      ? 'bg-indigo-950/80 border-indigo-500/60 text-indigo-300'
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isVoiceEnabled ? 'Voice Narrator ON' : 'Muted'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-slate-500">Speed:</span>
                {[0.5, 1.0, 1.5, 2.0].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded text-[11px] ${
                      playbackSpeed === spd ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist & AI Custom Video Generator */}
        <div className="lg:col-span-4 space-y-4">
          {/* AI Video Prompt Generator Bar */}
          <div className="bg-[#050507] border border-cyan-500/30 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Generate Custom 3D Video Lesson</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Enter any Neuroscience or Neuro-AI concept to instantly render a custom 3D animated video lesson:
            </p>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="e.g. Broca Speech Area, Purkinje Cells, ViT Attention..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateCustomVideo()}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleGenerateCustomVideo}
                disabled={isGeneratingCustom || !customPrompt.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white p-2 rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {isGeneratingCustom && (
              <div className="text-[10px] font-mono text-cyan-400 animate-pulse flex items-center space-x-1">
                <span>Generating 3D Keyframes & Audio Script...</span>
              </div>
            )}
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block px-1">
            Video Library ({videoList.length})
          </span>

          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {videoList.map((vid) => {
              const isSelected = selectedVideo.id === vid.id;
              return (
                <button
                  key={vid.id}
                  onClick={() => {
                    setSelectedVideo(vid);
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/60 text-slate-100 shadow-md'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                    <span className="uppercase font-bold">{vid.category}</span>
                    <span className="text-slate-500">{vid.level}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-200 leading-snug">{vid.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{vid.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
