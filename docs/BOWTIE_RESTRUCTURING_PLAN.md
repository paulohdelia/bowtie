# BowTie Funnel Restructuring Plan

## Context

The BowTie application needs a major restructuring to better reflect the Ferraz Piai revenue operations journey. This change consolidates the funnel from **8 stages to 7 stages** and introduces a **category-based subdivision** for two key post-sale stages (Onboarding and Retenção).

**Why this change:**
- Simplify the funnel by consolidating overlapping stages (Diagnósticos, Implementações, Ongoing → merged into categorized Retenção)
- Introduce "Commit" stage to better represent the handover from sales to operations
- Organize Onboarding and Retenção by product portfolio (SABER, TER, EXECUTAR)
- Align micro-steps with actual operational processes documented in `/docs/new_botie.md`

**Current structure (8 stages):**
1. Pré-Venda (4 micro-steps)
2. Aquisição (4 micro-steps)
3. Compromisso (1 micro-step, isKnot: true)
4. Diagnósticos (6 micro-steps, subtitle: "Saber")
5. Onboarding (7 micro-steps, subtitle: "Executar")
6. Implementações (9 micro-steps)
7. Ongoing (6 micro-steps)
8. Monetização (4 micro-steps)

**New structure (7 stages):**
1. **Exposição** (NEW) - empty, no micro-steps
2. **Pré-Venda** - keep existing 4 + add "Reunião realizada"
3. **Aquisição** - keep existing 4 + add "Assinatura de contrato"
4. **Commit** (NEW, replaces Compromisso) - 7 micro-steps for sales-to-ops handover
5. **Onboarding** (RESTRUCTURED) - 3 categories (SABER, TER, EXECUTAR) with different micro-steps
6. **Retenção** (NEW, replaces Diagnósticos/Implementações/Ongoing) - 3 categories (SABER, TER, EXECUTAR)
7. **Expansão** (replaces Monetização) - 6 micro-steps for upsell/expansion

**Major architectural change:**
Onboarding and Retenção are now **category-based stages**. Instead of a single list of micro-steps, they have 3 sub-categories (SABER, TER, EXECUTAR), each with its own micro-steps. Visually, when expanded, these stages show **3 horizontal rows** (one per category) instead of a single row.

---

## Implementation Approach

### Data Model Strategy

Extend the Stage data model to support both **simple** (current pattern) and **categorized** (new pattern) structures:

**Simple stage (preserved):**
```javascript
{
  id: 'prevenda',
  title: 'Pré-Venda',
  microSteps: [
    { name: 'Prospect', actions: [...] },
    { name: 'Reunião realizada', actions: [...] }
  ]
}
```

**Categorized stage (NEW):**
```javascript
{
  id: 'onboarding',
  title: 'Onboarding',
  isCategorized: true,  // NEW flag
  categories: [          // NEW structure
    {
      name: 'SABER',
      microSteps: [
        { name: 'Revisão do V4 Marketing', actions: [...] },
        { name: 'Kickoff', actions: [...] },
        ...
      ]
    },
    {
      name: 'TER',
      microSteps: []  // empty for now
    },
    {
      name: 'EXECUTAR',
      microSteps: [...]
    }
  ]
}
```

**Why this approach:**
- Backward compatible: simple stages use existing `microSteps` array
- Forward compatible: categorized stages use new `categories` array
- Easy detection: `isCategorized` flag
- Minimal breaking changes to hooks/calculations

---

## Critical Files to Modify

