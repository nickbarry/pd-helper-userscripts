// ==UserScript==
// @name         PD Satisfaction Survey filter
// @namespace    http://nicholasbarry.com
// @version      0.1
// @downloadURL  https://github.com/nickbarry/pd-helper-userscripts/raw/master/PD%20Satisfaction%20Survey%20filter.user.js
// @description  Hides satisfaction surveys from clients of Rob's, and those with no comments
// @author       Nicholas Barry
// @match        http://www.peakdemocracy.com/admin/satisfaction_surveys*
// @grant        none
// ==/UserScript==

// Bookmarklet generator: http://ted.mielczarek.org/code/mozilla/bookmarklet.html

/*
var tableRows = document.getElementsByTagName("tr"),
		portalNum;

for(var i = 1, len = tableRows.length; i<len; i++){
	portalNum = tableRows[i].children[3].firstChild.innerHTML;
	if(!(portalNum == 93 | portalNum >= 198)){
		tableRows[i].style.display = "none";
	}else if(tableRows[i].children[1].innerHTML.length == 0){
		tableRows[i].style.display = "none";
	}
}
*/
function addClassesToRows(tr){
	var portalNum = tr.children[3].firstChild.innerHTML;
	if(!(portalNum == 93 | portalNum >= 198)){
		$(tr).addClass("nonclient");
	}else if(tr.children[1].innerHTML.length == 0){
		$(tr).addClass("no-comments");
	}
}
function toggleDisplay(){
	//console.log($(this).text());
	if($(this).text() == "Display hidden surveys"){
		//console.log(true);
		$('.nonclient').css('display','');
		$('.no-comments').css('display','');
		$(this).text("Hide surveys");
	}else{
		//console.log(false);
		$('.nonclient').css('display','none');
		$('.no-comments').css('display','none');
		$(this).text("Display hidden surveys");
	}
}

var rows = document.getElementsByTagName("tbody")[0].children;

[].forEach.call(rows,addClassesToRows);

// Initial display settings: Hide non-clients and rows without comments
$('.nonclient').css('display','none');
$('.no-comments').css('display','none');

var $displayButton = $('<button class="btn" id="displayButton">Display hidden surveys</button>').css({
	position: "fixed",
	top: 0,
	right: 0
});
$displayButton.appendTo($('body')).on('click',toggleDisplay);