import { STAGE_CONFIG } from '../config/api';
import { normalizeMicroStepName } from './microStepMapping';

/**
 * Normaliza o status da ação
 * @param {string} status - Status da ação vindo da API
 * @returns {string} Status normalizado: backlog | todo | in_progress | done | cancelled
 */
const normalizeStatus = (status) => {
  if (!status) return 'backlog';

  const normalized = status.toString().toLowerCase().trim();

  const statusMap = {
    'backlog': 'backlog',
    'todo': 'todo',
    'a fazer': 'todo',
    'fazer': 'todo',
    'a iniciar': 'todo',
    'iniciar': 'todo',
    'in_progress': 'in_progress',
    'in progress': 'in_progress',
    'em progresso': 'in_progress',
    'em andamento': 'in_progress',
    'andamento': 'in_progress',
    'done': 'done',
    'feito': 'done',
    'concluído': 'done',
    'concluido': 'done',
    'cancelled': 'cancelled',
    'cancelado': 'cancelled',
    'cancelada': 'cancelled'
  };

  return statusMap[normalized] || 'backlog';
};

/**
 * Normaliza o nível de impacto
 * @param {string|number} impacto - Impacto vindo da API (número 1-10 ou texto)
 * @returns {number} Impacto normalizado: número de 1 a 10
 */
const normalizeImpact = (impacto) => {
  if (!impacto) return 1;

  // Se já é número, validar range e retornar o valor exato
  if (typeof impacto === 'number') {
    if (impacto < 1) return 1;
    if (impacto > 10) return 10;
    return impacto;
  }

  // Se é string numérica, converter e validar
  const numValue = Number(impacto);
  if (!isNaN(numValue)) {
    if (numValue < 1) return 1;
    if (numValue > 10) return 10;
    return numValue;
  }

  // Fallback para texto (compatibilidade com dados antigos)
  const normalized = impacto.toString().toLowerCase().trim();
  if (normalized.includes('alt') || normalized === 'high' || normalized === 'h') {
    return 10;
  } else if (normalized.includes('méd') || normalized.includes('med') || normalized === 'medium' || normalized === 'm') {
    return 5;
  } else {
    return 1;
  }
};

/**
 * Normaliza o nível de esforço
 * @param {string|number} esforco - Esforço vindo da API (número 1-10 ou texto)
 * @returns {number} Esforço normalizado: número de 1 a 10
 */
const normalizeEffort = (esforco) => {
  if (!esforco) return 1;

  // Se já é número, validar range e retornar o valor exato
  if (typeof esforco === 'number') {
    if (esforco < 1) return 1;
    if (esforco > 10) return 10;
    return esforco;
  }

  // Se é string numérica, converter e validar
  const numValue = Number(esforco);
  if (!isNaN(numValue)) {
    if (numValue < 1) return 1;
    if (numValue > 10) return 10;
    return numValue;
  }

  // Fallback para texto (compatibilidade com dados antigos)
  const normalized = esforco.toString().toLowerCase().trim();
  if (normalized.includes('alt') || normalized === 'high' || normalized === 'h') {
    return 10;
  } else if (normalized.includes('méd') || normalized.includes('med') || normalized === 'medium' || normalized === 'm') {
    return 5;
  } else {
    return 1;
  }
};

/**
 * Normaliza a categoria da ação
 * @param {string} categoria - Categoria vinda da API
 * @returns {string} Categoria normalizada: Pessoas | Processos | Tecnologia
 */
const normalizeCategory = (categoria) => {
  if (!categoria) return 'Processos';

  const normalized = categoria.toString().toLowerCase().trim();

  if (normalized.includes('pess') || normalized === 'people') {
    return 'Pessoas';
  } else if (normalized.includes('tec') || normalized === 'technology' || normalized === 'tech') {
    return 'Tecnologia';
  } else {
    return 'Processos';
  }
};

/**
 * Normaliza o sprint
 * @param {string|number} sprint - Sprint vindo da API
 * @returns {string} Sprint normalizado (ex: "Sprint 1") ou string vazia para backlog
 */
const normalizeSprint = (sprint) => {
  // Tratar valores vazios, null, undefined ou "-"
  if (!sprint || sprint === '-') return '';

  // Converter para string primeiro
  const normalized = sprint.toString().trim();

  // Se ficou vazio após trim
  if (normalized === '') return '';

  // Se já está no formato correto (case-insensitive)
  if (normalized.toLowerCase().startsWith('sprint ')) {
    return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
  }

  // Se é apenas um número, adicionar prefixo
  if (/^\d+$/.test(normalized)) {
    return `Sprint ${normalized}`;
  }

  return normalized;
};

/**
 * Normaliza a data para formato ISO (YYYY-MM-DD)
 * @param {string} prazo - Data vindo da API
 * @returns {string} Data no formato YYYY-MM-DD
 */
