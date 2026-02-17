import { useMemo } from 'react';
import { calculateImpactScore, calculateEffortScore, getActionsForImpactCalculation } from '../utils/calculations';

export const useBowTieCalculations = (bowTieData, selectedSprint) => {
  const { stageScores, maxImpactScore, bottleneckStageId } = useMemo(() => {
    const scores = {};
    let max = 0;
    let bottleneckId = null;

    bowTieData.forEach(stage => {
      let stageTotalImpact = 0;
      let stageTotalEffort = 0;

      stage.microSteps.forEach(step => {
        const actionsForScore = getActionsForImpactCalculation(step.actions, selectedSprint);
        stageTotalImpact += calculateImpactScore(actionsForScore);
        stageTotalEffort += calculateEffortScore(actionsForScore);
      });

      scores[stage.id] = { impact: stageTotalImpact, effort: stageTotalEffort };

      // CRITÉRIO DE DESEMPATE: >= (o último/mais à direita vence em caso de empate)
      if (stageTotalImpact >= max && stageTotalImpact > 0) {
        max = stageTotalImpact;
        bottleneckId = stage.id;
      }
    });

    return {
      stageScores: scores,
      maxImpactScore: max > 0 ? max : 1,
      bottleneckStageId: bottleneckId
    };
  }, [bowTieData, selectedSprint]);

  return { stageScores, maxImpactScore, bottleneckStageId };
};
