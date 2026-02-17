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

  // Compromisso
  'venda fechada': 'Venda Fechada',
  'fechada': 'Venda Fechada',
  'fechamento': 'Venda Fechada',

  // Diagnósticos
  'kickoff interno': 'Kickoff Interno',
  'kickoff int': 'Kickoff Interno',
  'kickoff': 'Kickoff',
  'kick-off': 'Kickoff',
  'kick off': 'Kickoff',
  'fase 2': 'Fase 2',
  'fase2': 'Fase 2',
  'fase 3': 'Fase 3',
  'fase3': 'Fase 3',
  'fase 4': 'Fase 4',
  'fase4': 'Fase 4',
  'fase 5': 'Fase 5',
  'fase5': 'Fase 5',

  // Onboarding
  'embarque (growth class)': 'Embarque (Growth Class)',
  'embarque': 'Embarque (Growth Class)',
  'growth class': 'Embarque (Growth Class)',
  'kick-off': 'Kick-off',
  'kickoff': 'Kick-off',
  'setup inicial': 'Setup Inicial',
  'setup': 'Setup Inicial',
  'planejamento mkt': 'Planejamento MKT',
  'planejamento': 'Planejamento MKT',
  'validação interna': 'Validação Interna',
  'validacao interna': 'Validação Interna',
  'apresentação cliente': 'Apresentação Cliente',
  'apresentacao cliente': 'Apresentação Cliente',
  'apresentação': 'Apresentação Cliente',
  'apresentacao': 'Apresentação Cliente',
  'encerramento': 'Encerramento',

  // Implementações
  'setup imp.': 'Setup Imp.',
  'setup imp': 'Setup Imp.',
  'setup implementação': 'Setup Imp.',
  'setup implementacao': 'Setup Imp.',
  'revisão pré-go live': 'Revisão pré-Go Live',
  'revisao pre-go live': 'Revisão pré-Go Live',
  'revisão': 'Revisão pré-Go Live',
  'revisao': 'Revisão pré-Go Live',
  'go live': 'Go Live',
  'golive': 'Go Live',
  '1º check-in (interno)': '1º Check-in (Interno)',
  '1 check-in (interno)': '1º Check-in (Interno)',
  'primeiro check-in interno': '1º Check-in (Interno)',
  'check-in interno': '1º Check-in (Interno)',
  '1º check-in (revisão)': '1º Check-in (Revisão)',
  '1 check-in (revisao)': '1º Check-in (Revisão)',
  'primeiro check-in revisão': '1º Check-in (Revisão)',
  'check-in revisão': '1º Check-in (Revisão)',
  'execução': 'Execução',
  'execucao': 'Execução',
  'replanejamento': 'Replanejamento',
  'replanejar': 'Replanejamento',
  'check-in mensal': 'Check-in Mensal',
  'checkin mensal': 'Check-in Mensal',
  'mensal': 'Check-in Mensal',

  // Ongoing
  'do (execução)': 'DO (Execução)',
  'do (execucao)': 'DO (Execução)',
  'do': 'DO (Execução)',
  'execução': 'DO (Execução)',
  'execucao': 'DO (Execução)',
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

  // Monetização
  'validação': 'Validação',
  'validacao': 'Validação',
  'proposta enviada': 'Proposta Enviada',
  'proposta': 'Proposta Enviada',
  'em negociação': 'Em Negociação',
  'em negociacao': 'Em Negociação',
  'negociação': 'Em Negociação',
  'negociacao': 'Em Negociação',
  'contrato na rua': 'Contrato na Rua',
  'contrato': 'Contrato na Rua'
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
