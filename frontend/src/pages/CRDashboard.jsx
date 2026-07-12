import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  Users, 
  CalendarDays,
  UserCheck,
  UserX,
  PlusCircle,
  TrendingUp,
  Save
} from 'lucide-react';
import Loading from '../components/Loading';

const CRDashboard = () => {
  const { token, user } = useAuth();
  const { socket } = useSocket();

  // Tab state: 'faculty' or 'students'
  const [activeTab, setActiveTab] = useState('faculty');

  // Faculty Schedule States
  const [classroom, setClassroom] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [scheduleError, setScheduleError] = useState('');
  const [isHoliday, setIsHoliday] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Student Attendance States
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // studentId -> 'Present' | 'Absent' | 'Late'
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentError, setStudentError] = useState('');
  const [studentSuccess, setStudentSuccess] = useState('');
  const [savingAttendance, setSavingAttendance] = useState(false);
  const [lateComerStudentId, setLateComerStudentId] = useState('');

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDateString();

  // 1. Fetch Faculty Schedule
  const fetchSchedule = async () => {
    try {
      const res = await fetch('/api/timetables/cr/schedule', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403 && data.message && data.message.includes('Holiday')) {
          setIsHoliday(true);
        }
        throw new Error(data.message || 'Failed to fetch schedule');
      }
      setIsHoliday(false);
      setClassroom(data.classroom);
      setSchedule(data.schedule);
      setScheduleError('');
    } catch (err) {
      setScheduleError(err.message);
    } finally {
      setLoadingSchedule(false);
    }
  };

  // 2. Fetch Students and existing attendance
  const fetchStudentsAndAttendance = async () => {
    try {
      setLoadingStudents(true);
      setStudentError('');

      // Fetch all students in CR's class
      const studRes = await fetch('/api/student-attendance/students', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const studData = await studRes.json();
      if (!studRes.ok) {
        throw new Error(studData.message || 'Failed to fetch student registry');
      }

      setStudents(studData);

      // Fetch today's absentees/late comers to pre-populate attendance map
      const className = user?.className || '';
      const absRes = await fetch(`/api/student-attendance/absentees?section=${encodeURIComponent(className)}&date=${todayDate}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const absData = await absRes.json();
      
      const newMap = {};
      // Default all to Present
      studData.forEach(s => {
        newMap[s.id] = 'Present';
      });
      
      // Override with Absent or Late from absRes
      if (absRes.ok && Array.isArray(absData)) {
        absData.forEach(abs => {
          if (newMap[abs.id] !== undefined) {
            newMap[abs.id] = abs.status;
          }
        });
      }

      setAttendanceMap(newMap);
    } catch (err) {
      setStudentError(err.message || 'Failed to load students attendance states');
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
    fetchStudentsAndAttendance();

    // Poll schedule
    const pollInterval = setInterval(() => {
      fetchSchedule();
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [token]);

  // Client-side timetable active status evaluation
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

  // WebSockets sync for schedule updates
  useEffect(() => {
    if (!socket) return;

    socket.on('tracking_status_update', (data) => {
      fetchSchedule();
    });

    socket.on('classroom_status_update', (data) => {
      if (data.cleared || (classroom && data.classroomId === classroom.id)) {
        fetchSchedule();
      }
    });

    return () => {
      socket.off('tracking_status_update');
      socket.off('classroom_status_update');
    };
  }, [socket, classroom]);

  // Faculty Mark Present handlers
  const handleMarkPresentClick = (period) => {
    setSelectedPeriod(period);
    setShowConfirmModal(true);
  };

  const confirmMarkPresent = async () => {
    if (!selectedPeriod || !classroom) return;
    setSubmitting(true);
    setScheduleError('');

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

      setShowConfirmModal(false);
      setSelectedPeriod(null);
      fetchSchedule();
    } catch (err) {
      setScheduleError(err.message);
      setShowConfirmModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Student Attendance handlers
  const handleAllPresent = () => {
    const newMap = { ...attendanceMap };
    students.forEach(s => {
      newMap[s.id] = 'Present';
    });
    setAttendanceMap(newMap);
    setStudentSuccess('Set all students to Present. (Click Submit to save changes)');
  };

  const handleAllAbsent = () => {
    const newMap = { ...attendanceMap };
    students.forEach(s => {
      newMap[s.id] = 'Absent';
    });
    setAttendanceMap(newMap);
    setStudentSuccess('Set all students to Absent. (Click Submit to save changes)');
  };

  const toggleStudentStatus = (studentId) => {
    const current = attendanceMap[studentId] || 'Present';
    const next = (current === 'Present') ? 'Absent' : 'Present';
    
    setAttendanceMap({
      ...attendanceMap,
      [studentId]: next
    });
    setStudentSuccess('');
  };

  const handleMarkLateComer = async (e) => {
    e.preventDefault();
    if (!lateComerStudentId) return;

    try {
      setStudentError('');
      setStudentSuccess('');
      const res = await fetch('/api/student-attendance/late-comer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: lateComerStudentId,
          date: todayDate
        })
      });
      const data = await res.json();
      if (res.ok) {
        setStudentSuccess(`Marked ${students.find(s => s.id === Number(lateComerStudentId))?.name} as Late.`);
        // Update local map to Late
        setAttendanceMap({
          ...attendanceMap,
          [lateComerStudentId]: 'Late'
        });
        setLateComerStudentId('');
      } else {
        setStudentError(data.message || 'Failed to mark late comer');
      }
    } catch (err) {
      setStudentError('Error submitting late comer attendance');
    }
  };

  const handleSaveAttendance = async () => {
    setSavingAttendance(true);
    setStudentError('');
    setStudentSuccess('');

    const attendanceData = Object.entries(attendanceMap).map(([id, status]) => ({
      studentId: Number(id),
      status
    }));

    try {
      const res = await fetch('/api/student-attendance/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          section: user?.className,
          date: todayDate,
          attendanceData
        })
      });

      const data = await res.json();
      if (res.ok) {
        setStudentSuccess('Student attendance registry updated successfully!');
        fetchStudentsAndAttendance(); // Reload
      } else {
        setStudentError(data.message || 'Failed to save student attendance');
      }
    } catch (err) {
      setStudentError('Network error saving student attendance');
    } finally {
      setSavingAttendance(false);
    }
  };

  if (loadingSchedule && loadingStudents) {
    return <Loading />;
  }

  if (isHoliday) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-lg mx-auto animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-650 flex items-center justify-center shadow-lg border border-purple-250 dark:border-purple-800 animate-bounce" style={{ animationDuration: '3s' }}>
          <Clock size={44} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-customText dark:text-customText-dark tracking-tight">College is on Holiday</h1>
          <p className="text-sm text-customText-muted dark:text-customText-mutedDark">
            Attendance tracking has been globally disabled by the administration.
          </p>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-450 text-xs font-semibold rounded-2xl w-full">
          🌴 No class schedule or tracking activities are active at this time. Enjoy your holiday!
        </div>
      </div>
    );
  }

  const activePeriod = schedule.find((p) => p.status === 'Active')
    || [...schedule].reverse().find((p) => p.status === 'Present');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary-dark/20 dark:to-secondary-dark/20 p-6 rounded-2xl border border-primary/20 dark:border-primary-dark/30">
        <div>
          <span className="text-xs font-bold text-primary-dark dark:text-primary uppercase tracking-wider">
            {classroom?.roomNumber || 'Room No'}
          </span>
          <h2 className="text-2xl font-bold text-customText dark:text-customText-dark mt-0.5">
            {classroom?.className || user?.className} Portal
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

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('faculty')}
          className={`flex items-center gap-2 py-3 px-6 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'faculty' 
              ? 'border-primary text-primary-dark dark:text-primary font-bold' 
              : 'border-transparent text-customText-muted dark:text-customText-mutedDark hover:text-customText'
          }`}
        >
          <CalendarDays size={16} />
          <span>Faculty Timetable</span>
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 py-3 px-6 text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'students' 
              ? 'border-primary text-primary-dark dark:text-primary font-bold' 
              : 'border-transparent text-customText-muted dark:text-customText-mutedDark hover:text-customText'
          }`}
        >
          <Users size={16} />
          <span>Student Attendance</span>
        </button>
      </div>

      {/* TAB 1: FACULTY TIMETABLE */}
      {activeTab === 'faculty' && (
        <div className="space-y-6">
          {scheduleError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl animate-shake">
              ⚠️ {scheduleError}
            </div>
          )}

          {/* Active Period Card */}
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
                  <div className="space-y-1 mt-2">
                    <p className="text-sm font-bold text-customText dark:text-customText-dark">
                      Subject: {activePeriod.subjectName}
                    </p>
                    <p className="text-xs text-customText-muted dark:text-customText-mutedDark">
                      Faculty: {activePeriod.facultyName}
                    </p>
                    <p className="text-xs text-customText-muted dark:text-customText-mutedDark flex items-center gap-1.5 mt-1">
                      <Clock size={14} />
                      <span>{activePeriod.startTime} - {activePeriod.endTime}</span>
                    </p>
                  </div>
                </div>

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

          {/* Today Timeline List */}
          <section className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/45">
            <h3 className="font-bold text-sm text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-4">
              Today's Timeline Schedule
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                    <th className="pb-3 pr-2">Period</th>
                    <th className="pb-3">Subject & Faculty</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {schedule.map((period) => {
                    const isActive = period.status === 'Active';
                    const isPresent = period.status === 'Present';
                    const isNotEntered = period.status === 'Not Entered';
                    
                    let statusBadge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <Clock size={12} />
                        <span>Future</span>
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
                        <td className="py-3.5">
                          <p className="font-bold text-customText dark:text-customText-dark text-xs">{period.subjectName}</p>
                          <p className="text-[10px] text-customText-muted dark:text-customText-mutedDark">{period.facultyName}</p>
                        </td>
                        <td className="py-3.5 text-customText-muted dark:text-customText-mutedDark font-medium text-xs">
                          {period.startTime} - {period.endTime}
                        </td>
                        <td className="py-3.5 text-right">
                          {statusBadge}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: STUDENT ATTENDANCE */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          
          {studentError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl">
              ⚠️ {studentError}
            </div>
          )}

          {studentSuccess && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold rounded-xl">
              ✓ {studentSuccess}
            </div>
          )}

          {/* Quick Actions & Late Comer Selector */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 dark:bg-slate-800/10 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
            {/* Quick Bulk Presences */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider block mr-2">
                Quick Mark:
              </span>
              <button
                onClick={handleAllPresent}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 hover:border-emerald-500/35 rounded-xl text-xs font-bold transition-all"
              >
                <UserCheck size={14} />
                <span>All Present</span>
              </button>
              <button
                onClick={handleAllAbsent}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/10 hover:border-red-500/35 rounded-xl text-xs font-bold transition-all"
              >
                <UserX size={14} />
                <span>All Absent</span>
              </button>
            </div>

            {/* Late Comer Action Form */}
            <form onSubmit={handleMarkLateComer} className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={lateComerStudentId}
                onChange={(e) => setLateComerStudentId(e.target.value)}
                className="glass-input text-xs py-2 pr-8"
                required
              >
                <option value="">-- Select Late Comer --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rollNumber})
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="flex items-center gap-1 py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/10 active:scale-[0.98] transition-all"
              >
                <PlusCircle size={14} />
                <span>Mark Late</span>
              </button>
            </form>
          </div>

          {/* Election Cards Grid */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                Student Enrollment Cards ({students.length})
              </h3>
              <p className="text-[10px] text-customText-muted dark:text-customText-mutedDark font-semibold">
                Click any student card to toggle between Present & Absent status.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {students.map((s) => {
                const status = attendanceMap[s.id] || 'Present';
                
                // Styling classes based on status
                let statusClasses = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary';
                let indicator = <span className="text-[9px] bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Present</span>;
                
                if (status === 'Absent') {
                  statusClasses = 'border-red-500 bg-red-500/5 hover:bg-red-500/10 shadow-red-500/5 dark:bg-red-950/20';
                  indicator = <span className="text-[9px] bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Absent</span>;
                } else if (status === 'Late') {
                  statusClasses = 'border-amber-500 bg-amber-500/5 hover:bg-amber-500/10 shadow-amber-500/5 dark:bg-amber-950/20';
                  indicator = <span className="text-[9px] bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Late</span>;
                }

                return (
                  <div
                    key={s.id}
                    onClick={() => toggleStudentStatus(s.id)}
                    className={`flex flex-col justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 active:scale-[0.97] h-28 shadow-sm ${statusClasses}`}
                  >
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-customText-muted dark:text-customText-mutedDark font-bold uppercase tracking-wider">
                        {s.rollNumber}
                      </span>
                      <h4 className="text-xs font-bold text-customText dark:text-customText-dark line-clamp-2 leading-tight">
                        {s.name}
                      </h4>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      {indicator}
                    </div>
                  </div>
                );
              })}

              {students.length === 0 && (
                <div className="col-span-full py-12 text-center text-sm text-customText-muted dark:text-customText-mutedDark bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed">
                  No students registered for section {user?.className}. Please ask HOD to add students.
                </div>
              )}
            </div>
          </section>

          {/* Submit Attendance */}
          {students.length > 0 && (
            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleSaveAttendance}
                disabled={savingAttendance}
                className="flex items-center justify-center gap-2 btn-primary px-8 py-3.5 bg-gradient-to-r from-primary-dark to-primary text-white font-extrabold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <Save size={18} />
                <span>{savingAttendance ? 'Submitting Attendance...' : 'Submit Attendance Registry'}</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* TIMETABLE CONFIRMATION MODAL */}
      {showConfirmModal && selectedPeriod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)} />
          
          <div className="relative glass-card border border-white/60 w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl animate-fade-in z-10">
            <h3 className="font-extrabold text-lg text-customText dark:text-customText-dark mb-2">
              Confirm Period Presence
            </h3>
            
            <div className="py-3 px-4 bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 rounded-xl space-y-1 mb-4">
              <p className="text-xs text-customText-muted dark:text-customText-mutedDark font-bold uppercase tracking-wider">
                Period {selectedPeriod.periodNo} ({selectedPeriod.startTime} - {selectedPeriod.endTime})
              </p>
            </div>

            <p className="text-sm text-customText-muted dark:text-customText-mutedDark mb-6">
              Are you sure you want to log presence for this period? This entry log is recorded immediately and updates the HOD Dashboard in real-time.
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