### Phase 1: Configuration Layer

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/src/config/api.js`

**Changes:**
1. Replace `STAGE_CONFIG` with new 7-stage structure
2. Add category definitions for Onboarding and Retenção
3. Update all micro-step definitions per `/docs/new_botie.md`

**New structure example:**
```javascript
export const STAGE_CONFIG = {
  'Exposição': {
    id: 'exposicao',
    height: 'h-40',
    microSteps: []
  },
  'Pré-Venda': {
    id: 'prevenda',
    height: 'h-80',
    microSteps: [
      'Prospect',
      'Tentativa de Contato',
      'Conectado',
      'Reunião Agendada',
      'Reunião realizada'  // NEW
    ]
  },
  'Aquisição': {
    id: 'aquisicao',
    height: 'h-64',
    microSteps: [
      'Validação',
      'Proposta Enviada',
      'Em Negociação',
      'Contrato na Rua',
      'Assinatura de contrato'  // NEW
    ]
  },
  'Commit': {  // NEW stage (replaces Compromisso)
    id: 'commit',
    height: 'h-48',
    isKnot: true,  // Central node
    microSteps: [
      'Assinatura do Contrato',
      'V4 Marketing',
      'Mensagem Próximos Passos (Vendedor)',
      'Revisão da venda (Gerente)',
      'Atribuição de projeto (Squad)',
      'Call Handover Comercial para Ops (Coordenador)',
      'Atribuição do time operacional (Coordenador)'
    ]
  },
  'Onboarding': {
    id: 'onboarding',
    height: 'h-96',  // Taller for 3 rows
    isCategorized: true,  // NEW flag
    categories: {
      'SABER': [
        'Revisão do V4 Marketing',
        'Boas-vindas (Gerente - Grupo Whats)',
        'Kickoff',
        'Coleta de Acessos'
      ],
      'TER': [],  // Empty for now
      'EXECUTAR': [
        'Revisão do V4 Marketing',
        'Boas-vindas (Gerente - Grupo Whats)',
        'Kickoff',
        'Coleta de Acessos',
        'Planejamento Interno',
        'Planejamento Revisão',
        'Apresentação Planejamento',
        'Encerramento (CSAT)'
      ]
    }
  },
  'Retenção': {  // NEW stage
    id: 'retencao',
    height: 'h-96',  // Taller for 3 rows
    isCategorized: true,
    categories: {
      'SABER': [
        'Fase 2',
        'Fase 3',
        'Fase 4',
        'Fase 5',
        'Encerramento (NPS)'
      ],
      'TER': [],  // Empty for now
      'EXECUTAR': [
        'DO (Execução)',
        'CHECK (Qualidade)',
        'ACT (Otimizações)',
        'PLAN (Replanejamento)',
        'Check-in (Revisão)',
        'Check-in (Cliente)'
      ]
    }
  },
  'Expansão': {  // Replaces Monetização
    id: 'expansao',
    height: 'h-96',
    microSteps: [
      'Levantada de mão',
      'Validação',
      'Proposta enviada',
      'Em negociação',
      'Contrato na rua',
      'Assinatura de contrato'
    ]
  }
};

// NEW: Category order for rendering
export const CATEGORY_ORDER = ['SABER', 'TER', 'EXECUTAR'];
```

---

### Phase 2: Data Transformation Layer

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/src/utils/dataTransformer.js`

**Changes:**
1. Update `buildStage()` function to handle categorized stages
2. Parse 3-part micro_etapa format: "Macro | Category | Micro"
3. Fall back to 2-part format for backward compatibility
4. Map old stage names to new ones (Compromisso → Commit, Monetização → Expansão, etc.)

**Key logic additions:**

```javascript
// NEW: Parse micro_etapa to extract category
const parseMicroEtapa = (microEtapa) => {
  const parts = microEtapa.split(' | ');
  if (parts.length === 3) {
    return { macro: parts[0], category: parts[1], micro: parts[2] };
  } else if (parts.length === 2) {
    return { macro: parts[0], category: null, micro: parts[1] };
  }
  return { macro: null, category: null, micro: microEtapa };
};

// UPDATED: buildStage to handle categories
const buildStage = (macroEtapa, actions) => {
  const config = STAGE_CONFIG[macroEtapa];

  if (config.isCategorized) {
    // Initialize category structure
    const categorized = {};

    Object.keys(config.categories).forEach(catName => {
      categorized[catName] = {};
      config.categories[catName].forEach(microName => {
        categorized[catName][microName] = [];
      });
    });

    // Distribute actions by category + micro-step
    actions.forEach(action => {
      const parsed = parseMicroEtapa(action.microEtapa);
      const category = parsed.category || 'SABER'; // Default category
      const microName = parsed.micro;

      if (categorized[category]?.[microName]) {
        categorized[category][microName].push(action);
      }
    });

    // Build categories array
    const categories = Object.entries(categorized).map(([catName, microGroups]) => ({
      name: catName,
      microSteps: Object.entries(microGroups).map(([microName, actions]) => ({
        name: microName,
        actions: actions
      }))
    }));

    return {
      id: config.id,
      title: macroEtapa,
      height: config.height,
      isKnot: config.isKnot,
      isCategorized: true,
      categories: categories
    };
  } else {
    // Simple stage (existing logic preserved)
    // ... existing code for simple stages
  }
};
```

