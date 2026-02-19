/**
 * Serviço para buscar informações sobre sprints
 */

import { API_CONFIG } from '../config/api';

/**
 * Faz fetch dos dados das sprints
 * @returns {Promise<Array<Object>>} Array de objetos com dados das sprints
 * @throws {Error} Se houver erro na requisição ou resposta inválida
 */
export const fetchSprintsData = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(API_CONFIG.sprintsEndpoint, {
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
        throw new Error('Endpoint de sprints não encontrado.');
      } else if (response.status >= 500) {
        throw new Error('Erro no servidor ao buscar sprints.');
      } else if (response.status === 403) {
        throw new Error('Acesso negado ao endpoint de sprints.');
      } else {
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
      }
    }

    // Parse JSON
    const data = await response.json();

    // Validar e extrair dados
    let normalizedData;

    if (data && data.data && Array.isArray(data.data)) {
      normalizedData = data.data;
    } else if (Array.isArray(data)) {
      normalizedData = data;
    } else {
      throw new Error('Formato de resposta inválido da API de sprints.');
    }

    // Se não há dados, retornar array vazio
    if (!normalizedData || normalizedData.length === 0) {
      console.warn('[SprintsService] A API retornou um array vazio');
      return [];
    }

    // Normalizar dados das sprints
    const sprints = normalizedData.map(item => ({
      number: parseInt(item.sprint),
      name: `Sprint ${item.sprint}`,
      start: item.inicio,
      end: item.fim,
      status: item.status?.trim() || '',
      isActive: item.status?.toLowerCase().trim() === 'ativa'
    }));

    return sprints;
  } catch (error) {
    // Tratar timeout
    if (error.name === 'AbortError') {
      throw new Error('Tempo limite de requisição excedido ao buscar sprints.');
    }

    // Re-throw com mensagem mais clara se for erro de rede
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Erro de conexão ao buscar sprints.');
    }

    throw error;
  }
};

/**
 * Encontra a sprint ativa
 * @param {Array<Object>} sprints - Array de sprints
 * @returns {Object|null} Sprint ativa ou null se não houver
 */
export const findActiveSprint = (sprints) => {
  return sprints.find(sprint => sprint.isActive) || null;
};

/**
 * Filtra sprints que têm ações no BowTie
 * @param {Array<Object>} sprints - Array de sprints
 * @param {Array<Object>} bowTieData - Dados do BowTie
 * @returns {Array<Object>} Sprints que têm pelo menos uma ação
 */
export const filterSprintsWithActions = (sprints, bowTieData) => {
  if (!bowTieData || bowTieData.length === 0) {
    return [];
  }

  // Extrair todos os nomes de sprint das ações
  const sprintNamesInActions = new Set();
  bowTieData.forEach(stage => {
    if (stage.isCategorized && stage.categories) {
      // Categorized stage
      stage.categories.forEach(category => {
        (category.microSteps || []).forEach(microStep => {
          (microStep.actions || []).forEach(action => {
            if (action.sprint && action.sprint !== '') {
              sprintNamesInActions.add(action.sprint);
            }
          });
        });
      });
    } else if (stage.microSteps) {
      // Simple stage
      stage.microSteps.forEach(microStep => {
        (microStep.actions || []).forEach(action => {
          if (action.sprint && action.sprint !== '') {
            sprintNamesInActions.add(action.sprint);
          }
        });
      });
    }
  });

  // Filtrar sprints que têm ações
  return sprints.filter(sprint => sprintNamesInActions.has(sprint.name));
};
