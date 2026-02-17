# Deploy no Easypanel

## Configuração

### 1. No Easypanel

1. Crie um novo **App**
2. Escolha **Source: Git**
3. Conecte seu repositório
4. Selecione **Build Method: Dockerfile**

### 2. Variáveis de Ambiente (Build Arguments)

**⚠️ CRÍTICO**: Vite processa variáveis em **build time**! Configure como **Build Arguments** no Easypanel.

No Easypanel, vá em **Settings → Build** e adicione:

**Build Arguments** (não Environment Variables):
```
VITE_API_ENDPOINT=<sua_url_webhook_bowtie>
VITE_API_SPRINTS_ENDPOINT=<sua_url_webhook_sprints>
```

> Use os valores do seu arquivo `.env` local

**Opcionais** (com valores padrão):
```
VITE_API_CACHE_TTL=300000
VITE_API_TIMEOUT=10000
```

**Por que Build Arguments e não Environment Variables?**
- Vite embute as variáveis no código durante o build (não em runtime)
- Build Arguments são passados para `docker build --build-arg`
- Environment Variables só estão disponíveis em runtime (tarde demais para Vite)

### 3. Configuração da Porta

O Dockerfile expõe a porta **80** (nginx padrão).

**No Easypanel**:
1. Vá em **Settings → Domains** ou **Networking**
2. O Easypanel normalmente detecta a porta 80 automaticamente
3. Se precisar configurar manualmente:
   - **Container Port**: `80`
   - **Protocol**: `HTTP`
4. Configure seu domínio/subdomain para apontar para o app

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

### Erro: "Unexpected token '<', "<!doctype "... is not valid JSON"
**Causa**: As variáveis de ambiente não foram configuradas durante o build.
**Solução**:
1. Verifique se você configurou as variáveis como **Build Arguments** (não Environment Variables)
2. No Easypanel: Settings → Build → Build Arguments
3. Faça um **rebuild completo** após adicionar as variáveis
4. Verifique os logs do build para confirmar que as variáveis foram passadas

### Variáveis de ambiente não funcionam
- Lembre-se: Vite processa variáveis em **build time**
- Configure como **Build Arguments** no Easypanel
- Faça rebuild após alterar variáveis
- Se configuradas como Environment Variables, mova para Build Arguments
