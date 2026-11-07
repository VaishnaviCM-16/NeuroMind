import React, { useState } from 'react';
import { MIND_MAP_NODES } from '../../data/mindMapData';
import { MindMapNode, UserAccount } from '../../types';
import { InfographicCard } from '../infographics/InfographicCard';
import { ConceptPostTestModal } from '../quiz/ConceptPostTestModal';
import { 
  Network, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Brain, 
  Cpu, 
  HelpCircle, 
  Layers, 
  Zap,
  Lock,
  MessageSquare,
  Trophy
} from 'lucide-react';

interface MindMapSectionProps {
  currentUser: UserAccount | null;
  onUpdateProgress: (nodeId: string) => void;
  onNavigateToTab: (tab: any) => void;
  onSelectArticle?: (articleId: string) => void;
  onSelectVideo?: (videoId: string) => void;
}

export const MindMapSection: React.FC<MindMapSectionProps> = ({
  currentUser,
  onUpdateProgress,
  onNavigateToTab,
  onSelectArticle,
  onSelectVideo,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [activeNodeId, setActiveNodeId] = useState<string>(MIND_MAP_NODES[0].id);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const completedSet = new Set(currentUser?.completedNodes || ['node-0-1']);

  const filteredNodes = MIND_MAP_NODES.filter(
    (n) => selectedLevel === 'all' || n.level === selectedLevel
  );

  const activeNode = MIND_MAP_NODES.find((n) => n.id === activeNodeId) || MIND_MAP_NODES[0];

  const levelLabels = [
    { level: 0, title: 'Level 0: Scratch Foundations', color: 'border-cyan-500 text-cyan-400' },
    { level: 1, title: 'Level 1: Signal Recording & BCI', color: 'border-indigo-500 text-indigo-400' },
    { level: 2, title: 'Level 2: Deep Learning (EEGNet/SNN)', color: 'border-emerald-500 text-emerald-400' },
    { level: 3, title: 'Level 3: Generative Models & ViT', color: 'border-purple-500 text-purple-400' },
    { level: 4, title: 'Level 4: Advanced Mind-Vis AI', color: 'border-amber-500 text-amber-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Editorial Header Banner */}
      <div className="bg-[#050507] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>01 / Progressive Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif italic text-slate-100">
              Interactive Neural Mind Maps
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Step-by-step conceptual map taking you from absolute biological neuron basics (Scratch) all the way to state-of-the-art Mind-Vis brain decoding and Generative AI.
            </p>
          </div>

          {/* User Mastery Pill */}
          <div className="bg-[#08080a] border border-white/10 rounded-xl p-4 flex items-center space-x-4 shrink-0 shadow-lg">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                Curriculum Mastery
              </div>
              <div className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <span className="text-cyan-400">{completedSet.size}</span>
                <span className="text-slate-500">/</span>
                <span>{MIND_MAP_NODES.length} Modules</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level Selector Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              selectedLevel === 'all'
                ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-900/30'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Levels ({MIND_MAP_NODES.length} Nodes)
          </button>

          {levelLabels.map((lbl) => (
            <button
              key={lbl.level}
              onClick={() => setSelectedLevel(lbl.level)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedLevel === lbl.level
                  ? 'bg-cyan-900/40 border border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              L{lbl.level}: {lbl.title.split(':')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Tree Nodes Grid */}
        <div className="lg:col-span-7 space-y-6">
          {levelLabels.map((lbl) => {
            const levelNodes = filteredNodes.filter((n) => n.level === lbl.level);
            if (levelNodes.length === 0) return null;

            return (
              <div key={lbl.level} className="space-y-3">
                <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${lbl.color}`}>
                    {lbl.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {levelNodes.map((node) => {
                    const isSelected = activeNode.id === node.id;
                    const isCompleted = completedSet.has(node.id);

                    return (
                      <div
                        key={node.id}
                        onClick={() => setActiveNodeId(node.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'bg-[#0a0a0d] border-cyan-500 shadow-xl shadow-cyan-950/40'
                            : isCompleted
                            ? 'bg-[#050507] border-white/10 hover:border-white/20'
                            : 'bg-[#050507]/60 border-white/5 hover:border-white/10'
                        }`}
                      >
                        {/* Selected accent indicator */}
                        {isSelected && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400"></div>
                        )}

                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400">
                              <span className="uppercase font-bold">Level {node.level}</span>
                              <span>•</span>
                              <span className="text-slate-500 uppercase">{node.category}</span>
                            </div>
                            <h3 className="font-bold text-sm text-slate-100 flex items-center space-x-2">
                              <span>{node.title}</span>
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {node.subtitle}
                            </p>
                          </div>

                          <div className="shrink-0 flex items-center space-x-2">
                            {isCompleted ? (
                              <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                                <Zap className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Node Active Inspector Panel */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-[#050507] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
            {/* Header */}
            <div className="border-b border-white/5 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                  Level {activeNode.level} • {activeNode.category.toUpperCase()}
                </span>

                <button
                  onClick={() => onUpdateProgress(activeNode.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    completedSet.has(activeNode.id)
                      ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-md shadow-cyan-900/30'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{completedSet.has(activeNode.id) ? 'Mastered' : 'Mark Mastered'}</span>
                </button>
              </div>

              <h2 className="text-lg font-bold text-slate-100">{activeNode.title}</h2>
              <p className="text-xs font-serif italic text-slate-400">{activeNode.subtitle}</p>
            </div>

            {/* Infographic Visual Poster */}
            <InfographicCard nodeId={activeNode.id} />

            {/* Description */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                Core Explanation
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-[#08080a] p-4 rounded-xl border border-white/5">
                {activeNode.description}
              </p>
            </div>

            {/* Formula Box */}
            {activeNode.formula && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                  Mathematical Formulation
                </span>
                <div className="bg-[#08080a] p-3 rounded-xl border border-cyan-500/20 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <code>{activeNode.formula}</code>
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                Scientific Takeaways
              </span>
              <ul className="space-y-2">
                {activeNode.keyTakeaways.map((kt, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start space-x-2 bg-[#08080a]/60 p-2.5 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{kt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
              <button
                onClick={() => setIsTestModalOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-emerald-600 to-cyan-600 hover:from-amber-500 hover:to-cyan-500 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-950/40 transition-all transform hover:scale-[1.01]"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Take Post-Lesson Mastery Test</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectArticle) {
                    onSelectArticle(activeNode.id);
                  }
                  onNavigateToTab('theory');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 hover:bg-slate-800 text-cyan-400 light:text-cyan-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Detailed Theory & Lesson</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => {
                  if (onSelectVideo) {
                    onSelectVideo(activeNode.id);
                  }
                  onNavigateToTab('animations');
                }}
                className="w-full py-2 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 hover:bg-slate-800 text-slate-200 light:text-slate-800 text-xs font-mono flex items-center justify-center space-x-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Watch 3D Concept Video Lesson</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigateToTab('3d-brain')}
                  className="py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-[11px] font-mono flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Brain className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3D Brain</span>
                </button>

                <button
                  onClick={() => onNavigateToTab('chatbot')}
                  className="py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-[11px] font-mono flex items-center justify-center space-x-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Post Test Modal */}
      <ConceptPostTestModal
        conceptTitle={activeNode.title}
        conceptId={activeNode.id}
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        onTestPassed={() => {
          onUpdateProgress(activeNode.id);
        }}
      />
    </div>
  );
};
