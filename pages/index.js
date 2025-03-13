import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      setMessage('Por favor, insira um número de WhatsApp válido.');
      return;
    }

    setMessage('Enviando demonstração...');

    try {
      const response = await fetch('/api/send-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Demonstração enviada com sucesso! Verifique seu WhatsApp.');
      } else {
        setMessage('Erro ao enviar a demonstração. Tente novamente.');
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
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

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Insira seu número de WhatsApp"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.ctaButton}>
            Receber Demonstração
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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
    animation: 'fadeIn 1s ease-in-out',
  },
  title: {
    fontSize: '2.5rem',
    color: '#0070f3',
    marginBottom: '10px',
    animation: 'slideIn 0.8s ease-out',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
    animation: 'slideIn 1s ease-out',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
    animation: 'fadeIn 1.2s ease-in',
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
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
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
  },
  message: {
    fontSize: '1rem',
    color: '#333',
    marginTop: '20px',
  },
};
