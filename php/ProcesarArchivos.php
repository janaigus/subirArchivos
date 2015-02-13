<?php 
    if($_FILES){
        $mensaje = "";
        $tmp_name = $_FILES["archivo"]["tmp_name"];
        $name = $_FILES["archivo"]["name"];
        if(!move_uploaded_file($tmp_name, "../uploads/$name")){
            $mensaje = '<span class="glyphicon glyphicon-remove-circle"></span> '.$name.' | No se ha podido subir el archivo correctamente<br />';
        }else{
            $mensaje = '<span class="glyphicon glyphicon-ok-circle"></span> '.$name.' | Completado correctamente<br/>';
        }
        echo $mensaje;
    }
?>