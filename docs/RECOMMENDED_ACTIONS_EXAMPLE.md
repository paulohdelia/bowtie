# Exemplo Visual: Ações Recomendadas

## Como Aparece na Tabela

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           📊 PLANO DE AÇÃO                                 │
│  Filtros: [Sprint 4 ▼] [Status: Todos ▼] [Responsável: Todos ▼]          │
└────────────────────────────────────────────────────────────────────────────┘

┌─────────┬────────┬─────────┬────────────────────────────────────────────────┐
│ Sprint  │ Status │ Ação                                            │ Prazo │
├─────────┼────────┼─────────┼────────────────────────────────────────────────┤
│ Backlog │ 🔘     │ ⭐ Implementar cache Redis no backend          │ -     │ ← Top #1
│ Backlog │ 🔘     │ ⭐ Otimizar query SQL da lista de pedidos      │ -     │ ← Top #2
│ Backlog │ 🔘     │ ⭐ Adicionar validação de CPF no formulário    │ -     │ ← Top #3
│ Backlog │ 🔘     │ ⭐ Criar dashboard de métricas de vendas       │ -     │ ← Top #4
│ Backlog │ 🔘     │ ⭐ Automatizar envio de emails de follow-up    │ -     │ ← Top #5
│ Backlog │ 🔘     │    Refatorar componente de tabela              │ -     │
│ Backlog │ 🔘     │    Adicionar testes unitários                  │ -     │
│ Sprint 4│ 📝     │    Implementar login social                    │ 20/02 │
└─────────┴────────┴─────────┴────────────────────────────────────────────────┘

⭐ = Ação Recomendada (alto impacto, baixo esforço e/ou na trava)
```

## Exemplo de Cálculo Real

Suponha que temos estas ações no backlog:

### Ação 1: "Implementar cache Redis"
- **Impacto**: Alto (3 pontos)
- **Esforço**: Médio (2 pontos)
- **Na Trava?**: ✅ Sim (stage "Aquisição")
- **Cálculo**: 3 - 2 + 2 = **5 pontos** 🥇

### Ação 2: "Otimizar query SQL"
- **Impacto**: Alto (3 pontos)
- **Esforço**: Baixo (1 ponto)
- **Na Trava?**: ✅ Sim (stage "Aquisição")
- **Cálculo**: 3 - 1 + 2 = **4 pontos** 🥈

### Ação 3: "Adicionar validação CPF"
- **Impacto**: Alto (3 pontos)
- **Esforço**: Baixo (1 ponto)
- **Na Trava?**: ❌ Não
- **Cálculo**: 3 - 1 + 0 = **2 pontos** 🥉

### Ação 4: "Dashboard de métricas"
- **Impacto**: Médio (2 pontos)
- **Esforço**: Baixo (1 ponto)
- **Na Trava?**: ✅ Sim (stage "Aquisição")
- **Cálculo**: 2 - 1 + 2 = **3 pontos**

### Ação 5: "Automatizar emails"
- **Impacto**: Médio (2 pontos)
- **Esforço**: Baixo (1 ponto)
- **Na Trava?**: ❌ Não
- **Cálculo**: 2 - 1 + 0 = **1 ponto**

### Ação 6: "Refatorar componente" (NÃO recomendada)
- **Impacto**: Baixo (1 ponto)
- **Esforço**: Alto (3 pontos)
- **Na Trava?**: ❌ Não
- **Cálculo**: 1 - 3 + 0 = **-2 pontos** ❌

---

## Ranking Final (Top 5)

| Posição | Score | Ação                          | Motivo                                    |
|---------|-------|-------------------------------|-------------------------------------------|
| #1 ⭐   | 5     | Implementar cache Redis       | Alto impacto, médio esforço, **na trava** |
| #2 ⭐   | 4     | Otimizar query SQL            | Alto impacto, baixo esforço, **na trava** |
| #3 ⭐   | 3     | Dashboard de métricas         | Médio impacto, baixo esforço, **na trava**|
| #4 ⭐   | 2     | Adicionar validação CPF       | Alto impacto, baixo esforço               |
| #5 ⭐   | 1     | Automatizar emails            | Médio impacto, baixo esforço              |
| -       | -2    | Refatorar componente          | Baixo ROI (muito esforço, pouco impacto)  |

---

## Comportamento Dinâmico

### Quando a Trava Muda

Se o bottleneck mudar de "Aquisição" para "Monetização":
- As ações **da nova trava** ganham +2 pontos
- O ranking é **recalculado automaticamente**
- As estrelas ⭐ podem aparecer em **ações diferentes**

### Quando Ações Saem do Backlog

Se uma ação recomendada mudar de status `backlog` para `todo`:
- Ela **perde a estrela ⭐**
- A próxima ação do ranking **assume a posição**
- Sempre mostra exatamente **5 ações recomendadas** (se existirem 5+ no backlog)

---

## Tooltip Explicativo

Ao passar o mouse sobre a estrela ⭐:

```
┌─────────────────────────────────────────────────────┐
│  ⭐ Ação Recomendada                                │
│  Alto impacto, baixo esforço e/ou na trava          │
└─────────────────────────────────────────────────────┘
```

---

## Casos de Uso Reais

### Cenário 1: Planning de Sprint
**Time está planejando Sprint 5:**
- Product Owner abre o backlog
- Vê 5 ações com ⭐
- Seleciona 3 delas baseado na capacidade do time
- **Economia de tempo**: 15 minutos de triagem manual

### Cenário 2: Revisão de Prioridades
**CEO questiona: "Por que não estamos atacando X?"**
- X não tem ⭐ porque tem baixo impacto ou alto esforço
- Data-driven: algoritmo mostra que existem ações mais estratégicas
- **Decisão embasada** em impacto x esforço x trava

### Cenário 3: OKR Trimestral
**Time precisa de quick wins para OKR:**
- Filtra por ações ⭐ (todas têm bom ROI)
- Foca em ações da trava (destravar funil)
- **Maximiza impacto** com recursos limitados

---

## Performance

- **Cálculo**: O(n) onde n = número de ações no backlog
- **Re-render**: Apenas quando `bowTieData` ou `bottleneckStageId` mudam (useMemo)
- **Memória**: Armazena apenas 5 IDs (negligível)

---

## Acessibilidade

- ✅ Estrela tem `title` para screen readers
- ✅ Cor amarela (#FACC15) com bom contraste no fundo escuro
- ✅ Ícone SVG escalável (não depende de fonte)
