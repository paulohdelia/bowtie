# Sistema de Sprints - Documentação

**Data:** 2026-02-17
**Versão:** 2.0

## 📡 Endpoints

### Ações do BowTie
```
GET https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie
```

### Sprints
```
GET https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie-sprints
```

## 🎯 Funcionamento

### 1. Busca de Sprints

A aplicação busca sprints de um endpoint separado e:
- ✅ Identifica a sprint **ativa** (status: "Ativa")
- ✅ Filtra apenas sprints que **têm ações** no BowTie
- ✅ Seleciona automaticamente a sprint ativa ao carregar

### 2. Formato dos Dados

**Endpoint de Sprints:**
```json
{
  "data": [
    {
      "row_number": 2,
      "sprint": 1,
      "inicio": "17/02/2026",
      "fim": "03/03/2026",
      "status": "Ativa"
    },
    {
      "row_number": 3,
      "sprint": 2,
      "inicio": "17/03/2026",
      "fim": "31/03/2026",
      "status": "A iniciar"
    }
  ]
}
```

**Campos:**
- `sprint` (number) - Número da sprint
- `inicio` (string) - Data de início (DD/MM/YYYY)
- `fim` (string) - Data de término (DD/MM/YYYY)
- `status` (string) - Status da sprint
  - `"Ativa"` - Sprint atual
  - `"A iniciar"` - Sprint futura
  - `"Concluída"` - Sprint passada (se houver)

### 3. Identificação da Sprint Ativa

A sprint ativa é identificada pelo campo `status`:

```javascript
sprint.status.toLowerCase().trim() === 'ativa'
```

**Regras:**
- Case-insensitive: "Ativa", "ativa", "ATIVA" funcionam
- Apenas UMA sprint deve ter status "Ativa" por vez
- Se nenhuma sprint estiver ativa, seleciona "Todas as Ações"

### 4. Filtragem de Sprints

**Lógica:**
1. Busca TODAS as sprints do endpoint
2. Busca TODAS as ações do BowTie
3. Extrai quais sprints têm ações
4. Mostra no dropdown APENAS sprints que têm ações

**Exemplo:**

**Endpoint retorna:** Sprints 1-50

**BowTie tem ações em:**
- Sprint 1: 10 ações
- Sprint 3: 5 ações
- Sprint 7: 2 ações

**Dropdown mostra:**
```
Todas as Ações
Sprint 1 (Ativa)  ← se for a ativa
Sprint 3
Sprint 7
```

**NÃO mostra:** Sprints 2, 4, 5, 6, 8-50 (sem ações)

## 🔄 Fluxo Completo

### Ao Carregar a Página

```
1. Buscar dados do BowTie
   ↓
2. Buscar sprints do endpoint
   ↓
3. Identificar sprint ativa
   ↓
4. Filtrar sprints com ações
   ↓
5. Selecionar sprint ativa automaticamente
   ↓
6. Renderizar BowTie e dropdown
```

### Seleção de Sprint

```
Usuário seleciona "Sprint 3"
   ↓
Filtrar ações da Sprint 3
   ↓
Atualizar tabela e contadores
   ↓
Recalcular bottleneck
```

## 📝 Arquivos Envolvidos

### Configuração
- `/src/config/api.js` - URLs dos endpoints

### Serviços
- `/src/services/apiService.js` - Busca ações do BowTie
- `/src/services/sprintsService.js` - Busca e processa sprints

### Hooks
- `/src/hooks/useBowTieData.js` - Gerencia dados do BowTie
- `/src/hooks/useSprintsData.js` - Gerencia dados das sprints
- `/src/hooks/useFilters.js` - Gerencia filtros (sprint, micro-etapas)

### Componentes
- `/src/components/layout/ActionTable.jsx` - Dropdown de sprints
- `/index.jsx` - Integração de todos os hooks

## 🧪 Testes

### Teste 1: Sprint Ativa

**Cenário:**
```json
{ "sprint": 1, "status": "Ativa" }
```

**Resultado Esperado:**
- ✅ Sprint 1 identificada como ativa
- ✅ Sprint 1 selecionada por padrão
- ✅ Dropdown mostra "Sprint 1 (Ativa)"

### Teste 2: Nenhuma Sprint Ativa

**Cenário:**
```json
{ "sprint": 1, "status": "A iniciar" }
{ "sprint": 2, "status": "A iniciar" }
```

**Resultado Esperado:**
- ✅ Nenhuma sprint marcada como ativa
- ✅ "Todas as Ações" selecionado por padrão

### Teste 3: Filtragem de Sprints

**Cenário:**
- Endpoint tem Sprints 1-10
- BowTie tem ações apenas em Sprint 1 e Sprint 5

**Resultado Esperado:**
- ✅ Dropdown mostra apenas Sprint 1 e Sprint 5
- ✅ Sprints 2, 3, 4, 6-10 não aparecem

### Teste 4: Mudança de Sprint

**Cenário:**
- Usuário seleciona "Sprint 3"

**Resultado Esperado:**
- ✅ Tabela mostra apenas ações da Sprint 3
- ✅ Contadores atualizados
- ✅ Bottleneck recalculado

## 🔧 Cache

**Sprints:**
- TTL: 5 minutos
- Escopo: Memória (módulo)
- Recarrega: Ao dar refresh na página

**Ações:**
- TTL: 5 minutos
- Escopo: Memória (módulo)
- Recarrega: Ao dar refresh na página

## ⚠️ Importante

1. **Sprint Ativa Única**
   - Apenas uma sprint deve ter `status: "Ativa"`
   - Se houver múltiplas, a primeira encontrada será usada

2. **Case-Insensitive**
   - "Ativa", "ativa", "ATIVA" funcionam
   - Recomendado: usar sempre "Ativa" (capitalizada)

3. **Sprints Sem Ações**
   - Não aparecem no dropdown
   - Isso evita confusão do usuário

4. **Performance**
   - Filtragem é feita no frontend
   - Para muitas sprints (>100), considerar filtrar no backend

## 📊 Estatísticas

**Capacidade:**
- Suporta até 100 sprints sem problemas
- Filtragem instantânea no cliente
- Cache reduz requisições ao servidor

**Atualização:**
- Dados recarregados a cada 5 minutos
- Ou ao fazer hard refresh (Cmd+Shift+R)

---

**Endpoint Configurado:** ✅ `/webhook/bowtie-sprints`
**Status:** Pronto para uso
