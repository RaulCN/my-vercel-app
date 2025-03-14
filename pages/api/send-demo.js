import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;  // Auth Token
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Número do Twilio

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Número de WhatsApp é obrigatório' });
  }

  try {
    const message = await client.messages.create({
      body: 'Olá! Esta é uma demonstração do Sailor. 🚀',
      from: `whatsapp:${twilioPhoneNumber}`,
      to: `whatsapp:${phoneNumber}`,
    });

    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ message: 'Erro ao conectar com o servidor' });
  }
}
