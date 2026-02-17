import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import '../../styles/n8n-chat-custom.css';
import { createChat } from '@n8n/chat';

const N8nChat = ({ onRegistrationComplete }) => {
  const chatInstanceRef = useRef(null);
  const onRegistrationCompleteRef = useRef(onRegistrationComplete);
  const hasDetectedCompletionRef = useRef(false);

  // Atualizar a ref sempre que o callback mudar
  useEffect(() => {
    onRegistrationCompleteRef.current = onRegistrationComplete;
  }, [onRegistrationComplete]);

  useEffect(() => {
    // Prevenir re-execução se o chat já foi criado
    if (chatInstanceRef.current) {
      console.log('[N8nChat] Chat já inicializado, pulando recriação');
      return;
    }

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

    chatInstanceRef.current = chatInstance;
    console.log('[N8nChat] Chat criado e inicializado');

    // Observar mensagens do chat usando MutationObserver
    const observeMessages = () => {
      const chatContainer = document.querySelector('#n8n-chat');
      if (!chatContainer) {
        // Tentar novamente após um pequeno delay
        setTimeout(observeMessages, 500);
        return;
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            // Verificar se é uma mensagem do bot
            if (node.nodeType === 1 && node.textContent) {
              const messageText = node.textContent.trim();

              // Detectar mensagem de conclusão (apenas uma vez por sessão)
              if (messageText.includes('Registro concluído!') && !hasDetectedCompletionRef.current) {
                console.log('[N8nChat] Registro concluído detectado - disparando refresh');
                hasDetectedCompletionRef.current = true;

                if (onRegistrationCompleteRef.current) {
                  onRegistrationCompleteRef.current();
                }

                // Resetar flag após 2 segundos para permitir novos registros
                setTimeout(() => {
                  hasDetectedCompletionRef.current = false;
                  console.log('[N8nChat] Flag de detecção resetada');
                }, 2000);
              }
            }
          });
        });
      });

      // Observar mudanças no container do chat
      observer.observe(chatContainer, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      // Salvar observer para cleanup
      chatInstanceRef.current.observer = observer;
      console.log('[N8nChat] Observer configurado');
    };

    // Iniciar observação após pequeno delay
    setTimeout(observeMessages, 1000);

    // Cleanup function (só será chamado quando o componente for desmontado)
    return () => {
      console.log('[N8nChat] Limpando chat e observer');
      if (chatInstanceRef.current?.observer) {
        chatInstanceRef.current.observer.disconnect();
      }
    };
  }, []); // Array vazio - executa APENAS uma vez

  return null; // O chat é renderizado automaticamente pelo createChat
};

export default N8nChat;
