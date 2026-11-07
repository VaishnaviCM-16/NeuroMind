export interface HandwrittenQA {
  id: number;
  question: string;
  category: string;
  difficulty: 'Scratch / Basic' | 'Intermediate' | 'Advanced BCI';
  shortAnswer: string;
  detailedExplanation: string;
  mindMapNodes: string[];
  keyFormulaOrConcept?: string;
  bciRelevance: string;
}

export const HANDWRITTEN_QA_DATA: HandwrittenQA[] = [
  // CATEGORY 1: Brain Anatomy & Functional Regions (Q1 - Q6)
  {
    id: 1,
    question: "What are all the major parts of human brain & their functions?",
    category: "Brain Anatomy & Regions",
    difficulty: "Scratch / Basic",
    shortAnswer: "The human brain comprises three main divisions: Cerebrum (higher cognition, senses, motor control), Cerebellum (coordination, motor memory, timing), and Brainstem (vital autonomic functions like respiration and heart rate).",
    detailedExplanation: "1. **Cerebrum**: Divided into left and right hemispheres and four lobes (Frontal, Parietal, Temporal, Occipital). Controls voluntary movement, reasoning, perception, speech, and emotion.\n2. **Cerebellum** ('Little Brain'): Situated at the posterior base; calculates motor error corrections, fine-tunes movement timing, and maintains posture.\n3. **Brainstem** (Midbrain, Pons, Medulla Oblongata): Connects the cerebrum to the spinal cord. Controls involuntary life-sustaining processes (cardiac function, blood pressure, breathing, swallowing, sleep cycles).",
    mindMapNodes: ["Human Brain", "Cerebrum (Cognition/Motor)", "Cerebellum (Coordination)", "Brainstem (Autonomic Life Support)"],
    keyFormulaOrConcept: "Volumetric Brain Hierarchy: Telencephalon -> Diencephalon -> Mesencephalon -> Metencephalon -> Myelencephalon",
    bciRelevance: "BCIs target specific regions—mostly the motor cortex in the Cerebrum for movement decoding, and the occipital lobe for visual evoked potentials (SSVEP)."
  },
  {
    id: 2,
    question: "Why is cerebrum considered center of intelligence?",
    category: "Brain Anatomy & Regions",
    difficulty: "Scratch / Basic",
    shortAnswer: "The cerebrum contains the cerebral cortex—an expanded 6-layered sheet of 16+ billion neurons responsible for abstraction, reasoning, language, problem solving, and intentional decision making.",
    detailedExplanation: "The cerebrum's outer layer (neocortex) exhibits deep folding (gyri and sulci) which massively increases surface area (~2,500 cm²). It hosts specialized association cortices that integrate multisensory inputs, enable working memory, perform symbolic language processing in Broca's and Wernicke's areas, and execute long-term goal planning in the prefrontal cortex.",
    mindMapNodes: ["Cerebrum", "Neocortex Folding (Gyri/Sulci)", "Association Cortices", "Abstract Reasoning & Language"],
    bciRelevance: "High-level cognitive BCIs decode intent, speech, and symbolic decisions directly from cortical activity in the prefrontal and parietal cerebrum."
  },
  {
    id: 3,
    question: "Which brain regions control movement, speech, memory, vision, hearing & emotions?",
    category: "Brain Anatomy & Regions",
    difficulty: "Scratch / Basic",
    shortAnswer: "Movement: Primary Motor Cortex (M1, Frontal Lobe). Speech: Broca's & Wernicke's Areas. Memory: Hippocampus (Temporal Lobe). Vision: Occipital Lobe. Hearing: Auditory Cortex (Temporal Lobe). Emotions: Amygdala & Limbic System.",
    detailedExplanation: "• **Movement**: Precentral gyrus (M1) and supplementary motor area (SMA).\n• **Speech**: Broca's area (speech production) & Wernicke's area (language comprehension).\n• **Memory**: Hippocampus and surrounding medial temporal structures.\n• **Vision**: Primary visual cortex (V1) in the posterior occipital lobe.\n• **Hearing**: Superior temporal gyrus (A1).\n• **Emotions**: Amygdala, anterior cingulate cortex, and ventral striatum.",
    mindMapNodes: ["Cortical Mapping", "M1 -> Movement", "V1 -> Vision", "A1 -> Hearing", "Broca/Wernicke -> Speech", "Hippocampus -> Memory", "Amygdala -> Emotion"],
    bciRelevance: "Electrode placement directly targets these regions: C3/C4 over M1 for motor BCIs, O1/O2 over V1 for visual BCIs."
  },
  {
    id: 4,
    question: "How do the left & right hemispheres differ?",
    category: "Brain Anatomy & Regions",
    difficulty: "Scratch / Basic",
    shortAnswer: "The left hemisphere dominates sequential, analytical, logic, and speech production tasks for most right-handed people. The right hemisphere specializes in spatial processing, pattern recognition, holism, and emotional tone.",
    detailedExplanation: "Although connected by the 200+ million nerve fibers of the **corpus callosum**, lateralization exists:\n• **Left Hemisphere**: Sequential processing, syntactic language (Broca's/Wernicke's), mathematical logic, and contralateral control of the right body side.\n• **Right Hemisphere**: Spatial orientation, face processing (Fusiform Face Area), musical pitch perception, prosody in speech, and contralateral control of the left body side.",
    mindMapNodes: ["Cerebral Hemispheres", "Corpus Callosum", "Left (Analytical/Language/Right-body)", "Right (Spatial/Holistic/Left-body)"],
    keyFormulaOrConcept: "Contralateral Motor Mapping: Left M1 controls Right Limb; Right M1 controls Left Limb.",
    bciRelevance: "Left-hand vs. Right-hand motor imagery causes lateralized ERD (Event-Related Desynchronization) in opposite hemispheres (C3 vs C4 electrodes)."
  },
  {
    id: 5,
    question: "What is brain plasticity (neuroplasticity) & why is it imp?",
    category: "Brain Anatomy & Regions",
    difficulty: "Scratch / Basic",
    shortAnswer: "Neuroplasticity is the brain's ability to structurally and functionally reorganize itself by forming new neural pathways and adjusting synaptic weights in response to learning, experience, or injury.",
    detailedExplanation: "Neuroplasticity operates via two primary mechanisms:\n1. **Synaptic Plasticity**: Strengthening or weakening individual connections (Long-Term Potentiation - LTP, Long-Term Depression - LTD).\n2. **Structural Plasticity**: Dendritic spine sprouting, neurogenesis, and axonal rerouting.\nIt allows stroke survivors to relearn motor skills and enables humans to adapt to artificial prosthetic devices and BCI controllers.",
    mindMapNodes: ["Neuroplasticity", "Synaptic Plasticity (LTP/LTD)", "Structural Plasticity (Sprouting)", "Recovery & BCI Adaptation"],
    bciRelevance: "BCI usage induces closed-loop neuroplasticity—training users to intentionally modulate brain rhythms through neurofeedback."
  },
  {
    id: 6,
    question: "Which brain regions are most imp for BCI applications?",
    category: "Brain Anatomy & Regions",
    difficulty: "Intermediate",
    shortAnswer: "1. Primary Motor Cortex (M1) & Premotor Area (Motor Imagery BCIs)\n2. Occipital Cortex V1 (SSVEP Visual BCIs)\n3. Parietal Cortex P300 Area (Event-Related Potential Spellers)\n4. Prefrontal Cortex (Cognitive workload & Passive BCIs).",
    detailedExplanation: "• **Sensorimotor Cortex (C3, Cz, C4)**: Decodes movement intent (hand, foot, tongue imagery).\n• **Occipital Lobe (O1, Oz, O2)**: Captures photic driving responses (SSVEP) for visual gaze spellers.\n• **P300 Parietal Area (Pz, P3, P4)**: Detects target recognition spikes ~300ms after stimulus presentation in oddball paradigms.\n• **Frontal Lobe (Fz, F3, F4)**: Tracks mental fatigue, focus, and emotional valence.",
    mindMapNodes: ["BCI Target Cortices", "M1 (Motor Imagery - C3/C4)", "V1 (SSVEP - O1/O2)", "Parietal (P300 - Pz)", "Frontal (Workload - Fz)"],
    bciRelevance: "Electrode caps are engineered specifically around these key BCI target cortices."
  },

  // CATEGORY 2: Neurons, Action Potentials & Biophysics (Q7 - Q18)
  {
    id: 7,
    question: "What exactly is a neuron, how is it different from other body cells?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Scratch / Basic",
    shortAnswer: "A neuron is an electrically excitable cell specialized for sending, receiving, and processing information via action potentials and neurotransmitters. Unlike typical somatic cells, mature neurons do not undergo mitosis and possess specialized processes (dendrites & axons).",
    detailedExplanation: "While neurons share common organelles (nucleus, mitochondria, ribosomes) with liver or skin cells, they are distinguished by:\n1. **Excitable Membranes**: Dense voltage-gated ion channels.\n2. **Morphological Polarization**: Highly branched dendrites to receive inputs, and a long axon (up to 1 meter) to transmit outputs.\n3. **Synaptic Machinery**: Vesicular release mechanisms for chemical transmission.\n4. **Post-Mitotic State**: Most mature neurons cannot divide or replicate.",
    mindMapNodes: ["Neuron Structure", "Soma (Cell Body)", "Dendrites (Input)", "Axon (Output Line)", "Synapse (Chemical Junction)"],
    bciRelevance: "Understanding neuron excitation is fundamental to interpreting the extracellular electrical field potentials captured by EEG and invasive microelectrodes."
  },
  {
    id: 8,
    question: "What are dendrites, axons, synapses & myelin sheath?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Scratch / Basic",
    shortAnswer: "• Dendrites: Tree-like branches receiving signals.\n• Axon: Single long cable propagating action potentials away from soma.\n• Synapse: Microscopic gap where chemical/electrical transmission occurs.\n• Myelin Sheath: Fatty insulating layer that accelerates propagation speed.",
    detailedExplanation: "• **Dendrites**: Collect postsynaptic potentials (PSPs) from thousands of presynaptic terminals.\n• **Axon**: Originates at the axon hillock; transmits action potentials across distances via saltatory conduction.\n• **Synapse**: Presynaptic terminal releases neurotransmitters into the 20nm synaptic cleft to bind postsynaptic receptors.\n• **Myelin Sheath**: Produced by Schwann cells (PNS) or Oligodendrocytes (CNS). Nodes of Ranvier between myelin segments boost conduction speed up to 120 m/s.",
    mindMapNodes: ["Neuron Components", "Dendrite (Receiver)", "Axon (Transmitter)", "Myelin Sheath (Insulation)", "Nodes of Ranvier (Boosters)", "Synapse (Signal Bridge)"],
    keyFormulaOrConcept: "Saltatory Conduction: Action potentials jump node-to-node across Nodes of Ranvier.",
    bciRelevance: "Myelinated axon tracts form white matter pathways; postsynaptic dendritic potentials generate measurable surface EEG waves."
  },
  {
    id: 9,
    question: "How does a neuron generate an electrical signal?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Scratch / Basic",
    shortAnswer: "By establishing concentration gradients across its membrane using Na+/K+ ATP pumps, then opening voltage-gated ion channels when the axon hillock reaches threshold (-55 mV), triggering rapid Na+ influx.",
    detailedExplanation: "At rest, the inside of the neuron is -70 mV relative to extracellular fluid. When excitatory postsynaptic potentials (EPSPs) summate at the axon hillock to reach threshold (-55 mV):\n1. Voltage-gated Na+ channels rapidly open -> Na+ rushes in -> Depolarization spike to +30 mV.\n2. Na+ channels inactivation gates close -> Voltage-gated K+ channels open -> K+ rushes out -> Repolarization.\n3. Transient Hyperpolarization (-80 mV) occurs before resting potential (-70 mV) is restored.",
    mindMapNodes: ["Action Potential Steps", "Resting State (-70mV)", "Threshold (-55mV)", "Depolarization (+30mV Na+ Influx)", "Repolarization (K+ Efflux)", "Hyperpolarization (-80mV)"],
    keyFormulaOrConcept: "Hodgkin-Huxley Equation: I_m = C_m(dV/dt) + g_Na(V-V_Na) + g_K(V-V_K) + g_L(V-V_L)",
    bciRelevance: "Invasive BCIs (Utah arrays) record single-unit spikes directly generated by these axonal action potentials."
  },
  {
    id: 10,
    question: "Why do neurons communicate using both electrical & chemical signals?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Intermediate",
    shortAnswer: "Electrical signals (action potentials) provide ultra-fast, long-distance lossless propagation down the axon. Chemical signals (synapses) allow complex signal integration, amplification, inhibition, and plastic weight adjustments.",
    detailedExplanation: "• **Electrical Signals**: Fast, binary (all-or-none) propagation over distances without signal decay.\n• **Chemical Signals**: Flexible, analog modulation at the synapse. Allows excitation (glutamate) vs. inhibition (GABA), gain control, summation of inputs, and long-term memory encoding via receptor modification.",
    mindMapNodes: ["Dual Signaling", "Electrical (Fast/Binary Long-Distance)", "Chemical (Flexible/Modulatory/Synaptic Integration)"],
    bciRelevance: "BCIs interface electrically with the brain, but neurotransmitter chemistry determines overall cortical excitability and signal-to-noise ratio."
  },
  {
    id: 11,
    question: "What happens if neurons are damaged?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Scratch / Basic",
    shortAnswer: "Damaged neurons suffer membrane disruption, loss of membrane potential, cellular swelling, and may undergo apoptosis (programmed cell death) or necrosis, severing local neural circuits.",
    detailedExplanation: "Trauma, stroke (ischemia), or neurodegenerative diseases deprive neurons of oxygen and glucose. Without ATP, the Na+/K+ pump fails, leading to toxic intracellular accumulation of Ca2+ (excitotoxicity), free radical generation, mitochondrial collapse, and loss of functional connectivity in affected brain circuits.",
    mindMapNodes: ["Neuronal Injury", "ATP Depletion", "Na+/K+ Pump Failure", "Excitotoxicity (Ca2+ Overload)", "Cellular Apoptosis / Necrosis"],
    bciRelevance: "BCIs bypass damaged neural pathways by capturing intact intent signals upstream of the injury site and re-routing them to external actuators."
  },
  {
    id: 12,
    question: "Can neurons regenerate?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Intermediate",
    shortAnswer: "In the Peripheral Nervous System (PNS), axons can regenerate if Schwann cell pathways remain intact. In the Central Nervous System (CNS - brain and spinal cord), axonal regeneration is extremely limited due to glial scars and inhibitory proteins (Nogo-A).",
    detailedExplanation: "CNS astrocytes form a physical barrier (glial scar) and release chondroitin sulfate proteoglycans (CSPGs) that block axon outgrowth. Microglia and oligodendrocytes express inhibitory myelin proteins. Limited neurogenesis occurs only in specific CNS niches (dentate gyrus of hippocampus and subventricular zone).",
    mindMapNodes: ["Neuronal Regeneration", "PNS (Schwann Cells enable regrowth)", "CNS (Glial Scar & Nogo-A inhibit regrowth)", "Hippocampal Neurogenesis"],
    bciRelevance: "Because CNS pathways do not naturally regenerate after spinal cord injury, BCIs provide permanent technological neural bypasses."
  },
  {
    id: 13,
    question: "What is the resting membrane potential?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Intermediate",
    shortAnswer: "The electrical voltage difference across a non-excited neuron's membrane, typically -70 mV (inside negative relative to outside).",
    detailedExplanation: "Maintained by:\n1. **Na+/K+ ATPase Pump**: Actively pumps 3 Na+ ions OUT for every 2 K+ ions IN (electrogenic).\n2. **K+ Leak Channels**: Membrane is far more permeable to K+ than Na+ at rest, allowing K+ to diffuse out down its concentration gradient until electrical attraction balances it.\n3. **Intracellular Anions**: Impermeable negatively charged proteins trapped inside the soma.",
    mindMapNodes: ["Resting Potential (-70mV)", "Na+/K+ ATPase (3 Na+ Out / 2 K+ In)", "K+ Leak Channels", "Intracellular Fixed Anions"],
    keyFormulaOrConcept: "Goldman-Hodgkin-Katz (GHK) Voltage Equation: V_m = (RT/F) * ln( (P_K[K+]_o + P_Na[Na+]_o + P_Cl[Cl-]_i) / (P_K[K+]_i + P_Na[Na+]_i + P_Cl[Cl-]_o) )",
    bciRelevance: "Fluctuations in resting potentials across large populations of pyramidal cells create the field potentials recorded by EEG."
  },
  {
    id: 14,
    question: "How is an action potential generated?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Intermediate",
    shortAnswer: "Triggered at the axon hillock when local EPSPs depolarize membrane potential to threshold (-55 mV), triggering an explosive positive feedback loop of voltage-gated Na+ channel opening.",
    detailedExplanation: "1. Resting state (-70 mV).\n2. Dendritic inputs depolarize membrane to -55 mV threshold.\n3. Voltage-gated Na+ channels rapidly open -> Na+ rushes inside -> Depolarization peak (+30 mV).\n4. Na+ channel inactivation gates snap shut.\n5. Delayed rectifier K+ channels open -> K+ rushes out -> Repolarization.\n6. Hyperpolarization overshoot (-80 mV) -> Na+/K+ pump restores -70 mV resting state.",
    mindMapNodes: ["Action Potential Generation", "EPSP Summation", "Threshold -55mV", "Na+ Influx (Upstroke)", "K+ Efflux (Downstroke)", "Refractory Period"],
    bciRelevance: "Invasive spike sorting algorithms isolate individual action potentials from microelectrode channel recordings."
  },
  {
    id: 15,
    question: "Which ions (Na+, K+, Ca2+, Cl-) are involved?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Intermediate",
    shortAnswer: "• Na+ (Sodium): Influx causes Depolarization (Excitation).\n• K+ (Potassium): Efflux causes Repolarization/Hyperpolarization.\n• Ca2+ (Calcium): Triggers synaptic vesicle release at presynaptic axon terminal.\n• Cl- (Chloride): Influx causes Hyperpolarization (Inhibition via GABA).",
    detailedExplanation: "• **Na+**: High extracellular concentration (~145 mM vs 15 mM in).\n• **K+**: High intracellular concentration (~140 mM vs 4 mM out).\n• **Ca2+**: Extremely low intracellular concentration (~0.0001 mM vs 2 mM out). Entry triggers exocytosis of neurotransmitter vesicles.\n• **Cl-**: High extracellular concentration (~110 mM vs 10 mM in). Entry stabilizes membrane below threshold (IPSP).",
    mindMapNodes: ["Ion Mechanics", "Na+ (Depolarization)", "K+ (Repolarization)", "Ca2+ (Synaptic Release)", "Cl- (Inhibition)"],
    keyFormulaOrConcept: "Nernst Ion Equilibrium Potential: E_ion = (RT / zF) * ln([Ion]_out / [Ion]_in)",
    bciRelevance: "Ion dynamics dictate the frequency spectrum of local field potentials (LFPs)."
  },
  {
    id: 16,
    question: "Why is depolarization followed by repolarization?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Intermediate",
    shortAnswer: "To reset the membrane potential back to negative values so the neuron can fire subsequent action potentials and avoid continuous, uncontrolled firing (seizures).",
    detailedExplanation: "If repolarization did not occur, the neuron would remain stuck at +30 mV in an inactivated, non-responsive state. Repolarization (driven by K+ efflux and Na+ channel inactivation) restores the negative voltage required for Na+ channels to transition from inactivated to closed state, making them ready for the next stimulation.",
    mindMapNodes: ["Repolarization Necessity", "Prevents Continuous Firing / Excitotoxicity", "Resets Voltage-Gated Na+ Channels", "Enables Frequency Coding of Information"],
    bciRelevance: "Action potential firing rate (Hz) encodes movement vector magnitude in motor BCI decoders."
  },
  {
    id: 17,
    question: "How do millions of neurons together produce EEG signals?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Advanced BCI",
    shortAnswer: "EEG does NOT measure action potentials. It measures synchronized Postsynaptic Potentials (PSPs) from millions of spatially aligned Pyramidal Neurons arranged perpendicular to the cerebral cortex.",
    detailedExplanation: "When thousands of cortical pyramidal neurons receive simultaneous synaptic input:\n1. Apical dendrites experience cation influx (sink), leaving a positive charge deficit extracellularly.\n2. The soma acts as a source, creating an extracellular **Dipole**.\n3. When millions of adjacent dipoles fire in synchrony, their tiny microvolt electric fields summate constructively, volume-conduct through CSF, skull, and scalp, and produce measurable EEG waveforms.",
    mindMapNodes: ["EEG Generation", "Pyramidal Neurons Alignment", "Synchronized Postsynaptic Potentials (PSPs)", "Dipole Summation", "Volume Conduction to Scalp"],
    keyFormulaOrConcept: "Scalp Potential: V_scalp = Sum( Extracellular Dipoles ) * Volume Conduction Attenuation",
    bciRelevance: "This fundamental mechanism explains why non-invasive EEG records rhythmic field oscillations (Alpha, Beta, Theta) rather than individual cell spikes."
  },
  {
    id: 18,
    question: "Why can't EEG detect individual neuron activity?",
    category: "Neuron Biophysics & Signals",
    difficulty: "Advanced BCI",
    shortAnswer: "Because individual action potentials last only 1 millisecond and decay exponentially over distance. The skull and scalp act as high-frequency spatial spatial low-pass filters that smear and attenuate microvolt signals.",
    detailedExplanation: "1. **Volume Conduction & Attenuation**: High electrical resistance of the skull (~80x higher than brain tissue) dampens amplitude by 10-100x.\n2. **Spatial Blur**: Scalp electrodes integrate activity over ~10 cm² of underlying cortex (containing ~100 million neurons).\n3. **Asynchrony Cancellation**: Unsynchronized single-neuron action potentials cancel each other out before reaching surface sensors.",
    mindMapNodes: ["EEG Limitations", "Skull High Resistance (Low-pass Filter)", "10 cm² Spatial Integration Area", "Asynchronous Phase Cancellation"],
    bciRelevance: "Requires invasive ECoG or microelectrodes (Utah Array) if single-neuron spike isolation is needed."
  },

  // CATEGORY 3: Brain Waves, EEG & Rhythms (Q19 - Q23)
  {
    id: 19,
    question: "What are Delta, Theta, Alpha, Beta & Gamma waves?",
    category: "Brain Waves & Rhythms",
    difficulty: "Scratch / Basic",
    shortAnswer: "The 5 primary EEG frequency bands:\n• Delta (0.5–4 Hz): Deep sleep.\n• Theta (4–8 Hz): Drowsiness, meditation, memory.\n• Alpha / Mu (8–12 Hz): Relaxed wakefulness / Idle motor cortex.\n• Beta (12–30 Hz): Active thinking, focus, movement execution.\n• Gamma (30–100+ Hz): High-level cognitive processing, sensory binding.",
    detailedExplanation: "• **Delta (0.5 - 4 Hz)**: Highest amplitude; prominent during Stage 3/4 NREM deep slow-wave sleep.\n• **Theta (4 - 8 Hz)**: Found in hippocampal circuits during spatial learning and light sleep.\n• **Alpha / Mu (8 - 12 Hz)**: Originates in thalamocortical loops. Prominent over occipital lobe when eyes closed, and over motor cortex as Mu rhythm.\n• **Beta (12 - 30 Hz)**: Associated with active concentration, alert motor preparation, and muscle engagement.\n• **Gamma (30 - 100 Hz)**: Generated by local GABAergic interneuron feedback loops during active perception and cross-modal integration.",
    mindMapNodes: ["EEG Frequency Bands", "Delta (0.5-4Hz Deep Sleep)", "Theta (4-8Hz Drowsiness/Mem)", "Alpha/Mu (8-12Hz Idle/Relaxed)", "Beta (12-30Hz Active Focus)", "Gamma (30-100Hz Cognition)"],
    keyFormulaOrConcept: "Fourier Spectrum: X(f) = Integral( x(t) * e^(-j2pi f t) dt )",
    bciRelevance: "BCIs compute Power Spectral Density (PSD) across these exact bands to decode mental states."
  },
  {
    id: 20,
    question: "When does each brain wave occur?",
    category: "Brain Waves & Rhythms",
    difficulty: "Scratch / Basic",
    shortAnswer: "• Delta: Deep NREM sleep.\n• Theta: Drowsiness, early sleep, working memory load.\n• Alpha: Quiet resting with eyes closed.\n• Beta: Active problem solving, conversation, motor execution.\n• Gamma: High focus, multi-sensory feature binding.",
    detailedExplanation: "Brain wave frequencies reflect thalamocortical synchronization states:\n- When idling or resting, large populations fire together in low-frequency synchrony (Alpha/Delta).\n- When actively processing information, cortical populations desynchronize into fast, low-amplitude rhythms (Beta/Gamma).",
    mindMapNodes: ["Arousal State Spectrum", "Deep Sleep (Delta)", "Meditation/Drowsy (Theta)", "Resting Eyes Closed (Alpha)", "Mental Work (Beta)", "Peak Cognition (Gamma)"],
    bciRelevance: "Allows passive BCIs to monitor driver fatigue (Theta increase) and cognitive workload (Beta/Gamma increase)."
  },
  {
    id: 21,
    question: "Which brain waves are imp for motor imagery?",
    category: "Brain Waves & Rhythms",
    difficulty: "Intermediate",
    shortAnswer: "Mu Rhythm (8–12 Hz) and Beta Rhythm (18–26 Hz) recorded over the sensorimotor cortex (electrodes C3, Cz, C4).",
    detailedExplanation: "When a person imagines moving their hand or foot:\n1. **Event-Related Desynchronization (ERD)**: Power drops significantly in the Mu (8-12 Hz) and Beta (18-26 Hz) bands over the contralateral motor cortex.\n2. **Event-Related Synchronization (ERS)**: Upon finishing imagery, Beta power rebounds above baseline.",
    mindMapNodes: ["Motor Imagery Rhythms", "Mu Rhythm (8-12 Hz)", "Beta Rhythm (18-26 Hz)", "Contralateral ERD (Power Drop)", "Post-movement ERS (Power Rebound)"],
    bciRelevance: "Form the foundational feature set for Motor Imagery BCIs controlling prosthetics and robotic limbs."
  },
  {
    id: 22,
    question: "Why do alpha rhythms decrease during movement?",
    category: "Brain Waves & Rhythms",
    difficulty: "Intermediate",
    shortAnswer: "Due to Event-Related Desynchronization (ERD). High alpha/mu power represents an 'idling' state of synchronous cortical neurons. Movement recruits these neurons into asynchronous active computation, destroying phase synchrony.",
    detailedExplanation: "In the resting state, thalamocortical pacemaker neurons drive cortical pyramidal cells to oscillate in unison at 10 Hz (high amplitude Alpha/Mu rhythm). When motor preparation begins, localized cortical networks are recruited into independent processing streams, causing phase cancellation and a sharp drop in band power (ERD).",
    mindMapNodes: ["Alpha Power Decrease", "Resting State = Synchronous Idling (High Alpha)", "Movement Prep = Local Asynchronous Computation (Low Alpha / ERD)"],
    bciRelevance: "The magnitude of alpha/mu ERD directly correlates with user intent strength in brain-computer interfaces."
  },
  {
    id: 23,
    question: "How are brain waves measured?",
    category: "Brain Waves & Rhythms",
    difficulty: "Intermediate",
    shortAnswer: "Using differential amplifiers that measure microvolt potential differences between an active electrode on the scalp and a reference electrode (e.g., earlobe or mastoid).",
    detailedExplanation: "1. **Conductive Gel / Dry Electrodes**: Establish low impedance (<5 kΩ) interface with skin.\n2. **Differential Amplification**: Rejects common noise (60Hz power line) using Common Mode Rejection Ratio (CMRR > 110 dB).\n3. **Analog-to-Digital Converter (ADC)**: Samples continuous microvolt signals at 250–1000 Hz with 16–24 bit resolution.\n4. **Bandpass Filtering**: Removes DC offset (<0.5 Hz) and muscle noise (>50 Hz).",
    mindMapNodes: ["EEG Measurement Chain", "Scalp Electrodes", "Differential Amp (CMRR)", "24-bit ADC Converter", "DSP Digital Filters"],
    keyFormulaOrConcept: "Differential Output: V_out = A_d * (V_active - V_ref)",
    bciRelevance: "Ensures clean, low-noise digital EEG streams for real-time feature extraction."
  },

  // CATEGORY 4: Motor Cortex & Motor Imagery (Q24 - Q30, Q80 - Q86)
  {
    id: 24,
    question: "Which part of the brain controls voluntary movement?",
    category: "Motor Control & Imagery",
    difficulty: "Scratch / Basic",
    shortAnswer: "The Motor Network in the Frontal Lobe: Primary Motor Cortex (M1), Premotor Cortex, Supplementary Motor Area (SMA), along with Basal Ganglia and Cerebellum.",
    detailedExplanation: "Primary execution originates in **M1** (precentral gyrus, Brodmann area 4). However, voluntary movement is a hierarchical sequence:\n1. Prefrontal Cortex: Decides goal.\n2. Premotor Cortex & SMA: Plans motor program.\n3. Basal Ganglia & Cerebellum: Filters unwanted movements and adjusts force/timing.\n4. M1: Fires corticospinal motor neurons down the spinal cord.",
    mindMapNodes: ["Voluntary Movement Chain", "Prefrontal (Goal)", "Premotor/SMA (Planning)", "Basal Ganglia/Cerebellum (Refinement)", "M1 (Spinal Execution)"],
    bciRelevance: "BCIs intercept this chain at M1 or SMA to capture movement plans before muscle activation."
  },
  {
    id: 25,
    question: "What is the primary motor cortex?",
    category: "Motor Control & Imagery",
    difficulty: "Scratch / Basic",
    shortAnswer: "The Primary Motor Cortex (M1) is a strip of neocortex located on the precentral gyrus that contains a somatotopic map ('Motor Homunculus') controlling specific body muscles.",
    detailedExplanation: "M1 contains large Betz cells (pyramidal upper motor neurons) whose axons project directly through the corticospinal tract to lower motor neurons in the spinal cord. Highly detailed motor control areas (hands, fingers, face, tongue) occupy disproportionately large cortical real estate on the motor homunculus.",
    mindMapNodes: ["Primary Motor Cortex (M1)", "Precentral Gyrus (Brodmann Area 4)", "Motor Homunculus", "Corticospinal Tract Execution"],
    bciRelevance: "Motor imagery BCIs map electrodes to hand area (C3/C4) and foot/leg area (Cz) based on homunculus positioning."
  },
  {
    id: 26,
    question: "What is premotor cortex?",
    category: "Motor Control & Imagery",
    difficulty: "Intermediate",
    shortAnswer: "Located just anterior to M1, the Premotor Cortex prepares motor routines in response to external sensory cues (e.g., seeing a red light turn green to step on gas).",
    detailedExplanation: "The premotor cortex integrates visual, auditory, and tactile spatial information to select appropriate motor actions. It houses mirror neurons that fire both when performing a motor action and when observing someone else perform it.",
    mindMapNodes: ["Premotor Cortex", "Sensory-Guided Planning", "External Cue Integration", "Mirror Neuron System"],
    bciRelevance: "Fires prior to M1, giving BCIs early predictive lead time for movement classification."
  },
  {
    id: 27,
    question: "What is the supplementary motor area (SMA)?",
    category: "Motor Control & Imagery",
    difficulty: "Intermediate",
    shortAnswer: "The SMA plans and coordinates internally generated complex motor sequences (e.g., playing a memorized piano piece from memory without visual cues).",
    detailedExplanation: "Situated on the medial surface of the frontal cortex anterior to M1. While the premotor cortex relies on external cues, the SMA handles self-initiated movement sequences, bimanual coordination, and mental rehearsal (motor imagery) without physical movement.",
    mindMapNodes: ["Supplementary Motor Area (SMA)", "Internally Generated Movement", "Complex Sequential Planning", "Mental Rehearsal Core"],
    bciRelevance: "SMA activation during mental motor rehearsal generates strong EEG signals ideal for non-invasive BCIs."
  },
  {
    id: 28,
    question: "How does the brain decide to move before muscles actually move?",
    category: "Motor Control & Imagery",
    difficulty: "Advanced BCI",
    shortAnswer: "Through a progressive neural activation sequence originating ~1.5 seconds before movement as the 'Bereitschaftspotential' (Readiness Potential), traveling from SMA -> Premotor -> M1 -> Corticospinal Tract.",
    detailedExplanation: "1. **Cognitive Intention** (-2.0s to -1.5s): Prefrontal & Parietal integration.\n2. **Readiness Potential (RP)** (-1.5s to -0.5s): Slow negative EEG wave buildup over SMA.\n3. **Motor Preparation** (-0.5s to 0s): Premotor and M1 localized ERD.\n4. **Spinal Firing** (0s): Corticospinal volley reaches neuromuscular junction.",
    mindMapNodes: ["Pre-Movement Activation Timeline", "Bereitschaftspotential (Readiness Potential -1.5s)", "SMA/Premotor Planning (-0.5s)", "M1 Corticospinal Spike (0s)"],
    keyFormulaOrConcept: "Bereitschaftspotential (RP): Slow negative DC drift over Cz prior to voluntary movement.",
    bciRelevance: "Allows BCIs to predict user movement intent up to 500ms before any physical muscle twitch occurs."
  },
  {
    id: 29,
    question: "What happens during motor imagery?",
    category: "Motor Control & Imagery",
    difficulty: "Intermediate",
    shortAnswer: "The mental simulation of a motor act without overt muscle execution, activating identical neural circuits (SMA, Premotor, M1, Cerebellum) as actual movement, while active motor output is inhibited at the spinal cord level.",
    detailedExplanation: "During motor imagery, the brain executes motor programs internally. Cortical areas desynchronize (producing Mu and Beta ERD over sensorimotor cortex), but descending motor signals are gated/inhibited at the spinal interneuron level to prevent physical muscle contraction.",
    mindMapNodes: ["Motor Imagery Mechanics", "Mental Kinesthetic Simulation", "Activates SMA & M1 Cortices", "Spinal Gating Inhibits Muscle Twitch", "Generates Sensorimotor ERD"],
    bciRelevance: "Enables completely paralyzed individuals to generate distinct, reliable EEG patterns to drive prosthetic devices."
  },
  {
    id: 30,
    question: "Why does imagining movement produce measurable EEG signals?",
    category: "Motor Control & Imagery",
    difficulty: "Advanced BCI",
    shortAnswer: "Because mental movement rehearsal recruits the exact same cortical pyramidal cell assemblies as actual movement, causing localized desynchronization (ERD) in sensorimotor μ (8-12 Hz) and β (18-26 Hz) rhythms.",
    detailedExplanation: "Cortical motor networks do not require spinal execution to engage in computational activity. When imagining hand movement, pyramidal populations in the hand area of M1 switch from synchronous resting state to asynchronous active processing, causing a drop in regional scalp power (C3 for right hand, C4 for left hand).",
    mindMapNodes: ["Measurable Signals Mechanism", "Cortical Circuit Shared Recruitment", "Phase Desynchronization", "Scalp Power Shift at C3 / C4"],
    bciRelevance: "Allows machine learning models (CSP + SVM / SNN) to classify imagined movements with >90% accuracy."
  },
  {
    id: 80,
    question: "Why is motor imagery possible without muscle movement?",
    category: "Motor Control & Imagery",
    difficulty: "Intermediate",
    shortAnswer: "Because movement planning (cortical) and movement execution (spinal/muscular) are anatomically and functionally distinct stages.",
    detailedExplanation: "The cortical motor network (SMA, premotor cortex, parietal cortex, and M1) can compute complete motor commands internally. Spinal inhibitory interneurons (e.g., Ia inhibitory interneurons) suppress descending alpha motor neuron activation, preventing muscle twitch while leaving cortical EEG oscillations intact.",
    mindMapNodes: ["Cortical vs Spinal Separation", "Cortical Planning Active", "Spinal Interneuron Inhibition Active", "Clean EEG Signal Produced Without EMG Noise"],
    bciRelevance: "Guarantees that paralyzed or amputee patients can generate robust BCI control signals."
  },
  {
    id: 81,
    question: "How does the brain distinguish between imagined & actual movement?",
    category: "Motor Control & Imagery",
    difficulty: "Advanced BCI",
    shortAnswer: "Actual movement involves complete efferent drive and sensory feedback (proprioception/tactile), producing supplementary Gamma oscillations and complete corticospinal volley, whereas imagined movement utilizes active presynaptic inhibition at the spinal level.",
    detailedExplanation: "1. **Efferent Drive**: Actual movement fires spinal alpha motor neurons at high rates; imagery holds sub-threshold drive.\n2. **Afferent Feedback**: Actual movement triggers massive somatosensory feedback (spindle & Golgi tendon organ firing), causing secondary S1 processing.\n3. **Neural Signatures**: Actual movement shows stronger Beta rebound (ERS) and higher Gamma power than imagery.",
    mindMapNodes: ["Actual vs Imagined Distinction", "Proprioceptive Feedback Loop", "Sub-threshold Spinal Drive", "Gamma Power Differences"],
    bciRelevance: "BCI classifiers must be trained specifically on motor imagery data rather than actual movement data for optimal performance in paralyzed users."
  },
  {
    id: 82,
    question: "Why do EEG signals vary from person to person?",
    category: "Motor Control & Imagery",
    difficulty: "Intermediate",
    shortAnswer: "Due to anatomical differences in skull thickness, cortical folding geometry (gyri orientation), scalp impedance, age, and individual baseline brain rhythm power.",
    detailedExplanation: "1. **Cortical Geometry**: Since EEG measures dipoles perpendicular to the cortical surface, variations in sulcal folding alter dipole orientation relative to scalp electrodes.\n2. **Skull Density & Volume Conduction**: Skull thickness variations alter electrical attenuation.\n3. **Basal Rhythms**: Individual peak alpha frequency ranges from 8.5 Hz to 12.5 Hz across different people.",
    mindMapNodes: ["Intersubject EEG Variability", "Cortical Sulcus Orientation", "Skull Thickness & Impedance", "Baseline Peak Alpha Frequency"],
    bciRelevance: "Requires subject-specific BCI calibration routines or domain-adaptation neural networks (EEGNet / Transfer Learning)."
  },
  {
    id: 83,
    question: "Why do some people perform poorly in motor imagery tasks?",
    category: "Motor Control & Imagery",
    difficulty: "Intermediate",
    shortAnswer: "Known as 'BCI Illiteracy' or 'BCI Inefficiency' (~15-20% of users), caused by weak baseline sensorimotor rhythms, difficulty in kinesthetic (vs. visual) imagery, or high cognitive fatigue.",
    detailedExplanation: "Users who perform poorly often attempt 'visual imagery' (picturing movement externally) rather than 'kinesthetic imagery' (feeling the muscle sensation from within). Visual imagery engages occipital visual cortices rather than sensorimotor C3/C4 regions, failing to produce robust Mu/Beta ERD.",
    mindMapNodes: ["BCI Inefficiency Causes", "Visual vs Kinesthetic Imagery Misunderstanding", "Low Resting Mu Rhythm Amplitude", "Attentional Fatigue"],
    bciRelevance: "Addressed by training users with neurofeedback or switching to co-adaptive BCI algorithms."
  },
  {
    id: 84,
    question: "Can the brain learn to generate better EEG signals with training?",
    category: "Motor Control & Imagery",
    difficulty: "Intermediate",
    shortAnswer: "Yes! Through Operant Conditioning and Neurofeedback, neuroplasticity strengthens the specific cortical networks, sharpening ERD depth and BCI classification accuracy over time.",
    detailedExplanation: "When provided real-time visual or tactile feedback of their BCI output, the brain modifies synaptic weights in sensorimotor cortex loops. Users develop refined mental strategies, increasing signal-to-noise ratio (SNR) and boosting classification accuracy from ~65% to >90%.",
    mindMapNodes: ["EEG Learning & Operant Conditioning", "Real-Time Neurofeedback", "Synaptic Weight Adjustment", "Improved Signal-to-Noise Ratio"],
    bciRelevance: "Demonstrates that BCI control is a two-way mutual adaptation process between human brain and machine learning model."
  },
  {
    id: 85,
    question: "How does closed-loop feedback help improve brain activity?",
    category: "Motor Control & Imagery",
    difficulty: "Advanced BCI",
    shortAnswer: "Closed-loop feedback provides immediate sensory reward (visual cursor move or prosthetic grip) when target EEG patterns are produced, reinforcing beneficial neural firing patterns via Hebbian plasticity.",
    detailedExplanation: "Open-loop systems lack feedback. Closed-loop systems complete the sensorimotor circuit:\nBrain Intention -> EEG Decoded -> Action Executed -> Visual/Somatosensory Return -> Cortical Reinforcement.\nThis tight time-locked loop accelerates neuroplastic adaptation and stroke recovery.",
    mindMapNodes: ["Closed-Loop System", "Intention -> Decoded Action -> Sensory Feedback -> Reinforcement Plasticity"],
    bciRelevance: "Essential for neurorehabilitation BCIs restoring motor control after stroke."
  },
  {
    id: 86,
    question: "How to distinguish between left & right hand movements when both are very same?",
    category: "Motor Control & Imagery",
    difficulty: "Advanced BCI",
    shortAnswer: "By exploiting Contralateral Functional Lateralization: Left hand imagery produces ERD over Right hemisphere (C4 electrode); Right hand imagery produces ERD over Left hemisphere (C3 electrode).",
    detailedExplanation: "Because motor pathways cross over at the decussation of pyramids in the brainstem:\n• **Right Hand Imagery**: Strong Mu/Beta power drop at C3 (left motor cortex), while C4 remains idle or shows ERS.\n• **Left Hand Imagery**: Strong Mu/Beta power drop at C4 (right motor cortex), while C3 remains idle.\nCommon Spatial Patterns (CSP) spatial filtering maximizes this variance ratio between C3 and C4 channels.",
    mindMapNodes: ["Hand Imagery Discrimination", "Decussation of Pyramids (Contralateral)", "Right Hand -> C3 ERD (Left Cortex)", "Left Hand -> C4 ERD (Right Cortex)", "CSP Spatial Filtering"],
    keyFormulaOrConcept: "Spatial Filter Matrix: W = argmax ( (W^T C_left W) / (W^T C_right W) )",
    bciRelevance: "The foundational benchmark test for 2-class Motor Imagery BCI systems."
  },

  // CATEGORY 5: Sensory Cortices & Sensory Processing (Q31 - Q34)
  {
    id: 31,
    question: "How do sensory neurons work?",
    category: "Sensory Processing",
    difficulty: "Scratch / Basic",
    shortAnswer: "Sensory neurons transduce physical environmental energy (light, pressure, sound waves, temperature) into graded receptor potentials and action potentials carried to the CNS.",
    detailedExplanation: "Specialized sensory receptors contain ion channels opened by mechanical stretch (mechanoreceptors), photons (photoreceptors), or chemical binding (chemoreceptors). This generates a graded receptor potential; if large enough, it fires action potentials down pseudounipolar sensory axons to the spinal cord and brainstem.",
    mindMapNodes: ["Sensory Neurons", "Energy Transduction (Physical -> Electrical)", "Graded Receptor Potential", "Axonal Spike Train to CNS"],
    bciRelevance: "Provides the biological foundation for bidirectional BCIs that encode artificial sensory feedback back into the brain."
  },
  {
    id: 32,
    question: "What is the somatosensory cortex?",
    category: "Sensory Processing",
    difficulty: "Scratch / Basic",
    shortAnswer: "Located on the postcentral gyrus of the parietal lobe (S1), it processes tactile sensations, touch, temperature, pain, and proprioception from the entire body.",
    detailedExplanation: "S1 features a somatotopic mapping ('Sensory Homunculus') mirrored opposite the motor homunculus across the central sulcus. High-density sensory areas (fingertips, lips) have expansive cortical representation.",
    mindMapNodes: ["Somatosensory Cortex (S1)", "Postcentral Gyrus", "Sensory Homunculus", "Tactile & Proprioceptive Integration"],
    bciRelevance: "Intracortical microstimulation (ICMS) of S1 generates artificial touch sensations in prosthetic fingertips."
  },
  {
    id: 33,
    question: "How does the brain identify touch, pain, temperature & pressure?",
    category: "Sensory Processing",
    difficulty: "Intermediate",
    shortAnswer: "Through labeled-line sensory pathways:\n• Touch & Pressure: Dorsal Column-Medial Lemniscal Pathway (fast A-beta fibers).\n• Pain & Temperature: Spinothalamic Tract (A-delta and slow unmyelinated C fibers).",
    detailedExplanation: "• **Touch/Vibration**: Meissner's and Pacinian corpuscles send signals up dorsal columns to thalamus (VPL) -> S1.\n• **Pain/Temp**: Free nerve endings send nociceptive signals up spinothalamic tract -> Thalamus -> S1 & Insula (emotional aspect of pain).",
    mindMapNodes: ["Sensory Pathways", "Dorsal Column (Touch/Vibration/Proprioception - Fast)", "Spinothalamic Tract (Pain/Temp - Slow)"],
    bciRelevance: "Sensory restoration BCIs target S1 for touch and thalamic pathways for sensory prostheses."
  },
  {
    id: 34,
    question: "How are sensory & motor cortices connected?",
    category: "Sensory Processing",
    difficulty: "Intermediate",
    shortAnswer: "Directly via dense reciprocal cortico-cortical U-fibers crossing the central sulcus, forming a continuous Sensorimotor Control Loop.",
    detailedExplanation: "Motor execution requires continuous sensory feedback (proprioception). S1 feeds real-time state estimations to M1 and premotor cortex. Without intact sensory inputs from S1, motor movements become clumsy, uncoordinated, and inaccurate ('sensory ataxia').",
    mindMapNodes: ["Sensorimotor Integration Loop", "S1 (State Feedback) <---> M1 (Motor Command execution)"],
    bciRelevance: "Highlights why prosthetics require closed-loop tactile feedback to achieve natural motor control."
  },

  // CATEGORY 6: Memory, Learning & Neuroplasticity (Q35 - Q44)
  {
    id: 35,
    question: "How are memories formed?",
    category: "Memory & Neuroplasticity",
    difficulty: "Scratch / Basic",
    shortAnswer: "Through a three-stage pipeline: Encoding (sensory inputs into neural representations), Consolidation (stabilizing memory traces in hippocampus and neocortex), and Retrieval.",
    detailedExplanation: "Short-term working memory relies on persistent electrical activity in prefrontal networks. Long-term declarative memory encoding requires the **Hippocampus**, which orchestrates synaptic modification across distributed neocortical areas during sleep.",
    mindMapNodes: ["Memory Pipeline", "Encoding (Sensory Cortex)", "Short-Term Working Memory (PFC)", "Consolidation (Hippocampus)", "Long-Term Storage (Neocortex)"],
    bciRelevance: "Memory prostheses use hippocampal neural stimulation to restore memory encoding in Alzheimer's patients."
  },
  {
    id: 36,
    question: "What role does the hippocampus play?",
    category: "Memory & Neuroplasticity",
    difficulty: "Intermediate",
    shortAnswer: "The hippocampus is the central hub for encoding new declarative (episodic & semantic) memories and spatial navigation, binding disparate cortical sensory features into unified memory traces.",
    detailedExplanation: "Situated in the medial temporal lobe. It features the trisynaptic circuit (Dentate Gyrus -> CA3 -> CA1). It acts as a temporary indexer; over time, through sleep replay, memories are consolidated into permanent neocortical storage.",
    mindMapNodes: ["Hippocampus", "Trisynaptic Circuit (DG -> CA3 -> CA1)", "Episodic Memory Indexer", "Spatial Cognitive Mapping (Place Cells)"],
    bciRelevance: "Target for cognitive BCI implants (e.g., DARPA RAM program)."
  },
  {
    id: 37,
    question: "What is long-term potentiation (LTP)?",
    category: "Memory & Neuroplasticity",
    difficulty: "Intermediate",
    shortAnswer: "LTP is a persistent strengthening of synapses based on recent patterns of activity, forming the primary cellular mechanism underlying learning and memory.",
    detailedExplanation: "When presynaptic glutamate release coincides with strong postsynaptic depolarization:\n1. Mg2+ plug is expelled from NMDA receptors.\n2. Ca2+ rushes into postsynaptic spine.\n3. Calmodulin kinase II (CaMKII) activation inserts additional AMPA receptors into membrane.\n4. Synapse becomes permanently more sensitive to future glutamate release.",
    mindMapNodes: ["LTP Mechanism", "Glutamate Release", "NMDA Receptor Mg2+ Unblocking", "Ca2+ Influx", "AMPA Receptor Insertion", "Enhanced Synaptic Efficacy"],
    keyFormulaOrConcept: "Hebbian Principle: 'Neurons that fire together, wire together.'",
    bciRelevance: "Drives synaptic weight adaptation during BCI neurofeedback training."
  },
  {
    id: 38,
    question: "How do neurons become stronger with learning?",
    category: "Memory & Neuroplasticity",
    difficulty: "Scratch / Basic",
    shortAnswer: "By growing larger dendritic spines, inserting more neurotransmitter receptors (AMPA receptors), and increasing presynaptic neurotransmitter release probability.",
    detailedExplanation: "Repeated stimulation triggers gene expression (via CREB pathway), manufacturing structural proteins that enlarge dendritic spine heads and sprout new synaptic contact points, turning temporary chemical changes into permanent physical structures.",
    mindMapNodes: ["Synaptic Strengthening", "AMPA Receptor Addition", "Dendritic Spine Enlargement", "CREB Gene Transcription"],
    bciRelevance: "Explains how long-term BCI users achieve effortless control as task execution moves from conscious effort to automatic synaptic pathways."
  },
  {
    id: 39,
    question: "How does the brain remember repeated motor tasks?",
    category: "Memory & Neuroplasticity",
    difficulty: "Intermediate",
    shortAnswer: "Via Procedural Memory consolidation involving Basal Ganglia loops, Cerebellum, and Supplementary Motor Area (SMA), turning conscious step-by-step control into automated motor programs.",
    detailedExplanation: "Initial motor learning requires high prefrontal and conscious attention. As performance is repeated, execution shifts to corticostriatal (Basal Ganglia) and corticocerebellar circuits, building automated muscle memory routines that free up cognitive capacity.",
    mindMapNodes: ["Procedural Motor Memory", "Prefrontal Conscious Control (Initial)", "Corticostriatal & Cerebellar Automation (Mastery)"],
    bciRelevance: "Allows BCI skill execution to become intuitive and sub-conscious after extended practice."
  },
  {
    id: 40,
    question: "What exactly is neuroplasticity?",
    category: "Memory & Neuroplasticity",
    difficulty: "Scratch / Basic",
    shortAnswer: "The brain's lifelong ability to modify its structural organization and functional connections in response to internal or external stimuli.",
    detailedExplanation: "Includes developmental plasticity, activity-dependent learning plasticity, and compensatory post-injury plasticity. Operates through synaptic weight adjustments, axonal sprouting, and functional map cortical reorganization.",
    mindMapNodes: ["Neuroplasticity Spectrum", "Developmental", "Learning-Driven", "Compensatory Post-Injury"],
    bciRelevance: "Enables users to adapt to completely artificial BCI control paradigms."
  },
  {
    id: 41,
    question: "How does the brain recover after injury?",
    category: "Memory & Neuroplasticity",
    difficulty: "Intermediate",
    shortAnswer: "Via unmasking latent anatomical pathways, peri-lesional cortical reorganization, contralateral hemisphere compensation, and axonal sprouting.",
    detailedExplanation: "Following stroke or trauma, intact tissue surrounding the lesion (peri-infarct zone) takes over lost functions. Ipsilateral or contralateral intact motor regions unmask dormant synaptic connections to re-establish motor control.",
    mindMapNodes: ["Post-Injury Recovery", "Unmasking Latent Synapses", "Peri-Lesional Cortical Reorganization", "Contralateral Compensation"],
    bciRelevance: "BCI-driven neurorehabilitation accelerates this exact peri-lesional reorganization."
  },
  {
    id: 42,
    question: "Why is neuroplasticity imp in stroke rehabilitation?",
    category: "Memory & Neuroplasticity",
    difficulty: "Intermediate",
    shortAnswer: "Because dead brain tissue cannot regenerate; stroke recovery depends entirely on neuroplasticity reorganizing surviving brain regions to take over damaged motor functions.",
    detailedExplanation: "Repetitive, goal-directed therapy forces surviving peri-infarct cortex to form new functional networks. Without neuroplastic stimulation, patients experience learned non-use and permanent loss of limb function.",
    mindMapNodes: ["Stroke Rehabilitation", "Dead Tissue Non-renewable", "Peri-infarct Remapping", "Prevents Learned Non-Use"],
    bciRelevance: "BCI therapy triggers closed-loop neuroplasticity even in patients with zero residual physical muscle movement."
  },
  {
    id: 43,
    question: "Can BCI training improve neuroplasticity?",
    category: "Memory & Neuroplasticity",
    difficulty: "Advanced BCI",
    shortAnswer: "Yes! BCI systems pair cortical motor imagery with functional electrical stimulation (FES) or robotic orthoses, creating a closed-loop contingent reward that triggers Hebbian LTP between cortex and spinal cord.",
    detailedExplanation: "When cortical ERD (motor intent) instantly triggers peripheral robotic movement or muscle stimulation, the sensory feedback arrives back at S1 simultaneously, reinforcing surviving corticospinal pathways via Time-Dependent Plasticity (STDP).",
    mindMapNodes: ["BCI-Induced Neuroplasticity", "Cortical Intent (EEG)", "Robotic/FES Activation", "Sensory Feedback to S1", "Hebbian STDP Reinforcement"],
    keyFormulaOrConcept: "Spike-Timing-Dependent Plasticity (STDP): Presynaptic before postsynaptic (<20ms) = LTP.",
    bciRelevance: "Demonstrates that BCIs act as active therapeutic neurorehabilitation devices rather than mere passive assistive tools."
  },
  {
    id: 44,
    question: "Does age affect neuroplasticity?",
    category: "Memory & Neuroplasticity",
    difficulty: "Intermediate",
    shortAnswer: "Yes. Neuroplasticity is highest during critical developmental windows in childhood and gradually declines with age due to decreased neurotrophic factors (BDNF) and myelination stability, but remains active throughout life.",
    detailedExplanation: "While young brains exhibit rapid structural changes, adult and elderly brains retain significant functional plasticity, requiring higher repetition intensity and focused attention to induce synaptic remodeling.",
    mindMapNodes: ["Age & Plasticity", "Childhood Peak Plasticity", "Adult Plasticity (BDNF-dependent)", "Requires High Repetition"],
    bciRelevance: "BCI algorithms adapt parameters dynamically to match age-dependent neuroplastic learning rates."
  },

  // CATEGORY 7: Neurological Disorders, Stroke & Rehabilitation (Q45-Q50, Q69-Q73)
  {
    id: 45,
    question: "What causes paralysis biologically?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Scratch / Basic",
    shortAnswer: "Disruption of the motor pathway at upper motor neurons (brain/corticospinal tract) or lower motor neurons (spinal cord/peripheral nerves), preventing nerve impulses from reaching muscles.",
    detailedExplanation: "Interruption can stem from ischemic stroke (brain cell death), traumatic spinal cord injury (axonal transection), or ALS (motor neuron degeneration). Muscles remain structurally healthy initially but cannot contract due to lack of neural drive.",
    mindMapNodes: ["Paralysis Biological Mechanisms", "Upper Motor Neuron Lesion (Stroke/TBI)", "Lower Motor Neuron Lesion (Spinal/ALS)", "Interrupted Corticospinal Signal"],
    bciRelevance: "BCIs bypass the severed physical nerve path by capturing brain intent and sending commands directly to artificial limbs or FES."
  },
  {
    id: 46,
    question: "Which brain regions remain functional in paralyzed patients?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Intermediate",
    shortAnswer: "In spinal cord injury or ALS, the upper motor cortices (M1, Premotor, SMA, S1) and cognitive regions remain completely intact and functional.",
    detailedExplanation: "Even years after complete spinal cord transection, the primary motor cortex retains its somatotopic organization and continues to generate robust motor imagery signals when the patient attempts or imagines movement.",
    mindMapNodes: ["Functional Intact Cortices", "M1 Intact", "Premotor Intact", "SMA Intact", "Intention Intact"],
    bciRelevance: "Proves that motor cortical control signals remain available indefinitely for BCI decoding."
  },
  {
    id: 47,
    question: "Why can EEG signals still exist even if muscles cannot move?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Intermediate",
    shortAnswer: "Because EEG measures brain cortical electrophysiology (postsynaptic dendritic potentials in M1), which occurs upstream of the spinal cord or muscle level.",
    detailedExplanation: "Cortical processing is independent of peripheral execution. A patient with complete spinal cord transection still generates cortical ERD and ERP signals because cortical pyramidal cells fire normally when attempting movement.",
    mindMapNodes: ["EEG Independent of Muscles", "Upstream Cortical Generation", "Pyramidal Cell Activity Intact", "Decoupled From Peripheral Execution"],
    bciRelevance: "The core reason why non-invasive and invasive BCIs function effectively in completely locked-in patients."
  },
  {
    id: 48,
    question: "How do spinal cord injuries differ from brain injuries?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Scratch / Basic",
    shortAnswer: "Spinal cord injuries sever transmission pathways leaving high-level cognitive and motor cortices intact. Brain injuries (TBI/Stroke) damage the central processing cortices themselves.",
    detailedExplanation: "• **Spinal Cord Injury (SCI)**: Brain is intact; infrastructure cables are cut.\n• **Brain Injury (Stroke/TBI)**: Transmission lines may be fine, but motor planning or execution centers in cortex are damaged.",
    mindMapNodes: ["Injury Comparison", "SCI (Transmission Cable Broken / Brain Healthy)", "Brain Injury (Central Processor Damaged)"],
    bciRelevance: "SCI patients are ideal candidates for direct motor decoding BCIs."
  },
  {
    id: 49,
    question: "Why do stroke patients lose movement?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Scratch / Basic",
    shortAnswer: "Because vascular blockage (ischemic stroke) or bleeding (hemorrhagic stroke) starves motor cortex neurons of oxygen, causing rapid cell death and loss of upper motor neurons.",
    detailedExplanation: "Loss of blood supply to the middle cerebral artery (MCA) destroys tissue in M1 and internal capsule, eliminating corticospinal tract axons that control contralateral limbs.",
    mindMapNodes: ["Stroke Mechanisms", "Ischemic / Hemorrhagic Stroke", "MCA Territory Cell Death", "Lost Corticospinal Axons"],
    bciRelevance: "BCI therapy helps remap surviving adjacent brain regions to take over movement control."
  },
  {
    id: 50,
    question: "How can BCIs help restore communication & movement?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Advanced BCI",
    shortAnswer: "By translating real-time neural intent into text spelling, synthetic speech generation, robotic exoskeleton control, or functional electrical stimulation (FES) of paralyzed muscles.",
    detailedExplanation: "1. **Communication**: P300 spellers, SSVEP visual keyboards, or invasive motor-court handwriting decoders (up to 90 words/minute).\n2. **Movement**: Re-animating paralyzed limbs by piping decoded EEG motor intent directly into FES muscle stimulators.",
    mindMapNodes: ["BCI Restoration Pathways", "Decoded Intent", "Spelling / Speech Synthesis", "Robotic Arm / Exoskeleton", "FES Muscle Re-animation"],
    bciRelevance: "The primary clinical application of modern medical brain-computer interfaces."
  },
  {
    id: 69,
    question: "What happens in Alzheimer's disease?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Intermediate",
    shortAnswer: "Progressive neurodegeneration caused by extracellular Amyloid-beta plaques and intracellular hyperphosphorylated Tau neurofibrillary tangles, starting in the hippocampus.",
    detailedExplanation: "Causes massive synaptic loss, cholinergic neuron death in basal forebrain, and profound cortical atrophy, leading to loss of memory, spatial disorientation, and cognitive decline.",
    mindMapNodes: ["Alzheimer's Disease", "Amyloid-Beta Plaques", "Tau Tangles", "Hippocampal Atrophy", "Cholinergic Deficit"],
    bciRelevance: "Monitored via EEG spectral slowing (increased Theta/Delta, decreased Alpha)."
  },
  {
    id: 70,
    question: "What causes Parkinson's disease?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Intermediate",
    shortAnswer: "Degeneration of dopaminergic neurons in the Substantia Nigra pars compacta, disrupting basal ganglia motor control loops.",
    detailedExplanation: "Loss of dopamine leads to overactivity in the subthalamic nucleus (STN) and globus pallidus, causing resting tremor, bradykinesia (slowness), rigidity, and postural instability.",
    mindMapNodes: ["Parkinson's Disease", "Substantia Nigra Degeneration", "Dopamine Loss", "Basal Ganglia Imbalance", "Tremor & Bradykinesia"],
    bciRelevance: "Treated with Deep Brain Stimulation (DBS)—a closed-loop invasive neural interface regulating STN beta oscillations."
  },
  {
    id: 71,
    question: "What is epilepsy & why does EEG detect seizures?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Intermediate",
    shortAnswer: "Epilepsy is characterized by sudden, abnormal, highly synchronized electrical discharges across populations of brain neurons, clearly visible on EEG as high-amplitude spikes and wave complexes.",
    detailedExplanation: "Imbalance between excitatory (glutamate) and inhibitory (GABA) neurotransmission causes cortical circuits to hyper-synchronize. EEG captures these unmistakable high-voltage spike-and-wave discharges across channels.",
    mindMapNodes: ["Epilepsy & Seizures", "Excitation/Inhibition Imbalance", "Hypersynchronized Cortical Firing", "High-Voltage EEG Spike-Waves"],
    bciRelevance: "Closed-loop responsive neurostimulators (RNS) detect seizure onset on electrocorticograms and deliver immediate electrical pulses to abort seizures."
  },
  {
    id: 72,
    question: "How do brain tumors affect neural activity?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Intermediate",
    shortAnswer: "By physically compressing adjacent brain tissue, disrupting blood supply, causing localized edema, and generating focal slow-wave (Delta/Theta) EEG abnormalities.",
    detailedExplanation: "Tumors replace normal excitable neural tissue with non-excitable neoplastic cells, causing localized electrical silence or focal slowing on overlying EEG channels.",
    mindMapNodes: ["Brain Tumors Impact", "Mechanical Compression", "Localized Edema", "Focal Slowing (Delta/Theta) on EEG"],
    bciRelevance: "Pre-surgical ECoG mapping delineates tumor margins from critical functional eloquent motor/language cortex."
  },
  {
    id: 73,
    question: "What biological changes occur after a stroke?",
    category: "Neurological Disorders & Rehab",
    difficulty: "Intermediate",
    shortAnswer: "Core ischemic necrosis, formation of a penumbra (salvageable tissue), glial scar formation by astrocytes, and subsequent peri-lesional neuroplastic remapping.",
    detailedExplanation: "Minutes post-stroke: Central core cells die. Hours: Inflammatory cascade affects penumbra. Weeks/Months: Astrocytes wall off lesion; surviving peri-infarct tissue undergoes synaptic sprouting to assume lost functions.",
    mindMapNodes: ["Post-Stroke Cascade", "Ischemic Core Death", "Penumbra Inflammation", "Astrocytic Glial Scar", "Peri-Infarct Synaptic Sprouting"],
    bciRelevance: "BCIs target the early post-stroke recovery window to maximize peri-infarct neuroplastic remodeling."
  },

  // CATEGORY 8: Sensory Integration, Vision & Hearing (Q51 - Q55)
  {
    id: 51,
    question: "How does the brain process vision?",
    category: "Sensory & Vision/Hearing",
    difficulty: "Scratch / Basic",
    shortAnswer: "Retinal photoreceptors (rods/cones) -> Optic Nerve -> Lateral Geniculate Nucleus (LGN) of Thalamus -> Primary Visual Cortex V1 (Occipital Lobe) -> Ventral ('What') & Dorsal ('Where') Streams.",
    detailedExplanation: "1. Photons hit retina, generating nerve impulses.\n2. Signals cross at optic chiasm and travel via optic tracts to LGN.\n3. LGN relays to V1 (striate cortex) for edge, orientation, and spatial frequency detection.\n4. **Ventral Stream** (V1 -> Temporal): Object identification.\n5. **Dorsal Stream** (V1 -> Parietal): Spatial location and motion.",
    mindMapNodes: ["Visual Processing Pipeline", "Retina (Rods/Cones)", "LGN Thalamus", "V1 Occipital Cortex", "Ventral Stream ('What')", "Dorsal Stream ('Where')"],
    bciRelevance: "Formulate SSVEP (Steady-State Visually Evoked Potential) BCIs where flickering visual stimuli trigger matching V1 frequencies (e.g., 12 Hz flicker = 12 Hz EEG peak)."
  },
  {
    id: 52,
    question: "Which lobe processes visual information?",
    category: "Sensory & Vision/Hearing",
    difficulty: "Scratch / Basic",
    shortAnswer: "The Occipital Lobe (located at the back of the head), specifically containing Primary Visual Cortex V1 (Brodmann Area 17).",
    detailedExplanation: "Houses retinotopic maps where adjacent points on the retina correspond to adjacent neurons in V1. Electrodes O1, Oz, and O2 sit directly above the occipital lobe.",
    mindMapNodes: ["Occipital Lobe", "Primary Visual Cortex (V1)", "Retinotopic Mapping", "Electrodes O1, Oz, O2"],
    bciRelevance: "Primary recording site for SSVEP visual speller BCIs."
  },
  {
    id: 53,
    question: "How does the auditory cortex work?",
    category: "Sensory & Vision/Hearing",
    difficulty: "Scratch / Basic",
    shortAnswer: "Located in the superior temporal gyrus (A1), it processes sound frequencies mapped tonotopically from the cochlea.",
    detailedExplanation: "Sound waves vibrate hair cells in the cochlea, generating signals along auditory nerve to cochlear nuclei, superior olive, inferior colliculus, medial geniculate nucleus (MGN) of thalamus, and finally Primary Auditory Cortex (A1). A1 is organized tonotopically (low pitches at one end, high pitches at the other).",
    mindMapNodes: ["Auditory System", "Cochlea Hair Cells", "Brainstem & MGN Relay", "A1 Superior Temporal Gyrus", "Tonotopic Mapping"],
    bciRelevance: "Auditory BCIs decode selective attention in noisy cocktail party scenarios for smart hearing aids."
  },
  {
    id: 54,
    question: "How does the brain combine vision & hearing?",
    category: "Sensory & Vision/Hearing",
    difficulty: "Intermediate",
    shortAnswer: "Through Multisensory Integration in association cortices (Superior Temporal Sulcus and Parietal Cortex) and Superior Colliculus.",
    detailedExplanation: "The brain synchronizes visual and auditory inputs in time and space. The McGurk effect demonstrates this integration—where watching mismatched lip movements alters the auditory speech sound heard.",
    mindMapNodes: ["Multisensory Integration", "Superior Temporal Sulcus", "Parietal Association Cortex", "Cross-Modal Binding (Gamma Waves)"],
    bciRelevance: "Multi-modal BCIs combine visual SSVEP and auditory stimuli for higher bandwidth communication."
  },
  {
    id: 55,
    question: "How could BCIs help visually or hearing-impaired people?",
    category: "Sensory & Vision/Hearing",
    difficulty: "Advanced BCI",
    shortAnswer: "Via Cortical Visual Prostheses (camera feed stimulating V1 microelectrode arrays) and Auditory Brainstem Implants (ABI) bypassing damaged inner ears.",
    detailedExplanation: "• **Visual Prosthesis**: External digital camera translates images into electrical stimulation patterns delivered directly into V1, producing perceived points of light (phosphenes).\n• **Auditory Prosthesis**: Auditory brainstem implants bypass destroyed cochlear nerves to stimulate cochlear nucleus directly.",
    mindMapNodes: ["Sensory Restoration BCIs", "Camera -> V1 Cortical Microstimulation (Phosphenes)", "Microphone -> Auditory Brainstem Implant"],
    bciRelevance: "Restores artificial sight and sound directly to the brain."
  },

  // CATEGORY 9: Limbic System, Emotions & Stress (Q56 - Q60)
  {
    id: 56,
    question: "Which brain regions control emotions?",
    category: "Limbic System & Emotions",
    difficulty: "Scratch / Basic",
    shortAnswer: "The Limbic System: Amygdala, Hippocampus, Hypothalamus, Anterior Cingulate Cortex (ACC), and Ventromedial Prefrontal Cortex (vmPFC).",
    detailedExplanation: "Emotions arise from subcortical evaluation structures (Amygdala) integrated with cognitive cortical control (Prefrontal Cortex). The Hypothalamus executes physical emotional responses (heart rate, sweating) via autonomic nervous system.",
    mindMapNodes: ["Emotional Network", "Amygdala (Threat/Fear)", "Prefrontal Cortex (Regulation)", "Hypothalamus (Autonomic Response)"],
    bciRelevance: "Affective BCIs decode emotional states (valence & arousal) for mental health monitoring."
  },
  {
    id: 57,
    question: "What is the limbic system?",
    category: "Limbic System & Emotions",
    difficulty: "Scratch / Basic",
    shortAnswer: "A complex set of interconnected structures surrounding the brainstem involved in emotion, motivation, memory, and autonomic drive.",
    detailedExplanation: "Comprises the cingulate gyrus, parahippocampal gyrus, hippocampus, amygdala, septal nuclei, and mammillary bodies (Papez Circuit). It connects high-level conscious cortical thoughts with subconscious bodily physiological states.",
    mindMapNodes: ["Limbic System Ring", "Papez Circuit", "Emotion + Motivation + Memory Bridge"],
    bciRelevance: "Monitored in passive BCIs for detecting stress, frustration, and depression."
  },
  {
    id: 58,
    question: "What roles do the amygdala & hippocampus play?",
    category: "Limbic System & Emotions",
    difficulty: "Intermediate",
    shortAnswer: "• Amygdala: Processes threat detection, fear conditioning, and emotional valence.\n• Hippocampus: Encodes declarative memories and spatial context.",
    detailedExplanation: "They work in tandem: The Amygdala tags events with emotional intensity (e.g., fear or joy), which signals the Hippocampus to consolidate those emotionally salient events more strongly into long-term memory.",
    mindMapNodes: ["Amygdala vs Hippocampus", "Amygdala (Emotional Salience & Fear)", "Hippocampus (Contextual Memory Storage)"],
    bciRelevance: "Bi-directional emotional memory research and closed-loop PTSD neurostimulation."
  },
  {
    id: 59,
    question: "How does stress affect brain function?",
    category: "Limbic System & Emotions",
    difficulty: "Intermediate",
    shortAnswer: "Triggers the HPA Axis (Hypothalamic-Pituitary-Adrenal), releasing Cortisol. Chronic high cortisol shrinks hippocampal dendrites and impairs prefrontal working memory.",
    detailedExplanation: "Short-term stress enhances alertness (adrenaline). Chronic stress causes excitotoxicity in the hippocampus, expands amygdala dendritic branching (hyper-reactivity), and disrupts prefrontal executive control.",
    mindMapNodes: ["Stress Response (HPA Axis)", "Cortisol Surge", "Prefrontal Memory Impairment", "Amygdala Hyper-Reactivity"],
    bciRelevance: "Passive BCIs detect stress surges via Frontal Alpha Asymmetry (FAA) shifts."
  },
  {
    id: 60,
    question: "Does emotions affect/influence EEG signals?",
    category: "Limbic System & Emotions",
    difficulty: "Advanced BCI",
    shortAnswer: "Yes! Positive emotions shift alpha power asymmetry toward the Left Frontal Cortex (F3), while negative/withdrawal emotions shift alpha power toward the Right Frontal Cortex (F4).",
    detailedExplanation: "Frontal Alpha Asymmetry (FAA = ln[Right Alpha] - ln[Left Alpha]) serves as a robust metric:\n• **Higher Left Frontal Activity** (lower left alpha power) = Approach motivation, positive affect.\n• **Higher Right Frontal Activity** (lower right alpha power) = Withdrawal motivation, anxiety/depression.",
    mindMapNodes: ["Frontal Alpha Asymmetry (FAA)", "Left Frontal (F3) = Positive / Approach", "Right Frontal (F4) = Negative / Avoidance"],
    keyFormulaOrConcept: "FAA Index = ln( PSD_F4_alpha ) - ln( PSD_F3_alpha )",
    bciRelevance: "Core algorithm in Affective BCIs for emotion recognition and neurofeedback therapy."
  },

  // CATEGORY 10: Sleep, Brain Waves & Memory Consolidation (Q61 - Q64)
  {
    id: 61,
    question: "Why does the brain need sleep?",
    category: "Sleep & Brain Waves",
    difficulty: "Scratch / Basic",
    shortAnswer: "For metabolic waste clearance (Glymphatic System), cellular repair, synaptic homeostasis, and memory consolidation.",
    detailedExplanation: "During sleep, astroglial channels dilate, allowing cerebrospinal fluid (CSF) to flush out toxic metabolic byproducts including amyloid-beta. Sleep also downscales saturated synaptic weights (Synaptic Homeostasis Hypothesis).",
    mindMapNodes: ["Functions of Sleep", "Glymphatic CSF Waste Clearance", "Synaptic Homeostasis Downscaling", "Memory Consolidation"],
    bciRelevance: "Sleep EEG polysomnography is the gold-standard diagnostic tool for sleep disorders."
  },
  {
    id: 62,
    question: "What changes occur in brain waves during sleep?",
    category: "Sleep & Brain Waves",
    difficulty: "Intermediate",
    shortAnswer: "Progression from fast Beta/Alpha (wakefulness) -> Theta (N1/N2) -> High-amplitude Slow Delta waves (N3 SWS) -> Sawtooth Beta-like waves with rapid eye movements (REM).",
    detailedExplanation: "• **N1**: Alpha disappears, Theta (4-7 Hz) emerges.\n• **N2**: Sleep Spindles (12-14 Hz bursts) & K-Complexes.\n• **N3 (Slow Wave Sleep)**: High-voltage Delta (<2 Hz) dominant (>20% of epoch).\n• **REM**: Low-voltage mixed frequency similar to wakefulness; muscle atonia.",
    mindMapNodes: ["Sleep Stage Architecture", "Wake (Beta/Alpha)", "N1 (Theta)", "N2 (Spindles & K-Complexes)", "N3 (Slow Delta Waves)", "REM (Paradoxical Fast Waves)"],
    bciRelevance: "Automated machine learning algorithms classify sleep stages from single-channel EEG."
  },
  {
    id: 63,
    question: "How does sleep improve learning & memory?",
    category: "Sleep & Brain Waves",
    difficulty: "Intermediate",
    shortAnswer: "Through Memory Replay: Hippocampal Sharp-Wave Ripples during N3 sleep replay daily experiences, transferring memories to neocortex for permanent storage.",
    detailedExplanation: "Triple phase-coupling during N3 sleep: Slow Oscillations (<1 Hz) in neocortex sync with Sleep Spindles (12-14 Hz) in thalamus and Sharp-Wave Ripples (150-250 Hz) in hippocampus, driving neocortical synaptic consolidation.",
    mindMapNodes: ["Memory Consolidation Triple Coupling", "Neocortical Slow Oscillations (<1Hz)", "Thalamic Sleep Spindles (12-14Hz)", "Hippocampal Ripples (150-250Hz)"],
    bciRelevance: "Closed-loop auditory BCI stimulation plays targeted sounds during slow oscillations to boost memory retention."
  },
  {
    id: 64,
    question: "Can lack of sleep affect EEG recordings?",
    category: "Sleep & Brain Waves",
    difficulty: "Intermediate",
    shortAnswer: "Yes. Sleep deprivation causes increased baseline Theta power, slowed Peak Alpha Frequency, micro-sleep episodes, and degraded signal-to-noise ratio.",
    detailedExplanation: "Fatigued subjects show involuntary bursts of Theta waves during waking tasks, slowing response times and drastically reducing BCI classification accuracy.",
    mindMapNodes: ["Sleep Deprivation EEG Effects", "Elevated Waking Theta Power", "Slowed Peak Alpha Frequency", "Reduced BCI Classification Accuracy"],
    bciRelevance: "BCI algorithms monitor sleepiness indices to alert drivers or re-calibrate control sensitivity."
  },

  // CATEGORY 11: Neurotransmitters & Chemical Signaling (Q65 - Q68)
  {
    id: 65,
    question: "What are neurotransmitters?",
    category: "Neurotransmitters & Chemistry",
    difficulty: "Scratch / Basic",
    shortAnswer: "Chemical messengers released by presynaptic neurons across the synaptic cleft to bind postsynaptic receptors, transmitting excitatory, inhibitory, or modulatory signals.",
    detailedExplanation: "Synthesized in soma or axon terminals, packaged into synaptic vesicles, released via Ca2+ exocytosis into the 20nm cleft, and cleared via reuptake pumps or enzymatic breakdown.",
    mindMapNodes: ["Neurotransmitter Life Cycle", "Synthesis -> Vesicle Packaging -> Ca2+ Exocytosis -> Receptor Binding -> Reuptake/Breakdown"],
    bciRelevance: "Neurochemical sensors (fast-scan cyclic voltammetry) integrate with electrical BCIs for neurochemical decoding."
  },
  {
    id: 66,
    question: "What roles do dopamine, serotonin, GABA, glutamate, acetylcholine play?",
    category: "Neurotransmitters & Chemistry",
    difficulty: "Scratch / Basic",
    shortAnswer: "• Glutamate: Primary Excitatory neurotransmitter.\n• GABA: Primary Inhibitory neurotransmitter.\n• Dopamine: Reward, motivation, motor control.\n• Serotonin: Mood regulation, sleep, appetite.\n• Acetylcholine: Neuromuscular junction contraction, attention.",
    detailedExplanation: "• **Glutamate**: Opens Na+/Ca2+ channels (EPSPs).\n• **GABA**: Opens Cl- channels (IPSPs); prevents seizures.\n• **Dopamine**: Produced in VTA & Substantia Nigra; drives reinforcement learning.\n• **Serotonin (5-HT)**: Produced in Raphe nuclei; regulates emotional stability.\n• **Acetylcholine (ACh)**: Triggers muscle contraction at neuromuscular junction; fuels arousal in basal forebrain.",
    mindMapNodes: ["Key Neurotransmitters", "Glutamate (Major Excitation)", "GABA (Major Inhibition)", "Dopamine (Reward & Motor)", "Serotonin (Mood)", "Acetylcholine (Muscle & Focus)"],
    bciRelevance: "Determines overall brain excitability states and signal-to-noise ratios."
  },
  {
    id: 67,
    question: "How do neurotransmitters affect learning & movement?",
    category: "Neurotransmitters & Chemistry",
    difficulty: "Intermediate",
    shortAnswer: "Glutamate and GABA balance controls precise firing and LTP plasticity; Dopamine signals prediction errors for reinforcement learning; Acetylcholine focuses attention.",
    detailedExplanation: "Dopamine surges signal 'Reward Prediction Errors' (RPE) in striatum, strengthening corticostriatal synapses during motor skill acquisition.",
    mindMapNodes: ["Neurotransmitters in Learning", "Glutamate (LTP Induction)", "Dopamine (Reward Prediction Error)", "Acetylcholine (Attentional Signal Gating)"],
    bciRelevance: "Provides the biological foundation for reinforcement learning models in BCI control."
  },
  {
    id: 68,
    question: "Which neurotransmitters are most relevant to BCI?",
    category: "Neurotransmitters & Chemistry",
    difficulty: "Intermediate",
    shortAnswer: "Glutamate and GABA (for local cortical field potential generation and ERD), Dopamine (for motor motivation and DBS), and Acetylcholine (for attentional focus).",
    detailedExplanation: "GABAergic interneuron networks directly generate Gamma rhythms and Mu/Alpha desynchronization recorded by BCI scalp electrodes.",
    mindMapNodes: ["BCI-Relevant Neurotransmitters", "GABA (Rhythm & ERD Generation)", "Glutamate (Pyramidal PSPs)", "Dopamine (DBS Target)"],
    bciRelevance: "Directly governs the frequency power dynamics processed by BCI decoders."
  },

  // CATEGORY 12: EEG Signal Acquisition, 10-20 Placement & Artifacts (Q74 - Q79)
  {
    id: 74,
    question: "Why is EEG non-invasive?",
    category: "EEG Acquisition & 10-20 System",
    difficulty: "Scratch / Basic",
    shortAnswer: "Because electrodes are placed entirely on the surface of the scalp without surgery, skin incision, or penetration of tissue.",
    detailedExplanation: "Makes EEG safe, low-cost, repeatable, and easily usable for consumer and clinical BCI applications compared to invasive surgeries (electrocorticography ECoG or intracortical Utah arrays).",
    mindMapNodes: ["Non-Invasive EEG", "Surface Scalp Electrodes", "Zero Surgical Risk", "High Temporal Resolution / Safe"],
    bciRelevance: "The most practical and accessible paradigm for consumer and neurorehabilitation BCIs."
  },
  {
    id: 75,
    question: "Why does EEG have poor spatial resolution?",
    category: "EEG Acquisition & 10-20 System",
    difficulty: "Scratch / Basic",
    shortAnswer: "Because the skull and scalp act as spatial low-pass filters that diffuse and blur microvolt electrical fields across several centimeters before reaching the electrode.",
    detailedExplanation: "Electrical currents spread laterally through highly resistive skull bone. A single scalp electrode averages signals from over 10 cm² of underlying cortex (~100 million neurons), making precise millimeter source localization difficult.",
    mindMapNodes: ["Poor Spatial Resolution Causes", "High Skull Electrical Resistance", "Lateral Current Diffusion", "10 cm² Averaging Area"],
    bciRelevance: "Mitigated using spatial filtering algorithms like Laplacian filters, CAR (Common Average Reference), and CSP."
  },
  {
    id: 76,
    question: "Which EEG electrode locations correspond to motor cortex?",
    category: "EEG Acquisition & 10-20 System",
    difficulty: "Scratch / Basic",
    shortAnswer: "C3 (Left Motor Cortex - controls Right hand/side), C4 (Right Motor Cortex - controls Left hand/side), and Cz (Midline Motor Cortex - controls Feet/Legs).",
    detailedExplanation: "Positioned central to the head over the precentral gyrus according to the International 10-20 System. Surrounding electrodes include FC3, FC4 (premotor) and CP3, CP4 (somatosensory).",
    mindMapNodes: ["Motor Cortex Electrodes", "C3 (Left Motor / Right Hand)", "C4 (Right Motor / Left Hand)", "Cz (Midline / Feet & Legs)"],
    bciRelevance: "The core channels used for 2-class and 3-class Motor Imagery BCIs."
  },
  {
    id: 77,
    question: "Why are electrodes placed using the 10-20 system?",
    category: "EEG Acquisition & 10-20 System",
    difficulty: "Scratch / Basic",
    shortAnswer: "To ensure standardized, reproducible electrode placement across different head sizes by spacing electrodes at 10% and 20% intervals of total skull dimensions.",
    detailedExplanation: "Uses anatomical landmarks: Nasion (bridge of nose), Inion (bump at back of skull), and Preauricular points (front of ears). Letter codes designate lobe: F (Frontal), C (Central), T (Temporal), P (Parietal), O (Occipital); Odd numbers = Left, Even numbers = Right, 'z' = Midline.",
    mindMapNodes: ["International 10-20 System", "Nasion & Inion Landmarks", "10% / 20% Proportional Spacing", "Standardized Universal Placement"],
    bciRelevance: "Ensures BCI classifiers trained on standard channel layouts work reliably across different subjects."
  },
  {
    id: 78,
    question: "What are EEG artifacts?",
    category: "EEG Acquisition & 10-20 System",
    difficulty: "Scratch / Basic",
    shortAnswer: "Unwanted electrical signals originating from non-brain sources that contaminate pure neural EEG recordings.",
    detailedExplanation: "Divided into:\n1. **Physiological Artifacts**: Eye blinks/movements (EOG), muscle tension (EMG), heartbeats (ECG), sweating (EDA).\n2. **Non-Physiological Artifacts**: 50/60 Hz powerline hum, electrode movement/loose contact, cable sway.",
    mindMapNodes: ["EEG Artifact Classification", "Physiological (EOG Blinks, EMG Muscle, ECG Heart)", "Non-Physiological (60Hz Powerline, Loose Electrodes)"],
    bciRelevance: "Artifacts can drown out microvolt EEG signals (>100 uV blink vs 10 uV brain wave), requiring online filtering."
  },
  {
    id: 79,
    question: "How do blinking, muscle movements & eye movements affect EEG?",
    category: "EEG Acquisition & 10-20 System",
    difficulty: "Intermediate",
    shortAnswer: "They generate high-amplitude electrical spikes (up to 200+ µV) that swamp brain signals:\n• Blinking/Eye movements (EOG): High-voltage low-frequency spikes at frontal channels (Fp1, Fp2).\n• Muscle clenching (EMG): High-frequency noise (>30 Hz) across temporal/occipital channels.",
    detailedExplanation: "The eye acts as an electric dipole (cornea positive relative to retina). Rotating or blinking the eye produces massive potential shifts on frontal electrodes. Jaw clenching recruits masseter muscle motor units, flooding high frequencies across the spectrum.",
    mindMapNodes: ["Artifact Impacts", "EOG Blinks -> Frontal Spikes (Fp1/Fp2)", "EMG Jaw Clench -> High-Frequency Noise (>30Hz)", "Independent Component Analysis (ICA) Removal"],
    keyFormulaOrConcept: "ICA Decomposition: X = A * S  (Isolates blink components for rejection)",
    bciRelevance: "Cleaned using online notch filters, bandpass filters, and ICA / EOG artifact subtraction algorithms."
  },
  {
    id: 80,
    question: "How do Generative Adversarial Networks (GANs) solve data scarcity in EEG BCI?",
    category: "Generative AI & Advanced BCI",
    difficulty: "Advanced BCI",
    shortAnswer: "GANs (like WGAN-GP) train a Generator to produce realistic synthetic EEG trial waveforms and a Discriminator to evaluate authenticity, augmenting limited subject training data.",
    detailedExplanation: "EEG data collection suffers from subject fatigue and small sample sizes (~100 trials per subject). A Wasserstein GAN with Gradient Penalty (WGAN-GP) learns the underlying spatiotemporal frequency distribution of multi-channel motor imagery or ERP signals. It generates synthetic EEG trials that expand dataset size, improving downstream Deep Learning (EEGNet/Conformer) classification accuracy by 10-15%.",
    mindMapNodes: ["EEG GAN Augmentation", "Generator (Latent Noise -> EEG Waveforms)", "Discriminator (Real vs Synthetic EEG Evaluator)", "WGAN-GP Loss Stability", "Classifiers Boost +12% Accuracy"],
    keyFormulaOrConcept: "L_WGAN = E[D(x_real)] - E[D(G(z))] - λ * E[(||∇_x̂ D(x̂)||_2 - 1)^2]",
    bciRelevance: "Critical for zero-shot subject transfer and training robust BCI neural decoders with minimal calibrate session time."
  },
  {
    id: 81,
    question: "How do Vision Transformers (ViT) and Mind-Vis reconstruct perceived images from brain signals?",
    category: "Generative AI & Advanced BCI",
    difficulty: "Advanced BCI",
    shortAnswer: "Mind-Vis maps EEG/fMRI neural embeddings into a pre-trained Latent Diffusion / Vision Transformer embedding space using cross-attention, decoding mental visual imagery into high-fidelity images.",
    detailedExplanation: "1. **Neural Encoder**: A Masked Autoencoder (MAE) or Conformer encodes multi-channel brain signals into neural embeddings.\n2. **Cross-Attention Bridge**: Aligns non-invasive neural representations with CLIP image text embeddings.\n3. **Latent Diffusion Decoder**: A pre-trained visual generator (e.g. Stable Diffusion / ViT) uses conditioned cross-attention to reconstruct the exact visual scene or object the user is looking at or imagining.",
    mindMapNodes: ["Mind-Vis Visual Reconstruction", "EEG/fMRI Neural MAE Encoder", "Cross-Attention Projection Layer", "CLIP Latent Space Alignment", "Latent Diffusion Image Reconstruction"],
    keyFormulaOrConcept: "Attention(Q_neural, K_clip, V_clip) = softmax(Q_n K_c^T / √d_k) * V_c",
    bciRelevance: "Enables non-verbal communication where paralyzed patients can reconstruct mental images and complex visual concepts directly from brain waves."
  },
  {
    id: 82,
    question: "What are Spiking Neural Networks (SNNs) & why are they ideal for ultra-low power implantable BCIs?",
    category: "Generative AI & Advanced BCI",
    difficulty: "Advanced BCI",
    shortAnswer: "SNNs mimic biological neurons by processing discrete event-driven asynchronous electrical spikes (action potentials), consuming 100x-1000x less power than conventional ANNs.",
    detailedExplanation: "Standard Artificial Neural Networks compute continuous matrix multiplications synchronously at every clock cycle, causing high heat and milliwatt power draw incompatible with brain implants. SNNs use Leaky Integrate-and-Fire (LIF) neuron models that only consume energy when an event spike occurs. Running on neuromorphic chips (like Intel Loihi or SpiNNaker), SNNs decode microelectrode spikes in real-time under microwatt (<1 mW) thermal budgets inside the skull.",
    mindMapNodes: ["Neuromorphic SNNs", "Leaky Integrate-and-Fire (LIF) Model", "Event-Driven Asynchronous Spikes", "Microwatt Power Budget (<1 mW)", "Implantable Real-Time Spike Decoding"],
    keyFormulaOrConcept: "tau_m * (dV(t)/dt) = -(V(t) - V_rest) + R * I(t);  if V >= V_th -> Fire Spike & Reset",
    bciRelevance: "Essential for wireless, fully implantable closed-loop neuroprosthetic chips that run safely inside human tissue without thermal injury."
  },
  {
    id: 83,
    question: "How does Adaptive Closed-Loop Deep Brain Stimulation (aDBS) work in neurological disorders?",
    category: "Generative AI & Advanced BCI",
    difficulty: "Advanced BCI",
    shortAnswer: "aDBS continuously records local field potentials (LFPs), detects pathological biomarkers (e.g., beta oscillations in Parkinson's), and dynamically adjusts stimulation current in real-time.",
    detailedExplanation: "Conventional DBS delivers continuous fixed-frequency electrical pulses to basal ganglia structures (STN or GPi), causing battery drain and side effects (dyskinesia, speech impairment). Adaptive DBS uses an integrated bidirectional BCI chip. It monitors subcortical LFP beta band (13-30 Hz) power. When beta pathological synchrony spikes, aDBS fires targeted electrical pulses to suppress tremors, pausing stimulation as soon as normal rhythms return.",
    mindMapNodes: ["Adaptive Closed-Loop DBS (aDBS)", "Bidirectional LFP Recording & Stimulation", "Pathological Beta Biomarker Detection", "Real-Time Pulse Modulation", "Extended Battery Life & Reduced Side Effects"],
    keyFormulaOrConcept: "I_stim(t) = K_p * (P_beta(t) - P_target) + K_i * ∫ (P_beta - P_target) dt",
    bciRelevance: "Pioneers closed-loop biofeedback neurotherapeutics for Parkinson's, refractory epilepsy, OCD, and major depression."
  },
  {
    id: 84,
    question: "Why is Cross-Subject Transfer Learning critical for consumer BCI usability?",
    category: "Generative AI & Advanced BCI",
    difficulty: "Intermediate",
    shortAnswer: "Because non-invasive EEG signals vary dramatically across different individuals due to skull thickness and cortical geometry; transfer learning avoids tedious 30-minute user calibration sessions.",
    detailedExplanation: "In traditional BCIs, a new user must sit through a long, tiring data collection trial before the model works. Cross-subject transfer learning uses Domain Adaptation (e.g., Riemannian Geometry alignment or Adversarial Domain Adaptation) to map a new subject's raw EEG covariance matrices into a standardized latent space trained on hundreds of prior subjects. This enables plug-and-play zero-shot or few-shot BCI operation.",
    mindMapNodes: ["Cross-Subject Transfer Learning", "Inter-Subject EEG Variances", "Riemannian Covariance Alignment", "Domain Adversarial Adaptation", "Zero-Shot Plug-and-Play BCI"],
    keyFormulaOrConcept: "C_aligned = C_ref^(-1/2) * C_raw * C_ref^(-1/2)  (Euclidean Mean Centering)",
    bciRelevance: "Allows consumer BCI headsets to work instantly out of the box without per-session recalibration."
  },
  {
    id: 85,
    question: "What are the core Neural Privacy and Cybersecurity challenges in brain-computer interfaces?",
    category: "Generative AI & Advanced BCI",
    difficulty: "Intermediate",
    shortAnswer: "Unencrypted neural recordings contain implicit private signatures—including subconscious preferences, medical history, passwords, and emotional states—vulnerable to neural spyware attacks.",
    detailedExplanation: "1. **Subliminal Neural Probing**: Malicious BCI apps can insert subliminal visual flashes (e.g., credit card logos or PIN numbers) while measuring P300 brain responses to stealthily extract private knowledge.\n2. **Neural Biometric Encryption**: Raw brain signals must be encrypted on-chip using homomorphic encryption or cancellable neural biometrics before transmission over Bluetooth or cloud APIs.\n3. **Cognitive Liberty**: Establishing neuro-rights protecting human mental privacy, self-determination, and protection from unauthorized neuro-data monetization.",
    mindMapNodes: ["Neuro-Security & Privacy", "P300 Subliminal Probing Attacks", "On-Chip Homomorphic Encryption", "Cancellable Neural Biometrics", "Neuro-Rights Legal Framework"],
    keyFormulaOrConcept: "E_homo(EEG_1 + EEG_2) = E_homo(EEG_1) ⊗ E_homo(EEG_2)",
    bciRelevance: "Mandatory safety architecture for preventing brain hacking and establishing consumer trust in everyday wearable BCI devices."
  },
  {
    id: 86,
    question: "What is the ultimate future roadmap for BCI: from invasive neural threads to synthetic biology & WBE?",
    category: "Generative AI & Advanced BCI",
    difficulty: "Advanced BCI",
    shortAnswer: "The field is evolving across 3 generations: Gen 1 Non-Invasive Wearables -> Gen 2 Ultra-Flexible Implantable Threads (Neuralink/Synchron) -> Gen 3 Optogenetic/Synthetic Biology Interfaces & Whole Brain Emulation.",
    detailedExplanation: "• **Gen 1 (Present)**: High-density EEG, fNIRS, and wearable dry-sensor caps for motor imagery, P300, and attention tracking.\n• **Gen 2 (Near-Term)**: Robotically implanted ultra-thin polymer threads with 1,000+ electrode channels (Neuralink, Paradromics, Synchron stentrode) providing high-bandwidth speech and motor restoration.\n• **Gen 3 (Future Horizon)**: Optogenetic neural steering using light-activated opsins, nanoscale bio-hybrid probes, bi-directional synthetic synapse interfaces, and non-destructive Whole Brain Emulation (WBE) for human-AI symbiosis.",
    mindMapNodes: ["BCI Future Roadmap", "Gen 1: Non-Invasive Wearable EEG/fNIRS", "Gen 2: High-Density Robotic Threads (1000+ Channels)", "Gen 3: Optogenetics & Nano Bio-Hybrids", "Whole Brain Emulation & Human-AI Symbiosis"],
    keyFormulaOrConcept: "Bandwidth Scaling: B(t) = B_0 * 2^(t / 1.5)  (Moore's Law for Neural Data Channel Rate)",
    bciRelevance: "Defines the ultimate trajectory of human intelligence augmentation and seamless digital-biological integration."
  }
];

