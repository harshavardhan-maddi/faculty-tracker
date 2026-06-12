import React from 'react';

const StatCard = ({ title, value, icon: Icon, description, color = 'primary' }) => {
  
  let colorClass = 'text-primary dark:text-primary-dark bg-primary/10';
  if (color === 'success') colorClass = 'text-green-600 dark:text-green-400 bg-green-500/10';
  if (color === 'warning') colorClass = 'text-warning dark:text-warning/80 bg-warning/10';
  if (color === 'danger') colorClass = 'text-red-600 dark:text-red-400 bg-danger/10';

  return (
    <div className="glass-card p-6 flex items-center justify-between border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group">
      {/* Background visual glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary/5 dark:bg-primary-dark/5 blur-xl group-hover:scale-150 transition-all duration-500" />
      
      <div className="space-y-1.5 z-10">
        <span className="text-xs font-semibold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider block">
          {title}
        </span>
        <h2 className="text-3xl font-extrabold text-customText dark:text-customText-dark tracking-tight">
          {value}
        </h2>
        {description && (
          <p className="text-xs text-customText-muted dark:text-customText-mutedDark font-medium">
            {description}
          </p>
        )}
      </div>

      <div className={`p-3 rounded-2xl ${colorClass} z-10 transition-transform duration-300 group-hover:scale-110`}>
        <Icon size={24} />
      </div>
    </div>
  );
};

export default StatCard;
