# Sistema de Sessão de Usuário

## Visão Geral

Sistema de identificação e persistência de sessão de usuário usando localStorage, implementado para personalizar a experiência do chat n8n e manter histórico entre acessos.

## Funcionalidades

### 1. Identificação de Usuário

- **Modal de boas-vindas**: Aparece na primeira vez que o usuário acessa a aplicação
- **Captura de nome**: Input com validação (2-50 caracteres)
- **Persistência**: Nome armazenado em localStorage para sessões futuras
- **Design consistente**: Segue o tema dark com cor de marca #E30613

### 2. Personalização do Chat

- **Título personalizado**: Chat exibe "Olá, [Nome]!" em vez de título genérico
- **Metadata enviada ao n8n**: Todas as mensagens incluem:
  - `userName`: Nome do usuário
  - `sessionId`: ID único da sessão (UUID v4)
  - `timestamp`: Data/hora da criação da sessão

### 3. Histórico Preservado

- **loadPreviousSession**: Histórico do chat mantido entre sessões
- **Sem reload**: Sistema de refetch não causa perda de contexto
- **Chat persistente**: Janela permanece aberta após registro de problemas

## Arquitetura

### Novos Arquivos

#### `src/utils/sessionStorage.js`
Utilitário para gerenciar dados de sessão no localStorage:

```javascript
// Funções disponíveis
getUserName()           // Retorna nome ou null
setUserName(name)       // Salva nome (retorna boolean)
getSessionId()          // Retorna ou cria sessionId único
getSessionData()        // Retorna { userName, sessionId }
clearSession()          // Limpa todos os dados (para implementar "sair")
```

**LocalStorage keys:**
- `fp-user-name`: Nome do usuário
- `fp-user-session-id`: ID único da sessão (UUID v4)

#### `src/components/common/UserIdentification.jsx`
Modal de captura de nome com:
- Validação de input (2-50 caracteres)
- Estados de loading e erro
- Design responsivo e acessível
- Ícones Lucide React (User, Check)

### Arquivos Modificados

#### `src/components/common/N8nChat.jsx`
**Mudanças:**
- Nova prop: `userName` (string)
- Import de `getSessionId` do sessionStorage
- Configuração de `metadata` no createChat:
  ```javascript
  metadata: {
    userName: userName || 'Anônimo',
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
  }
  ```
- Título dinâmico: `title: userName ? 'Olá, ${userName}!' : 'Ferraz Piai Assistant'`

#### `index.jsx`
**Mudanças:**
- Import de `UserIdentification` e `getUserName`
- Novo state: `userName` (string | null)
- useEffect para carregar nome do localStorage na montagem
- Renderização condicional:
  - `UserIdentification` aparece quando `!userName`
  - `N8nChat` só renderiza quando `userName` existe

## Fluxo de Dados

### Primeiro Acesso

```
1. App carrega → userName = null
2. UserIdentification renderiza (modal overlay)
3. Usuário digita nome → click "Começar"
4. setUserName() salva no localStorage
5. Modal fecha → N8nChat renderiza
6. Chat criado com metadata personalizada
7. Backend n8n recebe dados do usuário
```

### Sessões Subsequentes

```
1. App carrega → getUserName() busca localStorage
2. Nome encontrado → setUserName() imediatamente
3. UserIdentification não renderiza
4. N8nChat renderiza com nome personalizado
5. loadPreviousSession: true restaura histórico
```

### Após Cadastro de Problema

```
1. Usuário envia problema → n8n processa
2. n8n responde "Registro concluído!"
3. MutationObserver detecta → onRegistrationComplete()
4. refetch() busca novos dados da API
5. React re-renderiza tabela (SEM reload)
6. Chat permanece aberto
7. Histórico preservado
8. Nome permanece no localStorage
```

## Integração com Backend n8n

O webhook n8n receberá os seguintes dados em todas as requisições:

```json
{
  "metadata": {
    "userName": "João Silva",
    "sessionId": "uuid-v4-xxxxx",
    "timestamp": "2025-02-20T14:30:00.000Z"
  }
}
```

### Uso no Backend

**Personalização de respostas:**
```javascript
// Acessar nome do usuário
const userName = $json.metadata.userName;

// Resposta personalizada
return {
  output: `Entendi, ${userName}! Vou classificar esse problema...`
};
```

