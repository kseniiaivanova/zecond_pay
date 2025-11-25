/// <reference types="cypress" />

describe('Payment flow', () => {
  it('opens order page, confirms order, proceeds to payment, and lets user go back', () => {
    const eventId = 'b12f7d90-5e3a-4b93-a8a3-1f90bba1c001'

    cy.visit(`http://localhost:8910/orders/${eventId}`)

    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="quantity"]').clear().type('2')

    cy.get('#confirm-order-button').click()
    cy.get('#create-payment-button').click()
    cy.get('#zco-loader', { timeout: 10000 }).should('exist')
    cy.get('#navigation-button').click()
    cy.url().should('eq', 'http://localhost:8910/welcome')
  })
})
