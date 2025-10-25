describe("Create wine", () => {
    const loginData = require("../fixtures/Tc001loginData");
    const wineToCreate = require("../fixtures/Tc009");

    beforeEach(() => {
        cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
        cy.visit("/", { timeout: 120000 }); // Espera larga para app Angular
        cy.loginCustomer(loginData.customer.email, loginData.customer.password);
    });


    it("Create wine", () => {
        //Pulsar el boton de Create wine y asegurase de que existe
        cy.get('p-button[label="Create Wine"]', { timeout: 10000 })
            .should('exist')
            .find('button')
            .should('be.visible')
            .click();

        cy.get('p-dialog', { timeout: 10000 })
            .filter(':visible')
            .first()
            .within(() => {
                cy.log("Nombre del vino a incluir:", wineToCreate.wine.wineName);
                cy.get('input[pInputText][type="text"]', { timeout: 10000 })
                    .should('be.visible')
                    .clear()
                    .type(wineToCreate.wine.wineName);
                cy.get('p-button[label="Save"]').find('button').click();
            });


        //Verificar mensaje de exito
        cy.get('.p-toast-message-success', { timeout: 10000 }).should('be.visible')
    })


})