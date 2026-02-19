# Ações Recomendadas (Recommended Actions)

## Visão Geral

A feature de **Ações Recomendadas** identifica automaticamente as **top 5 ações** mais prioritárias no backlog que devem ser consideradas para a próxima sprint.

## Como Funciona

### Critérios de Priorização

O algoritmo calcula um **score de recomendação** para cada ação no backlog usando a fórmula:

```
Score = Peso_Impacto - Peso_Esforço + Bônus_Trava
```

**Pesos:**
- Alto = 3 pontos
- Médio = 2 pontos
- Baixo = 1 ponto

**Bônus da Trava:**
- +2 pontos se a ação está no stage identificado como bottleneck (trava)

**Exemplos de Score:**

| Impacto | Esforço | Na Trava? | Cálculo | Score Final |
|---------|---------|-----------|---------|-------------|
| Alto    | Baixo   | ✅ Sim    | 3 - 1 + 2 | **4** 🥇 |
| Alto    | Médio   | ✅ Sim    | 3 - 2 + 2 | **3** 🥈 |
| Alto    | Baixo   | ❌ Não    | 3 - 1 + 0 | **2** |
| Alto    | Alto    | ✅ Sim    | 3 - 3 + 2 | **2** |
| Médio   | Baixo   | ✅ Sim    | 2 - 1 + 2 | **3** 🥈 |
| Médio   | Baixo   | ❌ Não    | 2 - 1 + 0 | **1** |
| Baixo   | Alto    | ✅ Sim    | 1 - 3 + 2 | **0** |

### Regras de Filtragem

**Apenas ações não planejadas (backlog) são consideradas:**
- ✅ Incluídas: Ações onde `sprint === ''` (sem sprint atribuída) E não concluídas/canceladas
- ❌ Excluídas:
  - Ações já planejadas em sprints (`sprint === 'Sprint 1'`, etc)
  - Ações com `status === 'done'` ou `status === 'cancelled'`

**Ranking:**
1. As ações são ordenadas por score (maior para menor)
2. As top 5 são marcadas como recomendadas
3. Em caso de empate, a ordem original é preservada

**Ordenação Automática:**
- **Sem filtro ativo**: Ações recomendadas aparecem automaticamente no topo da tabela
- **Com filtro/ordenação**: Usuário pode ordenar manualmente por qualquer coluna
- **Ao filtrar por "Backlog"**: As ações recomendadas aparecem primeiro

## Visual

### Indicador na Tabela

Ações recomendadas são marcadas com uma **estrela dourada** ⭐ na coluna "Ação":

```
| Sprint | Status  | Ação                          |
|--------|---------|-------------------------------|
| Backlog| Backlog | ⭐ Implementar cache Redis   |
| Backlog| Backlog | ⭐ Otimizar query SQL        |
| Backlog| Backlog | ⭐ Adicionar validação form  |
```

**Tooltip:**
Ao passar o mouse sobre a estrela, aparece:
> "Ação Recomendada: Alto impacto, baixo esforço e/ou na trava"

## Arquitetura

### Arquivos Criados/Modificados

**Novos Arquivos:**
- `src/hooks/useRecommendedActions.js` - Hook principal da feature

**Arquivos Modificados:**
- `src/utils/calculations.js` - Adicionada função `calculateRecommendationScore()`
- `index.jsx` - Integração do hook e passagem de dados
- `src/components/layout/ActionTable.jsx` - Visual da estrela ⭐

### Fluxo de Dados

```
index.jsx
  ├─ useRecommendedActions(bowTieData, bottleneckStageId)
  │   ├─ Coleta todas as ações de todos os stages
  │   ├─ Filtra apenas status === 'backlog'
  │   ├─ Calcula score com calculateRecommendationScore()
  │   ├─ Ordena por score (desc)
  │   └─ Retorna top 5 IDs
  │
  └─ ActionTable
      └─ Renderiza ⭐ se action.id está em recommendedActionIds
```

### Código Principal

**Hook (`useRecommendedActions.js`):**
```javascript
export const useRecommendedActions = (bowTieData, bottleneckStageId) => {
  const recommendedActionIds = useMemo(() => {
    // Coleta todas as ações
    const allActions = [];
    bowTieData.forEach(stage => {
      stage.microSteps.forEach(microStep => {
        microStep.actions.forEach(action => {
          allActions.push({ ...action, stageId: stage.id });
        });
      });
    });

    // Filtra ações não planejadas (sem sprint) e não concluídas
    const backlogActions = allActions.filter(a =>
      (!a.sprint || a.sprint === '') &&
      a.status !== 'done' &&
      a.status !== 'cancelled'
    );

    // Calcula score e retorna top 5
    return backlogActions
      .map(a => ({ ...a, score: calculateRecommendationScore(a, bottleneckStageId) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(a => a.id);
  }, [bowTieData, bottleneckStageId]);

  return recommendedActionIds;
};
```

**Cálculo de Score (`calculations.js`):**
```javascript
export const calculateRecommendationScore = (action, bottleneckStageId) => {
  const impactWeight = IMPACT_WEIGHTS[action.impact] || 0;
  const effortWeight = EFFORT_WEIGHTS[action.effort] || 0;

  let score = impactWeight - effortWeight;

  if (action.stageId === bottleneckStageId) {
    score += 2; // Bônus Trava
  }

  return score;
};
```

## Casos de Uso

### Planejamento de Sprint

**Cenário:**
O time está planejando a próxima sprint e precisa decidir quais ações do backlog priorizar.

**Benefício:**
- ✅ Visualmente identifica as 5 ações mais estratégicas
- ✅ Combina impacto, esforço e localização da trava
- ✅ Economiza tempo de triagem manual

### Revisão de Backlog

**Cenário:**
Product Owner revisa o backlog e quer focar nas ações mais críticas.

**Benefício:**
- ✅ Destaque automático das ações de maior ROI
- ✅ Considera a trava atual do funil
- ✅ Prioriza quick wins (alto impacto, baixo esforço)

## Limitações

1. **Apenas Backlog**: Ações já planejadas (`todo`, `in_progress`) não são consideradas
2. **Top 5 Fixo**: Sempre mostra exatamente 5 ações (ou menos se o backlog tiver < 5 itens)
3. **Sem Filtros**: A recomendação ignora os filtros da tabela (sempre calcula sobre todo o backlog)
4. **Tie-Breaker**: Em caso de empate de score, não há critério de desempate específico

## Próximos Passos (Futuro)

- [ ] Adicionar filtro "Apenas Recomendadas" na tabela
- [ ] Seção dedicada "Top 5 Recomendadas" no topo da página
- [ ] Explicação detalhada do score no tooltip (ex: "Score: 4 (Impacto: 3, Esforço: -1, Trava: +2)")
- [ ] Configurar número de recomendações (3, 5, 10)
- [ ] Exportar lista de recomendações para CSV/PDF

## Referências

- **Algoritmo de Priorização**: Baseado em matriz Impacto x Esforço (Eisenhower Matrix adaptada)
- **Bottleneck Detection**: Documentado em `docs/ARCHITECTURE.md`
- **Weights**: Definidos em `src/utils/constants.js`
