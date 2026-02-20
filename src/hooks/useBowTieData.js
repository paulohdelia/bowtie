import { useState, useEffect } from 'react';
import { fetchBowTieData } from '../services/apiService';
import { transformApiDataToBowTie } from '../utils/dataTransformer';
import { API_CONFIG } from '../config/api';

// Cache em memória (escopo do módulo)
let cachedData = null;
let cacheTimestamp = null;

/**
 * Hook para gerenciar dados do BowTie vindos da API REST
 * @returns {{ bowTieData: Array, loading: boolean, isRefreshing: boolean, error: string|null, refetch: Function }}
 */
export const useBowTieData = () => {
  const [bowTieData, setBowTieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      // Verificar cache (ignorar se for um refresh forçado)
      const now = Date.now();
      const isForceRefresh = refreshTrigger > 0;

      if (!isForceRefresh && cachedData && cacheTimestamp && (now - cacheTimestamp < API_CONFIG.cacheTTL)) {
        console.log('[useBowTieData] Usando dados em cache');
        setBowTieData(cachedData);
        setLoading(false);
        return;
      }

      try {
        console.log('[useBowTieData] Carregando dados da API...', isForceRefresh ? '(refresh forçado)' : '');

        // Se for refresh, usar isRefreshing ao invés de loading
        // Isso evita desmontar o componente durante atualização
        if (isForceRefresh) {
          setIsRefreshing(true);
          console.log('[useBowTieData] Background refresh - UI permanece montada');
        } else {
          setLoading(true);
        }

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
        setIsRefreshing(false);
      }
    };

    loadData();
  }, [refreshTrigger]);

  // Função para forçar refresh dos dados
  const refetch = () => {
    console.log('[useBowTieData] Refresh solicitado - invalidando cache');
    setRefreshTrigger(prev => prev + 1);
  };

  return { bowTieData, loading, isRefreshing, error, refetch };
};
