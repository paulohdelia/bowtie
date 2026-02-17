# Deploy no Easypanel

## Configuração

### 1. No Easypanel

1. Crie um novo **App**
2. Escolha **Source: Git**
3. Conecte seu repositório
4. Selecione **Build Method: Dockerfile**

### 2. Variáveis de Ambiente

Configure as seguintes variáveis no Easypanel:

```
VITE_API_ENDPOINT=https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie
VITE_API_SPRINTS_ENDPOINT=https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/bowtie-sprints
```

**⚠️ IMPORTANTE**: Como o Vite processa variáveis de ambiente em **build time**, você precisa configurar as variáveis no Easypanel **antes** de fazer o build.

### 3. Configuração da Porta

- O container expõe a porta **80**
- Configure o Easypanel para mapear a porta 80

### 4. Deploy

Faça o commit dos arquivos e push para o repositório. O Easypanel vai:

1. ✅ Instalar dependências
2. ✅ Fazer build do projeto com as variáveis de ambiente
3. ✅ Criar imagem Docker otimizada (multi-stage)
4. ✅ Servir com nginx (MIME types corretos + SPA routing)

## Arquitetura

```
┌─────────────────┐
│   Build Stage   │  Node 20 Alpine
│  (npm ci/build) │  → Compila o React/Vite
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Production Stage│  Nginx Alpine
│  (nginx serve)  │  → Serve arquivos estáticos
└─────────────────┘
```

**Benefícios**:
- 🚀 Imagem final pequena (~25MB vs ~180MB com Node)
- ⚡ Nginx otimizado para servir estáticos
- 🔧 MIME types corretos (resolve o erro JavaScript module)
- 🔄 SPA routing (try_files fallback)
- 📦 Cache headers configurados

## Troubleshooting

### Tela branca após deploy
- Verifique se as variáveis de ambiente estão configuradas no Easypanel
- Verifique os logs do container: `docker logs <container_id>`
- Acesse `/health` para verificar se o nginx está rodando

### Erro de MIME type
- Isso não deve mais acontecer com o nginx.conf configurado
- Se persistir, verifique se o nginx.conf foi copiado corretamente

### Variáveis de ambiente não funcionam
- Lembre-se: Vite processa variáveis em **build time**
- Faça rebuild após alterar variáveis no Easypanel
