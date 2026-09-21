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
  X,
  LogIn,
  ArrowRight,
  Search,
  FileText,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  Download,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import logo from '../neclogo.png';
import Loading from '../components/Loading';
import OutpassTicketModal from '../components/OutpassTicketModal';
import { 
  lookupStudentByRoll, 
  submitOutpassApplication, 
  searchOutpasses, 
  getAllOutpasses 
} from '../services/outpassService';

const Login = () => {
  const { login, authenticateWithBiometrics } = useAuth();
  const navigate = useNavigate();

  // Landing Page vs Login Card view toggle
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'login'

  // Staff Login Form states
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

  // Student Outpass Application Modal & Flow states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyStep, setApplyStep] = useState(1); // 1: Enter Roll No -> 2: Verify details & enter reason -> 3: Done
  const [rollInput, setRollInput] = useState('');
  const [matchedStudent, setMatchedStudent] = useState(null);
  const [rollError, setRollError] = useState('');
  const [outpassReason, setOutpassReason] = useState('');
  const [outpassDestination, setOutpassDestination] = useState('Home');
  const [expectedReturnTime, setExpectedReturnTime] = useState('Today before 6:00 PM');
  const [isSubmittingOutpass, setIsSubmittingOutpass] = useState(false);
  
  // Active ticket for Ticket Modal viewer
  const [activeTicket, setActiveTicket] = useState(null);

  // Search/Track Existing Ticket state
  const [trackSearchQuery, setTrackSearchQuery] = useState('');
  const [trackError, setTrackError] = useState('');

  // Intro Animation
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

  // Quick navigation router based on user role
  const routeUserByRole = (userProfile) => {
    if (userProfile.role === 'CR') {
      navigate('/cr-dashboard');
    } else if (userProfile.role === 'ABSENT_CONTROLLER') {
      navigate('/absent-controller');
    } else if (userProfile.role === 'FACULTY') {
      navigate('/faculty-dashboard');
    } else if (userProfile.role === 'WATCHMAN') {
      navigate('/watchman-dashboard');
    } else {
      navigate('/dashboard');
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
      routeUserByRole(loggedUser);
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

      authenticateWithBiometrics(verifyData.token, verifyData.user);
      setShowBiometricsModal(false);
      routeUserByRole(verifyData.user);
    } catch (err) {
      setModalError(err.message);
    } finally {
      setBiometricsLoading(false);
      setBiometricsStatus('');
    }
  };

  useEffect(() => {
    if (showBiometricsModal) {
      const timer = setTimeout(() => {
        handleBiometricAuth();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showBiometricsModal]);

  // Student Outpass Step 1: Look up Roll Number
  const handleLookupRoll = (e) => {
    e.preventDefault();
    if (!rollInput.trim()) {
      setRollError('Please enter your Roll Number');
      return;
    }

    setRollError('');
    const student = lookupStudentByRoll(rollInput);
    if (!student) {
      setRollError('No student record found for this roll number.');
      return;
    }

    setMatchedStudent(student);
    setApplyStep(2); // Move to Step 2: Show details and ask for reason
  };

  // Student Outpass Step 2: Confirm & Submit Application
  const handleSubmitOutpass = (e) => {
    e.preventDefault();
    if (!outpassReason.trim()) {
      setRollError('Please state your reason for going out.');
      return;
    }

    setIsSubmittingOutpass(true);
    try {
      const newTicket = submitOutpassApplication({
        rollNumber: matchedStudent.rollNumber,
        studentName: matchedStudent.name,
        section: matchedStudent.section,
        studentMobile: matchedStudent.studentMobile,
        parentMobile: matchedStudent.parentMobile,
        reason: outpassReason.trim(),
        destination: outpassDestination,
        expectedReturnTime: expectedReturnTime
      });

      // Close application modal and immediately show the official Ticket with download option
      setShowApplyModal(false);
      setMatchedStudent(null);
      setRollInput('');
      setOutpassReason('');
      setApplyStep(1);
      
      // Open ticket modal with generated ticket
      setActiveTicket(newTicket);
    } catch (err) {
      setRollError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmittingOutpass(false);
    }
  };

  // Search/Track an existing application
  const handleTrackSearch = (e) => {
    e.preventDefault();
    setTrackError('');
    if (!trackSearchQuery.trim()) {
      setTrackError('Please enter a Roll Number or Ticket Reference ID');
      return;
    }

    const results = searchOutpasses(trackSearchQuery);
    if (results.length > 0) {
      setActiveTicket(results[0]);
      setTrackSearchQuery('');
    } else {
      setTrackError(`No outpass applications found matching "${trackSearchQuery}".`);
    }
  };

  // Quick fill helper for testing roles
  const fillQuickCredentials = (userType) => {
    if (userType === 'HOD') {
      setUserId('TE_HOD');
      setPassword('HOD_TE');
    } else if (userType === 'ABSENT_CONTROLLER') {
      setUserId('ac123');
      setPassword('password123');
    } else if (userType === 'WATCHMAN') {
      setUserId('watchman');
      setPassword('watchman123');
    } else if (userType === 'CR') {
      setUserId('cr_cse3');
      setPassword('password123');
    }
  };

  return (
    <>
      {/* 1. Intro Splash Screen */}
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
              Campus Gate Permission & Attendance Portal
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

      <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 dark:bg-primary-dark/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 dark:bg-secondary-dark/5 blur-3xl pointer-events-none" />

        {/* 2. Top Navigation Bar with Logo and Required Top-Right Login Button */}
        <header className="w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
          
          {/* Left Brand */}
          <div 
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md bg-white p-0.5 border border-slate-200">
              <img src={logo} alt="NEC Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-primary-dark dark:text-primary leading-tight uppercase">
                Narasaraopeta Engineering College
              </h1>
              <p className="text-[11px] font-extrabold text-customText-muted dark:text-customText-mutedDark">
                Lectra • <span className="text-primary font-bold">Campus Outpass & Attendance</span>
              </p>
            </div>
          </div>

          {/* Top Right: Button with icon + "Login" word as requested */}
          <div className="flex items-center gap-3">
            {viewMode === 'login' ? (
              <button
                type="button"
                onClick={() => setViewMode('landing')}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-customText dark:text-customText-dark text-xs font-extrabold shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <FileText size={16} className="text-primary" />
                <span>Student Outpass Portal</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setViewMode('login')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-95 text-xs font-black shadow-md shadow-primary/20 transition-all cursor-pointer active:scale-95 border border-primary/30"
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
            )}
          </div>
        </header>

        {/* 3. Main Body: Switch between Landing Hero and Login Card */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 z-10 w-full max-w-6xl mx-auto my-auto">
          
          {viewMode === 'landing' ? (
            
            /* HERO SECTION: "Apply Permission to Go Out" */
            <div className="w-full py-6 sm:py-10 flex flex-col items-center text-center animate-fade-in space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-dark dark:text-primary text-xs font-extrabold tracking-wide uppercase shadow-sm">
                <ShieldCheck size={16} />
                <span>Official Digital Gate Pass Clearance System</span>
              </div>

              {/* Hero Title & Subtitle */}
              <div className="max-w-3xl space-y-3">
                <h2 className="text-3xl sm:text-5xl font-black text-customText dark:text-customText-dark tracking-tight leading-tight">
                  Need to Leave Campus?
                </h2>
                <p className="text-base sm:text-xl font-bold text-primary-dark dark:text-primary">
                  Apply permission to go out quickly and securely
                </p>
                <p className="text-xs sm:text-sm text-customText-muted dark:text-customText-mutedDark max-w-2xl mx-auto leading-relaxed">
                  Enter your college roll number to verify your student particulars. Once parent phone call confirmation is verified by the Absent Controller and granted by the HOD, your outpass ticket will be authorized at the campus gate watchman.
                </p>
              </div>

              {/* Primary Call to Action Cards */}
              <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                
                {/* Apply Outpass Card */}
                <div 
                  onClick={() => {
                    setApplyStep(1);
                    setRollInput('');
                    setRollError('');
                    setMatchedStudent(null);
                    setShowApplyModal(true);
                  }}
                  className="p-6 rounded-3xl bg-gradient-to-br from-primary/15 via-white/80 to-white/40 dark:from-primary/10 dark:via-slate-900 dark:to-slate-900/60 border-2 border-primary/30 hover:border-primary shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer text-left flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <h3 className="text-xl font-black text-customText dark:text-customText-dark group-hover:text-primary transition-colors">
                      Apply Permission to Go Out
                    </h3>
                    <p className="text-xs text-customText-muted dark:text-customText-mutedDark leading-relaxed">
                      Instant student outpass request with automatic parent verification and live tracking.
                    </p>
                  </div>

                  <div className="pt-6 flex items-center gap-2 text-xs font-black text-primary group-hover:translate-x-1 transition-transform">
                    <span>Click to Apply Permission</span>
                    <ArrowRight size={16} />
                  </div>
                </div>

                {/* Track Application / Download Ticket Card */}
                <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl text-left flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-primary flex items-center justify-center shadow-sm">
                      <Search size={22} />
                    </div>
                    <h3 className="text-lg font-black text-customText dark:text-customText-dark">
                      Track / Download Outpass Ticket
                    </h3>
                    <p className="text-xs text-customText-muted dark:text-customText-mutedDark leading-relaxed">
                      Already submitted? Enter your Roll Number or Ticket ID to check live status and download your ticket with official college logo.
                    </p>
                  </div>

                  <form onSubmit={handleTrackSearch} className="space-y-2 pt-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter Roll No (e.g. 21NE1A0501)"
                        value={trackSearchQuery}
                        onChange={(e) => {
                          setTrackSearchQuery(e.target.value);
                          if (trackError) setTrackError('');
                        }}
                        className="glass-input text-xs py-2.5 pl-3 pr-20"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-primary text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Search
                      </button>
                    </div>

                    {trackError && (
                      <p className="text-[11px] font-semibold text-rose-500 animate-fade-in flex items-center gap-1">
                        <AlertCircle size={13} /> {trackError}
                      </p>
                    )}
                  </form>
                </div>

              </div>

              {/* Quick Workflow Info Pills */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 w-full max-w-4xl">
                <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-widest block mb-4">
                  4-Step Campus Permission Protocol
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div className="p-3.5 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 text-xs">
                    <span className="font-extrabold text-primary block mb-0.5">1. Student</span>
                    <span className="text-customText-muted">Applies with Roll No & Reason</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 text-xs">
                    <span className="font-extrabold text-primary block mb-0.5">2. Controller</span>
                    <span className="text-customText-muted">Calls Parent for Confirmation</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 text-xs">
                    <span className="font-extrabold text-primary block mb-0.5">3. HOD</span>
                    <span className="text-customText-muted">Grants Outpass Permission</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 text-xs">
                    <span className="font-extrabold text-primary block mb-0.5">4. Watchman</span>
                    <span className="text-customText-muted">Checks Physical ID & Sends Out</span>
                  </div>
                </div>
              </div>

            </div>

          ) : (

            /* STAFF & SECURITY LOGIN CARD */
            <div className="w-full max-w-md glass-card p-8 border border-white/60 dark:border-slate-800/65 relative z-10 animate-fade-in my-auto">
              
              {/* Back to Portal button */}
              <button
                type="button"
                onClick={() => setViewMode('landing')}
                className="absolute top-6 left-6 text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Portal
              </button>

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

              <div className="flex flex-col items-center mb-6 mt-4 text-center">
                <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                  <div className="absolute inset-0 rounded-full border-2 border-t-primary-dark border-r-transparent border-b-secondary border-l-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                  <img src={logo} alt="NEC Logo" className="w-14 h-14 rounded-full object-contain relative z-10 shadow-md" />
                </div>
                <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark tracking-tight">
                  Staff & Security Login
                </h2>
                <p className="text-xs text-customText-muted dark:text-customText-mutedDark mt-1">
                  Access HOD, Absent Controller, Faculty, and Watchman Portals
                </p>
              </div>

              {/* Form Errors */}
              {error && (
                <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Biometrics Loading Status */}
              {biometricsLoading && (
                <div className="mb-5 p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-200/40 text-customText-muted text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5">
                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-primary border-t-transparent shrink-0"></span>
                  <span>{biometricsStatus}</span>
                </div>
              )}

              {/* Password login form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-1.5">
                    User ID
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-customText-muted dark:text-customText-mutedDark">
                      <User size={17} />
                    </span>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="e.g. TE_HOD, ac123, or watchman"
                      className="glass-input pl-10 text-xs"
                      disabled={loading || biometricsLoading}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-customText-muted dark:text-customText-mutedDark">
                      <Lock size={17} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="glass-input pl-10 pr-10 text-xs"
                      disabled={loading || biometricsLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-customText-muted hover:text-customText cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary mt-2 py-3 text-xs font-bold"
                  disabled={loading || biometricsLoading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              {/* Quick Credentials Switcher for Seamless Testing */}
              <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                <span className="text-[10px] font-extrabold text-customText-muted uppercase tracking-wider block text-center mb-2">
                  Quick Demo Accounts
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => fillQuickCredentials('ABSENT_CONTROLLER')}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary font-bold text-customText-muted text-center transition-colors cursor-pointer"
                  >
                    Absent Controller
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickCredentials('HOD')}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary font-bold text-customText-muted text-center transition-colors cursor-pointer"
                  >
                    HOD (Approval)
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickCredentials('WATCHMAN')}
                    className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 font-bold text-center transition-colors cursor-pointer"
                  >
                    Gate Watchman
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* 4. Footer */}
        <footer className="w-full text-center py-4 border-t border-slate-200/40 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm z-10">
          <div className="inline-flex items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 text-xs font-semibold text-customText-muted dark:text-customText-mutedDark shadow-sm">
            <a 
              href="https://nrtec.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary-dark dark:text-primary font-bold hover:underline"
            >
              NEC Narasaraopet
            </a>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold select-none">✕</span>
            <span>Lectra Outpass System</span>
          </div>
        </footer>

      </div>

      {/* 5. Student Outpass Application Modal (Step 1 -> Step 2 -> Submit) */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="fixed inset-0" onClick={() => !isSubmittingOutpass && setShowApplyModal(false)} />
          
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 p-6 sm:p-8 space-y-6 my-auto max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-customText dark:text-customText-dark">
                    Apply Permission to Go Out
                  </h3>
                  <p className="text-xs text-customText-muted">
                    Step {applyStep} of 2: {applyStep === 1 ? 'Enter Roll Number' : 'Verify Details & Stated Reason'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error banner */}
            {rollError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-xl flex items-center gap-2 animate-pulse">
                <AlertCircle size={15} className="shrink-0" />
                <span>{rollError}</span>
              </div>
            )}

            {/* STEP 1: Enter Roll Number */}
            {applyStep === 1 && (
              <form onSubmit={handleLookupRoll} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-2">
                    Enter Student Roll Number
                  </label>
                  <input
                    type="text"
                    value={rollInput}
                    onChange={(e) => {
                      setRollInput(e.target.value.toUpperCase());
                      if (rollError) setRollError('');
                    }}
                    placeholder="e.g. 21NE1A0501"
                    className="glass-input text-sm font-mono uppercase tracking-wider py-3"
                    autoFocus
                    required
                  />
                  <p className="text-[11px] text-customText-muted mt-1.5">
                    Your details will be fetched and verified automatically.
                  </p>
                </div>

                {/* Sample roll numbers for testing */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-customText-muted block mb-1.5">
                    Sample Verified Roll Numbers (Click to test):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['21NE1A0501', '21NE1A0502', '21NE1A0503', '20NE1A0512', '22NE1A0410'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setRollInput(r);
                          if (rollError) setRollError('');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="btn-secondary flex-1 py-3 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Match Details</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Show Matched Details (Last 4 Digits Only, Non-Editable) & Ask Reason */}
            {applyStep === 2 && matchedStudent && (
              <form onSubmit={handleSubmitOutpass} className="space-y-5">
                
                {/* Non-modifiable Student Details Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                      Matched Student Details (Read-Only)
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-extrabold border border-emerald-500/20">
                      Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-customText-muted uppercase block">
                        Student Name
                      </span>
                      <p className="font-extrabold text-customText dark:text-customText-dark">
                        {matchedStudent.name}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-customText-muted uppercase block">
                        Roll Number
                      </span>
                      <p className="font-mono font-extrabold text-primary">
                        {matchedStudent.rollNumber}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-customText-muted uppercase block">
                        Section
                      </span>
                      <p className="font-bold text-customText dark:text-customText-dark">
                        {matchedStudent.section}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-customText-muted uppercase block">
                        Student Mobile
                      </span>
                      <p className="font-mono font-bold text-customText dark:text-customText-dark">
                        {matchedStudent.maskedStudentMobile}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <span className="text-[10px] font-bold text-customText-muted uppercase block">
                        Parent Mobile (Only Last 4 Digits Visible)
                      </span>
                      <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {matchedStudent.maskedParentMobile}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reason for Going Out */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                    Reason for Going Out *
                  </label>
                  <textarea
                    rows={3}
                    value={outpassReason}
                    onChange={(e) => setOutpassReason(e.target.value)}
                    placeholder="Enter reason (e.g. Severe headache, visiting clinic with prescription...)"
                    className="glass-input text-xs py-2.5 resize-none w-full"
                    required
                  />

                  {/* Quick Reason Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      'Medical Emergency / Clinic',
                      'Severe Fever / Headache',
                      'Urgent Family Matter',
                      'Official Bank Work',
                      'Special Event / Travel'
                    ].map((reasonChip) => (
                      <button
                        key={reasonChip}
                        type="button"
                        onClick={() => setOutpassReason(reasonChip)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary text-[11px] font-semibold text-customText-muted transition-colors cursor-pointer"
                      >
                        + {reasonChip}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-customText-muted uppercase mb-1">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={outpassDestination}
                      onChange={(e) => setOutpassDestination(e.target.value)}
                      placeholder="e.g. Home / Local Hospital"
                      className="glass-input text-xs py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-customText-muted uppercase mb-1">
                      Expected Return
                    </label>
                    <input
                      type="text"
                      value={expectedReturnTime}
                      onChange={(e) => setExpectedReturnTime(e.target.value)}
                      placeholder="e.g. 5:30 PM"
                      className="glass-input text-xs py-2"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyStep(1)}
                    className="btn-secondary py-3 px-4 text-xs font-bold"
                    disabled={isSubmittingOutpass}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2"
                    disabled={isSubmittingOutpass}
                  >
                    {isSubmittingOutpass ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* 6. Active Ticket Viewer & Download Modal */}
      {activeTicket && (
        <OutpassTicketModal
          ticket={activeTicket}
          onClose={() => setActiveTicket(null)}
        />
      )}

      {/* 7. Biometric Scan Modal (Standard) */}
      {showBiometricsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => !biometricsLoading && setShowBiometricsModal(false)} 
          />
          
          <div className="relative w-full max-w-sm glass-card p-8 border border-white/20 dark:border-slate-800/40 shadow-2xl z-10 animate-fade-in space-y-6">
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

            <p className="text-xs text-customText-muted dark:text-customText-mutedDark text-center leading-relaxed">
              Scan your registered fingerprint to securely access your account.
            </p>

            <div className="flex flex-col items-center justify-center py-6 relative">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {biometricsLoading && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-primary/30 animate-ripple-ring" style={{ animationDelay: '0s' }} />
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ripple-ring" style={{ animationDelay: '0.6s' }} />
                    <div className="absolute inset-0 rounded-full border border-primary/10 animate-ripple-ring" style={{ animationDelay: '1.2s' }} />
                  </>
                )}

                <button
                  type="button"
                  onClick={() => !biometricsLoading && handleBiometricAuth()}
                  disabled={biometricsLoading}
                  className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-500 overflow-hidden relative ${
                    biometricsLoading 
                      ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(124,157,255,0.2)] cursor-default' 
                      : modalError 
                        ? 'border-danger bg-danger/5 cursor-pointer hover:bg-danger/10' 
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

                  {biometricsLoading && (
                    <div className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(124,157,255,0.8)] animate-scan-line" />
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  modalError ? 'text-danger' : 'text-primary'
                }`}>
                  {biometricsLoading ? biometricsStatus : modalError ? 'Authentication Failed' : 'Ready to Scan'}
                </span>
              </div>
            </div>

            {modalError && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2 animate-pulse">
                <AlertTriangle size={15} className="shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

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
