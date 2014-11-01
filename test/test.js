/*jslint node: true */
/*global describe: false */
/*global it: false */
"use strict";

// Declare the variables used
var expect = require('chai').expect,
    request = require('request'),
    server = require('../index');

// Server tasks
describe('server', function () {

    // Test the index route
    describe('Test the index route', function () {
        it('should return a page with the title Shortbread', function (done) {
            request.get({ url: 'http://localhost:5000' }, function (error, response, body) {
                expect(body).to.include('Shortbread');
                expect(response.statusCode).to.equal(200);
                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
            });
        });
    });
});
