# Integração API - BowTie Ferraz Piai

Este documento descreve a integração da aplicação BowTie com a API REST do n8n.

## ⚙️ Configuração

As URLs dos webhooks são configuradas via **variáveis de ambiente** para segurança.

### Setup Inicial

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Configure as variáveis no `.env`:**
   ```env
   VITE_API_ENDPOINT=https://your-n8n-server.com/webhook/bowtie
   VITE_API_SPRINTS_ENDPOINT=https://your-n8n-server.com/webhook/bowtie-sprints
   ```

3. **Reinicie o servidor de desenvolvimento** (se estiver rodando)

> **⚠️ Importante:** O arquivo `.env` está no `.gitignore` e **nunca deve ser commitado** no repositório.

## Endpoints

### Endpoint Principal (Ações)

**Variável:** `VITE_API_ENDPOINT`

**Método:** `GET`

**Autenticação:** Nenhuma (endpoint público)

### Endpoint de Sprints

**Variável:** `VITE_API_SPRINTS_ENDPOINT`

**Método:** `GET`

**Autenticação:** Nenhuma (endpoint público)

## Formato de Resposta

A API retorna um **objeto com a propriedade `data`** contendo um array de ações:

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

**Nota:** A aplicação também suporta formatos alternativos (array direto `[...]`, array com objeto `[{data: [...]}]`, objeto único) para compatibilidade.

## Campos

| Campo | Tipo | Descrição | Valores Permitidos |
|-------|------|-----------|-------------------|
| `row_number` | number | Número da linha (informativo) | Qualquer número |
| `id` | string | ID único da ação (opcional) | Se vazio, será gerado automaticamente |
| `macro_etapa` | string | Etapa principal do BowTie | Pré-Venda, Aquisição, Compromisso, Diagnósticos, Onboarding, Implementações, Ongoing, Monetização |
| `micro_etapa` | string | Sub-etapa dentro da macro | Qualquer texto. Pode vir no formato "Macro \| Micro" (será extraída automaticamente). Se vazio, usa "(micro etapa não mapeada)" |
| `sprint` | string | Sprint da ação | "Sprint 1", "Sprint 2", "-" (backlog), "" (vazio) |
| `status` | string | Status da ação | Backlog, Todo, In Progress, Done, Cancelled (case-insensitive) |
| `categoria` | string | Categoria da ação | Pessoas, Processos, Tecnologia (case-insensitive) |
| `fato` | string | Descrição do problema | Qualquer texto |
| `causa` | string | Causa raiz do problema | Qualquer texto |
| `acao` | string | Ação a ser tomada | Qualquer texto |
| `responsavel` | string | Responsável pela ação | Qualquer texto |
| `prazo` | string | Data limite | YYYY-MM-DD, DD/MM/YYYY ou vazio |
| `impacto` | string | Nível de impacto | Alto, Médio, Baixo (case-insensitive) |
| `esforco` | string | Nível de esforço | Alto, Médio, Baixo (case-insensitive) |

## Normalização de Dados

O sistema normaliza automaticamente os dados recebidos:

### Status
- `"Backlog"`, `"backlog"` → `backlog`
- `"Todo"`, `"A fazer"` → `todo`
- `"In Progress"`, `"Em andamento"` → `in_progress`
- `"Done"`, `"Feito"` → `done`
- `"Cancelled"`, `"Cancelado"` → `cancelled`

### Sprint
- `"-"` → `""` (backlog)
- `"1"` → `"Sprint 1"`
- `"Sprint 2"` → `"Sprint 2"`

### Impacto/Esforço
- `"Alto"`, `"High"`, `"H"` → `"Alto"`
- `"Médio"`, `"Medium"`, `"M"` → `"Médio"`
- `"Baixo"`, `"Low"`, `"L"` → `"Baixo"`

### Categoria
- `"Pessoas"`, `"People"` → `"Pessoas"`
- `"Processos"`, `"Process"` → `"Processos"`
- `"Tecnologia"`, `"Technology"` → `"Tecnologia"`

### Data
- `"20/12/2024"` → `"2024-12-20"`
- `"2024-12-20"` → `"2024-12-20"` (mantém)

## Arquitetura

### Fluxo de Dados

```
API Endpoint
    ↓
fetchBowTieData() [apiService.js]
    ↓
transformApiDataToBowTie() [dataTransformer.js]
    ↓
useBowTieData() [useBowTieData.js]
    ↓
BowTieApp Component [index.jsx]
```

### Arquivos

- **`/src/config/api.js`** - Configurações da API (lê variáveis de ambiente)
- **`/src/services/apiService.js`** - Serviço HTTP para fetch do endpoint
- **`/src/utils/dataTransformer.js`** - Transformação de dados planos para hierarquia BowTie
- **`/src/hooks/useBowTieData.js`** - Hook React que orquestra fetch + transform + cache

