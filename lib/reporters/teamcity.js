
/**
 * Module dependencies.
 */

var Base = require('./base');

/**
 * Expose `Teamcity`.
 */

exports = module.exports = Teamcity;

/**
 * Initialize a new `Teamcity` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function Teamcity(runner) {
  Base.call(this, runner);
  var stats = this.stats;

  runner.on('start', function() {
    process.stdout.write("##teamcity[testSuiteStarted name='mocha.suite']"+'\n');
  });

  runner.on('test', function(test) {
    process.stdout.write("##teamcity[testStarted name='%s']", escape(test.fullTitle())+'\n');
  });

  runner.on('fail', function(test, err) {
    process.stdout.write("##teamcity[testFailed name='%s' message='%s']", escape(test.fullTitle()), escape(err.message)+'\n');
  });

  runner.on('pending', function(test) {
    process.stdout.write("##teamcity[testIgnored name='%s' message='pending']", escape(test.fullTitle())+'\n');
  });

  runner.on('test end', function(test) {
    process.stdout.write("##teamcity[testFinished name='%s' duration='%s']", escape(test.fullTitle()), test.duration+'\n');
  });

  runner.on('end', function() {
    process.stdout.write("##teamcity[testSuiteFinished name='mocha.suite' duration='%s']", stats.duration+'\n');
  });
}

/**
 * Escape the given `str`.
 */

function escape(str) {
  return str.replace(/'/g, "|'");
}