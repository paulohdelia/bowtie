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
  } else {
    // Filtrar por sprint específica
    filtered = actions.filter(a => a.sprint === selectedSprint);
  }

  return filtered;
};
