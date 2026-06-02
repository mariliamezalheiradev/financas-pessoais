# Finanças Pessoais

Projeto web desenvolvido para controle de finanças pessoais, com foco em organização mensal, cadastro de transações, contas a pagar, alertas de vencimento e autenticação local de usuários.

Este projeto foi criado a partir de uma necessidade real: minha mãe queria uma forma simples e organizada de controlar os gastos dela. A partir disso, desenvolvi uma aplicação para registrar entradas, saídas, contas a pagar e acompanhar melhor o resumo financeiro do mês.

## Site pronto

O projeto pode ser visualizado de duas formas:

* Baixando o código e abrindo o arquivo `index.html` diretamente no navegador.
* Acessando a versão online pelo GitHub Pages.

```text
https://seu-usuario.github.io/financas-pessoais-html-css-js/
```

## Funcionalidades

* Login de usuário local
* Cadastro de usuário local
* Dashboard financeiro mensal
* Resumo de entradas, saídas, saldo e total em aberto
* Card de total em aberto
* Card de prioridade para contas pendentes
* Cadastro manual de transações
* Cadastro de contas a pagar
* Listagem de últimas transações
* Listagem de contas cadastradas
* Marcar contas como pagas ou pendentes
* Excluir transações
* Excluir contas
* Alerta automático para contas vencendo em até 2 dias
* Aviso visual de vencimento próximo
* Som de alerta quando uma conta próxima do vencimento é cadastrada
* Botão para alternar o idioma entre português e inglês
* Datas no formato brasileiro no idioma português: dia/mês/ano
* Datas no formato inglês quando o idioma estiver em inglês
* Modo claro
* Modo escuro
* Sidebar lateral esquerda
* Layout responsivo para desktop, tablet e celular

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* LocalStorage para armazenamento dos dados no navegador

## Estrutura de arquivos

```bash
financas-pessoais-html-css-js
├── index.html
├── style.css
├── script.js
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
7. Veja o card de prioridade para acompanhar as contas pendentes.
8. Quando uma conta estiver vencendo em até 2 dias, o sistema exibirá um alerta automático.
9. Caso queira, alterne o idioma do sistema entre português e inglês.
10. Também é possível alternar entre modo claro e modo escuro.

## Como visualizar baixando o código

Não é necessário instalar dependências e não é preciso rodar comandos no terminal.

Para abrir o projeto:

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto.
3. Clique duas vezes no arquivo `index.html`.
4. O sistema será aberto diretamente no navegador.

## Observação sobre armazenamento dos dados

Este projeto utiliza LocalStorage, ou seja, os dados ficam salvos apenas no navegador da pessoa que está usando.

Isso significa que:

* Os dados não são enviados para um banco de dados externo.
* Os dados não aparecem automaticamente em outro computador ou celular.
* Se o usuário limpar os dados do navegador, as informações podem ser apagadas.
* O projeto é ideal para estudo, portfólio e uso simples.

## Observações

Este projeto foi desenvolvido com objetivo educacional e de portfólio.

A aplicação não utiliza React, TypeScript, Node.js, Express, Vite, backend, banco de dados externo, Render ou Vercel.

Todas as funcionalidades foram feitas apenas com HTML, CSS e JavaScript puro.

## Status do projeto

Projeto finalizado em HTML, CSS e JavaScript puro.

O sistema pode ser visualizado baixando o código e abrindo o arquivo `index.html`, ou acessando a versão online publicada no GitHub Pages.

Possíveis melhorias futuras:

* Filtros por período
* Gráficos financeiros
* Categorias personalizadas
* Exportação de relatório mensal
* Melhorias visuais no dashboard
* Opção de backup dos dados
