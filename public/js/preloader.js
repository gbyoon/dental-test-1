$(window).load(function(){
	$("#loading").delay(100).fadeOut();
	$("#loading-center").delay(2).fadeOut("slow");
	
	
	$(".circle").click(function(){
		$(".circle_demo").stop();
	});
	
});

$(document).ready(function(){

	setTimeout(function(){
		$('#loader-out').fadeOut();
	}, 300);	
});

