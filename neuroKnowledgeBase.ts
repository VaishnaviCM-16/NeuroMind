import { DocumentChunk, TheoryArticle } from '../types';

export const KNOWLEDGE_BASE_CHUNKS: DocumentChunk[] = [
  {
    id: 'chunk-brain-01',
    title: 'Functional Neuroanatomy & Cerebral Cortex Architecture',
    category: 'brain',
    content: `The human brain consists of approximately 86 billion neurons connected through 100 trillion synaptic junctions. The cerebrum is divided into two hemispheres linked by the corpus callosum. The cerebral cortex features four primary lobes: Frontal (executive function, motor control, Broca's area), Parietal (somatosensory processing, spatial awareness), Temporal (auditory processing, memory via hippocampus, Wernicke's area), and Occipital (primary visual cortex V1-V5). The primary motor cortex (M1, Brodmann Area 4) controls voluntary movements arranged topographically as the motor homunculus.`,
    keywords: ['brain', 'cortex', 'frontal', 'parietal', 'temporal', 'occipital', 'homunculus', 'brodmann', 'motor cortex', 'neurons']
  },
  {
    id: 'chunk-brain-02',
    title: 'Neuronal Electrophysiology & Action Potentials',
    category: 'brain',
    content: `Neurons propagate information via electrical action potentials governed by voltage-gated Na+ and K+ channels across the lipid bilayer. The resting membrane potential is maintained at approximately -70 mV by Na+/K+-ATPase pumps. When depolarized beyond the threshold (~-55 mV), rapid influx of Na+ causes depolarization to +30 mV, followed by K+ efflux repolarization and hyperpolarization. Postsynaptic potentials (EPSPs and IPSPs) summate spatially and temporally at the axon hillock. Synchronous post-synaptic dendritic currents of thousands of pyramidal neurons oriented perpendicularly to the cortical surface generate the extracellular electric field readable via EEG.`,
    keywords: ['action potential', 'depolarization', 'resting potential', 'ion channels', 'epsp', 'ipsp', 'pyramidal neurons', 'electrophysiology', 'synapse']
  },
  {
    id: 'chunk-bci-01',
    title: 'BCI Signal Acquisition Taxonomy & 10-20 EEG Electrode System',
    category: 'bci',
    content: `Brain-Computer Interfaces (BCIs) capture, analyze, and translate neural activity into external control commands without relying on peripheral nerves or muscles. BCI modalities fall into three categories: Non-invasive (EEG, fNIRS, MEG), Semi-invasive (ECoG placed on duramater), and Invasive (intracortical microelectrode arrays like Utah Array or Neuralink threads). Non-invasive Electroencephalography (EEG) uses standard electrode placement following the International 10-20 System (e.g., Cz over vertex, Fz frontal, Pz parietal, O1/O2 occipital, C3/C4 motor strip). EEG measures voltage fluctuations with microvolt resolution (1-100 uV) across frequency bands: Delta (0.5-4 Hz), Theta (4-8 Hz), Alpha (8-12 Hz, mu rhythm), Beta (12-30 Hz), and Gamma (30-100+ Hz).`,
    keywords: ['bci', 'eeg', 'ecog', '10-20 system', 'frequency bands', 'alpha', 'beta', 'gamma', 'utah array', 'electrode', 'non-invasive']
  },
  {
    id: 'chunk-bci-02',
    title: 'BCI Paradigms: P300, SSVEP, and Motor Imagery',
    category: 'bci',
    content: `BCIs rely on core paradigms: 1) Motor Imagery (MI): Voluntary imagination of limb movement (e.g., left/right hand) causes Event-Related Desynchronization (ERD - drop in mu/beta power) over contralateral sensorimotor cortex (C3/C4) and Event-Related Synchronization (ERS) upon movement cessation. 2) P300 Event-Related Potential: A positive deflection in EEG appearing ~300ms after an infrequent, expected target stimulus among non-targets (oddball paradigm). Used in spellers. 3) Steady-State Visually Evoked Potentials (SSVEP): Brain responses elicited over occipital cortex (O1/O2) matching the exact frequency of flickering visual targets (e.g., 10 Hz, 12 Hz, 15 Hz), achieving high Information Transfer Rates (ITR > 100 bits/min).`,
    keywords: ['p300', 'ssvep', 'motor imagery', 'erd', 'ers', 'mu rhythm', 'itr', 'oddball', 'bci paradigms']
  },
  {
    id: 'chunk-bci-03',
    title: 'BCI Signal Preprocessing & Feature Extraction (CSP & Wavelets)',
    category: 'bci',
    content: `Raw EEG signals suffer from poor spatial resolution, volume conduction, and high artifact noise (EOG eye blinks, EMG muscle activity, 50/60 Hz powerline noise). The processing pipeline includes: 1) Notch filtering (50/60 Hz) and Bandpass filtering (0.5-40 Hz Butterworth or FIR). 2) Artifact Removal via Independent Component Analysis (ICA) or Surface Laplacian spatial filtering. 3) Feature Extraction using Common Spatial Patterns (CSP), which maximizes variance for one condition while minimizing it for another, generating spatial filters optimized for multi-channel Motor Imagery decoding. 4) Continuous Wavelet Transform (CWT) or Fast Fourier Transform (FFT) for spectral feature density estimation.`,
    keywords: ['csp', 'ica', 'filtering', 'butterworth', 'fft', 'cwt', 'wavelet', 'artifacts', 'feature extraction', 'signal processing']
  },
  {
    id: 'chunk-nn-01',
    title: 'Deep Learning & Neural Networks for EEG Classification',
    category: 'nn',
    content: `Traditional linear algorithms (LDA, SVM) in BCI have been surpassed by deep neural network architectures. EEGNet is a compact Convolutional Neural Network specifically designed for EEG-based BCIs, utilizing depthwise spatial convolutions to learn channel spatial filters and separable temporal convolutions to capture frequency-specific temporal dynamics. Spiking Neural Networks (SNNs) model bio-realistic temporal spike trains using Leaky Integrate-and-Fire (LIF) equations, drastically reducing power consumption for ultra-low-power edge-BCI hardware implementations like neuromorphic chips (Intel Loihi, BrainScaleS).`,
    keywords: ['eegnet', 'cnn', 'snn', 'spiking neural network', 'lif', 'leaky integrate and fire', 'deep learning', 'svm', 'lda', 'decoding']
  },
  {
    id: 'chunk-gan-01',
    title: 'Generative Adversarial Networks (GANs) in Neurotechnology',
    category: 'gan',
    content: `EEG data collection is constrained by subject fatigue and low sample size. Generative Adversarial Networks (GANs)—comprising a Generator G attempting to create realistic synthetic EEG signals and a Discriminator D learning to distinguish real from synthetic signals—solve data scarcity. Wasserstein GAN with Gradient Penalty (WGAN-GP) prevents mode collapse in multi-channel EEG synthesis. Deep Convolutional GANs (DCGAN) generate high-fidelity synthetic Motor Imagery and P300 spectral spectrograms, improving downstream BCI classifier accuracy by 15-25% through data augmentation. GANs also perform automated EEG artifact denoising (EOG/EMG separation) via image-to-image translation models (Pix2Pix, CycleGAN).`,
    keywords: ['gan', 'wgan-gp', 'dcgan', 'generator', 'discriminator', 'synthetic eeg', 'data augmentation', 'denoising', 'pix2pix', 'cyclegan']
  },
  {
    id: 'chunk-vit-01',
    title: 'Vision Transformers (ViT) & Attention Mechanisms in Neural Decoding',
    category: 'vit',
    content: `Vision Transformers (ViT) adapt self-attention mechanisms to multi-dimensional neuroimaging data. In brain decoding, 2D/3D fMRI volumes or time-series EEG spectrograms are patchified into token sequences. Multi-Head Self-Attention (MHSA) computes global spatial-temporal correlations across disparate cortical regions without inductive bias constraints. Architectures like NeuroViT and EEG-ViT extract long-range temporal dependencies between frontal, parietal, and occipital channels, capturing complex cross-hemispheric neural synchrony that standard CNN convolutions miss.`,
    keywords: ['vit', 'vision transformer', 'attention', 'mhsa', 'fmri', 'eeg-vit', 'patches', 'neuroimaging', 'spatial-temporal']
  },
  {
    id: 'chunk-gai-01',
    title: 'Generative AI (GAI) & Mind-to-Image / Mind-to-Text Synthesis',
    category: 'gai',
    content: `Generative AI (GAI) empowers direct translation of human brain signals into natural language, synthetic speech, and visual imagery. Systems like Mind-Vis, Mind-Eye, and BrainDiffuser use latent diffusion models (e.g., Stable Diffusion) conditioned on continuous fMRI embeddings to reconstruct the visual scene a human subject is viewing with up to 85% semantic accuracy. For language, non-invasive EEG/fMRI semantic decoders and invasive ECoG speech synthesis (e.g., UCSF Anumanchipalli & Chang models) convert neural activity from Broca's area directly into phonemes, synthesised audio, or avatar speech at over 60-80 words per minute.`,
    keywords: ['gai', 'generative ai', 'mind-vis', 'mind-eye', 'diffusion', 'brain-to-text', 'brain-to-image', 'ecog speech', 'decoding', 'semantic']
  },
  {
    id: 'chunk-foundation-01',
    title: 'EEG Foundation Models & Self-Supervised Pretraining (LaBraM, BIOT, Neuro-GPT)',
    category: 'nn',
    content: `EEG Foundation Models leverage self-supervised pretraining across massive unlabelled multi-subject EEG corpora (>10,000 hours across TUH EEG, BCI Competition IV, PhysioNet). Models like LaBraM (Large Brain Model), BIOT (Biosignal Transformer), Neuro-GPT, BrainBERT, and Brant use neural tokenization (Vector Quantized VQ-VAE) and masked spatial-temporal autoencoding. By learning universal continuous brain representations before fine-tuning, foundation models achieve zero-shot and few-shot cross-subject transfer, solving individual cross-session BCI calibration bottlenecks (Kuruppu et al., 2026).`,
    keywords: ['foundation model', 'labram', 'biot', 'neuro-gpt', 'brainbert', 'brant', 'self-supervised', 'tokenization', 'pretraining', 'transfer learning']
  },
  {
    id: 'chunk-xai-01',
    title: 'Explainable AI (XAI) & Trustworthy BCI Systems (Grad-CAM, LRP, SHAP)',
    category: 'nn',
    content: `Black-box deep neural networks in BCI risk learning non-neural artifacts (e.g. eye blink EOG or jaw muscle EMG) instead of true cortical activity. Explainable AI (XAI) frameworks interpret model decisions: 1) Grad-CAM & Layer-wise Relevance Propagation (LRP) visualize spatial electrode importance maps, confirming motor cortex C3/C4 activation during hand motor imagery. 2) SHAP (SHapley Additive exPlanations) quantifies temporal feature contributions. 3) SincNet replaces first-layer conv filters with parameterized sinc functions to learn bandpass cutoffs directly. XAI guarantees trustworthy BCI control for clinical robotic prosthetics and stroke rehabilitation (Presacan et al., 2026; Abdullah et al., 2026).`,
    keywords: ['xai', 'explainable ai', 'grad-cam', 'lrp', 'shap', 'sincnet', 'trustworthy bci', 'interpretability', 'artifacts', 'feature importance']
  },
  {
    id: 'chunk-closedloop-01',
    title: 'Closed-Loop BCIs, Stroke Rehabilitation & Organoid-BCIs',
    category: 'bci',
    content: `Closed-loop BCIs establish real-time neurofeedback loops where brain signals drive functional electrical stimulation (FES), robotic exoskeletons, or VR environments. In stroke neurorehabilitation, Motor Imagery BCIs induce neuroplasticity by strengthening corticospinal motor tracts, significantly elevating fMRI BOLD fractional Amplitude of Low-Frequency Fluctuation (fALFF) and Regional Homogeneity (ReHo) in precentral gyrus (Ma et al., 2024; Williams et al., 2025). Cutting-edge Organoid-BCIs (OBCIs) integrate 3D human brain organoids with high-density microelectrode arrays, creating biohybrid neural interfaces for neurofunctional repair (Hu et al., 2024).`,
    keywords: ['closed-loop', 'stroke rehabilitation', 'fes', 'neuroplasticity', 'organoid-bci', 'obci', 'vr-bci', 'falff', 'reho', 'neurorehabilitation']
  },
  {
    id: 'chunk-tta-01',
    title: 'Backpropagation-Free Test-Time Adaptation (BFT-A) for Edge BCIs',
    category: 'nn',
    content: `Deploying deep learning BCIs on battery-powered edge hardware is limited by memory and compute costs of backpropagation. Backpropagation-Free Test-Time Adaptation (BFT-A / BFT-D) continuously adapts EEG classifiers (e.g., EEGNet) to non-stationary EEG distribution shifts during online testing without backpropagation gradient calculations. Combined with 8-bit static quantization, BFT enables real-time low-power online subject adaptation on microcontroller edge chips (Li & Wu et al., 2026).`,
    keywords: ['test-time adaptation', 'bft-a', 'bft-d', 'backpropagation-free', 'edge bci', 'quantization', 'non-stationary', 'online adaptation']
  }
];

