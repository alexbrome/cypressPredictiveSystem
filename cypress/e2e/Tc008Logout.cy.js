describe("Logout admin and Customer rol", () => {
    const loginData = require("../fixtures/Tc001loginData");
    

    beforeEach(() => {
        cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
        cy.visit("/", { timeout: 120000 }); // Espera larga para app Angular
    });

   it("Login and logout with admin role", () => {
        cy.loginAdmin(loginData.admin.email, loginData.admin.password);

        // Pulsar el botón de logout (maneja p-button que encapsula un <button>)
        cy.get('.logout-container p-button', { timeout: 10000 }).then($el => {
            const inner = $el.find('button');
            if (inner.length) {
                cy.wrap(inner.first()).click();
            } else {
                cy.wrap($el).click();
            }
        });

        // Esperar el confirm dialog visible, elegir el primero y clicar "Yes"
        cy.get('div.p-confirm-dialog, .p-confirm-dialog, p-confirmDialog, .ui-confirmdialog', { timeout: 10000 })
          .filter(':visible')       // quedarnos solo con los visibles
          .first()                  // asegurar un único elemento para within()
          .within(() => {
            cy.contains('button', 'Yes', { timeout: 10000 }).click();
          });

        // Comprobar la URL final
        cy.url({ timeout: 10000 }).should('eq', 'http://localhost:4200/');
    });


    it("Login and logout with customer role", () => {
        cy.loginCustomer(loginData.customer.email, loginData.customer.password);

        // Pulsar el botón de logout (maneja p-button que encapsula un <button>)
        cy.get('.logout-container p-button', { timeout: 10000 }).then($el => {
            const inner = $el.find('button');
            if (inner.length) {
                cy.wrap(inner.first()).click();
            } else {
                cy.wrap($el).click();
            }
        });

        // Esperar el confirm dialog visible, elegir el primero y clicar "Yes"
        cy.get('div.p-confirm-dialog, .p-confirm-dialog, p-confirmDialog, .ui-confirmdialog', { timeout: 10000 })
          .filter(':visible')       // quedarnos solo con los visibles
          .first()                  // asegurar un único elemento para within()
          .within(() => {
            cy.contains('button', 'Yes', { timeout: 10000 }).click();
          });

        // Comprobar la URL final
        cy.url({ timeout: 10000 }).should('eq', 'http://localhost:4200/');
    });
})