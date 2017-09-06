var express = require('express');
var exphbs  = require('express-handlebars');

 
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







function encaminar (pedido,respuesta,camino) {
	
	switch (camino) {
		case 'public/subir': {
			subir(pedido,respuesta);
			break;
		}	
	    default : {  
			fs.exists(camino,function(existe){
				if (existe) {
					fs.readFile(camino,function(error,contenido){
						if (error) {
							respuesta.writeHead(500, {'Content-Type': 'text/plain'});
							respuesta.write('Error interno');
							respuesta.end();					
						} else {
							var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuesta.writeHead(200, {'Content-Type': mimearchivo});
							respuesta.write(contenido);
							respuesta.end();
						}
					});
				} else {
					respuesta.writeHead(404, {'Content-Type': 'text/html'});
					respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
					respuesta.end();
				}
			});	
		}
	}	
}


function subir(pedido,respuesta){

	var entrada=new formidable.IncomingForm();
	entrada.uploadDir='upload';
	entrada.parse(pedido);
    entrada.on('fileBegin', function(field, file){
        file.path = "./public/upload/"+file.name;
    });	
    entrada.on('end', function(){
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		respuesta.write('<!doctype html><html><head></head><body>'+
		                'Archivo subido<br><a href="index.html">Retornar</a></body></html>');		
		respuesta.end();
    });	
}



app.listen(8080);
