const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || 'http://localhost:4200',
    setupNodeEvents(on, config) {
     
    },
    screenshotOnRunFailure : true, //Carpeta si el test falla, se toma captura
    screenshotsFolder : "cypress/screenshots", //Carpeta de capturas
  },
});
