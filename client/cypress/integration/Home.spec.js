describe('Home', function () {

  it('loads the App', function () {
    // cy.server();
    // intercepts GET requests to this url and sends back fixture as response
    // cy.route('**/reports/api/get-subscriptions-for-user/**', 'fixture:get-subscriptions-for-user.json');

    cy.visit('http://localhost:3000/');
    cy.get('#reader-button').should('be.visible')
    cy.get('#editor-button').should('be.visible')

    // cy.get('[data-testid=reports]').should('be.visible');
  })
})