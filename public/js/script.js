(function() {

var currentExpression;
var generate = true;

function requestWords(evt) {

	if (generate == true) {
		generate = false;

		var request = new XMLHttpRequest();
		request.open('GET', '/hello', true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    var resp = request.responseText;
		    currentExpression = resp;

		    $_expression = document.getElementById("expression");
			$_expression.innerHTML = resp;
			classie.add( $_expression, 'pulse' );

			setTimeout(function(){
				classie.remove( $_expression, 'pulse' );
				generate = true;
			}, 500);


		  } else {
		    // We reached our target server, but it returned an error

		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		};

		request.send();

	}

	evt.preventDefault();
}

function openTweetBox(evt) {

	var width = 550;
  	var height = 350;
  	var left = window.innerWidth/2 - width/2;
  	var top = window.innerHeight/2 - height/2;
  	var url = 'http://twitter.com/share?url=http://gourmetstrike.herokuapp.com&text=' + currentExpression + '&hashtags=gourmetstrike&';

  	window.open(url,'janela', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=no, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

  	evt.preventDefault();

}

function spaceBarShortCut(evt) {
	if (evt.keyCode == 32) {
		requestWords();
	}

	evt.preventDefault();
}

//Listeners
document.getElementById("retry").addEventListener("click", requestWords);
document.getElementById("tweet").addEventListener("click", openTweetBox);
document.addEventListener("keyup", spaceBarShortCut, false);



//OPEN MODAL
var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( '.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };


	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );


})();