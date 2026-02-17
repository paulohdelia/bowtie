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
    const CARD_WIDTH = 180;
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

          const stageMetrics = stage.microSteps.map(step => {
            const filtered = filterActionsBySprint(step.actions);
            return {
              ...step,
              count: filtered.length,
              totalActions: step.actions.length,
            };
          });

          const totalFilteredBacklog = stageMetrics.reduce((acc, step) => acc + step.count, 0);
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
