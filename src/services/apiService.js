/**
 * Serviço para integração com API REST
 * Busca dados do endpoint do BowTie
 */

import { API_CONFIG } from '../config/api';

/**
 * Faz fetch dos dados da API
 * @returns {Promise<Array<Object>>} Array de objetos com os dados das ações
 * @throws {Error} Se houver erro na requisição ou resposta inválida
 */
export const fetchBowTieData = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(API_CONFIG.endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Verificar status HTTP
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Endpoint não encontrado. Verifique a URL da API.');
      } else if (response.status >= 500) {
        throw new Error('Erro no servidor. Tente novamente mais tarde.');
      } else if (response.status === 403) {
        throw new Error('Acesso negado ao endpoint.');
      } else {
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
      }
    }

    // Parse JSON
    const data = await response.json();

    // Validar e extrair dados
    let normalizedData;

    if (Array.isArray(data)) {
      // Formato novo: [{ data: [...] }]
      if (data.length > 0 && data[0]?.data && Array.isArray(data[0].data)) {
        normalizedData = data[0].data;
      }
      // Formato array direto: [...]
      else {
        normalizedData = data;
      }
    } else if (typeof data === 'object' && data !== null) {
      // Formato objeto: { data: [...] }
      if (data.data && Array.isArray(data.data)) {
        normalizedData = data.data;
      }
      // Objeto único
      else {
        normalizedData = [data];
      }
    } else {
      throw new Error('Formato de resposta inválido da API. Esperado um array ou objeto.');
    }

    // Se não há dados, retornar array vazio (isso é OK, o transformer criará stages vazios)
    if (!normalizedData || normalizedData.length === 0) {
      console.warn('A API retornou um array vazio');
      return [];
    }

    return normalizedData;
  } catch (error) {
    // Tratar timeout
    if (error.name === 'AbortError') {
      throw new Error('Tempo limite de requisição excedido. Tente novamente.');
    }

    // Re-throw com mensagem mais clara se for erro de rede
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Erro de conexão. Verifique sua internet.');
    }

    throw error;
  }
};
