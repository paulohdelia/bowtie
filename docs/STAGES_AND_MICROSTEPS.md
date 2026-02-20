# Etapas e Micro-Etapas do BowTie

**Versão:** 3.0
**Data:** 19 de fevereiro de 2026
**Status:** ✅ Documentação Oficial

Este documento lista **todas as etapas (macro-etapas) e micro-etapas** do funil BowTie Ferraz Piai, servindo como referência única para desenvolvimento e negócio.

---

## 📊 Visão Geral

O BowTie é composto por **7 etapas principais** que representam a jornada do cliente, desde a exposição até a expansão. Cada etapa contém **micro-etapas** que detalham o processo.

### Novidade: Etapas Categorizadas

As etapas **Onboarding** e **Retenção** utilizam um sistema de **categorias** (SABER, TER, EXECUTAR) baseado no portfólio de produtos da Ferraz Piai. Ao invés de uma lista horizontal simples de micro-etapas, essas etapas exibem **3 linhas verticais** quando expandidas, cada uma representando uma categoria.

| Estatística | Valor |
|-------------|-------|
| **Total de Etapas** | 7 |
| **Etapas Simples** | 5 (Exposição, Pré-Venda, Aquisição, Commit, Expansão) |
| **Etapas Categorizadas** | 2 (Onboarding, Retenção) |
| **Categorias** | 3 (SABER, TER, EXECUTAR) |
| **Total de Micro-Etapas** | ~64 |
| **Etapa Central (Nó)** | Commit |
| **Lado Esquerdo (Pré-venda)** | 2 etapas |
| **Lado Direito (Pós-venda)** | 4 etapas |

---

## 🎯 As 7 Etapas do BowTie

### 1. Exposição
**ID:** `exposicao`
**Altura Visual:** `h-40` (pequena)
**Posição:** Início do funil (esquerda)
**Objetivo:** Primeira exposição à marca (awareness)
**Tipo:** Simples (sem micro-etapas)

#### Micro-Etapas (0):
*Esta etapa não possui micro-etapas definidas. É uma etapa conceitual para representar o topo do funil.*

---

### 2. Pré-Venda
**ID:** `prevenda`
**Altura Visual:** `h-80` (alta)
**Posição:** Segunda etapa (esquerda)
**Objetivo:** Gerar e qualificar leads
**Tipo:** Simples

#### Micro-Etapas (5):
1. **Prospect** - Identificação de potenciais clientes
2. **Tentativa de Contato** - Primeiro contato com o lead
3. **Conectado** - Lead respondeu e está engajado
4. **Reunião Agendada** - Compromisso de reunião confirmado
5. **Reunião realizada** - Reunião de prospecção executada

---

### 3. Aquisição
**ID:** `aquisicao`
**Altura Visual:** `h-64` (média-alta)
**Posição:** Terceira etapa (esquerda)
**Objetivo:** Converter leads em clientes
**Tipo:** Simples

#### Micro-Etapas (5):
1. **Validação** - Validar fit do cliente com o produto
2. **Proposta Enviada** - Proposta comercial enviada
3. **Em Negociação** - Ajustes e negociação de termos
4. **Contrato na Rua** - Contrato enviado para assinatura
5. **Assinatura de contrato** - Contrato assinado, aguardando handover

---

### 4. Commit ⚡
**ID:** `commit`
**Altura Visual:** `h-48` (média-baixa - nó central)
**Posição:** Centro do BowTie (nó da gravata)
**Objetivo:** Handover de vendas para operações
**Característica Especial:** `isKnot: true`
**Tipo:** Simples

#### Micro-Etapas (7):
1. **Assinatura do Contrato** - Contrato oficialmente assinado
2. **V4 Marketing** - Documentação do V4 de Marketing
3. **Mensagem Próximos Passos (Vendedor)** - Comunicação com cliente sobre próximos passos
4. **Revisão da venda (Gerente)** - Gerente revisa a venda fechada
5. **Atribuição de projeto (Squad)** - Projeto atribuído ao squad operacional
6. **Call Handover Comercial para Ops (Coordenador)** - Reunião de passagem de bastão
7. **Atribuição do time operacional (Coordenador)** - Time operacional definido e comunicado

> **Nota:** Esta é a etapa central do BowTie, representando o momento crucial de transição entre vendas e operações. Substitui a antiga etapa "Compromisso".

---

