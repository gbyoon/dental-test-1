$( document ).ready(function() {

   $('.overlay').keyup(function () { 
     var text = this.value;
     
     if (text.trim()){
       $(this).parent().find(".name").hide();
       $(this).css("display","block");
     }else{
       $(this).attr("style","");  
	   $(this).parent().find(".name").attr("style",""); 
     }
   }); 
   
   $('.svg-wrapper').mouseenter(function(){
	  $(this).addClass('active'); 
   });
   
   $('.svg-wrapper').mouseleave(function(){
	  var txtField = $(this).find('.overlay');
	  if(txtField.val()==''){ //마우스 오버를 풀었는데 입력창에 값이 없다면
		  $(this).removeClass('active');
	  } else { //값이 있으면
		  return true;
	  }
   });
   
   
   $("#cube").click(function(event){
	   
	  event.preventDefault();

		$(".svg-wrapper").fadeOut(1000);
		$(".svg-wrapper").addClass('form-success');
   });
   
   
   
   
});