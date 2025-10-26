describe("Create Measure", () => {
  const loginData = require("../fixtures/Tc001loginData");
  const measureToCreate = require("../fixtures/Tc011");

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
        cy.get('p-button[label="Measure"]', { timeout: 5000 }).then($pb => {
          const inner = $pb.find('button');
          if (inner.length) {
            cy.wrap(inner.first()).click();
          } else {
            cy.wrap($pb).click();
          }
        });
      });

    // Esperar y rellenar el diálogo "Create Measure"
    cy.get('p-dialog[header="Create Measure"], p-dialog', { timeout: 10000 })
      .filter(':visible')
      .first()
      .within(() => {
        // descripcion
        cy.get('input[name="description"], #desc, input[pInputText][name="description"]', { timeout: 5000 })
          .first()
          .should('be.visible')
          .clear()
          .type(measureToCreate.measure.description);


        // Guardar
        cy.get('p-button[label="Save"]', { timeout: 5000 }).then($pb => {
          const inner = $pb.find('button');
          if (inner.length) {
            cy.wrap(inner.first()).click();
          } else {
            cy.wrap($pb).click();
          }
        });
      });

    // Verificar toast de éxito y que el diálogo se cierre
    cy.get('.p-toast-message-success', { timeout: 10000 }).should('be.visible');
    cy.get('p-dialog[header="Create Measure"]').should('not.be.visible');
  });
});