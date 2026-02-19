import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Filter, Calendar, ChevronDown, CheckSquare, Square, Target, User, ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, Star } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import SprintBadge from '../common/SprintBadge';
import CategoryBadge from '../common/CategoryBadge';
import { STATUS_CONFIG } from '../../utils/constants';
import { useSorting } from '../../hooks/useSorting';

const ActionTable = ({
  tableData,
  activeStage,
  bowTieData,
  selectedSprint,
  setSelectedSprint,
  selectedMicroFilters,
  toggleMicroFilter,
  setSelectedMicroFilters,
  setActiveStage,
  filterActionsBySprint,
  sprintsWithActions,
  activeSprint,
  selectedStatus,
  setSelectedStatus,
  selectedPerson,
  setSelectedPerson,
  availablePeople,
  recommendedActionIds
}) => {
  const [isMicroFilterOpen, setIsMicroFilterOpen] = useState(false);
  const microFilterRef = useRef(null);
  const detailsRef = useRef(null);

  // Sorting hook (com IDs recomendados para ordenação automática)
  const { sortedData, sortConfig, requestSort, resetSort } = useSorting(tableData, recommendedActionIds);

  // Check if any filters or sorting are active
  const hasActiveFiltersOrSort = useMemo(() => {
    return (
      selectedSprint !== 'all' ||
      selectedStatus !== 'all' ||
      selectedPerson !== 'all' ||
      selectedMicroFilters.length > 0 ||
      activeStage !== null ||
      sortConfig.key !== null
    );
  }, [selectedSprint, selectedStatus, selectedPerson, selectedMicroFilters, activeStage, sortConfig]);

  // Reset all filters and sorting
  const handleResetAll = () => {
    setSelectedSprint('all');
    setSelectedStatus('all');
    setSelectedPerson('all');
    setSelectedMicroFilters([]);
    setActiveStage(null);
    resetSort();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (microFilterRef.current && !microFilterRef.current.contains(event.target)) {
        setIsMicroFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeMicroOptions = useMemo(() => {
    if (!activeStage) return [];
    const stage = bowTieData.find(s => s.id === activeStage);
    if (!stage) return [];

    return stage.microSteps.map(step => {
      const count = filterActionsBySprint(step.actions).length;
      return { name: step.name, count };
    });
  }, [activeStage, bowTieData, filterActionsBySprint]);

  // Sprints disponíveis vêm como prop (apenas as que têm ações)
  const availableSprints = sprintsWithActions || [];

  // Helper to render sortable column header
  const SortableHeader = ({ label, sortKey, className = "" }) => {
    const isSorted = sortConfig.key === sortKey;
    const direction = isSorted ? sortConfig.direction : null;

    return (
      <th
        className={`p-4 font-semibold cursor-pointer hover:bg-[#111] transition-colors select-none group ${className}`}
        onClick={() => requestSort(sortKey)}
      >
        <div className="flex items-center gap-1.5">
          <span>{label}</span>
          <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
            {!isSorted && <ArrowUpDown size={12} />}
            {isSorted && direction === 'asc' && <ArrowUp size={12} className="text-[#E30613]" />}
            {isSorted && direction === 'desc' && <ArrowDown size={12} className="text-[#E30613]" />}
          </span>
        </div>
      </th>
    );
  };

  return (
    <div ref={detailsRef} className="w-full max-w-[1600px] mx-auto px-4 mb-20">
      <div className="bg-[#0a0a0a] border border-[#333] rounded-lg overflow-hidden shadow-2xl">

        {/* Header da Tabela */}
        <div className="p-6 border-b border-[#333] flex flex-col md:flex-row justify-between items-end md:items-center bg-[#111] gap-4">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold uppercase text-white flex items-center gap-2">
              Plano de Ação
              <span className="text-[#E30613]">
                {activeStage ? `— ${bowTieData.find(s => s.id === activeStage)?.title}` : '— Visão Geral'}
              </span>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {activeStage
                ? 'Exibindo ações focadas na etapa selecionada.'
                : 'Exibindo ações de todas as etapas do funil.'}
            </p>
          </div>

          <div className="flex items-center gap-6">

            {/* Filtro de Micro Etapas */}
            {activeStage && (
              <div className="flex flex-col items-end relative" ref={microFilterRef}>
                <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-widest flex items-center gap-1">
                  <Filter size={10} /> Filtrar Micro-Etapas
                </label>
                <button
                  onClick={() => setIsMicroFilterOpen(!isMicroFilterOpen)}
                  className={`
                    flex items-center justify-between gap-2 px-4 py-2 rounded text-sm font-bold uppercase tracking-wide border transition-all min-w-[200px]
                    ${isMicroFilterOpen ? 'bg-[#222] border-[#E30613] text-white' : 'bg-[#0a0a0a] border-[#333] text-gray-300 hover:border-gray-500'}
                  `}
                >
                  <span className="truncate max-w-[150px]">
                    {selectedMicroFilters.length === 0 ? 'Todas Selecionadas' : `${selectedMicroFilters.length} Selecionada(s)`}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${isMicroFilterOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMicroFilterOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-[#111] border border-[#333] rounded shadow-xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
                    <div className="p-1">
                      <div
                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#222] cursor-pointer rounded mb-1 border-b border-[#222]"
                        onClick={() => setSelectedMicroFilters([])}
                      >
                        {selectedMicroFilters.length === 0
                          ? <CheckSquare size={14} className="text-[#E30613]" />
                          : <Square size={14} className="text-gray-500" />
                        }
                        <span className="text-xs font-bold text-white">Selecionar Todas</span>
                      </div>
                      {activeMicroOptions.map((option) => (
                        <div
                          key={option.name}
                          className="flex items-center justify-between px-3 py-2 hover:bg-[#222] cursor-pointer rounded group/item"
                          onClick={() => toggleMicroFilter(option.name)}
                        >
                          <div className="flex items-center gap-2">
                            {selectedMicroFilters.includes(option.name)
                              ? <CheckSquare size={14} className="text-[#E30613]" />
                              : <Square size={14} className="text-gray-500 group-hover/item:text-gray-400" />
                            }
                            <span className={`text-xs ${selectedMicroFilters.includes(option.name) ? 'text-white' : 'text-gray-400 group-hover/item:text-gray-300'}`}>
                              {option.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-gray-500 bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-[#333]">
                            {option.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Seletor de Sprint */}
            <div className="flex flex-col items-end">
              <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-widest flex items-center gap-1">
                <Calendar size={10} /> Período / Sprint
              </label>
              <div className="relative group">
                <select
                  value={selectedSprint}
                  onChange={(e) => setSelectedSprint(e.target.value)}
                  className="bg-[#0a0a0a] text-white border border-[#333] group-hover:border-[#E30613] rounded pl-4 pr-8 py-2 text-sm font-bold uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-[#E30613] transition-all cursor-pointer min-w-[200px]"
                >
                  <option value="all">Visão Geral</option>
                  {availableSprints.map(sprint => (
                    <option key={sprint.name} value={sprint.name}>
                      {sprint.name}{sprint.isActive ? ' (Ativa)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtro de Status */}
            <div className="flex flex-col items-end">
              <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-widest flex items-center gap-1">
                <CheckSquare size={10} /> Status
              </label>
              <div className="relative group">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#0a0a0a] text-white border border-[#333] group-hover:border-[#E30613] rounded pl-4 pr-8 py-2 text-sm font-bold uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-[#E30613] transition-all cursor-pointer min-w-[180px]"
                >
                  <option value="all">Todos</option>
                  {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtro de Pessoa */}
            <div className="flex flex-col items-end">
              <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-widest flex items-center gap-1">
                <User size={10} /> Responsável
              </label>
              <div className="relative group">
                <select
                  value={selectedPerson}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  className="bg-[#0a0a0a] text-white border border-[#333] group-hover:border-[#E30613] rounded pl-4 pr-8 py-2 text-sm font-bold uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-[#E30613] transition-all cursor-pointer min-w-[180px]"
                >
                  <option value="all">Todos</option>
                  {availablePeople.map(person => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botão Reset Filtros - aparece apenas quando há filtros/ordenação ativos */}
            {hasActiveFiltersOrSort && (
              <div className="flex flex-col items-end justify-end">
                <button
                  onClick={handleResetAll}
                  className="flex items-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wide border border-[#333] bg-[#0a0a0a] text-gray-400 hover:border-[#E30613] hover:text-white transition-all group"
                  title="Limpar todos os filtros e ordenação"
                >
                  <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  <span className="hidden xl:inline">Limpar</span>
                </button>
              </div>
            )}

            <div className="text-right pl-6 border-l border-[#333] hidden md:block">
              <span className="text-xs uppercase text-gray-500 block">Itens Listados</span>
              <span className="text-2xl font-bold text-white">
                {sortedData.length}
              </span>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
          <table className="w-full text-left border-collapse relative">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#050505] text-[10px] uppercase tracking-wider text-gray-500 border-b border-[#222]">
                <SortableHeader label="Sprint" sortKey="sprint" className="whitespace-nowrap" />
                <SortableHeader label="Macro Etapa" sortKey="stageTitle" className="whitespace-nowrap" />
                <SortableHeader label="Status" sortKey="status" className="whitespace-nowrap" />
                <SortableHeader label="Ação" sortKey="action" className="min-w-[200px]" />
                <SortableHeader label="Prazo" sortKey="deadline" className="text-center whitespace-nowrap" />
                <SortableHeader label="Responsável" sortKey="responsible" className="whitespace-nowrap" />
                <SortableHeader label="Identificado Por" sortKey="identifiedBy" className="whitespace-nowrap" />
                <SortableHeader label="Categoria" sortKey="category" className="whitespace-nowrap" />
                <SortableHeader label="Micro Etapa" sortKey="microStepName" className="whitespace-nowrap" />
                <SortableHeader label="Fato" sortKey="fact" className="min-w-[200px]" />
                <SortableHeader label="Causa" sortKey="cause" className="min-w-[200px]" />
                <SortableHeader label="Impacto" sortKey="impact" className="text-center whitespace-nowrap" />
                <SortableHeader label="Esforço" sortKey="effort" className="text-center whitespace-nowrap" />
                <SortableHeader label="Comentários" sortKey="comments" className="min-w-[250px]" />
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300 divide-y divide-[#222]">
              {sortedData.map((action, idx) => (
                <tr key={`${action.id}-${idx}`} className="hover:bg-[#111] group transition-colors">
                  <td className="p-4 whitespace-nowrap bg-[#0a0a0a]/50">
                    <SprintBadge sprint={action.sprint} />
                  </td>
                  <td className="p-4 whitespace-nowrap text-xs font-bold text-white">
                    <span className={`px-2 py-1 rounded bg-[#222] ${activeStage ? 'opacity-50' : ''}`}>
                      {action.stageTitle}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <StatusBadge status={action.status} />
                  </td>
                  <td className="p-4 max-w-xs truncate font-medium text-white group-hover:whitespace-normal relative" title={action.action}>
                    <div className="flex items-center gap-2">
                      {recommendedActionIds?.includes(action.id) && (
                        <Star
                          size={16}
                          className="text-yellow-400 fill-yellow-400 flex-shrink-0"
                          title="Ação Recomendada: Alto impacto, baixo esforço e/ou na trava"
                        />
                      )}
                      <span className="truncate">{action.action}</span>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap text-center text-xs font-mono">{action.deadline}</td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                        {action.responsible ? action.responsible.charAt(0) : '?'}
                      </div>
                      {action.responsible || '-'}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-300">
                        {action.identifiedBy ? action.identifiedBy.charAt(0) : '?'}
                      </div>
                      {action.identifiedBy || '-'}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <CategoryBadge category={action.category} />
                  </td>
                  <td className="p-4 text-xs uppercase font-bold text-gray-500">{action.microStepName}</td>
                  <td className="p-4 max-w-xs truncate group-hover:whitespace-normal" title={action.fact}>{action.fact}</td>
                  <td className="p-4 max-w-xs truncate group-hover:whitespace-normal" title={action.cause}>{action.cause}</td>
                  <td className="p-4 text-center">
                    <span className={`text-lg font-bold ${
                      action.impact === 10 ? 'text-[#E30613]' :
                      action.impact === 5 ? 'text-yellow-500' :
                      'text-gray-500'
                    }`}>
                      {action.impact || 0}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-lg font-bold ${
                      action.effort === 10 ? 'text-[#E30613]' :
                      action.effort === 5 ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {action.effort || 0}
                    </span>
                  </td>
                  <td className="p-4 max-w-sm truncate group-hover:whitespace-normal text-gray-400 text-xs" title={action.comments}>
                    {action.comments || '-'}
                  </td>
                </tr>
              ))}

              {sortedData.length === 0 && (
                <tr>
                  <td colSpan="14" className="p-16 text-center text-gray-600 italic">
                    <div className="flex flex-col items-center gap-3">
                      <Target className="text-gray-800" size={48} />
                      <p>Nenhum item encontrado.</p>
                      <p className="text-xs max-w-md">
                        Não há ações mapeadas para
                        <strong className="text-gray-400 mx-1">{selectedSprint === 'all' ? 'qualquer período' : selectedSprint}</strong>
                        {activeStage ? 'nesta etapa específica' : 'em todo o funil'}.
                        <br />Tente ajustar os filtros ou ordenação.
                      </p>
                      <button
                        onClick={handleResetAll}
                        className="text-xs text-[#E30613] hover:underline mt-2 font-bold uppercase tracking-wide border border-[#333] px-4 py-2 rounded hover:bg-[#111] flex items-center gap-2"
                      >
                        <RotateCcw size={14} />
                        Limpar todos os filtros
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActionTable;
