describe('Reader', function() {
  it('loads the reader', function() {
    cy.visit('http://localhost:3000/');
    cy.get('#reader-button').click();
    cy.get('#top-navigation').should('be.visible');
    // cy.get('')

    // cy.get('[data-testid=reports]').should('be.visible');
  });

  it('loads the adventures', function() {
    cy.server();
    // intercepts GET requests to this url and sends back fixture as response
    cy.route('**/graphql/**', 'fixture:stories.json');
    cy.visit('http://localhost:3000/reader');
    const adventureList = cy.get('#adventure-list');
    adventureList.should('be.visible');
    adventureList.contains('ul');
  });

  it('has a searchbar', function() {
    cy.get('#adventure-search').should('be.visible');
  });

  it('loads the FAQ page', function() {
    cy.visit('http://localhost:3000/reader/faq');
    cy.get('#faq-h1').should('be.visible');
  });
});
