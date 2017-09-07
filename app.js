var express = require('express');
var exphbs  = require('express-handlebars');
var mysql  = require('mysql');
var parser  = require('body-parser');


var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs-extra');

 
var app = express();

app.use(express.static('public'));
 
app.engine('handlebars', exphbs({defaultLayout: 'plantilla'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('partials/home');
});
app.get('/index', function (req, res) {
    res.render('partials/home');
});
app.get('/verHistoria', function (req, res) {
    res.render('partials/paginas/verHistoria');
});
app.get('/crearCuento', function (req, res) {
    res.render('partials/paginas/crearCuento');
});


app.post('/subir', (req, res) => {
  req.fields; // contains non-file fields 
  req.files; // contains files 

    
    var form = new formidable.IncomingForm();
 
 // parse a file upload
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
    
      //res.end(util.inspect({fields: fields, files: files}));
        
      
    });
    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        console.log(file_name);
        /* Location where we want to copy the uploaded file */
        var new_location = 'public/imagenes/historias/';
        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
        res.end(file_name);
    });
      
});



app.listen(8080);
