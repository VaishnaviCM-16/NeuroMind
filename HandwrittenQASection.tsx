import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HANDWRITTEN_QA_DATA, HandwrittenQA } from '../../data/handwrittenQA';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sparkles, 
  Brain, 
  CheckCircle2, 
  Bookmark, 
  Zap, 
  Network, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Award,
  HelpCircle,
  Activity,
  FileText,
  Play,
  Volume2,
  VolumeX,
  X,
  Lightbulb,
  Radio,
  Cpu,
  RotateCcw,
  Home
} from 'lucide-react';

interface HandwrittenQASectionProps {
  onNavigateTab?: (tab: string) => void;
}

// Concept Video Player Modal
const ConceptVideoModal: React.FC<{ question: HandwrittenQA; onClose: () => void }> = ({ question, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSpokenStep = useRef<number>(-1);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const currentTimeRef = useRef<number>(0);

  // Stop speech when closing or changing
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => {
      stopSpeech();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Video Narration Steps
  const steps = [
    { time: 0, label: '0.0s - Core Concept Overview', detail: `${question.question}: ${question.shortAnswer}` },
    { time: 3, label: '3.0s - Biological / Technical Process', detail: question.detailedExplanation.slice(0, 150) + '...' },
    { time: 6, label: '6.0s - Neural Flow & Key Nodes', detail: `Flow Path: ${question.mindMapNodes.join(' then ')}.` },
    { time: 8.5, label: '8.5s - Clinical & BCI Application', detail: question.bciRelevance },
  ];

  const currentStepIdx = steps.findIndex((s, idx) => {
    const nextTime = steps[idx + 1]?.time || 10;
    return currentTime >= s.time && currentTime < nextTime;
  });

  const activeStep = steps[currentStepIdx >= 0 ? currentStepIdx : 0];

  // Speech Narration
  useEffect(() => {
    if (isMuted || !isPlaying || !('speechSynthesis' in window)) return;
    if (currentStepIdx !== lastSpokenStep.current && activeStep) {
      lastSpokenStep.current = currentStepIdx;
      stopSpeech();
      const utterance = new SpeechSynthesisUtterance(activeStep.detail);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentStepIdx, isMuted, isPlaying, activeStep]);

  // Smooth 60 FPS Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying) {
        currentTimeRef.current += delta;
        if (currentTimeRef.current >= 10) {
          currentTimeRef.current = 0;
        }
        setCurrentTime(currentTimeRef.current);
      }

      const width = canvas.width;
      const height = canvas.height;
      const progress = currentTimeRef.current / 10;

      // Background
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = '#ffffff10';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Dynamic Graphic per Category
      if (question.id <= 15) {
        // Action Potential / Neuron Waveform
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(30, height * 0.7);
        for (let x = 30; x < width - 30; x += 4) {
          const norm = (x - 30) / (width - 60);
          let y = height * 0.7;
          if (norm > 0.2 && norm < 0.5) {
            y -= Math.sin((norm - 0.2) / 0.3 * Math.PI) * 110;
          } else if (norm >= 0.5 && norm < 0.7) {
            y += Math.sin((norm - 0.5) / 0.2 * Math.PI) * 25;
          }
          ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Depolarization Pulse
        const pulseX = 30 + (width - 60) * progress;
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(pulseX, height * 0.5, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ion channels indicator
        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px monospace';
        ctx.fillText('Na+ Influx (Depolarization) ➔ K+ Efflux (Repolarization)', 30, height - 15);
      } else if (question.id <= 35) {
        // EEG Frequency Rhythm Waves
        const waves = [
          { name: 'Alpha (8-12Hz)', color: '#06b6d4', freq: 0.08, y: height * 0.3 },
          { name: 'Beta (13-30Hz)', color: '#818cf8', freq: 0.16, y: height * 0.5 },
          { name: 'Gamma (30-100Hz)', color: '#a855f7', freq: 0.3, y: height * 0.7 },
        ];

        waves.forEach(w => {
          ctx.strokeStyle = w.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let x = 30; x < width - 30; x += 3) {
            const y = w.y + Math.sin(x * w.freq + progress * 20) * 18;
            if (x === 30) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          ctx.fillStyle = w.color;
          ctx.font = '10px monospace';
          ctx.fillText(w.name, width - 110, w.y - 8);
        });
      } else if (question.id <= 55) {
        // BCI Motor Imagery / Brain Hemisphere Activation Map
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(width * 0.35, height * 0.5, 60, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(width * 0.65, height * 0.5, 60, 0, Math.PI * 2);
        ctx.stroke();

        // ERD/ERS Activation Glow
        const leftGlow = progress < 0.5 ? 20 + progress * 40 : 10;
        const rightGlow = progress >= 0.5 ? 20 + (1 - progress) * 40 : 10;

        ctx.fillStyle = '#06b6d480';
        ctx.beginPath();
        ctx.arc(width * 0.35, height * 0.5, leftGlow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#a855f780';
        ctx.beginPath();
        ctx.arc(width * 0.65, height * 0.5, rightGlow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px monospace';
        ctx.fillText('C3 Electrode (Left Hand)', width * 0.35 - 50, height * 0.5 + 80);
        ctx.fillText('C4 Electrode (Right Hand)', width * 0.65 - 50, height * 0.5 + 80);
      } else if (question.id <= 70) {
        // Signal Processing FFT / Bandpass Spectrum Bar Chart
        const numBars = 24;
        const barWidth = (width - 80) / numBars;
        for (let i = 0; i < numBars; i++) {
          const h = 20 + Math.sin(i * 0.5 + progress * 15) * 45 + Math.cos(i * 0.3) * 20;
          const x = 40 + i * barWidth;
          const y = height * 0.8 - h;

          const grad = ctx.createLinearGradient(x, y, x, height * 0.8);
          grad.addColorStop(0, '#06b6d4');
          grad.addColorStop(1, '#3b82f6');
          ctx.fillStyle = grad;
          ctx.fillRect(x, y, barWidth - 3, h);
        }

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText('Frequency Spectrum (0Hz - 60Hz) Notch Filter @ 50Hz/60Hz', 40, height - 15);
      } else {
        // Deep Learning SNN / Mind-Vis Transformer Nodes
        const nodes = [
          { x: width * 0.2, y: height * 0.3 },
          { x: width * 0.2, y: height * 0.7 },
          { x: width * 0.5, y: height * 0.2 },
          { x: width * 0.5, y: height * 0.5 },
          { x: width * 0.5, y: height * 0.8 },
          { x: width * 0.8, y: height * 0.4 },
          { x: width * 0.8, y: height * 0.6 },
        ];

        // Draw connections
        ctx.strokeStyle = '#ffffff20';
        ctx.lineWidth = 1;
        nodes.forEach((n1, i) => {
          nodes.forEach((n2, j) => {
            if (i < j && Math.abs(n1.x - n2.x) < width * 0.4) {
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          });
        });

        // Glowing Signal Pulse traveling through network
        nodes.forEach((n, idx) => {
          const active = Math.sin(progress * 10 + idx) > 0;
          ctx.fillStyle = active ? '#10b981' : '#06b6d4';
          ctx.beginPath();
          ctx.arc(n.x, n.y, active ? 8 : 5, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = '#10b981';
        ctx.font = '10px monospace';
        ctx.fillText('Spiking Neural Network (SNN) / ViT Mind-Vis Latent Space', 30, height - 15);
      }

      // Title overlay
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Concept Q${question.id}: ${question.question}`, 20, 25);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, question]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#08080a] light:bg-white border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 light:border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 light:bg-cyan-100 text-cyan-400 light:text-cyan-800 text-xs font-mono font-bold">
              3D Video Lesson Q{question.id}
            </span>
            <span className="text-xs font-mono text-slate-400 light:text-slate-600">{question.category}</span>
          </div>
          <button 
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 light:border-slate-300">
          <canvas ref={canvasRef} width={600} height={240} className="w-full h-auto bg-slate-950" />

          {/* Timeline Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-100"
              style={{ width: `${(currentTime / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#050507] light:bg-slate-100 border border-white/10 light:border-slate-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
            >
              {isPlaying ? <X className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => setCurrentTime(0)}
              className="p-2.5 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono text-cyan-400 font-bold">
              {currentTime.toFixed(1)}s / 10.0s
            </div>
          </div>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (!isMuted) stopSpeech();
            }}
            className={`p-2.5 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 ${
              isMuted ? 'bg-rose-950 text-rose-400' : 'bg-cyan-950 light:bg-cyan-100 text-cyan-300 light:text-cyan-800'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isMuted ? 'Muted' : 'AI Voice On'}</span>
          </button>
        </div>

        {/* Current Active Step Narration Card */}
        <div className="p-4 rounded-xl bg-cyan-950/40 light:bg-cyan-50 border border-cyan-500/30 space-y-1">
          <div className="text-[11px] font-mono font-bold text-cyan-400 light:text-cyan-800">
            {activeStep.label}
          </div>
          <p className="text-xs text-slate-200 light:text-slate-800 leading-relaxed font-sans">
            {activeStep.detail}
          </p>
        </div>
      </div>
    </div>
  );
};

export const HandwrittenQASection: React.FC<HandwrittenQASectionProps> = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<number | null>(1); // Open Q1 by default
  const [masteredIds, setMasteredIds] = useState<number[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [activeVideoQuestion, setActiveVideoQuestion] = useState<HandwrittenQA | null>(null);
  const [viewModes, setViewModes] = useState<Record<number, 'deep' | 'eli5'>>({});

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    HANDWRITTEN_QA_DATA.forEach(q => set.add(q.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return HANDWRITTEN_QA_DATA.filter(q => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.bciRelevance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toString() === searchQuery.trim();

      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchesBookmark = !showOnlyBookmarks || bookmarkedIds.includes(q.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, showOnlyBookmarks, bookmarkedIds]);

  const toggleMastered = (id: number) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleViewMode = (id: number) => {
    setViewModes(prev => ({
      ...prev,
      [id]: prev[id] === 'eli5' ? 'deep' : 'eli5'
    }));
  };

  const masteryPercent = Math.round((masteredIds.length / HANDWRITTEN_QA_DATA.length) * 100);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Video Modal if active */}
      {activeVideoQuestion && (
        <ConceptVideoModal
          question={activeVideoQuestion}
          onClose={() => setActiveVideoQuestion(null)}
        />
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-cyan-950 light:from-slate-100 light:via-cyan-50 light:to-sky-100 border border-cyan-500/30 light:border-slate-300 p-6 sm:p-8 shadow-2xl text-slate-100 light:text-slate-900">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigateTab && onNavigateTab('mind-maps')}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
                title="Return to Home Dashboard"
              >
                <Home className="w-3.5 h-3.5" />
                <span>← Back to Home</span>
              </button>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 light:bg-cyan-100 border border-cyan-500/40 text-cyan-300 light:text-cyan-800 text-xs font-mono font-bold">
                <FileText className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-700" />
                <span>Complete 86-Question Notebook Master Repository</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 light:text-slate-900 font-serif">
              Biology (BCI) & Neuroscience Master Q&A
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed font-sans">
              Comprehensive, scratch-to-advanced answers for all 86 handwritten notebook questions covering brain anatomy, neuron biophysics, action potential dynamics, EEG rhythms, motor imagery, and clinical BCI applications.
            </p>
          </div>

          {/* Progress Tracker Widget */}
          <div className="bg-[#050507]/80 light:bg-white border border-cyan-500/30 light:border-slate-300 p-4 rounded-2xl shrink-0 space-y-2 text-center min-w-[200px] shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 light:text-slate-600">
              <span>Mastery Score</span>
              <span className="text-cyan-400 light:text-cyan-700 font-bold">{masteredIds.length} / 86</span>
            </div>
            <div className="text-2xl font-black font-mono text-cyan-300 light:text-cyan-800">
              {masteryPercent}%
            </div>
            <div className="w-full bg-slate-800 light:bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${masteryPercent}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-400 light:text-slate-600 font-mono">
              Mark items as mastered to track your learning
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#08080a] light:bg-white border border-white/10 light:border-slate-300 p-4 sm:p-5 rounded-2xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Q1-Q86 or keywords (e.g. EEG, Action Potential, C3)..."
              className="w-full bg-[#050507] light:bg-white border border-white/10 light:border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-200 light:text-slate-900 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center space-x-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono shrink-0">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>Category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#050507] light:bg-white border border-white/10 light:border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 light:text-slate-900 focus:outline-none focus:border-cyan-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#050507] light:bg-white border border-white/10 light:border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 light:text-slate-900 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Levels</option>
              <option value="Scratch / Basic">Scratch / Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced BCI">Advanced BCI</option>
            </select>

            {/* Bookmark Filter Button */}
            <button
              onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shrink-0 ${
                showOnlyBookmarks
                  ? 'bg-amber-500 text-slate-950 font-extrabold'
                  : 'bg-[#050507] light:bg-white border border-white/10 light:border-slate-300 text-slate-300 light:text-slate-700 hover:border-amber-400'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-400 light:text-slate-600 pt-1 border-t border-white/5 light:border-slate-200">
          <span>Showing {filteredQuestions.length} of 86 Questions</span>
          <span>Click any question to view detailed mind map, ELI5 explanation & 3D video</span>
        </div>
      </div>

      {/* Question Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-[#08080a] light:bg-white border border-white/10 light:border-slate-300 rounded-2xl space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-200 light:text-slate-800">No matching questions found</h3>
            <p className="text-xs text-slate-400 light:text-slate-600 max-w-md mx-auto font-mono">
              Try adjusting your search query or reset the category/difficulty filters to see all 86 questions.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setShowOnlyBookmarks(false);
              }}
              className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold font-mono"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map(q => {
            const isExpanded = expandedId === q.id;
            const isMastered = masteredIds.includes(q.id);
            const isBookmarked = bookmarkedIds.includes(q.id);
            const isEli5 = viewModes[q.id] === 'eli5';

            return (
              <div 
                key={q.id}
                className={`bg-[#08080a] light:bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-cyan-500/60 shadow-xl shadow-cyan-950/30'
                    : 'border-white/10 light:border-slate-300 hover:border-slate-600'
                }`}
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-4 sm:p-5 cursor-pointer flex items-start sm:items-center justify-between gap-4 select-none hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                    {/* Q Number Badge */}
                    <div className="w-8 h-8 rounded-xl bg-cyan-950 light:bg-cyan-100 border border-cyan-500/30 text-cyan-400 light:text-cyan-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      Q{q.id}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 light:bg-slate-200 text-slate-300 light:text-slate-700 border border-slate-700 light:border-slate-300 font-semibold">
                          {q.category}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          q.difficulty === 'Scratch / Basic' 
                            ? 'bg-emerald-950 light:bg-emerald-100 text-emerald-400 light:text-emerald-800'
                            : q.difficulty === 'Intermediate'
                            ? 'bg-indigo-950 light:bg-indigo-100 text-indigo-400 light:text-indigo-800'
                            : 'bg-purple-950 light:bg-purple-100 text-purple-400 light:text-purple-800'
                        }`}>
                          {q.difficulty}
                        </span>
                        {isMastered && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Mastered</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-slate-100 light:text-slate-900 leading-snug">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                        setActiveVideoQuestion(q);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-950 light:bg-cyan-100 border border-cyan-500/40 text-cyan-300 light:text-cyan-800 text-xs font-mono font-bold flex items-center space-x-1.5 hover:bg-cyan-900/60"
                      title="Watch 3D Concept Video Lesson"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">3D Video</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(q.id);
                      }}
                      className={`p-2 rounded-xl border transition-all ${
                        isBookmarked 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                          : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <div className="p-2 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-white/10 light:border-slate-300 bg-[#050507] light:bg-slate-50 space-y-6">
                    {/* View Switcher: ELI5 vs Deep Dive */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#08080a] light:bg-white border border-white/10 light:border-slate-200">
                      <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-400 light:text-slate-600">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>Explanation Mode:</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleViewMode(q.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                            !isEli5
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'text-slate-400 light:text-slate-600 hover:text-slate-200'
                          }`}
                        >
                          🔬 Biophysics Deep Dive
                        </button>
                        <button
                          onClick={() => toggleViewMode(q.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                            isEli5
                              ? 'bg-amber-500 text-slate-950 shadow-sm'
                              : 'text-slate-400 light:text-slate-600 hover:text-slate-200'
                          }`}
                        >
                          ⚡ ELI5 Simple Analogy
                        </button>
                      </div>
                    </div>

                    {/* Short Executive Answer */}
                    <div className="p-4 rounded-xl bg-cyan-950 light:bg-cyan-50 border border-cyan-500/30 space-y-2">
                      <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 light:text-cyan-800">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span>Executive Summary Answer</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 light:text-slate-800 leading-relaxed">
                        {q.shortAnswer}
                      </p>
                    </div>

                    {/* Detailed Explanation / ELI5 */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 font-bold flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <span>{isEli5 ? 'Everyday Simple Analogy (ELI5)' : 'Comprehensive Breakdown & Physiology'}</span>
                      </h4>
                      <div className="text-xs sm:text-sm text-slate-300 light:text-slate-800 leading-relaxed whitespace-pre-line bg-[#08080a] light:bg-white p-4 rounded-xl border border-white/5 light:border-slate-200 font-sans">
                        {isEli5
                          ? `💡 Imagine this concept like a phone network: ${q.shortAnswer}. When signals fire, neurons pass messages across synapses just like text messages traveling between cell towers.`
                          : q.detailedExplanation
                        }
                      </div>
                    </div>

                    {/* Key Formula or Concept Box (If available) */}
                    {q.keyFormulaOrConcept && (
                      <div className="p-3.5 rounded-xl bg-slate-900 light:bg-amber-50 border border-slate-700 light:border-amber-200 flex items-start space-x-3">
                        <Activity className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono font-bold text-amber-400 light:text-amber-800">Key Formula / Core Biological Equation:</span>
                          <p className="text-xs font-mono text-slate-200 light:text-slate-800 font-semibold">
                            {q.keyFormulaOrConcept}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Mind Map / Flow Diagram Nodes */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 font-bold flex items-center space-x-2">
                        <Network className="w-4 h-4 text-emerald-400" />
                        <span>Concept Mind Map / Neural Flow Path</span>
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-[#08080a] light:bg-white border border-white/5 light:border-slate-200">
                        {q.mindMapNodes.map((node, nIdx) => (
                          <React.Fragment key={nIdx}>
                            <span className="px-3 py-1 rounded-lg bg-emerald-950 light:bg-emerald-100 border border-emerald-500/30 text-emerald-300 light:text-emerald-900 text-xs font-mono font-bold">
                              {node}
                            </span>
                            {nIdx < q.mindMapNodes.length - 1 && (
                              <span className="text-slate-500 font-mono text-xs">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* BCI Application Relevance */}
                    <div className="p-4 rounded-xl bg-indigo-950 light:bg-indigo-50 border border-indigo-500/30 space-y-1.5">
                      <div className="flex items-center space-x-2 text-xs font-mono font-bold text-indigo-300 light:text-indigo-900">
                        <Brain className="w-4 h-4 text-indigo-400" />
                        <span>Direct BCI & Neuro-AI Relevance</span>
                      </div>
                      <p className="text-xs text-slate-300 light:text-slate-800 leading-relaxed">
                        {q.bciRelevance}
                      </p>
                    </div>

                    {/* Action Footer: Mark as Mastered & Tab Navigation */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <button
                          onClick={() => toggleMastered(q.id)}
                          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                            isMastered
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                              : 'bg-slate-800 light:bg-slate-200 hover:bg-slate-700 text-slate-200 light:text-slate-800'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isMastered ? 'Marked as Mastered' : 'Mark Question as Mastered'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                            setActiveVideoQuestion(q);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold flex items-center space-x-2 shadow-md"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Concept Video</span>
                        </button>
                      </div>

                      {onNavigateTab && (
                        <button
                          onClick={() => onNavigateTab('theory')}
                          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                        >
                          <span>Explore related detailed theory module</span>
                          <span>→</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

