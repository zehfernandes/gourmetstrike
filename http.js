var http = require('http'),
    Router = require('node-simple-router'),
    router = Router()
    drive = require("drive-db").load();
    fs = require('fs');

drive.update("1C3lg4GdS5DGnnpCWP1KHf6FHxLuM1lR44w_AAfKXdZ4");

//Function Parse Cookie
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

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

    var cookies = parseCookies(request);
    var lang;

    //Language
    if (!cookies['lang']) {
        if (request.headers["accept-language"]) {
            lang = request.headers["accept-language"].substr(0,2);
        }
    } else {
        lang = cookies['lang'];
    }

    if (lang == "pt") {
        response.writeHead(301, {
            'Location': 'http://gourmetstrike.com/pt',
            'Set-Cookie': 'lang=pt'
        });
        response.end();
    } else {
        fs.readFile("public/index.html", function (err, html) {
            if (err) {
                throw err;
            }
            response.writeHeader(200, {"Content-Type": "text/html", 'Set-Cookie': 'lang=en'});
            response.write(html);
            response.end();
        });
    }
});

router.get("/pt", function(request, response) {

    var file = "index-pt.html";

    fs.readFile("public/"+file, function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHeader(200, {"Content-Type": "text/html", 'Set-Cookie': 'lang=pt'});
        response.write(html);
        response.end();
    });
});

/*
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
}); */

var server = http.createServer(router);
server.listen(process.env.PORT || 3000, function(){
  console.log('listening on', server.address().port);
});