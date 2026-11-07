import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'brain',
    question: 'Which cortical Brodmann Area corresponds to the Primary Motor Cortex (M1)?',
    options: ['Brodmann Area 17', 'Brodmann Area 4', 'Brodmann Area 22', 'Brodmann Area 44'],
    correctIndex: 1,
    explanation: 'Brodmann Area 4 located in the precentral gyrus is the Primary Motor Cortex (M1). BA 17 is primary visual cortex, BA 22 is Wernicke’s area, and BA 44 is Broca’s area.',
    depthInsight: 'Betz cells in BA 4 Layer V extend axons directly into the spinal cord, forming the lateral corticospinal tract for fine digit movement control.'
  },
  {
    id: 'q2',
    category: 'bci',
    question: 'In the International 10-20 EEG System, where is electrode Cz located?',
    options: ['Left Occipital Lobe', 'Vertex (Center of scalp along midline)', 'Frontal Pole', 'Temporal Bone'],
    correctIndex: 1,
    explanation: 'Cz is located at the exact vertex (center of the head), 50% between nasion and inion, and 50% between left and right preauricular points.',
    depthInsight: 'Cz and surrounding electrodes (Fz, Pz, C3, C4) are essential for recording sensorimotor mu rhythms and movement-related cortical potentials.'
  },
  {
    id: 'q3',
    category: 'bci',
    question: 'What signal phenomenon is observed over the sensorimotor cortex during Motor Imagery of the right hand?',
    options: [
      'Contralateral Event-Related Desynchronization (ERD) in C3 (left motor strip)',
      'Ipsilateral ERD in C4 with total suppression of Occipital Alpha',
      'Positive P300 wave at 300ms over O1 and O2',
      'SSVEP frequency doubling at 24 Hz'
    ],
    correctIndex: 0,
    explanation: 'Right hand movement imagination activates the contralateral left motor cortex (C3), resulting in localized suppression/desynchronization of Mu/Beta rhythm power (ERD).',
    depthInsight: 'Post-movement relaxation causes Event-Related Synchronization (ERS) or beta rebound, used by BCI algorithms to confirm movement end.'
  },
  {
    id: 'q4',
    category: 'nn',
    question: 'What is the primary role of Depthwise Spatial Convolutions in the EEGNet architecture?',
    options: [
      'To learn frequency bandpass filters across time',
      'To learn spatial filters for electrode channel combinations',
      'To perform recurrent temporal backpropagation',
      'To generate synthetic noise vectors'
    ],
    correctIndex: 1,
    explanation: 'Depthwise convolutions in EEGNet operate across spatial channels (electrodes) for each feature map, learning optimal spatial filters akin to automated CSP.',
    depthInsight: 'By decoupling spatial and temporal convolutions, EEGNet keeps parameter counts under 3,000, drastically mitigating overfitting on small EEG datasets.'
  },
  {
    id: 'q5',
    category: 'gan',
    question: 'How do Generative Adversarial Networks (GANs) assist BCI decoding performance?',
    options: [
      'By replacing the EEG headset hardware with optical sensors',
      'By generating synthetic EEG trial samples to augment sparse training sets',
      'By directly stimulating neurons in the primary visual cortex',
      'By converting analog microvolt signals into 64-bit digital numbers'
    ],
    correctIndex: 1,
    explanation: 'BCI datasets are notoriously small due to human subject fatigue. GANs (like WGAN-GP) synthesize realistic trial data, expanding dataset volume and improving classification.',
    depthInsight: 'Adversarial data augmentation helps BCI models generalize across different recording days and subject fatigue states.'
  },
  {
    id: 'q6',
    category: 'vit',
    question: 'Why are Vision Transformers (ViT) effective for spatial-temporal brain decoding?',
    options: [
      'They do not require matrix multiplications',
      'Multi-Head Self-Attention captures non-local correlations across distant cortical lobes',
      'They only process single-channel electro-oculogram signals',
      'They rely entirely on manual hand-engineered features'
    ],
    correctIndex: 1,
    explanation: 'Self-attention calculates token interactions pairwise across all spatial patches and time windows, learning long-range functional connectivity without local convolution biases.',
    depthInsight: 'In EEG-ViT models, spatial attention maps reveal dynamic information pathways between frontal decision networks and parietal spatial hubs.'
  },
  {
    id: 'q7',
    category: 'gai',
    question: 'In Generative AI Mind-to-Image models like Mind-Vis, what component guides image generation?',
    options: [
      'Random noise without conditioning',
      'Neural latent feature vectors extracted from brain activity conditioning Latent Diffusion',
      'Direct audio waveform synthesis from muscle twitching',
      'Traditional edge detection algorithms on camera feeds'
    ],
    correctIndex: 1,
    explanation: 'Mind-Vis aligns brain representation vectors (from fMRI/EEG) with CLIP visual embeddings, feeding them as cross-attention conditioning into Stable Diffusion.',
    depthInsight: 'This conditioning directs the diffusion model to reconstruct complex visual scenes viewed by a subject with high semantic fidelity.'
  }
];
