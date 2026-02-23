import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({ children, content, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;

      // If less than 250px space below, show tooltip above
      setShowAbove(spaceBelow < 250);
    }
  }, [isVisible]);

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
      <span ref={triggerRef} className={`truncate block ${className}`}>
        {children}
      </span>
      {isVisible && (
        <div
          className={`absolute left-0 ${showAbove ? 'bottom-full mb-2' : 'top-full mt-2'} z-[9999] px-4 py-3 bg-[#1a1a1a] border-2 border-[#E30613] rounded-lg shadow-2xl text-sm text-white whitespace-pre-wrap break-words min-w-[350px] max-w-[500px]`}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`absolute left-4 w-3 h-3 bg-[#1a1a1a] border-[#E30613] transform rotate-45 ${
              showAbove
                ? 'bottom-[-7px] border-b-2 border-r-2'
                : 'top-[-7px] border-l-2 border-t-2'
            }`}
          ></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
