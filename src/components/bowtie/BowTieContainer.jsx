import React, { useRef } from 'react';
import BowTieStage from './BowTieStage';

const BowTieContainer = ({
  bowTieData,
  activeStage,
  onStageClick,
  stageScores,
  maxImpactScore,
  bottleneckStageId,
  filterActionsBySprint,
  selectedSprint
}) => {
  const scrollContainerRef = useRef(null);

  const getStageWidth = (isActive, itemsCount) => {
    if (!isActive) return '160px';
    const TITLE_AREA_WIDTH = 220;
    const CARD_WIDTH = 140;  // Reduzido de 180px para 140px
    const GAP = 12;
    const PADDING = 32;
    return `${TITLE_AREA_WIDTH + (itemsCount * (CARD_WIDTH + GAP)) + PADDING}px`;
  };

  return (
    <div
      ref={scrollContainerRef}
      className="w-full overflow-x-auto overflow-y-hidden pb-12 px-4 custom-scrollbar flex items-center min-h-[400px]"
    >
      <div className="flex items-center mx-auto min-w-max h-full pt-12">
        {bowTieData.map((stage) => {
          const isActive = activeStage === stage.id;
          const scores = stageScores[stage.id] || { impact: 0, effort: 0 };

          let stageMetrics;
          let totalFilteredBacklog = 0;

          if (stage.isCategorized && stage.categories) {
            // Categorized stage: calculate metrics per category
            const categories = stage.categories.map(category => ({
              name: category.name,
              microSteps: (category.microSteps || []).map(step => {
                const filtered = filterActionsBySprint(step.actions || []);
                return {
                  name: step.name,
                  count: filtered.length,
                  totalActions: (step.actions || []).length
                };
              })
            }));

            // Calculate total from all categories
            totalFilteredBacklog = categories.reduce((total, cat) =>
              total + cat.microSteps.reduce((sum, step) => sum + step.count, 0), 0
            );

            stageMetrics = { categories };
          } else if (stage.microSteps) {
            // Simple stage: existing logic
            const microSteps = stage.microSteps.map(step => {
              const filtered = filterActionsBySprint(step.actions || []);
              return {
                ...step,
                count: filtered.length,
                totalActions: (step.actions || []).length,
              };
            });

            totalFilteredBacklog = microSteps.reduce((acc, step) => acc + step.count, 0);
            stageMetrics = { microSteps };
          } else {
            // Fallback for stages without data
            stageMetrics = { microSteps: [] };
            totalFilteredBacklog = 0;
          }

          const intensity = scores.impact / maxImpactScore;
          const isBottleneck = stage.id === bottleneckStageId;

          return (
            <BowTieStage
              key={stage.id}
              stage={stage}
              isActive={isActive}
              isBottleneck={isBottleneck}
              scores={scores}
              intensity={intensity}
              maxImpactScore={maxImpactScore}
              stageMetrics={stageMetrics}
              totalFilteredBacklog={totalFilteredBacklog}
              onStageClick={onStageClick}
              getStageWidth={getStageWidth}
              selectedSprint={selectedSprint}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BowTieContainer;
