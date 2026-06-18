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
  const { token } = useAuth();
  const { socket } = useSocket();

  // Logs list
  const [logs, setLogs] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [reportMode, setReportMode] = useState('single'); // 'single' (By Classroom and Date) or 'range' (Date Range)
  const [filterClassroom, setFilterClassroom] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch unique filter options
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

  useEffect(() => {
    fetchFilterOptions();
  }, [token]);

  useEffect(() => {
    fetchLogsReport();
  }, [token, reportMode, filterClassroom, filterDate, startDate, endDate]);

  // Real-time log appending if socket triggers status update
  useEffect(() => {
    if (!socket) return;

    socket.on('classroom_status_update', () => {
      // Re-fetch report data to include new logs in database
      fetchLogsReport();
    });

    return () => {
      socket.off('classroom_status_update');
    };
  }, [socket, reportMode, filterClassroom, filterDate, startDate, endDate]);

  // Excel/CSV Export
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

    // Construct CSV file content
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

  // PDF Export using Browser Print Engine
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header (Hidden on print) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <div>
          <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark tracking-tight">
            Faculty Entry Logs
          </h2>
          <p className="text-sm text-customText-muted dark:text-customText-mutedDark">
            Verify entrance logs, apply custom filter criteria, and download reports
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            disabled={logs.length === 0}
            className="btn-secondary"
            title="Download CSV"
          >
            <FileSpreadsheet size={16} />
            <span>Export Excel</span>
          </button>
          
          <button
            onClick={handlePrintPDF}
            disabled={logs.length === 0}
            className="btn-primary"
            title="Print Report"
          >
            <Printer size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* FILTER TOOLBAR PANEL (Hidden on print) */}
      <div className="glass-card p-5 border border-slate-200/50 dark:border-slate-800/40 no-print space-y-4">
        {/* Toggle mode selector tabs */}
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
            {/* Classroom filter */}
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

            {/* Date filter */}
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
            {/* Start Date filter */}
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

            {/* End Date filter */}
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

        {/* Clear filters buttons */}
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

      {/* PRINT-READY HEADER (Shown ONLY on print) */}
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

      {/* REPORT LOG DATA GRID */}
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

    </div>
  );
};

export default Reports;
