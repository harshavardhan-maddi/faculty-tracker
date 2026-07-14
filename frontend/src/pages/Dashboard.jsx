import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import StatCard from '../components/StatCard';
import ClassroomCard from '../components/ClassroomCard';
import ActivityFeed from '../components/ActivityFeed';
import Loading from '../components/Loading';
import { 
  Building, 
  Users2, 
  UserSquare, 
  Percent, 
  Calendar, 
  Search, 
  X,
  History,
  Info,
  Edit,
  UserPlus,
  Users,
  AlertCircle,
  Phone,
  PhoneCall,
  CalendarDays,
  Plus,
  Save,
  CheckCircle2,
  Trash2
} from 'lucide-react';

const Dashboard = () => {
  const { token, user } = useAuth();
  const { socket } = useSocket();

  // Active Tab: 'faculty', 'students', 'absentees' (Only HOD sees student/absent tabs)
  const [activeTab, setActiveTab] = useState('faculty');

  // Existing Faculty Tracker States
  const [classrooms, setClassrooms] = useState([]);
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Detail Modal States
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [classroomDetails, setClassroomDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [modalDateFilter, setModalDateFilter] = useState('');

  // Edit Classroom States
  const [isEditing, setIsEditing] = useState(false);
  const [editRoomNumber, setEditRoomNumber] = useState('');
  const [editClassName, setEditClassName] = useState('');
  const [editError, setEditError] = useState('');
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Tracking control & Clear history states
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [loadingTracking, setLoadingTracking] = useState(true);
  const [toggleSubmitting, setToggleSubmitting] = useState(false);
  const [clearAction, setClearAction] = useState('');
  const [clearClassroomId, setClearClassroomId] = useState('');
  const [clearStartDate, setClearStartDate] = useState('');
  const [clearEndDate, setClearEndDate] = useState('');
  const [clearSubmitting, setClearSubmitting] = useState(false);
  const [clearSuccess, setClearSuccess] = useState('');
  const [clearError, setClearError] = useState('');

  // HOD Student Registry States
  const [students, setStudents] = useState([]);
  const [searchStudentQuery, setSearchStudentQuery] = useState('');
  const [filterStudentSection, setFilterStudentSection] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  
  // Student form fields
  const [studentName, setStudentName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [studentSection, setStudentSection] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [parentMobile, setParentMobile] = useState('');
  const [studentSubmitError, setStudentSubmitError] = useState('');
  const [studentSubmitSuccess, setStudentSubmitSuccess] = useState('');
  const [studentSubmitting, setStudentSubmitting] = useState(false);

  // Edit Student States
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentRoll, setEditStudentRoll] = useState('');
  const [editStudentSection, setEditStudentSection] = useState('');
  const [editStudentMobile, setEditStudentMobile] = useState('');
  const [editParentMobile, setEditParentMobile] = useState('');
  const [editStudentSubmitError, setEditStudentSubmitError] = useState('');
  const [editStudentSubmitSuccess, setEditStudentSubmitSuccess] = useState('');
  const [editStudentSubmitting, setEditStudentSubmitting] = useState(false);

  // HOD Student Registry - Bulk Upload States
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkSection, setBulkSection] = useState('');
  const [bulkError, setBulkError] = useState('');
  const [bulkSuccess, setBulkSuccess] = useState('');
  const [bulkSubmitting, setBulkSubmitting] = useState(false);

  // HOD Absentees States
  const [absentees, setAbsentees] = useState([]);
  const [absenteesSection, setAbsenteesSection] = useState('All');
  const [absenteesDate, setAbsenteesDate] = useState('');
  const [loadingAbsentees, setLoadingAbsentees] = useState(false);
  const [absenteesError, setAbsenteesError] = useState('');

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDateString();

  const fetchTrackingStatus = async () => {
    try {
      const res = await fetch('/api/settings/tracking', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setTrackingEnabled(data.trackingEnabled);
      }
    } catch (err) {
      console.error('Failed to fetch tracking status:', err);
    } finally {
      setLoadingTracking(false);
    }
  };

  const handleToggleTracking = async () => {
    if (toggleSubmitting) return;
    setToggleSubmitting(true);
    try {
      const newValue = !trackingEnabled;
      const res = await fetch('/api/settings/tracking', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ trackingEnabled: newValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update tracking status');
      setTrackingEnabled(data.trackingEnabled);
      fetchDashboardData(true);
    } catch (err) {
      console.error('Failed to toggle tracking:', err);
    } finally {
      setToggleSubmitting(false);
    }
  };

  const handleClearHistory = async (e) => {
    e.preventDefault();
    if (!clearAction) return;

    let confirmMsg = 'Are you sure you want to perform this clear logs action? This cannot be undone.';
    if (clearAction === 'all') {
      confirmMsg = '⚠️ WARNING: Are you sure you want to clear ALL entry logs history across all classrooms? This will permanently delete all records.';
    }
    if (!window.confirm(confirmMsg)) return;

    setClearSubmitting(true);
    setClearError('');
    setClearSuccess('');

    try {
      const res = await fetch('/api/settings/clear-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: clearAction,
          classroomId: clearClassroomId ? parseInt(clearClassroomId) : undefined,
          startDate: clearStartDate || undefined,
          endDate: clearEndDate || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to clear log history');

      setClearSuccess(data.message || 'Logs history cleared successfully.');
      setClearAction('');
      setClearClassroomId('');
      setClearStartDate('');
      setClearEndDate('');
      fetchDashboardData();
    } catch (err) {
      setClearError(err.message);
    } finally {
      setClearSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClassroom) return;
    setEditSubmitting(true);
    setEditError('');

    try {
      const res = await fetch(`/api/classrooms/${selectedClassroom.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ roomNumber: editRoomNumber, className: editClassName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update classroom');

      setSelectedClassroom(data);
      if (classroomDetails) {
        setClassroomDetails(prev => ({
          ...prev,
          roomNumber: data.roomNumber,
          className: data.className
        }));
      }

      setIsEditing(false);
      fetchDashboardData(true);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditSubmitting(false);
    }
  };

  const fetchDashboardData = async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      
      const classRes = await fetch('/api/classrooms', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const classData = await classRes.json();
      if (!classRes.ok) {
        throw new Error(classData.message || 'Failed to fetch classrooms');
      }
      setClassrooms(classData);
      
      if (classData.length > 0 && !studentSection) {
        setStudentSection(classData[0].className);
        setFilterStudentSection('');
      }

      const statsRes = await fetch('/api/reports/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const statsData = await statsRes.json();
      if (!statsRes.ok) {
        throw new Error(statsData.message || 'Failed to fetch stats');
      }
      setStats(statsData.stats);
      setActivity(statsData.recentActivity);
    } catch (err) {
      setError(err.message || 'Failed to load HOD metrics');
    } finally {
      setLoading(false);
    }
  };

  // Fetch student directories
  const fetchStudents = async () => {
    try {
      setError('');
      // Always fetch all students so we can display section/overall counts and filter locally in React memory.
      const url = '/api/student-attendance/students';
      
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setStudents(data);
      } else {
        setError(data.message || 'Failed to fetch students list');
      }
    } catch (err) {
      setError('Network error fetching students directory');
    }
  };

  const getSectionCount = (className) => {
    return students.filter(s => s.section === className).length;
  };

  // Fetch absentees today
  const fetchAbsentees = async () => {
    if (!absenteesSection) return;
    const targetDate = absenteesDate || todayDate;
    setLoadingAbsentees(true);
    setAbsenteesError('');
    try {
      const res = await fetch(
        `/api/student-attendance/absentees?section=${encodeURIComponent(absenteesSection)}&date=${targetDate}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) {
        setAbsentees(data);
      } else {
        setAbsenteesError(data.message || 'Failed to fetch absentees');
      }
    } catch (err) {
      setAbsenteesError('Error connecting to attendance server');
    } finally {
      setLoadingAbsentees(false);
    }
  };

  useEffect(() => {
    fetchTrackingStatus();
    fetchDashboardData();
  }, [token]);

  useEffect(() => {
    if (activeTab === 'students') {
      fetchStudents();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'absentees') {
      fetchAbsentees();
    }
  }, [activeTab, absenteesSection, absenteesDate]);

  // Handle live WebSockets updates
  useEffect(() => {
    if (!socket) return;
    
    socket.on('log_added', (data) => {
      fetchDashboardData(true);
    });

    socket.on('logs_cleared', () => {
      fetchDashboardData(true);
    });

    return () => {
      socket.off('log_added');
      socket.off('logs_cleared');
    };
  }, [socket]);

  const fetchClassroomDetails = async (classroomId, dateStr = '') => {
    setLoadingDetails(true);
    try {
      const url = `/api/classrooms/${classroomId}${dateStr ? `?date=${dateStr}` : ''}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setClassroomDetails(data);
    } catch (err) {
      console.error('Failed to load classroom details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCardClick = async (classroomItem) => {
    setSelectedClassroom(classroomItem);
    setModalDateFilter('');
    fetchClassroomDetails(classroomItem.id, '');
  };

  const handleModalDateChange = (newDate) => {
    setModalDateFilter(newDate);
    if (selectedClassroom) {
      fetchClassroomDetails(selectedClassroom.id, newDate);
    }
  };

  // Add Student Handler
  const handleAddStudentSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !studentRoll || !studentSection || !studentMobile || !parentMobile) {
      setStudentSubmitError('All fields are required');
      return;
    }

    setStudentSubmitting(true);
    setStudentSubmitError('');
    setStudentSubmitSuccess('');

    try {
      const res = await fetch('/api/student-attendance/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rollNumber: studentRoll,
          name: studentName,
          section: studentSection,
          studentMobile,
          parentMobile
        })
      });

      const data = await res.json();
      if (res.ok) {
        setStudentSubmitSuccess(`Student "${studentName}" added successfully.`);
        setStudentName('');
        setStudentRoll('');
        setStudentMobile('');
        setParentMobile('');
        fetchStudents();
        setTimeout(() => {
          setShowAddStudentModal(false);
          setStudentSubmitSuccess('');
        }, 1500);
      } else {
        setStudentSubmitError(data.message || 'Failed to add student');
      }
    } catch (err) {
      setStudentSubmitError('Network connection issue');
    } finally {
      setStudentSubmitting(false);
    }
  };

  const handleEditStudentClick = (student) => {
    setEditingStudent(student);
    setEditStudentName(student.name);
    setEditStudentRoll(student.rollNumber);
    setEditStudentSection(student.section);
    setEditStudentMobile(student.studentMobile || '');
    setEditParentMobile(student.parentMobile || '');
    setEditStudentSubmitError('');
    setEditStudentSubmitSuccess('');
    setShowEditStudentModal(true);
  };

  const handleEditStudentSubmit = async (e) => {
    e.preventDefault();
    if (!editStudentName || !editStudentRoll || !editStudentSection || !editStudentMobile || !editParentMobile) {
      setEditStudentSubmitError('All fields are required');
      return;
    }

    setEditStudentSubmitting(true);
    setEditStudentSubmitError('');
    setEditStudentSubmitSuccess('');

    try {
      const res = await fetch(`/api/student-attendance/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editStudentName,
          rollNumber: editStudentRoll,
          section: editStudentSection,
          studentMobile: editStudentMobile,
          parentMobile: editParentMobile
        })
      });

      const data = await res.json();
      if (res.ok) {
        setEditStudentSubmitSuccess('Student details updated successfully.');
        fetchStudents();
        fetchDashboardData(true); // Silent update of classroom student counts
        setTimeout(() => {
          setShowEditStudentModal(false);
          setEditingStudent(null);
          setEditStudentSubmitSuccess('');
        }, 1500);
      } else {
        setEditStudentSubmitError(data.message || 'Failed to update student details');
      }
    } catch (err) {
      setEditStudentSubmitError('Network connection issue');
    } finally {
      setEditStudentSubmitting(false);
    }
  };

  const handleMakeCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDeleteStudent = async (student) => {
    if (!window.confirm(`Are you sure you want to delete student ${student.name} (${student.rollNumber})?`)) return;
    
    setError('');
    try {
      const res = await fetch(`/api/student-attendance/students/${student.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        fetchStudents();
      } else {
        setError(data.message || 'Failed to delete student');
      }
    } catch (err) {
      setError('Error deleting student');
    }
  };

  const parseCSVText = (text) => {
    const lines = text.split('\n');
    const parsed = [];
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      
      const parts = line.split(/[,\t]/).map(p => p.trim());
      if (parts.length >= 4) {
        parsed.push({
          rollNumber: parts[0],
          name: parts[1],
          studentMobile: parts[2],
          parentMobile: parts[3]
        });
      }
    }
    return parsed;
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!bulkText || !bulkSection) {
      setBulkError('Both CSV text and target section are required');
      return;
    }

    const studentsToUpload = parseCSVText(bulkText);
    if (studentsToUpload.length === 0) {
      setBulkError('Could not parse any valid student records. Check your format.');
      return;
    }

    setBulkSubmitting(true);
    setBulkError('');
    setBulkSuccess('');

    try {
      const res = await fetch('/api/student-attendance/students/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          section: bulkSection,
          students: studentsToUpload
        })
      });

      const data = await res.json();
      if (res.ok) {
        setBulkSuccess(data.message || 'Students imported successfully');
        setBulkText('');
        fetchStudents();
        setTimeout(() => {
          setShowBulkModal(false);
          setBulkSuccess('');
        }, 1500);
      } else {
        setBulkError(data.message || 'Failed to import students');
      }
    } catch (err) {
      setBulkError('Network connection issue');
    } finally {
      setBulkSubmitting(false);
    }
  };

  // Helper to determine status priority for classroom card sorting
  // Top: Not Entered (1), Pending (2)
  // Mid: No Active Period / College is on Holiday / others (3)
  // Bottom: Present (4)
  const getStatusPriority = (status) => {
    switch (status) {
      case 'Not Entered':
        return 1;
      case 'Pending':
        return 2;
      case 'No Active Period':
      case 'College is on Holiday':
      case 'Free Period':
      case 'No Class':
        return 3;
      case 'Present':
        return 4;
      default:
        return 5;
    }
  };

  // Filter classrooms by search query and sort by priority (Not Entered & Pending at top, Present at bottom)
  const filteredClassrooms = classrooms
    .filter((c) =>
      c.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => getStatusPriority(a.status) - getStatusPriority(b.status));

  // Filter registered students list
  const filteredStudentsList = students.filter((s) =>
    s.name.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchStudentQuery.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      
      {/* Tab Navigation header (Only for HOD roles) */}
      {user?.role === 'HOD' && (
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
            <span>Faculty Monitor</span>
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
            <span>Student Registry</span>
          </button>
          <button
            onClick={() => setActiveTab('absentees')}
            className={`flex items-center gap-2 py-3 px-6 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'absentees' 
                ? 'border-primary text-primary-dark dark:text-primary font-bold' 
                : 'border-transparent text-customText-muted dark:text-customText-mutedDark hover:text-customText'
            }`}
          >
            <AlertCircle size={16} />
            <span>Absentees Tracking</span>
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {/* VIEW 1: FACULTY MONITOR (Original Dashboard content) */}
      {activeTab === 'faculty' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {stats && (
              <div className="lg:col-span-1 flex">
                <StatCard
                  title="Total Classrooms"
                  value={stats.classrooms}
                  icon={Building}
                  description={trackingEnabled ? "Monitoring live" : "Tracking is disabled"}
                />
              </div>
            )}

            {(user?.role === 'HOD' || user?.role === 'SUB_ADMIN') && (
              <div className="lg:col-span-2 glass-card p-5 border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-extrabold text-sm text-customText dark:text-customText-dark uppercase tracking-wider">
                      System Settings & Controls
                    </h3>
                    <p className="text-[11px] text-customText-muted dark:text-customText-mutedDark mt-0.5">
                      Configure tracking status and manage database records
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-customText">
                      {trackingEnabled ? (
                        <span className="text-green-600 dark:text-green-400 font-extrabold uppercase bg-green-500/10 px-2 py-0.5 rounded border border-green-500/10">Classes Running</span>
                      ) : (
                        <span className="text-purple-600 dark:text-purple-400 font-extrabold uppercase bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/10">College on Holiday</span>
                      )}
                    </span>
                    
                    <button
                      type="button"
                      onClick={handleToggleTracking}
                      disabled={toggleSubmitting}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        trackingEnabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          trackingEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-850 pt-3">
                  <form onSubmit={handleClearHistory} className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="w-full sm:w-auto">
                        <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-1">
                          Clear Log History Action
                        </label>
                        <select
                          value={clearAction}
                          onChange={(e) => {
                            setClearAction(e.target.value);
                            setClearClassroomId('');
                            setClearStartDate('');
                            setClearEndDate('');
                            setClearSuccess('');
                            setClearError('');
                          }}
                          className="glass-input text-xs py-1.5 min-w-[200px]"
                        >
                          <option value="">Select action...</option>
                          <option value="all">Clear All Log History</option>
                          <option value="classroom">Clear Logs by Classroom</option>
                          <option value="date_range">Clear Logs by Date Range</option>
                        </select>
                      </div>

                      {clearAction && (
                        <button
                          type="submit"
                          disabled={clearSubmitting}
                          className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-750 text-white text-xs font-bold rounded-xl shadow transition-all active:scale-[0.98] shrink-0"
                        >
                          {clearSubmitting ? 'Clearing...' : 'Execute Clear'}
                        </button>
                      )}
                    </div>

                    {clearAction === 'classroom' && (
                      <div className="bg-slate-50 dark:bg-slate-950/20 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                        <div>
                          <label className="block text-[9px] font-bold text-customText-muted uppercase mb-1">
                            Target Classroom
                          </label>
                          <select
                            required
                            value={clearClassroomId}
                            onChange={(e) => setClearClassroomId(e.target.value)}
                            className="glass-input text-xs py-1.5"
                          >
                            <option value="">Choose classroom...</option>
                            {classrooms.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.className} ({c.roomNumber})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {clearAction === 'date_range' && (
                      <div className="bg-slate-50 dark:bg-slate-950/20 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                        <div>
                          <label className="block text-[9px] font-bold text-customText-muted uppercase mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            required
                            value={clearStartDate}
                            onChange={(e) => setClearStartDate(e.target.value)}
                            className="glass-input text-xs py-1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-customText-muted uppercase mb-1">
                            End Date
                          </label>
                          <input
                            type="date"
                            required
                            value={clearEndDate}
                            onChange={(e) => setClearEndDate(e.target.value)}
                            className="glass-input text-xs py-1.5"
                          />
                        </div>
                      </div>
                    )}

                    {clearSuccess && (
                      <p className="text-[11px] text-green-600 dark:text-green-400 font-bold bg-green-500/10 px-2.5 py-1.5 rounded-lg border border-green-500/15">
                        ✅ {clearSuccess}
                      </p>
                    )}

                    {clearError && (
                      <p className="text-[11px] text-red-600 dark:text-red-400 font-bold bg-red-500/10 px-2.5 py-1.5 rounded-lg border border-red-500/15">
                        ⚠️ {clearError}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Classroom Live grid row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 backdrop-blur-md">
                <div>
                  <h3 className="font-extrabold text-lg text-customText dark:text-customText-dark">
                    Live Classroom Monitor
                  </h3>
                  <p className="text-xs text-customText-muted dark:text-customText-mutedDark">
                    Classrooms color code dynamically based on current timetabled period status
                  </p>
                </div>
                
                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-customText-muted dark:text-customText-mutedDark">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search room or class..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredClassrooms.map((c) => (
                  <ClassroomCard
                    key={c.id}
                    roomNumber={c.roomNumber}
                    className={c.className}
                    status={c.status}
                    currentPeriod={c.currentPeriod}
                    studentCount={c.studentCount}
                    onClick={() => handleCardClick(c)}
                  />
                ))}

                {filteredClassrooms.length === 0 && (
                  <div className="col-span-2 text-center py-20 bg-slate-50/50 dark:bg-slate-900/30 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-customText-muted dark:text-customText-mutedDark text-sm">
                    No classrooms found matching selection.
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 h-full">
              <ActivityFeed activities={activity} />
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: STUDENT REGISTRY */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-extrabold text-lg text-customText dark:text-customText-dark">
                Registered Students Registry
              </h3>
              <p className="text-xs text-customText-muted dark:text-customText-mutedDark">
                Create new student profiles and assign them to specific section/classrooms
              </p>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setShowBulkModal(true);
                  setBulkText('');
                  setBulkSection(classrooms.length > 0 ? classrooms[0].className : '');
                  setBulkError('');
                  setBulkSuccess('');
                }}
                className="btn-secondary flex items-center gap-1.5 text-xs py-2"
              >
                <Plus size={14} />
                <span>Bulk Upload</span>
              </button>
              
              <button
                onClick={() => {
                  setShowAddStudentModal(true);
                  setStudentSubmitError('');
                  setStudentSubmitSuccess('');
                }}
                className="btn-primary flex items-center gap-1.5 text-xs py-2"
              >
                <UserPlus size={14} />
                <span>Register Student</span>
              </button>
            </div>
          </div>

          <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/45 space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
              <div className="relative w-full sm:w-72">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Search name or roll number..."
                  value={searchStudentQuery}
                  onChange={(e) => setSearchStudentQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 glass-input text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-customText-muted uppercase shrink-0">Class Section:</span>
                <select
                  value={filterStudentSection}
                  onChange={(e) => setFilterStudentSection(e.target.value)}
                  className="glass-input text-xs py-2 w-full sm:w-48"
                >
                  <option value="">-- All Sections (Total: {students.length}) --</option>
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.className}>
                      {c.className} ({getSectionCount(c.className)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Count Summary Banner */}
            <div className="flex flex-wrap gap-3 text-xs font-bold mt-2">
              <span className="bg-primary/10 text-primary-dark dark:text-primary px-3 py-1.5 rounded-xl border border-primary/20 flex items-center gap-1.5 shadow-sm">
                👥 Total Registered Students: {students.length}
              </span>
              {filterStudentSection && (
                <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-450 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1.5 shadow-sm">
                  📁 Section "{filterStudentSection}": {getSectionCount(filterStudentSection)} students
                </span>
              )}
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                    <th className="pb-3">Roll Number</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Section/Class</th>
                    <th className="pb-3">Student Mobile</th>
                    <th className="pb-3">Parent's Mobile</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs text-customText dark:text-customText-dark">
                  {filteredStudentsList.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/25 transition-colors">
                      <td className="py-3 font-semibold text-primary">{s.rollNumber}</td>
                      <td className="py-3 font-bold">{s.name}</td>
                      <td className="py-3 font-semibold">{s.section}</td>
                      <td className="py-3">{s.studentMobile}</td>
                      <td className="py-3">
                        <button
                          onClick={() => handleMakeCall(s.parentMobile)}
                          className="flex items-center gap-1 text-primary-dark hover:underline font-semibold"
                        >
                          <PhoneCall size={12} />
                          <span>{s.parentMobile}</span>
                        </button>
                      </td>
                      <td className="py-3 text-right flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditStudentClick(s)}
                          className="p-1 text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit Student details / Transfer section"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(s)}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                          title="Delete Student Profile"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudentsList.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-customText-muted">
                        No students found registered under this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: ABSENTEES TRACKING */}
      {activeTab === 'absentees' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-extrabold text-lg text-customText dark:text-customText-dark">
                CR Attendance hitting Monitor
              </h3>
              <p className="text-xs text-customText-muted dark:text-customText-mutedDark">
                View student absentees and late comers marked by Class Representatives today
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div>
                <select
                  value={absenteesSection}
                  onChange={(e) => setAbsenteesSection(e.target.value)}
                  className="glass-input text-xs py-2"
                >
                  <option value="All">All Sections</option>
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.className}>
                      {c.className}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="date"
                  value={absenteesDate || todayDate}
                  onChange={(e) => setAbsenteesDate(e.target.value)}
                  className="glass-input text-xs py-2"
                />
              </div>
            </div>
          </div>

          {absenteesError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl">
              ⚠️ {absenteesError}
            </div>
          )}

          {loadingAbsentees ? (
            <div className="text-center py-12 text-xs text-customText-muted">Loading attendance data...</div>
          ) : (
            <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/45">
              <h4 className="font-bold text-sm text-customText-muted uppercase tracking-wider mb-6">
                Absentees List ({absentees.length})
              </h4>

              {absentees.length === 0 ? (
                <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed text-customText-muted">
                  No absentees or late entries marked {absenteesSection === 'All' ? '' : `for ${absenteesSection}`} on selected date.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {absentees.map((item) => {
                    const isLate = item.status === 'Late';
                    
                    return (
                      <div
                        key={item.id}
                        className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 relative ${
                          isLate 
                            ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/50' 
                            : 'bg-red-500/5 border-red-500/20 hover:border-red-500/35'
                        }`}
                      >
                        <span className={`absolute top-4 right-4 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                          isLate 
                            ? 'bg-amber-100 text-amber-700 border-amber-250 dark:bg-amber-950/40 dark:text-amber-450 dark:border-amber-800' 
                            : 'bg-red-100 text-red-700 border-red-250 dark:bg-red-950/40 dark:text-red-450 dark:border-red-800'
                        }`}>
                          {item.status}
                        </span>

                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-customText dark:text-customText-dark uppercase">
                            {item.rollNumber}
                          </h4>
                          <span className="text-[11px] text-customText-muted dark:text-customText-mutedDark font-semibold block">
                            {item.name} • {item.section}
                          </span>
                        </div>

                        {/* Call Triggers */}
                        <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/10 space-y-2 text-xs">
                          <div className="flex justify-between items-center text-customText-muted">
                            <span>Student:</span>
                            <span className="font-bold text-customText dark:text-customText-dark">{item.studentMobile}</span>
                          </div>
                          
                          <div className="flex justify-between items-center text-customText-muted">
                            <span>Parent Mobile:</span>
                            <button
                              onClick={() => handleMakeCall(item.parentMobile)}
                              className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-primary-dark/10 hover:bg-primary-dark/20 text-primary-dark font-extrabold transition-all"
                              title="Click to Call Parent"
                            >
                              <PhoneCall size={12} />
                              <span>{item.parentMobile}</span>
                            </button>
                          </div>

                          {/* Call Log details if answered by absent controller */}
                          {item.callLog && (
                            <div className={`mt-2 p-2 rounded-lg text-[11px] ${
                              item.callLog.answered ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-450' : 'bg-red-500/10 text-red-700 dark:text-red-450'
                            }`}>
                              <p className="font-bold">
                                Call {item.callLog.answered ? 'Answered' : 'Not Answered'}
                              </p>
                              {item.callLog.reason && (
                                <p className="italic font-medium">Reason: "{item.callLog.reason}"</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* REGISTRATION MODAL FOR STUDENTS (HOD ONLY) */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAddStudentModal(false)} />
          
          <div className="relative glass-card border border-white/60 w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl animate-fade-in z-10 text-left">
            <div className="flex justify-between items-center pb-3 border-b mb-4">
              <h3 className="font-extrabold text-base text-customText dark:text-customText-dark">
                Add Student Profile
              </h3>
              <button onClick={() => setShowAddStudentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {studentSubmitError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-650 text-xs font-semibold rounded-lg mb-3">
                ⚠️ {studentSubmitError}
              </div>
            )}

            {studentSubmitSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-650 text-xs font-semibold rounded-lg mb-3">
                ✓ {studentSubmitSuccess}
              </div>
            )}

            <form onSubmit={handleAddStudentSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Roll / Register Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 22B81A0501"
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                  className="glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Assigned Section / Class
                </label>
                <select
                  value={studentSection}
                  onChange={(e) => setStudentSection(e.target.value)}
                  className="glass-input text-xs"
                  required
                >
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.className}>
                      {c.className} ({c.roomNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Student Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543201"
                  value={studentMobile}
                  onChange={(e) => setStudentMobile(e.target.value)}
                  className="glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Parent Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9123456701"
                  value={parentMobile}
                  onChange={(e) => setParentMobile(e.target.value)}
                  className="glass-input text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="btn-secondary py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={studentSubmitting}
                  className="btn-primary py-2 text-xs bg-primary-dark"
                >
                  {studentSubmitting ? 'Registering...' : 'Register Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR STUDENTS (HOD ONLY) */}
      {showEditStudentModal && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowEditStudentModal(false)} />
          
          <div className="relative glass-card border border-white/60 w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl animate-fade-in z-10 text-left">
            <div className="flex justify-between items-center pb-3 border-b mb-4">
              <h3 className="font-extrabold text-base text-customText dark:text-customText-dark">
                Edit Student details / Transfer section
              </h3>
              <button onClick={() => setShowEditStudentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {editStudentSubmitError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-650 text-xs font-semibold rounded-lg mb-3 animate-shake">
                ⚠️ {editStudentSubmitError}
              </div>
            )}

            {editStudentSubmitSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-650 text-xs font-semibold rounded-lg mb-3">
                ✓ {editStudentSubmitSuccess}
              </div>
            )}

            <form onSubmit={handleEditStudentSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={editStudentName}
                  onChange={(e) => setEditStudentName(e.target.value)}
                  className="glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Roll / Register Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 22B81A0501"
                  value={editStudentRoll}
                  onChange={(e) => setEditStudentRoll(e.target.value)}
                  className="glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Assigned Section / Class (Transfer Section)
                </label>
                <select
                  value={editStudentSection}
                  onChange={(e) => setEditStudentSection(e.target.value)}
                  className="glass-input text-xs"
                  required
                >
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.className}>
                      {c.className} ({c.roomNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Student Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543201"
                  value={editStudentMobile}
                  onChange={(e) => setEditStudentMobile(e.target.value)}
                  className="glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Parent Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9123456701"
                  value={editParentMobile}
                  onChange={(e) => setEditParentMobile(e.target.value)}
                  className="glass-input text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditStudentModal(false)}
                  className="btn-secondary py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editStudentSubmitting}
                  className="btn-primary py-2 text-xs bg-primary-dark"
                >
                  {editStudentSubmitting ? 'Saving changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK UPLOAD MODAL FOR STUDENTS (HOD ONLY) */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowBulkModal(false)} />
          
          <div className="relative glass-card border border-white/60 w-full max-w-lg p-6 bg-white dark:bg-slate-900 shadow-2xl animate-fade-in z-10 text-left">
            <div className="flex justify-between items-center pb-3 border-b mb-4">
              <h3 className="font-extrabold text-base text-customText dark:text-customText-dark">
                Bulk Student Import (CSV/Text)
              </h3>
              <button onClick={() => setShowBulkModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {bulkError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-655 text-xs font-semibold rounded-lg mb-3">
                ⚠️ {bulkError}
              </div>
            )}

            {bulkSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-655 text-xs font-semibold rounded-lg mb-3">
                ✓ {bulkSuccess}
              </div>
            )}

            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Target Section / Class
                </label>
                <select
                  value={bulkSection}
                  onChange={(e) => setBulkSection(e.target.value)}
                  className="glass-input text-xs"
                  required
                >
                  {classrooms.map((c) => (
                    <option key={c.id} value={c.className}>
                      {c.className} ({c.roomNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-customText-muted uppercase tracking-wider mb-1">
                  Paste Student CSV Data
                </label>
                <textarea
                  rows="8"
                  required
                  placeholder="Format: RollNumber,Name,StudentMobile,ParentMobile&#10;e.g.&#10;22B81A0501,Aarav Mehta,9876543201,9123456701&#10;22B81A0502,Bhavya Sen,9876543202,9123456702"
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  className="w-full glass-input text-xs font-mono p-3 leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary border border-slate-200 dark:border-slate-800 rounded-xl"
                />
                <p className="text-[10px] text-customText-muted mt-1 leading-snug">
                  * Note: Each line must contain four values separated by a comma (,) or a tab (\t). Upserts are supported, so re-importing existing roll numbers updates their details.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="btn-secondary py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bulkSubmitting || classrooms.length === 0}
                  className="btn-primary py-2 text-xs bg-primary-dark"
                >
                  {bulkSubmitting ? 'Importing...' : 'Import Students'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLASSROOM DETAILS MODAL (TIMETABLE & HISTORY LOGS) */}
      {selectedClassroom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => { setSelectedClassroom(null); setIsEditing(false); }} />
          
          <div className="relative glass-card bg-white dark:bg-slate-900 border border-white/60 w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl animate-fade-in z-10">
            <button
              onClick={() => { setSelectedClassroom(null); setIsEditing(false); }}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="mb-6 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 animate-fade-in space-y-3 mr-8">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="font-extrabold text-sm text-customText dark:text-customText-dark">Edit Classroom Info</h3>
                  {editError && <span className="text-[10px] text-red-500 font-bold">⚠️ {editError}</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-1">
                      Room Number
                    </label>
                    <input
                      type="text"
                      required
                      value={editRoomNumber}
                      onChange={(e) => setEditRoomNumber(e.target.value)}
                      className="glass-input text-xs py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-1">
                      Class Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editClassName}
                      onChange={(e) => setEditClassName(e.target.value)}
                      className="glass-input text-xs py-1.5"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t text-xs">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                    disabled={editSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold flex items-center gap-1"
                    disabled={editSubmitting}
                  >
                    {editSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mb-6 flex justify-between items-start mr-8">
                <div>
                  <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                    {selectedClassroom.roomNumber} Detail Monitor
                  </span>
                  <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark">
                    {selectedClassroom.className}
                  </h2>
                </div>
                {(user?.role === 'HOD' || user?.role === 'SUB_ADMIN') && (
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditRoomNumber(selectedClassroom.roomNumber);
                      setEditClassName(selectedClassroom.className);
                      setEditError('');
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-dark hover:underline"
                  >
                    <Edit size={14} />
                    <span>Edit Info</span>
                  </button>
                )}
              </div>
            )}

            {/* Modal Body: Timetable schedule list */}
            {loadingDetails ? (
              <div className="text-center py-20 text-slate-500">Loading schedule...</div>
            ) : classroomDetails ? (
              <div className="space-y-6">
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h3 className="font-bold text-sm text-customText dark:text-customText-dark uppercase tracking-wider flex items-center gap-2">
                      <History size={16} className="text-slate-500" />
                      <span>Class Schedule Period Log History</span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span>Filter Date:</span>
                      <input
                        type="date"
                        value={modalDateFilter}
                        onChange={(e) => handleModalDateChange(e.target.value)}
                        className="glass-input text-xs py-1 px-2.5 max-w-[150px]"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto border rounded-2xl border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-850/40 border-b border-slate-200 dark:border-slate-850 text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider">
                          <th className="py-3 px-4">Period</th>
                          <th className="py-3 px-4">Subject</th>
                          <th className="py-3 px-4">Faculty Assigned</th>
                          <th className="py-3 px-4">Timings</th>
                          <th className="py-3 px-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-customText dark:text-customText-dark">
                        {classroomDetails.schedule?.map((period) => (
                          <tr key={period.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                            <td className="py-3 px-4 font-semibold">{period.periodNo}</td>
                            <td className="py-3 px-4 font-bold">{period.subjectName}</td>
                            <td className="py-3 px-4">{period.facultyName}</td>
                            <td className="py-3 px-4 text-customText-muted dark:text-customText-mutedDark">{period.startTime} - {period.endTime}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold border ${
                                period.status === 'Present' 
                                  ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/10' 
                                  : 'bg-red-500/10 text-red-650 border-red-500/10'
                              }`}>
                                {period.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {classroomDetails.schedule?.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center py-10 text-customText-muted">
                              No logs recorded or scheduled for this date.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
