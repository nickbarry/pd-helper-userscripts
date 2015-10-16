// ==UserScript==
// @name         PD Topics: Questions table: Splitting up Edit and Delete links
// @namespace    http://nicholasbarry.com
// @version      0.1
// @downloadURL  https://github.com/nickbarry/pd-helper-userscripts/raw/master/PD%20Topics-%20Questions%20table-%20Splitting%20up%20Edit%20and%20Delete%20links.user.js
// @description  Separates the Edit and Delete links into two separate cells so they never stack
// @author       Nicholas Barry
// @match        http://www.peakdemocracy.com/customers/*/accounts/*/portals/*/forums/*/issues/*/survey_questions
// @grant        none
// ==/UserScript==

var rows = document.getElementById("questions").children,
    separateDeleteLink = function(row){
        //You are looking for row.lastElementChild
        // Notice that DOM is composed from nodes. Node are not just elements, but also spaces, texts and another junk that you might not want to work with.
        //var deleteCell = row.children[row.children.length-1];
        var deleteCell = row.lastElementChild;
        if(deleteCell.children.length == 2){
            var deleteLink = deleteCell.children[1];
            row.appendChild(document.createElement("td")).appendChild(deleteLink);
        }
    };

[].forEach.call(rows,separateDeleteLink);

