/// <reference types="cypress" />

describe('Search and filter', () => {
  const baseUrl = Cypress.env('baseUrl')

  it.skip('Filter by location and title', () => {
    cy.visit(baseUrl)

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

  it('Filter by skill', () => {
    cy.visit(baseUrl)

    cy.get('[data-cy="skill-input"]').type("Acc")
    cy.get('[data-cy="expand-skill-filters"]').click()

    cy.get('.category').should('have.length', 1).should('contain.text', 'Accounting').click()
    cy.get('.filter-list-icon').should('have.length', 3).each(($el) => cy.wrap($el).click())
    
    cy.wait(3000)
    cy.get('[data-cy="employee-card"]').should('have.length', 1)
    cy.contains('Name Employee05').should('exist')

    cy.get('[data-cy="Transaction Processing checkbox"]').click()
    cy.get('[data-cy="Auditing checkbox"]').click()

    cy.get('[data-cy="skill-input"]').clear().type('Man')
    cy.get('.category').should('have.length', 2).then(($els) => {
      cy.wrap($els[0]).should('contain.text', 'Management')
      $els[0].click()
    })

    cy.get('[data-cy="Planning checkbox"]').click()
    cy.get('[data-cy="Performance Reviews checkbox"]').click()


    cy.wait(3000)
    cy.get('[data-cy="employee-card"]').should('have.length', 1)
    cy.contains('Annie Ameras').should('exist')
  })
})
