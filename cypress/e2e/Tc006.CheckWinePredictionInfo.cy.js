describe("Check wine prediction info with admin rol", () => {
    const loginData = require("../fixtures/Tc001loginData");
    const userToCheck = require("../fixtures/Tc006");

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

        // Esperamos a que se cargue al menos una predicción
        cy.get('.column.right', { timeout: 15000 })
            .find('.prediction')
            .should('exist')
            .then(($predictions) => {
                cy.log(`Se encontraron ${$predictions.length} predicciones`);
                expect($predictions.length).to.be.greaterThan(0);
            });

               // Hacemos clic en el botón "Info" de la primera predicción
        cy.get('.column.right .prediction').first().within(() => {
            cy.get('button.btn-info').contains('Info').should('be.visible').click();
        });

        // Comprobar que aparece el diálogo "Wine Prediction Info" y que la tabla tiene datos
       // cy.contains('Wine Prediction Info', { timeout: 10000 }).should('be.visible');

        cy.get('p-dialog table tbody tr, div.p-dialog table tbody tr, .ui-dialog table tbody tr', { timeout: 10000 })
          .should('have.length.greaterThan', 5)
          .each(($row) => {
            cy.wrap($row).find('td').each(($td) => {
              cy.wrap($td).invoke('text').should('not.be.empty');
            });
          });

        // Cerrar diálogo
        cy.get('body').type('{esc}');
    });


        
    });
