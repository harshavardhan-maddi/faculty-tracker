import React from 'react';
import { Check, AlertCircle, Clock } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDayName = (dateStr) => {
    return new Date(dateStr).toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/40 flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
        <h3 className="font-bold text-base text-customText dark:text-customText-dark">
          Recent Activity Feed
        </h3>
        <span className="text-[10px] bg-primary/10 text-primary-dark dark:text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Live Updates
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[480px]">
        {activities.length === 0 ? (
          <div className="text-center py-12 text-customText-muted dark:text-customText-mutedDark text-sm">
            No activity logged yet today
          </div>
        ) : (
          activities.map((act) => {
            const isPresent = act.status === 'Present';
            return (
              <div key={act.id} className="relative pl-6 pb-1 group">
                {/* Timeline vertical connector line */}
                <div className="absolute left-2.5 top-5 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800 group-last:hidden" />
                
                {/* Timeline bullet icon */}
                <div className={`absolute left-0 top-1.5 w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 ${
                  isPresent 
                    ? 'bg-green-50 border-green-500 text-green-600 dark:bg-slate-900' 
                    : 'bg-red-50 border-red-500 text-red-600 dark:bg-slate-900'
                }`}>
                  {isPresent ? <Check size={10} strokeWidth={3} /> : <AlertCircle size={10} strokeWidth={3} />}
                </div>

                {/* Activity metadata */}
                <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100/60 dark:border-slate-800/40 p-3 rounded-xl transition-all duration-200 hover:bg-white dark:hover:bg-slate-900/50">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-customText dark:text-customText-dark">
                      {act.roomNumber} - {act.className}
                    </span>
                    <span className="text-[9px] text-customText-muted dark:text-customText-mutedDark font-semibold whitespace-nowrap bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                      {getDayName(act.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-customText-muted dark:text-customText-mutedDark mt-1">
                    {isPresent ? (
                      <>
                        <span className="font-medium text-customText dark:text-customText-dark">{act.facultyName}</span> entered for{' '}
                        <span className="font-medium text-customText dark:text-customText-dark">{act.subjectName}</span> (Period {act.periodNo}).
                      </>
                    ) : (
                      <>
                        <span className="font-medium text-red-600 dark:text-red-400">{act.facultyName}</span> did not enter room for{' '}
                        <span className="font-medium text-customText dark:text-customText-dark">{act.subjectName}</span> (Period {act.periodNo}).
                      </>
                    )}
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-[10px] text-customText-muted dark:text-customText-mutedDark font-semibold">
                    <Clock size={11} />
                    <span>
                      {isPresent 
                        ? `Marked Present at ${formatTime(act.entryTime)}` 
                        : 'Auto-Marked Absent (Expired)'
                      }
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
