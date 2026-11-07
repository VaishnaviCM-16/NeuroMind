import React, { useState, useEffect } from 'react';
import { UserAccount } from '../../types';
import { User, Lock, Mail, ShieldCheck, ArrowRight, Brain, AlertCircle, KeyRound, CheckCircle2, RotateCw } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Security CAPTCHA State
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(5);
  const [captchaInput, setCaptchaInput] = useState('');

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setNum1(a);
    setNum2(b);
    setCaptchaInput('');
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setResetSuccessMsg('');

    // Verify Captcha Challenge
    if (parseInt(captchaInput.trim(), 10) !== num1 + num2) {
      setErrorMsg(`Security CAPTCHA challenge failed. ${num1} + ${num2} ≠ ${captchaInput}. Please try again.`);
      generateCaptcha();
      return;
    }

    setLoading(true);

    if (mode === 'forgot') {
      try {
        const res = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usernameOrEmail: username || email,
            newPassword,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.error || 'Password reset failed');
          generateCaptcha();
          setLoading(false);
          return;
        }

        setResetSuccessMsg('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          setMode('login');
          setPassword(newPassword);
          setResetSuccessMsg('');
        }, 1800);
      } catch (err) {
        setErrorMsg('Network or server connection failed. Please try again.');
        generateCaptcha();
      } finally {
        setLoading(false);
      }
      return;
    }

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const body =
      mode === 'login'
        ? { username, password }
        : { username, password, fullName, email };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Authentication failed');
        generateCaptcha();
        setLoading(false);
        return;
      }

      onLoginSuccess(data.user);
      onClose();
    } catch (err) {
      setErrorMsg('Network or server connection failed. Please try again.');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#08080a] border border-white/10 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif italic text-lg font-bold text-slate-100">NeuroMind Account</h2>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                {mode === 'login'
                  ? 'Access Knowledge & Progress'
                  : mode === 'register'
                  ? 'Create Free Student Account'
                  : 'Account Password Recovery'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-200 text-sm font-mono p-1"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {resetSuccessMsg && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{resetSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Ada Lovelace"
                    className="w-full bg-[#050507] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@neuroscience.org"
                    className="w-full bg-[#050507] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </>
          )}

          {mode === 'forgot' ? (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Registered Username or Email</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username or email"
                    className="w-full bg-[#050507] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">New Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 4 chars)"
                    className="w-full bg-[#050507] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Username</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="neuromind_user"
                    className="w-full bg-[#050507] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-400">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setErrorMsg('');
                      }}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#050507] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* CAPTCHA Security Verification */}
          <div className="p-3 bg-[#050507] light:bg-slate-50 border border-white/10 light:border-slate-300 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 light:text-slate-600 font-mono">
              <span className="flex items-center space-x-1 font-bold text-cyan-400 light:text-cyan-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Security CAPTCHA Challenge</span>
              </span>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-slate-400 hover:text-cyan-400 flex items-center space-x-1 text-[10px] font-mono transition-colors"
                title="Generate New Security Question"
              >
                <RotateCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1.5 bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/40 rounded-lg text-cyan-300 light:text-cyan-900 font-mono font-extrabold text-sm tracking-wider shrink-0 select-none">
                {num1} + {num2} = ?
              </div>
              <input
                type="number"
                required
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Result"
                className="w-full bg-[#08080a] light:bg-white border border-white/10 light:border-slate-300 rounded-lg px-3 py-1.5 text-slate-200 light:text-slate-900 focus:outline-none focus:border-cyan-500 text-xs font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center justify-center space-x-2 shadow-lg shadow-cyan-900/30 transition-all disabled:opacity-50"
          >
            <span>
              {loading
                ? 'Processing...'
                : mode === 'login'
                ? 'Sign In'
                : mode === 'register'
                ? 'Create Account'
                : 'Reset Password'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">
            {mode === 'login'
              ? "Don't have an account?"
              : mode === 'register'
              ? 'Already registered?'
              : 'Remembered your password?'}
          </span>
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setErrorMsg('');
            }}
            className="text-cyan-400 hover:underline font-bold"
          >
            {mode === 'login' ? 'Sign Up Free' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
