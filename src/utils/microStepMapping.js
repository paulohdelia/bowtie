/**
 * Mapeamento de micro-etapas vindas da API para nomes padronizados
 * Chave: nome que pode vir da API (case-insensitive)
 * Valor: nome padronizado
 */

export const MICRO_STEP_MAPPING = {
  // Pré-Venda
  'prospect': 'Prospect',
  'prospecção': 'Prospect',
  'prospeccao': 'Prospect',
  'tentativa de contato': 'Tentativa de Contato',
  'tentativa': 'Tentativa de Contato',
  'contato': 'Tentativa de Contato',
  'conectado': 'Conectado',
  'conexão': 'Conectado',
  'conexao': 'Conectado',
  'reunião agendada': 'Reunião Agendada',
  'reuniao agendada': 'Reunião Agendada',
  'agendada': 'Reunião Agendada',
  'reunião': 'Reunião Agendada',
  'reuniao': 'Reunião Agendada',
  'reunião realizada': 'Reunião realizada',
  'reuniao realizada': 'Reunião realizada',

  // Aquisição
  'validação': 'Validação',
  'validacao': 'Validação',
  'proposta enviada': 'Proposta Enviada',
  'proposta': 'Proposta Enviada',
  'em negociação': 'Em Negociação',
  'em negociacao': 'Em Negociação',
  'negociação': 'Em Negociação',
  'negociacao': 'Em Negociação',
  'contrato na rua': 'Contrato na Rua',
  'contrato': 'Contrato na Rua',
  'assinatura de contrato': 'Assinatura de contrato',
  'assinatura': 'Assinatura de contrato',

  // Commit (replaces Compromisso)
  'assinatura do contrato': 'Assinatura do Contrato',
  'v4 marketing': 'V4 Marketing',
  'v4': 'V4 Marketing',
  'mensagem próximos passos (vendedor)': 'Mensagem Próximos Passos (Vendedor)',
  'mensagem proximos passos (vendedor)': 'Mensagem Próximos Passos (Vendedor)',
  'próximos passos': 'Mensagem Próximos Passos (Vendedor)',
  'proximos passos': 'Mensagem Próximos Passos (Vendedor)',
  'revisão da venda (gerente)': 'Revisão da venda (Gerente)',
  'revisao da venda (gerente)': 'Revisão da venda (Gerente)',
  'atribuição de projeto (squad)': 'Atribuição de projeto (Squad)',
  'atribuicao de projeto (squad)': 'Atribuição de projeto (Squad)',
  'call handover comercial para ops (coordenador)': 'Call Handover Comercial para Ops (Coordenador)',
  'handover': 'Call Handover Comercial para Ops (Coordenador)',
  'atribuição do time operacional (coordenador)': 'Atribuição do time operacional (Coordenador)',
  'atribuicao do time operacional (coordenador)': 'Atribuição do time operacional (Coordenador)',
  // Backward compatibility
  'venda fechada': 'Assinatura do Contrato',
  'fechada': 'Assinatura do Contrato',
  'fechamento': 'Assinatura do Contrato',

  // Onboarding - SABER/EXECUTAR
  'revisão do v4 marketing': 'Revisão do V4 Marketing',
  'revisao do v4 marketing': 'Revisão do V4 Marketing',
  'boas-vindas (gerente - grupo whats)': 'Boas-vindas (Gerente - Grupo Whats)',
  'boas-vindas': 'Boas-vindas (Gerente - Grupo Whats)',
  'boasvindas': 'Boas-vindas (Gerente - Grupo Whats)',
  'kickoff': 'Kickoff',
  'kick-off': 'Kickoff',
  'kick off': 'Kickoff',
  'coleta de acessos': 'Coleta de Acessos',
  'acessos': 'Coleta de Acessos',
  'planejamento interno': 'Planejamento Interno',
  'planejamento revisão': 'Planejamento Revisão',
  'planejamento revisao': 'Planejamento Revisão',
  'apresentação planejamento': 'Apresentação Planejamento',
  'apresentacao planejamento': 'Apresentação Planejamento',
  'encerramento (csat)': 'Encerramento (CSAT)',
  'csat': 'Encerramento (CSAT)',
  // Backward compatibility (old Onboarding micro-steps)
  'embarque (growth class)': 'Kickoff',
  'embarque': 'Kickoff',
  'growth class': 'Kickoff',
  'setup inicial': 'Coleta de Acessos',
  'setup': 'Coleta de Acessos',
  'planejamento mkt': 'Planejamento Interno',
  'planejamento': 'Planejamento Interno',
  'validação interna': 'Planejamento Revisão',
  'validacao interna': 'Planejamento Revisão',
  'apresentação cliente': 'Apresentação Planejamento',
  'apresentacao cliente': 'Apresentação Planejamento',
  'apresentação': 'Apresentação Planejamento',
  'apresentacao': 'Apresentação Planejamento',
  'encerramento': 'Encerramento (CSAT)',

  // Retenção - SABER
  'fase 2': 'Fase 2',
  'fase2': 'Fase 2',
  'fase 3': 'Fase 3',
  'fase3': 'Fase 3',
  'fase 4': 'Fase 4',
  'fase4': 'Fase 4',
  'fase 5': 'Fase 5',
  'fase5': 'Fase 5',
  'encerramento (nps)': 'Encerramento (NPS)',
  'nps': 'Encerramento (NPS)',

  // Retenção - EXECUTAR
  'do (execução)': 'DO (Execução)',
  'do (execucao)': 'DO (Execução)',
  'do': 'DO (Execução)',
  'check (qualidade)': 'CHECK (Qualidade)',
  'check': 'CHECK (Qualidade)',
  'qualidade': 'CHECK (Qualidade)',
  'act (otimizações)': 'ACT (Otimizações)',
  'act (otimizacoes)': 'ACT (Otimizações)',
  'act': 'ACT (Otimizações)',
  'otimizações': 'ACT (Otimizações)',
  'otimizacoes': 'ACT (Otimizações)',
  'plan (replanejamento)': 'PLAN (Replanejamento)',
  'plan': 'PLAN (Replanejamento)',
  'check-in (revisão)': 'Check-in (Revisão)',
  'check-in (revisao)': 'Check-in (Revisão)',
  'check-in revisão': 'Check-in (Revisão)',
  'check-in revisao': 'Check-in (Revisão)',
  'check-in (cliente)': 'Check-in (Cliente)',
  'check-in cliente': 'Check-in (Cliente)',
  // Backward compatibility (old Implementações/Ongoing micro-steps)
  'kickoff interno': 'Fase 2',
  'kickoff int': 'Fase 2',
  'setup imp.': 'DO (Execução)',
  'setup imp': 'DO (Execução)',
  'setup implementação': 'DO (Execução)',
  'setup implementacao': 'DO (Execução)',
  'revisão pré-go live': 'CHECK (Qualidade)',
  'revisao pre-go live': 'CHECK (Qualidade)',
  'revisão': 'CHECK (Qualidade)',
  'revisao': 'CHECK (Qualidade)',
  'go live': 'DO (Execução)',
  'golive': 'DO (Execução)',
  '1º check-in (interno)': 'Check-in (Revisão)',
  '1 check-in (interno)': 'Check-in (Revisão)',
  'primeiro check-in interno': 'Check-in (Revisão)',
  'check-in interno': 'Check-in (Revisão)',
  '1º check-in (revisão)': 'Check-in (Revisão)',
  '1 check-in (revisao)': 'Check-in (Revisão)',
  'primeiro check-in revisão': 'Check-in (Revisão)',
  'execução': 'DO (Execução)',
  'execucao': 'DO (Execução)',
  'replanejamento': 'PLAN (Replanejamento)',
  'replanejar': 'PLAN (Replanejamento)',
  'check-in mensal': 'Check-in (Cliente)',
  'checkin mensal': 'Check-in (Cliente)',
  'mensal': 'Check-in (Cliente)',

  // Expansão (replaces Monetização)
  'levantada de mão': 'Levantada de mão',
  'levantada de mao': 'Levantada de mão',
  'levantada': 'Levantada de mão',
  'proposta enviada': 'Proposta enviada',
  'em negociação': 'Em negociação',
  'em negociacao': 'Em negociação'
};

/**
 * Normaliza o nome de uma micro-etapa para o padrão definido
 * @param {string} microStepName - Nome da micro-etapa vindo da API
 * @returns {string} Nome normalizado ou o original se não houver mapeamento
 */
export const normalizeMicroStepName = (microStepName) => {
  if (!microStepName || microStepName.trim() === '') {
    return '(micro etapa não mapeada)';
  }

  let cleanName = microStepName.toString().trim();

  // Se vem no formato "Macro | Micro", extrair apenas a parte da micro-etapa
  if (cleanName.includes(' | ')) {
    const parts = cleanName.split(' | ');
    cleanName = parts[parts.length - 1].trim(); // Pegar a última parte (micro-etapa)
  }

  const normalized = cleanName.toLowerCase();

  // Buscar no mapeamento
  const mapped = MICRO_STEP_MAPPING[normalized];

  if (mapped) {
    return mapped;
  }

  // Se não encontrou mapeamento, retornar o nome limpo (sem o prefixo Macro)
  return cleanName;
};
