import React, { useState } from 'react';
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

        {/* Demo accounts cheat sheet footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-2.5">
            Quick Sandbox Accounts:
          </p>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 font-medium bg-slate-100/50 dark:bg-slate-900/30 p-2.5 rounded-xl border border-slate-200/20 dark:border-slate-800/20">
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">HOD</p>
              <code className="text-primary-dark">hod123</code>
            </div>
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">Sub Admin</p>
              <code className="text-primary-dark">subadmin123</code>
            </div>
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">CR (CSE 3)</p>
              <code className="text-primary-dark">cr_cse3</code>
            </div>
          </div>
          <p className="text-[9px] text-customText-muted dark:text-customText-mutedDark mt-2 italic">
            Password is <code className="font-bold">password123</code> for all sandbox users.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
