var hoja = 5;
var paginas = 4;
var id = 0;
var cuentos = [];
var cuentosIm = [];
var cuentosAu = [];
var ImPreguntas = [];
var ImPreguntas2 = [];
var ArrPreg = [];

var idCuento = 5;


function enviarCuento(user, callback) {
    // var datos = "";
    var cuentero = {
        titulo: user.cuento.titulo,
        credito: user.cuento.creditos,
        descripcion: user.cuento.descripcion
    }
    $.ajax({
        url: '/guardarCuento',
        type: 'POST',
        data: cuentero,
        cache: false,
        success: function (data) {
            //   datos = data;
            //callback(datos);

        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

    $.ajax({
        url: '/idCuento',
        type: 'GET',
        cache: false,
        success: function (idCuento) { //obtenemos el ultimo id del cuento guardado
            for (imagen of user.cuento.imagenes) {

                var imagenesCuento = {
                    id: idCuento[0].id + 1,
                    src: imagen.src
                }

                console.log("el id" + idCuento[0].id);
                $.ajax({ //vamos guardando las imagenes del cuento
                    url: '/guardarImagenes',
                    type: 'POST',
                    data: imagenesCuento,
                    cache: false,
                    success: function (data) {


                    },
                    //si ha ocurrido un error
                    error: function () {
                        console.log("error");

                    }
                });


            }
            if (user.cuento.audios != undefined) {
                for (audio of user.cuento.audios) {
                    var audiosCuento = {
                        id: idCuento[0].id + 1,
                        src: audio.src
                    }

                    $.ajax({ //vamos guardando los Audios del cuento
                        url: '/guardarAudios',
                        type: 'POST',
                        data: audiosCuento,
                        cache: false,
                        success: function (data) {
                            //   datos = data;
                            //callback(datos);

                        },
                        //si ha ocurrido un error
                        error: function () {
                            console.log("error");

                        }
                    });


                }
            }
            if (user.cuento.preguntas != undefined) {
                for (pregunta of user.cuento.preguntas) { //recorremos cada pregunta
                    if (pregunta != undefined && pregunta.pregunta != "") {
                        var ask = {
                            id: idCuento[0].id + 1,
                            pregu: pregunta.pregunta,
                            respu: pregunta.respuesta
                        }

                        $.ajax({ //vamos guardando la pregunta 
                            url: '/guardarPregunta',
                            type: 'POST',
                            data: ask,
                            cache: false,
                            success: function (preguId) {},
                            //si ha ocurrido un error
                            error: function () {
                                console.log("error");

                            }
                        });
                        var preguntaCopiada = pregunta;
                        $.ajax({
                            url: '/idPregunta',
                            type: 'GET',
                            cache: false,
                            success: function (idPregunta) { //obtenemos el ultimo id de la pregunta guardada
                                for (imagen of preguntaCopiada.imagens) {
                                    console.log(imagen.src);
                                    console.log(idPregunta[0].id);
                                    var imagenesPregunta = {
                                        id: idPregunta[0].id + 1,
                                        src: imagen.src
                                    }

                                    $.ajax({ //vamos guardando las imagenes de las preguntas 
                                        url: '/guardarPreguntaImagenes',
                                        type: 'POST',
                                        data: imagenesPregunta,
                                        cache: false,
                                        success: function (pred) {},
                                        //si ha ocurrido un error
                                        error: function () {
                                            console.log("error");

                                        }
                                    });
                                }
                            },
                            //si ha ocurrido un error
                            error: function () {
                                console.log("error");

                            }
                        });

                    }
                }
            }


        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

    callback("Guardado");


}

function actualizaImagenesEnviar(imagen, imaAactualizar) {


    var imagenesCuento = {
        id: imagen.id,
        src: imaAactualizar.src
    }

    $.ajax({ //vamos guardando las imagenes del cuento
        url: '/guardarImagenesActualizadas',
        type: 'POST',
        data: imagenesCuento,
        cache: false,
        success: function (data) {


        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });
}

function enviarActualizar(user, callback) {
    // var datos = "";
    var cuentero = {
        idcuento: user.usuario,
        imagenes: user.cuento.imagenes,
        titulo: user.cuento.titulo,
        credito: user.cuento.creditos,
        descripcion: user.cuento.descripcion
    }
    $.ajax({
        url: '/guardarCuentoActualizar',
        type: 'POST',
        data: cuentero,
        cache: false,
        success: function (data) {
             
             $.ajax({
                    url: '/idPreguntaCuento',
                    type: 'POST',
                    // Form data
                    //datos del formulario
                    data: cuentero,
                    //necesario para subir archivos via ajax
                    cache: false,

                    success: function (data) {
                        alert("miau " + data.length);
                        $.each(data, function (i, emp) {
                            alert("idpreg " + emp.id);
                            var elem2 = {
                                idpreg: emp.id
                            };
                            $.ajax({
                                url: '/eliminarImgPregCuento',
                                type: 'POST',
                                data: elem2,
                                cache: false,

                                success: function (data) {

                                    alert("Se ha eliminado las imagenes cuento");
                                    //desde aqui noooooooooooooooooooooooooooooooooooooooooooo
                                    $.ajax({
                                        url: '/eliminarImagenesCuento',
                                        type: 'POST',
                                        data: cuentero,
                                        cache: false,

                                        success: function (data) {


                                            alert("Se ha eliminado las imagenes");
                                            $.ajax({
                                                url: '/eliminarAudiosCuento',
                                                type: 'POST',
                                                data: cuentero,
                                                cache: false,

                                                success: function (data) {

                                                    alert("Se ha eliminado los audios");
                                                    $.ajax({
                                                        url: '/eliminarPreguntasCuento',
                                                        type: 'POST',
                                                        data: cuentero,
                                                        cache: false,

                                                        success: function (data) {

                                                            alert("Se ha eliminado las preguntas");
                                                            
                                                            
                                                            
                                                            for (imagen of user.cuento.imagenes) {

                                                                var imagenesCuento = {
                                                                    id: user.usuario,
                                                                    src: imagen.src
                                                                }

                                                               
                                                                $.ajax({ //vamos guardando las imagenes del cuento
                                                                    url: '/guardarImagenes',
                                                                    type: 'POST',
                                                                    data: imagenesCuento,
                                                                    cache: false,
                                                                    success: function (data) {


                                                                    },
                                                                    //si ha ocurrido un error
                                                                    error: function () {
                                                                        console.log("error");

                                                                    }
                                                                });


                                                            }
                                                            
                                                            if (user.cuento.audios != undefined) {
                                                                for (audio of user.cuento.audios) {
                                                                    var audiosCuento = {
                                                                        id: user.usuario,
                                                                        src: audio.src
                                                                    }

                                                                    $.ajax({ //vamos guardando los Audios del cuento
                                                                        url: '/guardarAudios',
                                                                        type: 'POST',
                                                                        data: audiosCuento,
                                                                        cache: false,
                                                                        success: function (data) {
                                                                            //   datos = data;
                                                                            //callback(datos);

                                                                        },
                                                                        //si ha ocurrido un error
                                                                        error: function () {
                                                                            console.log("error");

                                                                        }
                                                                    });


                                                                }
                                                            }
                                                            if (user.cuento.preguntas != undefined) {
                                                                for (pregunta of user.cuento.preguntas) { //recorremos cada pregunta
                                                                    if (pregunta != undefined && pregunta.pregunta != "") {
                                                                        var ask = {
                                                                            id: user.usuario,
                                                                            pregu: pregunta.pregunta,
                                                                            respu: pregunta.respuesta
                                                                        }

                                                                        $.ajax({ //vamos guardando la pregunta 
                                                                            url: '/guardarPregunta',
                                                                            type: 'POST',
                                                                            data: ask,
                                                                            cache: false,
                                                                            success: function (preguId) {},
                                                                            //si ha ocurrido un error
                                                                            error: function () {
                                                                                console.log("error");

                                                                            }
                                                                        });
                                                                        var preguntaCopiada = pregunta;
                                                                        $.ajax({
                                                                            url: '/idPregunta',
                                                                            type: 'GET',
                                                                            cache: false,
                                                                            success: function (idPregunta) { //obtenemos el ultimo id de la pregunta guardada
                                                                                for (imagen of preguntaCopiada.imagens) {
                                                                                    console.log(imagen.src);
                                                                                    console.log(idPregunta[0].id);
                                                                                    var imagenesPregunta = {
                                                                                        id: user.usuario,
                                                                                        src: imagen.src
                                                                                    }

                                                                                    $.ajax({ //vamos guardando las imagenes de las preguntas 
                                                                                        url: '/guardarPreguntaImagenes',
                                                                                        type: 'POST',
                                                                                        data: imagenesPregunta,
                                                                                        cache: false,
                                                                                        success: function (pred) {},
                                                                                        //si ha ocurrido un error
                                                                                        error: function () {
                                                                                            console.log("error");

                                                                                        }
                                                                                    });
                                                                                }
                                                                            },
                                                                            //si ha ocurrido un error
                                                                            error: function () {
                                                                                console.log("error");

                                                                            }
                                                                        });

                                                                    }
                                                                }
                                                            }
                                                            
                                                            
                                                            
                                                            
                                                            
                                                            
                                                            

                                                        },
                                                        //si ha ocurrido un error
                                                        error: function () {
                                                            console.log("error");
                                                        }
                                                    });


                                                },
                                                //si ha ocurrido un error
                                                error: function () {
                                                    console.log("error");
                                                }
                                            });
                                        }

                                    });



                                    //desde aqui nada ---------------------------
                                },
                                //si ha ocurrido un error
                                error: function () {
                                    console.log("error lalalla");
                                }
                            });
                        });
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error tomar id cuento");
        }
    });

            
            
            

        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

   /* $.ajax({
        url: '/imagenes',
        type: 'POST',
        data: cuentero,
        cache: false,
        success: function (imagens) { //obtenemos las imagenes que pertenezcan a nuestro cuento
            for (imaAactualizar of user.cuento.imagenes) {
                for ( imagen of imagens) {
                    actualizaImagenesEnviar(imaAactualizar, imagen);
                }
            }
           
             
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });*/

    callback("Guardado");


}


class Usuario {

    constructor(user, cuento) {
        this.usuario = user;
        this.cuento = cuento;
    }
}

class Cuento {


    constructorObj(obj) {

        this.titulo = obj.titulo;
        this.descripcion = obj.descripcion;
        this.creditos = obj.creditos;
        var imagenes1 = [];
        $.each(obj.imagenes, function (i, emp) {
            /*var iT= new Imagenes();
             alert(obj.imagenes[0].src);
           iT.constructor(emp);
             console.log("imagen"+emp);
            imagenes1.push(iT);*/
            imagenes1.push(emp);
        });
        console.log("aqui hay un error" + imagenes1);
        this.imagenes = imagenes1;
        var audios1 = [];
        $.each(obj.audios, function (i, emp) {

            audios1.push(emp);
        });
        this.audios = audios1;
        var preg = [];
        $.each(obj.preguntas, function (i, emp) {
            /*var iT= new Imagenes();
             alert(obj.imagenes[0].src);
           iT.constructor(emp);
             console.log("imagen"+emp);
            imagenes1.push(iT);*/
            preg.push(emp);
        });
        this.pregunta = preg;




        console.log("audio" + audios1[0].src);

        console.log(imagenes1);
        console.log(audios1);
    }


    constru(titulo, descripcion, credito, imagenes, audios, preguntas) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.creditos = credito;
        this.imagenes = imagenes;
        this.audios = audios;
        this.preguntas = preguntas;
    }

}

class Pregunta {
    constru(pregunta, imagens, respuesta) {
        console.log("aqui va1111" + respuesta);
        this.pregunta = pregunta;
        this.imagens = imagens;
        this.respuesta = respuesta;
        console.log("aqui va" + respuesta);
    }
}



function crearCuento() {
    idCuento++;
    var title = $('input:text[name=fname]').val();
    var des = $('input:text[name=fdescripcion]').val();
    var cre = $('input:text[name=fcreditos]').val();

    var cuent = new Cuento(title, des, cre, cuentosIm, cuentosAu);
    console.log("aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii" + cuent.nombre);
    return cuent;
}




$(document).ready(function () {
    //  cuentosPorDefault();
    cargar();

    ActivarDroppablePreguntas();


    //Ocultamos el contenedor de preguntas
    $(".contPreguntas").hide();

    $(".NuevaHoja").click(function () {
        var Thtml = "<div class='item'>\
                      <div id='hojaBln" + hoja + "'>\
                        \
                      </div>\
                    </div>"
        $(".carousel-inner").append(Thtml);
        $(".nav-dots").append("<li data-target='#carousel-example-generic' data-slide-to=" + paginas + " class='nav-dot'><div class='hojas' id=n" + hoja + "></div></li>");
        $(".ContAu").append("<h3>Audio" + hoja + "</h3><span><div class='HojAud' id=au" + hoja + "></div></span>");
        paginas++;
        id++;
        hoja++;
        cargar();
        ActivarDroppableAudio();


    });
    $(".button2").click(function () {

        location.reload();

    });

    $(".button3").click(function () {
        $(".contPreguntas").show();
        alert("Dirijase hacia la parte inferior de la pagina");


    });

    $("#btnG").click(function () {

        var pre1 = $('input:text[name=preg1]').val();
        var pre2 = $('input:text[name=preg2]').val();
        var resp1 = $('input:text[name=resp1]').val();
        var resp2 = $('input:text[name=resp2]').val();
        console.log(pre1 + pre2 + resp1 + resp2);

        $(".preg1 img").each(function () {
            AgrImg = ($(this).attr('src'));
            item = {};
            item["src"] = AgrImg;
            ImPreguntas.push(item);
        });

        $(".preg2 img").each(function () {
            AgrImg = ($(this).attr('src'));
            item = {};
            item["src"] = AgrImg;
            ImPreguntas2.push(item);
        });

        var pregunta1 = new Pregunta();
        pregunta1.constru(pre1, ImPreguntas, resp1);
        var pregunta2 = new Pregunta();
        pregunta2.constru(pre2, ImPreguntas2, resp2);
        ArrPreg.push(pregunta1);
        ArrPreg.push(pregunta2);
        var cue = JSON.stringify(ArrPreg);
        console.log(ImPreguntas);
        console.log(ImPreguntas2);
        console.log(cue);


    });


    $("#boton").click(function () {
        var cue = "";

        $(".hojas img").each(function () {
            AgrImg = ($(this).attr('src'));
            item = {};
            item["src"] = AgrImg;
            cuentosIm.push(item);
        });


        $(".HojAud audio").each(function () {
            AgrAud = ($(this).children().attr('src'));
            item = {};
            item["src"] = AgrAud;
            cuentosAu.push(item);
        });

        // var usuarios=[];
        //var cuento= crearCuento();



        var cuento2 = new Cuento();

        var title = $('input:text[name=fname]').val();
        var des = $('input:text[name=fdescripcion]').val();
        var cre = $('input:text[name=fcreditos]').val();
        guardarPreguntas();

        cuento2.constru(title, des, cre, cuentosIm, cuentosAu, ArrPreg);
        var usuario = new Usuario(1, cuento2); //creo el usuario

        //usuario.cuentos.push(cuento2);
        console.log("aqui pase un rato xxx2" + usuario);

        enviarCuento(usuario, function (valio) { //envio la peticion
            if (valio == "Guardado") { //si lo guardo
                alert("Cuento Guardado Amiguito");
            } else { //si  no lo guardo
                alert("Cuento No Guardado");
            }


        });



    });

    $("#botonActualizar").click(function () {
        var cue = "";

        $(".hojas img").each(function () {
            AgrImg = ($(this).attr('src'));
            item = {};
            item["src"] = AgrImg;
            cuentosIm.push(item);
        });


        $(".HojAud audio").each(function () {
            AgrAud = ($(this).children().attr('src'));
            item = {};
            item["src"] = AgrAud;
            cuentosAu.push(item);
        });

        // var usuarios=[];
        //var cuento= crearCuento();



        var cuento2 = new Cuento();

        var title = $('input:text[name=fname]').val();
        var des = $('input:text[name=fdescripcion]').val();
        var cre = $('input:text[name=fcreditos]').val();
        guardarPreguntas();

        cuento2.constru(title, des, cre, cuentosIm, cuentosAu, ArrPreg);
        var idcue = localStorage.getItem("var");
        var usuario = new Usuario(idcue, cuento2); //creo el usuario

        //usuario.cuentos.push(cuento2);
        console.log("aqui pase un rato xxx2" + usuario);

        enviarActualizar(usuario, function (valio) { //envio la peticion
            if (valio == "Guardado") { //si lo guardo
                alert("Cuento Actualizado Amiguito");
            } else { //si  no lo guardo
                alert("Cuento No Guardado");
            }


        });



    });
    //++++++++++++++++++++++++++++++++++++++++++++++Subir Imagenes++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //Agregar imagenes al contenedor

    $(".messages").hide();
    //queremos que esta variable sea global
    var fileExtension = "";
    //función que observa los cambios del campo file y obtiene información
    $('#imagen').change(function () {
        //obtenemos un array con los datos del archivo
        var file = $("#imagen")[0].files[0];

        //obtenemos el nombre del archivo
        var fileName = file.name;

        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
        showMessage("<span class='info'>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
    });

    //al enviar el formulario
    $('.AgregarImg').click(function () {
        //información del formulario
        var formData = new FormData($(".formulario")[0]);
        var message = "";
        //hacemos la petición ajax  
        $.ajax({
            url: '/subir',
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function () {
                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                showMessage(message)
            },
            //una vez finalizado correctamente

            success: function (data) {

                message = $("<span class='success'>La imagen ha subido correctamente.</span>");
                showMessage(message);

                if (isImage(fileExtension)) {

                    $(".showImages").append("<img id='draggable' src='../imagenes/historias/" + data + "' />");
                    cargar();
                    ActivarDroppablePreguntas();
                }
            },
            //si ha ocurrido un error
            error: function () {
                message = $("<span class='error'>Ha ocurrido un error.</span>");
                showMessage(message);
            }
        });
    });


    //link del tutorial para subir imagenes con jquery y Javascript
    //https://www.uno-de-piera.com/subir-imagenes-con-php-y-jquery/

    //+++++++++++++++++++++++++++++++++++++++++++++Subir Audios+++++++++++++++++++++++++++++++++++++++++++++++++++++++

    $(".messages").hide();
    //queremos que esta variable sea global
    //var fileExtension = "";
    //var fileName="";
    //función que observa los cambios del campo file y obtiene información
    $('#audios').change(function () {

        //obtenemos un array con los datos del archivo
        var file = $("#audios")[0].files[0];

        //obtenemos el nombre del archivo
        fileName = file.name;

        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
        showMessage("<span class='info'>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
    });

    //Agregar al contenedor

    $('.AgregarAudio').click(function () {
        //información del formulario
        var formData = new FormData($(".formulario2")[0]);
        var message = "";
        //hacemos la petición ajax  
        $.ajax({
            url: '/subir',
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function () {
                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                showMessage(message)
            },
            //una vez finalizado correctamente
            success: function (data) {
                alert("entro1");
                message = $("<span class='success'>La imagen ha subido correctamente.</span>");
                showMessage(message);
                if (isAudio(fileExtension)) {

                    $(".insertAudio").append("<audio id='draggable' controls><source src='../imagenes/historias/" + data + "' type='audio/mpeg'></audio> <span>" + fileName + "</span>");
                    ActivarDroppableAudio();
                }
            },
            //si ha ocurrido un error
            error: function () {
                message = $("<span class='error'>Ha ocurrido un error.</span>");
                showMessage(message);
            }
        });
    });



    $("#buttonEliminar").click(function () {
        var idcuent = $('input:text[id=deletecuento]').val();
        alert("presiono " + idcuent);
        deleteCuento(idcuent);
    });


    $("#buttonEditar").click(function () {
        var idcuent = $('input:text[id=editcuento]').val();
        alert("presiono " + idcuent);
        enviarEditar(idcuent);
    });

});

function deleteCuento(id) {
    alert("Hola eliminar cuento" + id);
    //AQUIIIIIIII ESTABA EL ERROR
    //var j = localStorage.getItem("var");
    var elem = {
        idcuento: id
    }; //Variable transformada en objeto para enviarla en data

    //alert("Hola eliminar cuento mii" );

    $.ajax({
        url: '/idPreguntaCuento',
        type: 'POST',
        // Form data
        //datos del formulario
        data: elem,
        //necesario para subir archivos via ajax
        cache: false,

        success: function (data) {
            alert("miau " + data.length);
            $.each(data, function (i, emp) {
                alert("idpreg " + emp.id);
                var elem2 = {
                    idpreg: emp.id
                };
                $.ajax({
                    url: '/eliminarImgPregCuento',
                    type: 'POST',
                    data: elem2,
                    cache: false,

                    success: function (data) {

                        alert("Se ha eliminado las imagenes cuento");
                        //desde aqui noooooooooooooooooooooooooooooooooooooooooooo
                        $.ajax({
                            url: '/eliminarImagenesCuento',
                            type: 'POST',
                            data: elem,
                            cache: false,

                            success: function (data) {


                                alert("Se ha eliminado las imagenes");
                                $.ajax({
                                    url: '/eliminarAudiosCuento',
                                    type: 'POST',
                                    data: elem,
                                    cache: false,

                                    success: function (data) {

                                        alert("Se ha eliminado los audios");
                                        $.ajax({
                                            url: '/eliminarPreguntasCuento',
                                            type: 'POST',
                                            data: elem,
                                            cache: false,

                                            success: function (data) {

                                                alert("Se ha eliminado las preguntas");
                                                $.ajax({
                                                    url: '/eliminarCuento',
                                                    type: 'POST',
                                                    data: elem,
                                                    cache: false,

                                                    success: function (data) {

                                                        alert("Se ha eliminado el cuento");

                                                    },
                                                    //si ha ocurrido un error
                                                    error: function () {
                                                        console.log("error");
                                                    }
                                                });

                                            },
                                            //si ha ocurrido un error
                                            error: function () {
                                                console.log("error");
                                            }
                                        });


                                    },
                                    //si ha ocurrido un error
                                    error: function () {
                                        console.log("error");
                                    }
                                });
                            }

                        });



                        //desde aqui nada ---------------------------
                    },
                    //si ha ocurrido un error
                    error: function () {
                        console.log("error lalalla");
                    }
                });
            });
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error tomar id cuento");
        }
    });



};




function showMessage(message) {
    $(".messages").html("").show();
    $(".messages").html(message);
}

//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension) {
    switch (extension.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'png':
        case 'jpeg':
            return true;
            break;
        case 'jpg':
        case 'mp3':
        case 'wav':
            return true;
            break;
        default:
            return false;
            break;
    }
}


//Comprobamos si es audio
function isAudio(extension) {
    switch (extension.toLowerCase()) {
        case 'mp3':
        case 'wav':
            return true;
            break;
        default:
            return false;
            break;
    }
}




function cargar() {
    $("[id^=draggable]").draggable({
        revert: true
    });
    $("[id^=n]").droppable({
        drop: function (event, ui) {
            agregar = $(ui.draggable).attr('src');
            idA = $(this).attr("id");
            $("#" + idA + "").empty(); // vaciar los contenedores en el caso que este lleno
            $("#hojaBl" + idA + "").empty(); // vaciar los contenedores en el caso que este lleno
            $("#hojaBl" + idA + "").append("<img src=" + agregar + ">"); //agrego la imagen al contenedor del slider          
            $("#" + idA + "").append("<img src=" + agregar + ">"); //agrego la imagen a la pagina en miniatura.

        }
    });
}

function ActivarDroppableAudio() {
    $("[id^=draggable]").draggable({
        revert: true
    });
    $("[id^=au]").droppable({
        drop: function (event, ui) {
            agregar = $(ui.draggable).children().attr('src');
            idA = $(this).attr("id");
            $("#" + idA + "").empty(); // vaciar los contenedores en el caso que este lleno
            $("#" + idA + "").append("<audio id='draggable' controls><source src='" + agregar + "' type='audio/mpeg'></audio> ");

        }
    });
}


function ActivarDroppablePreguntas() {
    $("[id^=draggable]").draggable({
        revert: true
    });
    $("[id^=ImP]").droppable({
        drop: function (event, ui) {

            agregar = $(ui.draggable).attr('src');
            idA = $(this).attr("id");
            $("#" + idA + "").empty(); // vaciar los contenedores en el caso que este lleno


            $("#" + idA + "").append("<img src=" + agregar + ">"); //agrego la imagen a la pagina en miniatura.

        }
    });
}


function guardarPreguntas() {

    var pre1 = $('input:text[name=preg1]').val();
    var pre2 = $('input:text[name=preg2]').val();
    var resp1 = $('input:text[name=resp1]').val();
    var resp2 = $('input:text[name=resp2]').val();
    console.log(pre1 + pre2 + resp1 + resp2);

    $(".preg1 img").each(function () {
        AgrImg = ($(this).attr('src'));
        item = {};
        item["src"] = AgrImg;
        ImPreguntas.push(item);

    });

    $(".preg2 img").each(function () {
        AgrImg = ($(this).attr('src'));
        item = {};
        item["src"] = AgrImg;
        ImPreguntas2.push(item);
    });

    var pregunta1 = new Pregunta();
    pregunta1.constru(pre1, ImPreguntas, resp1);
    var pregunta2 = new Pregunta();
    pregunta2.constru(pre2, ImPreguntas2, resp2);
    ArrPreg.push(pregunta1);
    ArrPreg.push(pregunta2);
    var cue = JSON.stringify(ArrPreg);
    console.log(ImPreguntas);
    console.log(ImPreguntas2);
    console.log(cue);
}




function enviarEditar(id) {
    alert("recibie l cuento kkk" + id);
    localStorage.setItem("var", id);
    window.location = "/editarCuento";
};



function editarCuento() {
    $(".contPreguntas").show();
    var idcue = localStorage.getItem("var");

    var elem = {
        idcuento: idcue
    }
    alert("ceunto" + idcue);
    alert("entro aqio");
    $.ajax({
        url: '/cargarCuentoPorId',
        type: 'POST',
        data: elem,
        cache: false,

        success: function (data) {
            $('input:text[name=fname]').val(data[0].title);
            $('input:text[name=fdescripcion]').val(data[0].description);
            $('input:text[name=fcreditos]').val(data[0].credits);

        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });


    $.ajax({
        url: '/listarImagenes',
        type: 'POST',
        data: elem,
        cache: false,

        success: function (data) {

            console.log(data);
            alert(data.length);


            $.each(data, function (index, elem) {
                index++;
                alert("index" + index);
                $("#hojaBl" + index + "").empty(); // vaciar los contenedores en el caso que este lleno
                $("#hojaBln" + index + "").append("<img src=" + elem.src + ">"); //agrego la imagen al contenedor del slider
                $("#n" + index + "").append("<img src=" + elem.src + ">"); //agrego la imagen a la pagina en miniatura.


            });

            //contCuento = $(".nav-dot").length;

            $.ajax({
                url: '/listarAudios',
                type: 'POST',
                data: elem,
                cache: false,

                success: function (data) {
                    $.each(data, function (index, elem) {
                        index++;

                        $("#au" + index + "").append("<audio id='draggable' controls><source src='" + elem.src + "' type='audio/mpeg'></audio> ");


                    });

                },
                //si ha ocurrido un error
                error: function () {
                    console.log("error");

                }
            });

            //listar preguntas
            $.ajax({ //vamos extrayendo la pregunta 
                url: '/listarPreguntas',
                type: 'POST',
                data: elem,
                cache: false,
                success: function (preguntaExtraida) {
                    var cont = 1;
                    if (preguntaExtraida != undefined) {
                        for (p of preguntaExtraida) {
                            if (p != undefined && cont == 1) {

                                $('input:text[name=preg1]').val(p.question);
                                $('input:text[name=resp1]').val(p.answer);
                                listarImagenesPreguntas(p.id, function (imagenesExtraidasPregunta) { //envio la peticion
                                    var rec = 0;
                                    for (srcimagen of imagenesExtraidasPregunta) {

                                        if (srcimagen != undefined && rec == 0) {
                                            rec++;
                                            $("#ImP1").empty(); // vaciar los contenedores en el caso que este lleno

                                            $("#ImP1").append("<img src=" + srcimagen.src + ">"); //agrego la imagen a la pagina en miniatura.
                                        } else if (srcimagen != undefined && rec == 1) {
                                            rec++;
                                            $("#ImP2").empty(); // vaciar los contenedores en el caso que este lleno

                                            $("#ImP2").append("<img src=" + srcimagen.src + ">"); //agrego la imagen a la pagina en miniatura.

                                        } else {
                                            $("#ImP3").empty(); // vaciar los contenedores en el caso que este lleno

                                            $("#ImP3").append("<img src=" + srcimagen.src + ">"); //agrego la imagen a la pagina en miniatura.
                                        }

                                    }

                                });


                            } else if (p != undefined && cont == 2) {
                                $('input:text[name=preg2]').val(p.question);
                                $('input:text[name=resp2]').val(p.answer);
                                listarImagenesPreguntas(p.id, function (imagenesExtraidasPregunta) { //envio la peticion
                                    var rec = 0;
                                    for (srcimagen of imagenesExtraidasPregunta) {

                                        if (srcimagen != undefined && rec == 0) {
                                            rec++;
                                            $("#ImP4").empty(); // vaciar los contenedores en el caso que este lleno

                                            $("#ImP4").append("<img src=" + srcimagen.src + ">"); //agrego la imagen a la pagina en miniatura.
                                        } else if (srcimagen != undefined && rec == 1) {
                                            rec++;
                                            $("#ImP5").empty(); // vaciar los contenedores en el caso que este lleno



                                            $("#ImP5").append("<img src=" + srcimagen.src + ">"); //agrego la imagen a la pagina en miniatura.

                                        } else {
                                            $("#ImP6").empty(); // vaciar los contenedores en el caso que este lleno

                                            $("#ImP6").append("<img src=" + srcimagen.src + ">"); //agrego la imagen a la pagina en miniatura.
                                        }

                                    }

                                });
                            }
                            cont++;
                        }

                    }
                },
                //si ha ocurrido un error
                error: function () {
                    console.log("error");

                }
            });




        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });



}
//llama a las imagenes de cuentos
function listarImagenesPreguntas(idpre, callback) {
    var pregunt = {
        id: idpre
    }
    $.ajax({
        url: '/listarImagenesPreguntas',
        type: 'POST',
        data: pregunt,
        cache: false,
        success: function (imagenesDePreguntas) {
            callback(imagenesDePreguntas);

        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });
}
