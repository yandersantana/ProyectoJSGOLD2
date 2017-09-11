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
//esto es para que aparezcan en la pagina Verhistorias como predeterminadas
/*
function leer() {
    var usuarios2 = [];
    $.getJSON('../php/datos.json', function (data) {
        $.each(data, function (i, emp) {
            console.log("xcxd"+emp);
            var user= new Usuario(emp);
            
            usuarios2.push(user);
        });
    });  
    alert("aqui probando"+usuarios2);
    return usuarios2;

};*/

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
                    id: idCuento,
                    src: imagen
                }

                $.ajax({ //vamos guardando las imagenes del cuento
                    url: '/guardarImagenes',
                    type: 'POST',
                    data: imagenesCuento,
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
            for (audio of user.cuento.audios) {
                var audiosCuento = {
                    id: idCuento,
                    src: imagen
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

            for (pregunta of user.cuento.preguntas) { //recorremos cada pregunta
                var ask = {
                    id: idCuento,
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

                $.ajax({
                    url: '/idPregunta',
                    type: 'GET',
                    cache: false,
                    success: function (idPregunta) { //obtenemos el ultimo id del cuento guardado
                        for (imagen of pregunta.imagens) {
                            var imagenesPregunta = {
                                id: idPregunta,
                                src: imagen
                            }
                        }
                    },
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
        var usuario = new Usuario(1, cuento2);

        //usuario.cuentos.push(cuento2);
        console.log("aqui pase un rato xxx2" + usuario);

        enviarCuento(usuario, function (valio) {
            if (valio == "Guardado") { //si lo guardo
                alert("Cuento Guardado Amiguito");
            } else { //si  no lo guardo
                alert("Cuento No Guardado");
            }


        });

        //  var cue = JSON.stringify(usuarios);

        /*   $.ajax({
               url: '../php/writeJson.php',
               method: 'post',
               data: {
                   "identificador": cue
               },
               success: function (data) {
                   alert(data);

               }
           });*/




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





});









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
