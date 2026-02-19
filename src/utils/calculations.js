export const calculateImpactScore = (actions) => {
  return actions.reduce((acc, action) => acc + (action.impact || 0), 0);
};

export const calculateEffortScore = (actions) => {
  return actions.reduce((acc, action) => acc + (action.effort || 0), 0);
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
  const impactValue = action.impact || 0; // Valor numérico: 1, 5, or 10
  const effortValue = action.effort || 0; // Valor numérico: 1, 5, or 10

  // Score = Impact - Effort + Bottleneck Bonus
  // Range: -9 (Baixo impact, Alto effort) to +16 (Alto impact, Baixo effort, in bottleneck)
  let score = impactValue - effortValue;

  // Bônus se a ação está na trava (bottleneck)
  if (action.stageId === bottleneckStageId) {
    score += 7; // Bônus proporcional à escala 1-10 (70% da escala)
  }

  return score;
};
