/// <reference types="cypress" />

describe('Search and filter', () => {
  it('Filter by location and title', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-cy="location-input"]').type("Van")
    cy.get('[data-cy="expand-location-filters"]').click()

    cy.contains('Vancouver').should('exist')
    cy.get('.filter-list-icon').should('have.length', 1).click()
    cy.get('[data-cy="expand-location-filters"]').click()


    cy.get('[data-cy="title-input"]').type('Manager')
    cy.get('[data-cy="expand-title-filters"]').click()
    cy.get('.filter-list-icon').should('have.length', 11).then(($els) => {
      $els[2].click()
      $els[5].click()
    })
    cy.wait(3000)
    cy.get('[data-cy="employee-card"]').should('have.length', 3)
    cy.contains('Saul Sampson').should('exist')
    cy.contains('Owen Jones').should('exist')
    cy.contains('Gregore Da Silva').should('exist')
  })
})
