import React, { useState } from 'react';

const Tooltip = ({ children, content, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!content) return <>{children}</>;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-3 py-2 bg-[#1a1a1a] border border-[#444] rounded-lg shadow-xl text-xs text-white whitespace-normal max-w-md left-0 top-full mt-2 ${className}`}>
          <div className="absolute -top-1 left-4 w-2 h-2 bg-[#1a1a1a] border-l border-t border-[#444] transform rotate-45"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
