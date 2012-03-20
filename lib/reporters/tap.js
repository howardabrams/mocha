
/**
 * Module dependencies.
 */

var Base = require('./base')
  , cursor = Base.cursor
  , color = Base.color;

/**
 * Expose `TAP`.
 */

exports = module.exports = TAP;

/**
 * Initialize a new `TAP` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function TAP(runner) {
  Base.call(this, runner);

  var self = this
    , stats = this.stats
    , total = runner.total
    , n = 1;

  runner.on('start', function(){
    process.stdout.write('%d..%d', 1, total+'\n');
  });

  runner.on('test end', function(){
    ++n;
  });

  runner.on('pending', function(test){
    process.stdout.write('ok %d %s # SKIP -', n, title(test)+'\n');
  });

  runner.on('pass', function(test){
    process.stdout.write('ok %d %s', n, title(test)+'\n');
  });

  runner.on('fail', function(test, err){
    process.stdout.write('not ok %d %s', n, title(test)+'\n');
    process.stdout.write(err.stack.replace(/^/gm, '  ')+'\n');
  });
}

/**
 * Return a TAP-safe title of `test`
 *
 * @param {Object} test
 * @return {String}
 * @api private
 */

function title(test) {
  return test.fullTitle().replace(/#/g, '');
}
