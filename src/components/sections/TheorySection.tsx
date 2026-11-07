import React, { useState } from 'react';
import { THEORY_ARTICLES } from '../../data/neuroKnowledgeBase';
import { TheoryCategory } from '../../types';
import { InfographicCard } from '../infographics/InfographicCard';
import { BookOpen, Search, CheckCircle2, ChevronRight, Code, Layers, FileText, Sparkles, HelpCircle, Activity, Brain, Cpu, Network, RotateCw, Lightbulb, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TheorySectionProps {
  initialArticleId?: string;
  onNavigateToTab?: (tab: any) => void;
  onSelectVideo?: (videoId: string) => void;
}

// Visual SVG Diagram Component for Theory Articles
const ArticleDiagram: React.FC<{ articleId: string }> = ({ articleId }) => {
  if (articleId === 'node-0-1' || articleId === 'node-0-2' || articleId === 'node-0-3') {
    // Action Potential Curve & Synaptic Signal Transmission Diagram
    return (
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
          <span className="flex items-center space-x-1">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Interactive Diagram: Action Potential Voltage Curve & lon Flux</span>
          </span>
          <span className="text-[10px] text-slate-500">Hodgkin-Huxley Model</span>
        </div>
        <div className="w-full h-48 bg-slate-900/80 rounded-xl p-2 relative flex items-center justify-center border border-slate-800">
          <svg viewBox="0 0 500 180" className="w-full h-full">
            {/* Grid background */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
            <rect width="500" height="180" fill="url(#grid)" />

            {/* Threshold line */}
            <line x1="40" y1="120" x2="460" y2="120" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="400" y="115" fill="#f59e0b" fontSize="10" fontFamily="monospace">Threshold (-55mV)</text>

            {/* Resting line */}
            <line x1="40" y1="140" x2="460" y2="140" stroke="#64748b" strokeDasharray="2 2" strokeWidth="1" />
            <text x="400" y="152" fill="#64748b" fontSize="10" fontFamily="monospace">Resting (-70mV)</text>

            {/* Waveform curve */}
            <path
              d="M 40 140 L 110 140 Q 130 140 145 120 L 180 30 L 220 160 L 260 145 Q 300 140 460 140"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Annotations */}
            <circle cx="180" cy="30" r="5" fill="#10b981" />
            <text x="185" y="25" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">Peak (+30mV Na+ Influx)</text>

            <circle cx="220" cy="160" r="5" fill="#a855f7" />
            <text x="225" y="172" fill="#a855f7" fontSize="10" fontFamily="monospace">Undershoot K+ Outflux</text>

            <text x="60" y="132" fill="#38bdf8" fontSize="10" fontFamily="monospace">Depolarization</text>
          </svg>
        </div>
      </div>
    );
  }

  if (articleId.includes('1-1') || articleId.includes('1-2') || articleId.includes('1-3')) {
    // 10-20 EEG Scalp Electrode Head Diagram
    return (
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
          <span className="flex items-center space-x-1">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>Interactive Diagram: International 10-20 EEG Scalp Electrode Topography</span>
          </span>
          <span className="text-[10px] text-slate-500">Anatomical Head Mapping</span>
        </div>
        <div className="w-full h-48 bg-slate-900/80 rounded-xl p-2 relative flex items-center justify-center border border-slate-800">
          <svg viewBox="0 0 300 180" className="w-full h-full">
            {/* Scalp Circle */}
            <circle cx="150" cy="90" r="75" fill="none" stroke="#334155" strokeWidth="3" />
            {/* Nose indicator */}
            <path d="M 142 15 L 150 2 L 158 15 Z" fill="#06b6d4" />
            <text x="138" y="-2" fill="#06b6d4" fontSize="9" fontFamily="monospace">Nasion</text>

            {/* Ears */}
            <ellipse cx="68" cy="90" rx="6" ry="14" fill="#1e293b" stroke="#475569" />
            <ellipse cx="232" cy="90" rx="6" ry="14" fill="#1e293b" stroke="#475569" />

            {/* Electrodes */}
            {[
              { name: 'Fp1', x: 120, y: 40, color: '#06b6d4' },
              { name: 'Fp2', x: 180, y: 40, color: '#06b6d4' },
              { name: 'Fz', x: 150, y: 65, color: '#38bdf8' },
              { name: 'C3', x: 105, y: 90, color: '#a855f7' },
              { name: 'Cz', x: 150, y: 90, color: '#a855f7' },
              { name: 'C4', x: 195, y: 90, color: '#a855f7' },
              { name: 'Pz', x: 150, y: 120, color: '#f59e0b' },
              { name: 'O1', x: 120, y: 145, color: '#10b981' },
              { name: 'O2', x: 180, y: 145, color: '#10b981' },
            ].map((el, i) => (
              <g key={i}>
                <circle cx={el.x} cy={el.y} r="10" fill={el.color} opacity="0.9" />
                <text x={el.x} y={el.y + 3} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  {el.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  // Generic Deep Learning & Transformer Attention Pipeline Diagram
  return (
    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
      <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
        <span className="flex items-center space-x-1">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>Interactive Architectural Diagram: Multi-Head Self-Attention Matrix</span>
        </span>
        <span className="text-[10px] text-slate-500">Deep Learning Pipeline</span>
      </div>
      <div className="w-full h-44 bg-slate-900/80 rounded-xl p-3 flex items-center justify-around border border-slate-800">
        <div className="flex flex-col items-center p-2 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Input EEG</span>
          <div className="w-12 h-12 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs mt-1">
            X (T, C)
          </div>
        </div>

        <div className="text-slate-600 font-mono text-lg">➔</div>

        <div className="flex flex-col items-center p-2 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-mono text-indigo-400 uppercase">Q, K, V Projection</span>
          <div className="flex space-x-1 mt-1">
            <span className="px-2 py-1 rounded bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-bold text-[10px]">Q</span>
            <span className="px-2 py-1 rounded bg-purple-950 border border-purple-500/40 text-purple-300 font-bold text-[10px]">K</span>
            <span className="px-2 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-[10px]">V</span>
          </div>
        </div>

        <div className="text-slate-600 font-mono text-lg">➔</div>

        <div className="flex flex-col items-center p-2 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] font-mono text-amber-400 uppercase">Softmax (QK^T / √d_k)</span>
          <div className="w-16 h-12 rounded-lg bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-xs mt-1">
            Attention
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Flashcard Widget inside theory reader
const TheoryInlineFlashcard: React.FC<{ articleId: string }> = ({ articleId }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getFlashcardContent = () => {
    if (articleId.includes('0-1')) {
      return {
        question: 'What triggers the rapid Depolarization phase of an Action Potential?',
        answer: 'Voltage-gated Sodium (Na+) channels open at threshold (-55mV), allowing rapid influx of positive Na+ ions into the intracellular axon.',
      };
    }
    if (articleId.includes('1-1')) {
      return {
        question: 'What is ERD (Event-Related Desynchronization) in Motor Imagery BCIs?',
        answer: 'ERD is the localized power drop in 8-12 Hz Mu/Beta brainwaves over the contralateral motor strip during imagined motor movement (e.g. C4 for left hand).',
      };
    }
    return {
      question: 'Why are Vision Transformers (ViT) effective for EEG spectral decoding?',
      answer: 'Self-attention mechanisms capture long-range temporal dependencies across distant scalp channels without local receptive field restrictions.',
    };
  };

  const card = getFlashcardContent();

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-2xl border border-cyan-500/30 space-y-3">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="flex items-center space-x-1.5 text-amber-400 font-bold">
          <Lightbulb className="w-4 h-4" />
          <span>Interactive Concept Flashcard (Click to Flip)</span>
        </span>
        <span className="text-[10px] text-slate-500">Spaced Repetition Test</span>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="min-h-[110px] bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between relative group"
      >
        <div className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center justify-between">
          <span>{isFlipped ? 'Answer Key' : 'Flashcard Question'}</span>
          <RotateCw className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform duration-500" />
        </div>

        <p className="text-sm font-medium text-slate-100 my-2">
          {isFlipped ? card.answer : card.question}
        </p>

        <div className="text-[10px] font-mono text-slate-500 text-right">
          {isFlipped ? 'Click to show question' : 'Click to reveal answer'}
        </div>
      </div>
    </div>
  );
};

export const TheorySection: React.FC<TheorySectionProps> = ({
  initialArticleId,
  onNavigateToTab,
  onSelectVideo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TheoryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleId, setActiveArticleId] = useState<string>(
    initialArticleId || THEORY_ARTICLES[0].id
  );

  React.useEffect(() => {
    if (initialArticleId) {
      const exists = THEORY_ARTICLES.some((a) => a.id === initialArticleId);
      if (exists) {
        setActiveArticleId(initialArticleId);
      }
    }
  }, [initialArticleId]);

  const filteredArticles = THEORY_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeArticle = THEORY_ARTICLES.find((a) => a.id === activeArticleId) || THEORY_ARTICLES[0];

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
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">In-Depth Scientific Theory</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Neuroscience & Neuro-AI Knowledge Modules</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Rich interactive visual diagrams, 3D anatomical models, formulas, equations, and spaced-repetition flashcard widgets.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search theory, equations, terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/80">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'brain', label: 'Human Brain Anatomy' },
            { id: 'bci', label: 'BCI Systems & EEG' },
            { id: 'nn', label: 'Neural Networks (SNN/CNN)' },
            { id: 'gan', label: 'GANs & Data Augmentation' },
            { id: 'vit', label: 'Vision Transformers (ViT)' },
            { id: 'gai', label: 'Generative AI (Mind-Vis)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Articles List Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Articles ({filteredArticles.length})
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredArticles.map((art) => {
              const isSelected = activeArticle.id === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => setActiveArticleId(art.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/60 text-slate-100 shadow-xl'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                    <span className="uppercase font-bold">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-200 leading-snug">{art.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{art.summary}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Article Reading Reader Panel */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArticle.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Article Header */}
              <div className="border-b border-slate-800 pb-5">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase font-bold mb-2">
                  <span>{activeArticle.category}</span>
                  <span>•</span>
                  <span className="text-slate-400">{activeArticle.level} Level</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-100">{activeArticle.title}</h1>
                <p className="text-sm text-slate-400 mt-1">{activeArticle.subtitle}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activeArticle.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Infographic & Diagram Insertion */}
              <InfographicCard nodeId={activeArticle.id} />
              <ArticleDiagram articleId={activeArticle.id} />

              {/* Sections Body */}
              <div className="space-y-6">
                {activeArticle.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>{sec.heading}</span>
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">{sec.content}</p>

                    {sec.codeOrFormula && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-cyan-300 overflow-x-auto">
                        <pre>{sec.codeOrFormula}</pre>
                      </div>
                    )}

                    {sec.keyTakeaways && (
                      <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                        <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Key Scientific Takeaways:</div>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {sec.keyTakeaways.map((kt, kIdx) => (
                            <li key={kIdx} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                              <span>{kt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}

                {/* Inline Flashcard Widget */}
                <TheoryInlineFlashcard articleId={activeArticle.id} />

                {/* Quick Action Bar for the active concept */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      if (onSelectVideo) {
                        onSelectVideo(activeArticle.id);
                      }
                      onNavigateToTab?.('animations');
                    }}
                    className="w-full sm:w-auto flex-1 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-900/30 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>Watch 3D Concept Video Lesson</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigateToTab?.('3d-brain')}
                    className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>3D Brain Anatomy</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigateToTab?.('quiz')}
                    className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    <span>Test Knowledge</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
