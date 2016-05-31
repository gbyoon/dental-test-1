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