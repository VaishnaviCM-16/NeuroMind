import React, { useState } from 'react';
import { UserAccount, CourseCertificate } from '../../types';
import { MIND_MAP_NODES } from '../../data/mindMapData';
import { 
  Award, 
  CheckCircle2, 
  BarChart3, 
  Trophy, 
  Sparkles, 
  Brain, 
  Lock, 
  Download, 
  Printer, 
  ShieldCheck, 
  Star, 
  Zap, 
  BookOpen, 
  ChevronRight, 
  ExternalLink 
} from 'lucide-react';

interface AnalyticsAwardsSectionProps {
  currentUser: UserAccount | null;
  onOpenAuthModal: () => void;
  onNavigateTab: (tab: 'mind-maps' | 'theory' | 'quiz') => void;
}

export const AnalyticsAwardsSection: React.FC<AnalyticsAwardsSectionProps> = ({
  currentUser,
  onOpenAuthModal,
  onNavigateTab,
}) => {
  const [selectedCertificate, setSelectedCertificate] = useState<CourseCertificate | null>(null);

  if (!currentUser) {
    return (
      <div className="bg-[#08080a] light:bg-white border border-cyan-500/30 rounded-3xl p-8 text-center space-y-6 max-w-2xl mx-auto my-12 shadow-2xl">
        <div className="w-16 h-16 bg-cyan-950 light:bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto text-cyan-400 light:text-cyan-700 border border-cyan-500/40">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-100 light:text-slate-900">Student Analytics & Awards Locked</h2>
          <p className="text-sm text-slate-400 light:text-slate-600">
            Sign in to track your lesson progress, take concept mastery tests, and claim verified NeuroMind course completion certificates.
          </p>
        </div>
        <button
          onClick={onOpenAuthModal}
          className="px-8 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-all"
        >
          Sign In / Create Free Account
        </button>
      </div>
    );
  }

  const completedCount = currentUser.completedNodes ? currentUser.completedNodes.length : 0;
  const totalNodes = MIND_MAP_NODES.length;
  const completionPercent = Math.round((completedCount / totalNodes) * 100);

  // Group nodes by level
  const level0Nodes = MIND_MAP_NODES.filter(n => n.level === 0);
  const level1Nodes = MIND_MAP_NODES.filter(n => n.level === 1);
  const level2Nodes = MIND_MAP_NODES.filter(n => n.level === 2);
  const level3Nodes = MIND_MAP_NODES.filter(n => n.level === 3 || n.level === 4);

  const getLevelProgress = (nodes: typeof MIND_MAP_NODES) => {
    const done = nodes.filter(n => currentUser.completedNodes?.includes(n.id)).length;
    return { done, total: nodes.length, percent: Math.round((done / nodes.length) * 100) };
  };

  const l0 = getLevelProgress(level0Nodes);
  const l1 = getLevelProgress(level1Nodes);
  const l2 = getLevelProgress(level2Nodes);
  const l3 = getLevelProgress(level3Nodes);

  // Default certificates definition
  const availableCertificates: Omit<CourseCertificate, 'issuedDate' | 'score' | 'certificateCode'>[] = [
    {
      id: 'cert-scratch',
      courseName: 'Level 0: Neurobiology & Biophysics Scratch Foundations',
      level: 'Scratch Level',
      skillsVerified: ['Neuron Membrane Biophysics', 'Nernst/Goldman Potential', 'Hodgkin-Huxley Model', 'Synaptic Integration'],
    },
    {
      id: 'cert-bci',
      courseName: 'Level 1: 10-20 EEG & BCI Telemetry Signal Processing',
      level: 'Intermediate Level',
      skillsVerified: ['International 10-20 Placement', 'Bandpass & Notch Filtering', 'CSP Spatial Patterning', 'Motor Imagery BCI'],
    },
    {
      id: 'cert-deep',
      courseName: 'Level 2: EEGNet & Spiking Neural Network Architectures',
      level: 'Advanced Level',
      skillsVerified: ['EEGNet Temporal & Spatial Conv', 'Spiking Neurons (LIF)', 'STDP Plasticity', 'Deep Learning Decoders'],
    },
    {
      id: 'cert-master',
      courseName: 'Level 3 & 4: Generative Neuro-AI & Mind-Vis Diffusion',
      level: 'Master Level',
      skillsVerified: ['EEG-GAN Reconstruction', 'Vision Transformers', 'Latent Diffusion Decoding', 'Cortical Voxel Mapping'],
    },
  ];

  // Check which certs are unlocked
  const isCertUnlocked = (certId: string) => {
    if (certId === 'cert-scratch') return l0.percent >= 80;
    if (certId === 'cert-bci') return l1.percent >= 80;
    if (certId === 'cert-deep') return l2.percent >= 80;
    if (certId === 'cert-master') return l3.percent >= 80;
    return false;
  };

  const userCerts = currentUser.certificates || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-indigo-950 light:from-white light:via-sky-50 light:to-indigo-50 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-cyan-950 light:bg-cyan-100 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 light:text-cyan-800 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Student Performance Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 light:text-slate-900">
              Welcome back, {currentUser.fullName || currentUser.username}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700">
              Track concept mastery, post-lesson test scores, and earned NeuroMind certifications.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-3 gap-3 bg-[#050507]/60 light:bg-white p-4 rounded-2xl border border-white/10 light:border-slate-200 shrink-0 text-center">
            <div>
              <div className="text-xs text-slate-400 font-mono">Completed</div>
              <div className="text-xl font-extrabold text-cyan-400 light:text-cyan-700">{completedCount}/{totalNodes}</div>
            </div>
            <div className="border-x border-white/10 light:border-slate-200 px-3">
              <div className="text-xs text-slate-400 font-mono">Total XP</div>
              <div className="text-xl font-extrabold text-amber-400 light:text-amber-700">{currentUser.xp || completedCount * 50}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">Rank Level</div>
              <div className="text-xl font-extrabold text-indigo-400 light:text-indigo-700">Lvl {currentUser.level || 1}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Category Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: '0. Biophysics Scratch', progress: l0, color: 'text-cyan-400 light:text-cyan-700', bg: 'bg-cyan-500' },
          { title: '1. 10-20 EEG & BCI', progress: l1, color: 'text-emerald-400 light:text-emerald-700', bg: 'bg-emerald-500' },
          { title: '2. EEGNet & SNN AI', progress: l2, color: 'text-indigo-400 light:text-indigo-700', bg: 'bg-indigo-500' },
          { title: '3. Generative Neuro-AI', progress: l3, color: 'text-purple-400 light:text-purple-700', bg: 'bg-purple-500' },
        ].map((cat, idx) => (
          <div key={idx} className="bg-[#08080a] light:bg-white border border-slate-800 light:border-slate-200 rounded-2xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-300 light:text-slate-800">{cat.title}</span>
              <span className={cat.color}>{cat.progress.percent}%</span>
            </div>
            <div className="w-full bg-slate-900 light:bg-slate-200 rounded-full h-2 overflow-hidden">
              <div className={`h-full ${cat.bg} transition-all duration-500`} style={{ width: `${cat.progress.percent}%` }}></div>
            </div>
            <div className="text-[11px] text-slate-400 light:text-slate-600 flex justify-between">
              <span>{cat.progress.done} of {cat.progress.total} lessons done</span>
              {cat.progress.percent >= 80 ? (
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Cert Ready</span>
                </span>
              ) : (
                <span>In Progress</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certificates & Award Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-slate-100 light:text-slate-900">Course Completion Certificates</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Achieve 80%+ level completion to claim</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableCertificates.map((cert) => {
            const unlocked = isCertUnlocked(cert.id);
            const certificateCode = `NEURO-${cert.id.toUpperCase()}-${currentUser.username.toUpperCase()}`;

            return (
              <div 
                key={cert.id} 
                className={`border rounded-2xl p-6 space-y-4 relative transition-all ${
                  unlocked 
                    ? 'bg-gradient-to-br from-slate-900 to-indigo-950/80 light:from-white light:to-indigo-50/50 border-amber-500/50 shadow-xl' 
                    : 'bg-[#08080a] light:bg-slate-50 border-slate-800 light:border-slate-200 opacity-80'
                }`}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-950 light:bg-amber-100 text-amber-300 light:text-amber-800 font-bold border border-amber-800/40 uppercase tracking-wider">
                    {cert.level}
                  </span>
                  {unlocked ? (
                    <span className="text-xs font-mono text-emerald-400 light:text-emerald-700 font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Unlocked & Verified</span>
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 flex items-center space-x-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-100 light:text-slate-900">{cert.courseName}</h3>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-1">
                    Verified Competencies: {cert.skillsVerified.join(' • ')}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 light:border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">ID: {certificateCode}</span>
                  {unlocked ? (
                    <button
                      onClick={() => setSelectedCertificate({
                        ...cert,
                        issuedDate: new Date().toLocaleDateString(),
                        score: 95,
                        certificateCode,
                      })}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md"
                    >
                      <Award className="w-4 h-4" />
                      <span>View & Print Certificate</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigateTab('mind-maps')}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center space-x-1"
                    >
                      <span>Study Lessons</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal View */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-[#050507] light:bg-white border-2 border-amber-500/60 rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 text-slate-100 light:text-slate-900 relative overflow-hidden">
            {/* Elegant Certificate Crest */}
            <div className="border-4 border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6 text-center bg-gradient-to-b from-slate-900/50 to-indigo-950/30 light:from-slate-50 light:to-indigo-50/30 relative">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 font-mono text-sm"
              >
                ✕
              </button>

              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto text-amber-400 border border-amber-500/40">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Official NeuroMind Certificate of Achievement</p>
                <h2 className="text-2xl sm:text-3xl font-serif italic font-extrabold text-slate-100 light:text-slate-900">
                  {selectedCertificate.courseName}
                </h2>
              </div>

              <div className="text-xs text-slate-300 light:text-slate-700 max-w-lg mx-auto">
                This is to certify that <strong className="text-cyan-400 light:text-cyan-700 text-sm">{currentUser.fullName || currentUser.username}</strong> has successfully mastered the theoretical foundations, signal processing algorithms, and computational modeling requirements.
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {selectedCertificate.skillsVerified.map((skill, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950 light:bg-cyan-100 text-cyan-300 light:text-cyan-800 font-bold border border-cyan-800/40">
                    ✓ {skill}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400">
                <div>Date Issued: {selectedCertificate.issuedDate}</div>
                <div>Code: {selectedCertificate.certificateCode}</div>
                <div className="text-emerald-400 font-bold">Verification: VERIFIED</div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
