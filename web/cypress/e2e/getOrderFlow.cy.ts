describe('Get Order flow', () => {
  it('opens welcome page and goes through get offer flow', () => {
    cy.visit('http://localhost:8910/welcome')

    cy.get('#get-order-input').type('3c2e9a1d8f7b6a0c5e9d2f1a')

    cy.get('#submit-order-id-button').click()



  })
})
