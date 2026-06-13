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
  Info
} from 'lucide-react';

const Dashboard = () => {
  const { token } = useAuth();
  const { socket } = useSocket();

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

  const fetchDashboardData = async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      // 1. Fetch classrooms
      const classRes = await fetch('/api/classrooms', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const classData = await classRes.json();
      if (!classRes.ok) {
        throw new Error(classData.message || 'Failed to fetch classrooms');
      }
      setClassrooms(classData);

      // 2. Fetch stats
      const statsRes = await fetch('/api/reports/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const statsData = await statsRes.json();
      if (!statsRes.ok) {
        throw new Error(statsData.message || 'Failed to fetch stats');
      }
      setStats(statsData.stats);
      setActivity(statsData.recentActivity || []);
      if (error) setError('');
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      if (!isSilent) {
        setError(err.message);
      }
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Set up polling interval to fetch updates periodically (every 5 seconds)
    const interval = setInterval(() => {
      fetchDashboardData(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  // Real-time synchronization via Socket.IO
  useEffect(() => {
    if (!socket) return;

    socket.on('classroom_status_update', (data) => {
      console.log('[Socket Event] Classroom update received:', data);

      // Update Classroom Card state locally
      setClassrooms((prev) =>
        prev.map((c) => {
          if (c.id === data.classroomId) {
            return {
              ...c,
              status: data.status,
              currentPeriod: data.periodNo
                ? {
                    periodNo: data.periodNo,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    facultyName: data.facultyName,
                    subjectName: data.subjectName,
                    entryTime: data.entryTime,
                  }
                : null,
            };
          }
          return c;
        })
      );

      // Add to local activity feed list
      const newAct = {
        id: Date.now().toString(),
        createdAt: new Date(),
        roomNumber: data.roomNumber,
        className: data.className,
        facultyName: data.facultyName,
        subjectName: data.subjectName,
        periodNo: data.periodNo,
        entryTime: data.entryTime,
        status: data.status,
      };

      setActivity((prev) => [newAct, ...prev].slice(0, 15));

      // Trigger stats refresh in background
      fetchStatsBackground();
    });

    return () => {
      socket.off('classroom_status_update');
    };
  }, [socket]);

  const fetchStatsBackground = async () => {
    try {
      const statsRes = await fetch('/api/reports/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const statsData = await statsRes.json();
      setStats(statsData.stats);
    } catch (error) {
      console.error('Stats reload failed:', error);
    }
  };

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

  // Filter classrooms by search query
  const filteredClassrooms = classrooms.filter((c) =>
    c.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl">
          ⚠️ {error}
        </div>
      )}
      
      {/* Overview stats cards Row */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Total Classrooms"
            value={stats.classrooms}
            icon={Building}
            description="Monitoring live"
          />
          <StatCard
            title="Faculty Entries Today"
            value={stats.presentToday}
            icon={Users2}
            description="Total successful entries logged today"
          />
        </div>
      )}

      {/* Main Grid: Card Grid + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Classrooms search & Grid */}
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
            
            {/* Search inputs */}
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

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredClassrooms.map((c) => (
              <ClassroomCard
                key={c.id}
                roomNumber={c.roomNumber}
                className={c.className}
                status={c.status}
                currentPeriod={c.currentPeriod}
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

        {/* Right Side: Timeline Activity Feed */}
        <div className="lg:col-span-1 h-full">
          <ActivityFeed activities={activity} />
        </div>

      </div>

      {/* CLASSROOM DETAILS MODAL (TIMETABLE & HISTORY LOGS) */}
      {selectedClassroom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedClassroom(null)} />
          
          <div className="relative glass-card bg-white dark:bg-slate-900 border border-white/60 w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl animate-fade-in z-10">
            <button
              onClick={() => setSelectedClassroom(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <span className="text-xs font-bold text-primary tracking-wide uppercase">
                {selectedClassroom.roomNumber} Detail Monitor
              </span>
              <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark">
                {selectedClassroom.className}
              </h2>
            </div>

            {loadingDetails ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                <p className="text-xs text-customText-muted">Loading timetable logs...</p>
              </div>
            ) : classroomDetails ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Timetable View (Left Column) */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-customText border-b pb-2">
                    <Calendar size={16} />
                    <span>Class Schedule Calendar</span>
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
                    {classroomDetails.timetables.length === 0 ? (
                      <p className="text-xs text-customText-muted">No timetable configured yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {classroomDetails.timetables.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 bg-slate-50/70 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/40 rounded-xl flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-bold text-primary-dark uppercase mr-2">{item.day}</span>
                              <span className="text-slate-500 font-semibold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                                Period {item.periodNo}
                              </span>
                              <h4 className="font-bold text-customText dark:text-customText-dark mt-1">
                                {item.subjectName}
                              </h4>
                              <p className="text-customText-muted dark:text-customText-mutedDark mt-0.5">
                                Faculty: <span className="font-semibold text-customText dark:text-customText-dark">{item.facultyName}</span>
                              </p>
                            </div>
                            <div className="text-right text-slate-500 font-semibold">
                              {item.startTime} - {item.endTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Historic Logs View (Right Column) */}
                <div className="md:col-span-1 space-y-4">
                  <div className="flex flex-col gap-2 border-b pb-2">
                    <div className="flex items-center gap-1.5 font-bold text-sm text-customText">
                      <History size={16} />
                      <span>Recent Logs History</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950/20 p-2 rounded-xl border border-slate-200/50 dark:border-slate-800/40 text-xs">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <input
                        type="date"
                        value={modalDateFilter}
                        onChange={(e) => handleModalDateChange(e.target.value)}
                        className="bg-transparent border-0 outline-none p-0 text-xs text-customText w-full focus:ring-0"
                        title="Filter logs by date"
                      />
                      {modalDateFilter && (
                        <button
                          onClick={() => handleModalDateChange('')}
                          className="text-xs font-bold text-primary hover:underline shrink-0"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                    {classroomDetails.logs.length === 0 ? (
                      <div className="text-center py-12 text-xs text-customText-muted dark:text-customText-mutedDark border border-dashed rounded-xl">
                        No history logs recorded
                      </div>
                    ) : (
                      classroomDetails.logs.map((log) => {
                        const isPresent = log.status === 'Present';
                        return (
                          <div
                            key={log.id}
                            className={`p-2.5 rounded-xl border text-[11px] leading-snug ${
                              isPresent 
                                ? 'bg-green-500/5 border-green-500/10' 
                                : 'bg-red-500/5 border-red-500/10'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span>Period {log.periodNo}</span>
                              <span className={isPresent ? 'text-green-600' : 'text-red-600'}>
                                {log.status}
                              </span>
                            </div>
                            <p className="text-customText-muted dark:text-customText-mutedDark mt-1">
                              Faculty: <span className="font-semibold text-customText dark:text-customText-dark">{log.facultyName}</span>
                            </p>
                            <span className="text-[9px] text-customText-muted dark:text-customText-mutedDark block mt-1">
                              {new Date(log.createdAt).toLocaleDateString()} {log.entryTime ? `at ${new Date(log.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                            </span>
                          </div>
                        );
                      })
                    )}
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
