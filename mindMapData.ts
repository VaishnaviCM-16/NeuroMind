import { MindMapNode } from '../types';

export const MIND_MAP_NODES: MindMapNode[] = [
  // LEVEL 0: SCRATCH FOUNDATIONS
  {
    id: 'node-0-1',
    level: 0,
    title: '1. What is a Biological Neuron?',
    subtitle: 'The fundamental cellular unit of computation in the human brain',
    category: 'scratch',
    description: 'The brain contains ~86 billion neurons. Each neuron consists of dendrites (receivers), a soma (cell body), an axon (transmission line), and axon terminals (transmitters). Chemical neurotransmitters cross the 20nm synaptic cleft.',
    keyTakeaways: [
      'Resting Membrane Potential: -70 mV maintained by Na+/K+ ATPase pumps.',
      'Dendrites receive chemical signals and convert them to graded electrical potentials.',
      'Myelin sheath speeds up action potential propagation via Saltatory Conduction.'
    ],
    connectedTo: ['node-0-2', 'node-0-3'],
    formula: 'V_m = -70 \\text{ mV} \\quad (Na^+ / K^+ \\text{ Pump: } 3Na^+ \\text{ out}, 2K^+ \\text{ in})'
  },
  {
    id: 'node-0-2',
    level: 0,
    title: '2. Action Potential & Ionic Flux',
    subtitle: 'How electrical spikes travel down the axon',
    category: 'scratch',
    description: 'When dendrite input depolarizes the axon hillock past threshold (-55mV), voltage-gated Na+ channels burst open, creating a rapid +40mV electrical pulse before K+ channels restore equilibrium.',
    keyTakeaways: [
      'All-or-None Principle: Spike occurs only if threshold (-55mV) is breached.',
      'Depolarization: Na+ influx spikes voltage to +40mV in <1ms.',
      'Repolarization & Hyperpolarization: K+ efflux resets membrane voltage.'
    ],
    connectedTo: ['node-1-1', 'node-2-3'],
    formula: '\\text{Spike Condition: } V_m \\ge V_{th} (-55\\text{mV})'
  },
  {
    id: 'node-0-3',
    level: 0,
    title: '3. Cerebral Cortex Anatomy & Lobes',
    subtitle: 'Functional mapping of the 4 major brain regions',
    category: 'brain',
    description: 'The outer folded cortex is split into 4 functional lobes: Frontal (executive/motor), Temporal (auditory/memory), Parietal (somatosensory), and Occipital (visual V1-V4).',
    keyTakeaways: [
      'Frontal Lobe / Primary Motor Cortex (M1): Motor execution & movement intent.',
      'Occipital Lobe / Visual Cortex (V1): Primary visual processing and orientation.',
      'Temporal Lobe: Auditory processing and language comprehension (Wernicke area).'
    ],
    connectedTo: ['node-1-1', 'node-1-2'],
  },

  // LEVEL 1: SIGNAL RECORDING & BCI
  {
    id: 'node-1-1',
    level: 1,
    title: '4. Non-Invasive EEG & 10-20 System',
    subtitle: 'Recording brain microvolts from scalp electrodes',
    category: 'bci',
    description: 'Electroencephalography (EEG) measures synchronized post-synaptic potentials from millions of cortical neurons via scalp electrodes using standardized 10-20 system positioning (e.g., C3, C4, Cz, O1, O2).',
    keyTakeaways: [
      'Alpha Waves (8-12 Hz): Relaxed focus, suppressed during motor imagery (Mu rhythm).',
      'Beta Waves (13-30 Hz): Active cognitive engagement and motor execution.',
      'High temporal resolution (~1 ms), low spatial resolution (cm scale due to skull dampening).'
    ],
    connectedTo: ['node-1-3', 'node-2-1'],
    formula: 'V_{scalp} \\approx 10 - 100 \\; \\mu\\text{V}'
  },
  {
    id: 'node-1-2',
    level: 1,
    title: '5. Invasive ECoG & Utah Arrays',
    subtitle: 'Subdural grid recordings for crystal-clear cortical signal',
    category: 'bci',
    description: 'Electrocorticography (ECoG) places electrodes directly on the cortical surface, while intracortical Utah Arrays penetrate cortical layers to record single-unit action potential spikes with sub-millimeter precision.',
    keyTakeaways: [
      'High-Gamma Power (70-150 Hz): Direct indicator of localized neural population firing.',
      'Zero skull attenuation: Enables high-speed text generation and speech synthesis.',
      'Surgical implantation requirement (semi-invasive or fully invasive).'
    ],
    connectedTo: ['node-4-2'],
  },
  {
    id: 'node-1-3',
    level: 1,
    title: '6. Core BCI Control Paradigms',
    subtitle: 'Motor Imagery, SSVEP, and P300 Event-Related Potentials',
    category: 'bci',
    description: 'BCI systems translate brain intents into commands using 3 main paradigms: Motor Imagery (imagining hand/feet movements), SSVEP (staring at flickering visual cues), or P300 (detecting target oddball stimuli).',
    keyTakeaways: [
      'Motor Imagery (MI): Event-Related Desynchronization (ERD) over C3/C4 sensorimotor cortex.',
      'SSVEP: Visual cortex frequency resonance matching strobe flash rate (e.g. 12Hz).',
      'P300: Positive deflection ~300ms after user sees target letter/icon.'
    ],
    connectedTo: ['node-2-1', 'node-2-2'],
  },

  // LEVEL 2: DEEP LEARNING FOR NEURAL SIGNALS
  {
    id: 'node-2-1',
    level: 2,
    title: '7. Common Spatial Patterns (CSP)',
    subtitle: 'Spatial variance filtering to maximize class discriminability',
    category: 'nn',
    description: 'CSP transforms multi-channel EEG signals into a spatial subspace where the variance of one movement condition (e.g. Left Hand) is maximized while minimizing variance for the other (Right Hand).',
    keyTakeaways: [
      'Eigenvalue decomposition of covariance matrices: R_1 + R_2 = I.',
      'Drastically reduces dimensionality before feeding into classifier networks.',
      'Crucial pre-processing step for Motor Imagery BCI.'
    ],
    connectedTo: ['node-2-2'],
    formula: 'W = \\text{argmax}_W \\frac{W^T R_1 W}{W^T R_2 W}'
  },
  {
    id: 'node-2-2',
    level: 2,
    title: '8. EEGNet Convolutional Architecture',
    subtitle: 'Compact deep neural network for EEG feature learning',
    category: 'nn',
    description: 'EEGNet uses temporal convolutions to learn frequency filters, depthwise spatial convolutions to learn electrode spatial weights, and separable convolutions to summarize features into clean intents.',
    keyTakeaways: [
      'Temporal Conv: Learns bandpass frequency filters (e.g., 8-30 Hz).',
      'Depthwise Conv: Learns spatial channel combinations across scalp electrodes.',
      'Extremely compact (~2,000 parameters) preventing overfitting on small EEG datasets.'
    ],
    connectedTo: ['node-3-1', 'node-3-2'],
  },
  {
    id: 'node-2-3',
    level: 2,
    title: '9. Spiking Neural Networks (SNN)',
    subtitle: 'Neuromorphic 3rd-generation neural networks',
    category: 'nn',
    description: 'SNNs mimic biological neurons using discrete spike events rather than continuous activation values. Neurons accumulate membrane potential over time using Leaky Integrate-and-Fire (LIF) dynamics.',
    keyTakeaways: [
      'Event-Driven Efficiency: Computes only when a spike threshold is breached.',
      'STDP Learning: "Neurons that fire together, wire together".',
      'Deployed on neuromorphic chips like Intel Loihi and BrainScaleS.'
    ],
    connectedTo: ['node-3-1'],
    formula: '\\tau_m \\frac{dV}{dt} = -(V - V_{rest}) + R \\cdot I(t)'
  },

  // LEVEL 3: GENERATIVE MODELS & TRANSFORMERS
  {
    id: 'node-3-1',
    level: 3,
    title: '10. GANs & WGAN-GP for Data Augmentation',
    subtitle: 'Generating synthetic EEG signals to overcome data scarcity',
    category: 'gan',
    description: 'Generative Adversarial Networks (GANs) pitch a Generator (creating synthetic EEG waveforms) against a Discriminator. WGAN-GP uses Wasserstein distance and Gradient Penalty to guarantee training stability without mode collapse.',
    keyTakeaways: [
      'Solves BCI data scarcity: Generates realistic multi-channel EEG trials.',
      'Wasserstein Distance: Smooth distance metric avoiding vanishing gradients.',
      'Gradient Penalty: Enforces 1-Lipschitz continuity constraint.'
    ],
    connectedTo: ['node-4-1'],
    formula: 'L = \\mathbb{E}[D(\\tilde{x})] - \\mathbb{E}[D(x)] + \\lambda \\mathbb{E}[(\\parallel \\nabla_{\\hat{x}} D(\\hat{x}) \\parallel_2 - 1)^2]'
  },
  {
    id: 'node-3-2',
    level: 3,
    title: '11. Vision Transformers (ViT) for BCI',
    subtitle: 'Multi-head self-attention over spatial-temporal neural patches',
    category: 'vit',
    description: 'Vision Transformers convert 2D EEG topographical maps or spectrograms into flattened patch sequence tokens, leveraging multi-head self-attention to capture long-range interactions across time and brain regions.',
    keyTakeaways: [
      'Patch Tokenization: Splits multi-channel EEG spectrograms into time-frequency patches.',
      'Self-Attention Mechanism: Quantifies how electrode C3 interacts with O2 across time.',
      'State-of-the-art accuracy in multi-class BCI decoding benchmarks.'
    ],
    connectedTo: ['node-4-1', 'node-4-2'],
    formula: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V'
  },

  // LEVEL 4: ADVANCED BRAIN DECODING
  {
    id: 'node-4-1',
    level: 4,
    title: '12. Mind-Vis: Brain-to-Image Reconstruction',
    subtitle: 'fMRI continuous voxel signals -> Latent Diffusion image synthesis',
    category: 'gai',
    description: 'Mind-Vis decodes fMRI cortical voxel activations recorded while a subject views a photo into a 512D CLIP visual latent vector, which guides a Latent Diffusion Model to generate a reconstructed image of what the person is seeing.',
    keyTakeaways: [
      'fMRI BOLD response encodes visual feature hierarchies across visual cortex V1-V4.',
      'Neural Encoder maps voxel matrices into CLIP latent representation.',
      'Latent Diffusion Model progressively removes noise over 50 steps to produce HD images.'
    ],
    connectedTo: [],
  },
  {
    id: 'node-4-2',
    level: 4,
    title: '13. Speech Reconstruction from ECoG Activity',
    subtitle: 'Decoding Broca area motor cortical intent into spoken audio',
    category: 'gai',
    description: 'Captures high-gamma power over Broca area and motor larynx/mouth cortex while a patient silently speaks. Recurrent Transformer decodes articulatory movements and feeds a neural vocoder to output natural spoken voice.',
    keyTakeaways: [
      'Decodes silent motor speech intent at 78+ words per minute.',
      'Maps neural power to vocal tract kinematics (lips, tongue, larynx).',
      'Restores communication for individuals with severe paralysis or ALS.'
    ],
    connectedTo: [],
  }
];
