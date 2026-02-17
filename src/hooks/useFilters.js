import { useState, useMemo, useEffect } from 'react';

export const useFilters = (activeSprint) => {
  const [selectedSprint, setSelectedSprint] = useState('all');
  const [selectedMicroFilters, setSelectedMicroFilters] = useState([]);

  // Usar sprint ativa automaticamente quando disponível
  useEffect(() => {
    if (activeSprint) {
      setSelectedSprint(activeSprint.name);
    }
  }, [activeSprint]);

  const filterActionsBySprint = (actions) => {
    // "Todas as ações" - sem filtro nenhum
    if (selectedSprint === 'all') {
      return actions;
    }

    // Filtrar por sprint específica
    return actions.filter(a => a.sprint === selectedSprint);
  };

  const toggleMicroFilter = (microName) => {
    setSelectedMicroFilters(prev => {
      if (prev.includes(microName)) {
        return prev.filter(n => n !== microName);
      } else {
        return [...prev, microName];
      }
    });
  };

  const clearMicroFilters = () => {
    setSelectedMicroFilters([]);
  };

  return {
    selectedSprint,
    setSelectedSprint,
    selectedMicroFilters,
    setSelectedMicroFilters,
    filterActionsBySprint,
    toggleMicroFilter,
    clearMicroFilters
  };
};

export const useTableData = (bowTieData, activeStage, selectedMicroFilters, filterActionsBySprint) => {
  const tableData = useMemo(() => {
    let stagesToProcess = bowTieData;
    if (activeStage) {
      stagesToProcess = bowTieData.filter(s => s.id === activeStage);
    }

    const rows = [];
    stagesToProcess.forEach(stage => {
      stage.microSteps.forEach(micro => {
        if (activeStage && selectedMicroFilters.length > 0) {
          if (!selectedMicroFilters.includes(micro.name)) return;
        }

        const filteredActions = filterActionsBySprint(micro.actions);
        filteredActions.forEach(action => {
          rows.push({
            ...action,
            stageTitle: stage.title,
            microStepName: micro.name
          });
        });
      });
    });

    return rows;
  }, [bowTieData, activeStage, selectedMicroFilters, filterActionsBySprint]);

  return tableData;
};
