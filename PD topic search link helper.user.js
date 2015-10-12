// ==UserScript==
// @name         PD topic search link helper
// @namespace    http://nicholasbarry.com
// @version      0.1
// @description  Adds handy links to topic search pages, allowing me to quickly edit the settings and view the introductions to the displayed topics.
// @author       Nicholas Barry
// @match        http://*.com/customers/*/accounts/*/portals/*/peak_network?*commit=SEARCH*
// @grant        none
// ==/UserScript==

// Consider matching the url pattern below. I'll have to write new code for where the links get inserted, and maybe even the code for grabbing the displayed topics
// http://*.com/customers/*/accounts/*/portals/*/forums/Forum_*/issues/search?*commit=Search*

$(document).ready(function() {
	function createLinkPairsFromBaseUrls(){
		//console.log($(this));
		var baseUrl = $(this).attr('href'),
				editSettingsUrl = 'http://www.peakdemocracy.com/customers/4/accounts/2' + baseUrl.replace('/Forum','/forums/Forum').replace('/Issue','/issues/Issue') + '/edit?admin_mode=on',
				viewIntroUrl = 'http://peakdemocracy.com' + baseUrl + '?admin_mode=on#intro_box',
				$li = $('<li></li>'),
				$aEditSettings = $('<a href="' + editSettingsUrl + '">Edit Settings</a>'),
				$aViewIntro = $('<a href="' + viewIntroUrl + '">View Intro </a>');
		console.log($aEditSettings.attr('href'));
		$li.append($aViewIntro,$aEditSettings); // 
		$('#links-ul').append($li);
		//return $li;

				//<a class="btn btn-primary" href="/portals/191/Forum_537/Issue_2742">Go to the topic</a>
		// edit link: http://www.peakdemocracy.com/customers/4/accounts/2/portals/191/forums/Forum_537/issues/Issue_2742/edit
		// view intro: http://www.peakdemocracy.com/portals/191/Forum_537/Issue_2742
	}

	$('#peak_network').prepend($('<ul id="links-ul"></ul>'));

	//console.log($('a.btn-primary').length);
	$('a.btn-primary')
		.each(createLinkPairsFromBaseUrls);
	//	.appendTo($('#links-ul'));
});