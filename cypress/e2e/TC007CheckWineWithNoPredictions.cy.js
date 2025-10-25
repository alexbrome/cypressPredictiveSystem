describe("Check wine prediction info with admin rol", () => {
    const loginData = require("../fixtures/Tc001loginData");
    const userToCheck = require("../fixtures/Tc007");

    before(() => {
        cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
        cy.visit("/", { timeout: 120000 }); // Espera larga para app Angular
        cy.loginAdmin(loginData.admin.email, loginData.admin.password);
    });

    it('Debe abrir la info de una predicción de vino correctamente', () => {
        // Esperamos que el nombre del usuario se muestre y hacemos click
        cy.contains('li.userList', userToCheck.user.username).click()

        //Seleccionar el vino con prediccion y hacer click
        cy.get('.column.center  ul  li', { timeout: 10000 })
            .contains(userToCheck.user.wineWithPredictions).click()

        // Esperamos a que se cargue el panel de predicciones
        cy.get('.column.right', { timeout: 15000 }).should('be.visible');

       //Comprobar que existe el texto de No predictions so far
       cy.get('.column.right', { timeout: 15000 })
       .should('contain.text', 'No predictions so far');

    });
       
    });
