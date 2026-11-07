import React, { lazy, Suspense, useState, useEffect } from 'react';
import { TabType, UserAccount } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
const AuthModal = lazy(() => import('./components/auth/AuthModal').then((module) => ({ default: module.AuthModal })));
const HandwrittenQASection = lazy(() => import('./components/sections/HandwrittenQASection').then((module) => ({ default: module.HandwrittenQASection })));
const MindMapSection = lazy(() => import('./components/sections/MindMapSection').then((module) => ({ default: module.MindMapSection })));
const Brain3D = lazy(() => import('./components/3d/Brain3D').then((module) => ({ default: module.Brain3D })));
const BciSim3D = lazy(() => import('./components/3d/BciSim3D').then((module) => ({ default: module.BciSim3D })));
const AiArchitecture3D = lazy(() => import('./components/3d/AiArchitecture3D').then((module) => ({ default: module.AiArchitecture3D })));
const MotionVideoViewer = lazy(() => import('./components/3d/MotionVideoViewer').then((module) => ({ default: module.MotionVideoViewer })));
const TheorySection = lazy(() => import('./components/sections/TheorySection').then((module) => ({ default: module.TheorySection })));
const FlashcardsSection = lazy(() => import('./components/sections/FlashcardsSection').then((module) => ({ default: module.FlashcardsSection })));
const QuizSection = lazy(() => import('./components/sections/QuizSection').then((module) => ({ default: module.QuizSection })));
const RagDashboard = lazy(() => import('./components/sections/RagDashboard').then((module) => ({ default: module.RagDashboard })));
const ChatbotSection = lazy(() => import('./components/sections/ChatbotSection').then((module) => ({ default: module.ChatbotSection })));
const AnalyticsAwardsSection = lazy(() => import('./components/sections/AnalyticsAwardsSection').then((module) => ({ default: module.AnalyticsAwardsSection })));
import { 
  Brain, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Lock, 
  UserPlus, 
  Sparkles, 
  Activity, 
  Network, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  ChevronRight,
  CheckCircle2,
  Zap
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('handwritten-qa');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('node-0-1');
  const [selectedVideoId, setSelectedVideoId] = useState<string>('vid-node-0-1');

  // Restore user session from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('neuromind_active_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }, []);

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem('neuromind_active_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('neuromind_active_user');
  };

  // Intercept tab changes if user is not authenticated
  const handleTabChange = (tab: TabType) => {
    // Cancel any speech synthesis or video audio immediately on section switch
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleToggleNodeComplete = async (nodeId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const completed = currentUser.completedNodes || [];
    const isCompleted = completed.includes(nodeId);
    const updatedNodes = isCompleted
      ? completed.filter((id) => id !== nodeId)
      : [...completed, nodeId];

    const updatedUser: UserAccount = {
      ...currentUser,
      completedNodes: updatedNodes,
      xp: updatedNodes.length * 50,
      level: Math.floor(updatedNodes.length / 2) + 1,
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('neuromind_active_user', JSON.stringify(updatedUser));

    // Persist user progress on server
    try {
      await fetch('/api/auth/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser.username,
          completedNodes: updatedNodes,
          quizScore: currentUser.quizScore || 0,
        }),
      });
    } catch (e) {
      console.error('Failed to sync progress to server:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] light:bg-slate-50 text-slate-100 light:text-slate-900 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-200">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentUser ? (
          /* HOME LANDING / AUTHENTICATION GATEWAY FOR NON-LOGGED IN USERS */
          <div className="space-y-10 py-4">
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-[#08080a] via-[#0b0c10] to-[#050507] light:from-white light:via-slate-100 light:to-white border border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="inline-flex items-center space-x-2 bg-cyan-950 light:bg-cyan-100 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 light:text-cyan-800 font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Account Login Required for Access</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight leading-tight">
                  NeuroMind Platform: From Scratch to Advanced Neuro-AI
                </h1>

                <p className="text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed">
                  Master Human Brain Anatomy, Action Potentials, 10-20 EEG, BCI Signal Processing, Deep Learning (EEGNet/SNN), GANs, Vision Transformers, and Mind-Vis Generative AI.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-cyan-950/60 flex items-center justify-center space-x-3 transition-all transform hover:scale-105"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Create Free Account / Sign In</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="text-xs font-mono text-slate-400 light:text-slate-600 flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Database Authenticated • Progress Saved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Feature Previews */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Platform Learning Modules Preview</span>
                </h2>
                <span className="text-xs font-mono text-slate-500 light:text-slate-600">Sign in to unlock interactive access</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Interactive Mind Maps',
                    desc: '13-step progression from scratch biological neurons to advanced Mind-Vis AI.',
                    icon: <Network className="w-5 h-5 text-cyan-400" />,
                    badge: 'Scratch -> Adv',
                  },
                  {
                    title: '3D Brain Explorer',
                    desc: 'Rotatable 3D cortical lobes, motor strip, and 10-20 EEG scalp electrode pins.',
                    icon: <Brain className="w-5 h-5 text-purple-400" />,
                    badge: '3D Anatomy',
                  },
                  {
                    title: 'BCI Signal Simulator',
                    desc: 'Real-time telemetry DSP filter, FFT frequency spectrum, and motor imagery decoding.',
                    icon: <Activity className="w-5 h-5 text-emerald-400" />,
                    badge: 'Live DSP',
                  },
                  {
                    title: '3D Visual Motion Lessons',
                    desc: '13 animated video lessons with frame-by-frame controls and audio voice narration.',
                    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
                    badge: '3D Video',
                  },
                  {
                    title: 'NN / GAN / ViT Architectures',
                    desc: 'Deep learning pipeline breakdown: EEGNet depthwise convs, WGAN-GP, and ViT attention.',
                    icon: <Cpu className="w-5 h-5 text-indigo-400" />,
                    badge: 'Deep Learning',
                  },
                  {
                    title: 'RAG Knowledge & AI Chatbot',
                    desc: 'Vector retrieval-augmented assistant explaining complex neuro-AI theories with equations.',
                    icon: <Database className="w-5 h-5 text-cyan-400" />,
                    badge: 'RAG AI',
                  },
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    onClick={() => setIsAuthModalOpen(true)}
                    className="p-5 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/50 cursor-pointer transition-all space-y-2 group relative overflow-hidden shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-200 group-hover:border-cyan-500/40">
                        {feat.icon}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase bg-slate-950 light:bg-cyan-50 border border-slate-800 light:border-cyan-200 px-2 py-0.5 rounded text-cyan-400 light:text-cyan-800">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-100 light:text-slate-900 group-hover:text-cyan-300 light:group-hover:text-cyan-700 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* FULL LOGGED-IN APPLICATION DASHBOARD */
          <Suspense
            fallback={
              <div className="flex min-h-48 items-center justify-center text-sm text-slate-400" role="status">
                Loading module...
              </div>
            }
          >
            <div key={activeTab} className="module-transition">
              {activeTab === 'handwritten-qa' && (
                <HandwrittenQASection onNavigateTab={(tab) => handleTabChange(tab as TabType)} />
              )}
              {activeTab === 'mind-maps' && (
                <MindMapSection
                  currentUser={currentUser}
                  onUpdateProgress={handleToggleNodeComplete}
                  onNavigateToTab={(tab) => handleTabChange(tab)}
                  onSelectArticle={(artId) => {
                    setSelectedArticleId(artId);
                    handleTabChange('theory');
                  }}
                  onSelectVideo={(vidId) => {
                    setSelectedVideoId(vidId);
                    handleTabChange('animations');
                  }}
                />
              )}
              {activeTab === '3d-brain' && <Brain3D onNavigateToTab={(tab) => handleTabChange(tab as TabType)} />}
              {activeTab === 'bci-sim' && <BciSim3D onNavigateToTab={(tab) => handleTabChange(tab as TabType)} />}
              {activeTab === 'ai-models' && <AiArchitecture3D onNavigateToTab={(tab) => handleTabChange(tab as TabType)} />}
              {activeTab === 'animations' && (
                <MotionVideoViewer
                  initialVideoId={selectedVideoId}
                  onNavigateToTab={(tab) => handleTabChange(tab)}
                />
              )}
              {activeTab === 'theory' && (
                <TheorySection
                  initialArticleId={selectedArticleId}
                  onNavigateToTab={(tab) => handleTabChange(tab)}
                  onSelectVideo={(vidId) => {
                    setSelectedVideoId(vidId);
                    handleTabChange('animations');
                  }}
                />
              )}
              {activeTab === 'rag-inspector' && <RagDashboard />}
              {activeTab === 'flashcards' && <FlashcardsSection onNavigateToTab={(tab) => handleTabChange(tab as TabType)} />}
              {activeTab === 'quiz' && <QuizSection />}
              {activeTab === 'chatbot' && <ChatbotSection customApiKey="" />}
              {activeTab === 'analytics-awards' && (
                <AnalyticsAwardsSection
                  currentUser={currentUser}
                  onOpenAuthModal={() => setIsAuthModalOpen(true)}
                  onNavigateTab={(tab) => handleTabChange(tab)}
                />
              )}
            </div>
          </Suspense>
        )}
      </main>

      {/* Account Authentication Modal */}
      {isAuthModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
