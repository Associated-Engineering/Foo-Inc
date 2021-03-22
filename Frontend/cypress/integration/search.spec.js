/// <reference types="cypress" />

describe('Org chart', () => {
  it('sets focused worker', () => {
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

    

  //   // https://on.cypress.io/should
  //   cy.get('.assertion-table')
  //     .find('tbody tr:last')
  //     .should('have.class', 'success')
  //     .find('td')
  //     .first()
  //     // checking the text of the <td> element in various ways
  //     .should('have.text', 'Column content')
  //     .should('contain', 'Column content')
  //     .should('have.html', 'Column content')
  //     // chai-jquery uses "is()" to check if element matches selector
  //     .should('match', 'td')
  //     // to match text content against a regular expression
  //     // first need to invoke jQuery method text()
  //     // and then match using regular expression
  //     .invoke('text')
  //     .should('match', /column content/i)

  //   // a better way to check element's text content against a regular expression
  //   // is to use "cy.contains"
  //   // https://on.cypress.io/contains
  //   cy.get('.assertion-table')
  //     .find('tbody tr:last')
  //     // finds first <td> element with text content matching regular expression
  //     .contains('td', /column content/i)
  //     .should('be.visible')

  //   // for more information about asserting element's text
  //   // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
  // })

  // it('search with skills and location', () => {
  //   // https://on.cypress.io/and
  //   cy.get('.assertions-link')
  //     .should('have.class', 'active')
  //     .and('have.attr', 'href')
  //     .and('include', 'cypress.io')
  })
})