const normalizeDate = (prazo) => {
  if (!prazo || prazo.toString().trim() === '') return '';

  const normalized = prazo.toString().trim();

  // Se já está no formato ISO (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return normalized;
  }

  // Se está no formato DD/MM/YYYY
  const ddmmyyyyMatch = normalized.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (ddmmyyyyMatch) {
    const [, day, month, year] = ddmmyyyyMatch;
    return `${year}-${month}-${day}`;
  }

  // Se está no formato DD-MM-YYYY
  const ddmmyyyyDashMatch = normalized.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddmmyyyyDashMatch) {
    const [, day, month, year] = ddmmyyyyDashMatch;
    return `${year}-${month}-${day}`;
  }

  return normalized;
};

/**
 * Map old stage names to new ones for backward compatibility
 * @param {string} macroEtapa - Stage name from API
 * @returns {string} Mapped stage name
 */
const mapOldStageNames = (macroEtapa) => {
  const stageMapping = {
    'Compromisso': 'Commit',
    'Monetização': 'Expansão',
    'Diagnósticos': 'Retenção',
    'Implementações': 'Retenção',
    'Ongoing': 'Retenção'
  };

  return stageMapping[macroEtapa] || macroEtapa;
};

/**
 * Normaliza um registro da API para o formato de Action
 * @param {Object} item - Item da API
 * @returns {Object} Objeto normalizado
 */
const normalizeItem = (item) => {
  // Gerar ID único se não existir (ID pode ser string ou número)
  const id = item.id != null && item.id.toString().trim() !== ''
    ? item.id.toString()
    : `action-${item.row_number || Math.random().toString(36).substr(2, 9)}`;

  // Map old stage names to new ones
  const originalMacro = item.macro_etapa?.trim() || '';
  const mappedMacro = mapOldStageNames(originalMacro);

  return {
    id,
    macroEtapa: mappedMacro,
    microEtapa: normalizeMicroStepName(item.micro_etapa), // Normaliza para padrão
    sprint: normalizeSprint(item.sprint),
    status: normalizeStatus(item.status),
    category: normalizeCategory(item.categoria),
    fact: item.fato?.trim() || '',
    cause: item.causa?.trim() || '',
    action: item.acao?.trim() || '',
    responsible: item.responsavel?.trim() || '',
    identifiedBy: item.identificado_por?.trim() || '',
    deadline: normalizeDate(item.prazo),
    impact: normalizeImpact(item.impacto),
    effort: normalizeEffort(item.esforco),
    comments: item.comentarios?.trim() || ''
  };
};

/**
 * Parse micro_etapa to extract category for categorized stages
 * @param {string} microEtapa - Micro-etapa string from API
 * @returns {Object} Object with macro, category, and micro parts
 */
const parseMicroEtapa = (microEtapa) => {
  const parts = microEtapa.split(' | ');
  if (parts.length === 3) {
    // New format: "Macro | Category | Micro"
    return { macro: parts[0].trim(), category: parts[1].trim(), micro: parts[2].trim() };
  } else if (parts.length === 2) {
    // Old format: "Macro | Micro"
    return { macro: parts[0].trim(), category: null, micro: parts[1].trim() };
  }
  // No separator, just micro-step name
  return { macro: null, category: null, micro: microEtapa };
};

/**
 * Constrói um objeto Stage a partir de uma macro-etapa e suas micro-etapas agrupadas
 * @param {string} macroEtapa - Nome da macro-etapa
 * @param {Object} microGroups - Objeto com micro-etapas agrupadas (ações dos dados)
 * @returns {Object} Objeto Stage
 */