### 5. Onboarding 🔷
**ID:** `onboarding`
**Altura Visual:** `h-96` (muito alta - 3 linhas)
**Posição:** Primeira etapa pós-venda (direita)
**Objetivo:** Preparar o cliente para começar a usar o serviço
**Tipo:** **Categorizada** (SABER, TER, EXECUTAR)

#### Estrutura por Categorias:

##### **SABER** (4 micro-etapas)
1. **Revisão do V4 Marketing** - Revisão do documento de marketing
2. **Boas-vindas (Gerente - Grupo Whats)** - Mensagem de boas-vindas do gerente
3. **Kickoff** - Reunião de kickoff com o cliente
4. **Coleta de Acessos** - Coleta de credenciais e acessos necessários

##### **TER** (7 micro-etapas)
1. **Revisão do V4 Marketing** - Revisão do documento de marketing
2. **Boas-vindas (Gerente - Grupo Whats)** - Mensagem de boas-vindas do gerente
3. **Kickoff** - Reunião de kickoff + levantamento de requisitos
4. **Planejamento da Implementação (Interno)** - Planejamento interno do projeto
5. **Planejamento da Implementação (Revisão)** - Revisão interna do planejamento
6. **Planejamento da Implementação (Cliente)** - Apresentação ao cliente
7. **Encerramento (CSAT)** - Finalização com pesquisa de satisfação

> **Produtos TER**: CRM Marketing, CRM Comercial, E-commerce, Site, BI, Chatbot. São produtos de implementação com início, meio e fim definidos. O Onboarding foca no **planejamento da implementação**.

##### **EXECUTAR** (8 micro-etapas)
1. **Revisão do V4 Marketing** - Revisão do documento de marketing
2. **Boas-vindas (Gerente - Grupo Whats)** - Mensagem de boas-vindas do gerente
3. **Kickoff** - Reunião de kickoff com o cliente
4. **Coleta de Acessos** - Coleta de credenciais e acessos necessários
5. **Planejamento Interno** - Planejamento interno do projeto
6. **Planejamento Revisão** - Revisão do planejamento internamente
7. **Apresentação Planejamento** - Apresentação do planejamento ao cliente
8. **Encerramento (CSAT)** - Finalização com pesquisa de satisfação

> **Nota sobre categorias:** As categorias SABER e EXECUTAR podem ter micro-etapas em comum (ex: Kickoff), mas pertencem a produtos diferentes do portfólio. O sistema usa o formato "Onboarding | SABER | Kickoff" na API para diferenciar.

---

### 6. Retenção 🔷
**ID:** `retencao`
**Altura Visual:** `h-96` (muito alta - 3 linhas)
**Posição:** Segunda etapa pós-venda (direita)
**Objetivo:** Manutenção, diagnósticos e otimização contínua do cliente
**Tipo:** **Categorizada** (SABER, TER, EXECUTAR)

#### Estrutura por Categorias:

##### **SABER** (5 micro-etapas)
1. **Fase 2** - Segunda fase do diagnóstico
2. **Fase 3** - Terceira fase do diagnóstico
3. **Fase 4** - Quarta fase do diagnóstico
4. **Fase 5** - Quinta fase do diagnóstico
5. **Encerramento (NPS)** - Finalização com pesquisa NPS

##### **TER** (6 micro-etapas)
1. **Prototipação** - Criação de MVP/protótipo
2. **Desenvolvimento** - Implementação completa
3. **Homologação Interna** - Testes de QA
4. **Apresentação Cliente** - Demo e treinamento
5. **Go-Live** - Publicação em produção
6. **Encerramento (NPS)** - Finalização com pesquisa NPS

> **Produtos TER**: CRM Marketing, CRM Comercial, E-commerce, Site, BI, Chatbot. A Retenção foca na **execução da implementação**. Após o Go-Live, o projeto TER é concluído.

##### **EXECUTAR** (6 micro-etapas)
1. **DO (Execução)** - Executar as ações planejadas
2. **CHECK (Qualidade)** - Verificar qualidade e resultados
3. **ACT (Otimizações)** - Implementar melhorias
4. **PLAN (Replanejamento)** - Planejar próximo ciclo
5. **Check-in (Revisão)** - Revisão periódica interna
6. **Check-in (Cliente)** - Reunião de acompanhamento com cliente

> **Nota:** Esta etapa consolida as antigas etapas "Diagnósticos", "Implementações" e "Ongoing" em uma única etapa categorizada. O EXECUTAR segue o ciclo PDCA (Plan-Do-Check-Act).

---

