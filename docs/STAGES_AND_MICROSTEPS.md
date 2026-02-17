# Etapas e Micro-Etapas do BowTie

**Versão:** 2.0
**Data:** 17 de fevereiro de 2026
**Status:** ✅ Documentação Oficial

Este documento lista **todas as etapas (macro-etapas) e micro-etapas** do funil BowTie Ferraz Piai, servindo como referência única para desenvolvimento e negócio.

---

## 📊 Visão Geral

O BowTie é composto por **8 etapas principais** que representam a jornada do cliente, desde a prospecção até a monetização/expansão. Cada etapa contém **micro-etapas** que detalham o processo.

| Estatística | Valor |
|-------------|-------|
| **Total de Etapas** | 8 |
| **Total de Micro-Etapas** | 41 |
| **Etapa Central (Nó)** | Compromisso |
| **Lado Esquerdo (Pré-venda)** | 3 etapas (9 micro-etapas) |
| **Lado Direito (Pós-venda)** | 5 etapas (32 micro-etapas) |

---

## 🎯 As 8 Etapas do BowTie

### 1. Pré-Venda
**ID:** `prevenda`
**Altura Visual:** `h-80` (alta)
**Posição:** Início do funil (esquerda)
**Objetivo:** Gerar e qualificar leads

#### Micro-Etapas (4):
1. **Prospect** - Identificação de potenciais clientes
2. **Tentativa de Contato** - Primeiro contato com o lead
3. **Conectado** - Lead respondeu e está engajado
4. **Reunião Agendada** - Compromisso de reunião confirmado

---

### 2. Aquisição
**ID:** `aquisicao`
**Altura Visual:** `h-64` (média-alta)
**Posição:** Segunda etapa (esquerda)
**Objetivo:** Converter leads em clientes

#### Micro-Etapas (4):
1. **Validação** - Validar fit do cliente com o produto
2. **Proposta Enviada** - Proposta comercial enviada
3. **Em Negociação** - Ajustes e negociação de termos
4. **Contrato na Rua** - Contrato enviado para assinatura

---

### 3. Compromisso ⚡
**ID:** `compromisso`
**Altura Visual:** `h-40` (pequena - nó central)
**Posição:** Centro do BowTie (nó da gravata)
**Objetivo:** Momento da venda fechada
**Característica Especial:** `isKnot: true`

#### Micro-Etapas (1):
1. **Venda Fechada** - Contrato assinado, cliente adquirido

> **Nota:** Esta é a etapa central do BowTie, representando o momento crucial da conversão.

---

### 4. Diagnósticos
**ID:** `diagnostico`
**Altura Visual:** `h-48` (média-baixa)
**Posição:** Primeira etapa pós-venda (direita)
**Subtitle:** "(Saber)"
**Objetivo:** Entender o estado atual e necessidades do cliente

#### Micro-Etapas (6):
1. **Kickoff Interno** - Alinhamento interno da equipe
2. **Kickoff** - Reunião de kickoff com o cliente
3. **Fase 2** - Segunda fase do diagnóstico
4. **Fase 3** - Terceira fase do diagnóstico
5. **Fase 4** - Quarta fase do diagnóstico
6. **Fase 5** - Quinta e última fase do diagnóstico

---

### 5. Onboarding
**ID:** `onboarding`
**Altura Visual:** `h-56` (média)
**Posição:** Segunda etapa pós-venda (direita)
**Subtitle:** "(Executar)"
**Objetivo:** Preparar o cliente para começar a usar o serviço

#### Micro-Etapas (7):
1. **Embarque (Growth Class)** - Treinamento inicial e nivelamento
2. **Kickoff** - Início oficial do projeto
3. **Setup Inicial** - Configurações iniciais
4. **Planejamento MKT** - Planejamento de marketing
5. **Validação Interna** - Revisão interna do planejamento
6. **Apresentação Cliente** - Apresentação do plano ao cliente
7. **Encerramento** - Finalização da fase de onboarding

---

### 6. Implementações
**ID:** `implementacoes`
**Altura Visual:** `h-64` (média-alta)
**Posição:** Terceira etapa pós-venda (direita)
**Objetivo:** Executar as implementações planejadas

#### Micro-Etapas (9):
1. **Setup Imp.** - Configuração inicial da implementação
2. **Revisão pré-Go Live** - Revisão final antes do lançamento
3. **Go Live** - Lançamento oficial
4. **1º Check-in (Interno)** - Primeira verificação interna
5. **1º Check-in (Revisão)** - Primeira verificação com revisão
6. **Execução** - Execução contínua das implementações
7. **Replanejamento** - Ajustes no planejamento
8. **Check-in Mensal** - Verificação mensal de progresso
9. **Encerramento** - Finalização da fase de implementações

---

### 7. Ongoing
**ID:** `ongoing`
**Altura Visual:** `h-80` (alta)
**Posição:** Quarta etapa pós-venda (direita)
**Objetivo:** Manutenção e otimização contínua (ciclo PDCA)

#### Micro-Etapas (6):
1. **DO (Execução)** - Executar as ações planejadas
2. **CHECK (Qualidade)** - Verificar qualidade e resultados
3. **ACT (Otimizações)** - Implementar melhorias
4. **PLAN (Replanejamento)** - Planejar próximo ciclo
5. **Check-in (Revisão)** - Revisão periódica
6. **Check-in (Cliente)** - Reunião de acompanhamento com cliente

> **Nota:** Segue o ciclo PDCA (Plan-Do-Check-Act) para melhoria contínua.

---

### 8. Monetização
**ID:** `monetizacao`
**Altura Visual:** `h-96` (muito alta)
**Posição:** Fim do funil (direita)
**Objetivo:** Expansão e upsell

