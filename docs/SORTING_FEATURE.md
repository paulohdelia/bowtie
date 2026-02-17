# Funcionalidade de Ordenação e Reset de Filtros

## Ordenação de Colunas

### Como usar
- Clique em qualquer cabeçalho de coluna para ordenar os dados
- **Primeiro clique**: Ordena em ordem crescente (A-Z, 0-9, datas antigas primeiro)
- **Segundo clique**: Ordena em ordem decrescente (Z-A, 9-0, datas recentes primeiro)
- **Terceiro clique**: Remove a ordenação (volta ao padrão)

### Indicadores Visuais
- ⇅ (ArrowUpDown): Coluna não ordenada - passe o mouse para ver o ícone
- ↑ (ArrowUp - vermelho): Ordenado crescente
- ↓ (ArrowDown - vermelho): Ordenado decrescente

### Colunas Ordenáveis
Todas as colunas da tabela são ordenáveis:
1. **Sprint** - Alfabética
2. **Macro Etapa** - Alfabética
3. **Status** - Alfabética
4. **Ação** - Alfabética
5. **Prazo** - Cronológica (datas)
6. **Responsável** - Alfabética
7. **Identificado Por** - Alfabética
8. **Categoria** - Alfabética
9. **Micro Etapa** - Alfabética
10. **Fato** - Alfabética
11. **Causa** - Alfabética
12. **Impacto** - Por prioridade (Alto > Médio > Baixo)
13. **Esforço** - Por prioridade (Alto > Médio > Baixo)
14. **Comentários** - Alfabética

### Ordenação Especial
- **Impacto e Esforço**: Ordenados por prioridade (Alto=3, Médio=2, Baixo=1)
- **Prazo**: Ordenado cronologicamente usando Date objects

## Botão de Reset

### Comportamento
- Aparece **apenas quando há filtros ou ordenação ativos**
- Localizado ao lado dos filtros existentes (discreto)
- Ícone: ↻ (RotateCcw) com animação de rotação no hover

### O que o Reset faz
Ao clicar no botão "Limpar", todos os filtros e ordenação são resetados:
- Sprint → "Visão Geral" (all)
- Status → "Todos" (all)
- Responsável → "Todos" (all)
- Micro-Etapas → Todas selecionadas (array vazio)
- Macro Etapa → Visão geral (null)
- Ordenação → Removida

### Quando aparece
O botão só é exibido quando **qualquer** dos seguintes está ativo:
- Filtro de Sprint diferente de "Visão Geral"
- Filtro de Status diferente de "Todos"
- Filtro de Pessoa diferente de "Todos"
- Alguma Micro-Etapa foi filtrada
- Uma Macro Etapa específica está selecionada
- Há uma ordenação ativa em alguma coluna

## Implementação Técnica

### Arquivos Criados/Modificados
1. **`src/hooks/useSorting.js`** (novo)
   - Hook personalizado para gerenciar estado de ordenação
   - Lógica de comparação para diferentes tipos de dados
   - Suporta strings, datas e prioridades

2. **`src/components/layout/ActionTable.jsx`** (modificado)
   - Adicionado hook `useSorting`
   - Componente interno `SortableHeader` para headers clicáveis
   - Função `hasActiveFiltersOrSort` para detectar filtros/ordenação ativos
   - Função `handleResetAll` para resetar tudo
   - Botão de reset condicional

### Fluxo de Dados
```
tableData (filtrado) → useSorting → sortedData → renderização
```

A ordenação é aplicada **após** os filtros, garantindo que apenas os dados visíveis sejam ordenados.

## UX/UI

### Feedback Visual
- Headers com cursor pointer e hover com background cinza
- Ícones de ordenação mudam de cor (cinza → vermelho) quando ativos
- Botão de reset com animação de rotação no hover
- Texto "Limpar" visível apenas em telas XL+

### Acessibilidade
- Headers são selecionáveis com teclado
- Indicadores claros de estado de ordenação
- Tooltips informativos no botão de reset
