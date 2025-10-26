describe("Navigate to wineSummary", () => {
  const loginData = require("../fixtures/Tc001loginData");


  beforeEach(() => {
    cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
    cy.visit("/", { timeout: 120000 });
    cy.loginCustomer(loginData.customer.email, loginData.customer.password);
  });
    it("Create Measure for first wine in table", () => {
      // Asegurar que la tabla está renderizada
    cy.get('p-table, .table', { timeout: 15000 }).should('exist');

    // Pulsar el botón "Measure" de la primera fila
    cy.get('p-table .p-datatable-tbody tr, .table tbody tr', { timeout: 10000 })
      .first()
      .within(() => {
        cy.get('p-button[label="Summary"]', { timeout: 5000 }).then($pb => {
          const inner = $pb.find('button');
          if (inner.length) {
            cy.wrap(inner.first()).click();
          } else {
            cy.wrap($pb).click();
          }
        });
    })
    cy.url().should('include', '/summaryWhite');
})
})