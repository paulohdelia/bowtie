import { useState } from 'react';
import { User, Check } from 'lucide-react';
import { setUserName } from '../../utils/sessionStorage';

/**
 * Componente de identificação de usuário
 * Modal que captura o nome do usuário antes de permitir acesso ao chat
 *
 * @param {Object} props
 * @param {Function} props.onNameSubmit - Callback chamado quando nome é submetido
 */
const UserIdentification = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Por favor, digite seu nome');
      return;
    }

    if (trimmedName.length < 2) {
      setError('Nome muito curto (mínimo 2 caracteres)');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Nome muito longo (máximo 50 caracteres)');
      return;
    }

    // Salvar no localStorage
    setIsSubmitting(true);
    const success = setUserName(trimmedName);

    if (success) {
      console.log('[UserIdentification] Nome salvo com sucesso:', trimmedName);
      // Pequeno delay para feedback visual
      setTimeout(() => {
        onNameSubmit(trimmedName);
      }, 300);
    } else {
      setError('Erro ao salvar nome. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    // Limpar erro quando usuário digitar
    if (error) {
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-gray-800 rounded-lg shadow-2xl max-w-md w-full p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E30613]/10 border border-[#E30613]/20 mb-2">
            <User className="w-8 h-8 text-[#E30613]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Bem-vindo!</h2>
          <p className="text-gray-400 text-sm">
            Para começar, precisamos saber como te chamar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="user-name" className="block text-sm font-medium text-gray-300 mb-2">
              Seu nome
            </label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="Digite seu nome..."
              disabled={isSubmitting}
              autoFocus
              className={`
                w-full px-4 py-3 bg-gray-900 border rounded-lg
                text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                ${error
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-gray-700 focus:ring-[#E30613]/50 focus:border-[#E30613]'
                }
              `}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className={`
              w-full py-3 px-4 rounded-lg font-medium
              flex items-center justify-center gap-2
              transition-all duration-200
              ${isSubmitting || !name.trim()
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-[#E30613] text-white hover:bg-[#C00510] active:scale-[0.98] shadow-lg shadow-[#E30613]/20'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Salvando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Começar
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            Seu nome será usado para personalizar sua experiência com o assistente
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserIdentification;
