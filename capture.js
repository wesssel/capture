var $ = require('jquerygo');
var prompt = require('prompt');
var async = require('async');
var x = {};


var capture = function(fileName) {
  return function(done) {
    var dir = __dirname + '/images';
    $.capture(dir + '/' + fileName + '.jpg', done);
  }
}

/* clean file name */
var fileName = function(url, width){
  var stripUrl = url.replace('http://', '').replace('https://', '');
  var splitUrl = stripUrl.split('.');
  if (url.search("www.") != -1) {
    return splitUrl[1] + '_' + width;
  }
  else{
    return splitUrl[0] + '_' + width;
  }
}

prompt.start();

var getWebsite = function(){

  prompt.addProperties(x, ['website', 'width'], function (err) {

    $.config.width = x.width;
    $.config.height = x.width * 0.6;

    if (!x.website) {
      console.log('Error no website set'),
      $.close();
    };

    if (!x.width) {
      $.config.width = 1920;
      $.config.height = 1080;
    };

    async.series([
      $.go('visit', x.website),
      capture(fileName(x.website, $.config.width))
    ], function() {
      $.close();
    });

  })

}

async.series([
  getWebsite
]);

