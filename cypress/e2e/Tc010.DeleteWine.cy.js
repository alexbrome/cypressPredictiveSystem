describe("Delete wine", () => {
  const loginData = require("../fixtures/Tc001loginData");
  const wineToCreate = require("../fixtures/Tc009");

  beforeEach(() => {
    cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
    cy.visit("/", { timeout: 120000 });
    cy.loginCustomer(loginData.customer.email, loginData.customer.password);
  });

  it("Delete wine by name after sorting by Name header", () => {
    const name = wineToCreate.wine.wineName;

    // Asegurar que la tabla está presente
    cy.get('p-table, .table', { timeout: 10000 }).should('exist');

    // Pulsar dos veces en la cabecera "Name" para ordenar (alfabéticamente asc/desc según estado)
    cy.get('th[pSortableColumn="name"]', { timeout: 10000 })
      .should('exist')
      .click()
      .click();

    // Dar un pequeño tiempo para que PrimeNG re-renderice la tabla
    cy.wait(600);

    // Buscar la celda que contiene el nombre (usa includes por seguridad) y borrar en su fila
    cy.contains('td', name, { timeout: 10000 })
      .should('be.visible')
      .closest('tr')
      .within(() => {
        // Clicar el p-button Delete (manejar botón interno si existe)
        cy.get('p-button[label="Delete"]', { timeout: 5000 }).then($pb => {
          const inner = $pb.find('button');
          if (inner.length) {
            cy.wrap(inner.first()).click();
          } else {
            cy.wrap($pb).click();
          }
        });
      });

    // Aceptar confirm dialog (botón "Yes")
    cy.get('div.p-confirm-dialog, .p-confirm-dialog, p-confirmDialog, .ui-confirmdialog', { timeout: 10000 })
      .filter(':visible')
      .first()
      .within(() => {
        cy.contains('button', 'Yes', { timeout: 10000 }).click();
      });

    // Verificar toast de éxito y que la fila haya desaparecido
    cy.get('.p-toast-message-success', { timeout: 10000 }).should('be.visible');
    cy.contains('td', name).should('not.exist');
  });
});