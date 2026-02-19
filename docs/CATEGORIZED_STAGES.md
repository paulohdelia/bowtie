# Etapas Categorizadas (Categorized Stages)

**Versão:** 1.0
**Data:** 19 de fevereiro de 2026
**Status:** 📘 Guia Técnico

Este documento explica o padrão de **etapas categorizadas** introduzido na versão 3.0 do BowTie, usado nas etapas **Onboarding** e **Retenção**.

---

## 📖 O Que São Etapas Categorizadas?

Etapas categorizadas são etapas do funil BowTie que, ao invés de ter uma lista plana de micro-etapas, são organizadas em **3 categorias** baseadas no portfólio de produtos da Ferraz Piai:

- **SABER** - Produtos/serviços de diagnóstico e conhecimento
- **TER** - Produtos/serviços de recursos e ferramentas (reservado para uso futuro)
- **EXECUTAR** - Produtos/serviços de execução e implementação

### Por que Categorizar?

1. **Alinhamento com o negócio:** O portfólio da Ferraz Piai se divide naturalmente nessas 3 categorias
2. **Melhor organização:** Permite rastrear ações por linha de produto
3. **Escalabilidade:** Facilita adicionar novos produtos sem reestruturar etapas
4. **Visibilidade:** UI mostra claramente qual categoria cada ação pertence

---

## 🏗️ Estrutura de Dados

### Etapa Simples (padrão anterior)

```javascript
{
  id: 'prevenda',
  title: 'Pré-Venda',
  height: 'h-80',
  microSteps: [
    { name: 'Prospect', actions: [...] },
    { name: 'Conectado', actions: [...] }
  ]
}
```

### Etapa Categorizada (novo padrão)

```javascript
{
  id: 'onboarding',
  title: 'Onboarding',
  height: 'h-96',
  isCategorized: true,  // ← Flag que indica categorização
  categories: [         // ← Array de categorias
    {
      name: 'SABER',
      microSteps: [
        { name: 'Kickoff', actions: [...] },
        { name: 'Coleta de Acessos', actions: [...] }
      ]
    },
    {
      name: 'TER',
      microSteps: []  // Categoria vazia
    },
    {
      name: 'EXECUTAR',
      microSteps: [
        { name: 'Planejamento Interno', actions: [...] },
        { name: 'Apresentação Planejamento', actions: [...] }
      ]
    }
  ]
}
```

**Diferenças principais:**
1. Flag `isCategorized: true`
2. `categories` array ao invés de `microSteps` array
3. Cada categoria tem seu próprio array de `microSteps`

---

## 📊 Formato de API

### Formato de 3 Partes

Para etapas categorizadas, o campo `micro_etapa` na API deve usar o formato de **3 partes**:

```
"Macro | Categoria | Micro"
```

**Exemplos:**
```json
{
  "macro_etapa": "Onboarding",
  "micro_etapa": "Onboarding | SABER | Kickoff",
  "acao": "Realizar kickoff com cliente"
}
```

```json
{
  "macro_etapa": "Retenção",
  "micro_etapa": "Retenção | EXECUTAR | DO (Execução)",
  "acao": "Executar ações do plano"
}
```

### Parsing Automático

O sistema parseia o formato automaticamente:

```javascript
// src/utils/dataTransformer.js
const parseMicroEtapa = (microEtapa) => {
  const parts = microEtapa.split(' | ');
  if (parts.length === 3) {
    return {
      macro: parts[0].trim(),    // "Onboarding"
      category: parts[1].trim(), // "SABER"
      micro: parts[2].trim()     // "Kickoff"
    };
  }
  // ... fallback para formato antigo (2 partes)
};
```

### Backward Compatibility

O sistema ainda aceita o formato antigo de 2 partes para etapas categorizadas:

```
"Onboarding | Kickoff"  → defaulta para categoria "SABER"
```

---

## 🎨 Renderização Visual

### Estado Fechado

Etapas categorizadas e simples têm a mesma aparência quando fechadas:
- Título da etapa
- Score de impacto
- Contador total de ações

### Estado Expandido (Diferença Principal)