**Tracking/Analytics:**
```javascript
// Rastrear sessão do usuário
const sessionId = $json.metadata.sessionId;
const timestamp = $json.metadata.timestamp;

// Salvar em banco de dados, analytics, etc.
```

## Validações

### Input de Nome

- **Obrigatório**: Campo não pode estar vazio
- **Mínimo**: 2 caracteres
- **Máximo**: 50 caracteres
- **Trim**: Espaços em branco removidos automaticamente
- **Feedback visual**: Erros exibidos em vermelho abaixo do input

### LocalStorage

- **Try/catch**: Todas as operações protegidas contra falhas
- **Fallback**: Se localStorage falhar, UUID temporário gerado
- **Logs**: Console.log para debug em desenvolvimento

## Testes Manuais

### Teste 1: Primeiro Acesso
1. Limpar localStorage (DevTools → Application → Clear Storage)
2. Recarregar página (F5)
3. **Esperado**: Modal de identificação aparece
4. Digitar nome e clicar "Começar"
5. **Esperado**: Modal fecha, chat abre com "Olá, [Nome]!"
6. **Verificar**: localStorage contém "fp-user-name" e "fp-user-session-id"

### Teste 2: Sessão Persistente
1. Com nome salvo, recarregar página (F5)
2. **Esperado**: Chat aparece imediatamente (sem modal)
3. **Esperado**: Título mostra "Olá, [Nome]!"
4. **Esperado**: Histórico de mensagens carregado
5. **Verificar**: Console mostra "[BowTieApp] Nome do usuário carregado"

### Teste 3: Refresh Após Cadastro
1. Enviar problema pelo chat
2. Aguardar resposta "Registro concluído!"
3. **Esperado**: Tabela atualiza com nova ação
4. **Esperado**: Chat NÃO fecha
5. **Esperado**: Histórico preservado
6. **Esperado**: Página NÃO recarrega
7. **Verificar**: Console mostra "[useBowTieData] Refresh solicitado"

### Teste 4: Metadados n8n
1. Abrir DevTools → Network
2. Enviar mensagem pelo chat
3. Inspecionar requisição POST para webhook
4. **Verificar**: Payload contém `metadata.userName` e `metadata.sessionId`

### Teste 5: Validação de Input
1. Limpar localStorage → recarregar
2. Tentar enviar nome vazio
3. **Esperado**: Erro "Por favor, digite seu nome"
4. Digitar "A" (1 caractere)
5. **Esperado**: Erro "Nome muito curto (mínimo 2 caracteres)"
6. Digitar 51 caracteres
7. **Esperado**: Erro "Nome muito longo (máximo 50 caracteres)"

## Melhorias Futuras

### Curto Prazo
- [ ] Adicionar botão "Editar Nome" no header
- [ ] Permitir limpar sessão manualmente (botão "Sair")
- [ ] Avatar/foto de perfil opcional

### Médio Prazo
- [ ] Suporte a múltiplos usuários no mesmo navegador
- [ ] Exportar histórico de conversas (JSON/PDF)
- [ ] Analytics de uso (tempo de sessão, problemas cadastrados)

### Longo Prazo
- [ ] Autenticação real com OAuth/JWT
- [ ] Sincronização entre dispositivos
- [ ] Perfil de usuário completo (email, cargo, departamento)

## Troubleshooting

### Modal não aparece
- Verificar console para erros de localStorage
- Checar se `getUserName()` está retornando null
- Limpar localStorage e tentar novamente

### Nome não persiste
- Verificar permissões de localStorage no navegador
- Checar se domínio permite third-party cookies
- Testar em modo anônimo/privado

### Metadata não chega ao n8n
- Verificar versão do @n8n/chat (deve ser >= 1.9.0)
- Inspecionar Network para ver payload
- Verificar configuração do webhook n8n

### Chat perde histórico
- Verificar se `loadPreviousSession: true` está configurado
- Checar se n8n está salvando sessionId corretamente
- Limpar cache do navegador pode ajudar

## Referências

- [Documentação @n8n/chat](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chatmessagemanager/)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [UUID v4 Specification](https://www.rfc-editor.org/rfc/rfc4122)

---

**Implementado em**: 2025-02-20
**Versão**: 1.0.0
**Autor**: Claude Code
