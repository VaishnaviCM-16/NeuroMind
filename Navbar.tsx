import React, { useState, useRef, useEffect } from 'react';
import { TabType, UserAccount } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  Brain, 
  Activity, 
  Cpu, 
  Sparkles, 
  Database, 
  Layers, 
  BookOpen, 
  FileText,
  HelpCircle, 
  MessageSquare,
  Network,
  User,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Compass,
  Sun,
  Moon,
  Trophy,
  Home
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentUser: UserAccount | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuthModal,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const menuCategories = [
    {
      category: '1. Curriculum & Mind Maps',
      items: [
        { id: 'handwritten-qa' as TabType, label: '86 BCI Notebook Q&A Master', icon: <FileText className="w-4 h-4 text-emerald-400" />, desc: 'All 86 handwritten notebook Q&As & mind maps', badge: '86 Q&A' },
        { id: 'mind-maps' as TabType, label: 'Interactive Neural Mind Maps', icon: <Network className="w-4 h-4 text-cyan-400" />, desc: 'Scratch to Advanced 13-node pathway', badge: 'Scratch->Adv' },
      ],
    },
    {
      category: '2. 3D Interactive Simulators',
      items: [
        { id: '3d-brain' as TabType, label: '3D Brain & Cortical Lobes', icon: <Brain className="w-4 h-4 text-purple-400" />, desc: 'Anatomy & 10-20 electrode mapping', badge: '3D Anatomy' },
        { id: 'bci-sim' as TabType, label: 'BCI Signal Telemetry Sim', icon: <Activity className="w-4 h-4 text-emerald-400" />, desc: 'DSP filtering & motor imagery decoding', badge: 'Live DSP' },
        { id: 'ai-models' as TabType, label: 'NN / GAN / ViT Pipeline', icon: <Cpu className="w-4 h-4 text-indigo-400" />, desc: 'EEGNet, WGAN-GP & Transformer attention', badge: 'Deep Learning' },
      ],
    },
    {
      category: '3. 3D Motion Video Studio',
      items: [
        { id: 'animations' as TabType, label: '3D Visual Motion Lessons', icon: <Sparkles className="w-4 h-4 text-amber-400" />, desc: '13 concept video lessons with audio narration', badge: '3D Video' },
      ],
    },
    {
      category: '4. Scientific Knowledge Base & Awards',
      items: [
        { id: 'theory' as TabType, label: 'Neuroscience Theory Modules', icon: <BookOpen className="w-4 h-4 text-blue-400" />, desc: 'Detailed articles, formulas & equations', badge: 'Lessons' },
        { id: 'flashcards' as TabType, label: 'Interactive Flashcards', icon: <Layers className="w-4 h-4 text-rose-400" />, desc: 'Anki-style spaced repetition deck', badge: 'Spaced Rep' },
        { id: 'quiz' as TabType, label: 'Quiz Engine', icon: <HelpCircle className="w-4 h-4 text-emerald-400" />, desc: 'Adaptive tests & XP scoring', badge: 'Exam' },
        { id: 'analytics-awards' as TabType, label: 'Progress Analytics & Awards', icon: <Trophy className="w-4 h-4 text-amber-400" />, desc: 'Lesson tracking, XP & official certificates', badge: 'Certificates' },
      ],
    },
    {
      category: '5. AI & RAG Assistants',
      items: [
        { id: 'chatbot' as TabType, label: 'NeuroMind AI Chatbot', icon: <MessageSquare className="w-4 h-4 text-cyan-400" />, desc: 'Gemini 2.5 RAG powered assistant', badge: 'RAG AI' },
        { id: 'rag-inspector' as TabType, label: 'RAG Architecture Inspector', icon: <Database className="w-4 h-4 text-indigo-400" />, desc: 'Vector database & cosine retrieval', badge: 'Vector DB' },
      ],
    },
  ];

  const allItems = menuCategories.flatMap((c) => c.items);
  const activeItem = allItems.find((i) => i.id === activeTab) || allItems[0];

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  // Calculate curriculum progress percentage
  const totalNodes = 13;
  const completedCount = currentUser?.completedNodes ? currentUser.completedNodes.length : 1;
  const progressPercent = Math.min(100, Math.round((completedCount / totalNodes) * 100));

  // SVG ring properties
  const radius = 12;
  const circumference = 2 * Math.PI * radius; // ~75.4
  const strokeOffset = circumference - (circumference * progressPercent) / 100;

  return (
    <header className="sticky top-0 z-50 bg-[#050507]/95 dark:bg-[#050507]/95 light:bg-white/95 backdrop-blur-xl border-b border-white/10 light:border-slate-200 text-slate-100 light:text-slate-900 shadow-xl">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-1 sm:gap-3">
          {/* Left Top Menu Bar Trigger & Platform Branding */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Top-Left Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-1.5 bg-[#08080a] light:bg-slate-100 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-950/60 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all shadow-md text-cyan-400 font-mono text-xs font-bold group"
              title="Open Navigation Menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-slate-200 light:text-slate-800" />
              ) : (
                <Menu className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
              )}
              <span className="hidden sm:inline text-slate-200 light:text-slate-800">Menu</span>
            </button>

            {/* Logo & Home Button */}
            <div className="flex items-center space-x-2">
              <div 
                className="flex items-center space-x-2 cursor-pointer group" 
                onClick={() => handleSelectTab('mind-maps')}
                title="Go to NeuroMind Home Dashboard"
              >
                <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-950/50 shrink-0 group-hover:scale-105 transition-transform">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 light:from-cyan-700 light:via-indigo-800 light:to-purple-800 bg-clip-text text-transparent font-serif italic drop-shadow-sm">
                      NeuroMind
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-mono uppercase px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-bold">
                      Platform
                    </span>
                  </div>
                </div>
              </div>

              {/* Dedicated Always-Visible Home Button */}
              <button
                onClick={() => handleSelectTab('mind-maps')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-mono font-bold transition-all border shrink-0 ${
                  activeTab === 'mind-maps'
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-950/50'
                    : 'bg-[#08080a] light:bg-slate-100 text-slate-200 light:text-slate-800 border-cyan-500/30 light:border-slate-300 hover:border-cyan-400 hover:text-cyan-400'
                }`}
                title="Back to Home Dashboard"
              >
                <Home className="w-3.5 h-3.5 text-cyan-400" />
                <span>Home</span>
              </button>
            </div>

            {/* Current Active Location Pill (hidden on small mobile screens to prevent overflow) */}
            <div className="hidden lg:flex items-center space-x-2 bg-[#08080a] light:bg-slate-100 border border-white/10 light:border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 light:text-slate-700">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400 light:text-slate-500">Section:</span>
              <span className="font-bold text-cyan-300 light:text-cyan-700">{activeItem.label}</span>
            </div>
          </div>

          {/* Right Controls: Circular Progress Ring, Theme Toggle & Account Auth */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Circular Progress Ring Widget */}
            <button
              onClick={() => handleSelectTab('analytics-awards')}
              title={`Curriculum Mastery: ${progressPercent}% (${completedCount}/${totalNodes} modules)`}
              className="flex items-center space-x-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#08080a] light:bg-slate-100 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group"
            >
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    className="stroke-slate-800 light:stroke-slate-200"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    className="stroke-cyan-400 transition-all duration-700 ease-out"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-[8px] sm:text-[9px] font-mono font-extrabold text-cyan-300 light:text-cyan-800">
                  {progressPercent}
                </span>
              </div>
              <div className="hidden md:flex flex-col text-left text-[10px] font-mono leading-none">
                <span className="text-slate-400 light:text-slate-500 text-[9px]">Progress</span>
                <span className="font-bold text-cyan-400 light:text-cyan-700">{progressPercent}% Done</span>
              </div>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-mono border transition-all bg-[#08080a] light:bg-slate-100 border-white/10 light:border-slate-300 text-slate-300 light:text-slate-800 hover:border-cyan-400 flex items-center space-x-1.5"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-1.5 bg-[#08080a] light:bg-slate-100 border border-cyan-500/30 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></div>
                <span className="text-slate-200 light:text-slate-800 font-bold max-w-[80px] sm:max-w-[120px] truncate">
                  {currentUser.fullName || currentUser.username}
                </span>
                <span className="hidden sm:inline text-cyan-400 text-[10px] bg-cyan-950 border border-cyan-800/40 px-1.5 py-0.2 rounded font-bold">
                  L{currentUser.level}
                </span>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="ml-1 text-slate-400 hover:text-slate-200 transition-colors p-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-900/40 transition-all shrink-0"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top-Left Slide-out Overlay Drawer Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-black/70 backdrop-blur-md flex items-start justify-start animate-fade-in">
          <div 
            ref={menuRef}
            className="w-full max-w-md bg-[#050507] light:bg-white border-r border-b border-cyan-500/30 rounded-br-3xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 light:border-slate-200 pb-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-sm uppercase font-mono tracking-wider text-slate-100 light:text-slate-900">
                  Navigation Menu
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg bg-slate-900 light:bg-slate-100 border border-white/10 light:border-slate-300 text-slate-300 light:text-slate-800 flex items-center space-x-1 text-xs font-mono"
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                </button>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-lg bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-300 text-slate-400 hover:text-white light:hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Menu Sections */}
            <div className="space-y-5">
              {menuCategories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-cyan-400/90 light:text-cyan-700 px-1">
                    {cat.category}
                  </div>

                  <div className="space-y-1.5">
                    {cat.items.map((item) => {
                      const isSelected = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                            isSelected
                              ? 'bg-cyan-950/80 light:bg-cyan-50 border-cyan-500 text-slate-100 light:text-slate-900 shadow-md shadow-cyan-950/50'
                              : 'bg-[#08080a] light:bg-slate-50 border-white/5 light:border-slate-200 text-slate-300 light:text-slate-800 hover:border-white/20 hover:bg-slate-900 light:hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-slate-950 light:bg-white border border-white/10 light:border-slate-200 shrink-0">
                              {item.icon}
                            </div>
                            <div>
                              <div className="font-bold text-xs group-hover:text-cyan-300 light:group-hover:text-cyan-700 transition-colors">
                                {item.label}
                              </div>
                              <div className="text-[10px] text-slate-400 light:text-slate-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            {item.badge && (
                              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-950 light:bg-cyan-100 border border-cyan-800/40 text-cyan-300 light:text-cyan-800">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