**Etapa Simples:**
```
┌─────────────┬────────────────────────────────┐
│             │ [Card] [Card] [Card] [Card] → │
│  Pré-Venda  │                                │
│             │ (scroll horizontal)            │
└─────────────┴────────────────────────────────┘
  220px width   Horizontal micro-step cards
```

**Etapa Categorizada:**
```
┌─────────────┬────────────────────────────────┐
│             │ SABER                           │
│             │ [Card] [Card] [Card] →         │
│             ├─────────────────────────────────┤
│  Onboarding │ TER                             │
│             │ (Nenhuma micro-etapa definida)  │
│             ├─────────────────────────────────┤
│             │ EXECUTAR                        │
│             │ [Card] [Card] [Card] →         │
└─────────────┴────────────────────────────────┘
  220px width   3 vertical rows, each scrolls
                independently
```

### Especificações de Layout

- **Título (esquerda):** 220px de largura fixa
- **Área de categorias (direita):** 3 linhas verticais de altura igual
- **Cada linha:**
  - Label da categoria (12px uppercase, gray)
  - Cards de micro-etapas (180px × auto)
  - Scroll horizontal independente
  - Gap de 12px entre cards
- **Separador:** Linha cinza entre categorias (exceto última)
- **Categoria vazia:** Texto em itálico "Nenhuma micro-etapa definida"

---

## 🧮 Cálculos e Métricas

### Score de Impacto

O score de impacto de uma etapa categorizada é a **soma de todas as categorias**:

```javascript
// src/hooks/useBowTieCalculations.js
if (stage.isCategorized) {
  stage.categories.forEach(category => {
    category.microSteps.forEach(step => {
      stageTotalImpact += calculateImpactScore(step.actions);
    });
  });
} else {
  // ... lógica simples
}
```

**Importante:** Para fins de bottleneck detection, etapas categorizadas competem em pé de igualdade com etapas simples. O sistema não distingue categorias nesse cálculo.

### Contagem de Ações

```javascript
// src/components/bowtie/BowTieContainer.jsx
const totalFilteredBacklog = categories.reduce((total, cat) =>
  total + cat.microSteps.reduce((sum, step) => sum + step.count, 0), 0
);
```

### Filtros

Filtros funcionam em todos os níveis:
- **Sprint:** Aplicado às ações dentro das micro-etapas
- **Status:** Aplicado às ações
- **Pessoa:** Aplicado às ações
- **Micro-step:** Pode filtrar por categoria completa ou micro-step específica

---

## 🔧 Componentes Afetados

### 1. BowTieStage.jsx

Renderização condicional:

```jsx
{isActive && stage.isCategorized && (
  <div className="flex w-full h-full">
    {/* Título à esquerda */}
    <div className="w-[220px]">...</div>

    {/* 3 linhas verticais */}
    <div className="flex-1 flex flex-col">
      {stageMetrics.categories.map(category => (
        <div key={category.name} className="flex-1">
          <div>{category.name}</div>
          {category.microSteps.map(step => (
            <div>{step.name}: {step.count}</div>
          ))}
        </div>
      ))}
    </div>
  </div>
)}
```

### 2. BowTieContainer.jsx

Cálculo de métricas separado:

```javascript
if (stage.isCategorized) {
  const categories = stage.categories.map(category => ({
    name: category.name,
    microSteps: category.microSteps.map(step => ({
      name: step.name,
      count: filterActionsBySprint(step.actions).length
    }))
  }));
  stageMetrics = { categories };
} else {
  // ... lógica simples
}
```

### 3. ActionTable.jsx

Exibe categoria na coluna de micro-etapa:

```jsx
<td>
  {action.categoryName
    ? `${action.categoryName} | ${action.microStepName}`
    : action.microStepName
  }
</td>
```

### 4. Hooks (useFilters, useBowTieCalculations, useRecommendedActions)

Todos os hooks foram atualizados para iterar sobre categorias quando `stage.isCategorized === true`.

---

## 🧪 Testando Etapas Categorizadas

### Checklist de Teste Visual

- [ ] Etapa expandida mostra 3 linhas verticais
- [ ] Labels de categoria (SABER, TER, EXECUTAR) são visíveis
- [ ] Categoria TER mostra placeholder "Nenhuma micro-etapa definida"
- [ ] Cada linha tem scroll horizontal independente
- [ ] Cards de micro-etapa exibem contadores corretos
- [ ] Altura da etapa é `h-96` (mais alta que simples)

