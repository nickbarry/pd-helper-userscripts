// ==UserScript==
// @name         PD Topic Tagging: Topic Intro processor
// @namespace    http://nicholasbarry.com
// @version      0.1
// @updateURL    https://github.com/nickbarry/pd-helper-userscripts/raw/master/PD%20Topic%20Tagging-%20Topic%20Intro%20processor.user.js
// @downloadURL  https://github.com/nickbarry/pd-helper-userscripts/raw/master/PD%20Topic%20Tagging-%20Topic%20Intro%20processor.user.js
// @description  Strips out extraneous elements, and adds spans with appropriate classes around relevant words/phrases.
// @author       Nicholas Barry
// @match        http://www.peakdemocracy.com/portals/*/Forum_*/Issue_*
// @grant        none
// ==/UserScript==

// NOTE: AS OF 9/8/15, I'M WORKING ON THESE ON MY DESKTOP LAPTOP, AND WILL NEED TO UPDATE THE VERSIONS ON MY TOUCHBOOK AFTERWARDS. PROBABLY ONCE I'VE FINISHED COMPLETELY. I'M NOT YET BOTHERING TO UPLOAD THEM TO OPENUSERJS - SEEMS LIKE TOO MUCH TIME TO SPEND ON A SMALL PERSONAL PROJECT.

