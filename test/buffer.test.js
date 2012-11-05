/*!
 * buffer-concat - test/buffer.test.js
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

describe('buffer.test.js', function () {
  it('should cancat two buffer', function () {
    var b1 = new Buffer('hello');
    var b2 = new Buffer('你好');
    Buffer.concat([b1, b2]).toString().should.equal('hello你好');
  });

  it('should cancat one buffer', function () {
    Buffer.concat([new Buffer('你好')]).toString().should.equal('你好');
  });

  it('should cancat empty buffer', function () {
    Buffer.concat([]).toString().should.equal('');
  });

  it('should throw error when cancat not buffer list', function () {
    (function () {
      Buffer.concat([1, 2]);
    }).should.throw("Object 1 has no method 'copy'");
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

  it('should throw error when input list is not Array', function () {
    (function () {
      Buffer.concat();
    }).should.throw('Usage: Buffer.concat(list, [length])');
    (function () {
      Buffer.concat('');
    }).should.throw('Usage: Buffer.concat(list, [length])');
    (function () {
      Buffer.concat(new Buffer(''));
    }).should.throw('Usage: Buffer.concat(list, [length])');
  });
});
