import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'brain',
    question: 'What is the primary function of the Precentral Gyrus (Brodmann Area 4)?',
    answer: 'Primary Motor Cortex (M1)',
    explanation: 'The Precentral Gyrus contains large Betz pyramidal neurons that initiate voluntary motor movements arranged as the motor homunculus.',
    difficulty: 'Easy'
  },
  {
    id: 'fc-2',
    category: 'brain',
    question: 'How is the resting membrane potential of a neuron maintained at ~-70 mV?',
    answer: 'Na+/K+-ATPase Pumps & Selective Potassium Permeability',
    explanation: 'The sodium-potassium pump actively pumps 3 Na+ ions out for every 2 K+ ions pumped in, maintaining negative internal polarity.',
    difficulty: 'Medium'
  },
  {
    id: 'fc-3',
    category: 'bci',
    question: 'Which EEG frequency band is characterized by 8-12 Hz oscillations during relaxed wakefulness?',
    answer: 'Alpha Band (Mu Rhythm over Motor Cortex)',
    explanation: 'Alpha waves (8-12 Hz) originate prominently in the occipital lobe when eyes are closed, and as Mu rhythm over motor cortex at rest.',
    difficulty: 'Easy'
  },
  {
    id: 'fc-4',
    category: 'bci',
    question: 'What happens to the Mu rhythm during voluntary movement imagination (Motor Imagery)?',
    answer: 'Event-Related Desynchronization (ERD)',
    explanation: 'Imagining movement causes power suppression (ERD) in the contralateral motor cortex, followed by Event-Related Synchronization (ERS) post-movement.',
    difficulty: 'Medium'
  },
  {
    id: 'fc-5',
    category: 'bci',
    question: 'What is the key advantage of SSVEP over Motor Imagery BCI paradigms?',
    answer: 'Higher Information Transfer Rate (ITR) & Minimal Training',
    explanation: 'SSVEP triggers strong visual resonance matching exact target flicker frequency (e.g. 12 Hz), enabling rapid multi-command selection.',
    difficulty: 'Medium'
  },
  {
    id: 'fc-6',
    category: 'nn',
    question: 'What architectural innovation makes EEGNet well-suited for EEG signal classification?',
    answer: 'Depthwise Spatial & Separable Temporal Convolutions',
    explanation: 'Depthwise spatial convolutions learn channel frequency filters without over-parameterization, handling low sample BCI datasets efficiently.',
    difficulty: 'Hard'
  },
  {
    id: 'fc-7',
    category: 'nn',
    question: 'How do Spiking Neural Networks (SNNs) process temporal neural signals?',
    answer: 'Discrete Binary Spike Trains via Leaky Integrate-and-Fire (LIF) equations',
    explanation: 'SNNs accumulate synaptic inputs over continuous time into membrane potential V_m until threshold V_th fires a spike, mimicking biological neurons.',
    difficulty: 'Hard'
  },
  {
    id: 'fc-8',
    category: 'gan',
    question: 'Why is WGAN-GP preferred over standard DCGAN for synthetic EEG signal generation?',
    answer: 'Prevents Mode Collapse and vanishing gradients via Gradient Penalty',
    explanation: 'EEG data is non-stationary and high-dimensional; WGAN-GP enforces a 1-Lipschitz continuity constraint ensuring stable adversarial training.',
    difficulty: 'Hard'
  },
  {
    id: 'fc-9',
    category: 'vit',
    question: 'How do Vision Transformers (ViT) process multi-channel EEG or fMRI recordings?',
    answer: 'By dividing spatial-temporal recordings into patch tokens with self-attention',
    explanation: 'ViT tokenizes spatial electrode groups and temporal time-windows, using Multi-Head Self-Attention to model non-local cross-hemispheric correlations.',
    difficulty: 'Hard'
  },
  {
    id: 'fc-10',
    category: 'gai',
    question: 'How does Mind-Vis reconstruct visual images from human brain activity?',
    answer: 'Conditioning Latent Diffusion Models on fMRI/EEG neural embeddings',
    explanation: 'Neural responses from visual cortex are encoded into a latent vector that guides Stable Diffusion noise denoising to generate matched images.',
    difficulty: 'Hard'
  }
];
src/data/flashcardsData.tsimport { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'brain',
    question: 'What is the primary function of the Precentral Gyrus (Brodmann Area 4)?',
    answer: 'Primary Motor Cortex (M1)',
    explanation: 'The Precentral Gyrus contains large Betz pyramidal neurons that initiate voluntary motor movements arranged as the motor homunculus.',
    difficulty: 'Easy'
  },
  {
    id: 'fc-2',
    category: 'brain',
    question: 'How is the resting membrane potential of a neuron maintained at ~-70 mV?',
    answer: 'Na+/K+-ATPase Pumps & Selective Potassium Permeability',
    explanation: 'The sodium-potassium pump actively pumps 3 Na+ ions out for every 2 K+ ions pumped in, maintaining negative internal polarity.',
    difficulty: 'Medium'
  },
  {
    id: 'fc-3',
    category: 'bci',
    question: 'Which EEG frequency band is characterized by 8-12 Hz oscillations during relaxed wakefulness?',
    answer: 'Alpha Band (Mu Rhythm over Motor Cortex)',
    explanation: 'Alpha waves (8-12 Hz) originate prominently in the occipital lobe when eyes are closed, and as Mu rhythm over motor cortex at rest.',
    difficulty: 'Easy'
  },
  {
    id: 'fc-4',
    category: 'bci',
    question: 'What happens to the Mu rhythm during voluntary movement imagination (Motor Imagery)?',
    answer: 'Event-Related Desynchronization (ERD)',
    explanation: 'Imagining movement causes power suppression (ERD) in the contralateral motor cortex, followed by Event-Related Synchronization (ERS) post-movement.',
    difficulty: 'Medium'
  },
  {
    id: 'fc-5',
    category: 'bci',
    question: 'What is the key advantage of SSVEP over Motor Imagery BCI paradigms?',
    answer: 'Higher Information Transfer Rate (ITR) & Minimal Training',
    explanation: 'SSVEP triggers strong visual resonance matching exact target flicker frequency (e.g. 12 Hz), enabling rapid multi-command selection.',
    difficulty: 'Medium'
  },
  {
    id: 'fc-6',
    category: 'nn',
    question: 'What architectural innovation makes EEGNet well-suited for EEG signal classification?',
    answer: 'Depthwise Spatial & Separable Temporal Convolutions',
    explanation: 'Depthwise spatial convolutions learn channel frequency filters without over-parameterization, handling low sample BCI datasets efficiently.',
    difficulty: 'Hard'
  },
  {
    id: 'fc-7',
    category: 'nn',
    question: 'How do Spiking Neural Networks (SNNs) process temporal neural signals?',
    answer: 'Discrete Binary Spike Trains via Leaky Integrate-and-Fire (LIF) equations',
    explanation: 'SNNs accumulate synaptic inputs over continuous time into membrane potential V_m until threshold V_th fires a spike, mimicking biological neurons.',
    difficulty: 'Hard'
  },
  {
    id: 'fc-8',
    category: 'gan',
    question: 'Why is WGAN-GP preferred over standard DCGAN for synthetic EEG signal generation?',
    answer: 'Prevents Mode Collapse and vanishing gradients via Gradient Penalty',
    explanation: 'EEG data is non-stationary and high-dimensional; WGAN-GP enforces a 1-Lipschitz continuity constraint ensuring stable adversarial training.',
    difficulty: 'Hard'
  },
  {
    id: 'fc-9',
    category: 'vit',
    question: 'How do Vision Transformers (ViT) process multi-channel EEG or fMRI recordings?',
    answer: 'By dividing spatial-temporal recordings into patch tokens with self-attention',
    explanation: 'ViT tokenizes spatial electrode groups and temporal time-windows, using Multi-Head Self-Attention to model non-local cross-hemispheric correlations.',
    difficulty: 'Hard'
  },
  {
    id: 'fc-10',
    category: 'gai',
    question: 'How does Mind-Vis reconstruct visual images from human brain activity?',
    answer: 'Conditioning Latent Diffusion Models on fMRI/EEG neural embeddings',
    explanation: 'Neural responses from visual cortex are encoded into a latent vector that guides Stable Diffusion noise denoising to generate matched images.',
    difficulty: 'Hard'
  }
];
