import React from 'react';
import { Circle, AlertCircle, PlayCircle, CheckCircle, StopCircle } from 'lucide-react';
import { STATUS_CONFIG } from '../../utils/constants';

const ICON_MAP = {
  backlog: Circle,
  todo: AlertCircle,
  in_progress: PlayCircle,
  done: CheckCircle,
  cancelled: StopCircle
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.backlog;
  const Icon = ICON_MAP[status] || Circle;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${config.color} border border-white/10`}>
      <Icon size={12} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
