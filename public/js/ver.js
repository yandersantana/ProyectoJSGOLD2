var v;
var controladorImagenes = 0;
//ver todos los cuentos que hay
function indiceCuentos() {

    $("#principal").empty();
    peticionCuentos(function (result) {

        $.each(result, function (index, elem) {
            var img;
            console.log(elem);
            var datosid = elem.id;
            peticionImagenes(elem, function (imagen) {
                //  alert("Pinterest amigos")
                $("#principal").append('<li><a id=' + elem.id + '><div class="col-lg-4"> <img class="imagenesCuentos"  src=' + imagen[0].src + '>' + elem.title + '</div></a></li>');

            });
        });
    });
}

//ver imagenes
function peticionImagenes(elem, callback) {
    var img;
    console.log(elem);
    $.ajax({
        url: '/imagenes',
        type: 'POST',
        data: elem,
        cache: false,

        success: function (data) {
            console.log(data);
            console.log(data);
            img = data;
            callback(img);
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

}

function peticionAudios(elem, callback) {
    var audio;
    console.log(elem);
    $.ajax({
        url: '/audios',
        type: 'POST',
        data: elem,
        cache: false,

        success: function (data) {
            console.log(data);
            console.log(data);
            audio = data;
            callback(audio);
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

}

function peticionCuentos(callback) {
    var datos = "";
    $.ajax({
        url: '/cargar',
        type: 'GET',

        cache: false,
        contentType: false,
        processData: false,

        success: function (data) {
            datos = data;
            console.log("holaaa" + datos);
            callback(datos);
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

}



function mostrarCuento(e) {
    //llamas a la peticion
    peticionCuentos(function (result) {

        $.each(result, function (index, elem) {
            var datosid = elem.id;

            console.log(e);
            if (datosid == e) {

                $(".col-lg-10").empty(); //elimina todos los nodos que tenga
                $("#nombreCuento").text(elem.title);
                $("#descripcion").text(elem.description);
                $("#creditos").text(elem.credits);
                peticionImagenes(elem, function (imagen) {
                    peticionAudios(elem, function (audio) {
                        var nrodeImagen = 0;
                        var nrodeAudio = 0;
                        //solo llama a la primera
                        $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + imagen[0].src + '  ">');
                        $("#au").empty();
                        $("#au").append("<audio controls><source src='" + audio[0].src + "' type='audio/mpeg'></audio>");

                        $("#siguiente").click(function () {
                             $("#au").empty();
                            $(".col-lg-10").empty();
                            nrodeImagen++;
                            nrodeAudio++;
                            console.log("final es" + imagen.length);
                            if (nrodeImagen < imagen.length) {
                                $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + imagen[nrodeImagen].src + '  ">');

                            }
                            //audio
                            if (nrodeAudio < audio.length) {
                               
                                $("#au").append("<audio controls><source src='" + audio[nrodeAudio].src + "' type='audio/mpeg'></audio>");
                            }
                        });

                        $("#anterior").click(function () {
                            nrodeImagen = 0;
                            console.log(nrodeImagen);
                            $(".col-lg-10").empty();
                            $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + imagen[0].src + '  ">');
                            $("#au").empty();
                            $("#au").append("<audio controls><source src='" + audio[0].src + "' type='audio/mpeg'></audio>");
                        });

                    });
                });
            }
        });
    });





    //if (arrayCuentos[v].imagenes[0].src != null) { //si la primera imagen no es igual a null
    //  $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[0].src + '  ">');
    //$("#au").append("<audio controls><source src='" + arrayCuentos[v].audios[0].src + "' type='audio/mpeg'></audio>");
    //}
}



$(document).ready(function () {

    indiceCuentos();




    //Ver cuentos
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];



    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        location.reload();
        modal.style.display = "none";

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

        }
    }


    $('body').on('click', '#principal a', function () {
        modal.style.display = "block";
        var v = $(this).attr('id');
        alert("Has seleccionado el cuento " + v);
        mostrarCuento(v);
    })

});



//slider

/*
    $("#anterior").click(function () {
        $(".col-lg-10").empty();
        $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[0].src + '  ">');
        controladorImagenes = 0;
        $("#au").append("<audio controls><source src='" + arrayCuentos[v].audios[0].src + "' type='audio/mpeg'></audio>");
    });
    $("#siguiente").click(function () {
        $("#au").empty();
     
        controladorImagenes = controladorImagenes + 1;
        
        var cont = 0;
        if (controladorImagenes < arrayCuentos[v].imagenes.length) { //va a la imagen siguiente 
            console.log("nooooooo");
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + arrayCuentos[v].imagenes[controladorImagenes].src + '  ">');
            console.log("por aqui paso");
            console.log(arrayCuentos[v].audios[0].src);
            $("#au").empty();
            $("#au").append("<audio controls><source src='" + arrayCuentos[v].audios[controladorImagenes].src + "' type='audio/mpeg'></audio>");
            cont++;
        } else {
            controladorImagenes = controladorImagenes - 1;
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="../imagenes/historias/fin.png">');
            console.log(cont);
        }
        
           //preguntas
        if (controladorImagenes == 1) {
           
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $("#validacion").append('<div class="container"><h1>' + arrayCuentos[v].preguntas[0].pregunta + '</h1><div class="row"><div class="col-lg-3"><a id="1"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[0].imagens[0].src + '  "></a></div><div class="col-lg-3"><a id="2"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[0].imagens[1].src + '  "></a></div><div class="col-lg-3"><a id="3"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[0].imagens[2].src + '  "></a></div></div></div>');
        }
        
           if (controladorImagenes == 4) {
               
            $(".col-lg-10").empty(); //elimina todos los nodos que tenga
            $("#validacion").append('<div class="container"><h1>' + arrayCuentos[v].preguntas[1].pregunta + '</h1><div class="row"><div class="col-lg-3"><a id="1"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[1].imagens[0].src + '  "></a></div><div class="col-lg-3"><a id="2"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[1].imagens[1].src + '  "></a></div><div class="col-lg-3"><a id="3"><img   alt=" " class="img-responsive" src="' + arrayCuentos[v].preguntas[1].imagens[2].src + '  "></a></div></div></div>');
        }
        
         $('body').on('click', '#validacion a', function () {
       iden = $(this).attr('id');
             if(iden == arrayCuentos[v].preguntas[0].respuesta ) {
                alert("c: Eres genial Respuesta Correcta");
                }
             else{
                 
                  alert(":c Pum pin pum pin");
                 }
    })
    });
});
//exportar Json para el usuario
function exportar(arrayCuentos) {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrayCuentos)); //preparo la data para ser adjuntada al link de exportación
    $('.exportar').attr('href', 'data:' + data);
    //var slug = string_to_slug(title); //convierto el titulo de la partirura a slug para que el archivo contenga ese nombre
    $('.exportar').attr('download', 'pix-data-cuentos.json'); // indico el nombre con el cual se descargará el archivo
    $('.exportar').trigger('click'); // El trigger() método activa el evento especificado y el comportamiento predeterminado de un evento 
}*/
