# Estrutura de Código - Ferraz Piai BowTie

Esta pasta contém o código fonte refatorado da aplicação BowTie, organizado em módulos para melhor manutenibilidade.

## 📁 Estrutura de Pastas

```
src/
├── components/           # Componentes React
│   ├── common/          # Componentes genéricos reutilizáveis
│   │   ├── StatusBadge.jsx      # Badge de status de ação
│   │   ├── SprintBadge.jsx      # Badge de sprint
│   │   └── CategoryBadge.jsx    # Badge de categoria
│   ├── layout/          # Componentes estruturais
│   │   ├── Header.jsx           # Cabeçalho da aplicação
│   │   └── ActionTable.jsx      # Tabela de ações detalhada
│   └── bowtie/          # Componentes específicos do domínio
│       ├── BowTieStage.jsx      # Componente de etapa do BowTie
│       └── BowTieContainer.jsx  # Container do funil BowTie
├── hooks/               # Hooks customizados (lógica de negócio)
│   ├── useBowTieData.js         # Gerador de dados mockados
│   ├── useBowTieCalculations.js # Cálculos de heatmap e scores
│   └── useFilters.js            # Lógica de filtros e tabela
└── utils/               # Utilitários e helpers
    ├── constants.js             # Constantes da aplicação
    └── calculations.js          # Funções puras de cálculo
```

## 🎯 Responsabilidades

### Components

#### `/common`
Componentes pequenos e reutilizáveis que não possuem dependências do domínio.
- **StatusBadge**: Exibe o status visual de uma ação
- **SprintBadge**: Exibe a sprint de uma ação
- **CategoryBadge**: Exibe a categoria (Pessoas/Processos/Tecnologia)

#### `/layout`
Componentes estruturais que organizam a interface.
- **Header**: Cabeçalho com título e informações da sprint selecionada
- **ActionTable**: Tabela completa com filtros e lista de ações

#### `/bowtie`
Componentes específicos do conceito de BowTie (domínio do negócio).
- **BowTieStage**: Renderiza uma etapa individual do funil
- **BowTieContainer**: Orquestra todas as etapas do funil

### Hooks

Encapsulam a lógica de negócio e estado da aplicação.

- **useBowTieData**: Fornece os dados do BowTie (atualmente mockados, preparado para integração com API)
- **useBowTieCalculations**: Calcula scores de impacto/esforço, identifica travas (bottlenecks) e gera o heatmap
- **useFilters**: Gerencia filtros de sprint e micro-etapas, e processa dados da tabela

### Utils

Funções puras e constantes compartilhadas.

- **constants.js**: Configurações de status, categorias, pesos e datas
- **calculations.js**: Funções puras de cálculo (impacto, esforço, filtros)

## 🔄 Fluxo de Dados

```
index.jsx (App Principal)
    ↓
useBowTieData() → Dados brutos
    ↓
useBowTieCalculations() → Scores e Heatmap
    ↓
useFilters() → Filtros e dados processados
    ↓
Components (Header, BowTieContainer, ActionTable)
```

## 🚀 Próximos Passos (Conforme dev-docs.md)

1. **Integração com Backend**
   - Substituir `generateActions()` por chamadas de API em `useBowTieData.js`
   - Adicionar camada de serviço para fetch de dados

2. **TypeScript** (Opcional)
   - Migrar para `.tsx` e adicionar tipos
   - Criar `types/index.ts` com interfaces

3. **Testes**
   - Adicionar testes unitários para hooks e utilitários
   - Testes de componentes com React Testing Library

4. **Melhorias de UX**
   - Adicionar loading states
   - Implementar error boundaries
   - Adicionar feedback visual para ações

## 📝 Convenções de Código

- **Componentes**: PascalCase (ex: `BowTieStage.jsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useBowTieData.js`)
- **Utils**: camelCase (ex: `calculations.js`)
- **Constantes**: UPPER_SNAKE_CASE quando exportadas

## 🔗 Referências

- Consulte `dev-docs.md` na raiz do projeto para documentação técnica completa
- Arquivo original preservado em `index.old.jsx`
