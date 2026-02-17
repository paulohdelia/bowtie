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
      enableStreaming: false,
      i18n: {
        en: {
          title: 'Ferraz Piai Assistant',
          subtitle: 'Estou aqui para te ajudar a classificar os problemas e adicioná-los ao backlog',
          footer: '',
          getStarted: 'Nova Conversa',
          inputPlaceholder: 'Descreva o problema aqui...',
        },
      },
      initialMessages: [
        'Descreva o problema que você deseja adicionar ao backlog e vou te ajudar a classificá-lo e elaborar o plano de ação!'
      ],
    });

    // Cleanup function
    return () => {
      // O chat persiste por padrão, mas você pode adicionar limpeza se necessário
    };
  }, []);

  return null; // O chat é renderizado automaticamente pelo createChat
};

export default N8nChat;
