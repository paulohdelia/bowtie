import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ error }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
    <div className="max-w-md bg-[#111] border border-[#E30613] rounded-lg p-8 text-center">
      <div className="text-[#E30613] mb-4">
        <AlertCircle size={48} className="mx-auto" />
      </div>
      <h2 className="text-xl font-bold mb-2">Erro ao Carregar Dados</h2>
      <p className="text-gray-400 text-sm mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-[#E30613] text-white px-6 py-2 rounded font-bold uppercase hover:bg-[#C00510] transition"
      >
        Tentar Novamente
      </button>
    </div>
  </div>
);

export default ErrorMessage;
