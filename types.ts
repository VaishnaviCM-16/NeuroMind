export type TabType = 'handwritten-qa' | 'mind-maps' | '3d-brain' | 'bci-sim' | 'ai-models' | 'animations' | 'theory' | 'rag-inspector' | 'flashcards' | 'quiz' | 'chatbot' | 'analytics-awards';

export type TheoryCategory = 'scratch' | 'brain' | 'bci' | 'nn' | 'gan' | 'vit' | 'gai';

export interface CourseCertificate {
  id: string;
  courseName: string;
  level: string;
  issuedDate: string;
  score: number;
  skillsVerified: string[];
  certificateCode: string;
}

export interface UserAccount {
  id: string;
  username: string;
  fullName?: string;
  email?: string;
  createdAt: string;
  completedNodes: string[];
  masteredFlashcards: string[];
  quizScore: number;
  completedQuizzes?: Record<string, number>;
  certificates?: CourseCertificate[];
  xp?: number;
  level: number;
}

export interface MindMapNode {
  id: string;
  level: 0 | 1 | 2 | 3 | 4; // 0: Scratch, 1: Signal/BCI, 2: Deep Learning, 3: Generative, 4: Advanced Mind-Vis
  title: string;
  subtitle: string;
  category: TheoryCategory;
  description: string;
  keyTakeaways: string[];
  connectedTo: string[]; // Node IDs
  formula?: string;
  interactiveSimId?: string;
}

export interface TheoryArticle {
  id: string;
  category: TheoryCategory;
  title: string;
  subtitle: string;
  level: 'Scratch' | 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    codeOrFormula?: string;
    keyTakeaways?: string[];
  }[];
  tags: string[];
}

export interface DocumentChunk {
  id: string;
  title: string;
  category: TheoryCategory;
  content: string;
  keywords: string[];
  embeddingVector?: number[]; // Simulating 384-d or 768-d embedding
}

export interface RagSearchResult {
  chunk: DocumentChunk;
  similarityScore: number;
}

export interface Flashcard {
  id: string;
  category: TheoryCategory;
  question: string;
  answer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizQuestion {
  id: string;
  category: TheoryCategory;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  depthInsight: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  ragContext?: RagSearchResult[];
  isStreaming?: boolean;
}

export interface BrainLobeInfo {
  id: string;
  name: string;
  color: string;
  functions: string[];
  bciRelevance: string;
  description: string;
  electrodes: string[];
}

export interface BciChannelData {
  time: number;
  rawPcm: number;
  filteredAlpha: number;
  filteredBeta: number;
  artifactNoise: number;
}

