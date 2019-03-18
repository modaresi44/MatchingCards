

var NUM_CARDS = 28; // number of total cards 
var SRC_BACKCARDS = "images/back4.jpg";
var SRC_BACKDOWN = "images/back5.jpg";  
var SRC_SELECTED="images/back5.jpg";

var status = 0;
var selected_imgId = "";
var num_exist_cards = 0; //number of existing cards on the page

var item = {};
var array_arrange = [];

var array_logo = [
	{"src" : "images/logos/logo1.jpeg",  "tag" : "0"},
	{"src" : "images/logos/logo2.jpeg",  "tag" : "0"},
	{"src" : "images/logos/logo3.png",   "tag" : "0"},
	{"src" : "images/logos/logo4.jpeg",  "tag" : "0"},
	{"src" : "images/logos/logo5.png",   "tag" : "0"},
	{"src" : "images/logos/logo6.jpeg",  "tag" : "0"},
	{"src" : "images/logos/logo7.png",   "tag" : "0"},
	{"src" : "images/logos/logo8.png",   "tag" : "0"},
	{"src" : "images/logos/logo9.png",   "tag" : "0"},
	{"src" : "images/logos/logo10.png",  "tag" : "0"},
	{"src" : "images/logos/logo11.png",  "tag" : "0"},
	{"src" : "images/logos/logo12.png",  "tag" : "0"},
	{"src" : "images/logos/logo13.png",  "tag" : "0"},
	{"src" : "images/logos/logo14.png",  "tag" : "0"},
	{"src" : "images/logos/logo15.png",  "tag" : "0"},
	{"src" : "images/logos/logo16.png",  "tag" : "0"},
	{"src" : "images/logos/logo17.png",  "tag" : "0"},
	{"src" : "images/logos/logo18.png",  "tag" : "0"},
	{"src" : "images/logos/logo19.png",  "tag" : "0"},
	{"src" : "images/logos/logo20.png",  "tag" : "0"},
	{"src" : "images/logos/logo21.png",  "tag" : "0"},
	{"src" : "images/logos/logo22.jpeg", "tag" : "0"},
	{"src" : "images/logos/logo23.png",  "tag" : "0"},
	{"src" : "images/logos/logo24.png",  "tag" : "0"},
	{"src" : "images/logos/logo25.png",  "tag" : "0"},
	{"src" : "images/logos/logo26.png",  "tag" : "0"}
]; 
// This array saves all picture's name and each picture have an id number.
// The id of any picture is the index of this array.

 

function init(){
	document.getElementById("tbl_main").style.display = "none";
	document.getElementById("div_won").style.display = "none";
	makeArrayArrange(NUM_CARDS, array_arrange); 
	//window.addEventListener("resize", windowResize);
}

function makeArrayArrange(numCards, arrayArrange){
	for(var i = 0; i < numCards; i++){
		arrayArrange.push("");
	}
}

function windowResize() {
	setImagesHeight();
}

function setImagesHeight(){
	//alert(document.getElementById("img_10").style.outerheight);
	var imgId = "";
	for(var x = 0; x < NUM_CARDS; x++){
		imgId = getImgId(x);
   	}
  	var tdId = "";
	for(var x = 0; x < NUM_CARDS; x++){
		tdId = numToTdId(x);
		document.getElementById(tdId).style.height = 
		document.getElementById(tdId).style.width;
  	}
}

function startNewGame(){
	document.getElementById("btn_play").style.display = "none";
	document.getElementById("div_won").style.display = "none";
 	initArrayArrange(NUM_CARDS);
	showFrontAllCards(NUM_CARDS);
 
	setTimeout("showBackAllCards(NUM_CARDS, SRC_BACKCARDS)", 8000);
}
 

function showBackAllCards(cards, srcBack){
	// show back of all cards,c ards parameter = number of cards,  
	document.getElementById("tbl_main").style.display = "block";
	document.getElementById("div_won").style.display = "none";
	var imgId = "";
	for(var n = 0; n < cards; n++){
		imgId = getImgId(n);
		document.getElementById(imgId).src = srcBack;
		document.getElementById(imgId).style.visibility = "visible";
		document.getElementById(getTdId(imgId)).style.visibility = "visible";
		//document.getElementById(imgId).disabled = false;
		document.getElementById(imgId).removeAttribute('disabled');

 	}
}

function getImgId(num){
	return "img_" + ((num < 10) ? '0' + num.toString() : num.toString());
}

function numToTdId(num){
	return "td_" + ((num < 10) ? '0' + num.toString() : num.toString());
}

function initArrayArrange(cards){
	emptyArrayArrange(array_arrange);
	TagsOffArrayLogo(array_logo);

	status = 0;
	num_exist_cards = cards;

	//-----------pick 14 logos from array logo, put array[i].tag = 1
	cards = cards / 2;
	for(var j = 1; j <= cards; j++ ){
		var random_logo = 0;
		var stay = 1;
		while(stay){
			random_logo = Math.trunc(Math.random() * array_logo.length);
			//(Math.random() * ((max - min) + 1)) + min. get random number in (min,max)
			if(array_logo[random_logo].tag == 0){
				array_logo[random_logo].tag = 1;
				stay = 0;
			}
		} 
	}
	//--------------do arrange array_arrange 
	for(var i = 0; i < array_arrange.length; i++){
		var random_logo = 0;
		var stay = 1;
		while(stay){
			random_logo = Math.trunc(Math.random() * array_logo.length);
			if(array_logo[random_logo].tag == 1 || array_logo[random_logo].tag == 2 ){
				array_arrange[i] = random_logo;
				array_logo[random_logo].tag += 1;
				stay = 0;
			}
		}
	}
	//-------------------------------------
}

