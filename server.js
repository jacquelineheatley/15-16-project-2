// load dependencies 
var express = require("express");
var Sequelize = require("sequelize");
var session = require("express-session");
var exphbs = require('express-handlebars');
var path = require('path');
var routes = require('./controllers');
var helpers = require('./utils/helpers');
var dotenv = require('dotenv').config();

// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store)

// create database, make sure 'sqlite3' in package.json 
var sequelize = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: "./session.sqlite",
});

// configure express
var app = express();
app.use(
    session({
        secret: "keyboard cat",
        store: new SequelizeStore({
            db: sequelize,
        }),
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true, // if you do SSL outside of node.
    })
);
// continue as normal
r
app.use(
    session({
    secret: "secret",
    cookie: {
        secret: "meow",
        store: new SequelizeStore({
            db: sequelize, 
        }),
    },
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(`Now listening at http://localhost:${PORT}.`));
});