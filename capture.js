var page 	= require('webpage').create();
var system 	= require('system');

var url 	= system.args[1];
var size 	= system.args[2];

/* screen width */
if (size == 'phone') {
	page.viewportSize = { width: 320, height: 568 };
}
else if(size == 'tablet'){
	page.viewportSize = { width: 768, height: 1024 };
}
else if(size > 0){
  page.viewportSize = { width: size, height: size };
}
else{
	page.viewportSize = { width: 1920, height: 1080 };
}

/* disable jQuery errors */
page.onError = function(msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }
};

/* clean file name */
function slugify(txt){
    return txt
    .replace('http://', '')
    .replace('https://', '')
    .replace('www.', '')
    .replace('.', '-')
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'');
}

/* image path */
function imagePath(){
  if (!size) {
    size = 'desktop';
  };
  return './images/'+slugify(url)+'_'+size+'.jpg';
}

/* capture page */
function capture(){
	return page.render(imagePath());	
}

/* open url and capture */
page.open(url, function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    capture()
    console.log('Image can be found in: '+imagePath())
  }
  else{
    console.log('Could not load page');
  }
  phantom.exit();
});