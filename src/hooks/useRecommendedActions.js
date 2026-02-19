import { useMemo } from 'react';
import { calculateRecommendationScore } from '../utils/calculations';

export const useRecommendedActions = (bowTieData, bottleneckStageId) => {
  const recommendedActionIds = useMemo(() => {
    if (!bowTieData || !bottleneckStageId) {
      console.log('[useRecommendedActions] Missing data:', { bowTieData: !!bowTieData, bottleneckStageId });
      return [];
    }

    // Coletar todas as ações de todos os stages
    const allActions = [];
    bowTieData.forEach(stage => {
      stage.microSteps.forEach(microStep => {
        microStep.actions.forEach(action => {
          allActions.push({
            ...action,
            stageId: stage.id // Adicionar referência ao stage
          });
        });
      });
    });

    console.log('[useRecommendedActions] Total actions:', allActions.length);

    // Filtrar apenas ações não planejadas (sprint vazio ou null) e não concluídas/canceladas
    const backlogActions = allActions.filter(action =>
      (!action.sprint || action.sprint === '') &&
      action.status !== 'done' &&
      action.status !== 'cancelled'
    );

    console.log('[useRecommendedActions] Backlog actions:', backlogActions.length);
    console.log('[useRecommendedActions] Sample backlog action:', backlogActions[0]);

    // Calcular score para cada ação
    const actionsWithScore = backlogActions.map(action => ({
      ...action,
      recommendationScore: calculateRecommendationScore(action, bottleneckStageId)
    }));

    // Ordenar por score (decrescente) e pegar top 5
    const top5 = actionsWithScore
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 5);

    console.log('[useRecommendedActions] Top 5:', top5.map(a => ({ id: a.id, score: a.recommendationScore, action: a.action })));

    // Retornar apenas os IDs para fácil verificação
    const ids = top5.map(action => action.id);
    console.log('[useRecommendedActions] Recommended IDs:', ids);

    return ids;
  }, [bowTieData, bottleneckStageId]);

  return recommendedActionIds;
};
