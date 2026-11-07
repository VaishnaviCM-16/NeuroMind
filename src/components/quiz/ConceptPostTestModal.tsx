import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircle2, XCircle, AlertCircle, HelpCircle, Trophy, Sparkles, ArrowRight } from 'lucide-react';

interface ConceptPostTestModalProps {
  conceptTitle: string;
  conceptId: string;
  isOpen: boolean;
  onClose: () => void;
  onTestPassed: (scorePercent: number) => void;
}

export const ConceptPostTestModal: React.FC<ConceptPostTestModalProps> = ({
  conceptTitle,
  conceptId,
  isOpen,
  onClose,
  onTestPassed,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Concept specific questions database map
  const conceptQuestions: QuizQuestion[] = [
    {
      id: `${conceptId}-q1`,
      category: 'scratch',
      question: `What is the primary physiological mechanism governing ${conceptTitle}?`,
      options: [
        'Selective ion channels and electrochemical gradient changes across cell membranes',
        'Direct static magnetic fields without ionic flux',
        'Pure mechanical sound wave resonance',
        'Infrared optical photon dispersion'
      ],
      correctIndex: 0,
      explanation: 'Biological neural signaling relies on transmembrane ion potential changes driven by Na+, K+, and Ca2+ ion channels.',
      depthInsight: 'Nernst and Goldman-Hodgkin-Katz equations calculate resting and action potentials.'
    },
    {
      id: `${conceptId}-q2`,
      category: 'bci',
      question: 'Which signal processing step or property is critical for high-fidelity extraction of this activity?',
      options: [
        'Bandpass filtering and artifact rejection to isolate neural frequency bands',
        'Amplifying ambient powerline 60Hz noise',
        'Ignoring spatial electrode geometry',
        'Truncating signal resolution to 1-bit binary'
      ],
      correctIndex: 0,
      explanation: 'EEG and ECoG microvolt signals require strict bandpass filtering (0.5-40 Hz) to eliminate EMG/EOG artifacts.',
      depthInsight: 'Common Spatial Patterns (CSP) further optimize spatial filter weights.'
    },
    {
      id: `${conceptId}-q3`,
      category: 'nn',
      question: 'How do modern computational neural networks or models process this neural representation?',
      options: [
        'By applying temporal and spatial convolutions or attention layers to decode user intent',
        'By using static linear lookup tables with fixed hardcoded values',
        'By converting all inputs into uncompressed analog audio FM radio bands',
        'By disregarding temporal sequence order completely'
      ],
      correctIndex: 0,
      explanation: 'Architectures like EEGNet, SNN, and Transformers extract spatio-temporal features to classify motor or visual intent.',
      depthInsight: 'Depthwise separable convolutions minimize parameter count while capturing multi-channel EEG filters.'
    }
  ];

  const currentQ = conceptQuestions[currentQuestionIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optIndex });
  };

  const calculateScore = () => {
    let correctCount = 0;
    conceptQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / conceptQuestions.length) * 100);
  };

  const scorePercent = calculateScore();
  const passed = scorePercent >= 66;

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    if (passed) {
      onTestPassed(scorePercent);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#08080a] light:bg-white border border-cyan-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 light:text-slate-900 relative overflow-hidden">
        {/* Glow Top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500"></div>

        <div className="flex items-center justify-between border-b border-white/10 light:border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-cyan-400 light:text-cyan-700" />
            <div>
              <h3 className="font-bold text-base text-slate-100 light:text-slate-900">Concept Mastery Test</h3>
              <p className="text-[11px] font-mono text-cyan-400 light:text-cyan-700 font-semibold">{conceptTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100 p-1 font-mono">
            ✕
          </button>
        </div>

        {!isSubmitted ? (
          <div className="space-y-5">
            {/* Question Counter */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Question {currentQuestionIndex + 1} of {conceptQuestions.length}</span>
              <span className="text-cyan-400 light:text-cyan-700 font-bold">Passing score: 66%</span>
            </div>

            {/* Question Card */}
            <div className="bg-[#050507] light:bg-slate-50 p-4 rounded-2xl border border-slate-800 light:border-slate-200 space-y-3">
              <h4 className="font-semibold text-sm leading-relaxed text-slate-200 light:text-slate-800">
                {currentQ.question}
              </h4>

              <div className="space-y-2 pt-2">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all flex items-start space-x-3 ${
                        isSelected
                          ? 'bg-cyan-950/80 light:bg-cyan-100 border-cyan-500 text-cyan-200 light:text-cyan-900 font-bold'
                          : 'bg-[#08080a] light:bg-white border-slate-800 light:border-slate-200 hover:border-slate-600 text-slate-300 light:text-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full border text-[10px] flex items-center justify-center shrink-0 ${isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950 font-extrabold' : 'border-slate-600'}`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold disabled:opacity-40"
              >
                Previous
              </button>

              {currentQuestionIndex < conceptQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center space-x-1"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitTest}
                  disabled={Object.keys(selectedAnswers).length < conceptQuestions.length}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg disabled:opacity-40"
                >
                  Submit Mastery Test
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="text-center space-y-6 py-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border ${passed ? 'bg-emerald-950 light:bg-emerald-100 text-emerald-400 border-emerald-500' : 'bg-red-950 light:bg-red-100 text-red-400 border-red-500'}`}>
              {passed ? <Trophy className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-100 light:text-slate-900">
                {passed ? 'Concept Mastery Verified! 🎉' : 'Retake Test Needed'}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Your Score: <strong className={passed ? 'text-emerald-400 text-sm' : 'text-red-400 text-sm'}>{scorePercent}%</strong>
              </p>
            </div>

            {passed ? (
              <div className="p-4 bg-emerald-950/40 light:bg-emerald-50 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300 light:text-emerald-800 space-y-2">
                <div className="font-bold flex items-center justify-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Lesson marked as 100% Completed! (+100 XP awarded)</span>
                </div>
                <p className="text-[11px] text-slate-300 light:text-slate-700">
                  Your mastery progress has been stored in your student profile and synced to your dashboard.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 light:text-slate-600">
                You need at least 66% to unlock lesson completion. Review the lesson summary and try again!
              </p>
            )}

            <div className="flex items-center justify-center space-x-3 pt-2">
              {passed ? (
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl"
                >
                  Continue Studying
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl"
                >
                  Retake Test Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