function showFrontAllCards(cards){
	// show front of all cards, cards parameter = number of cards,  
	document.getElementById("tbl_main").style.display = "block";
	document.getElementById("div_won").style.display = "none";
	var imgId = "";
	for(var i = 0; i < cards; i++){
		imgId = getImgId(i);
 		document.getElementById(imgId).src = array_logo[array_arrange[i]].src;
		document.getElementById(imgId).style.visibility = "visible";
		//document.getElementById(imgId).disabled = true;
 		document.getElementById(imgId).setAttribute('disabled', 'disabled');
 		document.getElementById(getTdId(imgId)).style.visibility = "visible";
  	}
}

function emptyArrayArrange(arrayArrange){
	for(var i = 0; i < arrayArrange.length; i++){
		arrayArrange[i] = "";
	}
}

function TagsOffArrayLogo(arrayLogo){
	for(var i = 0; i < arrayLogo.length; i++){
		arrayLogo[i].tag = 0;
	}
}

function cardMDown(obj){
	// event of onmousedown over a picture
 	obj.src = SRC_BACKDOWN;
 }

function cardMOver(tdId) {
	tdId.style.backgroundColor = "red";
	tdId.style.boxShadow = "0.4em 0.4em 0.3em red";
	tdId.style.backgroundColor = "red";
	document.getElementById(tdId).style.backgroundColor = "red";
	document.getElementById(tdId).style.boxShadow = "0.4em 0.4em 0.3em red";
}

function cardMLeave(obj) {
	obj.src = SRC_BACKDOWN;
	//obj.style.backgroundColor = "#909497";
	//obj.style.boxShadow = "0.3em 0.3em 0.3em #888888";
	//document.getElementById(obj).style.backgroundColor = "#909497";
	//document.getElementById(obj).style.boxShadow = "0.3em 0.3em 0.3em #888888";
}

function cardMUP(obj){
 	// event of onmouseup over a picture
	var status_temp = status; 
	if(status_temp == 0){
		//first card of two selected cards.
		status = 1;
		selected_imgId = obj.id;
		//-------change style to be a selected card----------
     	//--------------------------------------------
	} 
	if(status_temp == 1){
		status = 0;
		//-------change style to be a selected card-----------
   		//-------------------------------------------------
 	}
	if( status_temp == 1 && obj.id == selected_imgId ){
			//two selected cards are in the same place so deselect it.
 			obj.src = SRC_BACKCARDS;
 	} 
	var interval_2;
	if( status_temp == 1 && obj.id != selected_imgId ){ 
			//two selected cards are not in the same place.	
			// show front of two cards for few seconds.
			var num1 = getNumberFromImgId(obj.id);
			var num2 = getNumberFromImgId(selected_imgId);
			document.getElementById(obj.id).src = array_logo[array_arrange[num1]].src;
			document.getElementById(selected_imgId).src = array_logo[array_arrange[num2]].src;
			interval_2 = setTimeout(waitSecondsThenContinue,500,obj.id,selected_imgId);
	}
}


function hideTwoCards(imgId1, imgId2){
	document.getElementById(imgId1).style.visibility = "hidden";
	document.getElementById(imgId2).style.visibility = "hidden";

	document.getElementById(getTdId(imgId1)).style.visibility = "hidden";
	document.getElementById(getTdId(imgId2)).style.visibility = "hidden";
}

function getTdId(imgId){
	return "td" + imgId.substring(3);
}

function getNumberFromImgId(imgId){
	return Number(imgId.substring(4));
}

function waitSecondsThenContinue(imgId1, imgId2){
	//show back of the two cards
	document.getElementById(imgId1).src = SRC_BACKCARDS;
	document.getElementById(imgId2).src = SRC_BACKCARDS;
	var num1 = getNumberFromImgId(imgId1);
	var num2 = getNumberFromImgId(imgId2);
	if ( array_arrange[num1] == array_arrange[num2] ) {
		//the two selected cards have the same picture so do disapear them
		hideTwoCards(imgId1, imgId2);
		num_exist_cards -= 2;
		if(num_exist_cards == 0){
			// game finished and you won.
			document.getElementById("tbl_main").style.display = "none";
			document.getElementById("div_won").style.display = "block";
		}
	} else{
		//the two selected cards have different pictures so deselect them
		document.getElementById(imgId1).src = SRC_BACKCARDS;
		document.getElementById(imgId2).src = SRC_BACKCARDS;
  	}
}

//-----------------------------------------------------------------------------------
function deleteArrayArrangeItems(arrayArrange){
	for(var i = 0; i < arrayArrange.length; i++){
		arrayArrange.pop();
	}
}

function showArray(){
	var str1 = "";
	for(var i = 0; i < array_arrange.length; i++){
		//str1 = str1 + i + "=" + array_arrange[i] + ", ";
		str1 = str1 + array_arrange[i] + ", ";

	}
	alert(str1);
}

function showArrayLogo(){
	var str1 = "";
	for(var i = 0; i < array_logo.length; i++){
		str1 = str1 + i + "=" + array_logo[i].src + " " + array_logo[i].tag + ", ";
	}
	alert(str1);
}



