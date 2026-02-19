import { IMPACT_WEIGHTS, EFFORT_WEIGHTS } from './constants';

export const calculateImpactScore = (actions) => {
  return actions.reduce((acc, action) => acc + (IMPACT_WEIGHTS[action.impact] || 0), 0);
};

export const calculateEffortScore = (actions) => {
  return actions.reduce((acc, action) => acc + (EFFORT_WEIGHTS[action.effort] || 0), 0);
};

export const getActionsForImpactCalculation = (actions, selectedSprint) => {
  let filtered = actions;

  if (selectedSprint === 'all') {
    // "Todas as ações" - sem filtro, mostra todas as ações incluindo done e cancelled
    filtered = actions;
  } else if (selectedSprint === 'backlog') {
    // Filtrar por ações sem sprint (backlog)
    filtered = actions.filter(a => !a.sprint || a.sprint === '');
  } else {
    // Filtrar por sprint específica
    filtered = actions.filter(a => a.sprint === selectedSprint);
  }

  return filtered;
};

export const calculateRecommendationScore = (action, bottleneckStageId) => {
  const impactWeight = IMPACT_WEIGHTS[action.impact] || 0;
  const effortWeight = EFFORT_WEIGHTS[action.effort] || 0;

  // Score = Impacto - Esforço + Bônus Trava (2 pontos)
  let score = impactWeight - effortWeight;

  // Bônus se a ação está na trava (bottleneck)
  if (action.stageId === bottleneckStageId) {
    score += 2;
  }

  return score;
};
