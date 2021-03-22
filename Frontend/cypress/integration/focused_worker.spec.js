/// <reference types="cypress" />

describe('Focused worker', () => {
  it('org chart sets focused worker', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Organization Chart').click()

    cy.url().should('eq', 'http://localhost:3000/orgchart/10001')
    cy.get('.current')
      .should('contain', 'Susan Acme')
      .should('contain', 'President and CEO')

    cy.get('[id=10002]')
      .should('contain', 'Jill Johnson')
      .should('contain', 'COO')
      .click()

    cy.url().should('eq', 'http://localhost:3000/orgchart/10002')
    cy.get('.current')
      .should('contain', 'Jill Johnson')

    cy.contains('Profile View').click()

    cy.url().should('eq', 'http://localhost:3000/profile/10002')
    cy.should('contain', 'Jill Johnson')
  })

  it('profile view sets focused worker', () => {
    cy.visit('http://localhost:3000')

    // TODO: Change this test to do a basic search first
    cy.contains('Profile View').click()

    cy.url().should('eq', 'http://localhost:3000/profile/10001')
    cy.should('contain', 'Susan Acme')

    cy.contains('Next').click()
    cy.url().should('eq', 'http://localhost:3000/profile/10002')
    cy.should('contain', 'Jill Johnson')
    
    cy.contains('Next').click()
    cy.url().should('eq', 'http://localhost:3000/profile/10003')
    cy.should('contain', 'Saul Sampson')

    cy.contains('Previous').click()
    cy.url().should('eq', 'http://localhost:3000/profile/10002')
    cy.should('contain', 'Jill Johnson')

    cy.contains('Organization Chart').click()
    cy.url().should('eq', 'http://localhost:3000/orgchart/10002')
    cy.get('.current')
      .should('contain', 'Jill Johnson')
  })
})
