let userGoals = {}; // Simulação de banco de dados

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { phoneNumber, expenses, commissions, targetIncome } = req.body;
        userGoals[phoneNumber] = { expenses, commissions, targetIncome };
        return res.status(200).json({ message: "Metas salvas!" });
    }
    return res.status(405).json({ message: "Método não permitido" });
}
