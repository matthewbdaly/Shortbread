/*jslint node: true */
'use strict';

// Declare variables used
var app, client, express, port, redis, shortid;

// Define values
express = require('express');
app = express();
port = process.env.port || 5000;
redis = require('redis');
client = redis.createClient();
shortid = require('shortid');

// Set up templating
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

// Define index route
app.get('/', function (req, res) {
    res.render('index');
});

// Define submit route
app.post('/', function (req, res) {
    // Declare variables
    var url, id;

    // Get URL
    url = req.param('url');

    // Create a hashed short version
    id = shortid.generate();

    // Store them in Redis
    client.set(id, url, function () {
        // Display the response
        res.render('output', { id: id });
    });
});

// Serve static files
app.use(express.static(__dirname + '/static'));

// Listen
app.listen(port);
console.log('Listening on port ' + port);
