/*x-ray누르면 사진 이미지 나오게*/

function showMyImage(fileInput){
	var files = fileInput.files;
	for(var i = 0; i<files.length; i++){
		
		var file = files[i];
		
		var imageType = /image.*/;
		
		if(!file.type.match(imageType)){
			continue;
		}
		
		var img=document.getElementById("thumbnil");
		
		img.file = file;
		
		var reader = new FileReader();
		
		reader.onload = (function(aImg){
			return function(e){
				aImg.src = e.target.result;
			};
			
		})(img);
		
		reader.readAsDataURL(file);
	}
}

/*옆에 사이드 메뉴*/
function openNav() {
	document.getElementById("mySidenav").style.width = "20%";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0%";
}

/*애니메이티드 전체 메뉴*/

function myFunction(x) {
	x.classList.toggle("change");
}

/*아이콘 카드*/
function iconopenNav(){
	document.getElementById("iconmyNav").style.width = "100%";
}

function iconcloseNav(){
	document.getElementById("iconmyNav").style.width = "0%";
}


/*캘린더*/
function calenopenNav() {
	document.getElementById("calendarmyNav").style.height = "100%";
}

function calencloseNav() {
	document.getElementById("calendarmyNav").style.height = "0%";
}

/*날짜 1개*/

	
$(function() {
  $( "#registerdate" ).datepicker({

  });
});
	








	



