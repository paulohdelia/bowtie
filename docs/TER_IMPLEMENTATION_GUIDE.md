# Guia de Implementação: Categoria TER (Produtos de Implementação)

**Versão:** 1.0
**Data:** 20 de fevereiro de 2026
**Status:** 📘 Guia de Implementação

Este documento fornece instruções completas para implementar a categoria **TER** (produtos de implementação) nas etapas Onboarding e Retenção do BowTie.

---

## 📖 Índice

1. [O que é TER?](#o-que-é-ter)
2. [Estrutura do Fluxo TER](#estrutura-do-fluxo-ter)
3. [Instruções de Implementação](#instruções-de-implementação)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Checklist de Implementação](#checklist-de-implementação)
6. [Migração de Dados Existentes](#migração-de-dados-existentes)

---

## 🎯 O que é TER?

### Definição

**TER** é uma das 3 categorias do portfólio Ferraz Piai, representando **produtos de implementação** com início, meio e fim definidos.

### Categorias do Portfólio

```
┌─────────────────────────────────────────────────────────────┐
│ SABER     │ Diagnóstico, análise, consultoria               │
│           │ Natureza: Descoberta de conhecimento            │
│           │ Exemplo: Diagnóstico de Marketing               │
├─────────────────────────────────────────────────────────────┤
│ TER       │ Implementação de ferramentas/sistemas           │
│           │ Natureza: Projeto com início, meio e fim       │
│           │ Exemplo: CRM, E-commerce, Site, BI, Chatbot    │
├─────────────────────────────────────────────────────────────┤
│ EXECUTAR  │ Operação contínua, execução recorrente         │
│           │ Natureza: Ciclo PDCA contínuo                   │
│           │ Exemplo: Growth Marketing, Account Management  │
└─────────────────────────────────────────────────────────────┘
```

### Produtos TER

Os seguintes produtos fazem parte da categoria TER:

1. **CRM Marketing** - Implementação de sistema de CRM para marketing
2. **CRM Comercial** - Implementação de sistema de CRM para vendas
3. **E-commerce** - Desenvolvimento de loja virtual
4. **Site** - Desenvolvimento de website institucional/corporativo
5. **BI (Business Intelligence)** - Implementação de dashboards e relatórios
6. **Chatbot** - Implementação de chatbot para atendimento

### Características dos Produtos TER

✅ **Projeto com começo, meio e fim**
- Início: Kickoff e planejamento
- Meio: Desenvolvimento e homologação
- Fim: Go-live e encerramento

✅ **Entregável tangível**
- Sistema funcionando em produção
- Ferramenta configurada e personalizada

✅ **Timeline definida**
- Duração típica: 1-3 meses
- Marcos claros de validação

---

## 📊 Estrutura do Fluxo TER

### Divisão entre Onboarding e Retenção

O fluxo TER é dividido em duas etapas do BowTie:

```
ONBOARDING | TER
└─ Foco: Preparação e Planejamento (7 micro-etapas)

RETENÇÃO | TER
└─ Foco: Execução e Implementação (6 micro-etapas)
```

### ONBOARDING | TER (7 micro-etapas)

Fase de **preparação e planejamento** da implementação:

```
1. Revisão do V4 Marketing
   └─ Revisar proposta comercial e escopo vendido

2. Boas-vindas (Gerente - Grupo Whats)
   └─ Criar grupo do projeto e apresentar time

3. Kickoff
   └─ Reunião de kickoff + levantamento de requisitos

4. Planejamento da Implementação (Interno)
   └─ Equipe cria plano interno de implementação

5. Planejamento da Implementação (Revisão)
   └─ Revisão e aprovação interna do plano

6. Planejamento da Implementação (Cliente)
   └─ Apresentação e aprovação do plano pelo cliente

7. Encerramento (CSAT)
   └─ Pesquisa de satisfação do onboarding
   └─ HANDOVER para Retenção | TER
```

**Output do Onboarding**: Plano de implementação aprovado pelo cliente + CSAT coletado

---

### RETENÇÃO | TER (6 micro-etapas)

Fase de **execução e implementação** do projeto:

```
1. Prototipação
   └─ Criar MVP/protótipo funcional

2. Desenvolvimento
   └─ Implementação completa da solução

3. Homologação Interna
   └─ Testes de QA e validação interna

4. Apresentação Cliente
   └─ Demo, treinamento e ajustes finais

5. Go-Live
   └─ Publicação em produção

6. Encerramento (NPS)
   └─ Pesquisa NPS pós implementação
   └─ PROJETO TER FINALIZADO
```

**Output da Retenção**: Sistema em produção + NPS coletado

---

## 🔧 Instruções de Implementação

### Passo 1: Atualizar Configuração das Etapas

**Arquivo:** `src/config/api.js`

Localizar a configuração de `STAGE_CONFIG` e atualizar as categorias TER:

```javascript
// ONBOARDING
'Onboarding': {
  id: 'onboarding',
  height: 'h-96',
  isCategorized: true,
  categories: {
    'SABER': [
      'Revisão do V4 Marketing',
      'Boas-vindas (Gerente - Grupo Whats)',
      'Kickoff',
      'Coleta de Acessos'
    ],
    'TER': [
      'Revisão do V4 Marketing',
      'Boas-vindas (Gerente - Grupo Whats)',
      'Kickoff',
      'Planejamento da Implementação (Interno)',
      'Planejamento da Implementação (Revisão)',
      'Planejamento da Implementação (Cliente)',
      'Encerramento (CSAT)'
    ],
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

// RETENÇÃO
'Retenção': {
  id: 'retencao',
  height: 'h-96',
  isCategorized: true,
  categories: {
    'SABER': [
      'Fase 2',
      'Fase 3',
      'Fase 4',
      'Fase 5',
      'Encerramento (NPS)'
    ],
    'TER': [
      'Prototipação',
      'Desenvolvimento',
      'Homologação Interna',
      'Apresentação Cliente',
      'Go-Live',
      'Encerramento (NPS)'
    ],
    'EXECUTAR': [
      'DO (Execução)',
      'CHECK (Qualidade)',
      'ACT (Otimizações)',
      'PLAN (Replanejamento)',
      'Check-in (Revisão)',
      'Check-in (Cliente)'
    ]
  }
}
```

---

### Passo 2: Atualizar Documentação Oficial

**Arquivo:** `docs/STAGES_AND_MICROSTEPS.md`

Atualizar as seções de Onboarding e Retenção para incluir TER:

```markdown
##### **TER** (7 micro-etapas)
1. **Revisão do V4 Marketing** - Revisão do documento de marketing
2. **Boas-vindas (Gerente - Grupo Whats)** - Mensagem de boas-vindas do gerente
3. **Kickoff** - Reunião de kickoff + levantamento de requisitos
4. **Planejamento da Implementação (Interno)** - Planejamento interno do projeto
5. **Planejamento da Implementação (Revisão)** - Revisão interna do planejamento
6. **Planejamento da Implementação (Cliente)** - Apresentação ao cliente
7. **Encerramento (CSAT)** - Finalização com pesquisa de satisfação
```

```markdown
##### **TER** (6 micro-etapas)
1. **Prototipação** - Criação de MVP/protótipo
2. **Desenvolvimento** - Implementação completa
3. **Homologação Interna** - Testes de QA
4. **Apresentação Cliente** - Demo e treinamento
5. **Go-Live** - Publicação em produção
6. **Encerramento (NPS)** - Finalização com pesquisa NPS
```

---

### Passo 3: Atualizar Agent Classifier Prompt

**Arquivo:** `agents/action-classifier-prompt.md`

Adicionar as micro-etapas TER na lista de referência:

```markdown
#### Onboarding - TER

**TER:**
```
Onboarding | TER | Revisão do V4 Marketing
Onboarding | TER | Boas-vindas (Gerente - Grupo Whats)
Onboarding | TER | Kickoff
Onboarding | TER | Planejamento da Implementação (Interno)
Onboarding | TER | Planejamento da Implementação (Revisão)
Onboarding | TER | Planejamento da Implementação (Cliente)
Onboarding | TER | Encerramento (CSAT)
```

#### Retenção - TER

**TER:**
```
Retenção | TER | Prototipação
Retenção | TER | Desenvolvimento
Retenção | TER | Homologação Interna
Retenção | TER | Apresentação Cliente
Retenção | TER | Go-Live
Retenção | TER | Encerramento (NPS)
```
```

Atualizar o JSON Schema para incluir as novas micro-etapas no enum.

---

### Passo 4: Atualizar Mapeamento (se necessário)

**Arquivo:** `src/utils/microStepMapping.js`

Se houver sistema de mapeamento/normalização, adicionar variações aceitas:

```javascript
// Onboarding | TER
'planejamento implementacao interno': 'Planejamento da Implementação (Interno)',
'planejamento implementacao revisao': 'Planejamento da Implementação (Revisão)',
'planejamento implementacao cliente': 'Planejamento da Implementação (Cliente)',

// Retenção | TER
'prototipacao': 'Prototipação',
'desenvolvimento': 'Desenvolvimento',
'homologacao interna': 'Homologação Interna',
'apresentacao cliente': 'Apresentação Cliente',
'go-live': 'Go-Live',
'golive': 'Go-Live',
```

---

### Passo 5: Atualizar Tabela de Referência

**Arquivo:** `docs/STAGES_AND_MICROSTEPS.md`

Atualizar a tabela de referência rápida:

```markdown
| Etapa | ID | Tipo | Micro-Etapas | Categorias | Altura |
|-------|----|----|--------------|------------|--------|
| Onboarding | onboarding | Categorizada | 19 | SABER (4), TER (7), EXECUTAR (8) | h-96 |
| Retenção | retencao | Categorizada | 17 | SABER (5), TER (6), EXECUTAR (6) | h-96 |
```

---

## 📝 Exemplos Práticos

### Exemplo 1: Implementação de CRM Marketing

#### Onboarding | TER

```json
[
  {
    "identificado_por": "João Silva",
    "fato": "Cliente precisa de CRM configurado para automações de marketing",
    "causa": "Time de marketing opera sem ferramenta adequada",
    "acao": "Revisar escopo do CRM vendido e expectativas do cliente",
    "categoria": "Tecnologia",
    "impacto": "Alto",
    "esforco": "Médio",
    "macro_etapa": "Onboarding",
    "micro_etapa": "Onboarding | TER | Revisão do V4 Marketing"
  },
  {
    "identificado_por": "João Silva",
    "fato": "Time precisa definir campos e processos do CRM",
    "causa": "Requisitos não foram mapeados no comercial",
    "acao": "Realizar kickoff com time de marketing para levantar requisitos de campos, automações e integrações",
    "categoria": "Processos",
    "impacto": "Alto",
    "esforco": "Médio",
    "macro_etapa": "Onboarding",
    "micro_etapa": "Onboarding | TER | Kickoff"
  },
  {
    "identificado_por": "João Silva",
    "fato": "Plano de implementação precisa ser criado",
    "causa": "Projeto sem cronograma definido",
    "acao": "Criar cronograma de implementação com marcos: prototipação, desenvolvimento, homologação e go-live",
    "categoria": "Processos",
    "impacto": "Alto",
    "esforco": "Baixo",
    "macro_etapa": "Onboarding",
    "micro_etapa": "Onboarding | TER | Planejamento da Implementação (Interno)"
  },
  {
    "identificado_por": "João Silva",
    "fato": "Plano precisa ser apresentado ao cliente",
    "causa": "Cliente precisa aprovar escopo e prazos",
    "acao": "Apresentar plano de implementação ao cliente e obter aprovação formal",
    "categoria": "Processos",
    "impacto": "Alto",
    "esforco": "Baixo",
    "macro_etapa": "Onboarding",
    "micro_etapa": "Onboarding | TER | Planejamento da Implementação (Cliente)"
  }
]
```

#### Retenção | TER

```json
[
  {
    "identificado_por": "Maria Santos",
    "fato": "CRM precisa de protótipo para validação",
    "causa": "Cliente quer ver estrutura antes do desenvolvimento completo",
    "acao": "Criar protótipo do CRM com campos principais, 1 pipeline e 2 automações básicas",
    "categoria": "Tecnologia",
    "impacto": "Médio",
    "esforco": "Médio",
    "macro_etapa": "Retenção",
    "micro_etapa": "Retenção | TER | Prototipação"
  },
  {
    "identificado_por": "Maria Santos",
    "fato": "CRM precisa de todas as automações desenvolvidas",
    "causa": "Protótipo aprovado, cliente quer solução completa",
    "acao": "Desenvolver todos os campos customizados, pipelines, automações, relatórios e integrações do CRM",
    "categoria": "Tecnologia",
    "impacto": "Alto",
    "esforco": "Alto",
    "macro_etapa": "Retenção",
    "micro_etapa": "Retenção | TER | Desenvolvimento"
  },
  {
    "identificado_por": "Maria Santos",
    "fato": "CRM precisa ser testado antes da entrega",
    "causa": "Garantir qualidade antes de apresentar ao cliente",
    "acao": "Executar bateria de testes de automações, workflows e integrações do CRM",
    "categoria": "Processos",
    "impacto": "Alto",
    "esforco": "Médio",
    "macro_etapa": "Retenção",
    "micro_etapa": "Retenção | TER | Homologação Interna"
  },
  {
    "identificado_por": "Maria Santos",
    "fato": "Cliente precisa ser treinado no CRM",
    "causa": "Time de marketing nunca usou a ferramenta",
    "acao": "Apresentar CRM completo e treinar equipe de marketing em todas as funcionalidades",
    "categoria": "Pessoas",
    "impacto": "Alto",
    "esforco": "Médio",
    "macro_etapa": "Retenção",
    "micro_etapa": "Retenção | TER | Apresentação Cliente"
  },
  {
    "identificado_por": "Maria Santos",
    "fato": "CRM precisa ser publicado para uso",
    "causa": "Tudo aprovado, hora de ir para produção",
    "acao": "Ativar CRM para todos os usuários, configurar permissões finais e monitorar uso inicial",
    "categoria": "Tecnologia",
    "impacto": "Alto",
    "esforco": "Baixo",
    "macro_etapa": "Retenção",
    "micro_etapa": "Retenção | TER | Go-Live"
  }
]
```

---

### Exemplo 2: Desenvolvimento de E-commerce

#### Onboarding | TER (resumido)

```
1. Revisão do V4 Marketing → Revisar escopo do e-commerce vendido
2. Boas-vindas → Criar grupo do projeto
3. Kickoff → Levantar requisitos: catálogo, meios de pagamento, layout
4. Planejamento (Interno) → Definir tecnologia, cronograma, recursos
5. Planejamento (Revisão) → Gerente valida plano
6. Planejamento (Cliente) → Cliente aprova cronograma e escopo
7. Encerramento (CSAT) → Coletar satisfação do onboarding
```

#### Retenção | TER (resumido)

```
1. Prototipação → Criar homepage + checkout básico funcionando
2. Desenvolvimento → Desenvolver todas as páginas, integrações (gateway, frete, ERP)
3. Homologação Interna → Testar fluxo de compra, pagamento, stock
4. Apresentação Cliente → Demo completo + treinamento do admin
5. Go-Live → Publicar e-commerce em produção
6. Encerramento (NPS) → Coletar NPS pós go-live
```

---

### Exemplo 3: Implementação de BI

#### Onboarding | TER (resumido)

```
1. Revisão do V4 Marketing → Revisar dashboards vendidos
2. Boas-vindas → Criar grupo do projeto
3. Kickoff → Levantar KPIs, métricas, fontes de dados
4. Planejamento (Interno) → Definir arquitetura de dados, ETL
5. Planejamento (Revisão) → Validar queries e métricas
6. Planejamento (Cliente) → Aprovar dashboards planejados
7. Encerramento (CSAT) → Coletar satisfação
```

#### Retenção | TER (resumido)

```
1. Prototipação → Dashboard principal com métricas core
2. Desenvolvimento → Todos os dashboards, drill-downs, filtros
3. Homologação Interna → Validar precisão de dados
4. Apresentação Cliente → Explicar dashboards + treinar usuários
5. Go-Live → Liberar dashboards, agendar atualizações
6. Encerramento (NPS) → Coletar NPS
```

---

## ✅ Checklist de Implementação

Use este checklist para garantir que todos os passos foram executados:

### Código

- [ ] Atualizar `src/config/api.js` com micro-etapas TER
- [ ] Atualizar `src/utils/microStepMapping.js` (se aplicável)
- [ ] Testar interface visual (etapas categorizadas expandem corretamente)
- [ ] Testar filtros (TER aparece nas opções de micro-etapas)

### Documentação

- [ ] Atualizar `docs/STAGES_AND_MICROSTEPS.md`
- [ ] Atualizar `docs/CATEGORIZED_STAGES.md`
- [ ] Atualizar tabela de referência rápida
- [ ] Atualizar `README.md` (se mencionar etapas)

### Agent/AI

- [ ] Atualizar `agents/action-classifier-prompt.md`
- [ ] Adicionar micro-etapas TER no enum do JSON Schema
- [ ] Testar classificação do agente com exemplos TER
- [ ] Validar formato de 3 partes: "Onboarding | TER | Kickoff"

### Testes

- [ ] Testar criação de ação em Onboarding | TER
- [ ] Testar criação de ação em Retenção | TER
- [ ] Testar filtros por categoria TER
- [ ] Testar cálculo de scores com ações TER
- [ ] Testar identificação de bottleneck

### API/Backend

- [ ] Backend aceita formato "Onboarding | TER | Micro"
- [ ] Backend aceita formato "Retenção | TER | Micro"
- [ ] Validação de micro-etapas inclui TER
- [ ] Webhook n8n reconhece categoria TER

---

## 🔄 Migração de Dados Existentes

Se já existem dados no sistema que deveriam ser TER:

### Identificar Ações TER

Ações que deveriam estar em TER geralmente têm características:
- Mencionam CRM, E-commerce, Site, BI, Chatbot
- São projetos de implementação
- Têm começo e fim definidos
- Envolvem desenvolvimento/configuração de ferramenta

### Script de Migração (Conceito)

```javascript
// Exemplo conceitual - adaptar para seu backend

const migrateToTER = async () => {
  // 1. Identificar ações que mencionam produtos TER
  const terKeywords = ['CRM', 'E-commerce', 'Site', 'BI', 'Chatbot', 'implementação'];

  // 2. Buscar ações candidatas
  const candidates = await findActions({
    macro_etapa: ['Onboarding', 'Retenção'],
    micro_etapa: { $regex: /implementação|desenvolvimento|setup/i }
  });

  // 3. Para cada candidata, analisar e reclassificar
  for (const action of candidates) {
    const hasTERKeyword = terKeywords.some(kw =>
      action.fato.includes(kw) || action.acao.includes(kw)
    );

    if (hasTERKeyword) {
      // Mapear micro-etapa antiga para TER
      const newMicroEtapa = mapToTER(action.micro_etapa);

      await updateAction(action.id, {
        micro_etapa: newMicroEtapa
      });

      console.log(`Migrado: ${action.id} → ${newMicroEtapa}`);
    }
  }
};

// Mapeamento de exemplo
const mapToTER = (oldMicroEtapa) => {
  const mapping = {
    'Onboarding | EXECUTAR | Kickoff': 'Onboarding | TER | Kickoff',
    'Onboarding | EXECUTAR | Planejamento Interno': 'Onboarding | TER | Planejamento da Implementação (Interno)',
    // ... adicionar outros mapeamentos
  };

  return mapping[oldMicroEtapa] || oldMicroEtapa;
};
```

### Validação Pós-Migração

Após migrar, validar:
- [ ] Ações TER aparecem na categoria correta
- [ ] Scores recalculados corretamente
- [ ] Filtros funcionam
- [ ] Nenhuma ação foi perdida

---

## 📚 Documentos Relacionados

- **[STAGES_AND_MICROSTEPS.md](./STAGES_AND_MICROSTEPS.md)** - Referência oficial de etapas
- **[CATEGORIZED_STAGES.md](./CATEGORIZED_STAGES.md)** - Guia de etapas categorizadas
- **[CLAUDE.md](../CLAUDE.md)** - Guia geral de desenvolvimento
- **[agents/action-classifier-prompt.md](../agents/action-classifier-prompt.md)** - Prompt do agente classificador

---

## 🎯 Resumo

### Onboarding | TER (7 micro-etapas)
Foco em **planejamento** da implementação. Finaliza com CSAT.

### Retenção | TER (6 micro-etapas)
Foco na **execução** da implementação. Finaliza com NPS.

### Produtos TER
CRM Marketing, CRM Comercial, E-commerce, Site, BI, Chatbot

### Formato API
```
"Onboarding | TER | Kickoff"
"Retenção | TER | Desenvolvimento"
```

---

**Última atualização:** 20 de fevereiro de 2026
**Autor:** Ferraz Piai Development Team
**Versão:** 1.0
