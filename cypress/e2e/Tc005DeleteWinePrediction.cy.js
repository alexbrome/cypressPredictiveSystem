describe("Delete Wine Prediction", () => {
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

    it("Delete Wine Prediction", () => {
        // Buscar el usuario por nombre y pulsar su botón de eliminar
        cy.contains('li.userList', userToCheck.user.username).click()

        //Seleccionar el vino con prediccion y hacer click
        cy.get('.column.center  ul  li', { timeout: 10000 }).contains(userToCheck.user.wineWithPredictions).click()

        //Verificar que la lista no esta vacia
        cy.get('.prediction', { timeout: 10000 }).should('have.length.greaterThan', 0)

        //Eliminar la primera prediccion
        cy.get('.prediction', { timeout: 10000 }).first().within(() => {
            cy.contains('button', 'Delete').click()
        })

        // Confirmar el diálogo
        cy.get('.p-confirm-dialog', { timeout: 10000 }).should('be.visible')
        cy.get('.p-confirm-dialog .p-confirm-dialog-accept').click()

        // Verificar que el diálogo ya no está visible ni en el DOM
        cy.get('.p-confirm-dialog').should('not.exist')

        // ✅ Verificar que aparece el mensaje del toast
        cy.get('.p-toast-message-text', { timeout: 10000 })
            .should('contain.text', 'Prediction deleted successfully!')

        // ✅ Verificar que el toast desaparece después de un tiempo
        cy.get('.p-toast-message-text', { timeout: 10000 }).should('not.exist')

    }


    )
})