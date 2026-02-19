import React from 'react';
import { Plus, Circle, X, Lock, Flame, Target, Activity } from 'lucide-react';

const BowTieStage = ({
  stage,
  isActive,
  isBottleneck,
  scores,
  intensity,
  maxImpactScore,
  stageMetrics,
  totalFilteredBacklog,
  onStageClick,
  getStageWidth,
  selectedSprint
}) => {
  const bgStyle = {
    background: isActive
      ? '#0a0a0a'
      : `linear-gradient(to bottom, rgba(227, 6, 19, ${intensity * 0.6}) 0%, rgba(10, 10, 10, 1) 100%)`,
    borderColor: isActive ? '#E30613' : `rgba(227, 6, 19, ${intensity > 0 ? Math.max(intensity * 0.8 + 0.3, 0.4) : 0.4})`
  };

  return (
    <div className="relative flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] mr-1 last:mr-0">
      {/* Indicador de Trava */}
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
        onClick={() => onStageClick(stage.id)}
        style={{
          width: getStageWidth(isActive, stage.isCategorized
            ? (stage.categories?.reduce((max, cat) => Math.max(max, cat.microSteps.length), 0) || 0)
            : (stage.microSteps?.length || 0)
          ),
          ...bgStyle
        }}
        className={`
          ${isActive && stage.isCategorized ? 'h-[500px]' : stage.height}
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
          <h3 className={`font-black uppercase tracking-tight leading-none w-full drop-shadow-md whitespace-nowrap ${
            stage.title.length > 12 ? 'text-xs md:text-sm' : 'text-sm md:text-base'
          }`}>
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

        {/* Estado ABERTO - Categorized (3 Vertical Rows) */}
        {isActive && stage.isCategorized && (
          <div className="absolute inset-0 flex w-full h-full bg-[#0a0a0a]">
            {/* Título Macro Esquerda */}
            <div className="w-[220px] shrink-0 flex flex-col justify-center items-center p-6 border-r border-[#222] bg-[#0F0F0F]">
              <h3 className="text-xl font-bold text-[#E30613] mb-2">{stage.title}</h3>
              <div className="text-xs text-gray-400">
                Total: {totalFilteredBacklog}
              </div>
              <div className="text-xs text-gray-500">
                {selectedSprint === 'all' ? 'Visão Geral' : selectedSprint}
              </div>
            </div>

            {/* Categories area - 3 vertical rows */}
            <div className="flex-1 flex flex-col gap-0">
              {stageMetrics.categories?.map((category, idx) => (
                <div
                  key={category.name}
                  className={`flex-1 flex flex-col px-4 py-3 ${idx < stageMetrics.categories.length - 1 ? 'border-b border-gray-800' : ''}`}
                >
                  {/* Category label */}
                  <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">
                    {category.name}
                  </div>

                  {/* Horizontal micro-step cards */}
                  {category.microSteps && category.microSteps.length > 0 ? (
                    <div className="flex flex-row gap-3 overflow-x-auto pb-2">
                      {category.microSteps.map(step => (
                        <div
                          key={step.name}
                          className="flex flex-col justify-between p-3 bg-[#161616] border border-[#222] hover:border-[#E30613] rounded transition-all h-full min-w-[140px] w-[140px] shrink-0"
                        >
                          <span className="text-xs font-medium text-gray-300">{step.name}</span>
                          <div className={`text-2xl font-bold ${step.count > 0 ? 'text-[#E30613]' : 'text-gray-700'}`}>
                            {step.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-600 italic">
                      Nenhuma micro-etapa definida
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado ABERTO - Simple (Horizontal) */}
        {isActive && !stage.isCategorized && (
          <div className="absolute inset-0 flex flex-row w-full h-full bg-[#0a0a0a]">
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
                {stageMetrics.microSteps?.map((step, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col justify-between p-3 bg-[#161616] border border-[#222] hover:border-[#E30613] rounded transition-all group/card h-full min-w-[140px] w-[140px]"
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
        )}
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
};

export default BowTieStage;