**Backward compatibility notes:**
- Support both "Macro | Micro" (old) and "Macro | Category | Micro" (new) formats
- Map old stage names: Compromisso → Commit, Monetização → Expansão
- Default categorized actions to SABER if no category specified

---

### Phase 3: Component Rendering

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/src/components/bowtie/BowTieStage.jsx`

**Changes:**
1. Detect categorized stages via `stage.isCategorized` flag
2. Render 3 vertical rows instead of horizontal cards
3. Each row: category label (SABER/TER/EXECUTAR) + horizontal micro-step cards
4. Handle empty categories (TER) with empty state

**Rendering logic (expanded state):**

```javascript
{isActive && stage.isCategorized && (
  <div className="absolute inset-0 flex w-full h-full">
    {/* Title area (left) - 220px width */}
    <div className="w-[220px] shrink-0 flex flex-col justify-center items-center p-6 border-r border-[#222]">
      <h3 className="text-xl font-bold text-[#E30613] mb-2">{stage.title}</h3>
      <div className="text-xs text-gray-400">
        Total: {totalActionsCount}
      </div>
      <div className="text-xs text-gray-500">
        {selectedSprint || 'Visão Geral'}
      </div>
    </div>

    {/* Categories area (right) - 3 vertical rows */}
    <div className="flex-1 flex flex-col gap-0">
      {stageMetrics.categories.map((category, idx) => (
        <div
          key={category.name}
          className={`flex-1 flex flex-col px-4 py-3 ${idx < stageMetrics.categories.length - 1 ? 'border-b border-gray-800' : ''}`}
        >
          {/* Category label */}
          <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">
            {category.name}
          </div>

          {/* Horizontal micro-step cards */}
          {category.microSteps.length > 0 ? (
            <div className="flex flex-row gap-3 overflow-x-auto pb-2">
              {category.microSteps.map(step => (
                <div
                  key={step.name}
                  className="flex flex-col justify-between p-3 bg-[#161616] border border-[#222] hover:border-[#E30613] rounded transition-all h-full min-w-[180px] w-[180px] shrink-0"
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

{isActive && !stage.isCategorized && (
  // Existing horizontal layout for simple stages
  // ... preserve existing code
)}
```

**Visual layout specification:**
- Fixed title area: 220px width (left)
- 3 equal-height rows (flex-1 each)
- Each row has horizontal scrollable micro-step cards
- Card size: 180px width (same as current)
- Gap between cards: 12px
- Border between rows: gray-800

---

### Phase 4: Container Metrics Calculation

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/src/components/bowtie/BowTieContainer.jsx`

**Changes:**
1. Update metrics calculation to handle categories
2. Compute per-category micro-step counts

**Logic addition:**

```javascript
// In BowTieContainer component, before rendering stages
const stageMetricsArray = bowTieData.map(stage => {
  if (stage.isCategorized) {
    // Calculate metrics per category
    const categories = stage.categories.map(category => ({
      name: category.name,
      microSteps: category.microSteps.map(step => {
        const filtered = filterActionsBySprint(step.actions);
        return {
          name: step.name,
          count: filtered.length,
          totalActions: step.actions.length
        };
      })
    }));

    return { ...stage, categories };
  } else {
    // Simple stage (existing logic)
    const microSteps = stage.microSteps.map(step => {
      const filtered = filterActionsBySprint(step.actions);
      return {
        name: step.name,
        count: filtered.length,
        totalActions: step.actions.length
      };
    });

    return { ...stage, microSteps };
  }
});
```

---

### Phase 5: Hooks and Calculations

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/src/hooks/useBowTieCalculations.js`

**Changes:**
1. Loop through categories if `stage.isCategorized` is true
2. Aggregate scores at stage level (sum across all categories)

**Updated calculation logic:**

```javascript
bowTieData.forEach(stage => {
  let stageTotalImpact = 0;
  let stageTotalEffort = 0;

  if (stage.isCategorized) {
    // Categorized stage: loop through categories
    stage.categories.forEach(category => {
      category.microSteps.forEach(step => {
        const actionsForScore = getActionsForImpactCalculation(step.actions, selectedSprint);
        stageTotalImpact += calculateImpactScore(actionsForScore);
        stageTotalEffort += calculateEffortScore(actionsForScore);
      });
    });
  } else {
    // Simple stage: loop through micro-steps
    stage.microSteps.forEach(step => {
      const actionsForScore = getActionsForImpactCalculation(step.actions, selectedSprint);
      stageTotalImpact += calculateImpactScore(actionsForScore);
      stageTotalEffort += calculateEffortScore(actionsForScore);
    });
  }

  scores[stage.id] = { impact: stageTotalImpact, effort: stageTotalEffort };
});
```

**Note:** Categories are internal structure only. Bottleneck detection still works at stage level.

---

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/src/hooks/useFilters.js`

**Changes:**
- Update micro-step filter options to flatten categorized stages
- Format: "Category | Micro-step name" for categorized stages

---

### Phase 6: Micro-Step Normalization

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/src/utils/microStepMapping.js`

**Changes:**
1. Add all new micro-steps from Commit, Onboarding categories, Retenção categories, Expansão
2. Remove mappings for deleted stages (Compromisso, Diagnósticos, Implementações, Ongoing, Monetização)
3. Support 3-part format normalization

**Key additions:**

```javascript
// Commit micro-steps
'assinatura do contrato': 'Assinatura do Contrato',
'v4 marketing': 'V4 Marketing',
'mensagem próximos passos (vendedor)': 'Mensagem Próximos Passos (Vendedor)',
'revisão da venda (gerente)': 'Revisão da venda (Gerente)',
'atribuição de projeto (squad)': 'Atribuição de projeto (Squad)',
'call handover comercial para ops (coordenador)': 'Call Handover Comercial para Ops (Coordenador)',
'atribuição do time operacional (coordenador)': 'Atribuição do time operacional (Coordenador)',

// Onboarding - SABER/EXECUTAR
'revisão do v4 marketing': 'Revisão do V4 Marketing',
'boas-vindas (gerente - grupo whats)': 'Boas-vindas (Gerente - Grupo Whats)',
'coleta de acessos': 'Coleta de Acessos',
'planejamento interno': 'Planejamento Interno',
'planejamento revisão': 'Planejamento Revisão',
'apresentação planejamento': 'Apresentação Planejamento',
'encerramento (csat)': 'Encerramento (CSAT)',

// Retenção - SABER
'fase 2': 'Fase 2',
'fase 3': 'Fase 3',
'fase 4': 'Fase 4',
'fase 5': 'Fase 5',
'encerramento (nps)': 'Encerramento (NPS)',

// Retenção - EXECUTAR
'do (execução)': 'DO (Execução)',
'check (qualidade)': 'CHECK (Qualidade)',
'act (otimizações)': 'ACT (Otimizações)',
'plan (replanejamento)': 'PLAN (Replanejamento)',
'check-in (revisão)': 'Check-in (Revisão)',
'check-in (cliente)': 'Check-in (Cliente)',

// Expansão
'levantada de mão': 'Levantada de mão',
'em negociação': 'Em negociação',
// ... rest of Expansão micro-steps
```

**Total micro-steps after restructuring:** ~50+ across all stages and categories

---

### Phase 7: Documentation Updates

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/docs/STAGES_AND_MICROSTEPS.md`

**Changes:**
Complete rewrite documenting:
1. New 7-stage structure
2. Category pattern for Onboarding and Retenção
3. All micro-steps organized by stage and category
4. Visual layout specifications
5. Update statistics (7 stages, ~50 micro-steps)

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/CLAUDE.md`

**Changes:**
1. Update stage count: 8 → 7
2. Update Core Concepts section with category pattern
3. Add note about categorized stages (SABER, TER, EXECUTAR)
4. Update examples with new stage names

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/docs/new_botie.md`

**Changes:**
- Archive or delete (information migrated to official docs)
- Or convert to changelog documenting the migration

**New file:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/docs/CATEGORIZED_STAGES.md`

**Content:**
Detailed guide explaining:
- What categorized stages are
- How SABER, TER, EXECUTAR relate to product portfolio
- Visual layout and rendering differences
- API data format expectations (3-part micro_etapa)
- Examples and troubleshooting

---

### Phase 8: AI Agent Classification

**File:** `/Users/paulohdelia/Public/www/bowtie-ferraz-piai/agents/action-classifier-prompt.md`

**Changes:**
1. Replace entire micro-step list with new structure
2. Add examples using 3-part format for categorized stages
3. Update macro_etapa enum
4. Update instructions to handle categories

**Format examples:**

```
# Macro-etapa (Stage)
Must be one of:
- Exposição
- Pré-Venda
- Aquisição
- Commit
- Onboarding
- Retenção
- Expansão

# Micro-etapa Format
For simple stages: "Macro | Micro"
For categorized stages (Onboarding, Retenção): "Macro | Category | Micro"

Examples:
- "Pré-Venda | Prospect"
- "Pré-Venda | Reunião realizada"
- "Commit | V4 Marketing"
- "Onboarding | SABER | Kickoff"
- "Onboarding | EXECUTAR | Planejamento Interno"
- "Retenção | SABER | Fase 2"
- "Retenção | EXECUTAR | DO (Execução)"
- "Expansão | Levantada de mão"
```

---

## Implementation Sequence

To minimize breaking changes, follow this order:

1. **Phase 1: Configuration** (`api.js`)
   - Create new STAGE_CONFIG with 7 stages
   - Add CATEGORY_ORDER constant
   - Test: Import doesn't break

2. **Phase 2: Transformer** (`dataTransformer.js`)
   - Add `parseMicroEtapa()` helper
   - Update `buildStage()` to handle categories
   - Test: Transformer with mock data

3. **Phase 3: Micro-step mapping** (`microStepMapping.js`)
   - Add all new micro-steps
   - Remove old stage mappings
   - Test: Normalization works

4. **Phase 4: Component rendering** (`BowTieStage.jsx`)
   - Add conditional rendering for categories
   - Preserve simple stage rendering
   - Test: Both layouts render correctly

5. **Phase 5: Container metrics** (`BowTieContainer.jsx`)
   - Add category metrics calculation
   - Test: Counts are correct

6. **Phase 6: Hooks** (`useBowTieCalculations.js`, `useFilters.js`)
   - Update calculations to loop through categories
   - Update filters to flatten categories
   - Test: Scores and filters work

7. **Phase 7: Documentation** (all doc files)
   - Update all documentation at once
   - Test: References are consistent

8. **Phase 8: AI agent** (`action-classifier-prompt.md`)
   - Update classification prompt
   - Test: GPT-4 outputs correct format

---

## Migration Considerations

**Backward compatibility during transition:**
- Transformer should handle both 2-part ("Macro | Micro") and 3-part ("Macro | Category | Micro") formats
- Old stage names should map to new ones:
  - Compromisso → Commit
  - Monetização → Expansão
  - Diagnósticos → Map to Retenção | SABER (for Fase 2-5 micro-steps)
  - Implementações → Map to Retenção | EXECUTAR
  - Ongoing → Map to Retenção | EXECUTAR
- Default category for categorized stages: SABER (if no category specified in API data)

**Data migration strategy:**
- Existing "Compromisso" actions → "Commit"
- Existing "Diagnósticos" Fase 2-5 → "Retenção | SABER | Fase 2-5"
- Existing "Onboarding" actions → "Onboarding | EXECUTAR | [micro-step]" (default to EXECUTAR)
- Existing "Implementações" → Map to "Retenção | EXECUTAR"
- Existing "Ongoing" → "Retenção | EXECUTAR"
- Existing "Monetização" → "Expansão"

---

## Visual Layout Specifications

### Categorized Stage (Expanded)

```
┌─────────────────┬────────────────────────────────────────────┐
│                 │ SABER                                       │
│   Onboarding    │ [Card] [Card] [Card] [Card] →              │
│                 ├─────────────────────────────────────────────┤
│   Total: 47     │ TER                                         │
│   Sprint 3      │ (Nenhuma micro-etapa definida)              │
│                 ├─────────────────────────────────────────────┤
│                 │ EXECUTAR                                    │
│                 │ [Card] [Card] [Card] [Card] [Card] →       │
└─────────────────┴────────────────────────────────────────────┘
  220px width       Independent horizontal scroll per category
```

### Width Calculation
- Title area (left): Fixed 220px
- Category rows: Each scrolls independently
- Card dimensions: 180px × auto height
- Gap between cards: 12px
- Stage total width: 220px + (widest_category_width) + padding

### Heights
- Exposição: `h-40` (small, empty)
- Pré-Venda: `h-80` (tall, entry funnel)
- Aquisição: `h-64` (medium-tall)
- Commit: `h-48` (small, central knot)
- Onboarding: `h-96` (very tall, 3 rows)
- Retenção: `h-96` (very tall, 3 rows)
- Expansão: `h-96` (very tall, exit funnel)

---

## Testing & Verification

**After implementation, verify:**

1. **Data transformation:**
   - [ ] All 7 stages are created
   - [ ] Categorized stages have 3 categories
   - [ ] Actions are correctly distributed to categories
   - [ ] Backward compatibility with 2-part format works

2. **Visual rendering:**
   - [ ] Simple stages expand horizontally (Exposição, Pré-Venda, Aquisição, Commit, Expansão)
   - [ ] Categorized stages expand with 3 vertical rows (Onboarding, Retenção)
   - [ ] Empty categories show placeholder message
   - [ ] Micro-step cards display correct counts

3. **Calculations:**
   - [ ] Impact/effort scores aggregate correctly for categorized stages
   - [ ] Bottleneck detection works across all stages
   - [ ] Heatmap intensities are correct

4. **Filtering:**
   - [ ] Sprint filter works
   - [ ] Micro-step filter includes categorized options
   - [ ] Table displays actions correctly

5. **AI agent:**
   - [ ] GPT-4 outputs 3-part format for Onboarding/Retenção
   - [ ] Classification accuracy is maintained

---

## Potential Challenges & Solutions

**Challenge 1: Empty categories (TER)**
- **Solution:** Render with placeholder: "Nenhuma micro-etapa definida"
- Allow for future expansion

**Challenge 2: Micro-step name collisions**
- Example: "Kickoff" appears in both SABER and EXECUTAR
- **Solution:** Use category as namespace, full path in API: "Onboarding | SABER | Kickoff"

**Challenge 3: Different card counts per category**
- **Solution:** Each row scrolls independently (overflow-x-auto per row)
- Stage width = max(category widths)

**Challenge 4: Bottleneck calculation with categories**
- **Solution:** Still aggregate at stage level (sum all categories)
- Categories are internal structure, bottleneck is per-stage

**Challenge 5: Table flattening**
- **Solution:** Include category in micro-step display: "Onboarding - SABER | Kickoff"

---

## Success Criteria

The restructuring is complete when:

1. ✅ All 7 stages render correctly (closed and expanded states)
2. ✅ Categorized stages (Onboarding, Retenção) show 3 rows when expanded
3. ✅ Impact scores and bottleneck detection work correctly
4. ✅ Filters function properly (sprint, status, person, micro-step)
5. ✅ ActionTable displays all actions with correct stage/category/micro-step labels
6. ✅ Documentation is updated and accurate
7. ✅ AI agent classifies actions correctly with new structure
8. ✅ No visual regressions (heatmap, transitions, responsive design)
9. ✅ Application loads without errors
10. ✅ Data from API is correctly transformed and displayed

---

**Document created:** 2026-02-19
**Status:** Planning phase - Implementation pending
**Estimated effort:** 8-12 hours (across 8 phases)
