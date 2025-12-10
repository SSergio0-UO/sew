<?php
include 'cronometro.php';

$mensaje = "";

if (isset($_POST['arrancar'])) {
    $cron->arrancar();
    $mensaje = "Cronómetro arrancado.";
}

if (isset($_POST['parar'])) {
    $cron->parar();
    $mensaje = "Cronómetro parado.";
}

if (isset($_POST['mostrar'])) {
    $mensaje = "Tiempo transcurrido: " . $cron->mostrar();
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MotoGP</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/favicon.ico" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="js/carrusel.js"></script>
</head>

<body>
    <header>
        <!-- Datos con el contenidos que aparece en el navegador -->
        <h1><a href="index.html">MotoGP Desktop</a></h1>
        <nav>
            <a href="index.html" class="active">Inicio</a>
            <a href="piloto.html">Piloto</a>
            <a href="circuito.html">Circuito</a>
            <a href="meteorologia.html">Meteorologia</a>
            <a href="clasificaciones.php">Clasificaciones</a>
            <a href="juegos.html">Juegos</a>
            <a href="ayuda.html">Ayuda</a>
        </nav>
    </header>
    <!-- Migas de pan -->
    <p>Estas en: <a href="index.html">Inicio</a> | <strong>Cronómetro</strong></p>

    <main>
        <h2>Cronómetro de MotoGP Desktop</h2>

        <form method="post">
            <button type="submit" name="arrancar">Arrancar</button>
            <button type="submit" name="parar">Parar</button>
            <button type="submit" name="mostrar">Mostrar</button>
        </form>

        <p><strong>
                <?= $mensaje ?>
            </strong></p>
    </main>

</body>

</html>