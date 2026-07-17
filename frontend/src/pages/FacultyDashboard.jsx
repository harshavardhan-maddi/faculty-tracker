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
  const [callType, setCallType] = useState('ABSENT'); // 'ABSENT' or 'INFO'
  const [callRecipient, setCallRecipient] = useState('PARENT'); // 'PARENT' or 'STUDENT'
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
    const status = attendanceMap[student.id] || 'Present';
    setCallType(status === 'Absent' ? 'ABSENT' : 'INFO');
    setCallRecipient('PARENT'); // Default to calling parent
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
          reason: callRemark,
          callType: callType,
          recipient: callRecipient
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
    return (
      <div className="flex items-center justify-center py-32">
        <Loading fullPage={false} />
      </div>
    );
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

      {/* Direct Call Registry Portal */}

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
            <div className="flex items-center justify-center py-20">
              <Loading fullPage={false} size="sm" />
            </div>
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
                    const isActiveCall = selectedStudent?.id === student.id;

                    // Cards style overrides
                    let borderClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
                    if (status === 'Absent') borderClass = 'border-red-500 bg-red-500/5 dark:bg-red-950/20';
                    if (status === 'Late') borderClass = 'border-amber-500 bg-amber-500/5 dark:bg-amber-950/20';

                    return (
                      <div
                        key={student.id}
                        className={`flex flex-col justify-between p-4 rounded-2xl border-2 shadow-sm transition-all duration-300 ${
                          isActiveCall
                            ? 'col-span-1 sm:col-span-2 md:col-span-3 border-primary bg-primary/5 shadow-md'
                            : status === 'Absent'
                              ? 'border-red-500 bg-red-500/5 dark:bg-red-950/20'
                              : status === 'Late'
                                ? 'border-amber-500 bg-amber-500/5 dark:bg-amber-950/20'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                        }`}
                      >
                        {isActiveCall ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                            {/* Left Column: Student Details & Contacts & History */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <h4 className="text-xs font-extrabold text-customText dark:text-customText-dark uppercase tracking-wide">
                                    {student.rollNumber}
                                  </h4>
                                  <p className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold">
                                    {student.name}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setSelectedStudent(null)}
                                  className="text-slate-450 hover:text-slate-600 p-1"
                                >
                                  <X size={14} />
                                </button>
                              </div>

                              <div className="grid grid-cols-1 gap-2 bg-slate-50 dark:bg-slate-800/10 p-3 rounded-xl border border-slate-200/45 dark:border-slate-800/40 text-xs">
                                <a
                                  href={`tel:${student.studentMobile}`}
                                  onClick={() => setCallRecipient('STUDENT')}
                                  className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-lg border hover:border-primary active:scale-[0.99] transition-all"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <PhoneCall size={12} className="text-primary" />
                                    <div className="truncate">
                                      <p className="text-[8px] font-bold text-slate-400 uppercase">Student Mobile</p>
                                      <p className="text-[10px] font-bold truncate">{student.studentMobile || 'N/A'}</p>
                                    </div>
                                  </div>
                                  <span className="text-[8px] text-primary font-bold whitespace-nowrap ml-1">Call Student</span>
                                </a>
                                <a
                                  href={`tel:${student.parentMobile}`}
                                  onClick={() => setCallRecipient('PARENT')}
                                  className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-lg border hover:border-primary active:scale-[0.99] transition-all"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <PhoneCall size={12} className="text-green-500" />
                                    <div className="truncate">
                                      <p className="text-[8px] font-bold text-slate-400 uppercase">Parent Mobile</p>
                                      <p className="text-[10px] font-bold truncate">{student.parentMobile || 'N/A'}</p>
                                    </div>
                                  </div>
                                  <span className="text-[8px] text-green-500 font-bold whitespace-nowrap ml-1">Call Parent</span>
                                </a>
                              </div>

                              {/* Historical Logs List */}
                              <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                                <h5 className="font-extrabold text-[10px] text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                  History
                                </h5>
                                {loadingHistory ? (
                                  <div className="text-[10px] text-slate-400">Loading history...</div>
                                ) : (
                                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                    {callHistory.length === 0 ? (
                                      <p className="text-[10px] text-slate-450 italic">No logs recorded.</p>
                                    ) : (
                                      callHistory.map((log) => (
                                        <div key={log.id} className="p-2 rounded-lg border bg-white/20 text-[10px] space-y-1">
                                          <div className="flex justify-between items-center">
                                            <span className="font-bold">{new Date(log.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                                            <div className="flex gap-1">
                                              <span className="text-[8px] font-semibold bg-slate-100 dark:bg-slate-800 px-1 rounded">{log.recipient === 'STUDENT' ? 'Student' : 'Parent'}</span>
                                              <span className="text-[8px] font-semibold bg-slate-100 dark:bg-slate-800 px-1 rounded">{log.callType === 'INFO' ? 'Info' : 'Absent'}</span>
                                            </div>
                                          </div>
                                          <p className="text-[9px] text-slate-500"><span className="font-medium text-slate-400">Remark:</span> {log.reason || 'None'}</p>
                                        </div>
                                      ))
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Right Column: Call Logging Form */}
                            <form onSubmit={handleSaveCallLog} className="space-y-3">
                              <h5 className="font-bold text-xs text-primary-dark dark:text-primary uppercase tracking-wider">
                                Record Response
                              </h5>

                              {/* Recipient */}
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-slate-450">Recipient</label>
                                <div className="flex gap-1.5 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => setCallRecipient('PARENT')}
                                    className={`flex-1 text-[9px] font-bold py-1 rounded-md transition-all ${callRecipient === 'PARENT' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-550 hover:text-slate-700'}`}
                                  >
                                    Parent
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setCallRecipient('STUDENT')}
                                    className={`flex-1 text-[9px] font-bold py-1 rounded-md transition-all ${callRecipient === 'STUDENT' ? 'bg-purple-500 text-white shadow-sm' : 'text-slate-550 hover:text-slate-700'}`}
                                  >
                                    Student
                                  </button>
                                </div>
                              </div>

                              {/* Call Purpose */}
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-slate-450">Purpose</label>
                                <div className="flex gap-1.5 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => setCallType('INFO')}
                                    className={`flex-1 text-[9px] font-bold py-1 rounded-md transition-all ${callType === 'INFO' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-550 hover:text-slate-700'}`}
                                  >
                                    Info Pass
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setCallType('ABSENT')}
                                    className={`flex-1 text-[9px] font-bold py-1 rounded-md transition-all ${callType === 'ABSENT' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-550 hover:text-slate-700'}`}
                                  >
                                    Absent Call
                                  </button>
                                </div>
                              </div>

                              {/* Answered Selector Toggle */}
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-slate-450">Answered?</label>
                                <div className="flex gap-1.5 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => setAnsweredCall(true)}
                                    className={`flex-1 text-[9px] font-bold py-1 rounded-md transition-all ${answeredCall ? 'bg-green-500 text-white shadow-sm' : 'text-slate-550 hover:text-slate-700'}`}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setAnsweredCall(false)}
                                    className={`flex-1 text-[9px] font-bold py-1 rounded-md transition-all ${!answeredCall ? 'bg-red-500 text-white shadow-sm' : 'text-slate-550 hover:text-slate-700'}`}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>

                              {/* Remarks */}
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-slate-450">Remarks</label>
                                <textarea
                                  required={answeredCall}
                                  value={callRemark}
                                  onChange={(e) => setCallRemark(e.target.value)}
                                  placeholder={answeredCall ? "e.g. parent informed..." : "No remarks needed for unanswered calls"}
                                  className="glass-input text-xs py-1.5 px-2 h-14 resize-none"
                                  disabled={!answeredCall}
                                />
                              </div>

                              <div className="flex justify-end gap-2 pt-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedStudent(null)}
                                  className="btn-secondary py-1 px-3 text-[10px] cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  disabled={savingCallLog}
                                  className="btn-primary py-1 px-3 text-[10px] bg-primary cursor-pointer"
                                >
                                  {savingCallLog ? 'Saving...' : 'Save'}
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-start">
                              <div className="space-y-1 min-w-0 flex-1">
                                <h4 className="text-xs font-extrabold text-customText dark:text-customText-dark uppercase tracking-wide truncate">
                                  {student.rollNumber}
                                </h4>
                                <p className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold truncate">
                                  {student.name}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => openCallModal(student)}
                                className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary-dark dark:text-primary transition-colors ml-2 shrink-0 active:scale-[0.93]"
                                title="Call parent or student to pass information"
                              >
                                <PhoneCall size={14} />
                              </button>
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
                          </>
                        )}
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





    </div>
  );
};

export default FacultyDashboard;
