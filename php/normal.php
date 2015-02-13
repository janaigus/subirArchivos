<?php session_start();?>
<!-- Primero abrimos sesión, ya que utilizaremos variables $_SESSION en nuestro código -->
<!DOCTYPE HTML>
<html>
<head>
    <title>Prueba</title>
    <meta charset="utf-8">
    <!-- Links de los css de Bootstrap -->
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/bootstrap-theme.min.css">
    <link href="../css/jumbotron-narrow.css" rel="stylesheet">
    <!-- Link de Mi Javascript -->
    <script type="text/javascript" src="../js/normal.js"></script>    
    <!-- Bootstrap JavaScript -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    
</head>
<body>
    <div class="container">
      <div class="header">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation"><a href="../index.html">Drag & Drop</a></li>
            <li role="presentation" class="active"><a href="#">Normal</a></li>
          </ul>
        </nav>
        <h3 class="text-muted">Subida de Imagenes</h3>
      </div>
      
      <div class="row">
          <div class="col-md-12" align="center">
              <div id="manual">
                  <h4>Añada sus imagenes manualmente</h4>
                  <!-- Aqui el formulario que usaremos para pasar los archivos que queremos subir, Importante; -->
                  <!-- la opcion multipart/form-data, y el metodo POST -->
                  <form id="frm01" action="../php/ProcesarArchivosNormal.php" method="POST" enctype="multipart/form-data">
                      <!-- Si queremos subir varios archivos, tenemos que "declarar" que pasaremos un array con los archivos  -->
                      <!-- Para esto el name lo ponemos con [] como se ve a continuacion -->
                    <input type="file" id="imagenInput" name="imagen[]" multiple>
                    </br>
                    <button class="btn btn-default" type="submit" value="Enviar" name="Enviar" id="Enviar">Enviar</button>
                  </form>
              <!-- Aqui pondremos mediante Js lo que vamos a subir y en el caso de que ya hayamos enviado los archivos, mostrar si se han subido correctamente o no -->
                  <div id="respuesta">  
                    <!-- Este div estara oculto hasta el momento que carguemos imagenes con el input file -->
                    <div class="row" id="feed" style="display: none;">
                        <div class="col-md-12">
                            <!-- Mediante js rellenaremos los archivos que querramos subir -->
                            <h2 align="center">Esperando</h2>
                        </div>

                        <div id="esperando"class="col-md-12" >

                        </div>
                        <div class="col-md-12">
                            
                            <h2 align="center">Finalizado</h2>
                        </div>
                    </div>
                      <!-- Esta div, estara vacio en principio y una vez hecho el submit y se hayan subido los archivos se rellenara con los datos de los archivos que hayan subido o no  -->
				    <div class="row" id="feed2">	  
                        <?php 
                            if(isset($_SESSION['imagen'])){?>
                        <!-- Si existe la session ['imagen'] significa que el php ha subido las imagenes -->

                                <div class="col-md-12">
                                    <h2 align="center">Esperando</h2>
                                </div>

                                <div class="col-md-12">
                                    <h2 align="center">Finalizado</h2>
                                    <div id="finalizado">
                            <!-- recorremos las sesiones y sacamos los nombres de los archivos subidos, y rellenamos con mensaje de que estos han subido correctamente -->            
                        <?php 
						  $fichSubidos = $_SESSION['cont'];
						  for($i = 0; $i<$fichSubidos;$i++){
                             echo $_SESSION['nombre'][$i]. "| Completado correctamente <br>";
                          }


                        ?>
					               </div>
                                </div>
					   <?php 
						  	}	
                            //Si no existe la sesion['error'] es que alguno o todos los archivos no se han subido correctamente
					       if(isset($_SESSION['error'])){
                                $fichSubidos = $_SESSION['cont'];
						        for($i = 0; $i<$fichSubidos;$i++){
						          echo $_SESSION['error'][$i];
                                }
					       }
                            //imprimimos error y cerramos la sesion para que no haya problemas de f5
					       session_destroy();
					?>
                </div>
              </div>
            </div>
          </div>
      </div>
      <br/>
      <br/>
      <footer class="footer">
        <p>&copy; Airan Rodríguez Rodríguez y Janai G. Expósito Bethencourt 2015</p>
      </footer>
    </div> <!-- /container -->
</body>
</html>