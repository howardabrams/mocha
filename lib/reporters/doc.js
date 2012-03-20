
/**
 * Module dependencies.
 */

var Base = require('./base')
  , utils = require('../utils');

/**
 * Expose `Doc`.
 */

exports = module.exports = Doc;

/**
 * Initialize a new `Doc` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function Doc(runner) {
  Base.call(this, runner);

  var self = this
    , stats = this.stats
    , total = runner.total
    , indents = 2;

  function indent() {
    return Array(indents).join('  ');
  }

  runner.on('suite', function(suite){
    if (suite.root) return;
    ++indents;
    process.stdout.write('%s<section class="suite">', indent()+'\n');
    ++indents;
    process.stdout.write('%s<h1>%s</h1>', indent(), suite.title+'\n');
    process.stdout.write('%s<dl>', indent()+'\n');
  });

  runner.on('suite end', function(suite){
    if (suite.root) return;
    process.stdout.write('%s</dl>', indent()+'\n');
    --indents;
    process.stdout.write('%s</section>', indent()+'\n');
    --indents;
  });

  runner.on('pass', function(test){
    process.stdout.write('%s  <dt>%s</dt>', indent(), test.title+'\n');
    var code = utils.escape(clean(test.fn.toString()));
    process.stdout.write('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code+'\n');
  });
}

/**
 * Strip the function definition from `str`,
 * and re-indent for pre whitespace.
 */

function clean(str) {
  str = str
    .replace(/^function *\(.*\) *{/, '')
    .replace(/\s+\}$/, '');

  var spaces = str.match(/^\n?( *)/)[1].length
    , re = new RegExp('^ {' + spaces + '}', 'gm');

  str = str.replace(re, '');

  return str;
}