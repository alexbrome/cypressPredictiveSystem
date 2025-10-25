describe("Logout admin and Customer rol", () => {
    const loginData = require("../fixtures/Tc001loginData");
    

    beforeEach(() => {
        cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
        cy.visit("/", { timeout: 120000 }); // Espera larga para app Angular
        cy.loginCustomer(loginData.customer.email, loginData.customer.password);
    });

})