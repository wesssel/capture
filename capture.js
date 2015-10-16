var page 	= require('webpage').create();
var system 	= require('system');

var url 	= system.args[1];
var size 	= system.args[2];

if (size == 'phone') {
	page.viewportSize = { width: 320, height: 568 };
}
else if(size == 'tablet'){
	page.viewportSize = { width: 768, height: 1024 };
}
else{
	page.viewportSize = { width: 1920, height: 1080 };
}

capture = function(){
	var image = './images/'+url.replace('http://', '')+'_'+size+'.jpg';
	return page.render(image);	
}

page.open(url, function(status) {
  capture()
  phantom.exit();
});