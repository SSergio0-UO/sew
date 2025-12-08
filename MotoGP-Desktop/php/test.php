<?php
include 'cronometro.php';
include 'configuracion.php';
session_start();
$mostrar_formulario = false;
$formulario_terminado = false;
$preguntas;

// Iniciar cronómetro
if (!isset($_SESSION['cron'])) {
    $_SESSION['cron'] = new Cronometro();
}

if (isset($_POST['iniciar'])) {
    $_SESSION['cron']->arrancar();
    $mostrar_formulario = true;
}

if (isset($_POST['terminar'])) {
    $_SESSION['cron']->parar();
    $formulario_terminado = true;
    $preguntas = [
        'pregunta1' => htmlspecialchars($_POST['pregunta1']),
        'pregunta2' => htmlspecialchars($_POST['pregunta2']),
        'pregunta3' => htmlspecialchars($_POST['pregunta3']),
        'pregunta4' => htmlspecialchars($_POST['pregunta4']),
        'pregunta5' => htmlspecialchars($_POST['pregunta5']),
        'pregunta6' => htmlspecialchars($_POST['pregunta6']),
        'pregunta7' => htmlspecialchars($_POST['pregunta7']),
        'pregunta8' => htmlspecialchars($_POST['pregunta8']),
        'pregunta9' => htmlspecialchars($_POST['pregunta9']),
        'pregunta10' => htmlspecialchars($_POST['pregunta10'])
    ];
}

if (isset($_POST['enviar'])) {
    $genero = htmlspecialchars($_POST['genero']);
    $edad = (int) $_POST['edad'];
    $profesion = htmlspecialchars($_POST['profesion']);
    $pericia = htmlspecialchars($_POST['pericia']);
    $dispositivo = htmlspecialchars($_POST['dispositivo']);
    $comentarios = htmlspecialchars($_POST['comentarios']);
    $mejoras = htmlspecialchars($_POST['mejoras']);
    $valoracion = (int) $_POST['valoracion'];

    $sql_insert_usuario = "INSERT INTO usuarios (genero, edad, profesion, pericia ) VALUES (?, ?, ?, ?)";
    $sql_insert_resultados = "INSERT INTO resultados_test (id_usuario, dispositivo, tiempo, completado, comentarios, mejoras, valoracion) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $sql_inser_observaciones = "INSERT INTO observaciones (id_usuario, comentarios) VALUES (?, ?)";

    $conn = new Configuracion()->getConexion();

    $stmt = $conn->prepare($sql_insert_usuario);
    $stmt->bind_param("siss", $genero, $edad, $profesion, $pericia);
    if ($stmt->execute()) {
        // Obtener el id autoincremental generado
        $id_usuario = $conn->insert_id;

        $stmt = $conn->prepare($sql_insert_resultados);
        $tiempo = $_SESSION['cron']->getTiempo();
        $completado = 1; // Asumiendo que se completó
        $stmt->bind_param("isisssi", $id_usuario, $dispositivo, $tiempo, $completado, $comentarios, $mejoras, $valoracion);
        $stmt->execute();

        $stmt = $conn->prepare($sql_inser_observaciones);
        $observaciones_comentarios = "Preguntas: " . implode(", ", $preguntas);
        $stmt->bind_param("is", $id_usuario, $observaciones_comentarios);
        $stmt->execute();
    } else {
        echo "Error al insertar el usuario: " . $stmt->error;
    }

    $conn->close();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Prueba de Usabilidad MotoGP-Desktop</title>
    <link rel="stylesheet" href="estilos.css">
</head>

<body>
    <h1>Prueba de Usabilidad MotoGP-Desktop</h1>

    <?php if (!$mostrar_formulario): ?>
        <!-- Botón para iniciar la prueba -->
        <form method="post" action="">
            <button type="submit" name="iniciar">Iniciar prueba</button>
        </form>
    <?php else: ?>
        <!-- Formulario con las preguntas -->
        <form method="post" action="">
            <label for="pregunta1">¿Cual es el nombre del piloto?</label><br>
            <input type="text" id="pregunta1" name="pregunta1" required><br><br>

            <label for="pregunta2">Campo 2:</label><br>
            <input type="text" id="pregunta2" name="pregunta2" required><br><br>

            <label for="pregunta3">Campo 1:</label><br>
            <input type="text" id="pregunta3" name="pregunta3" required><br><br>

            <label for="pregunta4">Campo 2:</label><br>
            <input type="text" id="pregunta4" name="pregunta4" required><br><br>

            <label for="pregunta5">Campo 1:</label><br>
            <input type="text" id="pregunta5" name="pregunta5" required><br><br>

            <label for="pregunta6">Campo 2:</label><br>
            <input type="text" id="pregunta6" name="pregunta6" required><br><br>

            <label for="pregunta7">Campo 1:</label><br>
            <input type="text" id="pregunta7" name="pregunta7" required><br><br>

            <label for="pregunta8">Campo 2:</label><br>
            <input type="text" id="pregunta8" name="pregunta8" required><br><br>

            <label for="pregunta9">Campo 1:</label><br>
            <input type="text" id="pregunta9" name="pregunta9" required><br><br>

            <label for="pregunta10">Campo 2:</label><br>
            <input type="text" id="pregunta10" name="pregunta10" required><br><br>

            <button type="submit" name="terminar">Terminar prueba</button>
        </form>
    <?php endif; ?>
    <?php if ($formulario_terminado): ?>
        <form method="post" action="">
            <label for="genero">Género: </label><br>
            <p>
                <input type='radio' name='genero' value='Hombre' />Hombre
                <input type='radio' name='genero' value='Mujer' />Mujer
                <input type='radio' name='genero' value='Otros' />Otros
            <p>

                <label for="edad">Edad:</label><br>
                <input type="number" id="edad" name="edad" min="1" required>
                <br><br>

                <label for="profesion">Profesión:</label><br>
                <input type="text" id="profesion" name="profesion" required>

                <label for="pericia">Pericia informática:</label><br>
                <input type="text" id="pericia" name="pericia" required>

                <label for="dispositivo">dispositivo: </label><br>
            <p>
                <input type='radio' name='dispositivo' value='Ordenador' />Ordenador
                <input type='radio' name='dispositivo' value='Taleta' />Taleta
                <input type='radio' name='dispositivo' value='Movil' />Movil
            <p>

                <label for="comentarios">Comentarios:</label><br>
                <input type="text" id="comentarios" name="comentarios" required>

                <label for="mejoras">Sugerencias de mejora:</label><br>
                <input type="text" id="mejoras" name="mejoras" required><br><br>

                <label for="valoracion">Valoración general de la experiencia:</label><br>
                <select id="valoracion" name="valoracion" required>
                    <option value="">--Selecciona--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>><br><br>
                <button type="submit" name="enviar">Enviar resultados</button>


        </form>
    <?php endif; ?>
</body>

</html>