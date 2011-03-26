var jasmine = require('jasmine');

// have this global so we can use for debugging purposes
sys = require('sys');

for(var key in jasmine) {
  global[key] = jasmine[key];
}

var isVerbose = false;
var showColors = true;

process.argv.forEach(function(arg){
  switch(arg) {
    case '--color': showColors = true; break;
    case '--noColor': showColors = false; break;
    case '--verbose': isVerbose = true; break;
  }
});

jasmine.executeSpecsInFolder(__dirname + '/specs', function(runner, log){
  if (runner.results().failedCount == 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
},
  isVerbose, showColors);