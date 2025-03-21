import twilio from 'twilio';

export default async function handler(req, res) {
  console.log('Requisição recebida em /api/send-demo');
  
  if (req.method !== 'POST') {
    console.log(`Método incorreto: ${req.method}`);
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Log do corpo da requisição para verificar se os dados estão chegando corretamente
    console.log('Corpo da requisição:', JSON.stringify(req.body));
    
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      console.log('Erro: Número de telefone não fornecido');
      return res.status(400).json({ message: 'Número de WhatsApp é obrigatório' });
    }

    // Formatação do número para o formato internacional
    let formattedNumber = phoneNumber.replace(/\D/g, '');
    console.log(`Número original: ${phoneNumber}, Número formatado inicial: ${formattedNumber}`);
    
    // Adiciona o código do país (+55 para Brasil) se não existir
    if (!formattedNumber.startsWith('55') && formattedNumber.length === 11) {
      formattedNumber = `55${formattedNumber}`;
      console.log(`Código do país adicionado: ${formattedNumber}`);
    }

    // Verificação detalhada do formato do número
    console.log(`Comprimento final do número: ${formattedNumber.length}`);
    if (formattedNumber.length < 12 || formattedNumber.length > 13) {
      console.log(`Erro de validação: Número com comprimento inválido (${formattedNumber.length})`);
      return res.status(400).json({ 
        message: 'Formato de número inválido. Use o formato +55DDDXXXXXXXX',
        details: `Comprimento detectado: ${formattedNumber.length}, número formatado: ${formattedNumber}`
      });
    }

    // Verificação de variáveis de ambiente
    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    console.log(`Configuração Twilio - SID configurado: ${!!accountSid}, Token configurado: ${!!authToken}, Número Twilio configurado: ${!!twilioPhoneNumber}`);
    
    // Verificação mais detalhada das variáveis de ambiente
    if (!accountSid) {
      console.error('TWILIO_ACCOUNT_SID não configurado');
      return res.status(500).json({ message: 'Erro de configuração: TWILIO_ACCOUNT_SID ausente' });
    }
    
    if (!authToken) {
      console.error('TWILIO_AUTH_TOKEN não configurado');
      return res.status(500).json({ message: 'Erro de configuração: TWILIO_AUTH_TOKEN ausente' });
    }
    
    if (!twilioPhoneNumber) {
      console.error('TWILIO_PHONE_NUMBER não configurado');
      return res.status(500).json({ message: 'Erro de configuração: TWILIO_PHONE_NUMBER ausente' });
    }

    // Formatação do número do Twilio
    const formattedTwilioNumber = twilioPhoneNumber.replace(/\D/g, '');
    console.log(`Número Twilio formatado: ${formattedTwilioNumber}`);

    // Criar cliente Twilio com captura de erros
    let client;
    try {
      client = twilio(accountSid, authToken);
      console.log('Cliente Twilio criado com sucesso');
    } catch (twilioInitError) {
      console.error('Erro ao inicializar cliente Twilio:', twilioInitError);
      return res.status(500).json({ 
        message: 'Erro ao inicializar cliente Twilio', 
        error: twilioInitError.message,
        stack: twilioInitError.stack
      });
    }
    
    // Montagem dos parâmetros da mensagem
    const from = `whatsapp:+${formattedTwilioNumber}`;
    const to = `whatsapp:+${formattedNumber}`;
    const body = 'Olá! Esta é uma demonstração do Sailor. 🚀';
    
    console.log(`Enviando mensagem de ${from} para ${to}`);
    console.log(`Corpo da mensagem: ${body}`);

    // Enviar mensagem com captura detalhada de erros
    try {
      const message = await client.messages.create({
        body,
        from,
        to,
      });

      console.log('Mensagem enviada com sucesso:', message.sid);
      return res.status(200).json({ 
        message: 'Mensagem enviada com sucesso!',
        sid: message.sid
      });
    } catch (sendError) {
      console.error('Erro ao enviar mensagem através do Twilio:');
      console.error(`Código: ${sendError.code}`);
      console.error(`Status: ${sendError.status}`);
      console.error(`Mensagem: ${sendError.message}`);
      console.error(`Mais detalhes:`, sendError);
      
      // Verificação de erros comuns do Twilio
      if (sendError.code === 21211) {
        return res.status(400).json({
          message: 'Número de telefone inválido ou mal formatado',
          twilioError: sendError.message,
          code: sendError.code
        });
      } else if (sendError.code === 21608) {
        return res.status(400).json({
          message: 'O número de telefone não está habilitado para WhatsApp no sandbox da Twilio',
          twilioError: sendError.message,
          code: sendError.code
        });
      } else if (sendError.code === 20003) {
        return res.status(403).json({
          message: 'Credenciais inválidas da Twilio (verifique Account SID e Auth Token)',
          code: sendError.code
        });
      }
      
      return res.status(500).json({ 
        message: 'Erro ao enviar mensagem', 
        error: sendError.message,
        code: sendError.code || 'desconhecido',
        status: sendError.status || 'desconhecido'
      });
    }
  } catch (generalError) {
    // Captura qualquer outro erro não previsto
    console.error('Erro geral na API:', generalError);
    return res.status(500).json({ 
      message: 'Erro interno do servidor', 
      error: generalError.message,
      stack: generalError.stack
    });
  }
}
