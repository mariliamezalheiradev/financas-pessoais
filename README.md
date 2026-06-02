# Finanças Pessoais

Projeto web desenvolvido para controle de finanças pessoais, com foco em organização mensal, cadastro de transações, contas a pagar, alertas de vencimento e autenticação local de usuários.

Este projeto foi criado a partir de uma necessidade real: minha mãe queria uma forma simples e organizada de controlar os gastos dela. A partir disso, desenvolvi uma aplicação para registrar entradas, saídas, contas a pagar e acompanhar melhor o resumo financeiro do mês.

## Site pronto

O projeto pode ser visualizado de duas formas:

* Baixando o código e abrindo o arquivo `index.html` diretamente no navegador.
* Acessando a versão online pelo GitHub Pages.

```text
https://mariliamezalheiradev.github.io/financas-pessoais/
```

## Funcionalidades

* Login de usuário local
* Cadastro de usuário local
* Dashboard financeiro mensal
* Sidebar lateral esquerda para navegação
* Páginas separadas dentro do dashboard
* Página de resumo financeiro
* Página de alertas
* Página de cadastros
* Página de transações
* Página de contas cadastradas
* Resumo de entradas, saídas, saldo atual e total em aberto
* Card de total em aberto
* Card de prioridade para contas pendentes
* Cadastro manual de transações
* Cadastro de contas a pagar
* Listagem de últimas transações
* Listagem de contas cadastradas
* Marcar contas como pagas ou pendentes
* Excluir transações
* Excluir contas
* Alerta automático para contas próximas do vencimento
* Alerta visual dentro do sistema
* Badge de notificação no menu de Alertas
* Alarme automático quando faltar 2 dias para o vencimento
* Alarme automático quando faltar 1 dia para o vencimento
* Som de alerta com duração aproximada de 3 segundos
* Botão para alternar o idioma entre português e inglês
* Datas no formato brasileiro no idioma português: dia/mês/ano
* Datas no formato inglês quando o idioma estiver em inglês
* Modo claro
* Modo escuro
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
3. Acesse o dashboard financeiro.
4. Use o menu lateral para navegar entre as páginas do sistema.
5. Cadastre suas transações de entrada ou saída.
6. Cadastre suas contas a pagar.
7. Acompanhe o resumo mensal no dashboard.
8. Consulte o total em aberto para visualizar o valor das contas ainda não pagas.
9. Veja o card de prioridade para acompanhar as contas pendentes.
10. Acesse a página de Alertas para visualizar contas próximas do vencimento.
11. Quando uma conta estiver faltando 2 dias ou 1 dia para vencer, o sistema exibirá um alerta automático e tocará um alarme.
12. Caso queira, alterne o idioma do sistema entre português e inglês.
13. Também é possível alternar entre modo claro e modo escuro.

## Sistema de alertas

O sistema possui uma área específica para alertas de vencimento.

Quando existir uma conta próxima do vencimento, o menu lateral exibirá um badge vermelho com a quantidade de alertas ativos, semelhante a uma notificação de aplicativo.

O alerta é ativado automaticamente quando uma conta estiver:

* Faltando 2 dias para vencer
* Faltando 1 dia para vencer

Além do aviso visual, o sistema também toca um alarme dentro do próprio site, sem necessidade de permissão do navegador.

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

## Possíveis melhorias futuras

* Filtros por período
* Gráficos financeiros
* Categorias personalizadas
* Exportação de relatório mensal
* Melhorias visuais no dashboard
* Opção de backup dos dados
* Integração com banco de dados
