import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [expenses, setExpenses] = useState('');
  const [commissions, setCommissions] = useState('');
  const [targetIncome, setTargetIncome] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detailedError, setDetailedError] = useState(null);
  const [showGoalsForm, setShowGoalsForm] = useState(false);

  const validatePhoneNumber = (number) => {
    // Remove caracteres não numéricos
    const cleaned = number.replace(/\D/g, '');
    
    // Verifica se é um número brasileiro válido (com ou sem 55)
    const isValid = (cleaned.length === 11 || (cleaned.startsWith('55') && cleaned.length === 13));
    
    console.log(`Validação de número: ${number} -> ${cleaned} (válido: ${isValid})`);
    return isValid;
  };

  const validateForm = () => {
    if (!phoneNumber) {
      setMessage('Por favor, insira um número de WhatsApp.');
      return false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setMessage('Por favor, insira um número de WhatsApp válido no formato (DDD) XXXXX-XXXX');
      return false;
    }

    if (showGoalsForm) {
      if (!expenses) {
        setMessage('Por favor, informe seus gastos mensais.');
        return false;
      }
      
      if (!commissions) {
        setMessage('Por favor, informe sua porcentagem de comissões.');
        return false;
      }
      
      if (!targetIncome) {
        setMessage('Por favor, informe o rendimento desejado.');
        return false;
      }
    }

    return true;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      setMessage('Por favor, insira um número de WhatsApp.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setMessage('Por favor, insira um número de WhatsApp válido no formato (DDD) XXXXX-XXXX');
      return;
    }

    setShowGoalsForm(true);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Resetar estados de erro detalhado
    setDetailedError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('Enviando demonstração...');

    console.log(`Iniciando envio para ${phoneNumber} com metas: ${expenses}, ${commissions}, ${targetIncome}`);

    try {
      const response = await fetch('/api/send-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber, 
          expenses: parseFloat(expenses), 
          commissions: parseFloat(commissions), 
          targetIncome: parseFloat(targetIncome) 
        }),
      });

      console.log(`Resposta recebida: status ${response.status}`);
      
      // Capturar texto completo da resposta para logging
      const responseText = await response.text();
      console.log('Texto completo da resposta:', responseText);
      
      // Converter para JSON se possível
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Dados da resposta:', data);
      } catch (jsonError) {
        console.error('Erro ao parsear resposta JSON:', jsonError);
        throw new Error(`Resposta inválida do servidor: ${responseText}`);
      }

      if (response.ok) {
        setMessage('Demonstração enviada com sucesso! Verifique seu WhatsApp.');
        setPhoneNumber(''); 
        setExpenses('');
        setCommissions('');
        setTargetIncome('');
        setShowGoalsForm(false);
      } else {
        console.error('Erro retornado pelo servidor:', data);
        setMessage(`Erro: ${data.message || 'Falha no envio da demonstração'}`);
        
        // Armazenar detalhes do erro para exibição condicional
        if (data.error || data.code || data.twilioError) {
          setDetailedError({
            error: data.error,
            code: data.code,
            twilioError: data.twilioError,
            details: data.details
          });
        }
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      setMessage('Erro de conexão com o servidor. Verifique sua internet e tente novamente.');
      setDetailedError({
        error: error.message,
        type: 'connection'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>Sailor - Transforme seus Sonhos em Realidade</title>
        <meta name="description" content="Sailor é a plataforma que vai te ajudar a definir metas, gerenciar gastos e alcançar seus objetivos financeiros com um Assistente Virtual Inteligente." />
      </Head>

      <div style={styles.content}>
        <h1 style={styles.title}>Bem-vindo ao Sailor! 🌟</h1>
        <p style={styles.subtitle}>Sua plataforma para definir metas e alcançar seus sonhos.</p>
        <p style={styles.description}>
          Com o Sailor, você pode:
        </p>
        <ul style={styles.list}>
          <li>Definir metas financeiras e pessoais.</li>
          <li>Gerenciar seus gastos e comissões.</li>
          <li>Receber orientações personalizadas de um Assistente Virtual Inteligente.</li>
          <li>Acompanhar seu progresso com relatórios semanais.</li>
        </ul>

        {!showGoalsForm ? (
          <form onSubmit={handleContinue} style={styles.form}>
            <input
              type="text"
              placeholder="Insira seu número de WhatsApp com DDD"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={styles.input}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              style={isLoading ? {...styles.ctaButton, ...styles.disabledButton} : styles.ctaButton} 
              disabled={isLoading}
            >
              Continuar
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formSection}>
              <h3 style={styles.formTitle}>Defina suas Metas 🎯</h3>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Gastos Mensais (R$)</label>
                <input
                  type="number"
                  placeholder="Ex: 3000"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  style={styles.input}
                  disabled={isLoading}
                  min="0"
                  step="100"
                />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Comissões (%)</label>
                <input
                  type="number"
                  placeholder="Ex: 15"
                  value={commissions}
                  onChange={(e) => setCommissions(e.target.value)}
                  style={styles.input}
                  disabled={isLoading}
                  min="0"
                  max="100"
                  step="0.5"
                />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Rendimento Desejado (R$)</label>
                <input
                  type="number"
                  placeholder="Ex: 10000"
                  value={targetIncome}
                  onChange={(e) => setTargetIncome(e.target.value)}
                  style={styles.input}
                  disabled={isLoading}
                  min="0"
                  step="500"
                />
              </div>
            </div>
            
            <div style={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={() => setShowGoalsForm(false)}
                style={styles.backButton} 
                disabled={isLoading}
              >
                Voltar
              </button>
              <button 
                type="submit" 
                style={isLoading ? {...styles.ctaButton, ...styles.disabledButton} : styles.ctaButton} 
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Receber Demonstração'}
              </button>
            </div>
          </form>
        )}

        {message && <p style={styles.message}>{message}</p>}
        
        {/* Exibição de detalhes do erro para ajudar na depuração */}
        {detailedError && (
          <div style={styles.errorDetails}>
            <h3>Detalhes do erro (para depuração):</h3>
            <pre>{JSON.stringify(detailedError, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    backgroundImage: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#0070f3',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
  },
  list: {
    textAlign: 'left',
    fontSize: '1rem',
    color: '#444',
    marginBottom: '30px',
    paddingLeft: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  formSection: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  formTitle: {
    fontSize: '1.3rem',
    color: '#0070f3',
    marginBottom: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  label: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '5px',
    alignSelf: 'flex-start',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  ctaButton: {
    padding: '12px 24px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0070f3',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    flex: '1',
  },
  backButton: {
    padding: '12px 24px',
    fontSize: '1rem',
    color: '#333',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  disabledButton: {
    backgroundColor: '#999',
    cursor: 'not-allowed',
  },
  message: {
    fontSize: '1rem',
    color: '#333',
    marginTop: '20px',
  },
  errorDetails: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#fff8e1',
    borderRadius: '8px',
    border: '1px solid #ffe082',
    textAlign: 'left',
    overflow: 'auto',
  },
};
