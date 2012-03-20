
/**
 * Module dependencies.
 */

var Base = require('./base')
  , cursor = Base.cursor
  , color = Base.color;

/**
 * Expose `Spec`.
 */

exports = module.exports = Spec;

/**
 * Initialize a new `Spec` test reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function Spec(runner) {
  Base.call(this, runner);

  var self = this
    , stats = this.stats
    , indents = 0
    , n = 0;

  function indent() {
    return Array(indents).join('  ')
  }

  runner.on('start', function(){
    process.stdout.write('\n');
  });

  runner.on('suite', function(suite){
    ++indents;
    process.stdout.write(color('suite', '%s%s'), indent(), suite.title+'\n');
  });

  runner.on('suite end', function(suite){
    --indents;
    if (1 == indents) process.stdout.write('\n');
  });

  runner.on('test', function(test){
    process.stdout.write(indent() + color('pass', '  ◦ ' + test.title + ': '));
  });

  runner.on('pending', function(test){
    var fmt = indent() + color('pending', '  - %s');
    process.stdout.write(fmt, test.title+'\n');
  });

  runner.on('pass', function(test){
    if ('fast' == test.speed) {
      var fmt = indent()
        + color('checkmark', '  ✓')
        + color('pass', ' %s ');
      cursor.CR();
      process.stdout.write(fmt, test.title+'\n');
    } else {
      var fmt = indent()
        + color('checkmark', '  ✓')
        + color('pass', ' %s ')
        + color(test.speed, '(%dms)');
      cursor.CR();
      process.stdout.write(fmt, test.title, test.duration+'\n');
    }
  });

  runner.on('fail', function(test, err){
    cursor.CR();
    process.stdout.write(indent() + color('fail', '  %d) %s'), ++n, test.title+'\n');
  });

  runner.on('end', self.epilogue.bind(self));
}

/**
 * Inherit from `Base.prototype`.
 */

Spec.prototype.__proto__ = Base.prototype;