### 7. Expansão
**ID:** `expansao`
**Altura Visual:** `h-96` (muito alta)
**Posição:** Fim do funil (direita)
**Objetivo:** Expansão e upsell
**Tipo:** Simples

#### Micro-Etapas (6):
1. **Levantada de mão** - Cliente expressa interesse em expansão
2. **Validação** - Validar oportunidade de expansão
3. **Proposta enviada** - Proposta de expansão/upsell enviada
4. **Em negociação** - Negociação de novos termos
5. **Contrato na rua** - Novo contrato enviado para assinatura
6. **Assinatura de contrato** - Novo contrato assinado

> **Nota:** Replica e expande o processo de Aquisição para expansão de receita. Substitui a antiga etapa "Monetização".

---

## 📐 Arquitetura Visual do BowTie

```
[Exposição] → [Pré-Venda] → [Aquisição] → [Commit] → [Onboarding 🔷] → [Retenção 🔷] → [Expansão]
     ↑            ↑             ↑            ⚡              ↓                  ↓              ↓
    h-40         h-80          h-64         h-48           h-96               h-96           h-96
  (0 micro)    (5 micro)     (5 micro)   (7 micro)      (3 categorias)    (3 categorias)  (6 micro)
                                                         19 micro total     17 micro total
```

### Legenda:
- ⚡ = Etapa central (nó)
- 🔷 = Etapa categorizada (3 linhas verticais quando expandida)

### Progressão de Alturas:
- **Exposição:** Pequena (40) - conceitual
- **Entrada (Pré-Venda):** Alta (80) - captura ampla
- **Qualificação (Aquisição):** Média-Alta (64) - funil se estreita
- **Conversão (Commit):** Média-Baixa (48) - nó central
- **Expansão Pós-Venda:** Máxima (96 × 3) - maior complexidade e volume

---

## 🔧 Referências Técnicas

### Código Fonte
**Arquivo:** `/src/config/api.js`

A configuração oficial está na constante `STAGE_CONFIG`:

#### Etapa Simples (exemplo):
```javascript
'Pré-Venda': {
  id: 'prevenda',
  height: 'h-80',
  microSteps: ['Prospect', 'Tentativa de Contato', ...]
}
```

#### Etapa Categorizada (exemplo):
```javascript
'Onboarding': {
  id: 'onboarding',
  height: 'h-96',
  isCategorized: true,
  categories: {
    'SABER': [
      'Revisão do V4 Marketing',
      'Boas-vindas (Gerente - Grupo Whats)',
      ...
    ],
    'TER': [],
    'EXECUTAR': [
      'Planejamento Interno',
      ...
    ]
  }
}
```

### Formato de API para Etapas Categorizadas

Para etapas categorizadas, o campo `micro_etapa` da API deve seguir o formato de 3 partes:

```
"Macro | Categoria | Micro"
```

**Exemplos:**
- `"Onboarding | SABER | Kickoff"`
- `"Onboarding | EXECUTAR | Planejamento Interno"`
- `"Retenção | SABER | Fase 2"`
- `"Retenção | EXECUTAR | DO (Execução)"`

Para etapas simples, o formato de 2 partes continua válido:
```
"Pré-Venda | Prospect"
```

### Normalização de Nomes
**Arquivo:** `/src/utils/microStepMapping.js`

Sistema de normalização que aceita variações de grafia (acentuação, case, formato pipe) e converte para os nomes padronizados. Inclui mapeamento de backward compatibility para migrar dados antigos.

**Documentação:** `docs/CATEGORIZED_STAGES.md`

---

## 📋 Tabela de Referência Rápida

| Etapa | ID | Tipo | Micro-Etapas | Categorias | Altura |
|-------|----|----|--------------|------------|--------|
| Exposição | exposicao | Simples | 0 | - | h-40 |
| Pré-Venda | prevenda | Simples | 5 | - | h-80 |
| Aquisição | aquisicao | Simples | 5 | - | h-64 |
| Commit | commit | Simples (Nó) | 7 | - | h-48 |
| Onboarding | onboarding | Categorizada | 19 | SABER (4), TER (7), EXECUTAR (8) | h-96 |
| Retenção | retencao | Categorizada | 17 | SABER (5), TER (6), EXECUTAR (6) | h-96 |
| Expansão | expansao | Simples | 6 | - | h-96 |

---

## 🎨 Comportamento Visual

### Etapas Simples (Estado Expandido)
- **Layout horizontal** com título à esquerda (220px fixo)
- Cards de micro-etapas à direita, scroll horizontal

