import React, { useState } from 'react';
import { Bug } from 'lucide-react';

const DebugPanel = ({ recommendedActionIds, tableData, bottleneckStageId }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 z-50"
        title="Debug Panel"
      >
        <Bug size={20} />
      </button>
    );
  }

  const backlogActions = tableData.filter(a => !a.sprint || a.sprint === '');
  const recommendedInTable = tableData.filter(a => recommendedActionIds.includes(a.id));

  return (
    <div className="fixed bottom-4 left-4 w-96 max-h-96 overflow-auto bg-black border-2 border-purple-600 rounded-lg p-4 shadow-2xl z-50 text-xs font-mono">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-purple-400 font-bold">🐛 DEBUG PANEL</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-gray-300">
        <div>
          <span className="text-yellow-400">Bottleneck Stage:</span> {bottleneckStageId || 'null'}
        </div>

        <div>
          <span className="text-yellow-400">Recommended IDs:</span> [{recommendedActionIds.length}]
          <pre className="text-[10px] bg-gray-900 p-1 mt-1 rounded overflow-x-auto">
            {JSON.stringify(recommendedActionIds, null, 2)}
          </pre>
        </div>

        <div>
          <span className="text-yellow-400">Total Table Actions:</span> {tableData.length}
        </div>

        <div>
          <span className="text-yellow-400">Backlog Actions in Table:</span> {backlogActions.length}
        </div>

        <div>
          <span className="text-yellow-400">Recommended in Table:</span> {recommendedInTable.length}
        </div>

        {backlogActions.length > 0 && (
          <div>
            <span className="text-yellow-400">Sample Backlog IDs:</span>
            <pre className="text-[10px] bg-gray-900 p-1 mt-1 rounded overflow-x-auto">
              {JSON.stringify(backlogActions.slice(0, 3).map(a => ({ id: a.id, action: a.action })), null, 2)}
            </pre>
          </div>
        )}

        {recommendedInTable.length > 0 && (
          <div>
            <span className="text-green-400">✓ Recommended Found in Table:</span>
            <pre className="text-[10px] bg-gray-900 p-1 mt-1 rounded overflow-x-auto">
              {JSON.stringify(recommendedInTable.map(a => ({ id: a.id, action: a.action })), null, 2)}
            </pre>
          </div>
        )}

        {recommendedActionIds.length > 0 && recommendedInTable.length === 0 && (
          <div className="text-red-400 font-bold">
            ⚠️ IDs não batem! Recomendados não estão na tabela.
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugPanel;
