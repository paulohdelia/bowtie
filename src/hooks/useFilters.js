import { useState, useMemo, useEffect, useRef } from 'react';

export const useFilters = (activeSprint, bowTieData) => {
  const [selectedSprint, setSelectedSprint] = useState('all');
  const [selectedMicroFilters, setSelectedMicroFilters] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState('all');
  const hasInitialized = useRef(false);

  // Inicializar com a sprint ativa quando os dados carregarem
  useEffect(() => {
    // activeSprint é um OBJETO com propriedade 'name'
    if (!hasInitialized.current && activeSprint && activeSprint.name) {
      console.log('[useFilters] Inicializando com sprint ativa:', activeSprint.name);
      setSelectedSprint(activeSprint.name);
      hasInitialized.current = true;
    }
  }, [activeSprint]);

  // Extrair lista única de responsáveis de todas as ações
  const availablePeople = useMemo(() => {
    if (!bowTieData || bowTieData.length === 0) return [];

    const peopleSet = new Set();
    bowTieData.forEach(stage => {
      if (stage.isCategorized && stage.categories) {
        // Categorized stage
        stage.categories.forEach(category => {
          (category.microSteps || []).forEach(microStep => {
            (microStep.actions || []).forEach(action => {
              if (action.responsible && action.responsible.trim() !== '') {
                peopleSet.add(action.responsible.trim());
              }
            });
          });
        });
      } else if (stage.microSteps) {
        // Simple stage
        stage.microSteps.forEach(microStep => {
          (microStep.actions || []).forEach(action => {
            if (action.responsible && action.responsible.trim() !== '') {
              peopleSet.add(action.responsible.trim());
            }
          });
        });
      }
    });

    return Array.from(peopleSet).sort();
  }, [bowTieData]);

  const filterActionsBySprint = (actions) => {
    let filtered = actions;

    // Filtro por sprint
    if (selectedSprint === 'all') {
      // Todas as ações
      filtered = actions;
    } else if (selectedSprint === 'backlog') {
      // Apenas ações sem sprint (backlog)
      filtered = actions.filter(a => !a.sprint || a.sprint === '');
    } else {
      // Sprint específica
      filtered = actions.filter(a => a.sprint === selectedSprint);
    }

    // Filtro por status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(a => a.status === selectedStatus);
    }

    // Filtro por pessoa
    if (selectedPerson !== 'all') {
      filtered = filtered.filter(a => a.responsible === selectedPerson);
    }

    return filtered;
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
    selectedStatus,
    setSelectedStatus,
    selectedPerson,
    setSelectedPerson,
    availablePeople,
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
      if (stage.isCategorized && stage.categories) {
        // Categorized stage: loop through categories
        stage.categories.forEach(category => {
          (category.microSteps || []).forEach(micro => {
            if (activeStage && selectedMicroFilters.length > 0) {
              const filterKey = `${category.name} | ${micro.name}`;
              if (!selectedMicroFilters.includes(filterKey) && !selectedMicroFilters.includes(micro.name)) return;
            }

            const filteredActions = filterActionsBySprint(micro.actions || []);
            filteredActions.forEach(action => {
              rows.push({
                ...action,
                stageTitle: stage.title,
                categoryName: category.name,
                microStepName: micro.name
              });
            });
          });
        });
      } else if (stage.microSteps) {
        // Simple stage
        stage.microSteps.forEach(micro => {
          if (activeStage && selectedMicroFilters.length > 0) {
            if (!selectedMicroFilters.includes(micro.name)) return;
          }

          const filteredActions = filterActionsBySprint(micro.actions || []);
          filteredActions.forEach(action => {
            rows.push({
              ...action,
              stageTitle: stage.title,
              microStepName: micro.name
            });
          });
        });
      }
    });

    return rows;
  }, [bowTieData, activeStage, selectedMicroFilters, filterActionsBySprint]);

  return tableData;
};
