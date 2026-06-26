import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { startAuthentication } from '@simplewebauthn/browser';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Fingerprint, 
  AlertTriangle, 
  Info,
  X
} from 'lucide-react';
import logo from '../neclogo.png';
import Loading from '../components/Loading';

const Login = () => {
  const { login, authenticateWithBiometrics } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Biometrics states
  const [biometricsLoading, setBiometricsLoading] = useState(false);
  const [biometricsStatus, setBiometricsStatus] = useState('');
  const [showBiometricsModal, setShowBiometricsModal] = useState(false);
  const [modalError, setModalError] = useState('');

  // Intro loader states
  const [introVisible, setIntroVisible] = useState(true);
  const [introFadeOut, setIntroFadeOut] = useState(false);
  const [progressWidth, setProgressWidth] = useState('0%');

  // 1. Intro Animation
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

  const handleFingerprintLogin = async () => {
    if (!window.PublicKeyCredential) {
      setError('Biometric authentication is not supported by your browser. Please login using your User ID and Password.');
      return;
    }

    try {
      const isBiometricAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (!isBiometricAvailable) {
        setError('Your device does not have a fingerprint sensor. Please login using your User ID and Password.');
        return;
      }
    } catch (e) {
      setError('Failed to check biometric availability. Please login using your User ID and Password.');
      return;
    }

    setModalError('');
    setShowBiometricsModal(true);
  };

  const handleBiometricAuth = async () => {
    if (!window.PublicKeyCredential) {
      setModalError('Biometrics are not supported by your browser. Please login using your User ID and Password.');
      return;
    }

    try {
      const isBiometricAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (!isBiometricAvailable) {
        setModalError('Your device does not have a fingerprint sensor. Please login using your User ID and Password.');
        return;
      }
    } catch (e) {
      setModalError('Biometric sensor check failed. Please login using your User ID and Password.');
      return;
    }

    setBiometricsLoading(true);
    setBiometricsStatus('Requesting biometric options...');
    setModalError('');

    try {
      // Step 1: Request authentication challenge options from server (no userId needed)
      const resOptions = await fetch('/api/auth/fingerprint/login-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const optionsData = await resOptions.json();
      if (!resOptions.ok) {
        throw new Error(optionsData.message || 'Fingerprint biometrics not enabled');
      }

      setBiometricsStatus('Scan your fingerprint...');
      
      // Step 2: Invoke device's native fingerprint/biometric authentication prompt
      let assertionResponse;
      try {
        assertionResponse = await startAuthentication(optionsData);
      } catch (authError) {
        console.error(authError);
        if (authError.name === 'NotAllowedError') {
          throw new Error('No registered fingerprint was found on this device for this site, or the scan was cancelled. Please log in with your User ID and Password first, then enroll your fingerprint in Settings.');
        }
        throw new Error(`Biometric scan failed: ${authError.message}. Please log in with User ID and Password.`);
      }

      setBiometricsStatus('Verifying security signature...');

      // Step 3: Send signature response back to server for verification
      const resVerify = await fetch('/api/auth/fingerprint/login-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          response: assertionResponse, 
          challenge: optionsData.challenge 
        })
      });
      const verifyData = await resVerify.json();
      if (!resVerify.ok) {
        throw new Error(verifyData.message || 'Fingerprint authentication failed');
      }

      // Successful authentication
      authenticateWithBiometrics(verifyData.token, verifyData.user);
      
      // Close modal on success
      setShowBiometricsModal(false);
      
      if (verifyData.user.role === 'CR') {
        navigate('/cr-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setModalError(err.message);
    } finally {
      setBiometricsLoading(false);
      setBiometricsStatus('');
    }
  };

  // Trigger biometric scan automatically if modal is opened
  useEffect(() => {
    if (showBiometricsModal) {
      const timer = setTimeout(() => {
        handleBiometricAuth();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showBiometricsModal]);

  return (
    <>
      {introVisible && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-customText dark:text-customText-dark select-none transition-all duration-700 ${
            introFadeOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary-dark/5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 dark:bg-secondary-dark/5 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          
          <div className="flex flex-col items-center max-w-lg px-6 text-center z-10">
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              <div 
                className="absolute inset-0 rounded-full border-[3px] border-t-primary border-r-transparent border-b-secondary border-l-transparent animate-spin"
                style={{ animationDuration: '1.2s' }}
              />
              <div 
                className="absolute -inset-2 rounded-full border border-t-transparent border-r-secondary/40 border-b-transparent border-l-primary/40 animate-spin"
                style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}
              />
              <img 
                src={logo} 
                alt="NEC Logo" 
                className="w-24 h-24 rounded-full object-contain shadow-2xl animate-pulse bg-white dark:bg-slate-900 p-1 border border-slate-200/50 dark:border-slate-800/50" 
                style={{ animationDuration: '2s' }}
              />
            </div>

            <h1 className="text-xs font-extrabold tracking-[0.35em] text-primary-dark dark:text-primary uppercase mb-2 animate-fade-in">
              Narasaraopeta Engineering College
            </h1>
            <h2 className="text-2xl font-extrabold tracking-tight text-customText dark:text-customText-dark mb-2">
              Lectra
            </h2>
            <p className="text-[10px] text-customText-muted dark:text-customText-mutedDark font-bold tracking-widest uppercase mb-8">
              Real-Time Portal
            </p>

            <div className="w-48 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative border border-slate-300/30 dark:border-slate-700/30">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-[2450ms] ease-out"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      )}

      {loading && <Loading />}

      <div className="min-h-screen flex flex-col items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary-dark/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 dark:bg-secondary-dark/5 blur-3xl" />

        <div className="flex-1" />

        <div className="w-full max-w-md glass-card p-8 border border-white/60 dark:border-slate-800/65 relative z-10 animate-fade-in my-auto">
          
          {/* Fingerprint Login Option at Card Top Right */}
          <div className="absolute top-6 right-6 z-20">
            <button
              type="button"
              onClick={handleFingerprintLogin}
              disabled={loading || biometricsLoading}
              title="Sign in with Fingerprint"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-primary/10 hover:border-primary/30 hover:text-primary hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm"
            >
              <Fingerprint 
                size={20} 
                className={`${
                  biometricsLoading ? 'animate-bounce' : ''
                } transition-transform duration-300`} 
              />
            </button>
          </div>

          <div className="flex flex-col items-center mb-8 text-center">
            <div className="relative w-20 h-20 flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-t-primary-dark border-r-transparent border-b-secondary border-l-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
              <img src={logo} alt="NEC Logo" className="w-16 h-16 rounded-full object-contain relative z-10 shadow-md" />
            </div>
            <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark tracking-tight">
              Welcome to Lectra
            </h2>
            <p className="text-sm text-customText-muted dark:text-customText-mutedDark mt-1">
              Sign in to access real-time attendance portal
            </p>
          </div>

          {/* Form Errors */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Biometrics Loading Status */}
          {biometricsLoading && (
            <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-200/40 text-customText-muted text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5">
              <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-primary border-t-transparent shrink-0"></span>
              <span>{biometricsStatus}</span>
            </div>
          )}

          {/* Password login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  disabled={loading || biometricsLoading}
                  required
                />
              </div>
            </div>

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
                  disabled={loading || biometricsLoading}
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

            <button
              type="submit"
              className="w-full btn-primary mt-2 py-3.5"
              disabled={loading || biometricsLoading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  <span>Signing in...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </button>


          </form>

        </div>

        <div className="flex-1 flex items-end justify-center w-full relative z-10">
          <footer className="w-full text-center py-4">
            <div className="inline-flex items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 text-xs font-semibold text-customText-muted dark:text-customText-mutedDark shadow-sm">
              <a 
                href="https://nrtec.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-dark dark:text-primary font-bold hover:underline"
              >
                NEC
              </a>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold select-none">✕</span>
              <a 
                href="https://technoelite-web-portal.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-dark dark:text-primary font-bold hover:underline"
              >
                Technoelite
              </a>
            </div>
          </footer>
        </div>
      </div>

      {/* Biometric Scan Modal */}
      {showBiometricsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass backdrop with high blur */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => !biometricsLoading && setShowBiometricsModal(false)} 
          />
          
          <div className="relative w-full max-w-sm glass-card p-8 border border-white/20 dark:border-slate-800/40 shadow-2xl z-10 animate-fade-in space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
              <h3 className="font-extrabold text-lg text-customText dark:text-customText-dark flex items-center gap-2">
                <Fingerprint className="text-primary" size={22} />
                <span>Biometric Login</span>
              </h3>
              <button 
                type="button" 
                onClick={() => !biometricsLoading && setShowBiometricsModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-customText-muted dark:text-customText-mutedDark transition-colors cursor-pointer"
                disabled={biometricsLoading}
              >
                <X size={20} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-customText-muted dark:text-customText-mutedDark text-center leading-relaxed">
              Scan your registered fingerprint to securely access your account.
            </p>

            {/* Fingerprint Scanner Animation Graphic */}
            <div className="flex flex-col items-center justify-center py-6 relative">
              <div className="relative w-32 h-32 flex items-center justify-center">
                
                {/* Ripple Rings */}
                {biometricsLoading && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-primary/30 animate-ripple-ring" style={{ animationDelay: '0s' }} />
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ripple-ring" style={{ animationDelay: '0.6s' }} />
                    <div className="absolute inset-0 rounded-full border border-primary/10 animate-ripple-ring" style={{ animationDelay: '1.2s' }} />
                  </>
                )}

                {/* Central Circle */}
                <button
                  type="button"
                  onClick={() => !biometricsLoading && handleBiometricAuth()}
                  disabled={biometricsLoading}
                  className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-500 overflow-hidden relative ${
                    biometricsLoading 
                      ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(124,157,255,0.2)] cursor-default' 
                      : modalError 
                        ? 'border-danger bg-danger/5 cursor-pointer hover:bg-danger/10 shadow-[0_0_15px_rgba(239,154,154,0.15)]' 
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 cursor-pointer hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <Fingerprint 
                    size={48} 
                    className={`transition-all duration-500 ${
                      biometricsLoading 
                        ? 'text-primary scale-110' 
                        : modalError 
                          ? 'text-danger' 
                          : 'text-slate-400 dark:text-slate-500 hover:text-primary'
                    }`} 
                  />

                  {/* Laser scan line going up/down */}
                  {biometricsLoading && (
                    <div className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(124,157,255,0.8)] animate-scan-line" />
                  )}
                </button>
              </div>

              {/* Scanning Status Text */}
              <div className="mt-4 text-center">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  modalError ? 'text-danger' : 'text-primary'
                }`}>
                  {biometricsLoading ? biometricsStatus : modalError ? 'Authentication Failed' : 'Ready to Scan'}
                </span>
              </div>
            </div>

            {/* Modal Error alert */}
            {modalError && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2 animate-pulse">
                <AlertTriangle size={15} className="shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBiometricsModal(false)}
                className="flex-1 btn-secondary py-2.5 text-xs font-bold cursor-pointer"
                disabled={biometricsLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBiometricAuth}
                className="flex-1 btn-primary py-2.5 text-xs font-bold cursor-pointer"
                disabled={biometricsLoading}
              >
                {biometricsLoading ? 'Scanning...' : 'Scan Fingerprint'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
