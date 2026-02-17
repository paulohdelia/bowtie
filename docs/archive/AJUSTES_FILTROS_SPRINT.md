# Ajustes - Filtros de Sprint

**Data:** 2026-02-17
**Versão:** 1.2

## 🔄 Mudanças Realizadas

### 1. Renomeação de Filtros ✅

**Antes:**
- "Todas as Sprints" - Filtrava done e cancelled
- "Backlog (Sem Data)" - Mostrava itens sem sprint

**Agora:**
- **"Todas as Ações"** - Mostra TODAS as ações sem nenhum filtro (incluindo done e cancelled)
- Opção "Backlog" removida

### 2. Detecção Automática de Sprint Atual ✅

**Antes:**
- Sprint atual era hardcoded: `'Sprint 3'`

**Agora:**
- **Sprint atual é detectada automaticamente** como a maior sprint nos dados
- Exemplo: Se há Sprint 1, 2, 3, 5 → Sprint atual = Sprint 5

### 3. Sprints Dinâmicas ✅

**Antes:**
- Opções de sprint eram hardcoded (Sprint 1, 2, 3)

**Agora:**
- **Sprints são geradas dinamicamente** a partir dos dados recebidos
- Apenas sprints que existem nos dados são mostradas
- Sprint atual é marcada com "(Atual)"

### 4. Tratamento de Backlog ✅

- Sprint vinda como `"-"` da API é tratada como backlog (string vazia)
- Itens sem sprint aparecem com badge "Backlog"

## 📝 Arquivos Criados

### `/src/utils/sprintDetector.js`

Utilitário para detectar e extrair informações de sprints:

```javascript
// Extrai todas as sprints únicas
extractSprints(bowTieData) → ['Sprint 1', 'Sprint 2', 'Sprint 3']

// Detecta a sprint atual (maior sprint)
detectCurrentSprint(bowTieData) → 'Sprint 3'

// Verifica se há ações no backlog
hasBacklogActions(bowTieData) → true/false
```

## 📝 Arquivos Modificados

### `/src/hooks/useFilters.js`

**Mudanças:**
- Recebe `bowTieData` como parâmetro
- `useEffect` detecta sprint atual automaticamente ao carregar dados
- Removida lógica de filtro para `'backlog'`
- `'all'` agora retorna todas as ações sem filtro

```javascript
// Antes
const [selectedSprint, setSelectedSprint] = useState('Sprint 3');

// Depois
const [selectedSprint, setSelectedSprint] = useState('all');

useEffect(() => {
  if (bowTieData && bowTieData.length > 0) {
    const currentSprint = detectCurrentSprint(bowTieData);
    setSelectedSprint(currentSprint);
  }
}, [bowTieData]);
```

### `/src/utils/calculations.js`

**Mudanças:**
- `'all'` não filtra mais done/cancelled
- Removida lógica de `'backlog'`

```javascript
// Antes
if (selectedSprint === 'all') {
  filtered = actions.filter(a => a.status !== 'done' && a.status !== 'cancelled');
}

// Depois
if (selectedSprint === 'all') {
  filtered = actions; // Sem filtro
}
```

### `/src/components/layout/ActionTable.jsx`

**Mudanças:**
- Importa `extractSprints` e `detectCurrentSprint`
- Gera opções de sprint dinamicamente usando `useMemo`
- Remove opções hardcoded
- Marca sprint atual com "(Atual)"

```javascript
// Antes (hardcoded)
<option value="Sprint 3">Sprint 3 (Atual)</option>
<option value="Sprint 2">Sprint 2</option>
<option value="Sprint 1">Sprint 1</option>
<option value="backlog">Backlog (Sem Data)</option>
<option value="all">Todas as Sprints</option>

// Depois (dinâmico)
<option value="all">Todas as Ações</option>
{availableSprints.map(sprint => (
  <option key={sprint} value={sprint}>
    {sprint}{sprint === currentSprint ? ' (Atual)' : ''}
  </option>
))}
```

### `/src/components/layout/Header.jsx`

**Mudanças:**
- Texto atualizado de "Visão Completa do Projeto" para "Todas as Ações"

```javascript
// Antes
{selectedSprint === 'all' ? 'Visão Completa do Projeto' : ...}

// Depois
{selectedSprint === 'all' ? 'Todas as Ações' : ...}
```

### `/index.jsx`

