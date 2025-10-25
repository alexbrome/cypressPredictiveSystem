describe("Login with both Admin and user roles",()=>{

let loginData = require('../fixtures/Tc001loginData') //Importa los datos de login desde el archivo fixtures

beforeEach(()=>{
    cy.log('🌐 Base URL usada:', Cypress.config('baseUrl'))
cy.visit("/", { timeout: 1000000 }) //Visita la URL
})

//Admin Login
it('Login with admin role',()=>{
    cy.loginAdmin(loginData.admin.email,loginData.admin.password) //Usa el comando personalizado para login como admin
})

//Customer Login
it('Login with customer role',()=>{
    cy.loginCustomer(loginData.customer.email,loginData.customer.password) //Usa el comando personalizado para login como customer

})
})