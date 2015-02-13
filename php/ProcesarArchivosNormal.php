<?php
    session_start();
//igual que hicimos en nuetra pagina principal iniciamos sesion para poder pasar estos parametros

    // Primero comprobamos si ha llegado algun archivo
    if($_FILES){
      //Creamos una variable contador que usaremos para recorrer en nuestra
      //pagina principal la variable sesion donde guardaremos los datos de los
      //archivos que subamos    
      $cont = 0;  
		for($i=0; $i<count($_FILES['imagen']['name']); $i++) {
            //Cojemos una referencia temporal del archivo
            $tmpFilePath = $_FILES['imagen']['tmp_name'][$i];

            //preguntamos si hemos recojido
            if ($tmpFilePath != ""){
                //Preguntamos si se cargo el archivo
	           if (is_uploaded_file($tmpFilePath)){
		          $cont = $cont + 1;
                   //aumentamos contador y asignamos a la variable sesion que usaremos en la página prinicpal
		          $_SESSION['cont'] = $cont;
                    //recojo la imagen
                    $imagen = $_FILES['imagen']['name'][$i];
                    //Obtenenoms el nombre de la imagen y la extensión del archivo
                    $imagen1 = explode(".",$imagen);
                    //Generamos un nombre aleatorio con números y asignamos la extensión obtenida anteriormente
                   $imagen2 = $imagen1[0].rand(0,9).rand(100,9999).".".$imagen1[1];
                    //Subimos y preguntamos si se subio la imagen
                    if (move_uploaded_file($_FILES['imagen']['tmp_name'][$i], "../uploads/".$imagen2)){;
                        //guardamos en las session los nombres de los archivos subidos                                                    
                        $_SESSION['imagen'] = "subida";
                        $_SESSION['nombre'][$i] = $_FILES["imagen"]["name"][$i];
                        //redireccion a la pagina principal                                                                     
                    }else{
                        //si no se subieron las imagenes guardamos en una variable session un mensaje del error y redireccion a la pagina pirnicpal
                        $_SESSION['error'][$i] = "La subida es imposible para el archivo".$_FILES["imagen"]["name"][$i];
                    }
                }
            }//del if
        }//del for      
        header("Location: normal.php");
    }
?>