export const THEORY_ARTICLES: TheoryArticle[] = [
  {
    id: 'node-0-1',
    category: 'scratch',
    title: '1. What is a Biological Neuron?',
    subtitle: 'The fundamental cellular unit of biological intelligence',
    level: 'Scratch',
    readTime: '5 min read',
    summary: 'Master neuron anatomy: dendrites, soma, axon hillock, myelin sheath, nodes of Ranvier, and synaptic chemical transmission.',
    sections: [
      {
        heading: 'Anatomy of the Human Biological Neuron',
        content: `The human brain contains approximately 86 billion neurons, interconnected by over 100 trillion synaptic junctions. Each neuron acts as an electrochemical processor consisting of three main structural components:
1. Dendrites: Branched cellular extensions that receive chemical neurotransmitters from presynaptic neurons and generate graded postsynaptic dendritic currents.
2. Soma (Cell Body): Contains the nucleus and cellular machinery. Summates postsynaptic potentials (EPSPs and IPSPs) both spatially and temporally at the Axon Hillock.
3. Axon & Axon Terminals: Long tubular nerve fibers wrapped in lipid-rich Myelin Sheaths produced by Schwann cells (PNS) or Oligodendrocytes (CNS). Propagates action potentials at speeds up to 120 meters/second via Saltatory Conduction across Nodes of Ranvier.`,
        keyTakeaways: [
          'Resting membrane potential is maintained at -70 mV by Na+/K+ ATPase active pumps (pumping 3 Na+ ions out for every 2 K+ ions in).',
          'Dendritic potentials are graded and local; axonal action potentials are all-or-none digital spikes.',
          'Neurotransmitters (Glutamate = Excitatory, GABA = Inhibitory) cross the 20 nanometer synaptic cleft to bind post-synaptic receptors.'
        ]
      },
      {
        heading: 'Electrophysiological Foundations & Membrane Potentials',
        content: `Understanding membrane potential is the single most vital concept in neuro-AI. The lipid bilayer membrane acts as an electrical capacitor ($C_m \\approx 1 \\; \\mu\\text{F/cm}^2$), separating intra- and extracellular ion concentrations.`,
        codeOrFormula: `Nernst Equation for Reversal Potential:
E_i = (R * T) / (z * F) * ln( [Ion]_out / [Ion]_in )

Goldman-Hodgkin-Katz (GHK) Voltage Equation:
V_m = (R*T / F) * ln( (P_Na*[Na]o + P_K*[K]o + P_Cl*[Cl]i) / (P_Na*[Na]i + P_K*[K]i + P_Cl*[Cl]o) )`,
        keyTakeaways: [
          'Excitatory Post-Synaptic Potentials (EPSP) depolarize membrane towards 0 mV (e.g. Na+ influx via AMPA receptors).',
          'Inhibitory Post-Synaptic Potentials (IPSP) hyperpolarize membrane towards -90 mV (e.g. Cl- influx via GABA_A receptors).'
        ]
      }
    ],
    tags: ['Neuron', 'Synapse', 'Dendrite', 'Action Potential', 'Biophysics']
  },
  {
    id: 'node-0-2',
    category: 'scratch',
    title: '2. Action Potential Biophysics & Hodgkin-Huxley Dynamics',
    subtitle: 'How voltage-gated ion channels trigger +40mV electrical spikes',
    level: 'Scratch',
    readTime: '7 min read',
    summary: 'Step-by-step breakdown of voltage threshold, Hodgkin cycle, Na+ channel activation, K+ repolarization, and refractory periods.',
    sections: [
      {
        heading: 'The All-or-None Action Potential Cycle',
        content: `When postsynaptic summation at the axon hillock exceeds the critical threshold of approximately -55 mV, the neuron fires an action potential. This is a non-linear digital spike that travels unattenuated down the axon:
1. Resting State (-70 mV): Voltage-gated Na+ and K+ channels remain closed.
2. Threshold & Depolarization (-55 mV to +40 mV): Voltage-gated Na+ channels rapidly open in a positive feedback loop (Hodgkin Cycle). Na+ rushes into the cell driven by concentration gradient and electrostatic attraction.
3. Repolarization (+40 mV to -70 mV): Na+ channels automatically inactivate via a "ball-and-chain" protein mechanism. Voltage-gated K+ channels open, allowing K+ ions to rush out of the cell.
4. Hyperpolarization & Undershoot (-80 mV): K+ channels close slowly, temporarily hyperpolarizing the cell below resting potential during the Absolute & Relative Refractory Periods.`,
        keyTakeaways: [
          'All-or-None Principle: An action potential either fires completely or does not fire at all.',
          'Absolute Refractory Period: Na+ channels remain inactivated (~1 ms), enforcing unidirectional spike propagation.',
          'Saltatory Conduction: Action potentials hop between Nodes of Ranvier, saving 99% metabolic energy.'
        ]
      },
      {
        heading: 'The Mathematical Hodgkin-Huxley Model (1952 Nobel Prize)',
        content: `Alan Hodgkin and Andrew Huxley derived the fundamental differential equations describing giant squid axon membrane dynamics:`,
        codeOrFormula: `// Hodgkin-Huxley Membrane Differential Equation
C_m * (dV/dt) = I_ext - g_Na*m^3*h*(V - E_Na) - g_K*n^4*(V - E_K) - g_L*(V - E_L)

dm/dt = alpha_m(V)*(1-m) - beta_m(V)*m
dh/dt = alpha_h(V)*(1-h) - beta_h(V)*h
dn/dt = alpha_n(V)*(1-n) - beta_n(V)*n`,
        keyTakeaways: [
          'm variable: Na+ channel activation gate (fast).',
          'h variable: Na+ channel inactivation gate (slow).',
          'n variable: K+ channel activation gate (slow).'
        ]
      }
    ],
    tags: ['Action Potential', 'Hodgkin-Huxley', 'Ion Channels', 'Depolarization']
  },
  {
    id: 'node-0-3',
    category: 'brain',
    title: '3. Cerebral Cortex Anatomy & Cortical Lobes',
    subtitle: 'Functional neuroanatomy, Brodmann areas, and subcortical limbic structures',
    level: 'Beginner',
    readTime: '8 min read',
    summary: 'Detailed anatomical guide to Frontal, Parietal, Temporal, and Occipital lobes, subcortical Thalamus, Hippocampus, and Cerebellum.',
    sections: [
      {
        heading: '1. The Four Primary Cortical Lobes',
        content: `The human cerebral cortex is a 2-4 mm thick sheet of grey matter containing 6 histological layers (I to VI).
- Frontal Lobe: Located anterior to the central sulcus. Contains Primary Motor Cortex (M1, Brodmann Area 4 - motor homunculus), Prefrontal Cortex (executive decision-making), and Broca's Area (BA 44/45 - motor speech production).
- Parietal Lobe: Located posterior to central sulcus. Contains Primary Somatosensory Cortex (S1, BA 1-3 - touch, pain, temperature) and spatial orientation networks.
- Temporal Lobe: Located inferior to Sylvian fissure. Houses Primary Auditory Cortex (BA 41/42), Wernicke's Area (BA 22 - language comprehension), and medial Hippocampus (declarative memory).
- Occipital Lobe: Posterior pole. Contains Primary Visual Cortex (V1 / BA 17 - striate cortex receiving retinotopic signals from LGN).`,
        keyTakeaways: [
          'Layer IV receives thalamic sensory inputs; Layer V contains large Betz pyramidal neurons projecting down corticospinal motor tracts.',
          'Left hemisphere dominates language in >95% of right-handed individuals.'
        ]
      },
      {
        heading: '2. Subcortical Structures & Limbic Network',
        content: `Beneath the cortex lie essential subcortical structures:
- Thalamus: The grand sensory relay station routing all sensory modalities (except olfaction) to respective cortical areas.
- Hypothalamus: Regulates autonomic nervous system, endocrine hormones, and homeostasis.
- Hippocampus & Amygdala: Primary structures for memory consolidation and emotional valence (fear conditioning).
- Cerebellum & Brainstem (Pons/Medulla): Cerebellum manages motor coordination and balance with 50 billion Purkinje cells; Brainstem controls cardiac and respiratory life functions.`,
        keyTakeaways: [
          'Corpus Callosum: Heavy bundle of 200 million axonal fibers connecting left and right cerebral hemispheres.',
          'Basal Ganglia: Striatum, Globus Pallidus, and Substantia Nigra control voluntary movement initiation (damaged in Parkinson\'s disease).'
        ]
      }
    ],
    tags: ['Anatomy', 'Cortical Lobes', 'Thalamus', 'Hippocampus', 'Cerebellum']
  },
  {
    id: 'node-1-1',
    category: 'bci',
    title: '4. Non-Invasive EEG & 10-20 Electrode Placement',
    subtitle: 'Scalp microvolts, 10-20 system geometry, and brain frequency bands',
    level: 'Beginner',
    readTime: '8 min read',
    summary: 'Understanding non-invasive Electroencephalography (EEG), scalp electrode positions, volume conduction, and frequency band decomposition.',
    sections: [
      {
        heading: 'International 10-20 System Geometry',
        content: `Electroencephalography (EEG) records synchronized postsynaptic dendritic currents generated by thousands of radially oriented cortical pyramidal neurons.
The International 10-20 System standardizes electrode positions based on 10% and 20% fractional distances between anatomical landmarks:
- Nasion (bridge of nose) to Inion (occipital protuberance).
- Preauricular points (left to right ear).

Channel Naming Convention:
- Letters indicate brain region: F (Frontal), C (Central/Sensorimotor), P (Parietal), O (Occipital), T (Temporal).
- Numbers: Odd numbers (1,3,5) on Left hemisphere; Even numbers (2,4,6) on Right hemisphere; 'z' indicates Zero/Midline (Fz, Cz, Pz, Oz).`,
        keyTakeaways: [
          'Cz sits at the exact vertex of the scalp.',
          'C3 and C4 sit over left and right primary motor cortices (critical for Motor Imagery BCI).',
          'O1 and O2 sit over visual cortex (critical for SSVEP BCI).'
        ]
      },
      {
        heading: 'EEG Frequency Band Spectrum',
        content: `EEG signals range in amplitude from 10 to 100 microvolts (uV) and are decomposed into distinct frequency bands:
- Delta (0.5 - 4 Hz): High amplitude, associated with deep NREM sleep and brain pathology.
- Theta (4 - 8 Hz): Drowsiness, deep meditation, and memory encoding.
- Alpha / Mu (8 - 12 Hz): Relaxed wakefulness with eyes closed (Alpha at Oz) and sensorimotor idle rhythm (Mu rhythm at C3/C4). Suppressed during motor execution/imagery.
- Beta (13 - 30 Hz): Active cognition, motor execution, and heightened alertness.
- Gamma (30 - 100+ Hz): High-level cognitive processing, sensory binding, and conscious attention.`,
        keyTakeaways: [
          'High temporal resolution (~1 millisecond), limited spatial resolution (~1-2 centimeters due to skull volume conduction).',
          'Artifacts: EOG eye blinks (1-4 Hz, up to 500 uV), EMG muscle noise (20-200 Hz), 50/60 Hz powerline hum.'
        ]
      }
    ],
    tags: ['EEG', '10-20 System', 'Alpha', 'Beta', 'Gamma', 'Microvolts']
  },
  {
    id: 'node-1-2',
    category: 'bci',
    title: '5. Invasive ECoG & Utah Intracortical Microelectrode Arrays',
    subtitle: 'Subdural grids, neural spike sorting, and sub-millimeter precision',
    level: 'Intermediate',
    readTime: '9 min read',
    summary: 'Comparing semi-invasive Electrocorticography (ECoG) and invasive Utah Array microelectrodes for high-bandwidth neural decoding.',
    sections: [
      {
        heading: 'Semi-Invasive ECoG vs Invasive Utah Arrays',
        content: `When high signal-to-noise ratio (SNR) is required for speech decoding or robotic limb control, clinical BCIs utilize subdural or intracortical implants:
1. Electrocorticography (ECoG / iEEG): Electrodes placed directly on the cortical surface beneath the dura mater. Provides millimeter spatial resolution and high-gamma bandwidth (70-150 Hz) without skull dampening.
2. Utah Microelectrode Array: A 10x10 grid of silicon micro-needles (1.0 - 1.5 mm long) inserted directly into Layer V of motor or sensory cortex. Captures single-unit action potential spikes (SUA) and local field potentials (LFP).
3. Neuralink Flexible Threads: Ultra-fine polymer threads inserted via robotic neurosurgery, containing up to 3,072 electrode channels.`,
        keyTakeaways: [
          'Zero skull attenuation allows recording high-gamma power directly proportional to population spiking.',
          'Trade-off: Requires craniotomy surgery and risks long-term glial scar encapsulation.'
        ]
      }
    ],
    tags: ['ECoG', 'Utah Array', 'Neuralink', 'Invasive BCI', 'High Gamma']
  },
  {
    id: 'node-1-3',
    category: 'bci',
    title: '6. Core BCI Paradigms: Motor Imagery, SSVEP & P300',
    subtitle: 'The 3 dominant paradigms translating brain intent into external action',
    level: 'Intermediate',
    readTime: '10 min read',
    summary: 'In-depth guide to Motor Imagery ERD/ERS, SSVEP visual frequency resonance, and P300 oddball event-related potentials.',
    sections: [
      {
        heading: '1. Motor Imagery (MI) BCI Paradigm',
        content: `Motor Imagery relies on the user imagining movement of a body part (e.g., left hand, right hand, feet, tongue) without physical muscle execution.
Mechanisms:
- Event-Related Desynchronization (ERD): Imagining right hand movement causes a drop in Mu (8-12Hz) and Beta (13-30Hz) power over contralateral left motor cortex (electrode C3).
- Event-Related Synchronization (ERS): Upon stopping movement imagery, Mu/Beta power rebounds above baseline.`,
        keyTakeaways: [
          'Endogenous BCI: Requires no external sensory stimulation.',
          'Commonly used for controlling prosthetic hands, wheelchairs, and neurorehabilitation games.'
        ]
      },
      {
        heading: '2. SSVEP & P300 Paradigms',
        content: `Exogenous BCI paradigms rely on visual cues:
- Steady-State Visually Evoked Potentials (SSVEP): Staring at a target flickering at frequency $f_0$ (e.g. 12 Hz) elicits a strong harmonic neural response at $f_0, 2f_0, 3f_0$ over visual cortex (electrodes O1, O2, Oz). Achieves highest Information Transfer Rate (ITR > 100 bits/min).
- P300 Event-Related Potential: In a grid speller, rows and columns flash randomly. Staring at target letter "A" produces a sharp positive voltage deflection ~300ms after target flashes (Oddball effect).`,
        keyTakeaways: [
          'SSVEP needs minimal user calibration.',
          'P300 spellers enable paralyzed patients to type text at 10-15 words per minute.'
        ]
      }
    ],
    tags: ['Motor Imagery', 'SSVEP', 'P300', 'ERD/ERS', 'BCI Paradigms']
  },
  {
    id: 'node-2-1',
    category: 'nn',
    title: '7. Common Spatial Patterns (CSP) Algorithm',
    subtitle: 'Optimal spatial variance filtering for multi-channel Motor Imagery',
    level: 'Intermediate',
    readTime: '9 min read',
    summary: 'Mathematical formulation of CSP spatial covariance matrix diagonalizing and feature extraction for BCI classification.',
    sections: [
      {
        heading: 'Mathematical Derivation of CSP',
        content: `Common Spatial Patterns (CSP) is a spatial filtering technique that maximizes the variance of spatially filtered EEG signals for one class while minimizing it for another class:`,
        codeOrFormula: `1. Calculate normalized spatial covariance matrices:
C_1 = (E_1 * E_1^T) / trace(E_1 * E_1^T)
C_2 = (E_2 * E_2^T) / trace(E_2 * E_2^T)

2. Composite covariance: C_c = C_1 + C_2
3. EIG decomposition of C_c: C_c = U * lambda * U^T
4. Whitening transformation: P = lambda^(-1/2) * U^T
5. EIG of transformed matrix: S_1 = P * C_1 * P^T = B * lambda_1 * B^T
6. Spatial Filter Matrix: W = B^T * P`,
        keyTakeaways: [
          'Log-variance of filtered channels forms optimal feature vectors for LDA or SVM classifiers.',
          'Filters highlight active sensorimotor cortex regions while dampening distant noise.'
        ]
      }
    ],
    tags: ['CSP', 'Spatial Filtering', 'Covariance', 'Matrix Decomposition']
  },
  {
    id: 'node-2-2',
    category: 'nn',
    title: '8. EEGNet Convolutional Deep Neural Architecture',
    subtitle: 'Compact end-to-end deep learning pipeline for EEG classification',
    level: 'Advanced',
    readTime: '10 min read',
    summary: 'Comprehensive analysis of EEGNet architecture: temporal bandpass convs, depthwise spatial filters, separable convs, and PyTorch execution.',
    sections: [
      {
        heading: 'EEGNet Architecture Breakdown',
        content: `EEGNet is a lightweight Convolutional Neural Network specifically tailored for EEG-based BCI applications.
Three Core Layers:
1. Temporal Convolution: Learns frequency-domain bandpass filters across raw EEG time-series data using $1 \\times F_s/2$ kernels.
2. Depthwise Spatial Convolution: Learns spatial channel weights ($C \\times 1$) across electrode positions, serving as a neural-network equivalent of CSP spatial filters.
3. Separable Convolution: Combines pointwise and spatial convolutions to summarize temporal-spatial features into classification logits.`,
        codeOrFormula: `// PyTorch EEGNet Layer Summary
class EEGNet(nn.Module):
    def __init__(self, channels=64, samples=128, num_classes=4):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 8, (1, 64), padding=(0, 32), bias=False)
        self.depthwise = nn.Conv2d(8, 16, (channels, 1), groups=8, bias=False)
        self.separable = nn.Conv2d(16, 32, (1, 16), padding=(0, 8), bias=False)
        self.fc = nn.Linear(32 * (samples // 32), num_classes)`,
        keyTakeaways: [
          'Extremely compact (~2,000 trainable parameters), preventing overfitting on small EEG datasets.',
          'Consistently achieves SOTA performance across Motor Imagery, P300, and SSVEP benchmarks.'
        ]
      }
    ],
    tags: ['EEGNet', 'CNN', 'PyTorch', 'Depthwise Convolution', 'Deep Learning']
  },
  {
    id: 'node-2-3',
    category: 'nn',
    title: '9. Spiking Neural Networks (SNN) & Neuromorphic Computing',
    subtitle: 'Leaky Integrate-and-Fire (LIF) dynamics and event-driven computing',
    level: 'Advanced',
    readTime: '10 min read',
    summary: 'Bio-realistic 3rd generation neural networks processing temporal discrete spike events with milliwatt efficiency.',
    sections: [
      {
        heading: 'Leaky Integrate-and-Fire (LIF) Spike Dynamics',
        content: `Spiking Neural Networks (SNNs) replace smooth continuous activation functions (ReLU, Sigmoid) with bio-realistic discrete temporal spike trains.
LIF Differential Equation:
$$\\tau_m \\frac{dV(t)}{dt} = -(V(t) - V_{rest}) + R_m I(t)$$
When $V(t) \\ge V_{th}$, the neuron emits a discrete spike $S(t) = 1$, and $V(t)$ resets to $V_{reset}$.`,
        keyTakeaways: [
          'Spike-Timing-Dependent Plasticity (STDP): Unsupervised biological learning rule where synaptic strength adjusts based on millisecond arrival timing.',
          'Neuromorphic Hardware: Chips like Intel Loihi and BrainScaleS compute with 100x lower milliwatt power than traditional GPUs.'
        ]
      }
    ],
    tags: ['SNN', 'LIF', 'Neuromorphic', 'Intel Loihi', 'STDP']
  },
  {
    id: 'node-3-1',
    category: 'gan',
    title: '10. GANs & WGAN-GP for EEG Data Augmentation',
    subtitle: 'Overcoming EEG sample scarcity using Wasserstein Gradient Penalty',
    level: 'Advanced',
    readTime: '11 min read',
    summary: 'Generative Adversarial Networks for multi-channel synthetic EEG generation, Wasserstein distance, and artifact removal.',
    sections: [
      {
        heading: 'WGAN-GP Formulation & Synthetic Signal Synthesis',
        content: `BCI datasets are severely limited by subject fatigue. Generative Adversarial Networks (GANs) solve data scarcity by learning the underlying distribution of multi-channel EEG signals.
Standard GANs suffer from mode collapse on non-stationary EEG data. WGAN-GP replaces Jenson-Shannon divergence with Earth Mover's (Wasserstein) Distance and enforces a 1-Lipschitz continuity condition via Gradient Penalty:`,
        codeOrFormula: `// WGAN-GP Loss Function
L_D = E[D(x_fake)] - E[D(x_real)] + lambda * E[( ||grad_x_hat D(x_hat)||_2 - 1 )^2]
L_G = -E[D(G(z))]`,
        keyTakeaways: [
          'Data augmentation with synthetic WGAN-GP trials improves downstream BCI accuracy by 15-25%.',
          'Enables cross-subject transfer learning across diverse EEG headsets.'
        ]
      }
    ],
    tags: ['GAN', 'WGAN-GP', 'Synthetic EEG', 'Data Augmentation', 'Generator']
  },
  {
    id: 'node-3-2',
    category: 'vit',
    title: '11. Vision Transformers (ViT) & Self-Attention in BCI',
    subtitle: 'Spatial-temporal patch tokenization and global brain attention',
    level: 'Advanced',
    readTime: '12 min read',
    summary: 'Applying transformer self-attention to 2D/3D EEG spectrograms and topographical maps for global neural correlation extraction.',
    sections: [
      {
        heading: 'Patch Tokenization & Multi-Head Self-Attention',
        content: `Vision Transformers (ViT) adapt self-attention to neuroimaging data. 2D EEG topographical maps or spectrograms are split into spatial-temporal patches $P_i$. Linear projections embed patches into tokens enriched with 2D spatial electrode positional embeddings and 1D temporal embeddings.`,
        codeOrFormula: `// Multi-Head Self Attention (MHSA)
Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V
where Q = X*W_Q, K = X*W_K, V = X*W_V`,
        keyTakeaways: [
          'Captures non-local functional connectivity across distant cortical lobes (e.g. Frontal-Occipital coupling).',
          'Robust against channel dropout or noisy electrodes.'
        ]
      }
    ],
    tags: ['ViT', 'Transformer', 'Self-Attention', 'EEG-ViT', 'Spectrogram']
  },
  {
    id: 'node-4-1',
    category: 'gai',
    title: '12. Mind-Vis: Brain-to-Image Reconstruction via Diffusion',
    subtitle: 'fMRI continuous voxel signals -> Latent Diffusion image synthesis',
    level: 'Advanced',
    readTime: '14 min read',
    summary: 'Translating fMRI BOLD visual cortex activity into high-definition synthetic images using CLIP conditioning and Latent Diffusion Models.',
    sections: [
      {
        heading: 'Mind-Vis Latent Diffusion Pipeline',
        content: `Generative AI now enables direct visual reconstruction of what a human is viewing from brain activity:
1. fMRI BOLD Scan: Captures blood-oxygenation-level-dependent voxel responses across visual cortex V1-V4 while subject views images.
2. Sparse Neural Encoder: Translates 3D voxel matrices into 512D CLIP visual embedding vectors.
3. Conditioned Latent Diffusion: Stable Diffusion model receives decoded brain CLIP embedding as cross-attention condition, progressively removing Gaussian noise over 50 steps to produce HD images with >85% semantic accuracy.`,
        codeOrFormula: `// Latent Diffusion Conditioning Loss
L_simple = E_t,z,c,epsilon [ || epsilon - epsilon_theta(z_t, t, c_brain) ||^2 ]`,
        keyTakeaways: [
          'Reconstructs semantic visual details (e.g. animals, landscapes, faces) directly from human visual cortex.',
          'Bridge between non-invasive neuroimaging and generative foundation models.'
        ]
      }
    ],
    tags: ['Mind-Vis', 'fMRI', 'Diffusion', 'Brain-to-Image', 'Generative AI']
  },
  {
    id: 'node-4-2',
    category: 'gai',
    title: '13. Speech Reconstruction from ECoG Activity',
    subtitle: 'Decoding Broca area motor speech intent into natural audio',
    level: 'Advanced',
    readTime: '15 min read',
    summary: 'Direct synthesis of fluent spoken words and vocal tract kinematics from high-density ECoG recording over Broca & motor speech cortex.',
    sections: [
      {
        heading: 'ECoG Speech Decoding & Vocal Tract Kinematics',
        content: `For patients with severe vocal paralysis or ALS, high-density ECoG grids placed over Broca's area (BA 44/45) and ventral sensorimotor cortex decode silent speech intent:
1. High-Gamma Extraction (70-150 Hz): Captures neural power proportional to articulatory muscle movement intent.
2. Recurrent Transformer: Maps high-gamma power sequences to 3D vocal tract kinematics (jaw, lip, tongue, and larynx movement parameters).
3. Neural Vocoder (WaveNet / HiFi-GAN): Synthesizes natural spoken audio output at 78+ words per minute with low word error rate.`,
        keyTakeaways: [
          'Decodes silent unspoken speech intent in real time.',
          'Restores natural voice communication and digital avatar speech for paralyzed individuals.'
        ]
      }
    ],
    tags: ['ECoG Speech', 'Broca Area', 'Vocoder', 'Brain-to-Text', 'Neural Decoding']
  }
];

