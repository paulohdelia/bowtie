import React from 'react';

const SprintBadge = ({ sprint }) => {
  if (!sprint) return <span className="text-xs text-gray-600 font-mono">-</span>;

  const isCurrent = sprint === 'Sprint 3';

  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${isCurrent ? 'bg-[#E30613]/20 border-[#E30613] text-[#E30613]' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>
      {sprint}
    </span>
  );
};

export default SprintBadge;
