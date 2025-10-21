describe("Check wine prediction info with admin rol", () => {

    //Importa los datos de login desde el archivo fixtures  
    let loginData = require('../fixtures/Tc001loginData')

    //Importa los datos del usuario a comprobar
    let userToCheck = require("../fixtures/Tc004CheckWinePredictions")

    before(() => {
        //Visita la URL
        cy.visit("http://localhost:4200")
        //Usa el comando personalizado para login como admin  
        cy.loginAdmin(loginData.admin.email, loginData.admin.password)
    })

    it("click in user name and check predictions", () => {
        //Seleccionar el vino con prediccion y hacer click
        cy.get('.column.center  ul  li', { timeout: 10000 })
            .contains(userToCheck.user.username).click()

        //Seleccionar el wine con predicciones
        cy.get('.column center ul li', { timeout: 10000 }
            .contains(userToCheck.user.wineWithPredictions).click()
        )

        //Comprobar que la lista de predicciones no este vacia
        cy.get('prediction').should('exist')
            .and('have.length.greaterThan', 0)

        // Selecciona la primera predicción y hace click en su botón "Info"
        cy.get('.prediction').first().within(() => {
            cy.contains('button', 'Info').click();

            // Verifica que el diálogo esté visible
            cy.get('p-dialog')
                .should('be.visible')
                .and('contain.text', 'Wine Prediction Info');

            // Comprueba que la tabla del diálogo tenga filas con propiedades y valores
            cy.get('p-dialog table tbody tr')
                .should('have.length.greaterThan', 5) // Debe tener varias filas de propiedades
                .each(($row) => {
                    cy.wrap($row).within(() => {
                        cy.get('td').eq(0).invoke('text').should('not.be.empty'); // Property
                        cy.get('td').eq(1).invoke('text').should('not.be.empty'); // Value
                    });
                });
        });
    })

})