/*jslint node: true */
'use strict';

// Declare variables used
var app, bodyParser, client, express, port, redis, shortid;

// Define values
express = require('express');
app = express();
port = process.env.port || 5000;
redis = require('redis');
client = redis.createClient();
client.select(1);
shortid = require('shortid');
bodyParser = require('body-parser');

// Set up templating
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

// Handle POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Define index route
app.get('/', function (req, res) {
    res.render('index');
});

// Define submit route
app.post('/', function (req, res) {
    // Declare variables
    var url, id;

    // Get URL
    url = req.body.url;

    // Create a hashed short version
    id = shortid.generate();

    // Store them in Redis
    client.set(id, url, function () {
        // Display the response
        res.render('output', { id: id });
    });
});

// Define link route
app.route('/:id').all(function (req, res) {
    // Get ID
    var id = req.params.id.trim();

    // Look up the URL
    client.get(id, function (err, reply) {
        if (!err && reply) {
            // Redirect user to it
            res.status(301);
            res.set('Location', reply);
            res.send();
        } else {
            // Confirm no such link in database
            res.status(404);
            res.render('error');
        }
    });
});

// Serve static files
app.use(express.static(__dirname + '/static'));

// Listen
app.listen(port);
console.log('Listening on port ' + port);
