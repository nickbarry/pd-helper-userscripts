// ==UserScript==
// @name         PD Client Topics page modifications
// @namespace    http://nicholasbarry.com/
// @version      0.2
// @updateURL    https://github.com/nickbarry/pd-helper-userscripts/raw/master/PD%20Client%20Topics%20page%20modifications.user.js
// @downloadURL  https://github.com/nickbarry/pd-helper-userscripts/raw/master/PD%20Client%20Topics%20page%20modifications.user.js
// @description  Adds more links to the table of topics
// @author       Nicholas barry
// @match        http://*.peakdemocracy.com/customers/*/accounts/*/portals/*/forums/*/issues
// @match        http://*.peakdemocracy.com/customers/*/accounts/*/portals/*/forums/*/issues?admin_mode=on
// @grant        none
// ==/UserScript==

// Ignore the admin mode string on the url, if it exists
var issuesStr = window.location.href.indexOf("issues"),
    baseUrl = window.location.href.substring(0,issuesStr+6),
    rows = document.getElementsByClassName('drag-row');

// resize 2nd column
rows[0].children[1].style.width = "300px";

// Add cells to each row
for (var i = 0, len = rows.length; i < len; i++) {
	var topicID = rows[i].id.substring(9),
			settingsTd, editSettingsLink, editSettingsText, introTd, editIntroLink, editIntroText;
	
	// Hide unnecessary cell
	rows[i].children[0].style.display = "none";
	
	// Create and insert link to edit settings of topic
	settingsTd = document.createElement('td');
    editSettingsLink = document.createElement("a");
	editSettingsLink.href = baseUrl + '/Issue_' + topicID + '/edit';
	editSettingsText = document.createTextNode('edit Settings');
	editSettingsLink.appendChild(editSettingsText);
    editSettingsLink.style.marginRight = "5px";
    settingsTd.appendChild(editSettingsLink);
	rows[i].appendChild(settingsTd);
    
    // Create and insert link to edit introduction of topic
	introTd = document.createElement('td');
    editIntroLink = document.createElement("a");
	editIntroLink.href = baseUrl + '/Issue_' + topicID + '/edit?field=Intro+%28html%29';
	editIntroText = document.createTextNode('edit Intro');
	editIntroLink.appendChild(editIntroText);
    editIntroLink.style.marginRight = "5px";
    introTd.appendChild(editIntroLink);
	rows[i].appendChild(introTd);
    
    // Create and insert link to edit Survey Questions of topic
    var questionsTd = document.createElement('td')
    if(rows[i].children[2].innerHTML == "Survey"){
        var questionsLink = document.createElement("a"),
            questionsText = document.createTextNode('Questions');
        questionsLink.href = baseUrl + '/Issue_' + topicID + '/survey_questions';
        questionsLink.appendChild(questionsText);
        questionsLink.style.marginRight = "5px";
        questionsTd.appendChild(questionsLink);
    }
    rows[i].appendChild(questionsTd);
    
}