describe("Check Wine Predictions with Admin Role",()=>{
 //Importa los datos de login desde el archivo fixtures
let loginData = require('../fixtures/Tc001loginData')  
let userToCheck = require("../fixtures/Tc004CheckWinePredictions")

before(()=>{
//Visita la URL
cy.visit("localhost:4200") 

//Usa el comando personalizado para login como admin
cy.loginAdmin(loginData.admin.email,loginData.admin.password) 
})

it("Check Wine Predictions",()=>{

// Buscar el usuario por nombre y pulsar su botón de eliminar
  cy.contains('li.userList', userToCheck.user.username).click()

  //Seleccionar el vino con prediccion y hacer click
  cy.get('.column.center  ul  li', {timeout:10000}).contains(userToCheck.user.wineWithPredictions).click()

  //Verificar que la lista no esta vacia
  cy.get('.prediction', {timeout:10000}).should('have.length.greaterThan', 0)
})



})