/// <reference types="Cypress" />

describe('add movie modal', () => {
  it('should successfully add movie', () => {
    cy.visit('http://localhost:5173/');


    cy.get('.bg-blue-500').click();
    cy.get('#add-movie #title').type('unique name of movie');
    cy.get('#add-movie #movieUrl').type('http://test.com/poster_path');
    cy.get('#add-movie #rating').type('9');
    cy.get('#add-movie #genre').select('comedy');
    cy.get('#add-movie #runtime').type('120');
    cy.get('#add-movie #description').type('Some description of unique name of movie etc');
    cy.get('#add-movie #submit-movie-form').click();

    cy.get('[data-testid="search-input"]').type('unique name of movie');
    cy.get('#main-search-button').click();

    cy.get('.max-w-xs > .py-4 > [data-testid="movie-title"]').contains('unique name of movie');
  });
});
