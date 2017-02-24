(function () {
	var outboundLinkTracking = (function() {
            //ga('create', '', 'auto');
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
                    console.log("Download File" + ",Link:"+ link + ", path:" + document.location.pathname + document.location.search);
                    /*ga( "send", "event", "Download File", link,
                        document.location.pathname + document.location.search);*/
                    window.dict.push({
                      'link_category': "Download File",
                      'link_action': link,
                      'link_label': document.location.pathname + document.location.search,
                      'event': 'outbound link'
                    });              	

                } else if( link.match(/^tel\:/i) ) {
                    console.log("Called Phone" + ",Link:"+ link + ", path:" + document.location.pathname + document.location.search);
                    /*ga( "send", "event", "Called Phone", link,
                        document.location.pathname + document.location.search);*/
                    window.dict.push({
                      'link_category': "Called Phone",
                      'link_action': link,
                      'link_label': document.location.pathname + document.location.search,
                      'event': 'outbound link'
                    });  	

                } else if( link.match(/mailto/i) ) {    
                    console.log("Send Mail" + ",Link:"+ link + ", path:" + document.location.pathname + document.location.search);
                    /*ga( "send", "event", "Send Mail", link,
                        document.location.pathname + document.location.search);*/
                    window.dict.push({
                      'link_category': "Send Mail",
                      'link_action': link,
                      'link_label': document.location.pathname + document.location.search,
                      'event': 'outbound link'
                    });  

                } else if(link.indexOf(location.host) == -1 && !link.match(/^javascript\:/i)){ /* external link */
                    console.log("Outgoing Links" + ",Link:"+ link + ", path:" + document.location.pathname + document.location.search);
                    /*ga(
                        "send", "event", "Outgoing Links", link,
                        document.location.pathname + document.location.search);*/
                    window.dict.push({
                      'link_category': "Outgoing Links",
                      'link_action': link,
                      'link_label': document.location.pathname + document.location.search,
                      'event': 'outbound link'
                    });

                    /*trackEvent(category, action, [name], [value])*/
                    _paq.push(['trackEvent', 'Outgoing Links', link, document.location.pathname + document.location.search]);  

                } else {};
            }
        }


        var ele = document.body;

        if(ele.addEventListener){
            ele.addEventListener("click", _gaLt, false);
        }else if(ele.attachEvent){
            ele.attachEvent('onclick', _gaLt);
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

	      // Set our dataLayer name for later
	      //config.dataLayerName = config.dataLayerName || 'dataLayer';

	      checkDepth();
	      addEvent(window, 'scroll', throttle(checkDepth, 500));

	    }
	      
	  
	    function checkDepth() {
	      
	      var _curr = Math.min(100, Math.max(0, Math.round(window.pageYOffset / (Math.max(document.documentElement.offsetHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.body.scrollHeight) - window.innerHeight) * 100)))


	      if(_curr > window.dict.maxDepth) {

	          //config.maxDepth = _curr;
	        	window.dict.maxDepth = _curr;
	          fireAnalyticsEvent(window.dict.maxDepth);

	       }

	    }
	      
	    function fireAnalyticsEvent(distance) {
			//dataLayer = window.dataLayer || [];
	      	//dataLayer.push({'event': 'scroll', 'currentPosoition' : distance});

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


})();