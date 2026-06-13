import React from 'react';
import { BookOpen, User, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const ClassroomCard = ({ roomNumber, className, status, currentPeriod, onClick }) => {
  
  // Decide visual mapping based on calculated status
  let cardClass = 'border-slate-200/60 dark:border-slate-800/60';
  let statusDotClass = 'bg-slate-400 dark:bg-slate-600';
  let pulseColorClass = 'bg-slate-400';
  let statusText = 'No Active Period';
  let statusIcon = <Clock size={16} className="text-slate-400" />;

  if (status === 'Present') {
    cardClass = 'border-green-400 dark:border-green-600/80 shadow-md shadow-green-500/5';
    statusDotClass = 'bg-green-500';
    pulseColorClass = 'bg-green-400';
    statusText = 'Faculty Present';
    statusIcon = <CheckCircle size={16} className="text-green-500" />;
  } else if (status === 'Not Entered') {
    cardClass = 'border-red-400 dark:border-red-600/80 shadow-md shadow-red-500/5';
    statusDotClass = 'bg-red-500';
    pulseColorClass = 'bg-red-400';
    statusText = 'Faculty Not Entered';
    statusIcon = <XCircle size={16} className="text-red-500" />;
  } else if (status === 'Pending') {
    cardClass = 'border-warning dark:border-warning/80 shadow-md shadow-warning/5';
    statusDotClass = 'bg-warning';
    pulseColorClass = 'bg-warning';
    statusText = 'Attendance Pending';
    statusIcon = <AlertTriangle size={16} className="text-warning" />;
  } else if (status === 'College is on Holiday') {
    cardClass = 'border-purple-400 dark:border-purple-600/80 shadow-md shadow-purple-500/5 bg-purple-500/5';
    statusDotClass = 'bg-purple-500';
    pulseColorClass = 'bg-purple-400';
    statusText = 'College is on Holiday';
    statusIcon = <Clock size={16} className="text-purple-500" />;
  }

  return (
    <div
      onClick={onClick}
      className={`glass-card glass-card-hover p-5 border-2 flex flex-col justify-between min-h-[200px] cursor-pointer relative ${cardClass}`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-primary dark:text-primary-dark tracking-wide uppercase">
            {roomNumber}
          </span>
          <h3 className="font-bold text-lg text-customText dark:text-customText-dark tracking-tight leading-snug mt-0.5">
            {className}
          </h3>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-1.5 bg-slate-100/60 dark:bg-slate-800/40 py-1 px-2.5 rounded-full border border-slate-200/30 dark:border-slate-700/20">
          <span className="status-dot-pulse">
            {status !== 'No Active Period' && (
              <span className={`pulse-ring ${pulseColorClass}`}></span>
            )}
            <span className={`core-dot ${statusDotClass}`}></span>
          </span>
          <span className="text-[10px] font-bold text-customText dark:text-customText-dark tracking-wide uppercase">
            {status}
          </span>
        </div>
      </div>

      {/* Period Details */}
      <div className="my-4 space-y-2">
        {currentPeriod ? (
          <>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen size={15} className="text-customText-muted dark:text-customText-mutedDark" />
              <span className="font-medium truncate text-customText dark:text-customText-dark">
                {currentPeriod.subjectName}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <User size={15} className="text-customText-muted dark:text-customText-mutedDark" />
              <span className="text-customText-muted dark:text-customText-mutedDark truncate">
                {currentPeriod.facultyName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-customText-muted dark:text-customText-mutedDark bg-slate-100/40 dark:bg-slate-900/30 p-1.5 rounded-lg w-fit">
              <Clock size={13} />
              <span>
                Period {currentPeriod.periodNo} ({currentPeriod.startTime} - {currentPeriod.endTime})
              </span>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-xs text-customText-muted dark:text-customText-mutedDark">
            No active periods scheduled at this time
          </div>
        )}
      </div>

      {/* Card Footer status block */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-customText-muted dark:text-customText-mutedDark">
          {statusIcon}
          <span>{statusText}</span>
        </div>
        
        {currentPeriod && status === 'Present' && currentPeriod.entryTime && (
          <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold italic bg-green-500/10 px-2 py-0.5 rounded-full">
            In at {new Date(currentPeriod.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {/* Bottom text block for Not Entered validation */}
      {status === 'Not Entered' && currentPeriod && (
        <div className="absolute -bottom-2.5 left-4 right-4 bg-danger dark:bg-danger-dark text-white rounded-lg py-1 px-3 shadow text-[10px] font-bold text-center animate-pulse">
          {currentPeriod.facultyName} not entered into {roomNumber}
        </div>
      )}
    </div>
  );
};

export default ClassroomCard;
