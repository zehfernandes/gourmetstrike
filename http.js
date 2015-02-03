var http = require('http'),
	Router = require('node-simple-router'),
	router = Router()
	drive = require("drive-db").load();
    fs = require('fs');

drive.update("1C3lg4GdS5DGnnpCWP1KHf6FHxLuM1lR44w_AAfKXdZ4");


var formulas = [
    ['inicio-frase','adjetivo-vazio', 'objeto-elogio', 'ingrediente'],
    ['unidade', 'adjetivo-chefe', 'ingrediente']
];

router.get("/hello", function(request, response) {

    var r1 = Math.floor(Math.random() * (formulas.length) );
    var expression = "";

    formulas[r1].forEach(function(item) {
        var wordArray = drive.find({ category: item });

        //Random Value array
        var r2 = Math.floor(Math.random() * (wordArray.length) );

        expression = expression+wordArray[r2].word+" ";

    });

	response.end(expression);
});

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    router.get("/", function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
});

var server = http.createServer(router);
server.listen(3000);