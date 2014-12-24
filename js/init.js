
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
