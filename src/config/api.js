export const API_CONFIG = {
  endpoint: import.meta.env.VITE_API_ENDPOINT,
  sprintsEndpoint: import.meta.env.VITE_API_SPRINTS_ENDPOINT,
  cacheTTL: parseInt(import.meta.env.VITE_API_CACHE_TTL) || 5 * 60 * 1000, // 5 minutos (default)
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000 // 10 segundos (default)
};

export const STAGE_CONFIG = {
  'Pré-Venda': {
    id: 'prevenda',
    height: 'h-80',
    microSteps: ['Prospect', 'Tentativa de Contato', 'Conectado', 'Reunião Agendada']
  },
  'Aquisição': {
    id: 'aquisicao',
    height: 'h-64',
    microSteps: ['Validação', 'Proposta Enviada', 'Em Negociação', 'Contrato na Rua']
  },
  'Compromisso': {
    id: 'compromisso',
    height: 'h-40',
    isKnot: true,
    microSteps: ['Venda Fechada']
  },
  'Diagnósticos': {
    id: 'diagnostico',
    height: 'h-48',
    subtitle: '(Saber)',
    microSteps: ['Kickoff Interno', 'Kickoff', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5']
  },
  'Onboarding': {
    id: 'onboarding',
    height: 'h-56',
    subtitle: '(Executar)',
    microSteps: ['Embarque (Growth Class)', 'Kickoff', 'Setup Inicial', 'Planejamento MKT', 'Validação Interna', 'Apresentação Cliente', 'Encerramento']
  },
  'Implementações': {
    id: 'implementacoes',
    height: 'h-64',
    microSteps: ['Setup Imp.', 'Revisão pré-Go Live', 'Go Live', '1º Check-in (Interno)', '1º Check-in (Revisão)', 'Execução', 'Replanejamento', 'Check-in Mensal', 'Encerramento']
  },
  'Ongoing': {
    id: 'ongoing',
    height: 'h-80',
    microSteps: ['DO (Execução)', 'CHECK (Qualidade)', 'ACT (Otimizações)', 'PLAN (Replanejamento)', 'Check-in (Revisão)', 'Check-in (Cliente)']
  },
  'Monetização': {
    id: 'monetizacao',
    height: 'h-96',
    microSteps: ['Validação', 'Proposta Enviada', 'Em Negociação', 'Contrato na Rua']
  }
};
