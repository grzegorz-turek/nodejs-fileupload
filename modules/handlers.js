var fs = require('fs');
var formidable = require('formidable');
//var path = require('path');

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        if (err) throw err
        fs.renameSync(files.upload.path, "images/test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', 'utf-8', function(err, html){
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    fs.readFile("images/test.png", "binary", function(err, file) { // ZMIANA ERROR NA ERR???
        if(err) throw err;
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}
/*
exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    response.write("Rozpoczynam upload!");
    response.end();
}
*/

/*
exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}
*/