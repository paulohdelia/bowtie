# Ferraz Piai - BowTie Application

Aplicação visual de gestão de processos de receita (Revenue Operations) usando o conceito de "Bow Tie" (Gravata Borboleta) para mapear a jornada do cliente.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## 🚀 Quick Start

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação e Execução

```bash
# 1. Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com as URLs corretas dos webhooks

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev

# 4. Abrir no navegador
# A aplicação abrirá automaticamente em http://localhost:3000
```

### Outros Comandos

```bash
# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Lint do código
npm run lint
```

## 📊 Funcionalidades

### ✨ Principais Features
- **Visualização BowTie**: Funil de receita em formato de gravata borboleta (8 etapas)
- **Detecção de Travas**: Identifica automaticamente o maior gargalo (bottleneck)
- **Heatmap de Impacto**: Gradiente visual baseado em scores de impacto
- **Filtros por Sprint**: Visualize ações por ciclo de trabalho
- **Tabela Detalhada**: Lista completa de ações com filtros avançados

### 🎯 Conceitos do Domínio

**Etapas do Funil:**
1. Pré-Venda
2. Aquisição
3. Compromisso (nó central)
4. Diagnósticos
5. Onboarding
6. Implementações
7. Ongoing
8. Monetização

**Categorias de Ações:**
- 👥 Pessoas
- 📋 Processos
- 💻 Tecnologia

**Níveis de Impacto/Esforço:**
- 🔴 Alto (peso 3)
- 🟡 Médio (peso 2)
- 🟢 Baixo (peso 1)

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular com separação clara de responsabilidades:

```
src/
├── components/
│   ├── common/         # Componentes reutilizáveis (badges)
│   ├── layout/         # Componentes estruturais
│   └── bowtie/         # Componentes específicos do domínio
├── hooks/              # Lógica de negócio (dados, cálculos, filtros)
└── utils/              # Constantes e funções puras
```

**Fluxo de Dados:**
```
Hooks (dados + lógica) → Components (apresentação) → UI
```

Para mais detalhes, consulte:
- **docs/ARCHITECTURE.md** - Arquitetura completa e padrões
- **CLAUDE.md** - Guia para desenvolvimento
- **docs/dev-docs.md** - Documentação técnica detalhada

## 🧪 Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 18.3 | Framework UI |
| Vite | 5.4 | Build tool & dev server |
| Tailwind CSS | 3.4 | Estilização |
| Lucide React | 0.344 | Ícones |

## 📁 Estrutura do Projeto

```
bowtie-ferraz-piai/
├── src/                    # Código fonte modular
│   ├── components/         # Componentes React organizados por tipo
│   ├── hooks/              # Custom hooks para lógica de negócio
│   └── utils/              # Funções utilitárias e constantes
├── docs/                   # Documentação do projeto
│   ├── ARCHITECTURE.md     # Arquitetura detalhada
│   ├── QUICK_START.md      # Guia prático
│   ├── dev-docs.md         # Documentação técnica
│   ├── API_INTEGRATION.md  # Integração com API
│   ├── INSTALL.md          # Guia de instalação
│   └── archive/            # Documentação histórica/arquivada
├── agents/                 # System prompts para agentes de IA
│   ├── README.md           # Índice de agentes disponíveis
│   └── action-classifier-prompt.md  # Agente classificador de ações
├── index.jsx               # Componente raiz (73 linhas)
├── main.jsx                # Entry point
├── index.html              # HTML template
├── index.css               # Estilos globais
├── vite.config.js          # Configuração do Vite
├── tailwind.config.js      # Configuração do Tailwind
├── package.json            # Dependências
├── CLAUDE.md               # Guia de desenvolvimento
└── README.md               # Este arquivo
```

## 🔄 Refatoração Recente

Este projeto foi recentemente refatorado de um arquivo monolítico (767 linhas) para uma estrutura modular:

| Métrica | Antes | Depois |
|---------|-------|--------|
| Arquivo Principal | 767 linhas | 73 linhas |
| Número de Arquivos | 1 | 13 módulos |
| Manutenibilidade | Difícil | Fácil |

Ver **docs/archive/REFACTORING_SUMMARY.md** para detalhes completos.

## 📖 Documentação

### Documentação Principal
- **README.md** (este arquivo) - Visão geral e quick start
- **CLAUDE.md** - Guia para Claude Code e desenvolvedores

### Documentação Técnica (docs/)
- **docs/STAGES_AND_MICROSTEPS.md** - ⭐ **Documentação oficial** das 8 etapas e 41 micro-etapas
- **docs/ARCHITECTURE.md** - Arquitetura, padrões e design decisions
- **docs/QUICK_START.md** - Guia prático para adicionar features
- **docs/dev-docs.md** - Documentação técnica completa (lógica de negócio, schema backend)
- **docs/INSTALL.md** - Guia de instalação e configuração
- **docs/API_INTEGRATION.md** - Documentação de integração com API

### Documentação Histórica (docs/archive/)
- Changelogs de migração, resumos de refatoração e documentação de debugging
- Código pré-refatoração e documentação temporária

## 🛠️ Como Adicionar Features

### Novo Componente
```bash
# Componente genérico
src/components/common/MeuComponente.jsx

# Componente de layout
src/components/layout/MeuLayout.jsx

# Componente específico do BowTie
src/components/bowtie/MinhaEtapa.jsx
```

### Nova Lógica de Negócio
```bash
# Hook customizado
src/hooks/useMeuHook.js

# Função utilitária
src/utils/minhaUtil.js
```

Ver **docs/QUICK_START.md** para exemplos práticos.

## 🤖 Agentes de IA

O projeto inclui **system prompts para agentes de IA** que automatizam tarefas do BowTie:

### Action Classifier Agent (GPT-4)
Classifica automaticamente inputs do usuário em ações estruturadas:
- **Input:** "SDRs com 5% de taxa de resposta em emails"
- **Output:** JSON com fato, causa, ação, categoria, impacto, esforço, etapa

**Documentação:** `agents/action-classifier-prompt.md`

> 💡 Perfeito para acelerar o cadastro de ações e manter consistência na classificação

## 🚧 Próximos Passos

- [ ] Integração com backend (substituir dados mock)
- [ ] Implementar Action Classifier Agent em produção
- [ ] Testes automatizados (Jest + React Testing Library)
- [ ] Migração para TypeScript (opcional)
- [ ] CI/CD pipeline
- [ ] Error boundaries
- [ ] Loading states

## 📝 Convenções de Código

- **Componentes**: PascalCase (`MeuComponente.jsx`)
- **Hooks**: camelCase com prefixo `use` (`useMeuHook.js`)
- **Utils**: camelCase (`minhaUtil.js`)
- **Constantes**: UPPER_SNAKE_CASE
- **Tailwind**: Classes inline (utility-first)

## 🤝 Contribuindo

1. Leia **CLAUDE.md** e **docs/ARCHITECTURE.md**
2. Siga os padrões estabelecidos
3. Mantenha separação de responsabilidades
4. Adicione documentação quando necessário

## 📄 Licença

Ferraz Piai - Uso Interno

---

**Desenvolvido com** ❤️ **usando React + Vite + Tailwind**
