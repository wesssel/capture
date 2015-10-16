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

function slugify(txt){
    return txt
    .replace('http://', '')
    .replace('www.', '')
    .replace('.', '-')
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'');
}

function capture(){
	if (!size) {
		size = 'desktop';
	};
	var image = './images/'+slugify(url)+'_'+size+'.jpg';
	return page.render(image);	
}

page.open(url, function(status) {
  capture()
  phantom.exit();
});