describe('Payment flow', () => {
  it('opens order page and lets user go back', () => {
    cy.visit('http://localhost:8910/orders/3c2e9a1d8f7b6a0c5e9d2f1a?status=created&amount=50.25')

    cy.get('#create-payment-button').click()

    cy.get('#zco-loader').should('exist');

    cy.get('#navigation-button').click()

    cy.url().should('eq', 'http://localhost:8910/welcome');



  })
})
