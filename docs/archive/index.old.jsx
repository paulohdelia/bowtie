import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Plus, Circle, X, AlertCircle, CheckCircle, PlayCircle, StopCircle, Filter, Target, Flame, Lock, Calendar, Users, FileText, Monitor, ChevronDown, CheckSquare, Square, Activity } from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

const StatusBadge = ({ status }) => {
  const config = {
    backlog: { color: 'bg-gray-700 text-gray-300', icon: Circle, label: 'Backlog' },
    todo: { color: 'bg-blue-900 text-blue-200', icon: AlertCircle, label: 'A Iniciar' },
    in_progress: { color: 'bg-yellow-900 text-yellow-200', icon: PlayCircle, label: 'Em Andamento' },
    done: { color: 'bg-green-900 text-green-200', icon: CheckCircle, label: 'Concluído' },
    cancelled: { color: 'bg-red-900 text-red-200', icon: StopCircle, label: 'Cancelado' }
  };
  const current = config[status] || config.backlog;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${current.color} border border-white/10`}>
      <Icon size={12} />
      {current.label}
    </span>
  );
};

const SprintBadge = ({ sprint }) => {
  if (!sprint) return <span className="text-xs text-gray-600 font-mono">-</span>;
  const isCurrent = sprint === 'Sprint 3';
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${isCurrent ? 'bg-[#E30613]/20 border-[#E30613] text-[#E30613]' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>
      {sprint}
    </span>
  );
};

const CategoryBadge = ({ category }) => {
  const config = {
    'Pessoas': { color: 'text-blue-400 border-blue-500/30 bg-blue-500/10', icon: Users },
    'Processos': { color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10', icon: FileText },
    'Tecnologia': { color: 'text-purple-400 border-purple-500/30 bg-purple-500/10', icon: Monitor },
  };

  const current = config[category] || config['Processos'];
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${current.color}`}>
      <Icon size={12} />
      {category}
    </span>
  );
};

