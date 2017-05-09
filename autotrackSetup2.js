"use strict";


/**
 *
 * 
 *
 */


var _paq = _paq || [];


// Event Helper
function addEvent(el, evt, fn) {
	if (el.addEventListener) {
		el.addEventListener(evt, fn);
	} else if (el.attachEvent) {
		el.attachEvent('on' + evt, function(evt) {
			fn.call(el, evt);
		});
	} else if (typeof el['on' + evt] === 'undefined' || el['on' + evt] === null) {
		el['on' + evt] = function(evt) {
			fn.call(el, evt);
		};
	}
}


// Scroll Tracking
(function(_paq) {

	window.dict = window.dict || [];

	window.dict.maxDepth = 0;

	checkDepth();
	addEvent(window, 'scroll', checkDepth);
	  
	function checkDepth() {
	  	var _curr = Math.min(100, Math.max(0, Math.round(window.pageYOffset / (Math.max(document.documentElement.offsetHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.body.scrollHeight) - window.innerHeight) * 100)))
	  	if(_curr > window.dict.maxDepth) {
	  		window.dict.maxDepth = _curr;
	  	}

	  	return _curr;
	}


})(_paq);


/** Custom Dimension
 *
 * Use clean Version after changed order
 */

(function(_paq) {

	//loginStatus
	if ((window.ANALYTICS != null) && (window.ANALYTICS.loggedIn != null)){
		_paq.push(['setCustomDimension', 1, (window.ANALYTICS.loggedIn == false ? 'notLoggedIn' : 'loggedIn'), "page" ]);
	} 

	//registrationStatus
	if((window.ANALYTICS != null) && (window.ANALYTICS.registeredAt != null)){
		_paq.push(['setCustomDimension', 2, (window.ANALYTICS.registeredAt == false ? 'notRegistered' : 'registered'), "page")]);	
	}

	//trialStatus 30 days
	if((window.ANALYTICS != null) && (window.ANALYTICS.registeredAt != null)){
	    //_paq.push(['setCustomDimension', 11, ((window.ANALYTICS.registeredAt != false) && ((_sf_startpt - (window.ANALYTICS.registeredAt != null *1000) <= 30 * 24 * 60 * 60 * 1000)) ? 'trial' : 'noTrial')]);
	    _paq.push(['setCustomDimension', 3, ((window.ANALYTICS.registeredAt != false) && ((window.ANALYTICS.currentTimestamp - window.ANALYTICS.registeredAt <= 30 * 24 * 60 * 60)) ? 'trial' : 'noTrial'), "page"]);
	}

	//topics
	if((window.ANALYTICS != null) && (window.ANALYTICS.articleTopics != null)){
		_paq.push(['setCustomDimension', 4, (window.ANALYTICS.articleTopics.join(';').toLowerCase() + ''), "page"]);
	}

	//articleHasPaywall
	if((window.ANALYTICS != null) && (window.ANALYTICS.articleHasPaywall != null)){
		_paq.push(['setCustomDimension', 6, (window.ANALYTICS.articleHasPaywall == false ? 'noPaywall' : 'hasPaywall'), "page"]);
	}

	//articlePaywallVisible
	if((window.ANALYTICS != null) && (window.ANALYTICS.articlePaywallVisible != null)){
		_paq.push(['setCustomDimension', 7, (window.ANALYTICS.articlePaywallVisible == false ? 'invisiblePaywall' : 'visiblePaywall'), "page"]);
	}

	//completeArticle
	if((window.ANALYTICS != null) && (window.ANALYTICS.articlePaywallVisible != null) && (window.ANALYTICS.articleHasPaywall != null)) {
		if (window.ANALYTICS.articleHasPaywall != true){
			_paq.push(['setCustomDimension', 5, 'completeArticle', "page"]);
		} else if (window.ANALYTICS.articleHasPaywall == true && window.ANALYTICS.articlePaywallVisible != true){
			_paq.push(['setCustomDimension', 5, 'completeArticle', "page"]);
		} else if (window.ANALYTICS.articleHasPaywall == true && window.ANALYTICS.articlePaywallVisible == true){
			_paq.push(['setCustomDimension', 5, 'incompleteArticle', "page"]);
		}	    	
	}

})(_paq);




/**
 *
 * 
 *
 */
try {

	var isOnIOS = navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPhone/i);
	var eventName = isOnIOS ? "pagehide" : "beforeunload";
	var onCloseEventUsed = false;

	addEvent(window, eventName, sendTrackingData)

	addEvent(document, 'click', function(event) {
		var el = event.srcElement || event.target;
		while(el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href)){
			el = el.parentNode;
		}

		if(el && el.href) sendTrackingData();
	});


	var sendTrackingData = function() { 
		if(onCloseEventUsed === true) return;
		onCloseEventUsed = true;

		var timeOnSite = (new Date()).getTime() - _sf_startpt;
		window.Piwik.getTracker().trackEvent('trackEvent', 'TimeOnSiteTracking', timeOnSite);
		window.Piwik.getTracker().trackEvent('trackEvent', 'ScrollTracking', (window.dict && window.dict.maxDepth) ? window.dict.maxDepth: 0)   
	}

} catch(e) {};



// Search Event
(function(_paq) {

	var searchItem = '';

	setInterval(function(){

		if ((document.location.search != "") && (document.location.search.length > 4) && (searchItem != document.location.search)){
			searchItem = document.location.search;
			var searchQuery = window.location.search.substring(3) + '';
			
			_paq.push(['trackSiteSearch', searchQuery, false, false]);
		}

	}, 500);

})(_paq);