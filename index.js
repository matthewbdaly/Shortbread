/*jslint node: true */
'use strict';

// Declare variables used
var app, client, express, port, redis;

// Define values
express = require('express');
app = express();
port = process.env.port || 5000;
redis = require('redis');
client = redis.createClient();

// Set up templating
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

// Define index route
app.get('/', function (req, res) {
    res.render('index');
});

// Serve static files
app.use(express.static(__dirname + '/static'));

// Listen
app.listen(port);
console.log('Listening on port ' + port);
