import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Clock, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';
import Loading from '../components/Loading';

const CRDashboard = () => {
  const { token, user } = useAuth();
  const { socket } = useSocket();

  const [classroom, setClassroom] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal tracking
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchSchedule = async () => {
    try {
      const res = await fetch('/api/timetables/cr/schedule', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch schedule');
      }
      setClassroom(data.classroom);
      setSchedule(data.schedule);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();

    // Re-fetch from server every 5 seconds so period transitions are picked up immediately
    const pollInterval = setInterval(() => {
      fetchSchedule();
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [token]);

  // Client-side timer: re-evaluate active period every 5 seconds based on current time
  // This ensures the button appears immediately when the clock crosses a period boundary
  useEffect(() => {
    const tick = setInterval(() => {
      setSchedule((prev) => {
        if (!prev || prev.length === 0) return prev;

        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        });
        const parts = formatter.formatToParts(now);
        const partMap = {};
        parts.forEach(p => {
          partMap[p.type] = p.value;
        });
        const currentTime = `${partMap.hour}:${partMap.minute}`;

        return prev.map((period) => {
          // Don't override server-confirmed statuses (Present, Not Entered)
          if (period.status === 'Present' || period.status === 'Not Entered') {
            return period;
          }

          const isActive = period.startTime <= currentTime && currentTime < period.endTime;
          const isPast = period.endTime <= currentTime;

          let newStatus = 'Future';
          if (isActive) newStatus = 'Active';
          else if (isPast) newStatus = 'Not Entered';

          if (newStatus !== period.status) {
            return { ...period, status: newStatus };
          }
          return period;
        });
      });
    }, 5000);

    return () => clearInterval(tick);
  }, []);

  // Listen to socket status updates to refresh the list live if auto-status cron or external changes trigger
  useEffect(() => {
    if (!socket) return;

    socket.on('classroom_status_update', (data) => {
      // If the update is for this classroom, refresh schedule list
      if (classroom && data.classroomId === classroom.id) {
        fetchSchedule();
      }
    });

    return () => {
      socket.off('classroom_status_update');
    };
  }, [socket, classroom]);

  // Handle confirmation popup trigger
  const handleMarkPresentClick = (period) => {
    setSelectedPeriod(period);
    setShowConfirmModal(true);
  };

  const confirmMarkPresent = async () => {
    if (!selectedPeriod || !classroom) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          classroomId: classroom.id,
          periodNo: selectedPeriod.periodNo,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to log presence');
      }

      // Close modal and refresh schedule locally (the backend also broadcasts)
      setShowConfirmModal(false);
      setSelectedPeriod(null);
      fetchSchedule();
    } catch (err) {
      setError(err.message);
      setShowConfirmModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // Identify the currently active period — prioritize 'Active' (needs CR action)
  // over 'Present' (already confirmed) so the new button always appears
  const activePeriod = schedule.find((p) => p.status === 'Active')
    || [...schedule].reverse().find((p) => p.status === 'Present');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary-dark/20 dark:to-secondary-dark/20 p-6 rounded-2xl border border-primary/20 dark:border-primary-dark/30">
        <div>
          <span className="text-xs font-bold text-primary-dark dark:text-primary uppercase tracking-wider">
            {classroom?.roomNumber}
          </span>
          <h2 className="text-2xl font-bold text-customText dark:text-customText-dark mt-0.5">
            {classroom?.className} Attendance Board
          </h2>
          <p className="text-sm text-customText-muted dark:text-customText-mutedDark">
            Logged in as Class Representative: <span className="font-semibold">{user?.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/60 dark:bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-xs font-semibold">
          <Sparkles size={14} className="text-yellow-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Real-time Enabled</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl animate-shake">
          ⚠️ {error}
        </div>
      )}

      {/* active period dashboard panel */}
      <section className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/45">
        <h3 className="font-bold text-sm text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-4">
          Current Active Period
        </h3>

        {activePeriod ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-customText font-bold px-2.5 py-1 rounded-md border border-slate-200/40 dark:border-slate-700/40 inline-block">
                Period {activePeriod.periodNo}
              </span>
              <h4 className="text-xl font-extrabold text-customText dark:text-customText-dark">
                {activePeriod.subjectName}
              </h4>
              <div className="space-y-1">
                <p className="text-sm text-customText-muted dark:text-customText-mutedDark flex items-center gap-1.5">
                  <span className="font-semibold">Faculty:</span> {activePeriod.facultyName}
                </p>
                <p className="text-sm text-customText-muted dark:text-customText-mutedDark flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{activePeriod.startTime} - {activePeriod.endTime}</span>
                </p>
              </div>
            </div>

            {/* Attendance Marking Trigger Buttons */}
            <div className="flex flex-col items-center md:items-end justify-center">
              <span className="text-xs text-customText-muted dark:text-customText-mutedDark font-semibold mb-2 block">
                Faculty Entered?
              </span>

              {activePeriod.status === 'Active' ? (
                <button
                  onClick={() => handleMarkPresentClick(activePeriod)}
                  className="w-full sm:w-64 py-4 px-6 rounded-2xl bg-warning hover:bg-warning-dark text-slate-800 font-extrabold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.98] border-b-4 border-yellow-600/50"
                >
                  Faculty Entered
                </button>
              ) : (
                <div className="w-full sm:w-64 py-4 px-6 rounded-2xl bg-success/20 dark:bg-success-dark/10 border-2 border-success text-green-600 dark:text-green-400 font-extrabold text-lg flex items-center justify-center gap-2">
                  <CheckCircle2 size={24} />
                  <span>Faculty Present</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-customText-muted dark:text-customText-mutedDark">
            No class is currently active according to the timetable.
          </div>
        )}
      </section>

      {/* TODAY'S FULL TIMETABLE LIST */}
      <section className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/45">
        <h3 className="font-bold text-sm text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-4">
          Today's Timeline Schedule
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                <th className="pb-3 pr-2">Period</th>
                <th className="pb-3">Time</th>
                <th className="pb-3">Subject</th>
                <th className="pb-3">Faculty</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              {schedule.map((period) => {
                const isActive = period.status === 'Active';
                const isPresent = period.status === 'Present';
                const isNotEntered = period.status === 'Not Entered';
                
                // Color codes
                let statusBadge = (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <Clock size={12} />
                    <span>Gray/Disabled</span>
                  </span>
                );

                if (isActive) {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-warning/20 text-yellow-600 border border-warning/20 animate-pulse">
                      <AlertCircle size={12} />
                      <span>Active</span>
                    </span>
                  );
                } else if (isPresent) {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/10">
                      <CheckCircle2 size={12} />
                      <span>Present</span>
                    </span>
                  );
                } else if (isNotEntered) {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/10">
                      <XCircle size={12} />
                      <span>Not Entered</span>
                    </span>
                  );
                }

                return (
                  <tr 
                    key={period.id} 
                    className={`transition-colors ${
                      isActive ? 'bg-primary/5 dark:bg-primary-dark/10 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 pr-2">
                      <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-customText-muted dark:text-customText-mutedDark'
                      }`}>
                        {period.periodNo}
                      </span>
                    </td>
                    <td className="py-3.5 text-customText-muted dark:text-customText-mutedDark font-medium">
                      {period.startTime} - {period.endTime}
                    </td>
                    <td className="py-3.5 text-customText dark:text-customText-dark">
                      {period.subjectName}
                    </td>
                    <td className="py-3.5 text-customText-muted dark:text-customText-mutedDark">
                      {period.facultyName}
                    </td>
                    <td className="py-3.5 text-right">
                      {statusBadge}
                    </td>
                  </tr>
                );
              })}
              {schedule.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-customText-muted dark:text-customText-mutedDark">
                    No periods scheduled for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* CONFIRMATION POPUP MODAL */}
      {showConfirmModal && selectedPeriod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)} />
          
          <div className="relative glass-card border border-white/60 w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl animate-fade-in z-10">
            <h3 className="font-extrabold text-lg text-customText dark:text-customText-dark mb-2">
              Confirm Faculty Entry
            </h3>
            
            <div className="py-3 px-4 bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 rounded-xl space-y-1 mb-4">
              <p className="text-xs text-customText-muted dark:text-customText-mutedDark font-bold uppercase tracking-wider">
                Period {selectedPeriod.periodNo} ({selectedPeriod.startTime} - {selectedPeriod.endTime})
              </p>
              <h4 className="font-bold text-customText dark:text-customText-dark">
                {selectedPeriod.subjectName}
              </h4>
              <p className="text-sm text-customText-muted dark:text-customText-mutedDark">
                Faculty: <span className="font-semibold text-customText dark:text-customText-dark">{selectedPeriod.facultyName}</span>
              </p>
            </div>

            <p className="text-sm text-customText-muted dark:text-customText-mutedDark mb-6">
              Are you sure you want to mark this faculty member as present? This entry log is recorded immediately and updates the HOD Dashboard in real-time.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn-secondary px-5"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={confirmMarkPresent}
                className="btn-primary px-5 bg-gradient-to-r from-success to-success-dark hover:from-success-dark hover:to-success"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Yes, Confirm Present'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CRDashboard;
