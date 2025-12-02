<?php
class Clasificaion{
    private $documento;
    private $datos;

    public function __construct(){
        $this -> $documento = "xml/circuitoEsquema.xml";
    }

    public function consultar(){
        $this-> datos = file_get_contents($this->documento);
    }
}



?>


<!DOCTYPE HTML>

<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Sergio Seijo Martínez" />
    <meta name="description" content="" />
    <meta name="keywords" content="Moto, MotoGP" />
    <meta name="viewport" content="width=device-width, initialscale=1.0" />
    <title>MotoGP-Clasificaciones</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/favicon.ico" />
</head>

<body>
    <header>
        <!-- Datos con el contenidos que aparece en el navegador -->
        <h1><a href="index.html">MotoGP Desktop</a></h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="piloto.html">Piloto</a>
            <a href="circuito.html">Circuito</a>
            <a href="meteorologia.html">Meteorologia</a>
            <a href="clasificaciones.php" class="active">Clasificaciones</a>
            <a href="juegos.html">Juegos</a>
            <a href="ayuda.html">Ayuda</a>
        </nav>
    </header>

    <p>Estas en: <a href="index.html">Inicio</a> | <strong>Clasificaciones</strong></p>
    <main>
        <h2>Clasificaiones de MotoGP-Desktop</h2>
        <p>en desarrollo </p>
    </main>
</body>

</html>