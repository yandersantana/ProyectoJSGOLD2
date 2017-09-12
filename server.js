var express = require('express');
var exphbs = require('express-handlebars');
var mysql = require('mysql');
var parser = require('body-parser');


var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs-extra');


var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs({
    defaultLayout: 'plantilla'
}));
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
app.get('/editarCuento', function (req, res) {
    res.render('partials/paginas/editarCuento');
});


app.post('/subir', (req, res) => {
    req.fields; // contains non-file fields 
    req.files; // contains files 


    var form = new formidable.IncomingForm();

    // parse a file upload
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });

        //res.end(util.inspect({fields: fields, files: files}));


    });
    form.on('end', function (fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        console.log(file_name);
        /* Location where we want to copy the uploaded file */
        var new_location = 'public/imagenes/historias/';
        fs.copy(temp_path, new_location + file_name, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
        res.end(file_name);
    });

});


const pg = require('pg');
var conString = "postgres://postgres:postgres@localhost:5432/GoldTales";

app.use(parser.json()); // for parsing application/json
app.use(parser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.get('/cargar', (req, res, next) => {
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM Stories', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);



        });
    });

});



app.post('/imagenes', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.body.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM imagens WHERE stories_id=' + id + ';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/audios', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.body.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM audios WHERE stories_id=' + id + ';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/preguntas', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.body.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM questions WHERE stories_id=' + id + ';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});


app.post('/imagenesPreguntas', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.body.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM imagensQuestions WHERE question_id=' + id + ';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarCuento', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  stories  (title,  description ,  credits ,  user_id) VALUES ('" + req.body.titulo + "', '" + req.body.descripcion + "', '" + req.body.credito + "', 1);", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarCuentoActualizar', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("UPDATE stories SET title='"+req.body.titulo+"', credits='"+req.body.credito+"', description='"+req.body.descripcion+"' WHERE id='" + req.body.idcuento + "';",function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.get('/idCuento', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        client.query('SELECT id FROM stories ORDER BY id DESC ;', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result.rows);


        });


    });


});

app.post('/guardarImagenesActualizadas', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("UPDATE imagens SET src='"+req.body.src+"', id='"+req.body.id+"';", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);


        });

    });


});


app.post('/guardarImagenes', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  imagens  (src,  stories_id) VALUES ('" + req.body.src + "', '" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarAudios', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  audios  (src ,  stories_id) VALUES ('" + req.body.src + "', '" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarPregunta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  questions  (question, answer,  stories_id) VALUES ('" + req.body.pregu + "', '" + req.body.respu + "','" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarPreguntaImagenes', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  imagensquestions  (src,  question_id) VALUES ('" + req.body.src + "', '" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.get('/idPregunta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        client.query('SELECT id FROM questions ORDER BY id DESC ;', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result.rows);


        });


    });



});



app.post('/idPreguntaCuento', (req, res) => {
    //console.log(util.inspect(req, false,null));
    var client = new pg.Client(conString);
    client.connect(function (err) {
        client.query('SELECT id FROM questions WHERE stories_id= '+req.body.idcuento+';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result.rows);


        });


    });


});



app.post('/eliminarImgPregCuento', (req, res) => {
    
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM imagensquestions WHERE question_id=' + req.body.idpreg + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result);
        });
    });
});



app.post('/eliminarCuento', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM stories WHERE id=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result);
        });
    });
});



app.post('/eliminarImagenesCuento', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM imagens WHERE stories_id=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
    });
});


app.post('/eliminarAudiosCuento', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM audios WHERE stories_id=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
    });
});

app.post('/eliminarPreguntasCuento', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM questions WHERE stories_id=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result);
        });
    });
});


app.post('/cargarCuentoPorId', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM stories WHERE id='+ req.body.idcuento +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});



app.post('/listarImagenes', (req, res) => {
    var client = new pg.Client(conString);
    var idcuento=req.body.idcuento;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM imagens WHERE stories_id=' + idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
             client.end();
            return res.json(result.rows);         
        });      
    });   
});


app.post('/listarAudios', (req, res) => {
    var client = new pg.Client(conString);
    var idcuento=req.body.idcuento;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM audios WHERE stories_id=' + idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
             client.end();
            return res.json(result.rows);         
        });      
    });   
});

app.post('/listarPreguntas', (req, res) => {
    var client = new pg.Client(conString);
    var idcuento=req.body.idcuento;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM questions WHERE stories_id=' + idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
             client.end();
            return res.json(result.rows);         
        });      
    });   
});

app.post('/listarImagenesPreguntas', (req, res) => {
    var client = new pg.Client(conString);
    var idpregunta=req.body.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM imagensquestions WHERE question_id=' + idpregunta + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
             client.end();
            return res.json(result.rows);         
        });      
    });   
});


app.listen(8080);
