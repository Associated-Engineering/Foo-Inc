/// <reference types="cypress" />

describe('Focused worker', () => {
  const baseUrl = Cypress.env('baseUrl')

  it('org chart sets focused worker', () => {
    cy.visit(baseUrl)
    cy.contains('Organization Chart').click()

    cy.url().should('eq', `${baseUrl}/orgchart/10001`)
    cy.get('.current')
      .should('contain', 'Susan Acme')
      .should('contain', 'President and CEO')

    cy.get('[id=10002]')
      .should('contain', 'Jill Johnson')
      .should('contain', 'COO')
      .click()

    cy.url().should('eq', `${baseUrl}/orgchart/10002`)
    cy.get('.current')
      .should('contain', 'Jill Johnson')

    cy.contains('Profile View').click()

    cy.url().should('eq', `${baseUrl}/profile/10002`)
    cy.contains('Jill Johnson').should('exist')
  })

  it('profile view sets focused worker', () => {
    cy.visit(baseUrl)

    // Triggers a basic search
    cy.get('.MuiSlider-thumb').click()
    cy.wait(3000)

    cy.contains('Profile View').click()

    cy.url().should('eq', `${baseUrl}/profile/10001`)
    cy.contains('Susan Acme').should('exist')
    
    cy.contains('Next').click()
    cy.url().should('eq', `${baseUrl}/profile/10003`)
    cy.contains('Saul Sampson').should('exist')

    cy.contains('Next').click()
    cy.url().should('eq', `${baseUrl}/profile/30024`)
    cy.contains('Sandy Sanders').should('exist')

    cy.contains('Previous').click()
    cy.url().should('eq', `${baseUrl}/profile/10003`)
    cy.contains('Saul Sampson').should('exist')

    cy.contains('Organization Chart').click()
    cy.url().should('eq', `${baseUrl}/orgchart/10003`)
    cy.get('.current')
      .should('contain', 'Saul Sampson')
  })
})
