describe("Wine table pagination", () => {
  const loginData = require("../fixtures/Tc001loginData");

  beforeEach(() => {
    cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
    cy.visit("/", { timeout: 120000 });
    cy.loginCustomer(loginData.customer.email, loginData.customer.password);
  });

     it("Create Measure for first wine in table", () => {
      // Asegurar que la tabla está renderizada
    cy.get('p-table, .table', { timeout: 15000 }).should('exist');

    // Pulsar el botón "Summary" de la primera fila
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

    cy.url({ timeout: 10000 }).should('include', '/summaryWhite');

    // Pulsar el botón Measure-Calendar
    cy.get('p-button[label="Measure-Calendar"], button:contains("Measure-Calendar")', { timeout: 10000 })
      .then($el => {
        // Manejar p-button con <button> interno o botón plano
        //**<p-button> tiene dentro un <button>
        const innerBtn = $el.find('button');
        if (innerBtn.length) {
          cy.wrap(innerBtn.first()).click();
        } else {
          cy.wrap($el).first().click();
        }
      });

    // Esperar animación/render y comprobar que se muestra el calendario
    cy.wait(500);
    cy.get('.calendar', { timeout: 10000 }).should('be.visible');
    cy.get('.calendar full-calendar, .calendar .fc', { timeout: 10000 }).should('exist').and('be.visible');

})
     
  });


