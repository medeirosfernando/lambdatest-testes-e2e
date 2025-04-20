/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Registro de conta no website LambdaTest', () => {
  let email = 'example@mail.com';
  let password = faker.internet.password();

  beforeEach(() => {
    cy.visit('/');
    cy.get('#main-navigation').contains(' My account ').trigger('mouseover').as('submenu')
    cy.get("@submenu").get('li').contains(' Register ').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/index.php?route=account/register`)
  });

  it('registra o usuário ao preencher todos os campos obrigatórios e aceitar os termos', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(faker.internet.email());
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(password);
    cy.get('#input-confirm').should('be.visible').and('be.enabled').type(password);
    cy.get('#input-agree').should('be.enabled').check({ force: true })
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/index.php?route=account/success`)
    cy.contains('h1', ' Your Account Has Been Created!').should('be.visible')
  });

  it('registra o usuário e inscreve no boletim informativo ao marcar a opção correspondente', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(faker.internet.email());
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(password);
    cy.get('#input-confirm').should('be.visible').and('be.enabled').type(password);
    cy.get('.custom-control-label').first().click();
    cy.get('#input-agree').should('be.enabled').check({ force: true })
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/index.php?route=account/success`)
    cy.contains('h1', ' Your Account Has Been Created!').should('be.visible')
  });

  it('exibe mensagem de erro ao tentar registrar com campos obrigatórios em branco', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').clear();
    cy.get('#input-lastname').should('be.visible').and('be.enabled').clear();
    cy.get('#input-email').should('be.visible').and('be.enabled').clear();
    cy.get('#input-telephone').should('be.visible').and('be.enabled').clear();
    cy.get('#input-password').should('be.visible').and('be.enabled').clear();
    cy.get('#input-confirm').should('be.visible').and('be.enabled').clear();
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    const items = []
    cy.get('.text-danger', { timeout: 10000 }).each(($div) => items.push($div.text()))
    cy.wrap(items).should('deep.equal', [
      'First Name must be between 1 and 32 characters!',
      'Last Name must be between 1 and 32 characters!',
      'E-Mail Address does not appear to be valid!',
      'Telephone must be between 3 and 32 characters!',
      'Password must be between 4 and 20 characters!'
    ])
  });

  it('exibe mensagem com a política de privacidade', () => {
    cy.contains('a', 'Privacy Policy').should('be.visible').click();
    cy.get('.modal-content').should('be.visible').and('contain', 'Privacy Policy')
  });

  it('exibe mensagem de erro ao inserir senhas diferentes nos campos de senha e confirmação', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(faker.internet.email());
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(password)
    cy.get('#input-confirm').should('be.visible').and('be.enabled').type("123qwe@@");
    cy.get('#input-agree').should('be.enabled').check({ force: true })
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.get('.text-danger').should('be.visible').and('contain', 'Password confirmation does not match password!')
  });

  it('impede o registro quando os termos e condições não são aceitos', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(faker.internet.email());
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(password)
    cy.get('#input-confirm').should('be.visible').and('be.enabled').type(password)
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.contains('#account-register > .alert', ' Warning: You must agree to the Privacy Policy!').should('be.visible')
  });

  it('bloqueia o registro ao usar um e-mail já associado a uma conta existente', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(email);
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(password)
    cy.get('#input-confirm').should('be.visible').and('be.enabled').type(password)
    cy.get('#input-agree').should('be.enabled').check({ force: true })
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/index.php?route=account/register`)
    cy.contains('#account-register > .alert', ' Warning: E-Mail Address is already registered!').should('be.visible')
  });
});