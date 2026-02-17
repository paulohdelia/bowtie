import { useState, useEffect } from 'react';
import { fetchBowTieData } from '../services/apiService';
import { transformApiDataToBowTie } from '../utils/dataTransformer';
import { API_CONFIG } from '../config/api';

// Cache em memória (escopo do módulo)
let cachedData = null;
let cacheTimestamp = null;

/**
 * Hook para gerenciar dados do BowTie vindos da API REST
 * @returns {{ bowTieData: Array, loading: boolean, error: string|null }}
 */
export const useBowTieData = () => {
  const [bowTieData, setBowTieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      // Verificar cache
      const now = Date.now();
      if (cachedData && cacheTimestamp && (now - cacheTimestamp < API_CONFIG.cacheTTL)) {
        console.log('[useBowTieData] Usando dados em cache');
        setBowTieData(cachedData);
        setLoading(false);
        return;
      }

      try {
        console.log('[useBowTieData] Carregando dados da API...');
        setLoading(true);
        setError(null);

        const apiData = await fetchBowTieData();
        const transformedData = transformApiDataToBowTie(apiData);

        // Atualizar cache
        cachedData = transformedData;
        cacheTimestamp = Date.now();

        setBowTieData(transformedData);
        console.log('[useBowTieData] Dados carregados com sucesso:', transformedData.length, 'stages');
      } catch (err) {
        console.error('[useBowTieData] Erro ao carregar dados:', err);
        setError(err.message);

        // Fallback: usar cache antigo se disponível
        if (cachedData) {
          console.warn('[useBowTieData] Usando cache antigo devido ao erro');
          setBowTieData(cachedData);
          setError(`${err.message} (usando dados em cache)`);
        } else {
          setBowTieData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { bowTieData, loading, error };
};