// --- DATA GENERATOR ---
const generateActions = (count, baseName) => {
  const statuses = ['backlog', 'todo', 'in_progress', 'done', 'cancelled'];
  const impacts = ['Alto', 'Médio', 'Baixo'];
  const efforts = ['Alto', 'Médio', 'Baixo'];
  const sprints = ['Sprint 3', 'Sprint 2', 'Sprint 1', '', ''];
  const categories = ['Pessoas', 'Processos', 'Tecnologia'];

  return Array.from({ length: count }).map((_, i) => ({
    id: `${baseName}-${i}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    fact: `Problema identificado em ${baseName} ${i + 1}`,
    cause: 'Falta de processo definido ou ferramenta adequada',
    action: `Implementar melhoria no fluxo de ${baseName}`,
    responsible: ['João Silva', 'Maria Costa', 'Carlos Santos'][Math.floor(Math.random() * 3)],
    deadline: '2024-12-20',
    impact: impacts[Math.floor(Math.random() * impacts.length)],
    effort: efforts[Math.floor(Math.random() * efforts.length)],
    sprint: sprints[Math.floor(Math.random() * sprints.length)],
    category: categories[Math.floor(Math.random() * categories.length)]
  }));
};

// --- HELPERS DE SCORE PURE FUNCTIONS ---
const calculateImpactScore = (actions) => {
  const weights = { 'Alto': 3, 'Médio': 2, 'Baixo': 1 };
  return actions.reduce((acc, action) => acc + (weights[action.impact] || 0), 0);
};

const calculateEffortScore = (actions) => {
  const weights = { 'Alto': 3, 'Médio': 2, 'Baixo': 1 };
  return actions.reduce((acc, action) => acc + (weights[action.effort] || 0), 0);
};

// --- COMPONENTE PRINCIPAL ---

const BowTieApp = () => {
  const [activeStage, setActiveStage] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState('Sprint 3');
  const [selectedMicroFilters, setSelectedMicroFilters] = useState([]);
  const [isMicroFilterOpen, setIsMicroFilterOpen] = useState(false);
  const microFilterRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const detailsRef = useRef(null);

  const sprintDates = {
    'Sprint 3': '02 Dez - 13 Dez',
    'Sprint 2': '18 Nov - 29 Nov',
    'Sprint 1': '04 Nov - 15 Nov',
    'backlog': 'Sem Prazo Definido',
    'all': 'Histórico Completo'
  };

  const bowTieData = useMemo(() => [
    {
      id: 'prevenda',
      title: 'Pré-Venda',
      height: 'h-80',
      microSteps: [
        { name: 'Prospect', actions: generateActions(8, 'Prospecção') },
        { name: 'Tentativa de Contato', actions: generateActions(5, 'Contato') },
        { name: 'Conectado', actions: generateActions(4, 'Conexão') },
        { name: 'Reunião Agendada', actions: generateActions(8, 'Agendamento') }
      ]
    },
    {
      id: 'aquisicao',
      title: 'Aquisição',
      height: 'h-64',
      microSteps: [
        { name: 'Validação', actions: generateActions(6, 'Validação') },
        { name: 'Proposta Enviada', actions: generateActions(3, 'Proposta') },
        { name: 'Em Negociação', actions: generateActions(7, 'Negociação') },
        { name: 'Contrato na Rua', actions: generateActions(2, 'Contrato') }
      ]
    },
    {
      id: 'compromisso',
      title: 'Compromisso',
      height: 'h-40',
      isKnot: true,
      microSteps: [
        { name: 'Venda Fechada', actions: generateActions(1, 'Fechamento') }
      ]
    },
    {
      id: 'diagnostico',
      title: 'Diagnósticos',
      subtitle: '(Saber)',
      height: 'h-48',
      microSteps: [
        { name: 'Kickoff Interno', actions: generateActions(3, 'Kickoff Int') },
        { name: 'Kickoff', actions: generateActions(2, 'Kickoff') },
        { name: 'Fase 2', actions: generateActions(4, 'Fase 2') },
        { name: 'Fase 3', actions: generateActions(2, 'Fase 3') },
        { name: 'Fase 4', actions: [] },
        { name: 'Fase 5', actions: [] }
      ]
    },
    {
      id: 'onboarding',
      title: 'Onboarding',
      subtitle: '(Executar)',
      height: 'h-56',
      microSteps: [
        { name: 'Embarque (Growth Class)', actions: generateActions(5, 'Embarque') },
        { name: 'Kick-off', actions: generateActions(3, 'Setup') },
        { name: 'Setup Inicial', actions: [] },
        { name: 'Planejamento MKT', actions: generateActions(2, 'Plan') },
        { name: 'Validação Interna', actions: [] },
        { name: 'Apresentação Cliente', actions: [] },
        { name: 'Encerramento', actions: [] }
      ]
    },
    {
      id: 'implementacoes',
      title: 'Implementações',
      height: 'h-64',
      microSteps: [
        { name: 'Setup Imp.', actions: generateActions(6, 'Imp') },
        { name: 'Revisão pré-Go Live', actions: generateActions(3, 'Revisão') },
        { name: 'Go Live', actions: generateActions(2, 'GoLive') },
        { name: '1º Check-in (Interno)', actions: [] },
        { name: '1º Check-in (Revisão)', actions: [] },
        { name: 'Execução', actions: generateActions(4, 'Exec') },
        { name: 'Replanejamento', actions: [] },
        { name: 'Check-in Mensal', actions: [] },
        { name: 'Encerramento', actions: [] }
      ]
    },
    {
      id: 'ongoing',
      title: 'Ongoing',
      height: 'h-80',
      microSteps: [
        { name: 'DO (Execução)', actions: generateActions(15, 'DO') },
        { name: 'CHECK (Qualidade)', actions: generateActions(10, 'CHECK') },
        { name: 'ACT (Otimizações)', actions: generateActions(8, 'ACT') },
        { name: 'PLAN (Replanejamento)', actions: generateActions(6, 'PLAN') },
        { name: 'Check-in (Revisão)', actions: generateActions(4, 'Rev') },
        { name: 'Check-in (Cliente)', actions: generateActions(2, 'Cli') }
      ]
    },
    {
      id: 'monetizacao',
      title: 'Monetização',
      height: 'h-96',
      microSteps: [
        { name: 'Validação', actions: generateActions(4, 'Validação') },
        { name: 'Proposta Enviada', actions: generateActions(2, 'Proposta') },
        { name: 'Em Negociação', actions: generateActions(5, 'Negociação') },
        { name: 'Contrato na Rua', actions: generateActions(1, 'Contrato') }
      ]
    }
  ], []);

  // --- LOGIC ---

  const handleStageClick = (id) => {
    setActiveStage(activeStage === id ? null : id);
    setSelectedMicroFilters([]);
    if (activeStage !== id) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const getStageWidth = (isActive, itemsCount) => {
    if (!isActive) return '160px';
    const TITLE_AREA_WIDTH = 220;
    const CARD_WIDTH = 180;
    const GAP = 12;
    const PADDING = 32;
    return `${TITLE_AREA_WIDTH + (itemsCount * (CARD_WIDTH + GAP)) + PADDING}px`;
  };

  const filterActionsBySprint = (actions) => {
    if (selectedSprint === 'all') return actions;
    if (selectedSprint === 'backlog') return actions.filter(a => !a.sprint);
    return actions.filter(a => a.sprint === selectedSprint);
  };

  // --- FILTER HANDLERS ---

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

  const toggleMicroFilter = (microName) => {
    setSelectedMicroFilters(prev => {
      if (prev.includes(microName)) {
        return prev.filter(n => n !== microName);
      } else {
        return [...prev, microName];
      }
    });
  };

  // --- CALCULADORA DE SCORES & DADOS CENTRALIZADOS ---
  // Calcula: Heatmap, Trava, Impacto Numérico e Esforço Numérico
  const { stageScores, maxImpactScore, bottleneckStageId } = useMemo(() => {
    const scores = {};
    let max = 0;
    let bottleneckId = null;

    // Função auxiliar interna para garantir encapsulamento
    const getActionsForImpact = (actions) => {
      let filtered = actions;
      // 1. Filtro de Sprint
      if (selectedSprint === 'all') {
        // Na visão geral, não filtrou sprint, mas removemos concluídos/cancelados para o risco
        filtered = actions.filter(a => a.status !== 'done' && a.status !== 'cancelled');
      } else if (selectedSprint === 'backlog') {
        filtered = actions.filter(a => !a.sprint);
      } else {
        filtered = actions.filter(a => a.sprint === selectedSprint);
      }
      return filtered;
    };

    bowTieData.forEach(stage => {
      let stageTotalImpact = 0;
      let stageTotalEffort = 0;

      stage.microSteps.forEach(step => {
        const actionsForScore = getActionsForImpact(step.actions);
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

  // --- DADOS DA TABELA ---
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
  }, [bowTieData, activeStage, selectedSprint, selectedMicroFilters]);

  const activeMicroOptions = useMemo(() => {
    if (!activeStage) return [];
    const stage = bowTieData.find(s => s.id === activeStage);
    if (!stage) return [];

    return stage.microSteps.map(step => {
      const count = filterActionsBySprint(step.actions).length;
      return { name: step.name, count };
    });
  }, [activeStage, bowTieData, selectedSprint]);

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans selection:bg-[#E30613] selection:text-white flex flex-col">

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #E30613; }
      `}</style>

      {/* Header */}
      <header className="w-full mb-8 flex flex-col items-center shrink-0">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 text-center">
          Ferraz Piai - <span className="text-[#E30613]">BowTie</span>
        </h1>
        <div className="w-24 h-1 bg-[#E30613]"></div>
        <p className="mt-4 text-gray-500 text-xs uppercase tracking-widest flex items-center gap-2">
          {selectedSprint === 'all' ? 'Visão Completa do Projeto' : `Foco Atual: ${selectedSprint}`}
          <span className="w-px h-3 bg-gray-700 mx-1"></span>
          <span className="flex items-center gap-1 text-gray-400">
            <Calendar size={10} />
            {sprintDates[selectedSprint] || 'Data não definida'}
          </span>
        </p>
      </header>

      {/* Bow Tie Container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto overflow-y-hidden pb-12 px-4 custom-scrollbar flex items-center min-h-[400px]"
      >
        <div className="flex items-center mx-auto min-w-max h-full pt-12">

          {bowTieData.map((stage) => {
            const isActive = activeStage === stage.id;

            // Dados de Score (Calculados no useMemo)
            const scores = stageScores[stage.id] || { impact: 0, effort: 0 };

            // Dados de Contagem para Cards
            const stageMetrics = stage.microSteps.map(step => {
              const filtered = filterActionsBySprint(step.actions);
              return {
                ...step,
                count: filtered.length,
                totalActions: step.actions.length,
              };
            });

            const totalFilteredBacklog = stageMetrics.reduce((acc, step) => acc + step.count, 0);

            // Visualização
            const intensity = scores.impact / maxImpactScore;
            const isBottleneck = stage.id === bottleneckStageId;

            const bgStyle = {
              background: isActive
                ? '#0a0a0a'
                : `linear-gradient(to bottom, rgba(227, 6, 19, ${intensity * 0.6}) 0%, rgba(10, 10, 10, 1) 100%)`,
              borderColor: isActive ? '#E30613' : `rgba(227, 6, 19, ${intensity > 0 ? intensity + 0.2 : 0.2})`
            };

            return (
              <div
                key={stage.id}
                className="relative flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] mr-1 last:mr-0"
              >
                {/* INDICADOR DE TRAVA */}
                {isBottleneck && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 animate-pulse">
                    <div className="flex items-center gap-1 text-[#E30613] font-black uppercase text-sm tracking-widest bg-black px-3 py-1 border border-[#E30613] rounded shadow-[0_0_15px_rgba(227,6,19,0.5)]">
                      <Lock size={12} strokeWidth={3} />
                      TRAVA
                    </div>
                    <div className="w-0.5 h-3 bg-[#E30613]"></div>
                  </div>
                )}

                {/* Forma Geométrica do BowTie */}
                <div
                  onClick={() => handleStageClick(stage.id)}
                  style={{
                    width: getStageWidth(isActive, stage.microSteps.length),
                    ...bgStyle
                  }}
                  className={`
                    ${stage.height}
                    border 
                    cursor-pointer group relative overflow-hidden
                    transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isActive ? 'shadow-[0_0_30px_rgba(227,6,19,0.15)] z-20' : 'z-0 hover:scale-[1.02]'}
                    flex flex-col
                  `}
                >
                  {/* Decorador de Fundo */}
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {isActive ? <X size={16} className="text-gray-500 hover:text-white" /> : <Circle size={8} className="text-[#E30613] fill-[#E30613]" />}
                  </div>

                  {/* Estado FECHADO (Macro) */}
                  <div
                    className={`
                      absolute inset-0 flex flex-col items-center justify-center p-2 text-center transition-all duration-300
                      ${isActive ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}
                    `}
                  >
                    <h3 className="text-sm md:text-base font-black uppercase tracking-tight leading-none break-words w-full drop-shadow-md">
                      {stage.title}
                    </h3>
                    {stage.subtitle && (
                      <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{stage.subtitle}</span>
                    )}

                    {/* Indicador Visual e Numérico de Impacto/Esforço */}
                    <div className="flex flex-col items-center mt-2 gap-1">
                      {intensity > 0 && (
                        <div className="flex items-center gap-1 opacity-60 mb-1" title="Nível de Impacto/Oportunidade">
                          <Flame size={12} className={intensity > 0.6 ? 'text-white fill-white' : 'text-gray-400'} />
                          <div className="w-8 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-white" style={{ width: `${intensity * 100}%` }}></div>
                          </div>
                        </div>
                      )}

                      {/* Apoio Numérico Discreto */}
                      {(scores.impact > 0 || scores.effort > 0) && (
                        <div className="flex gap-3 text-[9px] font-mono uppercase tracking-wider text-gray-300 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/5">
                          <span className="flex items-center gap-1" title="Pontuação Total de Impacto">
                            <Target size={10} className="text-[#E30613]" /> {scores.impact}
                          </span>
                          <span className="w-px h-3 bg-gray-700"></span>
                          <span className="flex items-center gap-1" title="Pontuação Total de Esforço">
                            <Activity size={10} className="text-yellow-500" /> {scores.effort}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      <Plus size={16} />
                    </div>
                  </div>

                  {/* Estado ABERTO (Micro - Horizontal) */}
                  <div
                    className={`
                      absolute inset-0 flex flex-row w-full h-full transition-all duration-500 bg-[#0a0a0a]
                      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
                    `}
                  >
                    {/* Título Macro Esquerda */}
                    <div className="w-[220px] shrink-0 h-full border-r border-[#222] flex flex-col justify-center items-center p-4 bg-[#0F0F0F] relative">
                      <h3 className="text-xl md:text-2xl font-black uppercase text-[#E30613] text-center leading-none mb-2 mt-4">{stage.title}</h3>
                      {stage.subtitle && <span className="text-xs text-gray-500 uppercase tracking-widest text-center">{stage.subtitle}</span>}
                      <div className="mt-auto pt-4 w-full">
                        <div className="text-[10px] uppercase text-gray-600 text-center mb-1">
                          {selectedSprint === 'all' ? 'Total Geral' : selectedSprint}
                        </div>
                        <div className="text-3xl font-black text-white text-center leading-none">{totalFilteredBacklog}</div>
                      </div>
                    </div>

                    {/* Cards Micro Etapas Direita */}
                    <div className="flex-1 h-full flex items-center p-4 overflow-hidden">
                      <div className="flex flex-row gap-3 h-full w-full">
                        {stageMetrics.map((step, idx) => {
                          return (
                            <div
                              key={idx}
                              className="flex flex-col justify-between p-3 bg-[#161616] border border-[#222] hover:border-[#E30613] rounded transition-all group/card h-full min-w-[180px] w-[180px]"
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-medium text-gray-300 group-hover/card:text-white mb-2 leading-tight block uppercase tracking-wide">
                                  {step.name}
                                </span>
                              </div>

                              <div className="mt-auto">
                                <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase mb-1">
                                  <span>Ações</span>
                                </div>
                                <div className={`text-2xl font-bold ${step.count > 0 ? 'text-[#E30613]' : 'text-gray-700'}`}>
                                  {step.count}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Linhas Conectoras */}
                <div className="hidden md:block absolute -right-[3px] top-1/2 -translate-y-1/2 w-[6px] h-[1px] bg-[#222] z-0"></div>

                {/* Contador Inferior */}
                <div
                  className={`
                        mt-4 w-full flex flex-col items-center relative group transition-opacity duration-300
                        ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    `}
                >
                  <div className="absolute -top-4 bottom-0 left-1/2 w-px border-l border-dashed border-[#333] h-20 -z-10 group-hover:border-[#E30613]/50 transition-colors"></div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-600 mb-0.5">
                    {selectedSprint === 'all' ? 'Total' : 'Ações Mapeadas'}
                  </span>
                  <div className="text-xl font-black text-white group-hover:text-[#E30613] transition-colors">
                    {totalFilteredBacklog}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabela de Plano de Ação */}
      <div ref={detailsRef} className="w-full max-w-[1600px] mx-auto px-4 mb-20">

        <div className="bg-[#0a0a0a] border border-[#333] rounded-lg overflow-hidden shadow-2xl">

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

              {/* 1. SELETOR DE MICRO ETAPAS */}
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

                  {/* Dropdown Menu */}
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

              {/* 2. SELETOR DE SPRINT */}
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
                    <option value="Sprint 3">Sprint 3 (Atual)</option>
                    <option value="Sprint 2">Sprint 2</option>
                    <option value="Sprint 1">Sprint 1</option>
                    <option value="backlog">Backlog (Sem Data)</option>
                    <option value="all">Todas as Sprints</option>
                  </select>
                </div>
              </div>

              <div className="text-right pl-6 border-l border-[#333] hidden md:block">
                <span className="text-xs uppercase text-gray-500 block">Itens Listados</span>
                <span className="text-2xl font-bold text-white">
                  {tableData.length}
                </span>
              </div>
            </div>

          </div>

          <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
            <table className="w-full text-left border-collapse relative">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#050505] text-[10px] uppercase tracking-wider text-gray-500 border-b border-[#222]">
                  <th className="p-4 font-semibold whitespace-nowrap">Sprint</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Macro Etapa</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                  <th className="p-4 font-semibold min-w-[200px]">Ação</th>
                  <th className="p-4 font-semibold text-center whitespace-nowrap">Prazo</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Responsável</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Categoria</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Micro Etapa</th>
                  <th className="p-4 font-semibold min-w-[200px]">Fato</th>
                  <th className="p-4 font-semibold min-w-[200px]">Causa</th>
                  <th className="p-4 font-semibold text-center whitespace-nowrap">Impacto</th>
                  <th className="p-4 font-semibold text-center whitespace-nowrap">Esforço</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300 divide-y divide-[#222]">
                {tableData.map((action, idx) => (
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
                    <td className="p-4 max-w-xs truncate font-medium text-white group-hover:whitespace-normal" title={action.action}>{action.action}</td>
                    <td className="p-4 whitespace-nowrap text-center text-xs font-mono">{action.deadline}</td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                          {action.responsible.charAt(0)}
                        </div>
                        {action.responsible}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <CategoryBadge category={action.category} />
                    </td>
                    <td className="p-4 text-xs uppercase font-bold text-gray-500">{action.microStepName}</td>
                    <td className="p-4 max-w-xs truncate group-hover:whitespace-normal" title={action.fact}>{action.fact}</td>
                    <td className="p-4 max-w-xs truncate group-hover:whitespace-normal" title={action.cause}>{action.cause}</td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] font-bold uppercase ${action.impact === 'Alto' ? 'text-[#E30613]' : 'text-gray-500'}`}>
                        {action.impact}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] font-bold uppercase ${action.effort === 'Alto' ? 'text-[#E30613]' : 'text-gray-500'}`}>
                        {action.effort}
                      </span>
                    </td>
                  </tr>
                ))}

                {tableData.length === 0 && (
                  <tr>
                    <td colSpan="12" className="p-16 text-center text-gray-600 italic">
                      <div className="flex flex-col items-center gap-3">
                        <Target className="text-gray-800" size={48} />
                        <p>Nenhum item encontrado.</p>
                        <p className="text-xs max-w-md">
                          Não há ações mapeadas para
                          <strong className="text-gray-400 mx-1">{selectedSprint === 'all' ? 'qualquer período' : selectedSprint}</strong>
                          {activeStage ? 'nesta etapa específica' : 'em todo o funil'}.
                          <br />Tente ajustar os filtros de Micro-Etapas.
                        </p>
                        <button onClick={() => { setSelectedSprint('all'); setActiveStage(null); setSelectedMicroFilters([]); }} className="text-xs text-[#E30613] hover:underline mt-2 font-bold uppercase tracking-wide border border-[#333] px-4 py-2 rounded hover:bg-[#111]">
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

    </div>
  );
};

export default BowTieApp;