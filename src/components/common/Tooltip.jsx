import React, { useState } from 'react';

const Tooltip = ({ children, content, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  // If no content, just show children without tooltip
  if (!content || content === '-') {
    return <span className={`truncate block ${className}`}>{children}</span>;
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className={`truncate block cursor-help ${className}`}>
        {children}
      </span>
      {isVisible && (
        <div
          className="absolute left-0 top-full mt-2 z-[9999] px-4 py-3 bg-[#1a1a1a] border-2 border-[#E30613] rounded-lg shadow-2xl text-sm text-white whitespace-pre-wrap break-words min-w-[350px] max-w-[500px]"
          style={{ pointerEvents: 'none' }}
        >
          <div className="absolute -top-2 left-4 w-3 h-3 bg-[#1a1a1a] border-l-2 border-t-2 border-[#E30613] transform rotate-45"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