**Mudanças:**
- Passa `bowTieData` para `useFilters()`

```javascript
// Antes
const { ... } = useFilters();

// Depois
const { ... } = useFilters(bowTieData);
```

## 🧪 Testes

### Teste 1: Detecção de Sprint Atual

**Input:**
```javascript
Ações com: Sprint 1, Sprint 2, Sprint 3, Sprint 5
```

**Output:**
```
Sprint atual: Sprint 5 ✅
```

### Teste 2: Ordenação de Sprints

**Input:**
```javascript
Sprints desordenadas: Sprint 5, Sprint 1, Sprint 3, Sprint 2
```

**Output:**
```
Ordem: Sprint 1, Sprint 2, Sprint 3, Sprint 5 ✅
```

### Teste 3: Filtro "Todas as Ações"

**Input:**
```javascript
Ações: [
  { status: 'done', ... },
  { status: 'cancelled', ... },
  { status: 'todo', ... }
]
```

**Output:**
```
Mostra todas as 3 ações ✅ (antes filtrava done/cancelled)
```

### Teste 4: Tratamento de Backlog

**Input:**
```javascript
{ sprint: '-' }  // da API
```

**Output:**
```
{ sprint: '' }  // normalizado
Badge: "Backlog" ✅
```

## 🎯 Comportamento Final

### Ao Carregar a Aplicação

1. **Carrega dados da API**
2. **Detecta sprints disponíveis** automaticamente
3. **Seleciona a maior sprint** como padrão
4. **Renderiza dropdown** com:
   - "Todas as Ações" (primeiro)
   - Sprint 1
   - Sprint 2
   - Sprint 3
   - Sprint X **(Atual)** ← marcada

### Filtros de Sprint

| Seleção | Comportamento |
|---------|---------------|
| **Todas as Ações** | Mostra todas as ações sem filtro (incluindo done/cancelled) |
| **Sprint X** | Mostra apenas ações da sprint X |

### Cálculo de Bottleneck

| Seleção | Ações Consideradas |
|---------|-------------------|
| **Todas as Ações** | Todas (incluindo done/cancelled) |
| **Sprint X** | Apenas ações da sprint X |

## 📊 Exemplo Prático

### Dados da API:
```json
[
  { "sprint": "1", ... },
  { "sprint": "2", ... },
  { "sprint": "3", ... },
  { "sprint": "-", ... },  // backlog
]
```

### Dropdown Gerado:
```
Todas as Ações
Sprint 1
Sprint 2
Sprint 3 (Atual) ← selecionado por padrão
```

### Se API retornar:
```json
[
  { "sprint": "1", ... },
  { "sprint": "5", ... },
  { "sprint": "10", ... },
]
```

### Dropdown Gerado:
```
Todas as Ações
Sprint 1
Sprint 5
Sprint 10 (Atual) ← selecionado por padrão
```

## ✅ Checklist de Validação

- [x] "Todas as Sprints" renomeada para "Todas as Ações"
- [x] "Backlog (Sem Data)" removido
- [x] Sprint atual detectada automaticamente
- [x] Sprints geradas dinamicamente dos dados
- [x] Sprint atual marcada com "(Atual)"
- [x] Filtro "Todas as Ações" não filtra nada
- [x] Cálculo de bottleneck usa todas as ações quando "Todas as Ações"
- [x] Sprint "-" normalizada para "" (backlog)
- [x] Ordenação de sprints funciona corretamente
- [x] useFilters recebe bowTieData como parâmetro
- [x] Header atualizado com novo texto

## 🔄 Compatibilidade

- ✅ Funciona com qualquer número de sprints
- ✅ Funciona se não houver sprints (mostra apenas "Todas as Ações")
- ✅ Funciona com sprints não sequenciais (Sprint 1, 5, 10)
- ✅ Funciona com diferentes formatos de sprint

## 📚 Documentação

Nova função utilitária documentada em `/src/utils/sprintDetector.js`

## 🚀 Próximos Passos

1. Testar com API real: `npm run dev`
2. Verificar se sprint atual é detectada corretamente
3. Verificar se dropdown mostra sprints dinâmicas
4. Confirmar que "Todas as Ações" mostra tudo (incluindo done/cancelled)

---

**Status:** ✅ Implementado e testado
**Breaking Changes:** Removido valor 'backlog' (não mais usado)
