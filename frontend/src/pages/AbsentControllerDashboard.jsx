import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Calendar,
  AlertCircle,
  Activity,
  History,
  PhoneCall,
  X
} from 'lucide-react';

const ABSENCE_REASONS = {
  "Medical": ["Fever", "Hospital", "Injury", "Medical Check-up"],
  "Family": ["Marriage", "Emergency", "Death", "Sick Family Member"],
  "Academic": ["Exam", "Project", "Internship", "Workshop"],
  "Transport": ["Bus Missed", "Vehicle Breakdown", "Traffic"],
  "Personal": ["Personal Work", "Stress", "Overslept"],
  "Official": ["Bank", "Passport", "Government Work"],
  "College Activity": ["Sports", "NSS", "Cultural Event"],
  "Weather": ["Heavy Rain", "Flood", "Cyclone"],
  "Work": ["Part-time Job", "Family Business"],
  "Other": ["Travel", "Festival", "Miscellaneous"]
};

const AbsentControllerDashboard = () => {
  const { token, user } = useAuth();
  
  const [classrooms, setClassrooms] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [activeBoardTab, setActiveBoardTab] = useState('sectionWise'); // 'sectionWise' or 'allSections'
  const [students, setStudents] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Call follow-up panel state
  const [activeCallStudent, setActiveCallStudent] = useState(null);
  const [answeredCall, setAnsweredCall] = useState(null); // true or false
  const [selectedCategory, setSelectedCategory] = useState('Medical');
  const [selectedReason, setSelectedReason] = useState('Fever');
  const [customReason, setCustomReason] = useState('');
  const [savingCall, setSavingCall] = useState(false);
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [preExcusedStart, setPreExcusedStart] = useState('');
  const [preExcusedEnd, setPreExcusedEnd] = useState('');

  // Student history modal state
  const [selectedHistoryStudent, setSelectedHistoryStudent] = useState(null);
  const [absentHistory, setAbsentHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDateString();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
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
          setError(data.message || 'Failed to fetch classrooms');
        }
      } catch (err) {
        setError('Failed to connect to backend server');
      } finally {
        setLoading(false);
      }
    };
    
    fetchClassrooms();
  }, [token]);

  const loadSectionData = async () => {
    try {
      setError('');
      if (activeBoardTab === 'sectionWise') {
        if (!selectedSection) return;

        // 1. Fetch all students in section
        const studRes = await fetch(`/api/student-attendance/students?section=${encodeURIComponent(selectedSection)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const studData = await studRes.json();
        if (studRes.ok) {
          setStudents(studData);
        }

        // 2. Fetch absentees for section today
        const absRes = await fetch(`/api/student-attendance/absentees?section=${encodeURIComponent(selectedSection)}&date=${todayDate}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const absData = await absRes.json();
        if (absRes.ok) {
          setAbsentees(absData);
        }
      } else {
        // activeBoardTab === 'allSections'
        // Fetch absentees for all sections today
        const absRes = await fetch(`/api/student-attendance/absentees?section=All&date=${todayDate}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const absData = await absRes.json();
        if (absRes.ok) {
          setAbsentees(absData);
        }
        setStudents([]);
      }
    } catch (err) {
      setError('Error reloading dashboard data');
    }
  };

  useEffect(() => {
    loadSectionData();
  }, [activeBoardTab, selectedSection, token]);

  const handleMakeCall = (student) => {
    setActiveCallStudent(student);
    if (student.callLog) {
      setAnsweredCall(student.callLog.answered);
      const logReason = student.callLog.reason || '';
      setIsMultiDay(!!student.preExcusedStart);
      setPreExcusedStart(student.preExcusedStart || '');
      setPreExcusedEnd(student.preExcusedEnd || '');

      let matched = false;
      const parts = logReason.split(' - ');
      if (parts.length >= 2) {
        const cat = parts[0];
        const res = parts.slice(1).join(' - ');
        if (ABSENCE_REASONS[cat]) {
          setSelectedCategory(cat);
          if (ABSENCE_REASONS[cat].includes(res)) {
            setSelectedReason(res);
            setCustomReason('');
          } else {
            setSelectedReason('Others');
            setCustomReason(res);
          }
          matched = true;
        }
      }
      if (!matched) {
        setSelectedCategory('Other');
        setSelectedReason('Others');
        setCustomReason(logReason);
      }
    } else {
      setAnsweredCall(null);
      setSelectedCategory('Medical');
      setSelectedReason('Fever');
      setCustomReason('');
      setIsMultiDay(false);
      setPreExcusedStart('');
      setPreExcusedEnd('');
    }
    
    // Trigger standard tel call link simulation
    window.location.href = `tel:${student.parentMobile}`;
  };

  const handleSaveCallLog = async (e) => {
    e.preventDefault();
    if (!activeCallStudent || answeredCall === null) return;
    
    setSavingCall(true);
    setError('');
    setSuccess('');

    const finalReason = answeredCall
      ? (selectedReason === 'Others' ? `${selectedCategory} - ${customReason}` : `${selectedCategory} - ${selectedReason}`)
      : null;

    try {
      const res = await fetch('/api/student-attendance/call-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: activeCallStudent.id,
          date: todayDate,
          answered: answeredCall,
          reason: finalReason,
          preExcusedStart: (answeredCall && isMultiDay) ? preExcusedStart : null,
          preExcusedEnd: (answeredCall && isMultiDay) ? preExcusedEnd : null,
          preExcusedReason: (answeredCall && isMultiDay) ? finalReason : null
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(`Call log saved successfully for ${activeCallStudent.name}.`);
        setActiveCallStudent(null);
        setAnsweredCall(null);
        setSelectedCategory('Medical');
        setSelectedReason('Fever');
        setCustomReason('');
        setIsMultiDay(false);
        setPreExcusedStart('');
        setPreExcusedEnd('');
        loadSectionData(); // Reload to show updated call log details
      } else {
        setError(data.message || 'Failed to save call log');
      }
    } catch (err) {
      setError('Network error saving call log');
    } finally {
      setSavingCall(false);
    }
  };

  const handleViewHistory = async (student) => {
    setSelectedHistoryStudent(student);
    setLoadingHistory(true);
    setAbsentHistory([]);
    try {
      const res = await fetch(`/api/student-attendance/student/${student.id}/absent-days`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setAbsentHistory(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const morningAbsentees = absentees.filter(s => s.attendanceSession === 'morning');
  const afternoonAbsentees = absentees.filter(s => s.attendanceSession === 'afternoon');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark tracking-tight">
            Absentee Control Board
          </h2>
          <p className="text-sm text-customText-muted dark:text-customText-mutedDark">
            Monitor absentees, place calls to parents, and log tracking feedback in real-time
          </p>
        </div>

        {activeBoardTab === 'sectionWise' && (
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
              Select Class
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="glass-input text-sm py-2"
            >
              {classrooms.map((c) => (
                <option key={c.id} value={c.className}>
                  {c.className}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tabs Layout */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 no-print">
        <button
          onClick={() => setActiveBoardTab('sectionWise')}
          className={`flex items-center gap-2 py-3 px-6 text-sm font-semibold border-b-2 transition-all ${
            activeBoardTab === 'sectionWise' 
              ? 'border-primary text-primary-dark dark:text-primary font-bold' 
              : 'border-transparent text-customText-muted dark:text-customText-mutedDark hover:text-customText'
          }`}
        >
          <Users size={16} />
          <span>Section Wise Absentees</span>
        </button>
        <button
          onClick={() => setActiveBoardTab('allSections')}
          className={`flex items-center gap-2 py-3 px-6 text-sm font-semibold border-b-2 transition-all ${
            activeBoardTab === 'allSections' 
              ? 'border-primary text-primary-dark dark:text-primary font-bold' 
              : 'border-transparent text-customText-muted dark:text-customText-mutedDark hover:text-customText'
          }`}
        >
          <AlertCircle size={16} className="text-red-500" />
          <span>All Section Absentees</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold rounded-xl">
          ✓ {success}
        </div>
      )}

      {/* SECTION 1: SECTION-WISE LAYOUT */}
      {activeBoardTab === 'sectionWise' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Today's Absentees list (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">

            <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/45">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-base text-customText dark:text-customText-dark flex items-center gap-2">
                  <AlertCircle className="text-red-500" size={20} />
                  <span>Today's Absentees ({absentees.length})</span>
                </h3>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-customText-muted dark:text-customText-mutedDark px-2.5 py-1 rounded-md font-semibold">
                  Date: {todayDate}
                </span>
              </div>

              {absentees.length === 0 ? (
                <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-customText-muted dark:text-customText-mutedDark">
                  🎉 No absentees logged for {selectedSection} today!
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Morning Session Absentees */}
                  <div>
                    <h4 className="font-extrabold text-xs text-primary dark:text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span>Morning Session Absentees ({morningAbsentees.length})</span>
                    </h4>
                    {morningAbsentees.length === 0 ? (
                      <div className="text-center py-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-customText-muted dark:text-customText-mutedDark">
                        No morning absentees.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {morningAbsentees.map((student) => {
                          const isLate = student.status === 'Late';
                          const hasCallLog = !!student.callLog;
                          const isActiveCall = activeCallStudent?.id === student.id;
                          
                          return (
                            <div 
                              key={student.id} 
                              className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ${
                                isActiveCall
                                  ? 'col-span-1 sm:col-span-2 border-primary-dark/50 bg-primary-dark/5 shadow-lg'
                                  : isLate 
                                    ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5' 
                                    : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40 shadow-red-500/5'
                              } hover:shadow-md`}
                            >
                              {isActiveCall ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                                  {/* Left Column: Student Details */}
                                  <div className="space-y-3">
                                    <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                      isLate 
                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-450 border border-amber-250 dark:border-amber-800' 
                                        : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-450 border border-red-250 dark:border-red-800'
                                    }`}>
                                      {student.status}
                                    </span>

                                    <div className="space-y-1">
                                      <h4 className="text-sm font-bold text-customText dark:text-customText-dark uppercase">
                                        {student.rollNumber}
                                      </h4>
                                      <span className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold block">
                                        {student.name} • {student.section}
                                      </span>
                                    </div>

                                    <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/20 flex flex-col gap-2">
                                      <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                        <span>Student's Mobile:</span>
                                        <span className="font-semibold text-customText dark:text-customText-dark">
                                          {student.studentMobile || 'N/A'}
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                        <span>Parent's Mobile:</span>
                                        <span className="font-semibold text-customText dark:text-customText-dark">
                                          {student.parentMobile}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Column: Inline Call Feedback form */}
                                  <div className="border-t md:border-t-0 md:border-l border-slate-200/50 dark:border-slate-800/30 pt-4 md:pt-0 md:pl-6">
                                    <div className="flex justify-between items-center mb-3">
                                      <h5 className="font-bold text-xs text-primary-dark dark:text-primary uppercase tracking-wider">
                                        Call Feedback Log
                                      </h5>
                                      <button 
                                        type="button"
                                        onClick={() => setActiveCallStudent(null)}
                                        className="text-slate-400 hover:text-slate-600"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>

                                    <form onSubmit={handleSaveCallLog} className="space-y-3">
                                      <div>
                                        <p className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-1.5">
                                          Did the parent answer?
                                        </p>
                                        <div className="flex items-center gap-4">
                                          <label className="flex items-center gap-1.5 text-xs font-semibold text-customText dark:text-customText-dark cursor-pointer">
                                            <input
                                              type="radio"
                                              name={`answered-${student.id}`}
                                              checked={answeredCall === true}
                                              onChange={() => setAnsweredCall(true)}
                                              className="h-3.5 w-3.5 text-primary"
                                              required
                                            />
                                            <span>Yes</span>
                                          </label>
                                          <label className="flex items-center gap-1.5 text-xs font-semibold text-customText dark:text-customText-dark cursor-pointer">
                                            <input
                                              type="radio"
                                              name={`answered-${student.id}`}
                                              checked={answeredCall === false}
                                              onChange={() => setAnsweredCall(false)}
                                              className="h-3.5 w-3.5 text-primary"
                                              required
                                            />
                                            <span>No</span>
                                          </label>
                                        </div>
                                      </div>

                                      {answeredCall === true && (
                                         <>
                                           <div className="space-y-2">
                                             <div className="space-y-1">
                                               <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                                 Category
                                               </label>
                                               <select
                                                 value={selectedCategory}
                                                 onChange={(e) => {
                                                   const cat = e.target.value;
                                                   setSelectedCategory(cat);
                                                   setSelectedReason(ABSENCE_REASONS[cat][0] || 'Others');
                                                 }}
                                                 className="glass-input text-[11px] py-1.5 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-customText dark:text-customText-dark"
                                                 required
                                               >
                                                 {Object.keys(ABSENCE_REASONS).map(cat => (
                                                   <option key={cat} value={cat}>{cat}</option>
                                                 ))}
                                               </select>
                                             </div>

                                             <div className="space-y-1">
                                               <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                                 Reason
                                               </label>
                                               <select
                                                 value={selectedReason}
                                                 onChange={(e) => setSelectedReason(e.target.value)}
                                                 className="glass-input text-[11px] py-1.5 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-customText dark:text-customText-dark"
                                                 required
                                               >
                                                 {(ABSENCE_REASONS[selectedCategory] || []).map(res => (
                                                   <option key={res} value={res}>{res}</option>
                                                 ))}
                                                 <option value="Others">Others</option>
                                               </select>
                                             </div>

                                             {selectedReason === 'Others' && (
                                               <div className="space-y-1">
                                                 <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                                   Custom Reason
                                                 </label>
                                                 <input
                                                   type="text"
                                                   required
                                                   value={customReason}
                                                   onChange={(e) => setCustomReason(e.target.value)}
                                                   placeholder="Enter customized reason"
                                                   className="glass-input text-[11px] py-1.5"
                                                 />
                                               </div>
                                             )}
                                           </div>

                                          <div className="mt-2">
                                            <label className="flex items-center gap-2 text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider cursor-pointer">
                                              <input
                                                type="checkbox"
                                                checked={isMultiDay}
                                                onChange={(e) => setIsMultiDay(e.target.checked)}
                                                className="h-3.5 w-3.5 text-primary rounded"
                                              />
                                              <span>Absent for future dates</span>
                                            </label>
                                          </div>

                                          {isMultiDay && (
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                              <div className="space-y-1">
                                                <label className="block text-[9px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                                  From
                                                </label>
                                                <input
                                                  type="date"
                                                  required={isMultiDay}
                                                  value={preExcusedStart}
                                                  onChange={(e) => setPreExcusedStart(e.target.value)}
                                                  className="glass-input text-[10px] py-1 px-2"
                                                />
                                              </div>
                                              <div className="space-y-1">
                                                <label className="block text-[9px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                                  To
                                                </label>
                                                <input
                                                  type="date"
                                                  required={isMultiDay}
                                                  value={preExcusedEnd}
                                                  onChange={(e) => setPreExcusedEnd(e.target.value)}
                                                  className="glass-input text-[10px] py-1 px-2"
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      )}

                                      <div className="flex justify-end gap-2 pt-1">
                                        <button
                                          type="button"
                                          onClick={() => setActiveCallStudent(null)}
                                          className="btn-secondary py-1 px-3 text-[10px]"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          disabled={savingCall || answeredCall === null}
                                          className="btn-primary py-1 px-3 text-[10px] bg-primary-dark"
                                        >
                                          {savingCall ? 'Saving...' : 'Save'}
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <span className={`absolute top-4 right-4 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                    isLate 
                                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-450 border border-amber-250 dark:border-amber-800' 
                                      : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-450 border border-red-250 dark:border-red-800'
                                  }`}>
                                    {student.status}
                                  </span>

                                  <div className="space-y-1 pr-14">
                                    <h4 className="text-sm font-bold text-customText dark:text-customText-dark uppercase">
                                      {student.rollNumber}
                                    </h4>
                                    <span className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold block">
                                      {student.name} • {student.section}
                                    </span>
                                  </div>

                                  {/* Parent Phone Section */}
                                  <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/20 flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                      <span>Student's Mobile:</span>
                                      <span className="font-semibold text-customText dark:text-customText-dark">
                                        {student.studentMobile || 'N/A'}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                      <span>Parent's Mobile:</span>
                                      <span className="font-semibold text-customText dark:text-customText-dark">
                                        {student.parentMobile}
                                      </span>
                                    </div>

                                    {/* Call Logs Detail if any */}
                                    {hasCallLog && (
                                      <div className={`p-2.5 rounded-xl text-xs ${
                                        student.callLog.isPreExcused
                                          ? 'bg-sky-500/10 text-sky-700 dark:text-sky-450'
                                          : student.callLog.answered 
                                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-450' 
                                            : 'bg-red-500/10 text-red-700 dark:text-red-450'
                                      }`}>
                                        <p className="font-bold flex items-center gap-1.5">
                                          {student.callLog.isPreExcused ? <Calendar size={12} /> : student.callLog.answered ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                          <span>
                                            {student.callLog.isPreExcused 
                                              ? 'Pre-informed Absent' 
                                              : student.callLog.answered ? 'Answered' : 'Not Answered'}
                                          </span>
                                        </p>
                                        {student.callLog.reason && (
                                          <p className="mt-1 font-medium italic text-[11px] opacity-90">
                                            Reason: "{student.callLog.reason}"
                                          </p>
                                        )}
                                      </div>
                                    )}

                                    {isLate ? (
                                      <span className="mt-2 text-center text-xs font-bold text-amber-600 bg-amber-500/10 py-2 px-4 rounded-xl border border-amber-500/20">
                                        Late Entry - No Call Required
                                      </span>
                                    ) : student.callLog?.isPreExcused ? (
                                      <span className="mt-2 text-center text-xs font-bold text-sky-600 bg-sky-500/10 py-2 px-4 rounded-xl border border-sky-500/20">
                                        No Call Required (Pre-informed)
                                      </span>
                                    ) : (
                                      <button
                                        onClick={() => handleMakeCall(student)}
                                        className={`mt-2 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-white transition-all active:scale-[0.98] ${
                                          hasCallLog 
                                            ? 'bg-slate-600 hover:bg-slate-700' 
                                            : 'bg-primary-dark hover:bg-primary text-white shadow-md shadow-primary-dark/10'
                                        }`}
                                      >
                                        <PhoneCall size={14} />
                                        <span>{hasCallLog ? 'Call Again / Update' : 'Call Parent'}</span>
                                      </button>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Afternoon Session Absentees */}
                  <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/10">
                    <h4 className="font-extrabold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      <span>Afternoon Session Absentees ({afternoonAbsentees.length})</span>
                    </h4>
                    {afternoonAbsentees.length === 0 ? (
                      <div className="text-center py-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-customText-muted dark:text-customText-mutedDark">
                        No afternoon absentees.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {afternoonAbsentees.map((student) => {
                          const isLate = student.status === 'Late';
                          const hasCallLog = !!student.callLog;
                          
                          return (
                            <div 
                              key={student.id} 
                              className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ${
                                isLate 
                                  ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5' 
                                  : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40 shadow-red-500/5'
                              } hover:shadow-md`}
                            >
                              <span className={`absolute top-4 right-4 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                isLate 
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-450 border border-amber-250 dark:border-amber-800' 
                                  : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-450 border border-red-250 dark:border-red-800'
                              }`}>
                                {student.status}
                              </span>

                              <div className="space-y-1 pr-14">
                                <h4 className="text-sm font-bold text-customText dark:text-customText-dark uppercase">
                                  {student.rollNumber}
                                </h4>
                                <span className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold block">
                                  {student.name} • {student.section}
                                </span>
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/20 flex flex-col gap-2">
                                <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                  <span>Student's Mobile:</span>
                                  <span className="font-semibold text-customText dark:text-customText-dark">
                                    {student.studentMobile || 'N/A'}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                  <span>Parent's Mobile:</span>
                                  <span className="font-semibold text-customText dark:text-customText-dark">
                                    {student.parentMobile}
                                  </span>
                                </div>

                                {/* Call Logs Detail if any */}
                                {hasCallLog && (
                                  <div className={`p-2.5 rounded-xl text-xs ${
                                    student.callLog.isPreExcused
                                      ? 'bg-sky-500/10 text-sky-700 dark:text-sky-450'
                                      : student.callLog.answered 
                                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-450' 
                                        : 'bg-red-500/10 text-red-700 dark:text-red-450'
                                  }`}>
                                    <p className="font-bold flex items-center gap-1.5">
                                      {student.callLog.isPreExcused ? <Calendar size={12} /> : student.callLog.answered ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                      <span>
                                        {student.callLog.isPreExcused 
                                          ? 'Pre-informed Absent' 
                                          : student.callLog.answered ? 'Answered' : 'Not Answered'}
                                      </span>
                                    </p>
                                    {student.callLog.reason && (
                                      <p className="mt-1 font-medium italic text-[11px] opacity-90">
                                        Reason: "{student.callLog.reason}"
                                      </p>
                                    )}
                                  </div>
                                )}

                                <span className="mt-2 text-center text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                  Afternoon Entry - Calling Not Allowed
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: All Students Cards List (1/3 width) */}
          <div className="space-y-6">
            <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/45">
              <h3 className="font-bold text-base text-customText dark:text-customText-dark flex items-center gap-2 mb-6">
                <Users className="text-slate-500" size={20} />
                <span>All Students ({students.length})</span>
              </h3>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200/45 dark:border-slate-800/40 rounded-2xl flex flex-col gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-customText dark:text-customText-dark uppercase">
                        {student.rollNumber}
                      </h4>
                      <span className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold block">
                        {student.name}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 pt-2.5 border-t border-slate-200/40 dark:border-slate-800/20 text-customText-muted dark:text-customText-mutedDark">
                      <div className="flex justify-between items-center">
                        <span>Student Mobile:</span>
                        {student.studentMobile ? (
                          <a href={`tel:${student.studentMobile}`} className="font-bold text-primary dark:text-primary-dark hover:underline flex items-center gap-1">
                            <Phone size={10} />
                            <span>{student.studentMobile}</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">N/A</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Parent Mobile:</span>
                        {student.parentMobile ? (
                          <a href={`tel:${student.parentMobile}`} className="font-bold text-primary dark:text-primary-dark hover:underline flex items-center gap-1">
                            <Phone size={10} />
                            <span>{student.parentMobile}</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">N/A</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1 border-t border-slate-200/20 dark:border-slate-800/10">
                      <button
                        onClick={() => handleViewHistory(student)}
                        className="flex-1 py-1.5 px-3 rounded-xl text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors flex items-center justify-center gap-1"
                      >
                        <History size={12} className="text-slate-400" />
                        <span>View History</span>
                      </button>
                    </div>
                  </div>
                ))}
                
                {students.length === 0 && (
                  <div className="text-center py-6 text-xs text-customText-muted dark:text-customText-mutedDark">
                    No students in this section.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: ALL SECTIONS TAB LAYOUT */}
      {activeBoardTab === 'allSections' && (
        <div className="space-y-6">


          <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/45">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-base text-customText dark:text-customText-dark flex items-center gap-2">
                <AlertCircle className="text-red-500" size={20} />
                <span>Today's Absentees across All Sections ({absentees.length})</span>
              </h3>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-customText-muted dark:text-customText-mutedDark px-2.5 py-1 rounded-md font-semibold">
                Date: {todayDate}
              </span>
            </div>

            {absentees.length === 0 ? (
              <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-customText-muted dark:text-customText-mutedDark">
                🎉 No absentees logged across any sections today!
              </div>
            ) : (
              <div className="space-y-8">
                {/* Morning Session Absentees */}
                <div>
                  <h4 className="font-extrabold text-xs text-primary dark:text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span>Morning Session Absentees ({morningAbsentees.length})</span>
                  </h4>
                  {morningAbsentees.length === 0 ? (
                    <div className="text-center py-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-customText-muted dark:text-customText-mutedDark">
                      No morning absentees.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {morningAbsentees.map((student) => {
                        const isLate = student.status === 'Late';
                        const hasCallLog = !!student.callLog;
                        const isActiveCall = activeCallStudent?.id === student.id;
                        
                        return (
                          <div 
                            key={student.id} 
                            className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ${
                              isActiveCall
                                ? 'col-span-1 sm:col-span-2 md:col-span-3 border-primary-dark/50 bg-primary-dark/5 shadow-lg'
                                : isLate 
                                  ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5' 
                                  : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40 shadow-red-500/5'
                            } hover:shadow-md`}
                          >
                            {isActiveCall ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                                {/* Left Column: Student Details */}
                                <div className="space-y-3">
                                  <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                    isLate 
                                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-450 border border-amber-250 dark:border-amber-800' 
                                      : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-450 border border-red-250 dark:border-red-800'
                                  }`}>
                                    {student.status}
                                  </span>

                                  <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-customText dark:text-customText-dark uppercase">
                                      {student.rollNumber}
                                    </h4>
                                    <span className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold block">
                                      {student.name} • {student.section}
                                    </span>
                                  </div>

                                  <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/20 flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                      <span>Student's Mobile:</span>
                                      <span className="font-semibold text-customText dark:text-customText-dark">
                                        {student.studentMobile || 'N/A'}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                      <span>Parent's Mobile:</span>
                                      <span className="font-semibold text-customText dark:text-customText-dark">
                                        {student.parentMobile}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column: Inline Call Feedback form */}
                                <div className="border-t md:border-t-0 md:border-l border-slate-200/50 dark:border-slate-800/30 pt-4 md:pt-0 md:pl-6">
                                  <div className="flex justify-between items-center mb-3">
                                    <h5 className="font-bold text-xs text-primary-dark dark:text-primary uppercase tracking-wider">
                                      Call Feedback Log
                                    </h5>
                                    <button 
                                      type="button"
                                      onClick={() => setActiveCallStudent(null)}
                                      className="text-slate-400 hover:text-slate-600"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>

                                  <form onSubmit={handleSaveCallLog} className="space-y-3">
                                    <div>
                                      <p className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-1.5">
                                        Did the parent answer?
                                      </p>
                                      <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-customText dark:text-customText-dark cursor-pointer">
                                          <input
                                            type="radio"
                                            name={`answered-${student.id}`}
                                            checked={answeredCall === true}
                                            onChange={() => setAnsweredCall(true)}
                                            className="h-3.5 w-3.5 text-primary"
                                            required
                                          />
                                          <span>Yes</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold text-customText dark:text-customText-dark cursor-pointer">
                                          <input
                                            type="radio"
                                            name={`answered-${student.id}`}
                                            checked={answeredCall === false}
                                            onChange={() => setAnsweredCall(false)}
                                            className="h-3.5 w-3.5 text-primary"
                                            required
                                          />
                                          <span>No</span>
                                        </label>
                                      </div>
                                    </div>

                                    {answeredCall === true && (
                                      <>
                                        <div className="space-y-2">
                                          <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                              Category
                                            </label>
                                            <select
                                              value={selectedCategory}
                                              onChange={(e) => {
                                                const cat = e.target.value;
                                                setSelectedCategory(cat);
                                                setSelectedReason(ABSENCE_REASONS[cat][0] || 'Others');
                                              }}
                                              className="glass-input text-[11px] py-1.5 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-customText dark:text-customText-dark"
                                              required
                                            >
                                              {Object.keys(ABSENCE_REASONS).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                              ))}
                                            </select>
                                          </div>

                                          <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                              Reason
                                            </label>
                                            <select
                                              value={selectedReason}
                                              onChange={(e) => setSelectedReason(e.target.value)}
                                              className="glass-input text-[11px] py-1.5 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-customText dark:text-customText-dark"
                                              required
                                            >
                                              {(ABSENCE_REASONS[selectedCategory] || []).map(res => (
                                                <option key={res} value={res}>{res}</option>
                                              ))}
                                              <option value="Others">Others</option>
                                            </select>
                                          </div>

                                          {selectedReason === 'Others' && (
                                            <div className="space-y-1">
                                              <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                                Custom Reason
                                              </label>
                                              <input
                                                type="text"
                                                required
                                                value={customReason}
                                                onChange={(e) => setCustomReason(e.target.value)}
                                                placeholder="Enter customized reason"
                                                className="glass-input text-[11px] py-1.5"
                                              />
                                            </div>
                                          )}
                                        </div>

                                        <div className="mt-2">
                                          <label className="flex items-center gap-2 text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={isMultiDay}
                                              onChange={(e) => setIsMultiDay(e.target.checked)}
                                              className="h-3.5 w-3.5 text-primary rounded"
                                            />
                                            <span>Absent for future dates</span>
                                          </label>
                                        </div>

                                        {isMultiDay && (
                                          <div className="grid grid-cols-2 gap-2 mt-2">
                                            <div className="space-y-1">
                                              <label className="block text-[9px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                                From
                                              </label>
                                              <input
                                                type="date"
                                                required={isMultiDay}
                                                value={preExcusedStart}
                                                onChange={(e) => setPreExcusedStart(e.target.value)}
                                                className="glass-input text-[10px] py-1 px-2"
                                              />
                                            </div>
                                            <div className="space-y-1">
                                              <label className="block text-[9px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                                                To
                                              </label>
                                              <input
                                                type="date"
                                                required={isMultiDay}
                                                value={preExcusedEnd}
                                                onChange={(e) => setPreExcusedEnd(e.target.value)}
                                                className="glass-input text-[10px] py-1 px-2"
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    )}

                                    <div className="flex justify-end gap-2 pt-1">
                                      <button
                                        type="button"
                                        onClick={() => setActiveCallStudent(null)}
                                        className="btn-secondary py-1 px-3 text-[10px]"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        disabled={savingCall || answeredCall === null}
                                        className="btn-primary py-1 px-3 text-[10px] bg-primary-dark"
                                      >
                                        {savingCall ? 'Saving...' : 'Save'}
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            ) : (
                              <>
                                <span className={`absolute top-4 right-4 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  isLate 
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-450 border border-amber-250 dark:border-amber-800' 
                                    : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-450 border border-red-250 dark:border-red-800'
                                }`}>
                                  {student.status}
                                </span>

                                <div className="space-y-1 pr-14">
                                  <h4 className="text-sm font-bold text-customText dark:text-customText-dark uppercase">
                                    {student.rollNumber}
                                  </h4>
                                  <span className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold block">
                                    {student.name} • {student.section}
                                  </span>
                                </div>

                                {/* Parent Phone Section */}
                                <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/20 flex flex-col gap-2">
                                  <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                    <span>Student's Mobile:</span>
                                    <span className="font-semibold text-customText dark:text-customText-dark">
                                      {student.studentMobile || 'N/A'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                    <span>Parent's Mobile:</span>
                                    <span className="font-semibold text-customText dark:text-customText-dark">
                                      {student.parentMobile}
                                    </span>
                                  </div>

                                  {/* Call Logs Detail if any */}
                                  {hasCallLog && (
                                    <div className={`p-2.5 rounded-xl text-xs ${
                                      student.callLog.isPreExcused
                                        ? 'bg-sky-500/10 text-sky-700 dark:text-sky-450'
                                        : student.callLog.answered 
                                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-450' 
                                          : 'bg-red-500/10 text-red-700 dark:text-red-450'
                                    }`}>
                                      <p className="font-bold flex items-center gap-1.5">
                                        {student.callLog.isPreExcused ? <Calendar size={12} /> : student.callLog.answered ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                        <span>
                                          {student.callLog.isPreExcused 
                                            ? 'Pre-informed Absent' 
                                            : student.callLog.answered ? 'Answered' : 'Not Answered'}
                                        </span>
                                      </p>
                                      {student.callLog.reason && (
                                        <p className="mt-1 font-medium italic text-[11px] opacity-90">
                                          Reason: "{student.callLog.reason}"
                                        </p>
                                      )}
                                    </div>
                                  )}

                                  {isLate ? (
                                    <span className="mt-2 text-center text-xs font-bold text-amber-600 bg-amber-500/10 py-2 px-4 rounded-xl border border-amber-500/20">
                                      Late Entry - No Call Required
                                    </span>
                                  ) : student.callLog?.isPreExcused ? (
                                    <span className="mt-2 text-center text-xs font-bold text-sky-600 bg-sky-500/10 py-2 px-4 rounded-xl border border-sky-500/20">
                                      No Call Required (Pre-informed)
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleMakeCall(student)}
                                      className={`mt-2 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-white transition-all active:scale-[0.98] ${
                                        hasCallLog 
                                          ? 'bg-slate-600 hover:bg-slate-700' 
                                          : 'bg-primary-dark hover:bg-primary text-white shadow-md shadow-primary-dark/10'
                                      }`}
                                    >
                                      <PhoneCall size={14} />
                                      <span>{hasCallLog ? 'Call Again / Update' : 'Call Parent'}</span>
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Afternoon Session Absentees */}
                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/10">
                  <h4 className="font-extrabold text-xs text-slate-500 dark:text-slate-400 tracking-wider mb-4 flex items-center gap-2 uppercase">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span>Afternoon Session Absentees ({afternoonAbsentees.length})</span>
                  </h4>
                  {afternoonAbsentees.length === 0 ? (
                    <div className="text-center py-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-customText-muted dark:text-customText-mutedDark">
                      No afternoon absentees.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {afternoonAbsentees.map((student) => {
                        const isLate = student.status === 'Late';
                        const hasCallLog = !!student.callLog;
                        
                        return (
                          <div 
                            key={student.id} 
                            className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ${
                              isLate 
                                ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5' 
                                : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40 shadow-red-500/5'
                            } hover:shadow-md`}
                          >
                            <span className={`absolute top-4 right-4 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              isLate 
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-450 border border-amber-250 dark:border-amber-800' 
                                : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-450 border border-red-250 dark:border-red-800'
                            }`}>
                              {student.status}
                            </span>

                            <div className="space-y-1 pr-14">
                              <h4 className="text-sm font-bold text-customText dark:text-customText-dark uppercase">
                                {student.rollNumber}
                              </h4>
                              <span className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold block">
                                {student.name} • {student.section}
                              </span>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/20 flex flex-col gap-2">
                              <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                <span>Student's Mobile:</span>
                                <span className="font-semibold text-customText dark:text-customText-dark">
                                  {student.studentMobile || 'N/A'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-xs text-customText-muted dark:text-customText-mutedDark">
                                <span>Parent's Mobile:</span>
                                <span className="font-semibold text-customText dark:text-customText-dark">
                                  {student.parentMobile}
                                </span>
                              </div>

                              {/* Call Logs Detail if any */}
                              {hasCallLog && (
                                <div className={`p-2.5 rounded-xl text-xs ${
                                  student.callLog.isPreExcused
                                    ? 'bg-sky-500/10 text-sky-700 dark:text-sky-450'
                                    : student.callLog.answered 
                                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-450' 
                                      : 'bg-red-500/10 text-red-700 dark:text-red-450'
                                }`}>
                                  <p className="font-bold flex items-center gap-1.5">
                                    {student.callLog.isPreExcused ? <Calendar size={12} /> : student.callLog.answered ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                    <span>
                                      {student.callLog.isPreExcused 
                                        ? 'Pre-informed Absent' 
                                        : student.callLog.answered ? 'Answered' : 'Not Answered'}
                                    </span>
                                  </p>
                                  {student.callLog.reason && (
                                    <p className="mt-1 font-medium italic text-[11px] opacity-90">
                                      Reason: "{student.callLog.reason}"
                                    </p>
                                  )}
                                </div>
                              )}

                              <span className="mt-2 text-center text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                Afternoon Entry - Calling Not Allowed
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STUDENT ABSENT HISTORY MODAL */}
      {selectedHistoryStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedHistoryStudent(null)} />
          
          <div className="relative glass-card border border-white/60 w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl animate-fade-in z-10">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200/50 dark:border-slate-800/30">
              <div>
                <h3 className="font-extrabold text-base text-customText dark:text-customText-dark">
                  Absence History Log
                </h3>
                <p className="text-[11px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                  {selectedHistoryStudent.name} ({selectedHistoryStudent.rollNumber})
                </p>
              </div>
              <button 
                onClick={() => setSelectedHistoryStudent(null)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4">
              <div className="flex justify-between items-center p-3 bg-red-500/5 border border-red-500/10 rounded-xl mb-4 text-xs">
                <span className="text-customText-muted dark:text-customText-mutedDark font-medium">
                  Total Logged Absent Days:
                </span>
                <span className="font-extrabold text-red-600 dark:text-red-400 text-sm">
                  {absentHistory.length} Day(s)
                </span>
              </div>

              <h4 className="text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-2">
                Logged Absent Dates
              </h4>

              {loadingHistory ? (
                <div className="text-center py-6 text-xs text-customText-muted">Loading logs...</div>
              ) : absentHistory.length === 0 ? (
                <div className="text-center py-6 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                  ✓ Perfect Attendance! No absent records found.
                </div>
              ) : (
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {absentHistory.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between py-2 px-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/30 rounded-lg text-xs"
                    >
                      <span className="font-semibold text-customText dark:text-customText-dark">
                        {item.date}
                      </span>
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 rounded-full font-bold text-[10px] uppercase">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200/50 dark:border-slate-800/30">
              <button
                onClick={() => setSelectedHistoryStudent(null)}
                className="btn-secondary text-xs px-5 py-2"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AbsentControllerDashboard;
