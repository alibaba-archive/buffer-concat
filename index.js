module.exports = process.env.BUFFER_CONCAT_COV ? require('./lib-cov/buffer') : require('./lib/buffer');