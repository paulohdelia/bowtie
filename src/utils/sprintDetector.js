/**
 * Detecta e extrai informações sobre sprints dos dados do BowTie
 */

/**
 * Extrai todas as sprints únicas dos dados
 * @param {Array} bowTieData - Dados do BowTie
 * @returns {Array<string>} Array de sprints únicas ordenadas
 */
export const extractSprints = (bowTieData) => {
  const sprintsSet = new Set();

  bowTieData.forEach(stage => {
    stage.microSteps.forEach(microStep => {
      microStep.actions.forEach(action => {
        if (action.sprint && action.sprint !== '') {
          sprintsSet.add(action.sprint);
        }
      });
    });
  });

  // Converter Set para Array e ordenar
  const sprints = Array.from(sprintsSet);

  // Ordenar sprints (Sprint 1, Sprint 2, Sprint 3, etc.)
  sprints.sort((a, b) => {
    // Extrair número da sprint
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

  return sprints;
};

/**
 * Detecta a sprint atual (maior sprint nos dados)
 * @param {Array} bowTieData - Dados do BowTie
 * @returns {string} Sprint atual ou 'all' se não houver sprints
 */
export const detectCurrentSprint = (bowTieData) => {
  const sprints = extractSprints(bowTieData);

  if (sprints.length === 0) {
    return 'all'; // Se não houver sprints, mostrar todas as ações
  }

  // Retornar a última sprint (maior número)
  return sprints[sprints.length - 1];
};

/**
 * Verifica se há ações no backlog (sem sprint)
 * @param {Array} bowTieData - Dados do BowTie
 * @returns {boolean} True se houver ações no backlog
 */
export const hasBacklogActions = (bowTieData) => {
  return bowTieData.some(stage =>
    stage.microSteps.some(microStep =>
      microStep.actions.some(action => !action.sprint || action.sprint === '')
    )
  );
};
