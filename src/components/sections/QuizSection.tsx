src/components/sections/QuizSection.tsximport React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { QuizQuestion } from '../../types';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQ = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIdx: number) => {
    if (selectedOptions[currentIndex] !== undefined) return; // Prevent re-select
    setSelectedOptions({ ...selectedOptions, [currentIndex]: optionIdx });
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptions({});
    setShowResults(false);
  };

  // Calculate score
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q, idx) => {
    if (selectedOptions[idx] === q.correctIndex) correctCount++;
  });
  const scorePercent = Math.round((correctCount / totalQ) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Info */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-wider">Interactive Evaluation Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Neuro-AI & BCI Assessment Quiz</h2>
            <p className="text-sm text-slate-400 mt-1">
              Test your mastery of Human Brain Electrophysiology, BCI Paradigms, Convolutional EEGNet, GAN Data Augmentation, and ViT Attention.
            </p>
          </div>

          {!showResults && (
            <div className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1.5 rounded-lg border border-cyan-800/40">
              Question {currentIndex + 1} of {totalQ}
            </div>
          )}
        </div>
      </div>

      {!showResults ? (
        /* Question Card */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800/40">
              Category: {currentQ.category}
            </span>
            <h3 className="text-xl font-bold text-slate-100 leading-snug">{currentQ.question}</h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOptions[currentIndex] === optIdx;
              const hasAnswered = selectedOptions[currentIndex] !== undefined;
              const isCorrect = optIdx === currentQ.correctIndex;

              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
              if (hasAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between ${optionStyle}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Depth Insight Box */}
          {selectedOptions[currentIndex] !== undefined && (
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2 animate-fadeIn text-xs">
              <div className="font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Scientific Depth Insight:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              <p className="text-slate-400 italic pt-1 border-t border-slate-800/80">{currentQ.depthInsight}</p>
            </div>
          )}

          {/* Bottom Next Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              disabled={selectedOptions[currentIndex] === undefined}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedOptions[currentIndex] !== undefined
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === totalQ - 1 ? 'Finish Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Results & Certificate Summary */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-100">Assessment Completed!</h3>
            <p className="text-sm text-slate-400 mt-1">Here is your Neuro-AI & BCI knowledge breakdown</p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-w-md mx-auto space-y-3">
            <div className="text-3xl font-extrabold text-cyan-400 font-mono">
              {scorePercent}%
            </div>
            <div className="text-xs text-slate-300">
              You answered <span className="font-bold text-emerald-400">{correctCount}</span> out of <span className="font-bold text-slate-200">{totalQ}</span> questions correctly.
            </div>
          </div>

          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
