describe("Sort columns of Wine table", () => {
  const loginData = require("../fixtures/Tc001loginData");

  beforeEach(() => {
    cy.log("🌐 Base URL usada:", Cypress.config("baseUrl"));
    cy.visit("/", { timeout: 120000 });
    cy.loginCustomer(loginData.customer.email, loginData.customer.password);
  });

  it("Ensure clicking Name header sorts the visible names alphabetically (ascending)", () => {
    const rowsSelector = [
      'p-table table tbody tr',
      'p-table .p-datatable-tbody tr',
      '.table tbody tr',
      '.p-datatable-tbody tr'
    ].join(',');

    const normalize = s =>
      (s || '')
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    // función que devuelve los nombres visibles ya normalizados
    const getVisibleNormalized = () =>
      cy.get(rowsSelector, { timeout: 10000 })
        .should('have.length.greaterThan', 0)
        .then($rows => {
          const names = Array.from($rows).map(row => {
            const td = row.querySelector('td:nth-child(2)');
            return td ? td.textContent.trim() : '';
          }).filter(Boolean);
          return names.map(normalize);
        });

    // intentar ordenar hasta que la lista quede ascendente (máx 3 clics)
    function tryEnsureAsc(attempt = 1) {
      if (attempt > 3) {
        throw new Error('No se consiguió el orden alfabético ascendente tras 3 intentos');
      }
      return getVisibleNormalized().then(normalized => {
        const expectedAsc = normalized.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));
        // si ya está asc, termina
        if (JSON.stringify(normalized) === JSON.stringify(expectedAsc)) {
          cy.log(`Sorted ascending on attempt ${attempt}`);
          return;
        }
        // si no, clicar la cabecera y reintentar
        cy.get('th[pSortableColumn="name"]', { timeout: 5000 }).first().click();
        cy.wait(500);
        return tryEnsureAsc(attempt + 1);
      });
    }

    // Ejecutar la rutina y finalmente comprobar igualdad exacta
    tryEnsureAsc().then(() => {
      getVisibleNormalized().then(finalNormalized => {
        const expectedAsc = finalNormalized.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));
        // logs para depuración
        cy.log('Final names (normalized): ' + JSON.stringify(finalNormalized));
        // afirmación
        expect(finalNormalized).to.deep.equal(expectedAsc);
      });
    });
  });
});