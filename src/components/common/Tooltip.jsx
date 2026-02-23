import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Tooltip = ({ children, content, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      let top = triggerRect.bottom + scrollY + 8; // 8px below trigger
      let left = triggerRect.left + scrollX;

      // Check if tooltip goes off-screen to the right
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 16; // 16px padding from edge
      }

      // Check if tooltip goes off-screen to the left
      if (left < 16) {
        left = 16; // 16px padding from edge
      }

      // Check if tooltip goes off-screen at bottom
      if (triggerRect.bottom + tooltipRect.height + 8 > window.innerHeight) {
        // Show above trigger instead
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
      }

      setPosition({ top, left });
    }
  }, [isVisible]);

  if (!content) return <span className={className}>{children}</span>;

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className="fixed z-[9999] px-4 py-3 bg-[#1a1a1a] border border-[#444] rounded-lg shadow-2xl text-sm text-white whitespace-normal max-w-md pointer-events-none"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.15s ease-in-out',
      }}
    >
      {content}
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className={`truncate block cursor-help ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      {isVisible && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip;
