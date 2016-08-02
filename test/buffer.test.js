/*!
 * buffer-concat - test/buffer.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var bufferConcat = require('../');

describe('concat-buffer', function () {
  it('should concat two buffer', function () {
    var b1 = new Buffer('hello');
    var b2 = new Buffer('你好');
    bufferConcat([b1, b2]).toString().should.equal('hello你好');
  });

  it('should concat one buffer', function () {
    bufferConcat([new Buffer('你好')]).toString().should.equal('你好');
  });

  it('should concat empty buffer', function () {
    bufferConcat([]).toString().should.equal('');
  });

  it('should throw error when concat not buffer list', function () {
    (function () {
      bufferConcat([1, 2]);
    }).should.throw(TypeError);
  });

  it('should concat chunks with size', function () {
    var text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
    var size = text.length;
    var chunks = [
      new Buffer(text.substring(0, 18)),
      new Buffer(text.substring(18, 19)),
      new Buffer(text.substring(19, 43)),
      new Buffer(text.substring(43, 50)),
      new Buffer(text.substring(50, 67)),
      new Buffer(text.substring(67, 69)),
      new Buffer(text.substring(69))
    ];

    bufferConcat(chunks, size).toString().should.equal(text);
  });

  it('should throw error when input list is not Array', function () {
    (function () {
      bufferConcat();
    }).should.throw('Usage: bufferConcat(list, [length])');
    (function () {
      bufferConcat('');
    }).should.throw('Usage: bufferConcat(list, [length])');
    (function () {
      bufferConcat(new Buffer(''));
    }).should.throw('Usage: bufferConcat(list, [length])');
  });
});

describe('polyfill', function () {
  it('should polyfill upon request', function () {
    var oldConcat = Buffer.concat;
    delete Buffer.concat;

    require('../polyfill');
    delete require.cache[require.resolve('../polyfill')];

    Buffer.concat.should.equal(bufferConcat);
    delete Buffer.concat;

    Buffer.concat = oldConcat;
  });
});
