import twilio from 'twilio';

let userGoals = {}; // Simulação de banco de dados temporário

export default async function handler(req, res) {
  console.log('Requisição recebida em /api/send-demo');
  
  if (req.method !== 'POST') {
    console.log(`Método incorreto: ${req.method}`);
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    console.log('Corpo da requisição:', JSON.stringify(req.body));
    
    const { phoneNumber, expenses, commissions, targetIncome } = req.body;

    if (!phoneNumber) {
      console.log('Erro: Número de telefone não fornecido');
      return res.status(400).json({ message: 'Número de WhatsApp é obrigatório' });
    }

    // Salvar metas no banco de dados temporário
    userGoals[phoneNumber] = { expenses, commissions, targetIncome };

    // Formatação do número para o formato internacional
    let formattedNumber = phoneNumber.replace(/\D/g, '');
    if (!formattedNumber.startsWith('55') && formattedNumber.length === 11) {
      formattedNumber = `55${formattedNumber}`;
    }

    if (formattedNumber.length < 12 || formattedNumber.length > 13) {
      return res.status(400).json({ 
        message: 'Formato de número inválido. Use o formato +55DDDXXXXXXXX',
        details: `Número formatado: ${formattedNumber}`
      });
    }

    // Verificação de variáveis de ambiente
    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error('Erro de configuração da Twilio');
      return res.status(500).json({ message: 'Configuração da Twilio ausente' });
    }

    const client = twilio(accountSid, authToken);

    // Recuperar metas salvas
    const goals = userGoals[phoneNumber] || { expenses: 0, commissions: 0, targetIncome: 0 };

    // Mensagem personalizada
    const body = `🚀 Olá! Aqui está um resumo das suas metas:\n
    - Gastos Mensais: R$${goals.expenses}
    - Comissões: ${goals.commissions}%
    - Rendimento Desejado: R$${goals.targetIncome}
    \nContinue focado e boa sorte! 💪`;

    // Envio da mensagem pelo Twilio
    try {
      const message = await client.messages.create({
        body,
        from: `whatsapp:+${twilioPhoneNumber.replace(/\D/g, '')}`,
        to: `whatsapp:+${formattedNumber}`,
      });

      console.log('Mensagem enviada com sucesso:', message.sid);
      return res.status(200).json({ message: 'Mensagem enviada!', sid: message.sid });

    } catch (sendError) {
      console.error('Erro ao enviar mensagem:', sendError);
      return res.status(500).json({ message: 'Erro ao enviar mensagem', error: sendError.message });
    }

  } catch (generalError) {
    console.error('Erro geral na API:', generalError);
    return res.status(500).json({ message: 'Erro interno do servidor', error: generalError.message });
  }
}
