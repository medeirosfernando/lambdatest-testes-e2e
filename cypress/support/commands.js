Cypress.Commands.add('preencherFormRegistro', (userData, expectedUrl = null) => {
  cy.get('#input-firstname').clear().type(userData.firstName || '');
  cy.get('#input-lastname').clear().type(userData.lastName || '');
  cy.get('#input-email').clear().type(userData.email || '');
  cy.get('#input-telephone').clear().type(userData.telephone || '');
  cy.get('#input-password').clear().type(userData.password || '');
  cy.get('#input-confirm').clear().type(userData.confirmPassword || '');

  if (userData.agreeTerms) {
    cy.get('#input-agree').check({ force: true });
  }

  if (userData.subscribeNewsletter) {
    cy.get('.custom-control-label').first().click();
  }

  cy.get('input[type=submit]').click();

  if (expectedUrl) {
    cy.url().should('eq', expectedUrl)
  }
});
