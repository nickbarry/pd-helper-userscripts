// ==UserScript==
// @name         PD Client DB page - Larger Notes field
// @namespace    http://nicholasbarry.com
// @version      0.1
// @downloadURL  https://github.com/nickbarry/pd-helper-userscripts/raw/master/PD%20Client%20DB%20page%20-%20Larger%20Notes%20field.user.js
// @description  Enlarges the Client Notes text area
// @author       Nicholas Barry
// @match        http*://www.peakdemocracy.com/admin/clients/*/edit
// @grant        none
// ==/UserScript==

var notes = document.getElementById("client_notes");
notes.setAttribute("rows",25);
notes.setAttribute("class","span10");