### Variáveis de Ambiente

Todas as configurações da API são controladas por variáveis de ambiente no arquivo `.env`:

```env
# Endpoints
VITE_API_ENDPOINT=https://your-server.com/webhook/bowtie
VITE_API_SPRINTS_ENDPOINT=https://your-server.com/webhook/bowtie-sprints

# Cache TTL (em milissegundos) - padrão: 300000 (5 minutos)
VITE_API_CACHE_TTL=300000

# Timeout (em milissegundos) - padrão: 10000 (10 segundos)
VITE_API_TIMEOUT=10000
```

## Cache

- **TTL:** Configurável via `VITE_API_CACHE_TTL` (padrão: 5 minutos)
- **Tipo:** Em memória (escopo do módulo)
- **Comportamento:** Ao recarregar a página, o cache é perdido e os dados são buscados novamente

## Tratamento de Erros

A aplicação trata os seguintes erros:

- **404** - Endpoint não encontrado
- **403** - Acesso negado
- **500+** - Erro no servidor
- **Timeout** - Requisição demorou mais de 10 segundos
- **Network Error** - Problema de conexão

Em caso de erro, se houver dados em cache, eles serão exibidos com uma mensagem de aviso.

## Performance

- **Timeout:** 10 segundos
- **Cache:** Evita requisições desnecessárias
- **Transformação:** ~50-100ms para 100 ações
- **Loading:** Spinner exibido durante carregamento inicial

## Desenvolvimento

Para testar o endpoint manualmente:

```bash
curl ${VITE_API_ENDPOINT}
```

Ou no DevTools Console:

```javascript
fetch('${VITE_API_ENDPOINT}')
  .then(r => r.json())
  .then(console.log)
```

## Estrutura de Saída (BowTie)

Os dados da API são transformados na seguinte estrutura hierárquica:

```javascript
[
  {
    id: 'implementacoes',
    title: 'Implementações',
    height: 'h-64',
    subtitle: undefined,
    isKnot: false,
    microSteps: [
      {
        name: 'Geral',
        actions: [
          {
            id: 'action-2',
            status: 'backlog',
            fact: 'Fato 1',
            cause: 'Causa 1',
            action: 'Ação 1',
            responsible: 'Paulo',
            deadline: '',
            impact: 'Alto',
            effort: 'Alto',
            sprint: '',
            category: 'Processos'
          }
        ]
      }
    ]
  }
]
```

## Validações

A aplicação valida:

1. ✅ Resposta da API é extraída corretamente (suporta `{ data: [...] }`, `[{ data: [...] }]`, array direto `[...]` ou objeto único)
2. ✅ Cada item tem `macro_etapa` e `acao` (campos obrigatórios para aparecer no BowTie)
3. ✅ Valores de status, impacto, esforço, categoria são normalizados
4. ✅ IDs únicos são gerados se não fornecidos
5. ✅ Todos os 8 stages do BowTie são sempre exibidos, mesmo sem ações

## Campos Opcionais

Se os seguintes campos estiverem vazios, o sistema aplica valores padrão:

- `id` → Gerado automaticamente (`action-{row_number}` ou random)
- `micro_etapa` → `"(micro etapa não mapeada)"`
- `sprint` → `""` (backlog)
- `prazo` → `""`
- `responsavel` → `""`
- `fato` → `""`
- `causa` → `""`

## BowTie Completo

O BowTie **sempre exibe todos os 8 stages**, mesmo que não tenham ações:

1. Pré-Venda
2. Aquisição
3. Compromisso
4. Diagnósticos
5. Onboarding
6. Implementações
7. Ongoing
8. Monetização

Stages sem ações aparecem vazios (sem micro-etapas).

## Logs

No Console do DevTools, você verá:

```
[useBowTieData] Carregando dados da API...
[Transformer] Input items: 16
[Transformer] Normalized items: 16
[Transformer] Grouped by macro: ['Implementações', 'Pré-Venda', ...]
[Transformer] Output stages: 8
[useBowTieData] Dados carregados com sucesso: 8 stages
```

## Troubleshooting

### Dados não aparecem
1. Abra o DevTools Console (F12)
2. Verifique se há erros de requisição
3. Teste o endpoint manualmente: `curl ${VITE_API_ENDPOINT}`
4. Verifique se o endpoint está retornando um array JSON válido

### Erro de CORS
- O endpoint deve ter headers CORS configurados
- `Access-Control-Allow-Origin: *` (ou o domínio específico)

### Timeout
- Verifique a conectividade com o servidor
- O timeout padrão é 10 segundos (configurável em `/src/config/api.js`)

### Dados desatualizados
- Aguarde 5 minutos ou recarregue a página (F5) para forçar nova requisição
