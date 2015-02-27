var http = require('http'),
	Router = require('node-simple-router'),
	router = Router()
	drive = require("drive-db").load();
    fs = require('fs');

drive.update("1C3lg4GdS5DGnnpCWP1KHf6FHxLuM1lR44w_AAfKXdZ4");


var formulas = [
    ['inicio-frase','adjetivo-vazio', 'objeto-elogio', 'ingrediente'],
    ['inicio-frase', 'unidade', 'adjetivo-chefe', 'ingrediente'],
    ['inicio-frase', 'objeto-elogio', 'regional']
];

router.get("/hello", function(request, response) {

    var r1 = Math.floor(Math.random() * (formulas.length) );
    var expression = "";

    formulas[r1].forEach(function(item) {
        var wordArray = drive.find({ category: item });

        //Random Value array
        var r2 = Math.floor(Math.random() * (wordArray.length) );

        //console.log(item+" : "+wordArray.length+" : "+r2);
        expression = expression+wordArray[r2].word+" ";

    });

	response.end(expression);
});

/*Static Files
var _dir = "public/";
var files = ["index.html"];
files.forEach(function(entry) {
    var ext = entry.split(".");
    console.log(entry)

    fs.readFile(_dir+entry, function (err, html) {
        if (err) {
            throw err;
        }
        router.get(entry, function(request, response) {
            response.writeHeader(200, {"Content-Type": "text/"+ext[1]});
            response.write(html);
            response.end();
        });
    });

});*/

fs.readFile("public/index.html", function (err, html) {
    if (err) {
        throw err;
    }
    router.get("./", function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
});

var server = http.createServer(router);
server.listen(process.env.PORT || 80, function(){
  console.log('listening on', server.address().port);
});