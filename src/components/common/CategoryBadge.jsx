import React from 'react';
import { Users, FileText, Monitor } from 'lucide-react';
import { CATEGORY_CONFIG } from '../../utils/constants';

const ICON_MAP = {
  'Pessoas': Users,
  'Processos': FileText,
  'Tecnologia': Monitor
};

const CategoryBadge = ({ category }) => {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG['Processos'];
  const Icon = ICON_MAP[category] || FileText;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${config.color}`}>
      <Icon size={12} />
      {category}
    </span>
  );
};

export default CategoryBadge;
