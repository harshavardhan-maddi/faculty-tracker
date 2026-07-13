import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { 
  FileSpreadsheet, 
  Printer, 
  Search, 
  Filter, 
  Calendar,
  Building,
  User,
  RefreshCw
} from 'lucide-react';

const Reports = () => {
  const { token, user } = useAuth();
  const { socket } = useSocket();

  // Tab state: 'faculty' or 'absentees'
  const [reportType, setReportType] = useState(user?.role === 'ABSENT_CONTROLLER' ? 'absentees' : 'faculty');

  // Shared classrooms list
  const [classrooms, setClassrooms] = useState([]);

  // Faculty logs report states
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportMode, setReportMode] = useState('single'); // 'single' (classroom + date) or 'range' (date range)
  const [filterClassroom, setFilterClassroom] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Absentees report states
  const [absenteesList, setAbsenteesList] = useState([]);
  const [loadingAbsentees, setLoadingAbsentees] = useState(false);
  const [absenteeReportMode, setAbsenteeReportMode] = useState('single'); // 'single' (date) or 'range' (date range)
  const [absenteeSection, setAbsenteeSection] = useState('All');
  const [absenteeDate, setAbsenteeDate] = useState('');
  const [absenteeStartDate, setAbsenteeStartDate] = useState('');
  const [absenteeEndDate, setAbsenteeEndDate] = useState('');

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDateString();

  // Fetch unique filter options (classrooms list)
  const fetchFilterOptions = async () => {
    try {
      const classRes = await fetch('/api/classrooms', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const classData = await classRes.json();
      setClassrooms(classData);
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };

  // Fetch Faculty Logs
  const fetchLogsReport = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (reportMode === 'single') {
        if (filterClassroom) params.append('classroomId', filterClassroom);
        if (filterDate) params.append('date', filterDate);
      } else {
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
      }

      const res = await fetch(`/api/reports?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error('Failed to fetch logs report:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Absentees Report
  const fetchAbsenteesReport = async () => {
    setLoadingAbsentees(true);
    try {
      const params = new URLSearchParams();
      params.append('section', absenteeSection);
      
      const targetDate = absenteeDate || todayDate;
      if (absenteeReportMode === 'single') {
        params.append('date', targetDate);
      } else {
        if (absenteeStartDate) params.append('startDate', absenteeStartDate);
        if (absenteeEndDate) params.append('endDate', absenteeEndDate);
      }

      const res = await fetch(`/api/reports/absentees?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setAbsenteesList(data);
    } catch (error) {
      console.error('Failed to fetch absentees report:', error);
    } finally {
      setLoadingAbsentees(false);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
  }, [token]);

  useEffect(() => {
    if (reportType === 'faculty') {
      fetchLogsReport();
    }
  }, [token, reportType, reportMode, filterClassroom, filterDate, startDate, endDate]);

  useEffect(() => {
    if (reportType === 'absentees') {
      fetchAbsenteesReport();
    }
  }, [token, reportType, absenteeReportMode, absenteeSection, absenteeDate, absenteeStartDate, absenteeEndDate]);

  // Real-time logs updates via socket
  useEffect(() => {
    if (!socket) return;

    socket.on('classroom_status_update', () => {
      if (reportType === 'faculty') {
        fetchLogsReport();
      }
    });

    return () => {
      socket.off('classroom_status_update');
    };
  }, [socket, reportType, reportMode, filterClassroom, filterDate, startDate, endDate]);

  // Excel/CSV Export for Faculty Logs
  const handleExportCSV = () => {
    if (logs.length === 0) return;

    const headers = ['Date', 'Classroom', 'Faculty', 'Subject', 'Period', 'Entry Time', 'Status'];
    const rows = logs.map((log) => [
      new Date(log.createdAt).toLocaleDateString(),
      `${log.classroom.roomNumber} - ${log.classroom.className}`,
      log.facultyName,
      log.subjectName,
      `Period ${log.periodNo} (${log.timeSlot})`,
      log.entryTime ? new Date(log.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A',
      log.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Faculty_Tracker_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Export for Absentees Report (Trigger Backend Excel XLSX with auto-fit)
  const handleExportAbsenteesCSV = () => {
    const params = new URLSearchParams();
    params.append('section', absenteeSection);
    params.append('format', 'excel');
    
    const targetDate = absenteeDate || todayDate;
    if (absenteeReportMode === 'single') {
      params.append('date', targetDate);
    } else {
      if (absenteeStartDate) params.append('startDate', absenteeStartDate);
      if (absenteeEndDate) params.append('endDate', absenteeEndDate);
    }
    
    // Open in a new tab/iframe to trigger native browser attachment download
    window.open(`/api/reports/absentees?${params.toString()}`, '_blank');
  };

  // PDF Export - stand-alone academic document printing route
  const handlePrintPDF = () => {
    if (reportType === 'faculty') {
      window.print();
    } else {
      const params = new URLSearchParams();
      params.append('section', absenteeSection);
      
      const targetDate = absenteeDate || todayDate;
      if (absenteeReportMode === 'single') {
        params.append('date', targetDate);
      } else {
        if (absenteeStartDate) params.append('startDate', absenteeStartDate);
        if (absenteeEndDate) params.append('endDate', absenteeEndDate);
      }
      
      // Open print page in a new window/tab
      window.open(`/print-report?${params.toString()}`, '_blank');
    }
  };


  return (
    <div className="space-y-6">
      
      {/* Page Header (Hidden on print) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <div>
          <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark tracking-tight">
            {reportType === 'faculty' ? 'Faculty Entry Logs' : 'Absentees & Caller Tracking Logs'}
          </h2>
          <p className="text-sm text-customText-muted dark:text-customText-mutedDark">
            {reportType === 'faculty' 
              ? 'Verify entrance logs, apply custom filter criteria, and download reports' 
              : 'Audit logged student absentees, parent calling statuses, and entered reasons'}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={reportType === 'faculty' ? handleExportCSV : handleExportAbsenteesCSV}
            disabled={reportType === 'faculty' ? logs.length === 0 : absenteesList.length === 0}
            className="btn-secondary"
            title="Download CSV"
          >
            <FileSpreadsheet size={16} />
            <span>Export Excel</span>
          </button>
          
          <button
            onClick={handlePrintPDF}
            disabled={reportType === 'faculty' ? logs.length === 0 : absenteesList.length === 0}
            className="btn-primary"
            title="Print Report"
          >
            <Printer size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Top Report Type Toggle tabs (Hidden for Absent Controller who only views absentees) */}
      {user?.role !== 'ABSENT_CONTROLLER' && (
        <div className="flex bg-slate-100 dark:bg-slate-950/45 p-1 rounded-xl border border-slate-200/40 dark:border-slate-800/60 max-w-md no-print mb-6">
          <button
            onClick={() => setReportType('faculty')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
              reportType === 'faculty'
                ? 'bg-white dark:bg-slate-900 text-primary-dark dark:text-primary shadow-sm'
                : 'text-customText-muted dark:text-customText-mutedDark hover:text-customText'
            }`}
          >
            Faculty Entry Logs
          </button>
          <button
            onClick={() => setReportType('absentees')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
              reportType === 'absentees'
                ? 'bg-white dark:bg-slate-900 text-primary-dark dark:text-primary shadow-sm'
                : 'text-customText-muted dark:text-customText-mutedDark hover:text-customText'
            }`}
          >
            Absentees & Call Report
          </button>
        </div>
      )}

      {/* FILTER TOOLBAR PANEL FOR FACULTY LOGS */}
      {reportType === 'faculty' && (
        <div className="glass-card p-5 border border-slate-200/50 dark:border-slate-800/40 no-print space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-950/40 p-1 rounded-xl border border-slate-200/40 dark:border-slate-800/60 max-w-md">
            <button
              onClick={() => {
                setReportMode('single');
                setStartDate('');
                setEndDate('');
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                reportMode === 'single'
                  ? 'bg-white dark:bg-slate-900 text-primary-dark dark:text-primary shadow-sm'
                  : 'text-customText-muted dark:text-customText-mutedDark hover:text-customText'
              }`}
            >
              By Classroom and Date
            </button>
            <button
              onClick={() => {
                setReportMode('range');
                setFilterClassroom('');
                setFilterDate('');
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                reportMode === 'range'
                  ? 'bg-white dark:bg-slate-900 text-primary-dark dark:text-primary shadow-sm'
                  : 'text-customText-muted dark:text-customText-mutedDark hover:text-customText'
              }`}
            >
              All Classrooms with Date Range
            </button>
          </div>

          <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase text-customText-muted dark:text-customText-mutedDark tracking-wider">
            <Filter size={14} />
            <span>Filter Criteria ({reportMode === 'single' ? 'Classroom & Date' : 'All Classrooms Date Range'})</span>
          </div>

          {reportMode === 'single' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase mb-1.5">
                  Classroom
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Building size={14} />
                  </span>
                  <select
                    value={filterClassroom}
                    onChange={(e) => setFilterClassroom(e.target.value)}
                    className="glass-input pl-9 text-xs py-2.5"
                  >
                    <option value="">All Classrooms</option>
                    {classrooms.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.className} ({c.roomNumber})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase mb-1.5">
                  Report Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Calendar size={14} />
                  </span>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="glass-input pl-9 text-xs py-2.5"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase mb-1.5">
                  Start Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Calendar size={14} />
                  </span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="glass-input pl-9 text-xs py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase mb-1.5">
                  End Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Calendar size={14} />
                  </span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="glass-input pl-9 text-xs py-2.5"
                  />
                </div>
              </div>
            </div>
          )}

          {(filterClassroom || filterDate || startDate || endDate) && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setFilterClassroom('');
                  setFilterDate('');
                  setStartDate('');
                  setEndDate('');
                }}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* FILTER TOOLBAR PANEL FOR ABSENTEES */}
      {reportType === 'absentees' && (
        <div className="glass-card p-5 border border-slate-200/50 dark:border-slate-800/40 no-print space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-950/40 p-1 rounded-xl border border-slate-200/40 dark:border-slate-800/60 max-w-md">
            <button
              onClick={() => {
                setAbsenteeReportMode('single');
                setAbsenteeStartDate('');
                setAbsenteeEndDate('');
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                absenteeReportMode === 'single'
                  ? 'bg-white dark:bg-slate-900 text-primary-dark dark:text-primary shadow-sm'
                  : 'text-customText-muted dark:text-customText-mutedDark hover:text-customText'
              }`}
            >
              Daily Report
            </button>
            <button
              onClick={() => {
                setAbsenteeReportMode('range');
                setAbsenteeDate('');
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                absenteeReportMode === 'range'
                  ? 'bg-white dark:bg-slate-900 text-primary-dark dark:text-primary shadow-sm'
                  : 'text-customText-muted dark:text-customText-mutedDark hover:text-customText'
              }`}
            >
              Date Range Report
            </button>
          </div>

          <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase text-customText-muted dark:text-customText-mutedDark tracking-wider">
            <Filter size={14} />
            <span>Filter Criteria ({absenteeReportMode === 'single' ? 'Daily' : 'Date Range'})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase mb-1.5">
                Class Section
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Building size={14} />
                </span>
                <select
                  value={absenteeSection}
                  onChange={(e) => setAbsenteeSection(e.target.value)}
                  className="glass-input pl-9 text-xs py-2.5"
                >
                  <option value="All">All Sections</option>
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.className}>
                      {c.className}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {absenteeReportMode === 'single' ? (
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase mb-1.5">
                  Report Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Calendar size={14} />
                  </span>
                  <input
                    type="date"
                    value={absenteeDate || todayDate}
                    onChange={(e) => setAbsenteeDate(e.target.value)}
                    className="glass-input pl-9 text-xs py-2.5"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase mb-1.5">
                    Start Date
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Calendar size={14} />
                    </span>
                    <input
                      type="date"
                      value={absenteeStartDate}
                      onChange={(e) => setAbsenteeStartDate(e.target.value)}
                      className="glass-input pl-9 text-xs py-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase mb-1.5">
                    End Date
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Calendar size={14} />
                    </span>
                    <input
                      type="date"
                      value={absenteeEndDate}
                      onChange={(e) => setAbsenteeEndDate(e.target.value)}
                      className="glass-input pl-9 text-xs py-2.5"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {(absenteeSection !== 'All' || absenteeDate || absenteeStartDate || absenteeEndDate) && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setAbsenteeSection('All');
                  setAbsenteeDate('');
                  setAbsenteeStartDate('');
                  setAbsenteeEndDate('');
                }}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* PRINT-READY HEADER FOR FACULTY LOGS */}
      {reportType === 'faculty' && (
        <div className="hidden print:block mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">Classroom Presence Logs Report</h1>
          <p className="text-xs text-slate-500 mt-1">Generated dynamically from Lectra</p>
          <div className="flex justify-center gap-6 text-[10px] text-slate-500 mt-2 font-medium">
            <span>Date Run: {new Date().toLocaleDateString()}</span>
            {reportMode === 'single' ? (
              <>
                {filterClassroom && <span>Classroom Filter Applied</span>}
                {filterDate && <span>Report Date: {new Date(filterDate).toLocaleDateString()}</span>}
              </>
            ) : (
              <>
                {startDate && endDate && <span>Date Range: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>}
              </>
            )}
          </div>
        </div>
      )}

      {/* PRINT-READY HEADER FOR ABSENTEES */}
      {reportType === 'absentees' && (
        <div className="hidden print:block mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">Absentees & Call Logs Report</h1>
          <p className="text-xs text-slate-500 mt-1">Generated dynamically from Lectra</p>
          <div className="flex justify-center gap-6 text-[10px] text-slate-500 mt-2 font-medium">
            <span>Date Run: {new Date().toLocaleDateString()}</span>
            <span>Section: {absenteeSection === 'All' ? 'All Sections' : absenteeSection}</span>
            {absenteeReportMode === 'single' ? (
              <span>Report Date: {new Date(absenteeDate || todayDate).toLocaleDateString()}</span>
            ) : (
              <span>Date Range: {absenteeStartDate ? new Date(absenteeStartDate).toLocaleDateString() : 'N/A'} - {absenteeEndDate ? new Date(absenteeEndDate).toLocaleDateString() : 'N/A'}</span>
            )}
          </div>
        </div>
      )}

      {/* REPORT LOG DATA GRID FOR FACULTY LOGS */}
      {reportType === 'faculty' && (
        <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/40 print-card">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
              <p className="text-xs text-customText-muted">Loading logs database...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Classroom</th>
                    <th className="pb-3">Faculty</th>
                    <th className="pb-3">Subject</th>
                    <th className="pb-3">Period</th>
                    <th className="pb-3">Entry Time</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-customText dark:text-customText-dark">
                  {logs.map((log) => {
                    const isPresent = log.status === 'Present';
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-900/10">
                        <td className="py-3.5 text-xs font-medium text-customText-muted dark:text-customText-mutedDark">
                          {new Date(log.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 font-bold">
                          {log.classroom.roomNumber} <span className="font-normal text-xs text-customText-muted">({log.classroom.className})</span>
                        </td>
                        <td className="py-3.5 font-medium">{log.facultyName}</td>
                        <td className="py-3.5 text-customText-muted dark:text-customText-mutedDark">
                          {log.subjectName}
                        </td>
                        <td className="py-3.5 text-xs text-customText-muted dark:text-customText-mutedDark">
                          Period {log.periodNo} <span className="block text-[9px] font-semibold">({log.timeSlot})</span>
                        </td>
                        <td className="py-3.5 text-xs font-semibold text-customText-muted dark:text-customText-mutedDark">
                          {log.entryTime 
                            ? new Date(log.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                            : <span className="text-red-500/80 italic font-medium">N/A</span>
                          }
                        </td>
                        <td className="py-3.5 text-right">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                            isPresent 
                              ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' 
                              : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {logs.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-customText-muted dark:text-customText-mutedDark text-sm">
                        No matching faculty entry logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* REPORT LOG DATA GRID FOR ABSENTEES */}
      {reportType === 'absentees' && (
        <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/40 print-card">
          {loadingAbsentees ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
              <p className="text-xs text-customText-muted">Loading absentees database...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Roll Number</th>
                    <th className="pb-3">Student Name</th>
                    <th className="pb-3">Section</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Mobiles</th>
                    <th className="pb-3">Call Tracking</th>
                    <th className="pb-3">Reason</th>
                    <th className="pb-3 text-right">Called By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-customText dark:text-customText-dark">
                  {absenteesList.map((item) => {
                    const isLate = item.status === 'Late';
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-900/10 text-xs">
                        <td className="py-3.5 font-medium text-customText-muted dark:text-customText-mutedDark">
                          {item.date}
                        </td>
                        <td className="py-3.5 font-semibold text-primary">
                          {item.rollNumber}
                        </td>
                        <td className="py-3.5 font-bold">{item.name}</td>
                        <td className="py-3.5 font-medium text-customText-muted">
                          {item.section}
                        </td>
                        <td className="py-3.5">
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                            isLate 
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' 
                              : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 space-y-0.5">
                          <div className="font-semibold">S: {item.studentMobile}</div>
                          <div className="text-[10px] text-customText-muted">P: {item.parentMobile}</div>
                        </td>
                        <td className="py-3.5">
                          {item.called ? (
                            <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              item.answered 
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                                : 'bg-red-500/10 text-red-700 dark:text-red-400'
                            }`}>
                              {item.answered ? 'Answered' : 'Unanswered'}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Not Called</span>
                          )}
                        </td>
                        <td className="py-3.5 font-medium max-w-[150px] truncate" title={item.reason}>
                          {item.reason ? `"${item.reason}"` : <span className="text-slate-400">-</span>}
                        </td>
                        <td className="py-3.5 text-right font-medium text-customText-muted">
                          {item.calledBy || <span className="text-slate-400">-</span>}
                        </td>
                      </tr>
                    );
                  })}

                  {absenteesList.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-12 text-customText-muted dark:text-customText-mutedDark text-sm">
                        No matching absentees or late logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Reports;
