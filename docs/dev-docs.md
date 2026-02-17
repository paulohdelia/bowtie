Documentação Técnica: Ferraz Piai - BowTie Application
Versão do Documento: 1.0
Data: 26/10/2023
Status: Em Desenvolvimento (MVP Monolítico)
1. Visão Geral do Projeto
O Ferraz Piai BowTie é uma aplicação visual de gestão de processos de receita (Revenue Operations). Ela utiliza o conceito de "Bow Tie" (Gravata Borboleta) para mapear a jornada do cliente, desde a pré-venda até a monetização/expansão.
Objetivos da Aplicação
Visualização Estratégica: Exibir claramente o funil de receita em formato de gravata borboleta.
Gestão de Gargalos (Travas): Identificar visual e automaticamente onde estão os maiores impedimentos de receita.
Planejamento de Sprints: Permitir que o time visualize ações mapeadas por ciclos de trabalho (Sprints).
Priorização Visual (Heatmap): Utilizar gradientes de cor para indicar onde o impacto acumulado é maior.
2. Arquitetura Atual (Onde Estamos)
Atualmente, a aplicação é uma Single Page Application (SPA) construída em React. Por questões de agilidade no desenvolvimento do MVP, todo o código reside em um único arquivo: App.jsx.
Stack Tecnológica
Framework: React (Functional Components + Hooks).
Estilização: Tailwind CSS (Classes utilitárias para layout, cores e responsividade).
Ícones: Lucide React.
Gerenciamento de Estado: useState, useMemo, useRef (Local State).
Lógicas Principais (Business Logic)
Heatmap de Impacto: Calcula a soma do impacto (Alto=3, Médio=2, Baixo=1) de todas as ações visíveis. A cor da etapa escurece conforme essa pontuação se aproxima do máximo global.
Identificação de Trava (Bottleneck): Determina qual etapa possui o maior score de impacto.
Critério de Desempate: Em caso de empate na pontuação máxima, a etapa mais à direita (mais próxima da monetização) é considerada a trava.
Filtragem de Ações:
Por Sprint: Filtra ações pela sprint selecionada no dropdown.
Por Visibilidade (Regra de Negócio): Na "Visão Geral", ações Concluídas ou Canceladas são ignoradas para o cálculo de risco/trava, mas podem aparecer no histórico.
Expansão Horizontal: O layout utiliza Flexbox com larguras dinâmicas para expandir horizontalmente as etapas sem quebrar o formato de funil.
3. Plano de Refatoração (Para onde vamos)
O objetivo é sair do arquivo monolítico (App.jsx ~760 linhas) para uma arquitetura modular, escalável e de fácil manutenção.
3.1. Estrutura de Pastas Proposta
src/
├── components/
│   ├── common/              # Componentes genéricos reutilizáveis
│   │   ├── StatusBadge.jsx
│   │   ├── SprintBadge.jsx
│   │   ├── CategoryBadge.jsx
│   │   └── FilterDropdown.jsx
│   ├── layout/              # Componentes estruturais
│   │   ├── Header.jsx
│   │   └── BowTieContainer.jsx
│   ├── bowtie/              # Componentes específicos do domínio
│   │   ├── BowTieStage.jsx  # O "bloco" geométrico principal
│   │   ├── MicroStepCard.jsx
│   │   └── ActionTable.jsx  # A tabela detalhada abaixo do funil
├── hooks/                   # Lógica de negócio extraída
│   ├── useBowTieData.js     # Gerenciamento dos dados (futuro fetch API)
│   ├── useBowTieCalculations.js # Lógica de Heatmap, Scores e Trava
│   └── useFilters.js        # Lógica de seleção de Sprints e Micro-etapas
├── utils/
│   ├── formatters.js        # Formatadores de data/moeda
│   └── mockDataGenerator.js # Gerador de dados (enquanto não houver DB)
├── types/                   # Definições de tipos (se migrar para TypeScript)
│   └── index.ts
└── App.jsx                  # Arquivo limpo, apenas composição principal


3.2. Passos para Execução
Extração de Componentes UI (Baixo Risco):
Mover StatusBadge, SprintBadge, CategoryBadge para src/components/common.
Separação de Dados:
Mover a constante bowTieData e a função generateActions para src/utils/mockDataGenerator.js ou um hook useBowTieData.
Isolamento da Lógica Pesada:
Criar o hook useBowTieCalculations. Ele deve receber os dados brutos e os filtros selecionados, e retornar: { stageScores, maxImpactScore, bottleneckStageId, tableData }.
Isso limpará drasticamente o App.jsx de lógicas useMemo complexas.
Componentização do BowTie:
Criar o componente BowTieStage. Ele receberá via props: isActive, data, metrics, style (cores do heatmap). Isso isola a complexidade visual do HTML/Tailwind.
4. Integração com Banco de Dados (Backend Readiness)
Para tornar a aplicação dinâmica, a estrutura de dados deve ser desacoplada do frontend.
4.1. Modelo de Dados Sugerido (Schema JSON)
Esta estrutura funciona para bancos NoSQL (Firestore, MongoDB) ou relacionais (Postgres/MySQL com tabelas normalizadas).
Coleção: Stages (Configuração do Funil)
{
  "id": "prevenda",
  "title": "Pré-Venda",
  "order": 1,
  "baseHeight": "h-80", // Ou valor numérico para o frontend tratar
  "microSteps": ["Prospect", "Tentativa de Contato", "Conectado", "Reunião Agendada"]
}


Coleção: Actions (Os dados vivos)
{
  "id": "act_12345",
  "stageId": "prevenda",
  "microStep": "Prospect",
  "sprintId": "sprint_3", // ou null para backlog
  "status": "todo", // enum: backlog, todo, in_progress, done, cancelled
  "category": "Pessoas", // enum: Pessoas, Processos, Tecnologia
  "description": "Falta de SDRs qualificados",
  "actionPlan": "Contratar 2 SDRs sênior",
  "responsibleId": "user_99",
  "deadline": "2024-12-20T00:00:00Z",
  "impact": "Alto", // enum: Alto, Médio, Baixo (backend pode armazenar 3, 2, 1)
  "effort": "Médio"
}


4.2. Camada de Serviço (Frontend)
Ao refatorar, substitua o useBowTieData atual (que gera mocks) por um hook que consome uma API.
Exemplo de interface do hook futuro:
// src/hooks/useBowTieData.js
export const useBowTieData = () => {
  const { data, error, isLoading } = useQuery(['actions'], fetchActionsFromAPI);
  
  // Transformação de dados: O frontend recebe a lista plana de ações do DB
  // e deve agrupá-las dentro da estrutura de "Stages" para o BowTie renderizar.
  
  return {
    structuredData: processDataForBowTie(data), // Agrupa ações por stageId > microStep
    isLoading,
    isError
  };
};


