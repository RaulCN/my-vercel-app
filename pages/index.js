import Head from 'next/head';

export default function Home() {
  return (
    <div style={styles.container}>
      <Head>
        <title>App Deployado via GitHub - Sailor</title>
        <meta name="description" content="Transforme seus sonhos em realidade com o Sailor!" />
      </Head>

      <div style={styles.content}>
        <h1 style={styles.title}>App Deployado via GitHub! 🚀</h1>
        <p style={styles.subtitle}>Funcionando perfeitamente na Vercel 🌤</p>
        <p style={styles.description}>
          Este é um exemplo de como você pode personalizar sua página inicial para exibir uma mensagem amigável e informativa.
        </p>
        <div style={styles.ctaContainer}>
          <a href="#about" style={styles.ctaButton}>
            Saiba Mais
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
    padding: '20px',
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
    marginBottom: '30px',
    animation: 'fadeIn 1.2s ease-in',
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
