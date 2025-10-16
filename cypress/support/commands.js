

Cypress.Commands.add('loginAdmin',(email,password)=>{
    cy.get('#email').click().type(email)
    cy.get('#password').click().type(password)
    cy.contains('button','Log In').click()
    cy.url().should('include','/homeAdmin')
})

Cypress.Commands.add('loginCustomer',(email,password)=>{
    cy.get('#email').click().type(email)
    cy.get('#password').click().type(password)
    cy.contains('button','Log In').click()
    cy.url().should('include','/wineList')
})