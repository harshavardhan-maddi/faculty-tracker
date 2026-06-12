import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import logo from '../neclogo.png';
import Loading from '../components/Loading';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [introVisible, setIntroVisible] = useState(true);
  const [introFadeOut, setIntroFadeOut] = useState(false);
  const [progressWidth, setProgressWidth] = useState('0%');

  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgressWidth('100%');
    }, 50);

    const fadeTimer = setTimeout(() => {
      setIntroFadeOut(true);
    }, 2500);

    const unmountTimer = setTimeout(() => {
      setIntroVisible(false);
    }, 3200);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const loggedUser = await login(userId, password);
      // Role routing
      if (loggedUser.role === 'CR') {
        navigate('/cr-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid User ID or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {introVisible && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-customText dark:text-customText-dark select-none transition-all duration-700 ${
            introFadeOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Background glass decorative bubbles - matching landing page exactly */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary-dark/5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 dark:bg-secondary-dark/5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          
          <div className="flex flex-col items-center max-w-lg px-6 text-center z-10">
            {/* Spinning decorative ring & logo */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              {/* Spinning loading gradient ring */}
              <div 
                className="absolute inset-0 rounded-full border-[3px] border-t-primary border-r-transparent border-b-secondary border-l-transparent animate-spin"
                style={{ animationDuration: '1.2s' }}
              />
              {/* Secondary reverse spinning outer ring for high-end look */}
              <div 
                className="absolute -inset-2 rounded-full border border-t-transparent border-r-secondary/40 border-b-transparent border-l-primary/40 animate-spin"
                style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}
              />
              {/* Logo with scale up animation */}
              <img 
                src={logo} 
                alt="NEC Logo" 
                className="w-24 h-24 rounded-full object-contain shadow-2xl animate-pulse bg-white dark:bg-slate-900 p-1 border border-slate-200/50 dark:border-slate-800/50" 
                style={{ animationDuration: '2s' }}
              />
            </div>

            {/* Typography */}
            <h1 className="text-xs font-extrabold tracking-[0.35em] text-primary-dark dark:text-primary uppercase mb-2 animate-fade-in">
              Narasaraopeta Engineering College
            </h1>
            <h2 className="text-2xl font-extrabold tracking-tight text-customText dark:text-customText-dark mb-2">
              Faculty Attendance Tracker
            </h2>
            <p className="text-[10px] text-customText-muted dark:text-customText-mutedDark font-bold tracking-widest uppercase mb-8">
              Real-Time Portal
            </p>

            {/* Filling Progress Bar */}
            <div className="w-48 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative border border-slate-300/30 dark:border-slate-700/30">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-[2450ms] ease-out"
                style={{
                  width: progressWidth
                }}
              />
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden transition-colors duration-300">
        
        {/* Background glass decorative bubbles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary-dark/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 dark:bg-secondary-dark/5 blur-3xl" />

        <div className="w-full max-w-md glass-card p-8 border border-white/60 dark:border-slate-800/65 relative z-10 animate-fade-in">
          
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="relative w-20 h-20 flex items-center justify-center mb-4">
              {/* Spinning ring for decoration */}
              <div className="absolute inset-0 rounded-full border-2 border-t-primary-dark border-r-transparent border-b-secondary border-l-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
              <img src={logo} alt="NEC Logo" className="w-16 h-16 rounded-full object-contain relative z-10 shadow-md" />
            </div>
            <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark tracking-tight">
              Welcome to Faculty Tracker
            </h2>
          <p className="text-sm text-customText-muted dark:text-customText-mutedDark mt-1">
            Sign in to access real-time attendance portal
          </p>
        </div>

        {/* Error notification banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl flex items-center gap-2 animate-pulse">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User ID Field */}
          <div>
            <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-2">
              User ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-customText-muted dark:text-customText-mutedDark">
                <User size={18} />
              </span>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your User ID"
                className="glass-input pl-10"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-customText-muted dark:text-customText-mutedDark">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="glass-input pl-10 pr-10"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-customText-muted dark:text-customText-mutedDark hover:text-customText"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary mt-2 py-3.5"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                <span>Signing in...</span>
              </div>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

      </div>
    </div>
    </>
  );
};

export default Login;