#### Micro-Etapas (4):
1. **Validação** - Validar oportunidade de expansão
2. **Proposta Enviada** - Proposta de expansão/upsell enviada
3. **Em Negociação** - Negociação de novos termos
4. **Contrato na Rua** - Novo contrato enviado para assinatura

> **Nota:** Replica o processo de Aquisição para expansão de receita.

---

## 📐 Arquitetura Visual do BowTie

```
[Pré-Venda] → [Aquisição] → [Compromisso] → [Diagnósticos] → [Onboarding] → [Implementações] → [Ongoing] → [Monetização]
    ↑              ↑              ⚡               ↓                ↓                 ↓              ↓           ↓
   h-80          h-64           h-40            h-48             h-56              h-64           h-80        h-96
(4 micro)     (4 micro)      (1 micro)       (6 micro)        (7 micro)         (9 micro)      (6 micro)   (4 micro)
```

### Progressão de Alturas:
- **Entrada (Pré-Venda):** Alta (80) - captura ampla
- **Qualificação (Aquisição):** Média-Alta (64) - funil se estreita
- **Conversão (Compromisso):** Baixa (40) - nó central
- **Expansão Pós-Venda:** Crescente (48 → 56 → 64 → 80 → 96)
- **Saída (Monetização):** Muito Alta (96) - expansão máxima

---

## 🔧 Referências Técnicas

### Código Fonte
**Arquivo:** `/src/config/api.js`

A configuração oficial está na constante `STAGE_CONFIG`:

```javascript
export const STAGE_CONFIG = {
  'Pré-Venda': {
    id: 'prevenda',
    height: 'h-80',
    microSteps: ['Prospect', 'Tentativa de Contato', ...]
  },
  // ... outras etapas
}
```

### Normalização de Nomes
**Arquivo:** `/src/utils/microStepMapping.js`

Sistema de normalização que aceita variações de grafia (acentuação, case, formato pipe) e converte para os nomes padronizados.

**Documentação:** `docs/archive/MAPEAMENTO_MICRO_ETAPAS.md`

---

## 📋 Tabela de Referência Rápida

| Etapa | ID | Micro-Etapas | Subtitle | Altura |
|-------|----|--------------| ---------|--------|
| Pré-Venda | prevenda | 4 | - | h-80 |
| Aquisição | aquisicao | 4 | - | h-64 |
| Compromisso | compromisso | 1 | - | h-40 |
| Diagnósticos | diagnostico | 6 | (Saber) | h-48 |
| Onboarding | onboarding | 7 | (Executar) | h-56 |
| Implementações | implementacoes | 9 | - | h-64 |
| Ongoing | ongoing | 6 | - | h-80 |
| Monetização | monetizacao | 4 | - | h-96 |

---

## 🎨 Comportamento Visual

### Heatmap
Cada etapa recebe uma intensidade de cor baseada no **score de impacto acumulado** das ações:
- **Alto impacto** = Vermelho mais intenso
- **Baixo impacto** = Vermelho mais suave
- **Sem ações** = Cinza escuro

### Bordas
- **Etapa inativa:** Borda vermelha com opacidade variável (0.4 a 1.0)
- **Etapa ativa/expandida:** Borda vermelha sólida (`#E30613`)
- **Hover:** Leve aumento de escala (1.02x)

### Indicador de Trava (Bottleneck)
A etapa com **maior score de impacto** recebe um badge "TRAVA" no topo:
- Badge vermelho pulsante
- Ícone de cadeado
- Sombra vermelha brilhante

**Tie-breaker:** Em caso de empate, ganha a etapa **mais à direita** (mais próxima da monetização).

---

## 🔄 Estados das Etapas

### Estado Fechado (Padrão)
- Mostra título da macro-etapa
- Indicadores de impacto/esforço
- Contador total de ações
- Visualização compacta

### Estado Expandido (Ativo)
- Título à esquerda
- Micro-etapas exibidas horizontalmente à direita
- Cards individuais para cada micro-etapa
- Contador de ações por micro-etapa

---

## 📝 Notas para Desenvolvimento

### Adicionando Nova Etapa
1. Editar `src/config/api.js` → `STAGE_CONFIG`
2. Adicionar mapeamento em `src/utils/microStepMapping.js`
3. Atualizar este documento

### Adicionando Nova Micro-Etapa
1. Editar array `microSteps` da etapa em `src/config/api.js`
2. Adicionar variações em `src/utils/microStepMapping.js`
3. Atualizar este documento
4. Testar normalização de nomes

### Modificando Altura Visual
As alturas usam classes Tailwind:
- `h-40` = 10rem (160px)
- `h-48` = 12rem (192px)
- `h-56` = 14rem (224px)
- `h-64` = 16rem (256px)
- `h-80` = 20rem (320px)
- `h-96` = 24rem (384px)

---

## 📚 Documentos Relacionados

- **[CLAUDE.md](../CLAUDE.md)** - Guia geral de desenvolvimento
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura do sistema
- **[MAPEAMENTO_MICRO_ETAPAS.md](./archive/MAPEAMENTO_MICRO_ETAPAS.md)** - Sistema de normalização
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Integração com backend

---

## ✅ Checklist de Validação

Ao modificar etapas ou micro-etapas, validar:

- [ ] `STAGE_CONFIG` atualizado em `src/config/api.js`
- [ ] Mapeamentos atualizados em `src/utils/microStepMapping.js`
- [ ] Este documento atualizado
- [ ] Testes manuais de normalização
- [ ] README.md atualizado (se aplicável)

---

**Última atualização:** 17 de fevereiro de 2026
**Mantido por:** Equipe de Desenvolvimento Ferraz Piai
**Revisão:** A cada mudança em etapas/micro-etapas
