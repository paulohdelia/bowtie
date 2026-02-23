import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ExpandableCell = ({ children, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!children) return <span className={className}>-</span>;

  const isLongText = children.length > 80; // Only show expand for long text

  return (
    <div className={`${className}`}>
      <div
        className={`${isExpanded ? 'whitespace-normal' : 'truncate'} transition-all duration-200`}
      >
        {children}
      </div>
      {isLongText && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="mt-1 text-[10px] text-[#E30613] hover:text-white flex items-center gap-1 transition-colors uppercase font-bold tracking-wider"
          title={isExpanded ? 'Recolher texto' : 'Expandir texto completo'}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={10} />
              Recolher
            </>
          ) : (
            <>
              <ChevronDown size={10} />
              Ver mais
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableCell;
