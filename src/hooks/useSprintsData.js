import { useState, useEffect } from 'react';
import { fetchSprintsData, findActiveSprint, filterSprintsWithActions } from '../services/sprintsService';
import { API_CONFIG } from '../config/api';

// Cache em memória
let cachedSprints = null;
let cacheTimestamp = null;

/**
 * Hook para gerenciar dados das sprints
 * @param {Array} bowTieData - Dados do BowTie para filtrar sprints com ações
 * @returns {{ sprints: Array, activeSprint: Object|null, sprintsWithActions: Array, loading: boolean, error: string|null }}
 */
export const useSprintsData = (bowTieData) => {
  const [sprints, setSprints] = useState([]);
  const [activeSprint, setActiveSprint] = useState(null);
  const [sprintsWithActions, setSprintsWithActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSprints = async () => {
      // Verificar cache
      const now = Date.now();
      if (cachedSprints && cacheTimestamp && (now - cacheTimestamp < API_CONFIG.cacheTTL)) {
        console.log('[useSprintsData] Usando dados em cache');
        setSprints(cachedSprints);
        setActiveSprint(findActiveSprint(cachedSprints));

        // Filtrar sprints com ações
        if (bowTieData && bowTieData.length > 0) {
          const filtered = filterSprintsWithActions(cachedSprints, bowTieData);
          setSprintsWithActions(filtered);
        }

        setLoading(false);
        return;
      }

      try {
        console.log('[useSprintsData] Carregando sprints da API...');
        setLoading(true);
        setError(null);

        const sprintsData = await fetchSprintsData();

        // Atualizar cache
        cachedSprints = sprintsData;
        cacheTimestamp = Date.now();

        setSprints(sprintsData);

        // Encontrar sprint ativa
        const active = findActiveSprint(sprintsData);
        setActiveSprint(active);

        console.log('[useSprintsData] Sprints carregadas:', sprintsData.length);
        console.log('[useSprintsData] Sprint ativa:', active?.name || 'Nenhuma');
      } catch (err) {
        console.error('[useSprintsData] Erro ao carregar sprints:', err);
        setError(err.message);

        // Fallback: usar cache antigo se disponível
        if (cachedSprints) {
          console.warn('[useSprintsData] Usando cache antigo devido ao erro');
          setSprints(cachedSprints);
          setActiveSprint(findActiveSprint(cachedSprints));
          setError(`${err.message} (usando dados em cache)`);
        } else {
          setSprints([]);
          setActiveSprint(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadSprints();
  }, []);

  // Atualizar sprints com ações quando bowTieData mudar
  useEffect(() => {
    if (sprints.length > 0 && bowTieData && bowTieData.length > 0) {
      const filtered = filterSprintsWithActions(sprints, bowTieData);
      setSprintsWithActions(filtered);
      console.log('[useSprintsData] Sprints com ações:', filtered.length);
    }
  }, [sprints, bowTieData]);

  return { sprints, activeSprint, sprintsWithActions, loading, error };
};
