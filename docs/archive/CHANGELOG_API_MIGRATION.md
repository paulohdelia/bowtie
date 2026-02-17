# Changelog - Migração Google Sheets → API REST

**Data:** 2026-02-17
**Mudança:** Substituição da fonte de dados de Google Sheets para API REST do n8n

## 🔄 Mudanças Realizadas

### Arquivos Removidos ❌

- `GOOGLE_SHEETS_SETUP.md` - Documentação do Google Sheets
- `google-sheets-template.csv` - Template de dados
- `.env.example` - Variáveis de ambiente
- `src/config/googleSheets.js` - Configurações do Google Sheets
- `src/services/googleSheetsService.js` - Serviço de integração com Google Sheets

### Arquivos Criados ✅

- **`src/config/api.js`** - Configurações da API REST
  - Endpoint: `https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie`
  - Cache TTL: 5 minutos
  - Timeout: 10 segundos
  - Stage Config (macro-etapas)

- **`src/services/apiService.js`** - Serviço HTTP para a API REST
  - Fetch do endpoint com timeout
  - Tratamento de erros HTTP
  - Suporte para objeto único ou array

- **`API_INTEGRATION.md`** - Documentação completa da integração
  - Formato da API
  - Normalização de dados
  - Troubleshooting

### Arquivos Modificados 🔧

- **`src/utils/dataTransformer.js`**
  - Renomeado: `transformSheetDataToBowTie()` → `transformApiDataToBowTie()`
  - Ajustado para trabalhar com objetos JSON ao invés de arrays de strings
  - Mantida toda a lógica de normalização
  - Suporte para `micro_etapa` vazia (usa "Geral" como padrão)

- **`src/hooks/useBowTieData.js`**
  - Importações atualizadas para usar `apiService` e `api.js`
  - Função `fetchGoogleSheetData()` → `fetchBowTieData()`
  - Função `transformSheetDataToBowTie()` → `transformApiDataToBowTie()`
  - Lógica de cache mantida

- **`.gitignore`**
  - Removidas linhas de `.env` (não mais necessário)

## 📊 Formato de Dados

### Antes (Google Sheets)
Array de arrays (linhas/colunas):
```javascript
[
  ["1", "Implementações", "Setup", "Sprint 1", "todo", "Processos", ...]
]
```

### Depois (API REST)
Objeto ou array de objetos:
```json
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
}
```

## 🎯 Comportamento

### O que NÃO mudou:
- ✅ Cache de 5 minutos
- ✅ Loading spinner
- ✅ Mensagens de erro com retry
- ✅ Fallback para cache antigo em caso de erro
- ✅ Normalização automática de dados
- ✅ Estrutura hierárquica BowTie (Stages > MicroSteps > Actions)
- ✅ Todos os cálculos e filtros
- ✅ Interface visual

### O que mudou:
- 🔄 Fonte de dados: Google Sheets API → API REST
- 🔄 Sem necessidade de configuração (sem `.env`)
- 🔄 Endpoint fixo no código
- 🔄 Formato de entrada: array de strings → objetos JSON

## 🚀 Como Usar

1. **Iniciar aplicação:**
   ```bash
   npm run dev
   ```

2. **A aplicação busca dados automaticamente do endpoint:**
   ```
   GET https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie
   ```

3. **Não é necessária nenhuma configuração adicional**

## 🧪 Teste

Para testar o endpoint manualmente:

```bash
curl https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie
```

Ou no DevTools Console:

```javascript
fetch('https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie')
  .then(r => r.json())
  .then(console.log)
```

## 📝 Logs Esperados

No Console do DevTools ao carregar a aplicação:

```
[useBowTieData] Carregando dados da API...
[Transformer] Input items: X
[Transformer] Normalized items: X
[Transformer] Grouped by macro: [...]
[Transformer] Output stages: X
[useBowTieData] Dados carregados com sucesso: X stages
```

## ⚙️ Configurações

Para alterar configurações da API, edite `/src/config/api.js`:

```javascript
export const API_CONFIG = {
  endpoint: 'URL_DO_ENDPOINT',
  cacheTTL: 5 * 60 * 1000, // ms
  timeout: 10000 // ms
};
```

## 🔍 Validações

A aplicação valida:

1. ✅ Resposta da API é um objeto ou array válido
2. ✅ Cada item tem `macro_etapa` e `acao` (obrigatórios)
3. ✅ Valores são normalizados (case-insensitive)
4. ✅ IDs únicos gerados automaticamente se ausentes

## 📋 Campos Obrigatórios no Endpoint

Para que uma ação apareça no BowTie, o endpoint deve retornar:

- ✅ `macro_etapa` (não vazio)
- ✅ `acao` (não vazio)

Todos os outros campos são opcionais e têm valores padrão.

## 🛡️ Tratamento de Erros

Erros tratados:
- **404** - Endpoint não encontrado
- **403** - Acesso negado
- **500+** - Erro no servidor
- **Timeout** - Requisição demorou mais de 10s
- **Network** - Problema de conexão
- **Invalid Format** - Resposta não é JSON válido

Em caso de erro, a aplicação:
1. Exibe mensagem de erro ao usuário
2. Tenta usar cache antigo se disponível
3. Oferece botão "Tentar Novamente"

## ✅ Checklist de Migração

- [x] Remover arquivos do Google Sheets
- [x] Criar serviço de API REST
- [x] Atualizar transformer para novo formato
- [x] Atualizar hook useBowTieData
- [x] Testar endpoint
- [x] Validar resposta da API
- [x] Documentar nova integração
- [x] Verificar logs
- [x] Manter cache funcional
- [x] Manter tratamento de erros

## 📚 Documentação

Consulte `API_INTEGRATION.md` para documentação completa da integração com a API.
