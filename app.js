'use strict';

// Import our requirements
var express = require('express');
var path = require('path');
var logger = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var strftime = require('strftime');

// Create our express app
var app = express();

//------------- App configuration

// Configure our templating engine: nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
}).addFilter('prettyDate', function(dateObject) {
    return strftime('%A, %b. %e at %l:%M%P', dateObject);
});

// Use 'development' level of logging, ie. verbose
if (process.env.NODE_ENV !== 'testing') {
  app.use(logger('dev'));
}

// Serve images, css, and client-side js about of the
// directory named 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Parse the body of incoming requests by default.
// This means we can access the parameters of submitted
// forms and such.
app.use(bodyParser.urlencoded({extended: true}));


//------------- Adding routes to controllers


// Import our controllers
var indexControllers = require('./controllers/index');
var aboutControllers = require('./controllers/about');
var eventControllers = require('./controllers/events');

// Add routes mapping URLs to controllers
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/events', eventControllers.listEvents);
app.get('/events/new', eventControllers.newEvent);
app.post('/events/new', eventControllers.saveEvent);

module.exports = app;