### Checklist de Teste de Dados

- [ ] Score de impacto soma todas as categorias
- [ ] Filtro de sprint funciona em ações de todas as categorias
- [ ] Tabela exibe "SABER | Kickoff" corretamente
- [ ] Bottleneck detection considera categorias corretamente
- [ ] Ações recomendadas incluem ações de categorias

### Exemplo de Payload de Teste

```json
[
  {
    "macro_etapa": "Onboarding",
    "micro_etapa": "Onboarding | SABER | Kickoff",
    "acao": "Realizar kickoff com cliente",
    "impacto": 8,
    "esforco": 3,
    "sprint": "Sprint 3",
    "status": "in_progress"
  },
  {
    "macro_etapa": "Onboarding",
    "micro_etapa": "Onboarding | EXECUTAR | Planejamento Interno",
    "acao": "Criar planejamento de marketing",
    "impacto": 9,
    "esforco": 7,
    "sprint": "Sprint 3",
    "status": "todo"
  }
]
```

---

## 🚨 Troubleshooting

### Problema: Categoria não aparece

**Sintomas:** Cards aparecem em categoria errada ou defaultam para SABER

**Solução:**
1. Verificar formato de API: deve ter 3 partes (`"Macro | Categoria | Micro"`)
2. Verificar que categoria existe em `STAGE_CONFIG.categories`
3. Verificar normalização em `microStepMapping.js`

### Problema: Categoria vazia não mostra placeholder

**Sintomas:** Linha da categoria fica em branco

**Solução:**
Verificar condicional em `BowTieStage.jsx`:
```jsx
{category.microSteps && category.microSteps.length > 0 ? (
  // ... cards
) : (
  <div>Nenhuma micro-etapa definida</div>
)}
```

### Problema: Score errado para etapa categorizada

**Sintomas:** Bottleneck não detectado corretamente

**Solução:**
Verificar loop em `useBowTieCalculations.js`:
```javascript
if (stage.isCategorized) {
  stage.categories.forEach(category => {
    category.microSteps.forEach(step => {
      // ... calcular score
    });
  });
}
```

---

## 📚 Exemplos de Uso

### Adicionar Nova Categoria

```javascript
// src/config/api.js
export const STAGE_CONFIG = {
  'Onboarding': {
    id: 'onboarding',
    height: 'h-96',
    isCategorized: true,
    categories: {
      'SABER': [...],
      'TER': [
        'Nova Micro-Etapa TER'  // ← Adicionar aqui
      ],
      'EXECUTAR': [...]
    }
  }
};

// src/utils/microStepMapping.js
export const MICRO_STEP_MAPPING = {
  'nova micro-etapa ter': 'Nova Micro-Etapa TER',
  'nova micro ter': 'Nova Micro-Etapa TER'
};
```

### Migrar Micro-Etapa de Categoria

Se precisar mover "Kickoff" de SABER para EXECUTAR:

```javascript
// Antes
'SABER': ['Kickoff', ...]

// Depois
'EXECUTAR': ['Kickoff', ...]
```

**Nota:** Dados antigos continuarão funcionando se usarem o formato de 3 partes correto na API.

---

## 🔮 Planejamento Futuro

### Categoria TER

Atualmente vazia, reservada para produtos/serviços de recursos e ferramentas. Possíveis micro-etapas futuras:

- Configuração de ferramentas
- Treinamento de ferramentas
- Auditoria de recursos

### Flexibilidade de Categorias

O sistema foi projetado para suportar categorias customizadas no futuro. Para adicionar novas categorias:

1. Atualizar `CATEGORY_ORDER` em `src/config/api.js`
2. Adicionar categoria em `STAGE_CONFIG`
3. Atualizar renderização em `BowTieStage.jsx` (se necessário ajustar altura)

---

**Última atualização:** 19 de fevereiro de 2026
**Mantido por:** Equipe de Desenvolvimento Ferraz Piai
**Revisão:** A cada mudança em categorias ou etapas categorizadas
