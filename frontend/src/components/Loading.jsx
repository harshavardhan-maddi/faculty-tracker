import React from 'react';
import logo from '../neclogo.png';

const Loading = ({ fullPage = true, size = 'md' }) => {
  const sizeClasses = {
    sm: {
      container: 'w-16 h-16',
      logo: 'w-8 h-8',
      ring: 'border-2',
    },
    md: {
      container: 'w-24 h-24',
      logo: 'w-12 h-12',
      ring: 'border-[3px]',
    },
    lg: {
      container: 'w-36 h-36',
      logo: 'w-20 h-20',
      ring: 'border-4',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const content = (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative flex items-center justify-center ${currentSize.container}`}>
        {/* Animated rotating gradient border */}
        <div 
          className={`absolute inset-0 rounded-full animate-spin border-t-primary-dark border-r-transparent border-b-secondary border-l-transparent ${currentSize.ring}`} 
          style={{ animationDuration: '1.2s' }}
        ></div>
        
        {/* Glow effect */}
        <div className="absolute inset-2 bg-gradient-to-tr from-primary/10 to-secondary/15 dark:from-primary-dark/10 dark:to-secondary-dark/10 rounded-full blur-md animate-pulse" style={{ animationDuration: '3s' }}></div>
        
        {/* Pulsing logo */}
        <img 
          src={logo} 
          alt="NEC Logo" 
          className={`${currentSize.logo} rounded-full object-contain relative z-10 animate-pulse`} 
          style={{ animationDuration: '2s' }}
        />
      </div>
      {fullPage && (
        <span className="mt-4 text-xs font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-widest animate-pulse" style={{ animationDuration: '2.5s' }}>
          Loading Portal...
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 dark:bg-slate-950/85 backdrop-blur-sm transition-colors duration-300">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
