import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import * as faceapi from '@vladmandic/face-api';
import { 
  Camera, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  AlertTriangle,
  User, 
  Lock, 
  Check, 
  X, 
  Info,
  KeyRound
} from 'lucide-react';

const FaceSettings = () => {
  const { token, user } = useAuth();
  
  // Settings state
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Camera & Detection state
  const [cameraActive, setCameraActive] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [scanError, setScanError] = useState('');
  const [detectedFace, setDetectedFace] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Security Verification Modal
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [verifySubmitting, setVerifySubmitting] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'register' | 'update' | 'remove'

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectIntervalRef = useRef(null);

  const fetchFaceSettings = async () => {
    try {
      const res = await fetch('/api/auth/face/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch face settings');
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaceSettings();
    return () => {
      stopCamera();
    };
  }, []);

  const handleToggleFaceAuth = async (newValue) => {
    try {
      const res = await fetch('/api/auth/face/toggle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ enabled: newValue })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to toggle status');
      setSuccess(data.message);
      fetchFaceSettings();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  // Open Verify Modal beforeSetup
  const triggerVerify = (action) => {
    setVerifyPassword('');
    setVerifyError('');
    setPendingAction(action);
    setShowVerifyModal(true);
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setVerifyError('');
    setVerifySubmitting(true);

    try {
      if (pendingAction === 'remove') {
        // Remove doesn't need to open camera, directly calls delete API
        const res = await fetch('/api/auth/face/remove', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ password: verifyPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to remove face profile');
        
        setSuccess(data.message);
        setShowVerifyModal(false);
        fetchFaceSettings();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        // Register or Update require opening the camera scanner
        // We temporarily verify password locally by passing it to the camera scan submission later
        // But we should double check if the password is valid right now before launching camera.
        // Let's do a dummy validation / actual validation check to prevent starting camera if password is wrong:
        // We can do this by calling a test password-verification or just verifying during submission.
        // To be safe and clean, we will hold the password in state and initialize the camera immediately.
        // When the descriptor is captured, we send the password along.
        // Let's ensure the user enters a non-empty password first.
        if (!verifyPassword) {
          throw new Error('Password is required');
        }
        setShowVerifyModal(false);
        setCameraActive(true);
        startCamera();
      }
    } catch (err) {
      setVerifyError(err.message);
    } finally {
      setVerifySubmitting(false);
    }
  };

  // Lazy loading face models
  const loadFaceModels = async () => {
    if (modelsLoaded) return;
    setLoadingModels(true);
    setScanStatus('Initializing neural networks...');
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models')
      ]);
      setModelsLoaded(true);
    } catch (err) {
      console.error('Failed to load Face Models:', err);
      setScanError(`Failed to load AI face detection models: ${err.message || err.toString()}`);
    } finally {
      setLoadingModels(false);
    }
  };

  const startCamera = async () => {
    setScanError('');
    setScanStatus('Starting camera stream...');
    setDetectedFace(null);

    // Ensure models are loaded
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
        // Wait for video metadata to load before starting detection loop
        videoRef.current.onloadedmetadata = () => {
          setScanStatus('Camera active. Align your face.');
          startDetectionLoop();
        };
      }
    } catch (err) {
      console.error('Camera stream access failed:', err);
      setScanError('Unable to access webcam. Please ensure camera permissions are granted.');
      stopCamera();
    }
  };

  const stopCamera = () => {
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
    setCameraActive(false);
    setIsCapturing(false);
    setDetectedFace(null);
  };

  const startDetectionLoop = () => {
    if (detectIntervalRef.current) clearInterval(detectIntervalRef.current);

    detectIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !streamRef.current) return;

      try {
        const detection = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
        ).withFaceLandmarks().withFaceDescriptor();

        if (detection) {
          setDetectedFace(detection.descriptor);
          setScanStatus('Face detected. Ready to capture!');
          setScanError('');
        } else {
          setDetectedFace(null);
          setScanStatus('Align your face in the camera view.');
        }
      } catch (err) {
        console.error('Face detection run error:', err);
      }
    }, 400); // Check 2.5 times a second
  };

  const handleCaptureFace = async () => {
    if (!detectedFace || isCapturing) return;
    setIsCapturing(true);
    setScanStatus('Saving biometric signature...');

    const descriptorArray = Array.from(detectedFace);
    const endpoint = pendingAction === 'register' ? '/api/auth/face/register' : '/api/auth/face/update';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password: verifyPassword,
          descriptor: descriptorArray
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Biometric matching failed');

      setSuccess(data.message);
      stopCamera();
      fetchFaceSettings();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setScanError(err.message);
      setIsCapturing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
        <p className="text-xs text-customText-muted">Loading face configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold rounded-xl">
          ✅ {success}
        </div>
      )}

      {/* Main settings container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Status and Control panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/40 space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-customText dark:text-customText-dark">
                Face Biometrics Config
              </h3>
              <p className="text-xs text-customText-muted dark:text-customText-mutedDark mt-0.5">
                Set up face verification as your secure login method
              </p>
            </div>

            {/* Status card */}
            <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-800/40 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                  Biometrics Status
                </span>
                {settings?.hasFaceDescriptor ? (
                  <span className="text-[10px] font-extrabold uppercase bg-green-500/10 border border-green-500/20 text-green-600 px-2 py-0.5 rounded">
                    Registered
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold uppercase bg-amber-500/10 border border-amber-500/20 text-amber-600 px-2 py-0.5 rounded">
                    Not Setup
                  </span>
                )}
              </div>

              {/* Toggler */}
              <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800/50 pt-3">
                <span className="text-xs font-bold text-customText">
                  Enable Face Sign-In
                </span>
                <button
                  type="button"
                  disabled={!settings?.hasFaceDescriptor}
                  onClick={() => handleToggleFaceAuth(!settings?.faceAuthEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings?.faceAuthEnabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                  } ${!settings?.hasFaceDescriptor ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings?.faceAuthEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Actions panel */}
            <div className="space-y-3">
              {!settings?.hasFaceDescriptor ? (
                <button
                  onClick={() => triggerVerify('register')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow transition-all active:scale-[0.98]"
                >
                  <Camera size={16} />
                  <span>Register My Face</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => triggerVerify('update')}
                    disabled={settings?.remainingChanges === 0}
                    className={`w-full flex items-center justify-center gap-2 py-3 border text-xs font-bold rounded-xl transition-all active:scale-[0.98] ${
                      settings?.remainingChanges === 0
                        ? 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : 'border-primary/20 hover:bg-primary/5 text-primary'
                    }`}
                  >
                    <RefreshCw size={16} />
                    <span>Update My Face</span>
                  </button>
                  <button
                    onClick={() => triggerVerify('remove')}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-red-500/20 hover:bg-red-500/5 text-red-500 text-xs font-bold rounded-xl transition-all active:scale-[0.98]"
                  >
                    <Trash2 size={16} />
                    <span>Remove My Face</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Policy Information Box */}
          <div className="glass-card p-5 border border-slate-200/50 dark:border-slate-800/40 space-y-3 bg-blue-500/5 border-blue-500/10 text-xs">
            <h4 className="font-bold text-customText flex items-center gap-1.5">
              <Info size={14} className="text-primary-dark" />
              <span>Face Authentication Policy</span>
            </h4>
            <ul className="space-y-2 text-customText-muted dark:text-customText-mutedDark leading-relaxed pl-1.5 list-disc list-inside">
              <li>First biometric setup is completely <span className="font-bold text-primary">FREE</span>.</li>
              <li>Updates are limited to <span className="font-bold text-primary">3 updates</span> per calendar month.</li>
              <li>Removal does not consume updates and resets setup.</li>
              <li>We never save photos. Only a cryptographic key is stored.</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Camera setup or Face profile information */}
        <div className="lg:col-span-2 space-y-6">
          {cameraActive ? (
            /* Webcam Interface */
            <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/40 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-base text-customText">Face Registration Scanner</h3>
                  <p className="text-xs text-customText-muted mt-0.5">Please look straight into your webcam</p>
                </div>
                <button 
                  onClick={stopCamera}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status display banner */}
              {scanError ? (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <AlertTriangle size={14} />
                  <span>{scanError}</span>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-200/40 text-customText-muted text-xs font-medium rounded-xl flex items-center gap-2">
                  {loadingModels ? (
                    <span className="animate-spin rounded-full h-3 w-3 border-2 border-primary border-t-transparent shrink-0"></span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                  )}
                  <span>{scanStatus}</span>
                </div>
              )}

              {/* Camera view container */}
              <div className="relative aspect-video max-w-xl mx-auto rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                
                {/* Circular face target overlay */}
                <div className="absolute inset-0 border-[3px] border-dashed border-white/20 rounded-2xl pointer-events-none flex items-center justify-center">
                  <div className={`w-64 h-64 rounded-full border-2 transition-colors duration-300 ${detectedFace ? 'border-green-500 bg-green-500/5' : 'border-white/30 bg-white/5'}`} />
                </div>
              </div>

              {/* Capture Action button */}
              <div className="flex justify-center gap-3 pt-3 border-t">
                <button
                  onClick={stopCamera}
                  className="btn-secondary text-xs px-5 py-2.5"
                  disabled={isCapturing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCaptureFace}
                  disabled={!detectedFace || isCapturing}
                  className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2 shadow"
                >
                  {isCapturing ? (
                    <>
                      <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></span>
                      <span>Saving biometrics...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Capture & Save Face</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Face settings & limits status & Audit logs */
            <div className="space-y-6">
              
              {/* Limit status layout */}
              <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/40 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-extrabold text-sm text-customText dark:text-customText-dark uppercase tracking-wider mb-4">
                    Biometric limits
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-customText-muted dark:text-customText-mutedDark">
                        Remaining changes this month
                      </span>
                      <span className="text-sm font-extrabold text-customText">
                        {settings?.remainingChanges} / 3
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${settings?.remainingChanges === 0 ? 'bg-red-500' : 'bg-primary'}`}
                        style={{ width: `${(settings?.remainingChanges / 3) * 100}%` }}
                      />
                    </div>

                    {settings?.remainingChanges === 0 && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl leading-relaxed">
                        ⚠️ Maximum monthly face update limit reached. You can update your face again next month.
                      </div>
                    )}
                  </div>
                </div>

                {/* Audit date information */}
                <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-200/50 dark:border-slate-800/40 pt-4 md:pt-0 md:pl-6">
                  <h3 className="font-extrabold text-sm text-customText dark:text-customText-dark uppercase tracking-wider mb-4">
                    Timestamp records
                  </h3>
                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-customText-muted dark:text-customText-mutedDark font-medium flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        <span>Registered Date</span>
                      </span>
                      <span className="font-bold text-customText">
                        {settings?.faceRegisteredAt ? new Date(settings.faceRegisteredAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-customText-muted dark:text-customText-mutedDark font-medium flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" />
                        <span>Last Updated Date</span>
                      </span>
                      <span className="font-bold text-customText">
                        {settings?.faceUpdatedAt ? new Date(settings.faceUpdatedAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Logs Table */}
              <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/40">
                <h3 className="font-extrabold text-sm text-customText dark:text-customText-dark uppercase tracking-wider mb-4">
                  Biometric Audit Logs
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs leading-normal">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-customText-muted dark:text-customText-mutedDark font-bold uppercase tracking-wider">
                        <th className="pb-3 pl-1">Action</th>
                        <th className="pb-3">Details</th>
                        <th className="pb-3">IP Address</th>
                        <th className="pb-3 text-right pr-1">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                      {settings?.auditLogs?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-6 text-customText-muted dark:text-customText-mutedDark">
                            No biometric operations logged.
                          </td>
                        </tr>
                      ) : (
                        settings?.auditLogs?.map((log) => (
                          <tr key={log.id} className="text-customText dark:text-customText-dark font-medium">
                            <td className="py-3 pl-1">
                              <span className={`inline-block px-2 py-0.5 rounded-[6px] text-[10px] font-extrabold uppercase ${
                                log.action === 'REGISTRATION' || log.action === 'LOGIN_SUCCESS'
                                  ? 'bg-green-500/10 text-green-600'
                                  : log.action === 'REMOVAL' || log.action === 'LOGIN_FAILURE'
                                    ? 'bg-red-500/10 text-red-500'
                                    : 'bg-blue-500/10 text-blue-500'
                              }`}>
                                {log.action}
                              </span>
                            </td>
                            <td className="py-3 text-customText-muted dark:text-customText-mutedDark max-w-[200px] truncate" title={log.details}>
                              {log.details}
                            </td>
                            <td className="py-3 text-slate-400 dark:text-slate-500">
                              {log.ipAddress}
                            </td>
                            <td className="py-3 text-right text-slate-500 pr-1">
                              {new Date(log.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Security Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowVerifyModal(false)} />
          
          <form 
            onSubmit={handleVerifySubmit}
            className="relative glass-card bg-white dark:bg-slate-900 border border-white/60 w-full max-w-sm p-6 shadow-2xl animate-fade-in z-10 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-extrabold text-base text-customText dark:text-customText-dark flex items-center gap-1.5">
                <KeyRound size={18} className="text-primary-dark" />
                <span>Security Verification</span>
              </h3>
              <button 
                type="button"
                onClick={() => setShowVerifyModal(false)} 
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-customText-muted leading-relaxed">
              Please verify your account password before proceeding with this biometric modification.
            </p>

            {verifyError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl">
                ⚠️ {verifyError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-1.5">
                Account Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-customText-muted dark:text-customText-mutedDark">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  required
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="glass-input pl-9 text-xs"
                  disabled={verifySubmitting}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button 
                type="button" 
                onClick={() => setShowVerifyModal(false)} 
                className="btn-secondary text-xs px-4 py-2"
                disabled={verifySubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary text-xs px-4 py-2"
                disabled={verifySubmitting}
              >
                {verifySubmitting ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default FaceSettings;
