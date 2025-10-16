describe("Creat User with Admin logged",()=>{

let userCreated = require('../fixtures/Tc002CreateUser') //Importa los datos de usuario desde el archivo fixtures
let loginData = require('../fixtures/Tc001loginData')   //Importa los datos de login desde el archivo fixtures
beforeEach(()=>{
cy.visit("localhost:4200") //Visita la URL
})

//Admin Login
it('Create User',()=>{
    cy.loginAdmin(loginData.admin.email,loginData.admin.password) //Usa el comando personalizado para login como admin
    cy.contains('button','New').click()                                   //Pulsar boton nuevo customer
    cy.url({timeout:10000}).should('include','/signup')            // La url del formulario para crear un nuevo usuario debe incluir /signup
    
    //Introducir datos del nuevo usuario
    cy.get('#email',{timeout:10000}).should('be.visible').type(userCreated.user.email)              
    cy.get('#password').type(userCreated.user.password)
    cy.get('#checkPassword').type(userCreated.user.password)
    cy.get('#username').type(userCreated.user.username)
    cy.contains('button','Save Customer').click()

    //Comprobar que la url a vuelto a /homeAdmin
    cy.url({timeout:10000}).should('include','/homeAdmin')
})
})