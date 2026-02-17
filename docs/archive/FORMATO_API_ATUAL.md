# Formato API Atual

**Data:** 2026-02-17
**Versão:** 1.3

## 📥 Formato Esperado

A API retorna um **objeto direto** com a propriedade `data`:

```json
{
  "data": [
    {
      "row_number": 2,
      "id": "",
      "macro_etapa": "Implementações",
      "micro_etapa": "",
      "sprint": "-",
      "status": "Backlog",
      "categoria": "Processos",
      "fato": "Fato 1",
      "causa": "Causa 1",
      "acao": "Ação 1",
      "responsavel": "Paulo",
      "prazo": "",
      "impacto": "Alto",
      "esforco": "Alto"
    },
    {
      "row_number": 3,
      "id": "",
      "macro_etapa": "Ongoing",
      "micro_etapa": "",
      "sprint": 1,
      "status": "A fazer",
      "categoria": "Tecnologia",
      "fato": "Fato 2",
      "causa": "Causa 2",
      "acao": "Ação 2",
      "responsavel": "Gouveia",
      "prazo": "",
      "impacto": "Baixo",
      "esforco": "Alto"
    }
  ]
}
```

## ✅ Status

O código **já está preparado** para esse formato! Nenhuma mudança necessária.

## 🔄 Compatibilidade

A aplicação suporta **4 formatos diferentes**:

### 1. Objeto com data (ATUAL)
```json
{ "data": [...] }
```
✅ **Suportado** (linhas 56-60 do apiService.js)

### 2. Array com objeto data
```json
[{ "data": [...] }]
```
✅ **Suportado** (linhas 48-51 do apiService.js)

### 3. Array direto
```json
[...]
```
✅ **Suportado** (linhas 53-54 do apiService.js)

### 4. Objeto único
```json
{ "row_number": 2, ... }
```
✅ **Suportado** (linhas 62-63 do apiService.js)

## 🧪 Teste Realizado

```bash
✅ Formato extraído corretamente!
Tipo da resposta: object
Tem propriedade data? true
Número de items: 2
Item 1: Implementações - Ação 1
Item 2: Ongoing - Ação 2
Sprint item 1: - (esperado: "-")
Sprint item 2: 1 (esperado: 1)
```

## 📝 Lógica de Extração

```javascript
// src/services/apiService.js (linhas 47-67)

if (Array.isArray(data)) {
  // Formato: [{ data: [...] }]
  if (data.length > 0 && data[0]?.data && Array.isArray(data[0].data)) {
    normalizedData = data[0].data;
  }
  // Formato: [...]
  else {
    normalizedData = data;
  }
} else if (typeof data === 'object' && data !== null) {
  // Formato: { data: [...] } ✅ ATUAL
  if (data.data && Array.isArray(data.data)) {
    normalizedData = data.data;
  }
  // Formato: { ... }
  else {
    normalizedData = [data];
  }
}
```

## 🎯 Observações Importantes

### Sprint como Número
```json
{ "sprint": 1 }
```
- Será normalizado para `"Sprint 1"`
- Tipo number ou string funcionam

### Sprint como "-"
```json
{ "sprint": "-" }
```
- Será normalizado para `""` (string vazia)
- Tratado como backlog

### Sprint vazia
```json
{ "sprint": "" }
```
- Mantida como `""` (string vazia)
- Tratado como backlog

## ✅ Nenhuma Ação Necessária

O formato atual **já está funcionando** corretamente. A aplicação extrairá o array de dentro de `data` automaticamente.

## 📚 Documentação Atualizada

- `API_INTEGRATION.md` - Atualizado com formato atual

---

**Status:** ✅ Funcionando
**Mudanças Necessárias:** Nenhuma
