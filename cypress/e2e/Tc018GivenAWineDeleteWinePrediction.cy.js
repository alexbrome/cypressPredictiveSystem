describe("Select wine and check predictions", () => {
  const loginData = require("../fixtures/Tc001loginData");

  beforeEach(() => {
    cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
    cy.visit("/", { timeout: 120000 });
    cy.loginCustomer(loginData.customer.email, loginData.customer.password);
  });

   describe("Select wine and check predictions", () => {
  const loginData = require("../fixtures/Tc001loginData");
  
  beforeEach(() => {
    cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
    cy.visit("/", { timeout: 120000 });
    cy.loginCustomer(loginData.customer.email, loginData.customer.password);
  });

  it('Select "Tinto 2020" from Select Wine and verify predictions list has records', () => {
    const targetWine = 'Tinto 2020';

    // Navegar a la página de summary (clic en Summary del primer vino)
    cy.get('p-table .p-datatable-tbody tr, .table tbody tr', { timeout: 15000 })
      .first()
      .within(() => {
        cy.get('p-button[label="Summary"]', { timeout: 10000 }).then($pb => {
          const inner = $pb.find('button');
          if (inner.length) cy.wrap(inner.first()).click();
          else cy.wrap($pb).click();
        });
      });

    // Asegurar página de summary
    cy.url({ timeout: 10000 }).should('include', '/summary');

    // Mostrar el selector de vinos pulsando Select Wine
    cy.contains('button, p-button', 'Select Wine', { timeout: 10000 })
      .then($el => {
        const inner = $el.find('button');
        if (inner.length) cy.wrap(inner.first()).click();
        else cy.wrap($el).click();
      });

    // Localizar listbox y seleccionar el item. Retry implícito por Cypress.
    cy.get('#pListBox, .p-listbox, p-listbox', { timeout: 10000 })
      .first()
      .should('be.visible')
      .then($lb => {
        // buscar el elemento que coincide exactamente con el texto
        const item = $lb.find('li, .p-listbox-item, .p-listbox-list li, div.p-listbox-item')
          .filter((i, el) => (el.textContent || '').trim() === targetWine)
          .first();

        if (item.length) {
          // intentar click normal y como fallback dar un click forzado adicional
          cy.wrap(item).click();
          cy.wrap(item).click({ force: true });
        } else {
          // fallback: contains + force click
          cy.wrap($lb).contains(targetWine, { timeout: 7000 }).click({ force: true });
        }
      });

    // Esperar que el nombre seleccionado se refleje en el header (#wineName) o en el propio listbox highlight
    cy.get('#wineName, #pListBox .p-listbox-item.p-highlight, .p-listbox .p-listbox-item.p-highlight', { timeout: 10000 })
      .should($els => {
        const txt = $els.text();
        if (!txt || !txt.includes(targetWine)) {
          throw new Error(`Seleccion no reflejada: esperada "${targetWine}", encontrado "${txt.trim()}"`);
        }
      });

    // Ahora comprobar que las predicciones se muestran en la tabla.
    const rowsSelector = [
      'p-table table tbody tr',
      'p-table .p-datatable-tbody tr',
      '.table tbody tr',
      '.p-datatable-tbody tr'
    ].join(',');

    // Esperar hasta 20s a que aparezcan filas. Si aparece "No data" fallar con mensaje claro.
    cy.get('body', { timeout: 20000 }).then($body => {
      const noDataPresent = $body.find('#noData, b#noData, .p-datatable-emptymessage').length > 0;
      if (noDataPresent) {
        throw new Error(`No predictions found for "${targetWine}" (found empty message in DOM)`);
      }
      cy.get(rowsSelector, { timeout: 20000 })
        .should('exist')
        .should($rows => {
          if ($rows.length === 0) {
            throw new Error(`No prediction rows rendered for "${targetWine}" after waiting`);
          }
        })
        .then($rows => {
          cy.log(`Predictions visible rows: ${$rows.length}`);
        });
    });

   
    // clicar el botón Delete del primer prediction
    cy.get(rowsSelector, { timeout: 10000 })
      .first()
      .within(() => {
        // selector por el tooltip o por la clase
        cy.get('button[pTooltip="Delete this prediction"], button.icon-button')
          .filter(':visible')
          .first()
          .click();
      });

    // aceptar el confirm dialog (botón "Yes") si aparece
    cy.get('div.p-confirm-dialog, .p-confirm-dialog, p-confirmDialog, .ui-confirmdialog', { timeout: 10000 })
      .filter(':visible')
      .first()
      .then($dlg => {
        if ($dlg.length) {
          cy.wrap($dlg).contains('button', 'Yes', { timeout: 10000 }).click();
        } else {
          cy.log('No confirm dialog appeared');
        }
      });

    // comprobar toast de éxito
    cy.get('.p-toast-message-success', { timeout: 10000 }).should('be.visible');



  });
});


})