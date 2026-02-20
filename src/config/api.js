export const API_CONFIG = {
  endpoint: import.meta.env.VITE_API_ENDPOINT,
  sprintsEndpoint: import.meta.env.VITE_API_SPRINTS_ENDPOINT,
  cacheTTL: parseInt(import.meta.env.VITE_API_CACHE_TTL) || 5 * 60 * 1000, // 5 minutos (default)
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000 // 10 segundos (default)
};

export const STAGE_CONFIG = {
  'Exposição': {
    id: 'exposicao',
    height: 'h-96',  // MAIOR (simétrico com Expansão)
    microSteps: []
  },
  'Pré-Venda': {
    id: 'prevenda',
    height: 'h-80',  // MÉDIA-ALTA (simétrico com Retenção)
    microSteps: ['Prospect', 'Tentativa de Contato', 'Conectado', 'Reunião Agendada', 'Reunião realizada']
  },
  'Aquisição': {
    id: 'aquisicao',
    height: 'h-64',  // MÉDIA-BAIXA (simétrico com Onboarding)
    microSteps: ['Validação', 'Proposta Enviada', 'Em Negociação', 'Contrato na Rua', 'Assinatura de contrato']
  },
  'Commit': {
    id: 'commit',
    height: 'h-40',  // MENOR - Nó central
    isKnot: true,
    microSteps: [
      'Assinatura do Contrato',
      'V4 Marketing',
      'Mensagem Próximos Passos (Vendedor)',
      'Revisão da venda (Gerente)',
      'Atribuição de projeto (Squad)',
      'Call Handover Comercial para Ops (Coordenador)',
      'Atribuição do time operacional (Coordenador)'
    ]
  },
  'Onboarding': {
    id: 'onboarding',
    height: 'h-64',  // MÉDIA-BAIXA (simétrico com Aquisição)
    isCategorized: true,
    categories: {
      'SABER': [
        'Revisão do V4 Marketing',
        'Boas-vindas (Gerente - Grupo Whats)',
        'Kickoff',
        'Coleta de Acessos'
      ],
      'TER': [
        'Revisão do V4 Marketing',
        'Boas-vindas (Gerente - Grupo Whats)',
        'Kickoff',
        'Planejamento da Implementação (Interno)',
        'Planejamento da Implementação (Revisão)',
        'Planejamento da Implementação (Cliente)',
        'Encerramento (CSAT)'
      ],
      'EXECUTAR': [
        'Revisão do V4 Marketing',
        'Boas-vindas (Gerente - Grupo Whats)',
        'Kickoff',
        'Coleta de Acessos',
        'Planejamento Interno',
        'Planejamento Revisão',
        'Apresentação Planejamento',
        'Encerramento (CSAT)'
      ]
    }
  },
  'Retenção': {
    id: 'retencao',
    height: 'h-80',  // MÉDIA-ALTA (simétrico com Pré-Venda)
    isCategorized: true,
    categories: {
      'SABER': [
        'Fase 2',
        'Fase 3',
        'Fase 4',
        'Fase 5',
        'Encerramento (NPS)'
      ],
      'TER': [
        'Prototipação',
        'Desenvolvimento',
        'Homologação Interna',
        'Apresentação Cliente',
        'Go-Live',
        'Encerramento (NPS)'
      ],
      'EXECUTAR': [
        'DO (Execução)',
        'CHECK (Qualidade)',
        'ACT (Otimizações)',
        'PLAN (Replanejamento)',
        'Check-in (Revisão)',
        'Check-in (Cliente)'
      ]
    }
  },
  'Expansão': {
    id: 'expansao',
    height: 'h-96',  // MAIOR (simétrico com Exposição)
    microSteps: [
      'Levantada de mão',
      'Validação',
      'Proposta enviada',
      'Em negociação',
      'Contrato na rua',
      'Assinatura de contrato'
    ]
  }
};

// Category order for rendering categorized stages
export const CATEGORY_ORDER = ['SABER', 'TER', 'EXECUTAR'];
