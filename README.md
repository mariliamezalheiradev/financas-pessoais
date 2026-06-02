# Finanças Pessoais

Projeto web simples para controle de finanças pessoais, feito apenas com HTML, CSS e JavaScript puro.

A aplicação não usa React, TypeScript, Node.js, Express, backend, Vite, banco de dados externo ou hospedagem no Render/Vercel. Os dados ficam salvos no próprio navegador usando LocalStorage.

## Funcionalidades

- Login de usuário local
- Cadastro de usuário local
- Dashboard financeiro
- Transações manuais de entrada e saída
- Contas a pagar
- Card de total em aberto
- Card de prioridade para contas pendentes
- Resumo com entrada, saída, saldo e total em aberto
- Alerta automático quando faltar até 2 dias para vencer uma conta
- Som de alerta quando uma conta próxima do vencimento é cadastrada
- Marcar conta como paga ou pendente
- Excluir transações
- Excluir contas
- Botão para trocar entre Português e Inglês
- Datas em formato brasileiro no idioma português
- Datas em formato inglês no idioma inglês
- Sidebar lateral esquerda
- Modo claro e modo escuro
- Layout responsivo para computador, tablet e celular

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage

## Estrutura de arquivos

```bash
financas-pessoais-html-css-js
├── index.html
├── style.css
├── script.js
└── README.md
```

## Como usar no computador

1. Baixe ou clone o projeto.
2. Abra a pasta do projeto.
3. Clique duas vezes no arquivo `index.html`.
4. O sistema já abrirá no navegador.

Não precisa instalar dependências e não precisa rodar nenhum comando no terminal.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os arquivos `index.html`, `style.css`, `script.js` e `README.md` para o repositório.
3. No GitHub, vá em `Settings`.
4. Entre em `Pages`.
5. Em `Branch`, selecione `main`.
6. Em pasta, selecione `/root`.
7. Clique em `Save`.
8. Aguarde o GitHub gerar o link do site.

## Observação sobre dados

Como o projeto usa LocalStorage, os dados ficam salvos apenas no navegador da pessoa que está usando.

Isso significa que:

- Os dados não aparecem em outro computador ou celular.
- Se limpar os dados do navegador, as informações podem ser apagadas.
- É ideal para projeto de estudo, portfólio e uso simples.

## Status

Projeto finalizado em HTML, CSS e JavaScript puro para ser publicado diretamente no GitHub Pages.
