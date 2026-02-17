# 🚀 Guia de Instalação - BowTie Ferraz Piai

## ⚡ Instalação Rápida (4 passos)

```bash
# 1️⃣ Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com as URLs corretas dos webhooks

# 2️⃣ Instalar dependências
npm install

# 3️⃣ Iniciar servidor de desenvolvimento
npm run dev

# 4️⃣ Abrir no navegador
# Abrirá automaticamente em http://localhost:3000
```

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- ✅ **Node.js** 16 ou superior → [Download](https://nodejs.org/)
- ✅ **npm** (vem com Node.js) ou **yarn**

Verificar versões instaladas:
```bash
node --version   # Deve ser >= 16.x
npm --version    # Qualquer versão recente
```

---

## 🛠️ Instalação Detalhada

### Passo 1: Clone o Repositório (se necessário)
```bash
cd /caminho/do/projeto/bowtie-ferraz-piai
```

### Passo 2: Configurar Variáveis de Ambiente
```bash
# Copiar o arquivo de exemplo
cp .env.example .env
```

**⚠️ Importante:** Configure as URLs dos webhooks no arquivo `.env`:
```env
VITE_API_ENDPOINT=https://your-n8n-server.com/webhook/bowtie
VITE_API_SPRINTS_ENDPOINT=https://your-n8n-server.com/webhook/bowtie-sprints
```

> O arquivo `.env` contém informações sensíveis e **não será commitado** no git (está no `.gitignore`).

### Passo 3: Instalar Dependências
```bash
npm install
```

**O que será instalado:**
- React 18.3
- Vite 5.4 (build tool)
- Tailwind CSS 3.4
- Lucide React (ícones)
- ESLint (linter)

**Tempo estimado:** ~1-2 minutos

### Passo 4: Iniciar Desenvolvimento
```bash
npm run dev
```

**Você verá:**
```
  VITE v5.4.11  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Passo 5: Abrir no Navegador
A aplicação abrirá automaticamente em **http://localhost:3000**

Se não abrir, acesse manualmente: `http://localhost:3000`

---

## ✅ Verificar se Funcionou

Você deve ver:
- ✅ Header "Ferraz Piai - BowTie"
- ✅ Funil com 8 etapas (Pré-Venda até Monetização)
- ✅ Tabela de ações na parte inferior
- ✅ Filtro de sprints no canto superior direito

---

## 🔧 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run preview` | Visualiza build de produção |
| `npm run lint` | Verifica erros de código |

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 is already in use"
```bash
# Opção 1: Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Opção 2: Usar outra porta
npm run dev -- --port 3001
```

### Erro: "EACCES: permission denied"
```bash
# Não use sudo! Corrija permissões:
sudo chown -R $(whoami) ~/.npm
npm install
```

### Tailwind CSS não está funcionando
```bash
# Verificar se o arquivo existe
ls index.css

# Deve conter:
# @tailwind base;
# @tailwind components;
# @tailwind utilities;
```

---

## 🔥 Hot Module Replacement (HMR)

Vite possui HMR automático! Qualquer mudança no código será refletida instantaneamente no navegador sem refresh completo.

**Teste:**
1. Abra `src/components/layout/Header.jsx`
2. Mude o texto do título
3. Salve o arquivo
4. Veja a mudança instantânea no navegador

---

## 📦 Build para Produção

```bash
# Criar build otimizado
npm run build

# Build será criado em ./dist/

# Testar build localmente
npm run preview
```

---

## 🎯 Próximo Passo

Depois de rodar a aplicação com sucesso:
1. ✅ Leia o **README.md** para entender as funcionalidades
2. ✅ Consulte **ARCHITECTURE.md** para entender a estrutura
3. ✅ Veja **QUICK_START.md** para aprender a adicionar features

---

## 💡 Dica Pro

Adicione ao `.bashrc` ou `.zshrc`:
```bash
alias bt-dev="cd ~/path/to/bowtie-ferraz-piai && npm run dev"
```

Depois é só rodar `bt-dev` de qualquer lugar!

---

**Problemas?** Consulte a documentação completa em **dev-docs.md** ou **CLAUDE.md**
