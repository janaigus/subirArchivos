// vble global objAjax
var objAjax;
var inputFalso;
var archivosCargar = new Array();
var cargando = false;
window.addEventListener("load", inicio, false);

// Funcion onload
function inicio() {
    // Añadir el evento dragover
    document.getElementById("caja").addEventListener("drag", permitir, false);
    // Añadir el evento dragover
    document.getElementById("caja").addEventListener("dragover", permitir, false);
    // Añadir el evento drop
    document.getElementById("caja").addEventListener("drop", drop, false);
    // Crear el objeto ajax
    objAjax = crearAjax();
    // Añadir el evento on click al div de la caja
    document.getElementById("caja").addEventListener('click', abrirInput, false);
    // Crear el input que se usará para recoger los datos
    inputFalso = document.createElement("input");
    inputFalso.type = "file";
    inputFalso.multiple = "multiple";
    // Añadir el evento onChange al input
    inputFalso.addEventListener('change', gestionInput, false);
}

/* FUNCIONES ORDENAR Y ENVIAR DATOS */
function colocarEnFeed(){
    // Mostrar la seccion del feed
    var feedRow = document.getElementById("feed");
    if(feedRow.style.display != "block"){
        feedRow.style.display = "block";
    }
    // Colocar el archivo que está siendo descargado
    var fich = archivosCargar[0];
    var tam = fich.size / 1024;
    if(tam > 1024){
        tam = tam / 1024;
        document.getElementById("tamSubiendo").innerHTML = tam.toFixed(2) + " mb";
    }
    else{
        document.getElementById("tamSubiendo").innerHTML = tam.toFixed(2) + " kb";
    }
    var srcImagen = document.getElementById("imagenSubiendo");
    // Colocar la barra de progreso a 0
    var barra = document.getElementById("barraProgreso");
    barra.style.width = "0%";
    // Switch sobre la "extension" del fichero
    switch(fich.name.substring(fich.name.lastIndexOf(".") + 1, fich.name.length).toLowerCase()){
        // Comprimidos
        case "zip":
        case "7z":
        case "rar":
        case "tar.gz":
        case "gz":
            srcImagen.src = "./img/icono-archivo-comprimido.png";
            break;
        // Imagenes
        case "jpg":
        case "png":
        case "jpeg":
        case "gif":
            srcImagen.src = URL.createObjectURL(fich);
            break;
        // Música
        case "mp3":
        case "flac":
        case "aac":
        case "ogg":
            srcImagen.src = "./img/icono-musica.png";
            break;
        // Videos
        case "mpeg":
        case "mkv":
        case "mp4":
            srcImagen.src = "./img/icono-video.png";
            break;
        default:
            srcImagen.src = "./img/icono-indefinido.png";
            break;
    }
    // Colocar el nombre y el tamaño en el div correspondiente
    document.getElementById("nombreSubiendo").innerHTML = fich.name;
    // Colocar los demás elementos en la cola
    var divCola = document.getElementById("esperando");
    divCola.innerHTML = '<h2 align="center">Esperando</h2>';
    for(var i = 1;i < archivosCargar.length;i++){
        divCola.innerHTML += archivosCargar[i].name + " | Esperando... <img src='./img/ajax_clock_small.gif'><br/>";
    }
}

function gestionarArchivos(){
    if(archivosCargar.length > 0){
        if(!cargando){
            // Mostrar la nueva lista formada
            colocarEnFeed();
            // Cargar el primer archivo de la lista
            enviarArchivo(archivosCargar[0]);
            // Quitar el primer elemento de la lista
            archivosCargar.shift();
        }
    }
}

function enviarArchivo(archivo){
    if(objAjax){
        // Crear objeto form data
        var formulario = new FormData();
        formulario.append('archivo', archivo);
        objAjax.onreadystatechange = procesarRespuesta;
        objAjax.open('POST', 'php/ProcesarArchivos.php', true);
        // Añadir el evento a labarra de progreso
        objAjax.upload.addEventListener("progress", barraProgreso, false);
        objAjax.send(formulario);
        
    }
}

/* FUNCIONES INPUT */
// Funcion que se ejecuta cuando se seleccionen elementos
function gestionInput(ev){
    for(var i = 0;i < inputFalso.files.length;i++){
        // Añadir los arrivos al array
        archivosCargar.unshift(inputFalso.files[i]);
    }
    gestionarArchivos();
}

// Funcion que simula el click en el input
function abrirInput(ev){
    inputFalso.click();
}

/* FUNCIONES DE DRAG N DROP */
/* Función que se realizará cuando se hayan arrastrado los elementos */
function drop(ev)
{
    // Prevenir el comportamiento por defecto en el drop que es abrir el archivo en el propio navegador
    ev.preventDefault();
    // Hacer un bucle for para recorrer las imagenes
    for(var i = 0;i < ev.dataTransfer.files.length;i++){
        if(navigator.userAgent.indexOf("WebKit") != -1){
            var archivoChrome = ev.dataTransfer.items[i].webkitGetAsEntry();
            if(archivoChrome.isDirectory){
                $('#myModal').modal('show');
                continue;
            }
        }
        archivosCargar.unshift(ev.dataTransfer.files[i]);
        
    }
    // Comenzar la gestión de los archivos
    gestionarArchivos();
}

function permitir(ev)
{
    ev.preventDefault();
}

/* FUNCIONES AJAX */
// Procesar la respuesta despues de enviar el archivo
function procesarRespuesta(ev){
    switch(this.readyState){
        case 0:
        case 1:
        case 2:
        case 3:
            // Controlar cuando se está cargando un archivo
            cargando = true;
            break;
        case 4:
            if(this.status == 200){
                // Hacer lo necesario con response text
                cargando = false;
                // Colocar los elementos finalizados
                document.getElementById("finalizado").innerHTML += this.responseText;
                gestionarArchivos();
            }
            break;
    }
}

// Funcion para crear el objeto ajax
function crearAjax() {
    var objeto = null; // será el objeto a crear
    try {
        objeto = new XMLHttpRequest(); // navegadores estándar
    } catch (error1) {
        try {
            objeto = new ActiveXObject("Microsoft.XMLHTTP"); // IE con librería MSXML 2.0 o superior
        } catch (error2) {
            try {
                objeto = new ActiveXObject("Msxml12.XMLHTTP"); // IE con librería MSXML 1.2
            } catch (error3) {
                objeto = false; // no hemos logrado crear el objeto, retornamos false
            }
        }
    }
    return objeto; // devolvemos el objeto
}

// Funcion que aumenta progresivamente la barra de progreso
function barraProgreso(ev){
    var barra = document.getElementById("barraProgreso");
    var complete = Math.round(ev.loaded / ev.total * 100);
    //progress.value = progress.innerHTML = complete;
    barra.style.width = complete + "%";
}