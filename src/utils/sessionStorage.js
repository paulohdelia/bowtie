/**
 * Utilitário para gerenciar dados de sessão do usuário no localStorage
 *
 * Armazena:
 * - fp-user-name: Nome do usuário
 * - fp-user-session-id: ID único da sessão (UUID v4)
 */

const STORAGE_KEYS = {
  USER_NAME: 'fp-user-name',
  SESSION_ID: 'fp-user-session-id',
};

/**
 * Gera um UUID v4 simples
 * @returns {string} UUID v4
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Retorna o nome do usuário salvo no localStorage
 * @returns {string|null} Nome do usuário ou null se não existir
 */
export function getUserName() {
  try {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME);
  } catch (error) {
    console.error('[SessionStorage] Erro ao ler nome do usuário:', error);
    return null;
  }
}

/**
 * Salva o nome do usuário no localStorage
 * @param {string} name - Nome do usuário
 * @returns {boolean} true se salvo com sucesso
 */
export function setUserName(name) {
  try {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      console.warn('[SessionStorage] Nome inválido fornecido');
      return false;
    }

    localStorage.setItem(STORAGE_KEYS.USER_NAME, name.trim());
    console.log('[SessionStorage] Nome do usuário salvo:', name.trim());
    return true;
  } catch (error) {
    console.error('[SessionStorage] Erro ao salvar nome do usuário:', error);
    return false;
  }
}

/**
 * Retorna ou cria um ID único de sessão
 * @returns {string} ID da sessão (UUID v4)
 */
export function getSessionId() {
  try {
    let sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);

    if (!sessionId) {
      sessionId = generateUUID();
      localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
      console.log('[SessionStorage] Novo session ID criado:', sessionId);
    }

    return sessionId;
  } catch (error) {
    console.error('[SessionStorage] Erro ao obter session ID:', error);
    // Retornar UUID temporário se houver erro
    return generateUUID();
  }
}

/**
 * Limpa todos os dados da sessão
 * (útil para implementar funcionalidade de "sair" no futuro)
 */
export function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
    console.log('[SessionStorage] Sessão limpa');
    return true;
  } catch (error) {
    console.error('[SessionStorage] Erro ao limpar sessão:', error);
    return false;
  }
}

/**
 * Retorna todos os dados da sessão
 * @returns {Object} Objeto com userName e sessionId
 */
export function getSessionData() {
  return {
    userName: getUserName(),
    sessionId: getSessionId(),
  };
}