$(document).ready(function() {
	var tagTerms = [{
									 tag: "Animals",
									 terms: ['animal','dog','cat\\b','cats\\b','pet\\b','pets','livestock','domesticate','horse','deer','chicken']
								 },
									{
										tag: "Arts",
										terms: ['art','culture','museum','performance','gallery','galleries']
									},
									{
										tag: 'Bike/Pedestrian',
										terms: ['bike','bicycle','biking','bicycling','walk','sidewalk','cyclist','pedestrian','crosswalk','trail\\b','trails','path','complete street']
									},
									{
										tag: 'Budget',
										terms: ['budget','money','fund','fiscal','capital','economic','economy','finance','financial','financing','contract','payment','paid','pay','tax','fee\\b','fees','cost']
									},
									{
										tag: 'Building/Construction',
										terms: ['build','construction','development','develop','real estate']
									},
									{
										tag: 'Business',
										terms: ['business','commerce','commercial','economic','economy','job','sales','food truck','contract','shop','retail']
									},
									{
										tag: 'Communications',
										terms: ['communication','communicate','communicating','internet','phone','telephone','poll\\b','polls','polling','polled','wifi','wireless','fiber','television','radio','broadband','cable','telecommunication','engage','participate','participation','feedback','notification','notify','subscribe','subscribing','signs','signage']
									},
									{
										tag: 'Dogs',
										terms: ['dog','breed','leash','service animal','canine']
									},
									{
										tag: 'Education',
										terms: ['education','school','teach','learn','student','instruction','academic','testing','scholarship']
									},
									{
										tag: 'Elections',
										terms: ['elections','election','elect ','vote','voting','campaign','e-voting']
									},
									{
										tag: 'Ethics/Transparency',
										terms: ['ethic','transparency','transparent']
									},
									{
										tag: 'Facility_Maintenance',
										terms: ['facility','facilities','building','community center','golf course','theater','theatre','repair','maintain','maintenance','landscaping','pest','heating','ventilation','ventilating','ventilated','air conditioning','hvac','airport']
									},
									{
										tag: 'Festivals/Events',
										terms: ['festival','event\\b','events\\b','admission','gala']
									},
									{
										tag: 'Historic_Preservation',
										terms: ['historic','history','preserve','preservation','preserving','heritage','landmark']
									},
									{
										tag: 'Housing',
										terms: ['housing','house','residence','single-family','multi-family','multiple-family','apartment','condo','duplex','triplex','homes','home\\b','mixed-use','subdivision','rental']
									},
									{
										tag: 'Law_Enforcement',
										terms: ['law\\b','laws\\b','enforcement','police','sheriff','deputy','patrol','crime','criminal','arrest','body camera','safety','safe']
									},
									{
										tag: 'Master_Plan',
										terms: ['master plan','master','comprehensive plan','comprehensive','vision','goal','general plan','strategic plan','strategic','area plan','element']
									},
									{
										tag: 'Open_Space',
										terms: ['open space','natural space','trail\\b','trails','path','preserve','green space','reserve','mountain','river','stream\\b','streams','creek','forest']
									},
									{
										tag: 'Parks',
										terms: ['park\\b','parks','parkway','parkland','golf','trail\\b','trails','path','bench','green space'],
									},
									{
										tag: 'Planning',
										terms: ['planning','area plan','plan\\b','plans','zoning','code','rezoning','land use','ordinance','law','zoned'],
									},
									{
									 tag: "Public_Health",
									 terms: ['food','health','disease','restaurant','fitness', 'immunization','immunize','vaccine','homelessness','homeless','medical','smok']
								 },
								 {
									tag: "Public_Safety",
									terms: ['police','fire','sheriff','arrest','body camera', 'law enforcement','emergency','medical','disaster','lifeguard','crime','criminal','homelessness','homeless','public safety','safety','safe','unsafe']
									},
									{
										tag: 'Public_Transportation',
										terms: ['public transportation','public transit','mass transit','transit\\b','passenger','bus\\b','buses','busses','train\\b','trains','light rail','subway','ferry','ferries','metro','bart\\b','caltrain','amtrak','rail','mass transportation','complete street']
									},
									{
										tag: 'Public_Works',
										terms: ['public works\\b','engineer','road','street','bridge','stormwater','runoff','facility','facilities','building','community center','golf course','theater','theatre','repair','maintain','maintenance','landscaping','pest','heating','ventilation','ventilated','ventilating','air conditioning','hvac','infrastructure','sewer','sewage','asset','waste','refuse','trash','recycling']
									},
									{
										tag: 'Recreation',
										terms: ['recreation','golf','sport','exercise','summer camp']
									},
									{
										tag: 'Rezoning',
										terms: ['zoning','rezoning','ordinance','law','code','land use','zoned','planning']
									},
									{
										tag: 'Social Services',
										terms: ['library','libraries','homeless','low-income','poverty','poor','food stamp','entitlement']
									},
									{
										tag: 'Streets',
										terms: ['street','road','parking','pavement','pothole','resurface','resurfacing','sidewalk','bike lane','bicycle lane','crosswalk']
									},
									{
										tag: 'Sustainability',
										terms: ['sustainability','environment','pollute','pollution','conserve','conserving','conservation','recycle','recycling','solar','air quality','electric vehicle','electric car','hybrid','green','energy efficiency','energy efficient','energy-efficient']
									},
									{
										tag: 'Technology',
										terms: ['technology','tech\\b','technological','hardware','software','internet','fiber','cable','telecommunication']
									},
									{
										tag: 'Transportation',
										terms: ['transportation','travel','traffic','public transportation','public transit','transit\\b','passenger','bus\\b','buses','busses','train\\b','trains','light rail','subway','ferry','ferries','metro','bart\\b','caltrain','amtrak','rail','street','road','parking','pavement','pothole','resurface','resurfacing','sidewalk','bike lane','bicycle lane','crosswalk','mass transit','mass transportation','complete street','commute','ride-share','ridesharing','carpool','car\\b','cars\\b','truck','corridor','airport','airplane','plane\\b']
									},
									{
										tag: 'Urban_Agriculture',
										terms: ['chicken','garden','egg','vegetable','produce\\b','bee\\b','bees','beekeep','rooster','hen','sheep','pig\\b','pigs']
									},
									{
										tag: 'Utilities',
										terms: ['utilities','utility','gas\\b','water\\b','electricity','electric','internet','broadband','fiber','phone','telephone','telecommunication','energy']
									}
									/* TEMPLATE VERSION
									{
										tag: 'Streets', // AND REMEMBER TO COPY INTO EDIT TOPICS PAGE USERSCRIPT http://codepen.io/nickbarry/pen/GpgXQd?editors=001
										terms: ['street','road','parking','pavement','pothole','resurface','resurfacing','sidewalk','bike lane','bicycle lane','crosswalk']
									},
									*/
								 ];
	
	function removeUndesirableElements(){
		$('#intro_box').find('img, audio, video').remove();
	}
	function getIntroHtml(){
		var $readMore = $('.read-more');
		if($readMore.length > 0){
			// There is a "read more" link
			return $('div.details').html();
		}else{
			// There's no "read more" link, i.e. the entire Intro is displayed 
			return document.getElementById('intro_box').innerHTML;
		}
	}
	function hyphenator(string){
		var cleanedStr = string.replace(/[ /]/g,"");
		return cleanedStr.split("").join("-");
	}
	function wrapText(tag,term){
		var termRegex = new RegExp("([ \\(]" + term + ")","ig"); 
		//leading space/paren avoids words in links
		//include the space/paren in the capturing parentheses so the term can be found again if it matches multiple tags
		introHtml = introHtml.replace(termRegex, '<span class="' + hyphenator(tag) + '">$1</span>');
	}
	function tagWrapper(tagObj){
		tagObj.terms.forEach(function(term){
			wrapText(tagObj.tag,term);
		});
	}
	function idAdder(tagObj){
		var tag = hyphenator(tagObj.tag);
		introHtml = introHtml.replace('class="' + tag + '"','id="first-' + tag + '" class="' + tag + '"');
	}
	function selectHtmlToCopy(){
		var $htmlTextarea = $('<textarea>').
			attr({
				name: "html-textarea",
				class: "u-fixed-top-right",
				id: "html-textarea",
				autofocus: 'autofocus'
			}).
			css({
				width: '100px',
				height: '100px'
			});
		$htmlTextarea.appendTo($('body'))
			.val(introHtml)
			.select();
	}
	
	// Prepare the html for tagging
	removeUndesirableElements();
	var introHtml = getIntroHtml();
	
	// Wrap terms in spans with term classes and IDs for the first instance of each class
	tagTerms.forEach(tagWrapper);
	tagTerms.forEach(idAdder);
	selectHtmlToCopy();
});

