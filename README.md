# Meu App Vercel + GitHub

## Como subir para o GitHub

1. Crie um novo repositório no GitHub
2. Execute no terminal:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

## Como fazer deploy na Vercel via GitHub

1. Acesse [Vercel Dashboard](https://vercel.com/new)
2. Escolha "Import Git Repository"
3. Conecte sua conta do GitHub
4. Selecione o repositório
5. Deixe todas as configurações padrão
6. Clique em "Deploy"

Sua aplicação será automaticamente implantada e receberá uma URL pública!

**Nota:** Novos commits na branch principal irão disparar deploys automáticos.
