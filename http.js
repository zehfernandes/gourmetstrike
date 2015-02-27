var http = require('http'),
	Router = require('node-simple-router'),
	router = Router()
	drive = require("drive-db").load();
    fs = require('fs');

drive.update("1C3lg4GdS5DGnnpCWP1KHf6FHxLuM1lR44w_AAfKXdZ4");

router.get("/hello", function(request, response) {

    var lang = request.url.slice(-2)

    //Language
    if (lang == "pt") {
        var formulas = [
            ['inicio-frase','adjetivo-vazio', 'objeto-elogio', 'ingrediente'],
            ['inicio-frase', 'unidade', 'adjetivo-chefe', 'ingrediente'],
            ['inicio-frase', 'objeto-elogio', 'regional']
        ];
    } else {
        var formulas = [
            ['inicio-frase','adjetivo-vazio', 'ingrediente', 'objeto-elogio'],
            ['inicio-frase', 'adjetivo-chefe', 'ingrediente', 'unidade'],
            ['inicio-frase', 'regional', 'objeto-elogio']
        ];
    }

    var r1 = Math.floor(Math.random() * (formulas.length) );
    var expression = "";

    formulas[r1].forEach(function(item) {
        var wordArray = drive.find({ category: item });

        //Random Value array
        var r2 = Math.floor(Math.random() * (wordArray.length) );

        //Language
        if (lang == "pt") {
            expression = expression+wordArray[r2].word+" ";
        } else {
            expression = expression+wordArray[r2].worden+" ";
        }

    });

	response.end(expression);
});

router.get("/", function(request, response) {

    var lang = "en";

    //Language
    if (request.headers["accept-language"].substr(0,2) == "pt") {
        lang = "pt";
    }

    response.writeHead(301, {
        'Location': 'http://gourmetstrike.com/'+lang
    });
    response.end();
});

router.get("/pt", function(request, response) {

    var file = "index-pt.html";

    fs.readFile("public/"+file, function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
});

router.get("/en", function(request, response) {

    var file = "index.html";

    fs.readFile("public/"+file, function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
});

var server = http.createServer(router);
server.listen(process.env.PORT || 80, function(){
  console.log('listening on', server.address().port);
});