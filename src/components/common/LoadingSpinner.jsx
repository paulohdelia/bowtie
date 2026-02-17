import React from 'react';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#E30613] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400 text-lg">Carregando dados do BowTie...</p>
    </div>
  </div>
);

export default LoadingSpinner;
