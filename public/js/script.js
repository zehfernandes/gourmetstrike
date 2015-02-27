(function() {

"use strict";

//------------------------------------------
// VARS
//------------------------------------------

var overlay         = document.querySelector( 'div.overlay' ),
	$_closeBttn     = overlay.querySelector( '.overlay-close' ),
	generate        = true,
	currentExpression;

var transEndEventNames 	= {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
	transEndEventName 	= transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
	support 			= { transitions : Modernizr.csstransitions };
//------------------------------------------
// FUNCTIONS
//------------------------------------------

function requestWords(evt) {

	if (generate == true) {
		generate = false;

		var request = new XMLHttpRequest();
		request.open('GET', '/hello?lang='+lang, true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    var resp = request.responseText;
		    currentExpression = resp;

		    var $_expression = document.getElementById("expression");
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

	if (evt) { evt.preventDefault(); }
}


//Twitter Popup
function openTweetBox(evt) {

	var width = 550;
  	var height = 350;
  	var left = window.innerWidth/2 - width/2;
  	var top = window.innerHeight/2 - height/2;
  	var url = 'http://twitter.com/share?url=http://gourmetstrike.herokuapp.com&text=' + currentExpression + '&hashtags=gourmetstrike&';

  	window.open(url,'janela', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=no, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');

  	evt.preventDefault();
}

//Space Bar
function spaceBarShortCut(evt) {
	if (evt.keyCode == 32) {
		requestWords();
	}

	evt.preventDefault();
}

//Go To result screen
function goToSecondScreen(evt) {
	var $_titleScreen = document.querySelector( 'div.title-screen' ),
		$_resultScren = document.querySelector( 'div.result-screen' ),
		$_chef = document.getElementById("chef-intro"),
		$_wrap = document.querySelector( 'div.wrap' ),
		$_food = document.getElementById("food");

	$_food.innerHTML = wordsForFood[  Math.floor(Math.random() * wordsForFood.length) ];
	classie.add( $_wrap, 'fadeOut' );
	classie.add( $_chef, 'chef-out' );

	setTimeout(function(){
		$_titleScreen.style.display = "none";
		$_resultScren.style.display = "block";
		requestWords(null);
	}, 650);

	evt.preventDefault();
}

//Open Modal
function toggleOverlay(evt) {
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

	evt.preventDefault();
}

//------------------------------------------
// LISTNERS
//------------------------------------------

document.getElementById("retry").addEventListener("click", requestWords);
document.getElementById("tweet").addEventListener("click", openTweetBox);
document.getElementById("start").addEventListener("click", goToSecondScreen);
document.addEventListener("keyup", spaceBarShortCut, false);
document.getElementById( 'trigger-overlay' ).addEventListener( 'click', toggleOverlay );
$_closeBttn.addEventListener( 'click', toggleOverlay );


})();