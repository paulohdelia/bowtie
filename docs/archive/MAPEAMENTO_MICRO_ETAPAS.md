# Mapeamento de Micro-Etapas

**Data:** 2026-02-17
**Versão:** 1.5

## 📋 Sistema de Normalização

Os nomes de micro-etapas vindos da API são **automaticamente normalizados** para os nomes padronizados definidos no sistema.

### Como Funciona

1. **API envia** micro-etapa (pode ter variações de grafia, acentuação, formato, etc.)
2. **Sistema extrai** a micro-etapa se vier no formato "Macro | Micro"
3. **Sistema normaliza** para o nome padrão (case-insensitive)
4. **Resultado** é sempre o nome padronizado

### Características

- ✅ **Extrai do formato pipe**: "Ongoing | CHECK (Qualidade)" → "CHECK (Qualidade)"
- ✅ **Case-insensitive**: "kickoff", "KICKOFF", "Kickoff" → "Kickoff"
- ✅ **Remove espaços extras**: "  setup  " → "Setup Inicial"
- ✅ **Aceita variações**: "validacao", "validação" → "Validação"
- ✅ **Mantém personalizadas**: Se não houver mapeamento, mantém o nome original

## 🗺️ Tabela de Mapeamento

### Formato: Nome API → Nome Padronizado

### Pré-Venda

```
prospect → Prospect
prospecção → Prospect
prospeccao → Prospect

tentativa de contato → Tentativa de Contato
tentativa → Tentativa de Contato
contato → Tentativa de Contato

conectado → Conectado
conexão → Conectado
conexao → Conectado

reunião agendada → Reunião Agendada
reuniao agendada → Reunião Agendada
agendada → Reunião Agendada
reunião → Reunião Agendada
reuniao → Reunião Agendada
```

### Aquisição

```
validação → Validação
validacao → Validação

proposta enviada → Proposta Enviada
proposta → Proposta Enviada

em negociação → Em Negociação
em negociacao → Em Negociação
negociação → Em Negociação
negociacao → Em Negociação

contrato na rua → Contrato na Rua
contrato → Contrato na Rua
```

### Compromisso

```
venda fechada → Venda Fechada
fechada → Venda Fechada
fechamento → Venda Fechada
```

### Diagnósticos

```
kickoff interno → Kickoff Interno
kickoff int → Kickoff Interno

kickoff → Kickoff
kick-off → Kickoff
kick off → Kickoff

fase 2 → Fase 2
fase2 → Fase 2

fase 3 → Fase 3
fase3 → Fase 3

fase 4 → Fase 4
fase4 → Fase 4

fase 5 → Fase 5
fase5 → Fase 5
```

### Onboarding

```
embarque (growth class) → Embarque (Growth Class)
embarque → Embarque (Growth Class)
growth class → Embarque (Growth Class)

kick-off → Kick-off
kickoff → Kick-off

setup inicial → Setup Inicial
setup → Setup Inicial

planejamento mkt → Planejamento MKT
planejamento → Planejamento MKT

validação interna → Validação Interna
validacao interna → Validação Interna

apresentação cliente → Apresentação Cliente
apresentacao cliente → Apresentação Cliente
apresentação → Apresentação Cliente
apresentacao → Apresentação Cliente

encerramento → Encerramento
```

### Implementações

```
setup imp. → Setup Imp.
setup imp → Setup Imp.
setup implementação → Setup Imp.
setup implementacao → Setup Imp.

revisão pré-go live → Revisão pré-Go Live
revisao pre-go live → Revisão pré-Go Live
revisão → Revisão pré-Go Live
revisao → Revisão pré-Go Live

go live → Go Live
golive → Go Live

1º check-in (interno) → 1º Check-in (Interno)
1 check-in (interno) → 1º Check-in (Interno)
primeiro check-in interno → 1º Check-in (Interno)
check-in interno → 1º Check-in (Interno)

1º check-in (revisão) → 1º Check-in (Revisão)
1 check-in (revisao) → 1º Check-in (Revisão)
primeiro check-in revisão → 1º Check-in (Revisão)
check-in revisão → 1º Check-in (Revisão)

execução → Execução
execucao → Execução

replanejamento → Replanejamento
replanejar → Replanejamento

check-in mensal → Check-in Mensal
checkin mensal → Check-in Mensal
mensal → Check-in Mensal

encerramento → Encerramento
```

### Ongoing

