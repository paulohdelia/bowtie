# 🚀 Quick Start - Estrutura Refatorada

## Como Adicionar Novas Features

### ✨ Exemplo 1: Adicionar um Novo Badge

**Antes (arquivo monolítico):**
- Adicionar código no meio de 767 linhas
- Difícil encontrar onde inserir
- Risco de quebrar outras partes

**Depois (estrutura modular):**

```jsx
// src/components/common/PriorityBadge.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PriorityBadge = ({ priority }) => {
  const config = {
    high: { color: 'text-red-400 border-red-500/30 bg-red-500/10' },
    medium: { color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
    low: { color: 'text-green-400 border-green-500/30 bg-green-500/10' }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase border ${config[priority].color}`}>
      <AlertTriangle size={12} />
      {priority}
    </span>
  );
};

export default PriorityBadge;
```

**Uso:**
```jsx
import PriorityBadge from './components/common/PriorityBadge';

// Dentro do componente
<PriorityBadge priority={action.priority} />
```

---

### 📊 Exemplo 2: Adicionar Nova Métrica de Cálculo

**src/utils/calculations.js:**
```javascript
export const calculatePriorityScore = (actions) => {
  const weights = { 'high': 3, 'medium': 2, 'low': 1 };
  return actions.reduce((acc, action) => acc + (weights[action.priority] || 0), 0);
};
```

**src/hooks/useBowTieCalculations.js:**
```javascript
// Adicionar o cálculo ao hook existente
import { calculatePriorityScore } from '../utils/calculations';

export const useBowTieCalculations = (bowTieData, selectedSprint) => {
  const { stageScores, maxImpactScore, bottleneckStageId, priorityScores } = useMemo(() => {
    // ... código existente ...

    // NOVO: Calcular prioridade
    let stageTotalPriority = 0;
    stage.microSteps.forEach(step => {
      const actionsForScore = getActionsForImpactCalculation(step.actions, selectedSprint);
      stageTotalPriority += calculatePriorityScore(actionsForScore);
    });

    scores[stage.id] = {
      impact: stageTotalImpact,
      effort: stageTotalEffort,
      priority: stageTotalPriority // NOVO
    };

    // ... resto do código ...
  }, [bowTieData, selectedSprint]);

  return { stageScores, maxImpactScore, bottleneckStageId };
};
```

---

### 🎨 Exemplo 3: Adicionar Novo Componente de Visualização

```jsx
// src/components/bowtie/BowTieChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const BowTieChart = ({ stageScores }) => {
  const data = Object.entries(stageScores).map(([id, scores]) => ({
    name: id,
    impact: scores.impact,
    effort: scores.effort
  }));

  return (
    <div className="bg-[#0a0a0a] border border-[#333] rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Análise de Impacto</h3>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="impact" fill="#E30613" />
        <Bar dataKey="effort" fill="#FFA500" />
      </BarChart>
    </div>
  );
};

export default BowTieChart;
```

**Usar no index.jsx:**
```jsx
import BowTieChart from './components/bowtie/BowTieChart';

// No return do BowTieApp
<BowTieChart stageScores={stageScores} />
```

---

## 🔧 Como Debugar

### Debugar Cálculos
```javascript
// src/hooks/useBowTieCalculations.js
console.log('Stage Scores:', stageScores);
console.log('Max Impact:', maxImpactScore);
console.log('Bottleneck:', bottleneckStageId);
```

### Debugar Filtros
```javascript
// src/hooks/useFilters.js
console.log('Selected Sprint:', selectedSprint);
console.log('Filtered Actions:', filterActionsBySprint(actions));
```

### Debugar Dados
```javascript
// src/hooks/useBowTieData.js
console.log('BowTie Data:', bowTieData);
```

---

## 🎯 Boas Práticas

### ✅ DO (Faça)
```jsx
// ✅ Componente pequeno e focado
const StatusBadge = ({ status }) => {
  // Apenas renderiza badge
};

// ✅ Hook com responsabilidade única
const useFilters = () => {
  // Apenas gerencia filtros
};

// ✅ Função pura
const calculateScore = (actions) => {
  // Sem side effects
};
```

### ❌ DON'T (Não Faça)
```jsx
// ❌ Componente fazendo tudo
const BigComponent = () => {
  const [data, setData] = useState();
  const [filters, setFilters] = useState();
  // ... 500 linhas ...
};

// ❌ Lógica misturada com apresentação
const Badge = ({ status }) => {
  const data = fetchDataFromAPI(); // ❌
  const score = calculateComplexStuff(); // ❌
  return <span>...</span>;
};
```

---

## 📁 Onde Colocar Cada Coisa

| O Que | Onde |
|-------|------|
| Novo badge/botão genérico | `src/components/common/` |
| Novo layout de página | `src/components/layout/` |
| Componente específico do BowTie | `src/components/bowtie/` |
| Lógica de dados/API | `src/hooks/` |
| Constante/configuração | `src/utils/constants.js` |
| Função de cálculo | `src/utils/calculations.js` |

---

## 🔄 Fluxo de Trabalho

### 1. **Entender a Feature**
- Onde ela se encaixa?
- Precisa de dados novos?
- Precisa de cálculos?
- É visual ou lógica?

### 2. **Dividir em Partes**
```
Feature: "Adicionar filtro por responsável"
│
├─ Dados: Adicionar em useBowTieData
├─ Lógica: Adicionar em useFilters
└─ UI: Adicionar em ActionTable
```

### 3. **Implementar de Baixo para Cima**
1. Constantes (se precisar)
2. Utils/Calculations
3. Hooks
4. Componentes
5. Integração no index.jsx

---

## 🧪 Exemplo Completo: Nova Feature "Exportar para Excel"

### Passo 1: Criar Utilitário
```javascript
// src/utils/export.js
export const exportToExcel = (data) => {
  const csv = convertToCSV(data);
  downloadFile(csv, 'bowtie-actions.csv');
};
```

### Passo 2: Criar Componente
```jsx
// src/components/common/ExportButton.jsx
import React from 'react';
import { Download } from 'lucide-react';
import { exportToExcel } from '../../utils/export';

const ExportButton = ({ data }) => {
  return (
    <button
      onClick={() => exportToExcel(data)}
      className="flex items-center gap-2 px-4 py-2 bg-[#E30613] text-white rounded hover:bg-[#C00510]"
    >
      <Download size={16} />
      Exportar
    </button>
  );
};

export default ExportButton;
```

### Passo 3: Integrar
```jsx
// index.jsx
import ExportButton from './components/common/ExportButton';

// No JSX
<ExportButton data={tableData} />
```

**Pronto! Feature implementada em 3 arquivos separados e testáveis.**

---

## 📚 Recursos Úteis

- **dev-docs.md**: Documentação técnica completa
- **src/README.md**: Estrutura de pastas detalhada
- **REFACTORING_SUMMARY.md**: Visão geral da refatoração
- **index.old.jsx**: Referência do código original

---

**Dica Final:** Sempre que adicionar algo novo, pergunte-se:
- "Este código tem uma única responsabilidade?"
- "Outro dev saberia onde encontrar isso?"
- "Eu posso testar isso isoladamente?"

Se a resposta for "sim" para as 3, você está no caminho certo! 🎯
