const express = require('express');
const { enableProdMode } = require('@angular/core');
const { join } = require('path');

const app = express();

// Enable production mode
enableProdMode();

// Path to the Angular app
const DIST_FOLDER = join(process.cwd(), 'dist/gujarat-uvach');

// Dynamically import the Angular server-side module
async function getAngularServerModule() {
  const { AppServerModuleNgFactory } = await import(join(DIST_FOLDER, 'server/main.mjs'));
  const { ngExpressEngine } = await import('@nguniversal/express-engine');

  // Set up the view engine using Angular's Universal engine
  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
  }));

  app.set('view engine', 'html');
  app.set('views', join(DIST_FOLDER, 'browser'));
}

// Call the dynamic import
getAngularServerModule();

// Serve static files
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y',
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Export as a Netlify function
exports.handler = app;
