// https://docs.cypress.io/api/introduction/api.html

describe('App test', () => {
  const name = 'Digitiamo';
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the app root url', () => {
    cy.get('#app');
  });

  it('Updates the view value', () => {
    cy.get('[data-test-id="inputTest"]')
      .type(name)
      .get('[data-test-id="buttonTest"]')
      .click()
      .get('[data-test-id="paragraphTest"]')
      .should('have.text', `Hello ${name}`);
  });

  it('Show more greetings', () => {
    cy.get('[data-test-id="inputTest"]')
      .type(name)
      .get('[data-test-id="buttonTest"]')
      .click()
      .get('[data-test-id="greetingsButton"]')
      .click()
      .get('[data-set-id="titleTest"]')
      .should('have.text', name)
      .get('[data-set-id="paragraphGreetingsTest"]')
      .should('have.text', `Watch out, ${name} is coming`);
  });
});
