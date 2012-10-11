/*!
 * buffer-concat - test/index.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

require('../');
var should = require('should');
var http = require('http');

describe('index.test.js', function () {
  it('should cancat two buffer', function () {
    var b1 = new Buffer('hello');
    var b2 = new Buffer('你好');
    Buffer.concat([b1, b2]).toString().should.equal('hello你好');
  });

  it('should cancat chunks with size', function (done) {
    var options = {
      host: 'nodejs.org'
    };
    http.get(options, function (res) {
      var chunks = [];
      var size = 0;
      res.on('data', function (chunk) {
        size += chunk.length;
        chunks.push(chunk);
      });
      res.on('end', function () {
        var data = Buffer.concat(chunks, size);
        data.toString().should.include('<title>node.js</title>');
        done();
      });
    });
  });
});
