# Finanças Pessoais

Projeto web desenvolvido para controle de finanças pessoais, com foco em organização mensal, cadastro de transações, contas a pagar, alertas de vencimento e autenticação de usuários.

Este projeto foi criado a partir de uma necessidade real: minha mãe queria uma forma simples e organizada de controlar os gastos dela. A partir disso, desenvolvi uma aplicação para registrar entradas, saídas, contas a pagar e acompanhar melhor o resumo financeiro do mês.

## Site pronto

O projeto já está publicado e pode ser acessado pelo navegador:

```text
https://financas-pessoais-sable.vercel.app
```

Não é necessário instalar nada para visualizar o projeto online.

## Funcionalidades

- Login de usuário
- Cadastro de usuário
- Dashboard financeiro mensal
- Resumo de entradas, saídas, saldo e total em aberto
- Card de prioridade para contas pendentes
- Cadastro manual de transações
- Cadastro de contas a pagar
- Listagem de últimas transações
- Listagem de contas cadastradas
- Marcar contas como pagas
- Alerta automático para contas vencendo em até 2 dias
- Aviso visual de vencimento próximo
- Som de alerta quando houver conta próxima do vencimento
- Botão para alternar o idioma entre português e inglês
- Datas no formato brasileiro no idioma português: dia/mês/ano
- Datas no formato inglês quando o idioma estiver em inglês
- Modo claro em azul e branco
- Modo escuro em preto e branco
- Sidebar lateral esquerda
- Layout responsivo para desktop, tablet e celular

## Tecnologias utilizadas

### Frontend

- React
- TypeScript
- Vite
- CSS3
- LocalStorage para armazenamento do token de sessão

### Backend

- Node.js
- Express
- TypeScript
- CORS
- Banco de dados local em arquivo JSON

## Estrutura de pastas

```bash
financas-pessoais
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── styles
│   │   ├── types
│   │   ├── utils
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── package.json
└── README.md
```

## Como usar o site

Ao acessar o sistema, o usuário verá primeiro a tela de login e cadastro.

Para começar:

1. Crie uma conta informando nome, e-mail e senha.
2. Faça login com o e-mail e senha cadastrados.
3. Cadastre suas transações de entrada ou saída.
4. Cadastre suas contas a pagar.
5. Acompanhe o resumo mensal no dashboard.
6. Consulte o total em aberto para visualizar o valor das contas ainda não pagas.
7. Quando uma conta estiver vencendo em até 2 dias, o sistema exibirá um alerta automático.
8. Caso queira, alterne o idioma do sistema entre português e inglês pelo botão de idioma.

## Alerta de vencimento

O sistema verifica as contas cadastradas e identifica quando alguma delas está próxima do vencimento.

Quando faltar até 2 dias para o vencimento de uma conta, o sistema exibe um aviso visual no painel e tenta reproduzir um som de alerta.

Observação: alguns navegadores podem bloquear sons automáticos caso o usuário ainda não tenha interagido com a página. Esse bloqueio é uma regra de segurança do próprio navegador.

## Rodar localmente pelo terminal

Caso queira visualizar ou editar o projeto pelo terminal, é necessário ter o Node.js instalado na máquina.

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/financas-pessoais.git
```

Entre na pasta do projeto:

```bash
cd financas-pessoais
```

Instale as dependências:

```bash
npm install
npm run install:all
```

Rode o projeto:

```bash
npm run dev
```

O frontend será aberto em:

```bash
http://localhost:5173
```

O backend ficará rodando em:

```bash
http://localhost:3333
```

## Publicação online

O projeto foi publicado utilizando:

- Vercel para o frontend
- Render para o backend

### Configuração do frontend na Vercel

Root Directory:

```bash
frontend
```

Build Command:

```bash
npm run build
```

Output Directory:

```bash
dist
```

### Configuração do backend no Render

Root Directory:

```bash
backend
```

Build Command:

```bash
npm install && npm run build
```

Start Command:

```bash
npm start
```

## Observações

Este projeto foi desenvolvido com objetivo educacional e de portfólio.

O armazenamento atual é feito em arquivo JSON local no backend. Para uso profissional, o ideal seria substituir por um banco de dados real, como PostgreSQL, MySQL ou MongoDB.

O sistema não utiliza integrações bancárias externas. Todas as transações são cadastradas manualmente pelo usuário.

## Status do projeto

Projeto finalizado para fins de estudo e portfólio, com possibilidade de melhorias futuras, como:

- Integração com banco de dados real
- Recuperação de senha
- Filtros por período
- Gráficos financeiros
- Categorias personalizadas
- Perfil do usuário
- Exportação de relatório mensal
