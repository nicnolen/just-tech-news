// Import dependencies
// Import express
const express = require('express');
// Import sequelize
const sequelize = require('./config/connection');
// Import Handlebars.js
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// Import routes
const routes = require('./controllers/');

// Import stylesheets
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// set handlebars as the apps template engine of choice
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allow the app to use stylesheet
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
