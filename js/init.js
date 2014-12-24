
$(function(){
	window.ffurl = "http://testwebsite.mydomain.tld"; 
	window.ffhost = "mydomain.tld";
	window.ffbase = "http://siteconfig.mydomain.tld";
	$("a").on("click", function(e) {return false;}); // prevents a elements from being selected..
	var myExampleClickHandler = function (element) { 
		console.log("Clicked element:", element); 
	}
	var myDomOutline = DomOutline({ namespace: "FFSelector", onClick: myExampleClickHandler, filter: false});
	window.ffdomoutline = myDomOutline;
	myDomOutline.start();
});
function listener(event) {
  if (event.data.name == 'toggle_css') {
    $('link[rel~="stylesheet"]').prop('disabled', event.data.disabled);
    window.ffdomoutline.element = window.ffdomoutline.selected;
    window.ffdomoutline.updateOutlinePosition('click');
    return false;
  }else{
    console.log('Unknown message received by main page listener');
    console.log(event.data);
    console.log('Discarded...');
  }
}
if (document.addEventListener){
  console.log ('addEventListener');
  addEventListener("message", listener, false)
} else {
  console.log('attachEvent');
  attachEvent("onmessage", listener)
}
