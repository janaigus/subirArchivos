var archivosCargar = new Array();

window.addEventListener("load",iniciar,false);

function iniciar(){
    
    document.getElementById("imagenInput").addEventListener('change', gestionInput, false);

}//de iniciar


function quitarFeed(){
    //esta funcion sirve para ocultar Datos subidos anteriormente, si volvemos a subir otro archivo sin recargar la pagina
    var feedRow2 = document.getElementById("feed2");
    if(feedRow2.style.display = "block"){
        feedRow2.style.display = "none";
    }
    
}//de quitar feed


function gestionInput(ev){
    //Aqui recorremos los archivos subidos al input file y añadirlos a nuestro array
   var miinput = document.getElementById("imagenInput");
    for(var i = 0;i < miinput.files.length;i++){
        // Añadimos los arrivos al array
        archivosCargar.unshift(miinput.files[i]);
    }
    //llamamos a la funcion gestionar, que colocara los arvhivos a subir en la zona de Esperando
    gestionarArchivos();
    //llamamos a quitar Feed Por si es la segunda vez que subimos archivos, borre los archivos subidos anteriormente
    quitarFeed();
}//del gestionar input type file


function gestionarArchivos(){
    if(archivosCargar.length > 0){

            // Por cada archivo leido lo colocamos en el feed
            colocarEnFeed();

    }
}//del gestionar archivos

function colocarEnFeed(){
    // Mostramos la seccion del feed
    var feedRow = document.getElementById("feed");
    
    if(feedRow.style.display != "block"){
        feedRow.style.display = "block";
    }

    // referencia al div donde colocaremos los archivos esperando
    var divCola = document.getElementById("esperando");
    
    //
    for(var i = 0;i < archivosCargar.length;i++){
    //recorremos el array y le formateamos el tamaño ? janai    
    var fich = archivosCargar[i];
    var tam = fich.size / 1024;
    if(tam > 1024){
        tam = tam / 1024;
        var tamredu = tam.toFixed(2) + " mb";
    }
    else{
        var tamredu = tam.toFixed(2) + " kb";
    }

    // Switch sobre la "extension" del fichero, para colocar una imagen propia para cada tipo de archivo
    switch(fich.name.substring(fich.name.lastIndexOf(".") + 1, fich.name.length).toLowerCase()){
        // Comprimidos
        case "zip":
        case "7z":
        case "rar":
        case "tar.gz":
        case "gz":
            divCola.innerHTML +="<div class='row' style='border-top:0; border: 1px solid #e6e6e6; padding-top: 2%; padding-bottom: 2%;'><img src='../img/icono-archivo-comprimido.png'> " + archivosCargar[i].name +" "+ tamredu +" | Esperando... <img src='../img/ajax_clock_small.gif'></div>";
            break;
        // Imagenes
        case "jpg":
        case "png":
        case "jpeg":
        case "gif":
            divCola.innerHTML +="<div class='row' style='border-top:0; border: 1px solid #e6e6e6; padding-top: 2%; padding-bottom: 2%;'><img src='"+URL.createObjectURL(fich)+"' style='width:50px; heigth:50px;'> " + archivosCargar[i].name +" "+ tamredu +" | Esperando... <img src='../img/ajax_clock_small.gif'></div>";
            break;
        // Música
        case "mp3":
        case "flac":
        case "aac":
        case "ogg":
divCola.innerHTML +="<div class='row' style='border-top:0; border: 1px solid #e6e6e6; padding-top: 2%; padding-bottom: 2%;'><img src='../img/icono-musica.png'> " + archivosCargar[i].name +" "+ tamredu +" | Esperando... <img src='../img/ajax_clock_small.gif'></div>";
            break;
        // Videos
        case "mpeg":
        case "mkv":
        case "mp4":
divCola.innerHTML +="<div class='row' style='border-top:0; border: 1px solid #e6e6e6; padding-top: 2%; padding-bottom: 2%;'><img src='../img/icono-video.png'> " + archivosCargar[i].name +" "+ tamredu +" | Esperando... <img src='../img/ajax_clock_small.gif'></div>";
            break;
        default:
            divCola.innerHTML +="<div class='row' style='border-top:0; border: 1px solid #e6e6e6; padding-top: 2%; padding-bottom: 2%;'><img src='../img/icono-indefinido.png'> " + archivosCargar[i].name +" "+ tamredu +" | Esperando... <img src='../img/ajax_clock_small.gif'></div>";

            break;
    }//del switch
        
        }//del for
 

}//fin del feed

