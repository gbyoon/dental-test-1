$(window).load(function(){
	$("#loading").delay(1000).fadeOut();
	$("#loading-center").delay(2).fadeOut("slow");
	
	
	$(".circle").click(function(){
		$(".circle_demo").stop();
	});
	
});

$(document).ready(function(){
// Handler for .ready() called.

	setTimeout(function(){
		$('#loader-out').fadeOut();
	}, 3000);	
});

