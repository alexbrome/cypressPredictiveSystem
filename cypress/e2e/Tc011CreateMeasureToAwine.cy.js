describe("Create Measure", () => {
  const loginData = require("../fixtures/Tc001loginData");
    const measureToCreate = require("../fixtures/Tc011CreateMeasureToAwine");

  beforeEach(() => {
    cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
    cy.visit("/", { timeout: 120000 });
    cy.loginCustomer(loginData.customer.email, loginData.customer.password);
  });



});