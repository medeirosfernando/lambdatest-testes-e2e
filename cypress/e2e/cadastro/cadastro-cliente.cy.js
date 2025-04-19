/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Cadastro', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('#main-navigation').contains(' My account ').trigger('mouseover').as('submenu')
    cy.get("@submenu").get('li').contains(' Register ').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/index.php?route=account/register`)
  });

  it('cadastra cliente com sucesso', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(faker.internet.email());
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(Cypress.env('password'), { log: false })
    cy.get('#input-confirm').should('be.visible').and('be.enabled').type(Cypress.env('password'), { log: false })
    cy.get('#input-agree').should('be.enabled').check({ force: true })
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/index.php?route=account/success`)
    cy.contains('h1', ' Your Account Has Been Created!').should('be.visible')
  });

  it('exibe validação do formulário', () => {
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

  it.skip('exibe validação do campo email', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type('email', { log: false });
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();
  });

  it('exibe validação do campo confirmação de senha', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(faker.internet.email());
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(Cypress.env('password'), { log: false })
    cy.get('#input-agree').should('be.enabled').check({ force: true })
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.get('.text-danger').should('be.visible').and('contain', 'Password confirmation does not match password!')
  });

  it('exibe validação do campo política de privacidade', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(Cypress.env('email'), { log: false });
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(Cypress.env('password'), { log: false })
    cy.get('#input-confirm').should('be.visible').and('be.enabled').type(Cypress.env('password'), { log: false })
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.contains('#account-register > .alert', ' Warning: You must agree to the Privacy Policy!').should('be.visible')
  });

  // validar tamanho dos campos

  it('cadastra cliente existente', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').type(faker.person.firstName());
    cy.get('#input-lastname').should('be.visible').and('be.enabled').type(faker.person.lastName());
    cy.get('#input-email').should('be.visible').and('be.enabled').type(Cypress.env('email'), { log: false });
    cy.get('#input-telephone').should('be.visible').and('be.enabled').type(faker.phone.number({ style: 'national' }))
    cy.get('#input-password').should('be.visible').and('be.enabled').type(Cypress.env('password'), { log: false })
    cy.get('#input-confirm').should('be.visible').and('be.enabled').type(Cypress.env('password'), { log: false })
    cy.get('#input-agree').should('be.enabled').check({ force: true })
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/index.php?route=account/register`)
    cy.contains('#account-register > .alert', ' Warning: E-Mail Address is already registered!').should('be.visible')
  });
});