```
do (execução) → DO (Execução)
do (execucao) → DO (Execução)
do → DO (Execução)
execução → DO (Execução)
execucao → DO (Execução)

check (qualidade) → CHECK (Qualidade)
check → CHECK (Qualidade)
qualidade → CHECK (Qualidade)

act (otimizações) → ACT (Otimizações)
act (otimizacoes) → ACT (Otimizações)
act → ACT (Otimizações)
otimizações → ACT (Otimizações)
otimizacoes → ACT (Otimizações)

plan (replanejamento) → PLAN (Replanejamento)
plan → PLAN (Replanejamento)

check-in (revisão) → Check-in (Revisão)
check-in (revisao) → Check-in (Revisão)
check-in revisão → Check-in (Revisão)
check-in revisao → Check-in (Revisão)

check-in (cliente) → Check-in (Cliente)
check-in cliente → Check-in (Cliente)
```

### Monetização

```
validação → Validação
validacao → Validação

proposta enviada → Proposta Enviada
proposta → Proposta Enviada

em negociação → Em Negociação
em negociacao → Em Negociação
negociação → Em Negociação
negociacao → Em Negociação

contrato na rua → Contrato na Rua
contrato → Contrato na Rua
```

## 🧪 Exemplos de Uso

### Exemplo 1: Formato Pipe (Macro | Micro)

**API envia:**
```json
{
  "macro_etapa": "Ongoing",
  "micro_etapa": "Ongoing | CHECK (Qualidade)",
  "acao": "Verificar qualidade"
}
```

**Sistema extrai e normaliza:**
```
Ongoing > CHECK (Qualidade) > Verificar qualidade
```

### Exemplo 2: Normalização Básica

**API envia:**
```json
{
  "macro_etapa": "Implementações",
  "micro_etapa": "setup imp",
  "acao": "Configurar ambiente"
}
```

**Sistema normaliza para:**
```
Implementações > Setup Imp. > Configurar ambiente
```

### Exemplo 2: Case Insensitive

**API envia:**
```json
{
  "macro_etapa": "Diagnósticos",
  "micro_etapa": "KICKOFF",
  "acao": "Reunião inicial"
}
```

**Sistema normaliza para:**
```
Diagnósticos > Kickoff > Reunião inicial
```

### Exemplo 3: Com Acentuação

**API envia:**
```json
{
  "macro_etapa": "Ongoing",
  "micro_etapa": "execucao",
  "acao": "Executar tarefa"
}
```

**Sistema normaliza para:**
```
Ongoing > DO (Execução) > Executar tarefa
```

### Exemplo 4: Micro-Etapa Vazia

**API envia:**
```json
{
  "macro_etapa": "Implementações",
  "micro_etapa": "",
  "acao": "Tarefa sem categoria"
}
```

**Sistema normaliza para:**
```
Implementações > (micro etapa não mapeada) > Tarefa sem categoria
```

### Exemplo 5: Micro-Etapa Customizada

**API envia:**
```json
{
  "macro_etapa": "Implementações",
  "micro_etapa": "Etapa Especial do Cliente X",
  "acao": "Ação customizada"
}
```

**Sistema mantém original:**
```
Implementações > Etapa Especial do Cliente X > Ação customizada
```

## 📝 Arquivos Implementados

- **`/src/utils/microStepMapping.js`** - Dicionário de mapeamento e função de normalização
- **`/src/utils/dataTransformer.js`** - Usa `normalizeMicroStepName()` em `normalizeItem()`

## ✅ Regras de Normalização

1. **Prioridade ao mapeamento**: Se existe no dicionário, usa o nome padronizado
2. **Case-insensitive**: "kickoff" = "KICKOFF" = "Kickoff"
3. **Trim automático**: Remove espaços antes e depois
4. **Preserva customizadas**: Se não está no mapeamento, mantém o nome original
5. **Vazio = não mapeada**: String vazia/null → "(micro etapa não mapeada)"

## 🔧 Como Adicionar Novo Mapeamento

Edite `/src/utils/microStepMapping.js`:

```javascript
export const MICRO_STEP_MAPPING = {
  // ... mapeamentos existentes

  // Adicionar novo
  'novo nome da api': 'Nome Padronizado',
  'variacao do nome': 'Nome Padronizado'
};
```

## 📊 Estatísticas

- **Total de mapeamentos**: ~100+ variações
- **Micro-etapas padronizadas**: 41
- **Macro-etapas**: 8
- **Suporte a acentuação**: ✅ Sim
- **Case-sensitive**: ❌ Não (case-insensitive)

---

**Status:** ✅ Implementado e testado
**Manutenção:** Para adicionar novos mapeamentos, edite `microStepMapping.js`
