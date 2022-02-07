/* IMPORT DEPENDENCIES */
// Import stylesheets
const path = require('path');
// Import express
const express = require('express');
// Import express.session
const session = require('express-session');
// Import Handlebars.js
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// Import sequelize
const sequelize = require('./config/connection');
// Import sequelize store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// set session properties
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// allow the app to use express-session
app.use(session(sess));

const hbs = exphbs.create({});

// set handlebars as the apps template engine of choice
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allow the app to use stylesheet
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes
app.use(require('./controllers/'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
