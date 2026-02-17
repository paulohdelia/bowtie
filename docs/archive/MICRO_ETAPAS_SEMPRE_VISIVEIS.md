# Micro-Etapas Sempre Visíveis

**Data:** 2026-02-17
**Versão:** 1.4

## 🔄 Mudança Implementada

As **micro-etapas agora são sempre exibidas**, mesmo quando não possuem ações.

### Antes
- Micro-etapas apareciam apenas quando tinham dados
- Ao aplicar filtros, micro-etapas vazias desapareciam

### Agora
- ✅ Micro-etapas **pré-definidas** sempre aparecem
- ✅ Aparecem com **count = 0** quando vazias
- ✅ Funcionam mesmo com filtros de sprint
- ✅ Micro-etapas extras dos dados são adicionadas dinamicamente

## 📝 Arquivos Modificados

### `/src/config/api.js`
Adicionada propriedade `microSteps` em cada stage:

```javascript
'Implementações': {
  id: 'implementacoes',
  height: 'h-64',
  microSteps: ['Setup Imp.', 'Revisão pré-Go Live', 'Go Live', ...]
}
```

### `/src/utils/dataTransformer.js`

**Função `buildStage()` atualizada:**
- Usa micro-etapas pré-definidas do `STAGE_CONFIG`
- Mescla com dados da API
- Adiciona micro-etapas extras que não estão na config
- Garante que micro-etapas pré-definidas apareçam mesmo vazias

**Criação de stages vazios atualizada:**
- Stages sem dados agora incluem micro-etapas pré-definidas vazias

## 🧪 Testes Realizados

```bash
✅ Teste 1: Dados parciais → 3 micro-etapas (1 com dados, 2 vazias)
✅ Teste 2: Stage vazio → 3 micro-etapas (todas vazias)
✅ Teste 3: Micro-etapa extra → 4 micro-etapas (3 pré-definidas + 1 extra)
```

## 🎯 Comportamento

### Cenário 1: Dados Parciais
**API retorna:**
- Implementações > Setup Imp. > 5 ações

**Resultado:**
- Setup Imp. (5 ações)
- Revisão pré-Go Live (0 ações) ← **sempre aparece**
- Go Live (0 ações) ← **sempre aparece**
- ... demais micro-etapas vazias

### Cenário 2: Stage Vazio
**API retorna:**
- Nenhuma ação para Implementações

**Resultado:**
- Setup Imp. (0 ações) ← **sempre aparece**
- Revisão pré-Go Live (0 ações) ← **sempre aparece**
- Go Live (0 ações) ← **sempre aparece**
- ... demais micro-etapas vazias

### Cenário 3: Filtro de Sprint
**Antes do filtro:**
- Setup Imp. (10 ações Sprint 1 + 5 ações Sprint 2)

**Filtro Sprint 1:**
- Setup Imp. (10 ações)
- Revisão pré-Go Live (0 ações) ← **ainda aparece**
- Go Live (0 ações) ← **ainda aparece**

### Cenário 4: Micro-Etapa Extra
**API retorna:**
- Implementações > "Nova Etapa Customizada" > 3 ações

**Resultado:**
- Setup Imp. (0 ações) ← pré-definida
- Revisão pré-Go Live (0 ações) ← pré-definida
- Go Live (0 ações) ← pré-definida
- Nova Etapa Customizada (3 ações) ← **adicionada dinamicamente**

## 📊 Micro-Etapas Pré-Definidas

### Pré-Venda (4 micro-etapas)
- Prospect
- Tentativa de Contato
- Conectado
- Reunião Agendada

### Aquisição (4 micro-etapas)
- Validação
- Proposta Enviada
- Em Negociação
- Contrato na Rua

### Compromisso (1 micro-etapa)
- Venda Fechada

### Diagnósticos (6 micro-etapas)
- Kickoff Interno
- Kickoff
- Fase 2
- Fase 3
- Fase 4
- Fase 5

### Onboarding (7 micro-etapas)
- Embarque (Growth Class)
- Kick-off
- Setup Inicial
- Planejamento MKT
- Validação Interna
- Apresentação Cliente
- Encerramento

### Implementações (9 micro-etapas)
- Setup Imp.
- Revisão pré-Go Live
- Go Live
- 1º Check-in (Interno)
- 1º Check-in (Revisão)
- Execução
- Replanejamento
- Check-in Mensal
- Encerramento

### Ongoing (6 micro-etapas)
- DO (Execução)
- CHECK (Qualidade)
- ACT (Otimizações)
- PLAN (Replanejamento)
- Check-in (Revisão)
- Check-in (Cliente)

### Monetização (4 micro-etapas)
- Validação
- Proposta Enviada
- Em Negociação
- Contrato na Rua

## ✅ Benefícios

1. **Consistência Visual**: BowTie sempre tem a mesma estrutura
2. **Identificação de Gaps**: Fácil ver quais etapas não têm ações
3. **Planejamento**: Visualizar todas as etapas do processo
4. **Filtros**: Micro-etapas permanecem visíveis ao filtrar sprints

---

**Status:** ✅ Implementado e testado
**Total de micro-etapas:** 41 micro-etapas pré-definidas
