/// <reference types="Cypress" />

describe('edit movie modal', () => {
  it('should successfully add movie', () => {
    cy.visit('http://localhost:5173/');


    cy.get('.bg-blue-500').click();
    cy.get('#add-movie #title').type('unique name of movie to edit');
    cy.get('#add-movie #movieUrl').type('http://test.com/poster_path');
    cy.get('#add-movie #rating').type('9');
    cy.get('#add-movie #genre').select('comedy');
    cy.get('#add-movie #runtime').type('120');
    cy.get('#add-movie #description').type('Some description of unique name of movie to edit etc');
    cy.get('#add-movie #submit-movie-form').click();

    cy.get('[data-testid="search-input"]').type('unique name of movie to edit');
    cy.get('#main-search-button').click();

    cy.get('.max-w-xs > .py-4 > [data-testid="movie-title"]').contains('unique name of movie to edit');

    cy.get('[data-testid="movie-list"] > :nth-child(1) > .dropdown > .m-1').click();
    cy.get('[data-testid="movie-list"] > :nth-child(1) > .dropdown > [data-testid="sort-by-list"] > :nth-child(1) > a').click();

    cy.get('#edit-movie #title').clear();
    cy.get('#edit-movie #title').type('new edit name');
    cy.get('#edit-movie #rating').type('9');
    cy.get('#edit-movie #genre').select('documentary');
    cy.get('#edit-movie #runtime').type('130');
    cy.get('#edit-movie #submit-movie-form').click();


    cy.get('[data-testid="movie-list"] > :nth-child(1) > .dropdown > .m-1').click();
    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type('new edit name');
    cy.get('#main-search-button').click();

    cy.get('.max-w-xs > .py-4 > [data-testid="movie-title"]').contains('new edit name');
  });
});
