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



//Database connection
/*var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'estudiante', //...........>>>>> importante cambiar la clave <<<<<< .........
  database : 'GoldTales'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM Users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
       console.log(result);
  });
});*/

/*
try {
	connection.connect();
    console.log("conexion correcta");
    //INSERTS
  var sql = "SELECT * FROM users";
    
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
	
} catch(e) {
	console.log('Database Connetion failed:' + e);
}

*/


/*
const pg = require('pg');
//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/GoldTales';
var connectionString = "postgres://postgres:postgres@localhost:5432/GoldTales";



try {       
	const client = new pg.Client(connectionString);
    client.connect();
    console.log("conexion correcta");
    var query = client.query("SELECT * FROM users");
    query.on("end", function (result) {
    console.log(result);
    client.end();
});
    
	
} catch(e) {
	console.log('Database Connetion failed:' + e);
}
*/
const pg = require('pg');
var conString = "postgres://postgres:postgres@localhost:5432/GoldTales";
const client = new pg.Client(conString);
app.get('/miau', (req, res, next) => {

client.connect(function(err) {
if(err) {
return console.error('could not connect to postgres', err);
return res.status(500).json({success: false, data: err});
}

client.query('SELECT * FROM Users;', function(err, result) {
if(err) {
return console.error('error running query', err);
}
console.log("mi: "+result.rows[0].name);
console.log(result);
return res.json(result);

client.end();
});
});

});




app.listen(8080);
