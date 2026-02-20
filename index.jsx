import React, { useState, useRef, useEffect } from 'react';
import Header from './src/components/layout/Header';
import BowTieContainer from './src/components/bowtie/BowTieContainer';
import ActionTable from './src/components/layout/ActionTable';
import LoadingSpinner from './src/components/common/LoadingSpinner';
import ErrorMessage from './src/components/common/ErrorMessage';
import N8nChat from './src/components/common/N8nChat';
import UserIdentification from './src/components/common/UserIdentification';
import { useBowTieData } from './src/hooks/useBowTieData';
import { useSprintsData } from './src/hooks/useSprintsData';
import { useBowTieCalculations } from './src/hooks/useBowTieCalculations';
import { useFilters, useTableData } from './src/hooks/useFilters';
import { useRecommendedActions } from './src/hooks/useRecommendedActions';
import { getUserName } from './src/utils/sessionStorage';

const BowTieApp = () => {
  const [activeStage, setActiveStage] = useState(null);
  const [userName, setUserName] = useState(null);
  const detailsRef = useRef(null);

  // Carregar nome do usuário do localStorage na montagem
  useEffect(() => {
    const savedName = getUserName();
    if (savedName) {
      console.log('[BowTieApp] Nome do usuário carregado:', savedName);
      setUserName(savedName);
    }
  }, []);

  // Hooks de dados e lógica de negócio
  const { bowTieData, loading, isRefreshing, error, refetch } = useBowTieData();
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
    selectedIdentifier,
    setSelectedIdentifier,
    availablePeople,
    availableIdentifiers,
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

  const recommendedActionIds = useRecommendedActions(bowTieData, bottleneckStageId);

  // Auto-switch to "all" when selected sprint has no items
  useEffect(() => {
    // Só aplica se não for "all" ou "backlog" e se houver dados
    if (selectedSprint !== 'all' && selectedSprint !== 'backlog' && bowTieData.length > 0) {
      // Verificar se a sprint selecionada tem ações
      const hasActions = tableData.length > 0;

      if (!hasActions) {
        console.log(`[Auto-Switch] Sprint "${selectedSprint}" sem ações. Alternando para "Visão Geral"`);
        setSelectedSprint('all');
      }
    }
  }, [selectedSprint, tableData.length, bowTieData.length, setSelectedSprint]);

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

      {/* Indicador de refresh em background */}
      {isRefreshing && (
        <div className="fixed top-4 right-4 z-40 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 animate-fade-in">
          <div className="w-4 h-4 border-2 border-[#E30613] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-300">Atualizando dados...</span>
        </div>
      )}

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
        selectedIdentifier={selectedIdentifier}
        setSelectedIdentifier={setSelectedIdentifier}
        availablePeople={availablePeople}
        availableIdentifiers={availableIdentifiers}
        recommendedActionIds={recommendedActionIds}
        detailsRef={detailsRef}
      />

      {/* Identificação de usuário (só mostra se nome não existe) */}
      {!userName && (
        <UserIdentification onNameSubmit={setUserName} />
      )}

      {/* Chat Assistente n8n (só funciona quando há nome) */}
      {userName && (
        <N8nChat
          onRegistrationComplete={refetch}
          userName={userName}
        />
      )}
    </div>
  );
};

export default BowTieApp;
