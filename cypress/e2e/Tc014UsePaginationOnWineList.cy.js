describe("Wine table pagination", () => {
  const loginData = require("../fixtures/Tc001loginData");

  beforeEach(() => {
    cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
    cy.visit("/", { timeout: 120000 });
    cy.loginCustomer(loginData.customer.email, loginData.customer.password);
  });

  it("should navigate pages and change visible rows", () => {
    const rowsSelector = [
      'p-table table tbody tr',
      'p-table .p-datatable-tbody tr',
      '.table tbody tr',
      '.p-datatable-tbody tr'
    ].join(',');

    // asegurar tabla y paginador (si lo hay)
    cy.get(rowsSelector, { timeout: 15000 }).should('exist');
    cy.get('div.p-paginator, .p-paginator', { timeout: 10000 }).should('exist');

    // helper: obtener nombres visibles en la columna Name (2ª td)
    const getVisibleNames = () =>
      cy.get(rowsSelector, { timeout: 10000 })
        .then($rows => Array.from($rows)
          .map(r => (r.querySelector('td:nth-child(2)') || { textContent: '' }).textContent.trim())
          .filter(Boolean)
        );

    // comprobar rows por página no exceden el tamaño (fallback 10)
    cy.get(rowsSelector).its('length').then(len => {
      expect(len).to.be.lte(10); // seguridad: si tu rows por página es 5 o 4, se cumple
    });

    // guardar nombres de la primera página
    getVisibleNames().then(namesPage1 => {
      cy.log('Page 1 names:', namesPage1.join(' | '));

      // click "next" en el paginador (varios selectores fallback)
      cy.get('body').then($body => {
        const nextSel = [
          '.p-paginator .p-paginator-next',
          '.p-paginator-next',
          'button.p-paginator-next',
          'a.p-paginator-next',
          'button[aria-label="Next"]'
        ].find(sel => $body.find(sel).length);

        if (!nextSel) {
          throw new Error('No se encontró botón "next" del paginador');
        }

        cy.get(nextSel).filter(':visible').first().click();
      });

      // esperar recarga y comprobar que los nombres cambian
      cy.wait(600);
      getVisibleNames().then(namesPage2 => {
        cy.log('Page 2 names:', namesPage2.join(' | '));
        // Es suficiente que el array no sea idéntico
        expect(namesPage2).to.not.deep.equal(namesPage1);

        // volver a la página anterior
        cy.get('body').then($body => {
          const prevSel = [
            '.p-paginator .p-paginator-prev',
            '.p-paginator-prev',
            'button.p-paginator-prev',
            'a.p-paginator-prev',
            'button[aria-label="Previous"]'
          ].find(sel => $body.find(sel).length);

          if (!prevSel) {
            throw new Error('No se encontró botón "prev" del paginador');
          }

          cy.get(prevSel).filter(':visible').first().click();
        });

        // esperar recarga y verificar que volvemos a los nombres originales
        cy.wait(600);
        getVisibleNames().then(namesBack => {
          cy.log('Back to page names:', namesBack.join(' | '));
          expect(namesBack).to.deep.equal(namesPage1);
        });
      });
    });
  });
});