export const SPRINT_DATES = {
  'Sprint 3': '02 Dez - 13 Dez',
  'Sprint 2': '18 Nov - 29 Nov',
  'Sprint 1': '04 Nov - 15 Nov',
  'backlog': 'Sem Prazo Definido',
  'all': 'Histórico Completo'
};

export const STATUS_CONFIG = {
  backlog: { color: 'bg-gray-700 text-gray-300', label: 'Backlog' },
  todo: { color: 'bg-blue-900 text-blue-200', label: 'A Iniciar' },
  in_progress: { color: 'bg-yellow-900 text-yellow-200', label: 'Em Andamento' },
  done: { color: 'bg-green-900 text-green-200', label: 'Concluído' },
  cancelled: { color: 'bg-red-900 text-red-200', label: 'Cancelado' }
};

export const CATEGORY_CONFIG = {
  'Pessoas': { color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  'Processos': { color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
  'Tecnologia': { color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' }
};

export const IMPACT_WEIGHTS = {
  'Alto': 3,
  'Médio': 2,
  'Baixo': 1
};

export const EFFORT_WEIGHTS = {
  'Alto': 3,
  'Médio': 2,
  'Baixo': 1
};
