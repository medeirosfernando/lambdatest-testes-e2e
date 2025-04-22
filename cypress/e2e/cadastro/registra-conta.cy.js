/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Registro de conta no website LambdaTest', () => {
  let email = 'example@mail.com';
  let password = faker.internet.password();

  beforeEach(() => {
    cy.visit('/');
    cy.get('#main-navigation').contains(' My account ').trigger('mouseover').as('submenu');
    cy.get('@submenu').get('li').contains(' Register ').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/index.php?route=account/register`);
  });

  it('ct01 - exibe mensagem de erro ao tentar registrar com campos obrigatórios em branco', () => {
    cy.get('#input-firstname').should('be.visible').and('be.enabled').clear();
    cy.get('#input-lastname').should('be.visible').and('be.enabled').clear();
    cy.get('#input-email').should('be.visible').and('be.enabled').clear();
    cy.get('#input-telephone').should('be.visible').and('be.enabled').clear();
    cy.get('#input-password').should('be.visible').and('be.enabled').clear();
    cy.get('#input-confirm').should('be.visible').and('be.enabled').clear();
    cy.get('input[type=submit]').should('be.visible').and('be.enabled').click();

    const expectErros = [
      'First Name must be between 1 and 32 characters!',
      'Last Name must be between 1 and 32 characters!',
      'E-Mail Address does not appear to be valid!',
      'Telephone must be between 3 and 32 characters!',
      'Password must be between 4 and 20 characters!',
    ];

    cy.get('.text-danger', { timeout: 10000 }).each(($div, index) => {
      cy.wrap($div).should('contain.text', expectErros[index]);
    });
  });

  it('ct05 - exibe mensagem de erro ao inserir senhas diferentes nos campos de senha e confirmação', () => {
    cy.preencherFormRegistro({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      telephone: faker.phone.number({ style: 'national' }),
      password: password,
      confirmPassword: '123qwe@@',
      agreeTerms: true,
    });

    const expectErros = [
      'Password confirmation does not match password!',
    ];

    cy.get('.text-danger', { timeout: 10000 }).each(($div, index) => {
      cy.wrap($div).should('contain.text', expectErros[index]);
    });
  });

  it('ct06 - impede o registro quando os termos e condições não são aceitos', () => {
    cy.preencherFormRegistro({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      telephone: faker.phone.number({ style: 'national' }),
      password: password,
      confirmPassword: password,
      agreeTerms: false,
    });

    const expectErros = [
      ' Warning: You must agree to the Privacy Policy!',
    ];

    cy.get('#account-register > .alert', { timeout: 10000 }).each(($div, index) => {
      cy.wrap($div).should('contain.text', expectErros[index]);
    });
  });

  it('ct07 - registra o usuário ao preencher todos os campos obrigatórios e aceitar os termos', () => {
    cy.preencherFormRegistro({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      telephone: faker.phone.number({ style: 'national' }),
      password: password,
      confirmPassword: password,
      agreeTerms: true,
    },
      `${Cypress.config().baseUrl}/index.php?route=account/success`
    );

    const expectErros = [
      ' Your Account Has Been Created',
    ];

    cy.get('h1', { timeout: 10000 }).each(($div, index) => {
      cy.wrap($div).should('contain.text', expectErros[index]);
    });
  });

  it('ct09 - bloqueia o registro ao usar um e-mail já associado a uma conta existente', () => {
    cy.preencherFormRegistro({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: email,
      telephone: faker.phone.number({ style: 'national' }),
      password: password,
      confirmPassword: password,
      agreeTerms: true,
    },
      `${Cypress.config().baseUrl}/index.php?route=account/register`
    );

    const expectErros = [
      ' Warning: E-Mail Address is already registered!',
    ];

    cy.get('#account-register > .alert', { timeout: 10000 }).each(($div, index) => {
      cy.wrap($div).should('contain.text', expectErros[index]);
    });
  });

  it('ct10 - registra o usuário e inscreve no boletim informativo ao marcar a opção correspondente', () => {
    cy.preencherFormRegistro({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      telephone: faker.phone.number({ style: 'national' }),
      password: password,
      confirmPassword: password,
      subscribeNewsletter: true,
      agreeTerms: true,
    },
      `${Cypress.config().baseUrl}/index.php?route=account/success`
    );

    const expectErros = [
      ' Your Account Has Been Created!',
    ];

    cy.get('h1', { timeout: 10000 }).each(($div, index) => {
      cy.wrap($div).should('contain.text', expectErros[index]);
    });
  });

  it('ct11 - exibe mensagem com a política de privacidade', () => {
    cy.contains('a', 'Privacy Policy').should('be.visible').click();
    cy.get('.modal-content').should('be.visible').and('contain', 'Privacy Policy');
  });
});