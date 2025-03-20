import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Número de WhatsApp é obrigatório' });
  }

  // Formatação do número para o formato internacional
  let formattedNumber = phoneNumber.replace(/\D/g, '');
  // Adiciona o código do país (+55 para Brasil) se não existir
  if (!formattedNumber.startsWith('55') && formattedNumber.length === 11) {
    formattedNumber = `55${formattedNumber}`;
  }

  // Verificação básica de comprimento do número (Brasil: +55 + DDD + número = 13 dígitos)
  if (formattedNumber.length < 12 || formattedNumber.length > 13) {
    return res.status(400).json({ message: 'Formato de número inválido. Use o formato +55DDDXXXXXXXX' });
  }

  // Certifique-se de que as variáveis de ambiente estão definidas
  const accountSid = process.env.TWILIO_ACCOUNT_SID; 
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error('Variáveis de ambiente do Twilio não configuradas');
    return res.status(500).json({ message: 'Erro de configuração do servidor' });
  }

  try {
    const client = twilio(accountSid, authToken);
    
    const message = await client.messages.create({
      body: 'Olá! Esta é uma demonstração do Sailor. 🚀',
      from: `whatsapp:+${twilioPhoneNumber.replace(/\D/g, '')}`,
      to: `whatsapp:+${formattedNumber}`,
    });

    console.log('Mensagem enviada com sucesso:', message.sid);
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ 
      message: 'Erro ao enviar mensagem', 
      error: error.message 
    });
  }
}
