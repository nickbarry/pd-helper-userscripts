// ==UserScript==
// @name         PD Topic Tagging: Edit topic settings processor
// @namespace    http://nicholasbarry.com
// @version      1.1
// @description  Makes it easy to tag a topic based on the content of the topic name, question, and introduction
// @author       Nicholas Barry
// @match        http://www.peakdemocracy.com/customers/*/accounts/*/portals/*/forums/Forum_*/issues/Issue_*/edit*
// @grant        none
// ==/UserScript==


// VERSIONS
// 1.1: Tag suggestions select element updates based on user's tag/function selections
// 1.0: Basic working version. Paste html into Settings page and see it displayed below Function/Tag inputs.

$(document).ready(function() {
	function curry(fn) {
		return function curried() {
			var args = [].slice.call(arguments),
				context = this;
			return args.length >= fn.length ?
				fn.apply(context, args) :
				function () {
					var rest = [].slice.call(arguments);
					return curried.apply(context, args.concat(rest));
				};
		}
	}
	var fieldsToHide = ['issue_phase','issue_deadline_string','issue_decision_date_string',
											'issue_public','issue_membership_type','issue_hide_survey',
											'issue_allow_anonymous','issue_full_address','issue_featured',
											'issue_header_text','issue_off_forum_display',
											'issue_statement_alias'],
			tags = ["Animals","Arts","Bike/Pedestrian","Budget",
							"Building/Construction","Business","Communications","Dogs",
							"Education","Elections","Ethics/Transparency","Facility_Maintenance",
							"Festivals/Events","Historic_Preservation","Housing",
							"Law_Enforcement","Master_Plan","Open_Space","Parks",
							"Planning","Public_Health","Public_Safety",
							"Public_Transportation","Public_Works","Recreation",
							"Rezoning","Social Services","Streets",
							"Sustainability","Technology","Transportation",
							"Urban_Agriculture","Utilities"],
			suggestedTags;
	function hideAssociatedDiv(elId){
		$('#' + elId).closest('.control-group').css('display','none');
	}
	function createInputTextarea(){
			var $inputTextarea = $('<textarea>').
			attr({
				name: "input-textarea",
				id: "input-textarea"
			}).
			css({
				width: '100px',
				height: '100px',
				position: 'fixed',
				left: '-200px',
				top: '0px'
			});
		$inputTextarea.appendTo($('.span3')).focus();	
	}
	/*function repositionFunctionTagInputs(){
		var $tagControlsDiv = $('<div id="tag-controls-div" style="position: fixed; top: 0px; left: 150px; background-color: white"></div>'),
				$govFunc = $('#issue_system_gov_function_names').closest('.control-group'),
				$tags = $('#issue_system_topic_tag_names').closest('.control-group');
		$govFunc.css('display','inline-block').addClass('pull-left');
		$tags.css('display','inline-block').addClass('pull-left');
		$tagControlsDiv.append($govFunc,$tags);
	}*/
	function createIntroDiv(innerHtml){
		var $introDiv = $('<div>')
			.attr({
				name: "intro-div",
				id: "intro-div",
			})
			.css({'position': 'fixed',
						'bottom': '0px',
						'left': '180px',
						'overflow':'auto',
						'height': '90vh',
						'padding-left': '5px',
						'background-color': 'white'
					 })
			.html(innerHtml);
		$introDiv.insertAfter($('#issue_system_topic_tag_names').closest('.control-group'));	
	}
	function acceptHtmlInput(){
		var $inputTextarea = $('#input-textarea'),
				introHtml = '<p>' + $('#issue_name').val() + '<br>' + 
										$('#issue_question').val() + '</p>' + 
										$inputTextarea.val();
		$inputTextarea.remove();
		return introHtml;
	}
	function createTagSuggester(){
		var $tagSuggester = $('<select>').attr({
			name: "tag-suggester",
			id: "tag-suggester",
			autofocus: 'autofocus'
		})
			.css({
				position: 'fixed',
				bottom: '0px',
				left: '0px'
			});
		$('<br><br><br><br>').appendTo($('.span3'));
		$tagSuggester.appendTo($('.span3')).focus();
	}
	function hyphenator(string){
		var cleanedStr = string.replace(/[ /]/g,"");
		return cleanedStr.split("").join("-");
	}
	function highlightTerms(){
		var tag = $('#tag-suggester option:selected').val();
		$('.u-highlight').removeClass('u-highlight');
		$('.' + hyphenator(tag)).addClass('u-highlight');
		//I disabled the line below now that I'm pasting the topic intro html
		//into the edit topic settings page.
		//document.getElementById('first-' + hyphenator(tag)).scrollIntoView(true);
		
		// I had previously tried this version, and don't remember what happened:
		//self.location.href = '#first-' + hyphenator(tag);
	}
	function countTermsPerTag(tag){
		//console.log(tag);
		return {tag: tag,
						count: document.getElementsByClassName(hyphenator(tag)).length};
	}
	function tagIsPresent(tagObj){
		//if(tagObj.count){
		//	suggestedTags.push(tagObj.tag);
		//}
		return tagObj.count;
	}
	function sortTagsByFrequency(tagObj1,tagObj2){
		if(tagObj1.count < tagObj2.count) return 1;
		if(tagObj1.count > tagObj2.count) return -1;
		return 0;
	}
	function createTagOption(tagObj,index){
		var $option = $('<option>' + tagObj.count + ": " + tagObj.tag + '</option>')
			.attr({
				'value': tagObj.tag,
				'data-count': tagObj.count,
				'class': 'tag-option'
			});
		if(index==0) $option.attr('selected','selected');
		return $option;
	}
	function addToSelectEl(optionEl){
		$('#tag-suggester').append(optionEl);
	}
	function createTagSuggesterOptions(){
		// Update suggestedTags so I can use it later
		suggestedTags = tags.
			map(countTermsPerTag).
			filter(tagIsPresent).
			sort(sortTagsByFrequency);
		//Create options based on suggestedTags
		suggestedTags.
			map(createTagOption).
			forEach(addToSelectEl);
		$('#tag-suggester').
			attr('size',
			document.getElementsByClassName('tag-option').length);
	}
	function createStyles(){
		$("<style type='text/css'> .u-highlight{ background-color: yellow;}</style>").
			appendTo("head");
	}
	function repositionFunctionTagInputs(){
		$('#issue_system_gov_function_names').css({
			position: 'fixed',
			top: '60px',
			left: '0px'
		});
		$('.bootstrap-tagsinput').css({
			position: 'fixed',
			top: '0px',
			left: '0px'
		});
	}
	function upDownArrowHandler(e){
		var $tagDropdowns = $('.typeahead');
		if($tagDropdowns.length > 0 && $tagDropdowns.css('display') == 'block'){
			//Do nothing. The tags field is currently displaying the tag selecter
			//dropdown, so we should exit the function without preventing the default 
			//behavior of the up/down arrow keys.
		}else if(e.which == 38 || e.which == 40){ 
			//up or down arrow
			e.preventDefault();
			var tagSuggester = document.getElementById('tag-suggester');
			if(e.which == 38 && tagSuggester.selectedIndex != 0){
				//up arrow, and some option other than top option is selected
				tagSuggester.selectedIndex -= 1;
			}else if(e.which == 40 && tagSuggester.selectedIndex != tagSuggester.length-1){
				//down arrow, and some option other than bottom option is selected
				tagSuggester.selectedIndex += 1;
			}
			highlightTerms(); //need to run this since programmatically adjusting
			//the tagSuggester index doesn't trigger the 'change' event.
		}
	}
	function getValueFromOptionEl(el){
		return el.value;
	}
	function getCurrentSelections(){
		var functionsSelectedCollection =
					document.getElementById('issue_system_gov_function_names').
					selectedOptions,
				functionsSelected = [].map.call(functionsSelectedCollection,getValueFromOptionEl),
				tagsSelectedCollection = 
					document.getElementById('issue_system_topic_tag_names').
					selectedOptions,
				tagsSelected = [].map.call(tagsSelectedCollection,getValueFromOptionEl);
		return functionsSelected.concat(tagsSelected);
	}
	function isSelected(selectedTags,index,option){
		//Return TRUE if $option matches a tag that the user selected
		return selectedTags.indexOf($(option).val()) != -1;
	}
	var curriedIsSelected = curry(isSelected);
	function syncSuggestionsWithSelectedTags(){
		var selectedTags = getCurrentSelections();
		//console.log(selectedTags);
		$('.tag-option').css('display','block');
		$('.tag-option').filter(curriedIsSelected(selectedTags)).css('display','none');
	}
	function processHtmlInput(){
		var introHtml = acceptHtmlInput();
		repositionFunctionTagInputs();
		fieldsToHide.forEach(hideAssociatedDiv);
		createIntroDiv(introHtml);
		createTagSuggester();
		createTagSuggesterOptions();
		createStyles();
		highlightTerms();
		syncSuggestionsWithSelectedTags();
		$('#tag-suggester').change(highlightTerms);
	}
	
	createInputTextarea();
	
	// Event listeners
	$('#input-textarea').change(processHtmlInput);
	$('#issue_system_gov_function_names').
		keydown(upDownArrowHandler).
		change(syncSuggestionsWithSelectedTags);
	$('.bootstrap-tagsinput input').keydown(upDownArrowHandler);
	$('#issue_system_topic_tag_names').change(syncSuggestionsWithSelectedTags);
});