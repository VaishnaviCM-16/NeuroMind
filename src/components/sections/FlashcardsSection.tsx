import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../../data/flashcardsData';
import { TheoryCategory, Flashcard } from '../../types';
import { Layers, RotateCw, CheckCircle, ChevronLeft, ChevronRight, Shuffle, Sparkles, Award, Home } from 'lucide-react';

interface FlashcardsSectionProps {
  onNavigateToTab?: (tab: string) => void;
}

export const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ onNavigateToTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<TheoryCategory | 'all'>('all');
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const filteredCards = cards.filter((c) => selectedCategory === 'all' || c.category === selectedCategory);
  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastered = (id: string) => {
    if (masteredIds.includes(id)) {
      setMasteredIds(masteredIds.filter((i) => i !== id));
    } else {
      setMasteredIds([...masteredIds, id]);
    }
  };

  const masteryPercent = Math.round((masteredIds.length / cards.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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
                <Layers className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">Active Recall Flashcards</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Neuro-AI Mastery Flashcards</h2>
            <p className="text-sm text-slate-400 mt-1">
              Reinforce core theoretical concepts in Brain Anatomy, BCI Paradigms, SNNs, GANs, and Vision Transformers.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Mastery Progress</div>
              <div className="text-xs font-bold text-amber-400">
                {masteredIds.length} / {cards.length} Mastered ({masteryPercent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/80">
          {[
            { id: 'all', label: 'All Cards' },
            { id: 'brain', label: 'Human Brain' },
            { id: 'bci', label: 'BCI & EEG' },
            { id: 'nn', label: 'NN & SNN' },
            { id: 'gan', label: 'GANs' },
            { id: 'vit', label: 'Vision Transformers' },
            { id: 'gai', label: 'Generative AI' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
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

      {/* Main Flashcard Display Stage */}
      {currentCard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <button
              onClick={handleShuffle}
              className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle Deck</span>
            </button>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[320px] bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 shadow-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
          >
            {/* Corner Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800/40">
                {currentCard.category} • {currentCard.difficulty}
              </span>

              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Click to Flip</span>
              </span>
            </div>

            {/* Front vs Back Content */}
            <div className="my-auto py-6 text-center space-y-4">
              {!isFlipped ? (
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Question</div>
                  <h3 className="text-2xl font-bold text-slate-100 max-w-xl mx-auto leading-relaxed">
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wider text-emerald-400 font-mono mb-2">Answer</div>
                  <h3 className="text-2xl font-bold text-emerald-300 max-w-xl mx-auto">
                    {currentCard.answer}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80 mt-4">
                    {currentCard.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Card Actions */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  masteredIds.includes(currentCard.id)
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{masteredIds.includes(currentCard.id) ? 'Mastered!' : 'Mark as Mastered'}</span>
              </button>

              <span className="text-slate-500 text-[11px]">Click card or press flip button</span>
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20"
            >
              {isFlipped ? 'Show Question' : 'Reveal Answer'}
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
          No flashcards found for selected category.
        </div>
      )}
    </div>
  );
};
