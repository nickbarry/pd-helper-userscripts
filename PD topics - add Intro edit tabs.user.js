// ==UserScript==
// @name         PD topics - add Intro edit tabs
// @namespace    http://nicholasbarry.com/
// @version      0.1
// @downloadURL  https://github.com/nickbarry/pd-helper-userscripts/raw/master/PD%20topics%20-%20add%20Intro%20edit%20tabs.user.js
// @description  Adds "Edit" tabs to the topic intro pages, when in Configure mode
// @author       Nicholas Barry
// @match        http://*.peakdemocracy.com/customers/*/accounts/*/portals/*/forums/*/issues/*?field=Intro+*
// @grant        none
// ==/UserScript==

if(window.location.href.indexOf("/edit") == -1){
    var baseUrlEndpoint = window.location.href.indexOf("?");
}else{
    var baseUrlEndpoint = window.location.href.indexOf("/edit");
}

var baseUrl = window.location.href.substring(0,baseUrlEndpoint),
    navTabs = document.getElementsByClassName('nav-tabs')[0],
    editHtmlA = document.createElement("a"),
    editPdfA = document.createElement("a");

// Add href to link elements
editHtmlA.href = baseUrl + "/edit?field=Intro+%28html%29";
editPdfA.href = baseUrl + "/edit?field=Intro+%28PDF%29";

// Append new links
navTabs.appendChild(document.createElement("li")).appendChild(editHtmlA).appendChild(document.createTextNode("Edit HTML Intro"));
navTabs.appendChild(document.createElement("li")).appendChild(editPdfA).appendChild(document.createTextNode("Edit PDF Intro"));