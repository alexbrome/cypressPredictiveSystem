const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    screenshotOnRunFailure : true, //Carpeta si el test falla, se toma captura
    screenshotsFolder : "cypress/screenshots", //Carpeta de capturas
  },
});