### Etapas Categorizadas (Estado Expandido)
- **Layout vertical** com 3 linhas (SABER, TER, EXECUTAR)
- Título à esquerda (220px fixo)
- Cada linha:
  - Label da categoria (uppercase, small, gray)
  - Cards de micro-etapas em scroll horizontal independente
  - Categorias vazias exibem: "Nenhuma micro-etapa definida"

### Heatmap
Cada etapa recebe uma intensidade de cor baseada no **score de impacto acumulado** das ações:
- **Alto impacto** = Vermelho mais intenso
- **Baixo impacto** = Vermelho mais suave
- **Sem ações** = Cinza escuro

Para etapas categorizadas, o score é a **soma de todas as categorias**.

### Indicador de Trava (Bottleneck)
A etapa com **maior score de impacto** recebe um badge "TRAVA" no topo:
- Badge vermelho pulsante
- Ícone de cadeado
- Sombra vermelha brilhante

**Tie-breaker:** Em caso de empate, ganha a etapa **mais à direita** (mais próxima da expansão).

---

## 📝 Notas para Desenvolvimento

### Adicionando Nova Etapa Simples
1. Editar `src/config/api.js` → `STAGE_CONFIG`
2. Adicionar mapeamento em `src/utils/microStepMapping.js`
3. Atualizar este documento

### Adicionando Nova Etapa Categorizada
1. Editar `src/config/api.js` → `STAGE_CONFIG` com `isCategorized: true`
2. Definir `categories: { 'SABER': [...], 'TER': [...], 'EXECUTAR': [...] }`
3. Adicionar mapeamentos em `src/utils/microStepMapping.js`
4. Atualizar este documento

### Adicionando Micro-Etapa a Etapa Categorizada
1. Adicionar à categoria apropriada em `src/config/api.js`
2. Adicionar variações em `src/utils/microStepMapping.js`
3. Atualizar a API para enviar formato 3-partes: `"Macro | Categoria | Micro"`

### Modificando Altura Visual
As alturas usam classes Tailwind:
- `h-40` = 10rem (160px)
- `h-48` = 12rem (192px)
- `h-64` = 16rem (256px)
- `h-80` = 20rem (320px)
- `h-96` = 24rem (384px)

---

## 🔄 Migração da Versão 2.0 para 3.0

### Mapeamento de Etapas Antigas → Novas

| Etapa Antiga | Etapa Nova | Categoria (se aplicável) |
|--------------|-----------|-------------------------|
| Compromisso | Commit | - |
| Diagnósticos | Retenção | SABER |
| Onboarding (antigo) | Onboarding | EXECUTAR (padrão) |
| Implementações | Retenção | EXECUTAR |
| Ongoing | Retenção | EXECUTAR |
| Monetização | Expansão | - |

### Backward Compatibility

O sistema suporta dados antigos automaticamente:
- Transformer detecta formato "Macro | Micro" (2 partes) vs "Macro | Categoria | Micro" (3 partes)
- Mapeamento automático de nomes antigos para novos em `microStepMapping.js`
- Categorias não especificadas defaultam para "SABER"

---

## 📚 Documentos Relacionados

- **[CLAUDE.md](../CLAUDE.md)** - Guia geral de desenvolvimento
- **[CATEGORIZED_STAGES.md](./CATEGORIZED_STAGES.md)** - Guia detalhado sobre etapas categorizadas
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura do sistema
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Integração com backend
- **[BOWTIE_RESTRUCTURING_PLAN.md](./BOWTIE_RESTRUCTURING_PLAN.md)** - Plano de reestruturação (histórico)

---

## ✅ Checklist de Validação

Ao modificar etapas ou micro-etapas, validar:

- [ ] `STAGE_CONFIG` atualizado em `src/config/api.js`
- [ ] Categoria correta definida (se etapa categorizada)
- [ ] Mapeamentos atualizados em `src/utils/microStepMapping.js`
- [ ] API envia formato correto (3 partes para categorizadas)
- [ ] Este documento atualizado
- [ ] Testes visuais (etapas expandem corretamente)
- [ ] Testes de cálculo (scores e bottleneck corretos)
- [ ] README.md atualizado (se aplicável)

---

**Última atualização:** 19 de fevereiro de 2026
**Mantido por:** Equipe de Desenvolvimento Ferraz Piai
**Revisão:** A cada mudança em etapas/micro-etapas
**Versão:** 3.0 (Reestruturação para 7 etapas com categorização)
