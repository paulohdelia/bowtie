import React, { useState, useRef } from 'react';
import Header from './src/components/layout/Header';
import BowTieContainer from './src/components/bowtie/BowTieContainer';
import ActionTable from './src/components/layout/ActionTable';
import LoadingSpinner from './src/components/common/LoadingSpinner';
import ErrorMessage from './src/components/common/ErrorMessage';
import N8nChat from './src/components/common/N8nChat';
import { useBowTieData } from './src/hooks/useBowTieData';
import { useSprintsData } from './src/hooks/useSprintsData';
import { useBowTieCalculations } from './src/hooks/useBowTieCalculations';
import { useFilters, useTableData } from './src/hooks/useFilters';

const BowTieApp = () => {
  const [activeStage, setActiveStage] = useState(null);
  const detailsRef = useRef(null);

  // Hooks de dados e lógica de negócio
  const { bowTieData, loading, error, refetch } = useBowTieData();
  const { activeSprint, sprintsWithActions, loading: loadingSprints } = useSprintsData(bowTieData);
  const {
    selectedSprint,
    setSelectedSprint,
    selectedMicroFilters,
    setSelectedMicroFilters,
    selectedStatus,
    setSelectedStatus,
    selectedPerson,
    setSelectedPerson,
    availablePeople,
    filterActionsBySprint,
    toggleMicroFilter
  } = useFilters(activeSprint, bowTieData);

  const { stageScores, maxImpactScore, bottleneckStageId } = useBowTieCalculations(
    bowTieData,
    selectedSprint
  );

  const tableData = useTableData(
    bowTieData,
    activeStage,
    selectedMicroFilters,
    filterActionsBySprint
  );

  // Handlers
  const handleStageClick = (id) => {
    setActiveStage(activeStage === id ? null : id);
    setSelectedMicroFilters([]);
    if (activeStage !== id) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  // Estados de loading e erro
  if (loading || loadingSprints) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans selection:bg-[#E30613] selection:text-white flex flex-col">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #E30613; }
      `}</style>

      <Header selectedSprint={selectedSprint} sprints={sprintsWithActions} />

      <BowTieContainer
        bowTieData={bowTieData}
        activeStage={activeStage}
        onStageClick={handleStageClick}
        stageScores={stageScores}
        maxImpactScore={maxImpactScore}
        bottleneckStageId={bottleneckStageId}
        filterActionsBySprint={filterActionsBySprint}
        selectedSprint={selectedSprint}
      />

      <ActionTable
        tableData={tableData}
        activeStage={activeStage}
        bowTieData={bowTieData}
        selectedSprint={selectedSprint}
        setSelectedSprint={setSelectedSprint}
        selectedMicroFilters={selectedMicroFilters}
        toggleMicroFilter={toggleMicroFilter}
        setSelectedMicroFilters={setSelectedMicroFilters}
        setActiveStage={setActiveStage}
        filterActionsBySprint={filterActionsBySprint}
        sprintsWithActions={sprintsWithActions}
        activeSprint={activeSprint}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        availablePeople={availablePeople}
        detailsRef={detailsRef}
      />

      {/* Chat Assistente n8n */}
      <N8nChat onRegistrationComplete={refetch} />
    </div>
  );
};

export default BowTieApp;
