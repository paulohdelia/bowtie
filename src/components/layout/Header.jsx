import React, { useMemo } from 'react';
import { Calendar } from 'lucide-react';

const Header = ({ selectedSprint, sprints }) => {
  // Encontrar a sprint selecionada nos dados
  const sprintInfo = useMemo(() => {
    if (!sprints || sprints.length === 0) return null;
    return sprints.find(s => s.name === selectedSprint);
  }, [sprints, selectedSprint]);

  // Formatar período da sprint
  const sprintPeriod = useMemo(() => {
    if (selectedSprint === 'all') {
      return 'Todas as sprints';
    }

    if (!sprintInfo) {
      return 'Datas não disponíveis';
    }

    // Formatar datas (vem como DD/MM/YYYY da API)
    return `${sprintInfo.start} - ${sprintInfo.end}`;
  }, [selectedSprint, sprintInfo]);

  return (
    <header className="w-full mb-8 flex flex-col items-center shrink-0">
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 text-center">
        Ferraz Piai - <span className="text-[#E30613]">BowTie</span>
      </h1>
      <div className="w-24 h-1 bg-[#E30613]"></div>
      <p className="mt-4 text-gray-500 text-xs uppercase tracking-widest flex items-center gap-2">
        {selectedSprint === 'all' ? 'Todas as Ações' : `Foco Atual: ${selectedSprint}`}
        <span className="w-px h-3 bg-gray-700 mx-1"></span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar size={10} />
          {sprintPeriod}
        </span>
      </p>
    </header>
  );
};

export default Header;
