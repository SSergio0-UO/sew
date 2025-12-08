<!-- archivo: procesar.php -->
<?php

$mostrarFormulario = isset($_GET['iniciar']);


if (isset($_GET['profesion'], $_GET['edad'], $_GET['genero'], $_GET['dato'])) {
    $profesion = htmlspecialchars($_GET['profesion']);
    $edad = (int) $_GET['edad'];
    $genero = htmlspecialchars($_GET['genero']);
    $dato = htmlspecialchars($_GET['pericia']);
} else {
    echo "No se han recibido todos los datos.";
}
?>

<!-- archivo: formulario.html -->
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <title>Formulario GET en PHP</title>
</head>

<body>
    <h2>Formulario de Información</h2>
    <form method="get" name="datosUsuario">
        <!-- Profesión -->
        <label for="profesion">Profesión:</label>
        <input type="text" id="profesion" name="profesion" required><br><br>

        <!-- Edad -->
        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required min="0"><br><br>

        <!-- Género -->
        <label for="genero">Género:</label>
        <select id="genero" name="genero" required>
            <option value="">--Selecciona--</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
        </select><br><br>

        <!-- Otro dato de texto -->
        <label for="pericia">Pericia informatica:</label>
        <input type="text" id="pericia" name="pericia" required><br><br>

        <!-- Botón enviar -->
        <input type="submit" value="Enviar">
    </form>
    <br>
    <h2>Test<h2>
            <?php if (!$mostrarFormulario): ?>
                <!-- Botón iniciar -->
                <form method="get">
                    <button type="submit" name="iniciar" value="1">Iniciar</button>
                </form>
            <?php else: ?>
                <!-- Formulario que aparece al hacer clic en iniciar -->
                <form method="get" name="test">
                    <label for="nombrePiloto">Nombre del piloto:</label>
                    <input type="text" id="nombrePiloto" name="nombrePiloto" required><br><br>

                    <label for="ciudadCarrera">Ciudad de la carrera:</label>
                    <input type="email" id="ciudadCarrera" name="ciudadCarrera" required><br><br>

                    <button type="submit">Enviar</button>
                </form>
            <?php endif; ?>
</body>

</html>