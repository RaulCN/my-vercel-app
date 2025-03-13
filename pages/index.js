import Head from 'next/head';

export default function Home() {
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
        <div style={styles.ctaContainer}>
          <a href="#about" style={styles.ctaButton}>
            Comece Agora
          </a>
        </div>
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
  ctaContainer: {
    marginTop: '20px',
  },
  ctaButton: {
    padding: '12px 24px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0070f3',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes slideIn': {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
};