const buildStage = (macroEtapa, microGroups) => {
  const config = STAGE_CONFIG[macroEtapa];

  // Check if this is a categorized stage
  if (config?.isCategorized) {
    // Initialize category structure
    const categorized = {};

    Object.keys(config.categories).forEach(catName => {
      categorized[catName] = {};
      config.categories[catName].forEach(microName => {
        categorized[catName][microName] = [];
      });
    });

    // Distribute actions by category + micro-step (ONLY predefined micro-steps)
    Object.entries(microGroups).forEach(([microName, actions]) => {
      // Parse micro-step name to extract category
      const parsed = parseMicroEtapa(microName);
      const category = parsed.category || 'SABER'; // Default category if not specified
      const microNameClean = parsed.micro;

      // Only add if micro-step exists in config (ignore unmapped micro-steps)
      if (categorized[category]?.[microNameClean] !== undefined) {
        categorized[category][microNameClean].push(...actions);
      } else {
        // Micro-step not in config - IGNORE and log warning
        console.warn(`[Transformer] Micro-etapa IGNORADA (não está no STAGE_CONFIG): "${microNameClean}" em "${macroEtapa}" (categoria: ${category})`);
      }
    });

    // Build categories array
    const categories = Object.entries(categorized).map(([catName, microGroups]) => ({
      name: catName,
      microSteps: Object.entries(microGroups).map(([microName, actions]) => ({
        name: microName,
        actions: actions
      }))
    }));

    return {
      id: config.id,
      title: macroEtapa,
      height: config.height,
      isKnot: config.isKnot || false,
      isCategorized: true,
      categories: categories
    };
  } else {
    // Simple stage (existing logic preserved)
    let microSteps;

    if (config?.microSteps && Array.isArray(config.microSteps)) {
      // Usar APENAS micro-etapas pré-definidas (ignora extras da API)
      microSteps = config.microSteps.map(microName => {
        return {
          name: microName,
          actions: microGroups[microName] || [] // Usar ações dos dados ou array vazio
        };
      });

      // Log warnings for unmapped micro-steps (but don't add them)
      Object.keys(microGroups).forEach(microName => {
        if (!config.microSteps.includes(microName)) {
          console.warn(`[Transformer] Micro-etapa IGNORADA (não está no STAGE_CONFIG): "${microName}" em "${macroEtapa}"`);
        }
      });
    } else {
      // Se não há config, usar apenas dados
      microSteps = Object.entries(microGroups).map(([microName, actions]) => ({
        name: microName,
        actions: actions
      }));
    }

    return {
      id: config?.id || macroEtapa.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      title: macroEtapa,
      height: config?.height || 'h-64',
      subtitle: config?.subtitle,
      isKnot: config?.isKnot || false,
      microSteps: microSteps
    };
  }
};

/**
 * Transforma dados da API REST na estrutura hierárquica BowTie
 * @param {Array<Object>} apiData - Array de objetos da API
 * @returns {Array<Object>} Array de Stages no formato BowTie
 */
export const transformApiDataToBowTie = (apiData) => {
  if (!apiData || apiData.length === 0) {
    console.warn('[Transformer] Nenhum dado para transformar');
    return [];
  }

  console.log('[Transformer] Input items:', apiData.length);

  // Passo 1: Normalizar cada item
  const normalizedItems = apiData
    .map(normalizeItem)
    .filter(item => item.macroEtapa && item.action); // Filtrar itens válidos (precisa ter macro_etapa e acao)

  console.log('[Transformer] Normalized items:', normalizedItems.length);

  // Passo 2: Agrupar por macro_etapa
  const groupedByMacro = normalizedItems.reduce((acc, item) => {
    const macro = item.macroEtapa;
    if (!acc[macro]) {
      acc[macro] = [];
    }
    acc[macro].push(item);
    return acc;
  }, {});

  console.log('[Transformer] Grouped by macro:', Object.keys(groupedByMacro));

  // Passo 3: Para cada macro-etapa, agrupar por micro-etapa
  const stages = Object.entries(groupedByMacro).map(([macroEtapa, macroItems]) => {
    const groupedByMicro = macroItems.reduce((acc, item) => {
      const micro = item.microEtapa;
      if (!acc[micro]) {
        acc[micro] = [];
      }

      // Criar objeto Action sem macroEtapa e microEtapa
      acc[micro].push({
        id: item.id,
        status: item.status,
        fact: item.fact,
        cause: item.cause,
        action: item.action,
        responsible: item.responsible,
        identifiedBy: item.identifiedBy,
        deadline: item.deadline,
        impact: item.impact,
        effort: item.effort,
        sprint: item.sprint,
        category: item.category,
        comments: item.comments
      });

      return acc;
    }, {});

    // Passo 4: Construir Stage
    return buildStage(macroEtapa, groupedByMicro);
  });

  console.log('[Transformer] Output stages with data:', stages.length);

  // Criar um map de stages existentes por título
  const stagesMap = stages.reduce((acc, stage) => {
    acc[stage.title] = stage;
    return acc;
  }, {});

  // Garantir que todos os stages do STAGE_CONFIG existam
  const allStages = Object.entries(STAGE_CONFIG).map(([title, config]) => {
    // Se o stage já existe nos dados, usar ele
    if (stagesMap[title]) {
      return stagesMap[title];
    }

    // Caso contrário, criar um stage vazio
    if (config.isCategorized) {
      // Stage categorizada: criar estrutura de categorias
      const categories = Object.entries(config.categories).map(([catName, microNames]) => ({
        name: catName,
        microSteps: microNames.map(microName => ({
          name: microName,
          actions: []
        }))
      }));

      return {
        id: config.id,
        title: title,
        height: config.height,
        isKnot: config.isKnot || false,
        isCategorized: true,
        categories: categories
      };
    } else {
      // Stage simples: criar micro-steps
      const microSteps = config.microSteps
        ? config.microSteps.map(microName => ({
            name: microName,
            actions: []
          }))
        : [];

      return {
        id: config.id,
        title: title,
        height: config.height,
        subtitle: config.subtitle,
        isKnot: config.isKnot || false,
        microSteps: microSteps
      };
    }
  });

  console.log('[Transformer] Total stages (including empty):', allStages.length);

  return allStages;
};
