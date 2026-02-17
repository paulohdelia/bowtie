# Integração do Chat n8n

Este documento descreve a implementação do assistente de chat integrado ao BowTie Ferraz Piai usando o pacote oficial `@n8n/chat`.

## Visão Geral

O sistema de chat utiliza o pacote npm `@n8n/chat` para integrar um assistente conversacional na aplicação. O chat aparece como um botão flutuante que, ao ser clicado, abre uma janela de chat.

## Instalação

O pacote já está instalado como dependência de produção:

```bash
npm install @n8n/chat
```

## Configuração

### Variável de Ambiente

Adicione a URL do webhook do n8n no arquivo `.env`:

```env
VITE_CHAT_WEBHOOK_URL=https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/a42e9131-34c7-4f44-b559-843804d0b210/chat
```

**Importante:** Nunca commite o arquivo `.env` no repositório.

## Arquitetura

### Componente Principal

**N8nChat** (`src/components/common/N8nChat.jsx`)

Componente React que inicializa o chat usando o hook `useEffect`:

```javascript
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import '../../styles/n8n-chat-custom.css';
import { createChat } from '@n8n/chat';

const N8nChat = () => {
  useEffect(() => {
    const chatInstance = createChat({
      webhookUrl: import.meta.env.VITE_CHAT_WEBHOOK_URL,
      mode: 'window',
      showWelcomeScreen: false,
      loadPreviousSession: true,
      enableStreaming: true,
      i18n: {
        en: {
          title: 'Assistente Ferraz Piai 👋',
          subtitle: 'Estou aqui para ajudar com suas dúvidas!',
          footer: '',
          getStarted: 'Nova Conversa',
          inputPlaceholder: 'Digite sua mensagem...',
        },
      },
      initialMessages: [
        'Olá! 👋',
        'Sou o assistente da Ferraz Piai. Como posso ajudar você hoje?'
      ],
    });
  }, []);

  return null; // O chat é renderizado automaticamente pelo createChat
};
```

### Opções de Configuração

O chat está configurado com as seguintes opções:

- **webhookUrl**: URL do webhook do n8n (via variável de ambiente)
- **mode**: `'window'` - Renderiza como botão flutuante + janela de chat
- **showWelcomeScreen**: `false` - Não mostra tela de boas-vindas
- **loadPreviousSession**: `true` - Carrega histórico de conversas anteriores
- **enableStreaming**: `true` - Respostas em tempo real
- **i18n**: Textos personalizados em português
- **initialMessages**: Mensagens de boas-vindas customizadas

### Customização Visual

**Arquivo de Estilos** (`src/styles/n8n-chat-custom.css`)

Customizações usando variáveis CSS do n8n:

```css
:root {
  /* Cores da marca Ferraz Piai */
  --chat--color--primary: #E30613;
  --chat--color--primary-shade-50: #C10511;
  --chat--toggle--background: #E30613;

  /* Tema escuro */
  --chat--header--background: #000000;
  --chat--body--background: #1a1a1a;
  --chat--message--bot--background: #2a2a2a;

  /* Dimensões */
  --chat--window--width: 400px;
  --chat--window--height: 600px;
}
```

## Integração no App

No arquivo `index.jsx`, o componente é importado e renderizado:

```javascript
import N8nChat from './src/components/common/N8nChat';

// ...

return (
  <div className="min-h-screen bg-black text-white">
    {/* ... outros componentes ... */}

    {/* Chat Assistente n8n */}
    <N8nChat />
  </div>
);
```

## Funcionalidades

✅ Botão flutuante no canto inferior direito
✅ Janela de chat responsiva
✅ Streaming de respostas em tempo real
✅ Histórico de conversas persistente
✅ Textos em português
✅ Design com identidade visual Ferraz Piai
✅ Tema escuro compatível com a aplicação

## Configuração do n8n

### Workflow Requirements

Para que o chat funcione corretamente, o workflow do n8n deve:

1. **Chat Trigger Node**: Usar o nó "Chat Trigger" como entrada
2. **Streaming**: Configurar os nós para suportar streaming (se habilitado)
3. **Session Memory**: Usar o nó "AI Memory" para manter contexto das conversas

### URL do Webhook

```
https://ferrazpiai-n8n-editor.uyk8ty.easypanel.host/webhook/a42e9131-34c7-4f44-b559-843804d0b210/chat
```

## Personalização Avançada

