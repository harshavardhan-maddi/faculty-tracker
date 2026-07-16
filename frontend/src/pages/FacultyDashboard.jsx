import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Calendar,
  AlertCircle,
  PhoneCall,
  X,
  Save,
  UserCheck,
  UserX,
  ChevronDown,
  FileText,
  History
} from 'lucide-react';
import Loading from '../components/Loading';

const FacultyDashboard = () => {
  const { token, user } = useAuth();

  // Navigation & Dropdown States
  const [classrooms, setClassrooms] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance' or 'calls'
  
  // Data States
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // studentId -> 'Present' | 'Absent' | 'Late'
  const [absentees, setAbsentees] = useState([]); // Today's absentees fetched from DB
  
  // Loading & Feedback States
  const [loadingClassrooms, setLoadingClassrooms] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingAbsentees, setLoadingAbsentees] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [savingAttendance, setSavingAttendance] = useState(false);

  // Call Log Modal States
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [answeredCall, setAnsweredCall] = useState(true); // default to Yes (true)
  const [callRemark, setCallRemark] = useState('');
  const [savingCallLog, setSavingCallLog] = useState(false);
  const [callHistory, setCallHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState('');

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDateString();

  // 1. Fetch all classrooms on mount
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setLoadingClassrooms(true);
        setError('');
        const res = await fetch('/api/classrooms', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setClassrooms(data);
          if (data.length > 0) {
            setSelectedSection(data[0].className);
          }
        } else {
          setError(data.message || 'Failed to fetch classrooms.');
        }
      } catch (err) {
        setError('Failed to connect to backend server.');
      } finally {
        setLoadingClassrooms(false);
      }
    };

    fetchClassrooms();
  }, [token]);

  // 2. Fetch students and today's attendance for the selected classroom
  const loadClassroomData = async () => {
    if (!selectedSection) return;
    try {
      setLoadingStudents(true);
      setError('');
      setSuccess('');

      // Fetch students in this section
      const studRes = await fetch(`/api/student-attendance/students?section=${encodeURIComponent(selectedSection)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const studData = await studRes.json();
      if (!studRes.ok) {
        throw new Error(studData.message || 'Failed to fetch students.');
      }

      setStudents(studData);

      // Fetch today's absentees to populate current attendance
      const absRes = await fetch(`/api/student-attendance/absentees?section=${encodeURIComponent(selectedSection)}&date=${todayDate}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const absData = await absRes.json();
      
      const newMap = {};
      // Default all to Present
      studData.forEach(s => {
        newMap[s.id] = 'Present';
      });

      // Override from database records if they are Absent or Late
      if (absRes.ok && Array.isArray(absData)) {
        setAbsentees(absData);
        absData.forEach(abs => {
          if (newMap[abs.id] !== undefined) {
            newMap[abs.id] = abs.status;
          }
        });
      } else {
        setAbsentees([]);
      }

      setAttendanceMap(newMap);
    } catch (err) {
      setError(err.message || 'Failed to load classroom details.');
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    loadClassroomData();
  }, [selectedSection, token]);

  // Reload absentees when switching to calls tab or after submission
  const loadAbsenteesOnly = async () => {
    if (!selectedSection) return;
    try {
      setLoadingAbsentees(true);
      const absRes = await fetch(`/api/student-attendance/absentees?section=${encodeURIComponent(selectedSection)}&date=${todayDate}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const absData = await absRes.json();
      if (absRes.ok && Array.isArray(absData)) {
        setAbsentees(absData);
      }
    } catch (err) {
      console.error('Failed to reload absentees:', err);
    } finally {
      setLoadingAbsentees(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'calls') {
      loadAbsenteesOnly();
    }
  }, [activeTab]);

  // Attendance Mutators
  const setSingleAttendance = (studentId, status) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
    setSuccess('');
  };

  const handleAllPresent = () => {
    const newMap = { ...attendanceMap };
    students.forEach(s => {
      newMap[s.id] = 'Present';
    });
    setAttendanceMap(newMap);
    setSuccess('All students set to Present. Remember to submit to save changes.');
  };

  const handleAllAbsent = () => {
    const newMap = { ...attendanceMap };
    students.forEach(s => {
      newMap[s.id] = 'Absent';
    });
    setAttendanceMap(newMap);
    setSuccess('All students set to Absent. Remember to submit to save changes.');
  };

  // Submit Bulk Attendance
  const handleSaveAttendance = async () => {
    setSavingAttendance(true);
    setError('');
    setSuccess('');

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
          section: selectedSection,
          date: todayDate,
          attendanceData
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Attendance registry submitted successfully.');
        loadAbsenteesOnly();
      } else {
        setError(data.message || 'Failed to submit attendance.');
      }
    } catch (err) {
      setError('Error connecting to attendance API.');
    } finally {
      setSavingAttendance(false);
    }
  };

  // Call History Loader
  const loadStudentCallHistory = async (studentId) => {
    setLoadingHistory(true);
    setHistoryError('');
    try {
      const res = await fetch(`/api/student-attendance/student/${studentId}/call-history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setCallHistory(data);
      } else {
        setHistoryError(data.message || 'Failed to load call history.');
      }
    } catch (err) {
      setHistoryError('Error fetching student logs.');
    } finally {
      setLoadingHistory(false);
    }
  };

  // Open Call Log Modal
  const openCallModal = (student) => {
    setSelectedStudent(student);
    setAnsweredCall(true);
    setCallRemark('');
    setCallHistory([]);
    loadStudentCallHistory(student.id);
  };

  // Submit Call Log
  const handleSaveCallLog = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    setSavingCallLog(true);
    setHistoryError('');

    try {
      const res = await fetch('/api/student-attendance/call-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          date: todayDate,
          answered: answeredCall,
          reason: callRemark
        })
      });

      const data = await res.json();
      if (res.ok) {
        setCallRemark('');
        // Reload history & update absentees log display
        loadStudentCallHistory(selectedStudent.id);
        loadAbsenteesOnly();
      } else {
        setHistoryError(data.message || 'Failed to submit call log.');
      }
    } catch (err) {
      setHistoryError('Error saving call log.');
    } finally {
      setSavingCallLog(false);
    }
  };

  if (loadingClassrooms) {
    return <Loading message="Loading classrooms..." />;
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/40 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark tracking-tight">
            Faculty Attendance Portal
          </h2>
          <p className="text-sm text-customText-muted dark:text-customText-mutedDark">
            Manage attendance lists, view absentees, and document communication logs.
          </p>
        </div>

        {/* Section Selector Dropdown */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <label className="text-xs font-bold uppercase tracking-wider text-customText-muted dark:text-customText-mutedDark whitespace-nowrap">
            Selected Section:
          </label>
          <div className="relative flex-1 md:flex-initial">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="glass-input pr-10 text-sm font-semibold py-2.5"
            >
              {classrooms.map((c) => (
                <option key={c.id} value={c.className}>
                  {c.className} ({c.roomNumber})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'attendance'
              ? 'border-primary text-primary dark:text-primary-dark'
              : 'border-transparent text-customText-muted dark:text-customText-mutedDark hover:text-customText dark:hover:text-customText-dark'
          }`}
        >
          <Users size={16} />
          <span>Attendance Registry</span>
        </button>
        <button
          onClick={() => setActiveTab('calls')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'calls'
              ? 'border-primary text-primary dark:text-primary-dark'
              : 'border-transparent text-customText-muted dark:text-customText-mutedDark hover:text-customText dark:hover:text-customText-dark'
          }`}
        >
          <PhoneCall size={16} />
          <span>Call Absentees</span>
          {absentees.length > 0 && (
            <span className="bg-red-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              {absentees.length}
            </span>
          )}
        </button>
      </div>

      {/* Feedback Alerts */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-450 text-sm font-semibold rounded-xl flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-450 text-sm font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-500" />
          <span>{success}</span>
        </div>
      )}

      {/* TAB 1: Attendance Registry */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {loadingStudents ? (
            <Loading message="Loading students..." />
          ) : (
            <>
              {/* Quick Actions Panel */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-800/10 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider block mr-2">
                    Quick Mark:
                  </span>
                  <button
                    onClick={handleAllPresent}
                    className="flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-440 border-emerald-500/10 hover:border-emerald-500/35"
                  >
                    <UserCheck size={14} />
                    <span>All Present</span>
                  </button>
                  <button
                    onClick={handleAllAbsent}
                    className="flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-440 border-red-500/10 hover:border-red-500/35"
                  >
                    <UserX size={14} />
                    <span>All Absent</span>
                  </button>
                </div>
                <p className="text-[10px] text-customText-muted dark:text-customText-mutedDark font-semibold">
                  Today's Date: {new Date(todayDate).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>

              {/* Student Cards Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                    Student Registry ({students.length} students)
                  </h3>
                  <p className="text-[10px] text-customText-muted dark:text-customText-mutedDark font-semibold">
                    Set Present (P), Absent (A), or Late (L) for each student.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {students.map((student) => {
                    const status = attendanceMap[student.id] || 'Present';

                    // Cards style overrides
                    let borderClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
                    if (status === 'Absent') borderClass = 'border-red-500 bg-red-500/5 dark:bg-red-950/20';
                    if (status === 'Late') borderClass = 'border-amber-500 bg-amber-500/5 dark:bg-amber-950/20';

                    return (
                      <div
                        key={student.id}
                        className={`flex flex-col justify-between p-4 rounded-2xl border-2 shadow-sm transition-all ${borderClass}`}
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-extrabold text-customText dark:text-customText-dark uppercase tracking-wide truncate">
                            {student.rollNumber}
                          </h4>
                          <p className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold truncate">
                            {student.name}
                          </p>
                        </div>

                        {/* Segmented P/A/L Buttons */}
                        <div className="flex items-center gap-1 mt-4 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                          <button
                            type="button"
                            onClick={() => setSingleAttendance(student.id, 'Present')}
                            className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all ${
                              status === 'Present'
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                            P
                          </button>
                          <button
                            type="button"
                            onClick={() => setSingleAttendance(student.id, 'Absent')}
                            className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all ${
                              status === 'Absent'
                                ? 'bg-red-500 text-white shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                            A
                          </button>
                          <button
                            type="button"
                            onClick={() => setSingleAttendance(student.id, 'Late')}
                            className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all ${
                              status === 'Late'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                          >
                            L
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {students.length === 0 && (
                    <div className="col-span-full py-16 text-center text-sm text-customText-muted dark:text-customText-mutedDark bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed">
                      No students registered for section "{selectedSection}". Please request HOD or Sub-Admin to import students.
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Action Block */}
              {students.length > 0 && (
                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={handleSaveAttendance}
                    disabled={savingAttendance}
                    className="flex items-center justify-center gap-2 btn-primary px-8 py-3.5 font-extrabold shadow-md hover:shadow-lg transition-all active:scale-[0.98] bg-gradient-to-r from-primary-dark to-primary text-white shadow-primary-dark/10"
                  >
                    <Save size={18} />
                    <span>{savingAttendance ? 'Submitting Attendance...' : 'Submit Attendance Registry'}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* TAB 2: Call Absentees */}
      {activeTab === 'calls' && (
        <div className="space-y-6">
          {loadingAbsentees ? (
            <Loading message="Loading absentees list..." />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                  Absentees & Late Comers Today ({absentees.length})
                </h3>
                <p className="text-[10px] text-customText-muted dark:text-customText-mutedDark font-semibold">
                  Click on any card to document remarks or review historical call logs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {absentees.map((abs) => {
                  const student = abs.student || abs;
                  const isLate = abs.status === 'Late';

                  // Call log indicator info
                  const logged = abs.callLog;
                  
                  let logStatusText = 'No call remark';
                  let logStatusStyle = 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
                  
                  if (logged) {
                    if (logged.isPreExcused) {
                      logStatusText = 'Pre-informed';
                      logStatusStyle = 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10';
                    } else if (logged.answered) {
                      logStatusText = 'Answered';
                      logStatusStyle = 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/10';
                    } else {
                      logStatusText = 'No Answer';
                      logStatusStyle = 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/10';
                    }
                  }

                  return (
                    <div
                      key={student.id}
                      onClick={() => openCallModal(student)}
                      className={`flex flex-col justify-between p-5 rounded-2xl border-2 hover:border-primary bg-white dark:bg-slate-900 shadow-sm cursor-pointer transition-all duration-200 active:scale-[0.98] relative overflow-hidden`}
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-extrabold text-customText dark:text-customText-dark uppercase tracking-wide truncate pr-2">
                            {student.rollNumber}
                          </h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isLate 
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' 
                              : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                          }`}>
                            {abs.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold truncate">
                          {student.name}
                        </p>
                      </div>

                      {/* Contact Details */}
                      <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 dark:text-slate-500">Student Contact:</span>
                          <span className="font-semibold text-customText dark:text-customText-dark">{student.studentMobile || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 dark:text-slate-500">Parent Contact:</span>
                          <span className="font-semibold text-customText dark:text-customText-dark">{student.parentMobile || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Call Log Badge */}
                      <div className="flex justify-between items-center mt-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${logStatusStyle}`}>
                          {logStatusText}
                        </span>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary-dark dark:text-primary transition-colors"
                          title="Call or Log remark"
                        >
                          <PhoneCall size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {absentees.length === 0 && (
                  <div className="col-span-full py-16 text-center text-sm text-customText-muted dark:text-customText-mutedDark bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed">
                    Zero absentees or late comers logged today. High attendance! 🎉
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ABSENTEE CALL DETAILS & LOGGING MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
          
          <div className="relative glass-card border border-white/60 w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl animate-fade-in z-10 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200/50 dark:border-slate-800/40">
              <div>
                <h3 className="font-extrabold text-base text-customText dark:text-customText-dark leading-tight uppercase">
                  Call Log Portal: {selectedStudent.name}
                </h3>
                <p className="text-xs text-customText-muted dark:text-customText-mutedDark font-medium mt-0.5">
                  Roll Number: <span className="font-bold">{selectedStudent.rollNumber}</span> | Section: <span className="font-bold">{selectedStudent.section}</span>
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedStudent(null)} 
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Quick Contacts Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/20 p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                <a
                  href={`tel:${selectedStudent.studentMobile}`}
                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border hover:border-primary active:scale-[0.99] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-primary" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Student Mobile</p>
                      <p className="text-xs font-bold text-customText dark:text-customText-dark">{selectedStudent.studentMobile || 'N/A'}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-primary font-bold">Call Student</span>
                </a>
                <a
                  href={`tel:${selectedStudent.parentMobile}`}
                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border hover:border-primary active:scale-[0.99] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-green-500" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Parent Mobile</p>
                      <p className="text-xs font-bold text-customText dark:text-customText-dark">{selectedStudent.parentMobile || 'N/A'}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-green-500 font-bold">Call Parent</span>
                </a>
              </div>

              {/* Record Call Log Form */}
              <form onSubmit={handleSaveCallLog} className="space-y-4">
                <h4 className="font-extrabold text-xs text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                  Record Call Outcome for Today
                </h4>
                
                {/* Answered Selector Toggle */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500">
                    Did the guardian / parent answer?
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAnsweredCall(true)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                        answeredCall
                          ? 'bg-green-500/10 border-green-500/35 text-green-600 dark:text-green-400'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100/50'
                      }`}
                    >
                      Answered (Call Connected)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnsweredCall(false)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                        !answeredCall
                          ? 'bg-red-500/10 border-red-500/35 text-red-600 dark:text-red-400'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100/50'
                      }`}
                    >
                      No Answer / Switched Off
                    </button>
                  </div>
                </div>

                {/* Remark Text area */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500">
                    Call Remarks / Reason for Absence
                  </label>
                  <textarea
                    required
                    value={callRemark}
                    onChange={(e) => setCallRemark(e.target.value)}
                    placeholder="Enter reason e.g., Medical leave, attending wedding, out of station..."
                    className="glass-input text-sm py-2 px-3 h-20 resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingCallLog}
                    className="btn-primary py-2 px-5 text-xs font-bold shadow-md shadow-primary-dark/10 bg-primary hover:bg-primary-dark"
                  >
                    {savingCallLog ? 'Saving...' : 'Submit Call Remark'}
                  </button>
                </div>
              </form>

              {/* Historical Logs List */}
              <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex items-center gap-1.5">
                  <History size={14} className="text-customText-muted dark:text-customText-mutedDark" />
                  <h4 className="font-extrabold text-xs text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                    Historical Remarks & Logs
                  </h4>
                </div>

                {historyError && (
                  <p className="text-xs text-red-500 font-semibold">{historyError}</p>
                )}

                {loadingHistory ? (
                  <div className="py-6 text-center text-xs text-slate-400">Loading historical logs...</div>
                ) : (
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {callHistory.length === 0 ? (
                      <p className="text-xs text-center text-slate-400 dark:text-slate-600 py-4 italic border border-dashed rounded-xl">
                        No previous call logs or remarks recorded for this student.
                      </p>
                    ) : (
                      callHistory.map((log) => (
                        <div
                          key={log.id}
                          className={`p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 text-xs ${
                            log.answered
                              ? 'bg-green-500/[0.02] dark:bg-green-950/[0.02]'
                              : 'bg-red-500/[0.02] dark:bg-red-950/[0.02]'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-extrabold text-customText dark:text-customText-dark">
                              {new Date(log.date).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              log.answered
                                ? 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/10'
                                : 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/10'
                            }`}>
                              {log.answered ? 'Answered' : 'No Answer'}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-medium leading-relaxed">
                            <span className="font-semibold text-slate-400 dark:text-slate-500">Remark:</span> {log.reason || 'None provided'}
                          </p>
                          <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 italic">
                            Logged by {log.calledBy} on {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FacultyDashboard;
