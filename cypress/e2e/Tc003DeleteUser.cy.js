describe("Delete user with admin logged",()=>{

//Importa los datos del usuario a borrar    
let userToDelete = require("../fixtures/Tc002CreateUser")

//Importa los datos de login desde el archivo fixtures
let loginData = require('../fixtures/Tc001loginData')   

before(()=>{
    cy.visit("localhost:4200") //Visita la URL
    cy.loginAdmin(loginData.admin.email, loginData.admin.password) //Usa el comando personalizado para login como admin
})

it("Delete user created",()=>{

 // Esperar que la lista de usuarios esté cargada
  cy.get('li.userList', { timeout: 10000 }).should('exist')

  // Buscar el usuario por nombre y pulsar su botón de eliminar
  cy.contains('li.userList', 'userCypress')
    .find('button') // el <p-button> genera un <button>
    .click()

  // Esperar que se abra el diálogo de confirmación PrimeNG
  cy.get('.p-confirm-dialog', { timeout: 10000 }).should('be.visible')

  // Confirmar el borrado (pulsar el botón "Yes" o "Aceptar")
  cy.get('.p-confirm-dialog .p-confirm-dialog-accept')
    .should('be.visible')
    .click()

  // Verificar que el usuario ha desaparecido de la lista
  cy.contains('li.userList', 'userCypress').should('not.exist')

  // Verificar que aparece un toast de éxito
  cy.get('.p-toast-message-success', { timeout: 10000 }).should('be.visible')
})

 
  

})