### Alterar Cores

Edite o arquivo `src/styles/n8n-chat-custom.css`:

```css
:root {
  --chat--color--primary: #SUA_COR;
  --chat--toggle--background: #SUA_COR;
}
```

### Alterar Textos

Edite o objeto `i18n` em `src/components/common/N8nChat.jsx`:

```javascript
i18n: {
  en: {
    title: 'Seu Título',
    subtitle: 'Sua Descrição',
    inputPlaceholder: 'Seu placeholder...',
  },
}
```

### Alterar Posicionamento

No CSS customizado:

```css
:root {
  --chat--window--right: 2rem;  /* Distância da direita */
  --chat--window--bottom: 2rem; /* Distância de baixo */
}
```

### Alterar Dimensões

```css
:root {
  --chat--window--width: 500px;
  --chat--window--height: 700px;
}
```

### Modo Fullscreen

Para usar o chat em tela cheia, altere o `mode` no componente:

```javascript
createChat({
  mode: 'fullscreen',
  // ... outras opções
});
```

**Importante:** Em modo fullscreen, o container deve ter largura e altura definidas.

## Variáveis CSS Disponíveis

Consulte o arquivo `docs/n8n-chat.md` para a lista completa de variáveis CSS disponíveis.

## Troubleshooting

### Chat não aparece

1. Verifique se a variável de ambiente `VITE_CHAT_WEBHOOK_URL` está definida
2. Reinicie o servidor de desenvolvimento após alterar o `.env`
3. Verifique o console do navegador para erros

### Erro 405 Not Allowed (nginx)

**Causa:** O webhook do n8n está bloqueando a requisição.

**Soluções:**

1. **Verifique a URL do webhook:**
   - ❌ Não use a URL do editor: `https://xxx-n8n-editor.xxx/webhook/...`
   - ✅ Use a URL de produção: `https://xxx-n8n.xxx/webhook/...` ou `https://n8n.dominio.com/webhook/...`

2. **Verifique se o workflow está ativo:**
   - No n8n, abra o workflow do chat
   - Verifique se o toggle "Active" está habilitado (canto superior direito)

3. **Verifique o Chat Trigger node:**
   - Abra o nó "Chat Trigger" no workflow
   - Confirme que "Public" está habilitado
   - Copie a URL correta do webhook exibida no nó

4. **Teste o webhook manualmente:**
   ```bash
   curl -X POST https://sua-url-n8n/webhook/seu-id/chat \
     -H "Content-Type: application/json" \
     -d '{"chatInput": "teste", "sessionId": "test-123"}'
   ```

5. **Verifique CORS no n8n:**
   - Se necessário, configure allowed origins no n8n
   - Em Settings → Security → CORS

### Webhook não responde

1. Confirme que o workflow n8n está ativo
2. Teste a URL do webhook diretamente no navegador
3. Verifique os logs do n8n para erros
4. Confirme que o Chat Trigger está configurado corretamente

### Estilos não aplicam

1. Certifique-se que o CSS customizado está sendo importado
2. Verifique a ordem de importação (style.css antes do custom.css)
3. Use `!important` se necessário para sobrescrever estilos padrão

### Streaming não funciona

1. Verifique se `enableStreaming: true` está configurado
2. Confirme que o workflow n8n suporta streaming
3. Certifique-se que os nós de AI estão configurados para streaming

## Performance

- **Carregamento**: O pacote @n8n/chat é leve (~100KB gzipped)
- **Inicialização**: O chat é inicializado apenas uma vez no mount
- **Persistência**: Conversas são armazenadas no localStorage
- **Cleanup**: Nenhuma limpeza especial necessária

## Próximos Passos

- [ ] Adicionar indicador visual de digitação
- [ ] Implementar notificações de novas mensagens
- [ ] Adicionar avatares customizados
- [ ] Integrar com sistema de autenticação
- [ ] Adicionar suporte para upload de arquivos
- [ ] Implementar analytics de uso do chat

## Referências

- [Documentação oficial @n8n/chat](https://www.npmjs.com/package/@n8n/chat)
- [n8n Chat Trigger Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/)
- [Arquivo de referência local](./n8n-chat.md)

## Suporte

Para questões sobre:
- **Integração do chat**: Veja este documento
- **Configuração do workflow**: Consulte a documentação do n8n
- **Customização visual**: Veja `src/styles/n8n-chat-custom.css`
