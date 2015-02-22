function requestWords() {
	var request = new XMLHttpRequest();
	request.open('GET', '/hello', true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    var resp = request.responseText;
		document.getElementById("expression").innerHTML = resp;

	  } else {
	    // We reached our target server, but it returned an error

	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();

	return false;
}


document.getElementById("retry").addEventListener("click", requestWords);

//requestWords();