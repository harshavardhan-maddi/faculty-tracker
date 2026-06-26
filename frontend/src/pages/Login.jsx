import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as faceapi from '@vladmandic/face-api';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Camera, 
  RefreshCw, 
  KeyRound, 
  AlertTriangle, 
  Info 
} from 'lucide-react';
import logo from '../neclogo.png';
import Loading from '../components/Loading';

const Login = () => {
  const { login, authenticateWithFace } = useAuth();
  const navigate = useNavigate();

  // Existing password login states
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Intro loader states
  const [introVisible, setIntroVisible] = useState(true);
  const [introFadeOut, setIntroFadeOut] = useState(false);
  const [progressWidth, setProgressWidth] = useState('0%');

  // Face auth states
  const [hasRegisteredFaces, setHasRegisteredFaces] = useState(null);
  const [useFaceAuth, setUseFaceAuth] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [faceScanStatus, setFaceScanStatus] = useState('');
  const [faceScanError, setFaceScanError] = useState('');
  const [detectedFace, setDetectedFace] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectIntervalRef = useRef(null);

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

  // 2. Check face authentication availability on mount
  useEffect(() => {
    const checkSystemFaceStatus = async () => {
      try {
        const res = await fetch('/api/auth/face/check');
        const data = await res.json();
        setHasRegisteredFaces(data.hasRegisteredFaces);
        
        // If there are enrolled faces in the system, face auth is the default
        if (data.hasRegisteredFaces) {
          setUseFaceAuth(true);
        }
      } catch (err) {
        console.error('Failed to verify system face status:', err);
        setHasRegisteredFaces(false);
      }
    };
    checkSystemFaceStatus();
  }, []);

  // 3. Initialize camera when Face Auth is active and intro finishes
  useEffect(() => {
    if (!introVisible && useFaceAuth) {
      startFaceScanner();
    } else {
      stopFaceScanner();
    }
    return () => {
      stopFaceScanner();
    };
  }, [introVisible, useFaceAuth]);

  // Lazy loading face models
  const loadFaceModels = async () => {
    if (modelsLoaded) return;
    setLoadingModels(true);
    setFaceScanStatus('Initializing face models...');
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models')
      ]);
      setModelsLoaded(true);
    } catch (err) {
      console.error('Failed to load Face Models:', err);
      setFaceScanError('Failed to load neural models.');
    } finally {
      setLoadingModels(false);
    }
  };

  const startFaceScanner = async () => {
    setFaceScanError('');
    setFaceScanStatus('Starting camera...');
    setDetectedFace(null);

    // Make sure models are loaded before turning on camera
    await loadFaceModels();

    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setFaceScanStatus('Position your face in the box');
          startFaceDetection();
        };
      }
    } catch (err) {
      console.error('Camera stream access failed:', err);
      setFaceScanError('Unable to access camera. Please check permissions.');
      stopFaceScanner();
    }
  };

  const stopFaceScanner = () => {
    if (detectIntervalRef.current) {
      clearInterval(detectIntervalRef.current);
      detectIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setDetectedFace(null);
  };

  const startFaceDetection = () => {
    if (detectIntervalRef.current) clearInterval(detectIntervalRef.current);

    let consecutiveFramesWithFace = 0;

    detectIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !streamRef.current) return;

      try {
        const detection = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.55 })
        ).withFaceLandmarks().withFaceDescriptor();

        if (detection) {
          setDetectedFace(true);
          consecutiveFramesWithFace += 1;
          setFaceScanStatus('Scanning face... Hold still.');

          // Match when face is stable for 3 consecutive frames
          if (consecutiveFramesWithFace >= 3) {
            clearInterval(detectIntervalRef.current);
            detectIntervalRef.current = null;
            submitFaceDescriptor(detection.descriptor);
          }
        } else {
          setDetectedFace(false);
          consecutiveFramesWithFace = 0;
          setFaceScanStatus('Position your face in the box');
        }
      } catch (err) {
        console.error('Face detection error:', err);
      }
    }, 300);
  };

  const submitFaceDescriptor = async (descriptor) => {
    setFaceScanStatus('Verifying face signature...');
    setLoading(true);
    setFaceScanError('');

    try {
      const res = await fetch('/api/auth/face/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descriptor: Array.from(descriptor) })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Face authentication failed');

      // Login success: update context and redirect
      authenticateWithFace(data.token, data.user);
      
      if (data.user.role === 'CR') {
        navigate('/cr-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setFaceScanError(err.message || 'Face not recognized.');
      setFaceScanStatus('Scanning failed.');
    } finally {
      setLoading(false);
    }
  };

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

      {loading && !useFaceAuth && <Loading />}

      <div className="min-h-screen flex flex-col items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary-dark/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 dark:bg-secondary-dark/5 blur-3xl" />

        <div className="flex-1" />

        <div className="w-full max-w-md glass-card p-8 border border-white/60 dark:border-slate-800/65 relative z-10 animate-fade-in my-auto">
          
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

          {/* Fallback Banner for No Registered Face */}
          {hasRegisteredFaces === false && !useFaceAuth && (
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold rounded-xl flex items-center gap-2">
              <Info size={14} className="shrink-0" />
              <span>No Face Authentication has been configured.</span>
            </div>
          )}

          {/* Password Form Errors */}
          {error && !useFaceAuth && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl flex items-center gap-2 animate-pulse">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {useFaceAuth ? (
            /* Face Scanner Login UI */
            <div className="space-y-6">
              
              {/* Scan Status Display */}
              {faceScanError ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{faceScanError}</span>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-200/40 text-customText-muted text-xs font-medium rounded-xl flex items-center justify-center gap-2.5">
                  {(loadingModels || loading) ? (
                    <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-primary border-t-transparent shrink-0"></span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0"></span>
                  )}
                  <span>{faceScanStatus}</span>
                </div>
              )}

              {/* Video Camera Container */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                
                {/* Visual Target frame */}
                <div className="absolute inset-0 border-[3px] border-dashed border-white/20 rounded-2xl pointer-events-none flex items-center justify-center">
                  <div className={`w-36 h-36 rounded-full border-2 transition-colors duration-300 ${detectedFace ? 'border-green-500 bg-green-500/5' : 'border-white/20 bg-white/5'}`} />
                </div>
              </div>

              {/* Scanner Actions */}
              <div className="flex flex-col gap-3">
                {faceScanError && (
                  <button
                    onClick={startFaceScanner}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={16} />
                    <span>Retry Face Login</span>
                  </button>
                )}
                
                <button
                  onClick={() => setUseFaceAuth(false)}
                  className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
                >
                  <KeyRound size={16} />
                  <span>Login with Password</span>
                </button>
              </div>

            </div>
          ) : (
            /* Classic Password login form */
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
                    disabled={loading}
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

              <button
                type="submit"
                className="w-full btn-primary mt-2 py-3.5"
                disabled={loading}
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

              {hasRegisteredFaces && (
                <button
                  type="button"
                  onClick={() => setUseFaceAuth(true)}
                  className="w-full btn-secondary py-3 flex items-center justify-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-4"
                >
                  <Camera size={16} />
                  <span>Scan My Face</span>
                </button>
              )}
            </form>
          )}

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
    </>
  );
};

export default Login;
