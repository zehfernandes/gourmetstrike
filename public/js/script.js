var currentExpression;
var generate = true;

function generateComplain(evt) {

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
			$_expression.className =  "pulse";

			setTimeout(function(){ 
				$_expression.className = "";
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
	if (evt.keyCode == 0 || evt.keyCode == 32) {
		generateComplain();
	}

	evt.preventDefault();
}

document.getElementById("retry").addEventListener("click", generateComplain);
document.getElementById("tweet").addEventListener("click", openTweetBox);
document.addEventListener("keydown", spaceBarShortCut, false);




$(window).keypress(function(e) {
  if (e.keyCode == 0 || e.keyCode == 32) {
    console.log('Space pressed');
  }
});
//requestWords();