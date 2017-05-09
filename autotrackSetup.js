(function (_paq) {
	var outboundLinkTracking = (function() {
			
            var _gaLt = function(event){
            var el = event.srcElement || event.target;
              
            window.dict = window.dict || [];

            /* Loop up the DOM tree through parent elements if clicked element is not a link (eg: an image inside a link) */
            while(el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href)){
                el = el.parentNode;
            }


            if(el && el.href){

                var link = el.href;
                var isDoc = link.match(/\.(?:doc|eps|jpg|png|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3)($|\&|\?)/);
                //var isDoc = link.match(/\/file\/(.*)\/download/);

                if( isDoc ) {
                    _paq.push(['trackEvent', 'Download File', link, document.location.pathname + '' + document.location.search]);               	

                } else if( link.match(/^tel\:/i) ) {
                    _paq.push(['trackEvent', 'Called Phone', link, document.location.pathname + '' +  document.location.search]);     	

                } else if( link.match(/mailto/i) ) {
                    /*trackEvent(category, action, [name], [value])*/
                    _paq.push(['trackEvent', 'Send Mail', link, document.location.pathname + '' +  document.location.search]);   

                } else if(link.indexOf(location.host) == -1 && !link.match(/^javascript\:/i)){ /* external link */
                    /*trackEvent(category, action, [name], [value])*/
                    _paq.push(['trackEvent', 'Outgoing Links', link, document.location.pathname + '' +  document.location.search]);  

                } else {};
            }
        }

        var ele = document.body;

        if(ele.addEventListener){
            ele.addEventListener("click", _gaLt, false);
        }
    })();

  	var scrolltarcking = (function() {

	    'use strict';

	    //var cache = {};
	      
	    window.dict = window.dict || [];
	      
	    window.dict.maxDepth = 0;

	    // If our document is ready to go, fire straight away
	    if(document.readyState !== 'loading') {

	      init();

	    } else {

	      // On IE8 this fires on window.load, all other browsers will fire when DOM ready
	      document.addEventListener ? 
	        addEvent(document, 'DOMContentLoaded', init) : 
	        addEvent(window, 'load', init);

	    }

	    function init() {

	      // Browser dependencies, script fails silently
	      if (!document.querySelector || !document.body.getBoundingClientRect) {

	        return false;

	      }

	      checkDepth();
	      addEvent(window, 'scroll', throttle(checkDepth, 500));

	    }
	      
	  
	    function checkDepth() {
	      
	      var _curr = Math.min(100, Math.max(0, Math.round(window.pageYOffset / (Math.max(document.documentElement.offsetHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.body.scrollHeight) - window.innerHeight) * 100)))


	      if(_curr > window.dict.maxDepth) {
	        	window.dict.maxDepth = _curr;
	       }
	    }

	      
	    function throttle(func, wait) {
	      var context, args, result;
	      var timeout = null;
	      var previous = 0;
	      var later = function() {
	        previous = new Date;
	        timeout = null;
	        result = func.apply(context, args);
	      };
	      return function() {
	        var now = new Date;
	        if (!previous) previous = now;
	        var remaining = wait - (now - previous);
	        context = this;
	        args = arguments;
	        if (remaining <= 0) {
	          clearTimeout(timeout);
	          timeout = null;
	          previous = now;
	          result = func.apply(context, args);
	        } else if (!timeout) {
	          timeout = setTimeout(later, remaining);
	        }
	        return result;
	      };
	    }

	    // Cross-browser compliant event listener
	    function addEvent(el, evt, fn) {

	      if (el.addEventListener) {

	        el.addEventListener(evt, fn);

	      } else if (el.attachEvent) {

	        el.attachEvent('on' + evt, function(evt) {

	          // Call the event to ensure uniform 'this' handling, pass it event
	          fn.call(el, evt);

	        });

	      } else if (typeof el['on' + evt] === 'undefined' || el['on' + evt] === null) {

	        el['on' + evt] = function(evt) {

	          // Call the event to ensure uniform 'this' handling, pass it event
	          fn.call(el, evt);

	        };

	      }

	    }
	    
	  })();

	var pushCustomDimensions = (function() {

		//loginStatus
		if ((window.ANALYTICS != null) && (window.ANALYTICS.loggedIn != null)){
			_paq.push(['setCustomDimension', 1, (window.ANALYTICS.loggedIn == false ? 'notLoggedIn' : 'loggedIn') ]);
		} 

	    //registrationStatus
	    if((window.ANALYTICS != null) && (window.ANALYTICS.registeredAt != null)){
	    	_paq.push(['setCustomDimension', 2, (window.ANALYTICS.registeredAt == false ? 'notRegistered' : 'registered')]);	
	    }
	    
	    //trialStatus 30 days
	    if((window.ANALYTICS != null) && (window.ANALYTICS.registeredAt != null)){
	    	//_paq.push(['setCustomDimension', 11, ((window.ANALYTICS.registeredAt != false) && ((_sf_startpt - (window.ANALYTICS.registeredAt != null *1000) <= 30 * 24 * 60 * 60 * 1000)) ? 'trial' : 'noTrial')]);
	    	_paq.push(['setCustomDimension', 3, ((window.ANALYTICS.registeredAt != false) && ((window.ANALYTICS.currentTimestamp - window.ANALYTICS.registeredAt <= 30 * 24 * 60 * 60)) ? 'trial' : 'noTrial')]);
	    }
	    
	    //topics
	    if((window.ANALYTICS != null) && (window.ANALYTICS.articleTopics != null)){
	    	_paq.push(['setCustomDimension', 4, (window.ANALYTICS.articleTopics.join(';').toLowerCase() + '')]);
	    }

	    //articleHasPaywall
	    if((window.ANALYTICS != null) && (window.ANALYTICS.articleHasPaywall != null)){
	    	_paq.push(['setCustomDimension', 6, (window.ANALYTICS.articleHasPaywall == false ? 'noPaywall' : 'hasPaywall')]);
	    }

	    //articlePaywallVisible
	    if((window.ANALYTICS != null) && (window.ANALYTICS.articlePaywallVisible != null)){
	    	_paq.push(['setCustomDimension', 7, (window.ANALYTICS.articlePaywallVisible == false ? 'invisiblePaywall' : 'visiblePaywall')]);
	    }

	    //completeArticle
	    if((window.ANALYTICS != null) && (window.ANALYTICS.articlePaywallVisible != null) && (window.ANALYTICS.articleHasPaywall != null)) {
	    	if (window.ANALYTICS.articleHasPaywall != true){
	    		_paq.push(['setCustomDimension', 5, 'completeArticle']);
	    	} else if (window.ANALYTICS.articleHasPaywall == true && window.ANALYTICS.articlePaywallVisible != true){
	    		_paq.push(['setCustomDimension', 5, 'completeArticle']);
	    	} else if (window.ANALYTICS.articleHasPaywall == true && window.ANALYTICS.articlePaywallVisible == true){
	    		_paq.push(['setCustomDimension', 5, 'incompleteArticle']);
	    	}	    	
	    }

	})();

	var onBeforeUnloadEvent = (function() {

	        window.onbeforeunload = function(event) {
	        	var timeOnSite = timeOnSiteTracking();
		       	_paq.push(['trackEvent', 'TimeOnSiteTracking', timeOnSite]);
		       	_paq.push(['trackEvent', 'ScrollTracking', window.dict.maxDepth])   
		    };

		    function timeOnSiteTracking() {
		    	return (new Date()).getTime() - _sf_startpt;
		    	//return window.ANALYTICS.currentTimestamp != null ? parseInt((new Date()).getTime()/1000 - window.ANALYTICS.currentTimestamp) : 0;
		    }

	})();

	var siteSearchTracking = (function() {

		var searchItem;

		var input = document.getElementsByClassName('searchbox__input')[0]; 

	 	setInterval(function(){
	 		if ((document.location.search != "") && (document.location.search.length > 4) && (searchItem != document.location.search)){
	 			searchItem = document.location.search;
	 			_paq.push(['trackEvent', 'SearchTracking', window.location.search.substring(3) + '']);
	 		}

	 	}, 1000);

	})();


})(_paq = _paq || []);
