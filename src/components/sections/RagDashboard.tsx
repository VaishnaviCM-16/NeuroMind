import React, { useState, useEffect } from 'react';
import { RagSearchResult, DocumentChunk } from '../../types';
import { Database, Search, Cpu, Layers, Sparkles, Sliders, CheckCircle2, Server, ArrowRight } from 'lucide-react';

export const RagDashboard: React.FC = () => {
  const [testQuery, setTestQuery] = useState<string>('How does WGAN-GP prevent mode collapse in synthetic EEG generation?');
  const [searchResults, setSearchResults] = useState<RagSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [allDocs, setAllDocs] = useState<DocumentChunk[]>([]);

  // Execute RAG Query Search
  const handleExecuteRag = async (queryToSearch: string) => {
    setIsSearching(true);
    try {
      const res = await fetch('/api/rag/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToSearch, topK: 3 }),
      });
      const data = await res.json();
      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (err) {
      console.error('RAG Search Error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch Document Store Chunks on Mount
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch('/api/rag/docs');
        const data = await res.json();
        if (data.chunks) {
          setAllDocs(data.chunks);
        }
      } catch (err) {
        console.error('Fetch Docs Error:', err);
      }
    };
    fetchDocs();
    handleExecuteRag(testQuery);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Database className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider">Modular RAG Architecture Inspector</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Retrieval-Augmented Generation (RAG) Engine</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Inspect vector document chunking, semantic similarity ranking (Cosine Distance), and real-time context injection into Gemini 3.6 Flash prompts.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400">
            <Server className="w-4 h-4" />
            <span>Store: {allDocs.length} Chunks Indexed</span>
          </div>
        </div>
      </div>

      {/* RAG Query Sandbox */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
          <Search className="w-4 h-4 text-cyan-400" />
          <span>Live Vector Search Query Sandbox</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="Type query to test RAG retrieval..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
          />
          <button
            onClick={() => handleExecuteRag(testQuery)}
            disabled={isSearching}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20 flex items-center justify-center space-x-2"
          >
            <span>{isSearching ? 'Searching Vectors...' : 'Execute Retrieval'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Example Query Pills */}
        <div className="flex flex-wrap gap-2 text-[11px] pt-1">
          <span className="text-slate-400 self-center">Preset Queries:</span>
          {[
            'Action potential depolarization in motor cortex',
            'SSVEP frequency resonance over O1 and O2',
            'EEGNet depthwise spatial convolutions',
            'Mind-Vis Latent Diffusion fMRI decoding',
          ].map((q) => (
            <button
              key={q}
              onClick={() => {
                setTestQuery(q);
                handleExecuteRag(q);
              }}
              className="bg-slate-950 border border-slate-800/80 text-cyan-400 hover:text-cyan-200 px-2.5 py-1 rounded-lg transition-colors"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Retrieved Chunks Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Retrieved Top-K Knowledge Chunks ({searchResults.length})</span>
          </h3>

          <div className="space-y-3">
            {searchResults.map((res, idx) => (
              <div key={res.chunk.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/40">
                      Rank #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-200">{res.chunk.title}</span>
                  </div>

                  {/* Similarity Meter */}
                  <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Similarity:</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{(res.similarityScore * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 font-serif">
                  "{res.chunk.content}"
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {res.chunk.keywords.map((kw) => (
                    <span key={kw} className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RAG System Parameters Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 text-slate-200">
            <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>RAG System Hyperparameters</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Chunking Strategy:</span>
                <span className="font-mono text-cyan-300 font-semibold">Semantic Sectioning</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Target Chunk Size:</span>
                <span className="font-mono text-cyan-300 font-semibold">500 Tokens</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Chunk Overlap:</span>
                <span className="font-mono text-cyan-300 font-semibold">50 Tokens</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Vector Metric:</span>
                <span className="font-mono text-emerald-400 font-semibold">Cosine Distance</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Generative Model:</span>
                <span className="font-mono text-indigo-400 font-semibold">gemini-3.6-flash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
