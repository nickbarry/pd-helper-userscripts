// ==UserScript==
// @name         PD Client DB page - Larger Notes field
// @namespace    http://nicholasbarry.com
// @version      0.1
// @description  Enlarges the Client Notes text area
// @author       Nicholas Barry
// @match        http*://www.peakdemocracy.com/admin/clients/*/edit
// @grant        none
// ==/UserScript==

var notes = document.getElementById("client_notes");
notes.setAttribute("rows",25);
notes.setAttribute("class","span10");