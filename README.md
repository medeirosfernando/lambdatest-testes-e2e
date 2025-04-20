![cypress](https://www.cypress.io/_astro/cypress-logo.D87396b0.svg)

# Testes E2E com Cypress

## Projeto desenvolvido para estudo pessoal

- [Site](https://ecommerce-playground.lambdatest.io/index.php?route=common/home) 

## Tecnologias

Este projeto utiliza as seguintes tecnologias:

- [Cypress 14.3.0](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)
- [NodeJs 22.14.0](https://nodejs.org/en/)
- [NPM 8.3.0](https://docs.npmjs.com/cli/v7/commands/npm-install)

## Dependências

Instale as dependências:

- [FakerJs](https://fakerjs.dev/) 

## Desafio
```sh
- Elaborar cenários de testes em programação necessária para automatização dos testes.

- Criar um projeto de automação.
```

## Passos para configuração do projeto

> Dentro de uma pasta, abrir o terminal (prompt) e realizar os seguintes comandos:
> 
> Inicialização do projeto: npm init --yes
> 
> Instalação da última versão do Cypress: npm install -D cypress
> 
> Executar o comando para criação da estrutura padrão do Cypress via terminal na pasta raiz: npx cypress open
> 
> Apagar a pasta examples dentro do diretório e2e

## Execução dos testes

| Passos para configuração e execução do testes  | Comando                    |
| ---------------------------------------------- | ---------------------------|
| Instalação das dependências                    | `npm install`              |
| Execução dos testes modo open                  | `npm run cy:open`          |
| Execução dos testes modo headless              | `npm run cy:run`           |

## Execução de cenários individuais

- Para executar um único cenário no cypress, inserir a tag `.only` na frente do teste.

it`only`('example', () => {
    // test code
  });

## Conceitos e abordagens

> 
> Padrão AAA - [ARRANGE-ACT-ASSERT](https://freecontent.manning.com/making-better-unit-tests-part-1-the-aaa-pattern/)
> 

`Explorar é acreditar que algo novo possa ser revelado, descoberto.` `Nando Medeiros`
