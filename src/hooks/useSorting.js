import { useState, useMemo } from 'react';

/**
 * Hook para gerenciar ordenação de tabelas
 * @param {Array} data - Dados a serem ordenados
 * @returns {Object} - { sortedData, sortConfig, requestSort, resetSort }
 */
export const useSorting = (data) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const requestSort = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        // Third click removes sorting
        setSortConfig({ key: null, direction: null });
        return;
      }
    }

    setSortConfig({ key, direction });
  };

  const resetSort = () => {
    setSortConfig({ key: null, direction: null });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    const sortableData = [...data];

    sortableData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle special cases
      if (sortConfig.key === 'deadline') {
        // Date comparison
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        return sortConfig.direction === 'asc'
          ? dateA - dateB
          : dateB - dateA;
      }

      if (sortConfig.key === 'impact' || sortConfig.key === 'effort') {
        // Priority comparison: Alto > Médio > Baixo
        const priority = { 'Alto': 3, 'Médio': 2, 'Baixo': 1 };
        const aPriority = priority[aValue] || 0;
        const bPriority = priority[bValue] || 0;
        return sortConfig.direction === 'asc'
          ? aPriority - bPriority
          : bPriority - aPriority;
      }

      // String comparison (default)
      const aString = String(aValue || '').toLowerCase();
      const bString = String(bValue || '').toLowerCase();

      if (aString < bString) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aString > bString) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortableData;
  }, [data, sortConfig]);

  return { sortedData, sortConfig, requestSort, resetSort };
};
