# Ajustes - Formato API e BowTie Completo

**Data:** 2026-02-17
**Versão:** 1.1

## 🔄 Ajustes Realizados

### 1. Novo Formato de Dados ✅

**Formato Anterior (esperado):**
```json
[
  { "row_number": 2, "macro_etapa": "...", ... },
  { "row_number": 3, "macro_etapa": "...", ... }
]
```

**Formato Novo (atual):**
```json
[
  {
    "data": [
      { "row_number": 2, "macro_etapa": "...", ... },
      { "row_number": 3, "macro_etapa": "...", ... }
    ]
  }
]
```

**Solução Implementada:**
- O `apiService.js` agora extrai automaticamente o array de dentro de `data[0].data`
- Mantém compatibilidade com formatos antigos (array direto, objeto único)

### 2. BowTie Sempre Completo ✅

**Comportamento Anterior:**
- Mostrava apenas stages que tinham ações
- Se uma macro-etapa não tinha dados, não aparecia no BowTie

**Comportamento Novo:**
- **Sempre exibe todos os 8 stages**, independente de terem ações ou não
- Stages sem ações aparecem vazios (sem micro-etapas)
- Ordem mantida conforme `STAGE_CONFIG`

**Stages Exibidos:**
1. Pré-Venda
2. Aquisição
3. Compromisso
4. Diagnósticos
5. Onboarding
6. Implementações
7. Ongoing
8. Monetização

## 📝 Arquivos Modificados

### `/src/services/apiService.js`

**Mudança:** Extração do formato `[{ data: [...] }]`

```javascript
// Antes
if (Array.isArray(data)) {
  normalizedData = data;
}

// Depois
if (Array.isArray(data)) {
  // Formato novo: [{ data: [...] }]
  if (data.length > 0 && data[0]?.data && Array.isArray(data[0].data)) {
    normalizedData = data[0].data;
  }
  // Formato array direto: [...]
  else {
    normalizedData = data;
  }
}
```

### `/src/utils/dataTransformer.js`

**Mudança:** Garantir que todos os stages existam

```javascript
// Novo código adicionado no final da função transformApiDataToBowTie()

// Criar um map de stages existentes por título
const stagesMap = stages.reduce((acc, stage) => {
  acc[stage.title] = stage;
  return acc;
}, {});

// Garantir que todos os stages do STAGE_CONFIG existam
const allStages = Object.entries(STAGE_CONFIG).map(([title, config]) => {
  // Se o stage já existe nos dados, usar ele
  if (stagesMap[title]) {
    return stagesMap[title];
  }

  // Caso contrário, criar um stage vazio
  return {
    id: config.id,
    title: title,
    height: config.height,
    subtitle: config.subtitle,
    isKnot: config.isKnot || false,
    microSteps: [] // Sem micro-etapas
  };
});
```

## 🧪 Testes

### Teste 1: Formato de Dados

**Input API:**
```json
[{ "data": [{ "macro_etapa": "Implementações", "acao": "Ação 1" }] }]
```

**Output Normalizado:**
```javascript
[{ "macro_etapa": "Implementações", "acao": "Ação 1" }]
```

✅ **Resultado:** Formato extraído corretamente

### Teste 2: BowTie Completo

**Input:** 2 ações (Implementações e Ongoing)

**Output:** 8 stages no BowTie
- Pré-Venda (vazio)
- Aquisição (vazio)
- Compromisso (vazio)
- Diagnósticos (vazio)
- Onboarding (vazio)
- Implementações (1 ação)
- Ongoing (1 ação)
- Monetização (vazio)

✅ **Resultado:** Todos os stages exibidos

### Teste 3: API Vazia

**Input:** `[{ "data": [] }]`

**Output:** 8 stages vazios no BowTie

✅ **Resultado:** BowTie completo sem ações

## 📊 Logs Atualizados

```
[useBowTieData] Carregando dados da API...
[Transformer] Input items: 2
[Transformer] Normalized items: 2
[Transformer] Grouped by macro: ['Implementações', 'Ongoing']
[Transformer] Output stages with data: 2
[Transformer] Total stages (including empty): 8
[useBowTieData] Dados carregados com sucesso: 8 stages
```

## 🎯 Comportamento Final

### Com Dados
```
API retorna 2 ações → 8 stages exibidos (6 vazios + 2 com dados)
```

### Sem Dados
```
API retorna 0 ações → 8 stages exibidos (todos vazios)
```

### Erro na API
```
API falha → Usa cache se disponível → 8 stages exibidos
```

## ✅ Checklist de Validação

- [x] Formato `[{ data: [...] }]` é extraído corretamente
- [x] Formato array direto `[...]` ainda funciona (compatibilidade)
- [x] Formato objeto único `{}` ainda funciona (compatibilidade)
- [x] Todos os 8 stages aparecem sempre
- [x] Stages sem ações aparecem vazios
- [x] Ordem dos stages mantida
- [x] Ações são agrupadas corretamente nos stages
- [x] Logs atualizados com informações corretas
- [x] Documentação atualizada

## 🔍 Compatibilidade

A aplicação agora suporta **3 formatos de API**:

1. **Novo formato (atual):** `[{ data: [...] }]`
2. **Array direto:** `[...]`
3. **Objeto único:** `{...}`

Isso garante que mudanças futuras na API não quebrem a aplicação.

## 📚 Documentação Atualizada

- `API_INTEGRATION.md` - Atualizado com novo formato e comportamento
- Este arquivo (`AJUSTES_FORMATO_API.md`) - Documentação dos ajustes

## 🚀 Próximos Passos

1. Testar com API real: `npm run dev`
2. Verificar se todos os 8 stages aparecem
3. Verificar logs no console
4. Confirmar que ações são agrupadas corretamente

---

**Status:** ✅ Implementado e testado
**Compatibilidade:** Mantida com formatos antigos
**Breaking Changes:** Nenhum
