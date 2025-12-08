<?php
class Configuracion
{
    private $servername = "localhost";
    private $username = "DBUSER2025";
    private $password = "DBPSWD2025";
    private $database = "UO300084_DB";

    public function crearBase()
    {
        // Conexión al SGBD local con XAMPP con el usuario creado 
        $db = new mysqli($this->servername, $this->username, $this->password);

        //comprobamos conexión
        if ($db->connect_error) {
            exit("<p>ERROR de conexión:" . $db->connect_error . "</p>");
        } else {
            echo "<p>Conexión establecida con " . $db->host_info . "</p>";
        }

        // Se crea la base de datos de trabajo "agenda" utilizando ordenación en español
        $cadenaSQL = "CREATE DATABASE IF NOT EXISTS UO300084_DB COLLATE utf8_spanish_ci";
        if ($db->query($cadenaSQL) === TRUE) {
            echo "<p>Base de datos 'UO300084_DB' creada con éxito</p>";
        } else {
            echo "<p>ERROR en la creación de la Base de Datos 'UO300084_DB'. Error: " . $db->error . "</p>";
            exit();
        }
        $db->close();
    }

    public function getConexion()
    {
        return new mysqli($this->servername, $this->username, $this->password, $this->database);
    }

    public function cerrarConexion($db)
    {
        $db->close();
    }


    public function reiniciarBase()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->database);
        $sql_reset = "SET FOREIGN_KEY_CHECKS = 0;
                        TRUNCATE TABLE resultados_test;
                        TRUNCATE TABLE observaciones_facilitador;
                        TRUNCATE TABLE usuarios;
                        SET FOREIGN_KEY_CHECKS = 1;";
        // Ejecutar varias sentencias con multi_query
        if ($db->multi_query($sql_reset)) {
            do {
                // Limpiar resultados
                if ($result = $db->store_result()) {
                    $result->free();
                }
            } while ($db->more_results() && $db->next_result());
            echo "Base de datos reiniciada correctamente.";
        } else {
            echo "Error al reiniciar la base: " . $db->error;
        }
    }

    public function exportarDatos($nombreArchivo = 'archivo.csv')
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->database);

        $tablas = [
            'usuarios' => "SELECT * FROM usuarios",
            'resultados_test' => "SELECT * FROM resultados_test",
            'observaciones_facilitador' => "SELECT * FROM observaciones_facilitador"
        ];

        $modo = file_exists($nombreArchivo) ? 'a' : 'w';
        $file = fopen($nombreArchivo, $modo);

        foreach ($tablas as $tabla => $sql) {
            $this->exportarTabla($file, $sql, $db);
        }

        fclose($file);
        $db->close();
    }

    private function exportarTabla($file, $sql, $db)
    {

        $resultado = $db->query($sql);

        $columnas = [];

        while ($finfo = $resultado->fetch_field()) {
            $columnas[] = $finfo->name;
        }

        // Escribir encabezado
        fputcsv($file, $columnas);

        // Escribir filas
        while ($fila = $resultado->fetch_assoc()) {
            fputcsv($file, $fila);
        }

        $resultado->free();
    }


    public function borrarBase()
    {
        // Conexión al SGBD local. En XAMPP el usuario debe estar creado previamente 
        $db = new mysqli($this->servername, $this->username, $this->password);

        // compruebo la conexion
        if ($db->connect_error) {
            exit("<p>ERROR de conexión:" . $db->connect_error . "</p>");
        } else {
            echo "<p>Conexión establecida con " . $db->host_info . "</p>";
        }

        //Elimina la base de datos agenda
        $consulta  = "DROP DATABASE UO300084_DB ;";

        //POR SEGURIDAD: para evitar inyección de código NUNCA ejecutar consultas que provengan directamente de campos de texto del usuario
        //Debe usarse en esos casos $db->prepare()
        if ($db->query($consulta))
            echo "<p>Eliminada la base de datos 'UO300084_DB'</p>";
        else
            echo "<p>No se ha podido eliminar la base de datos 'UO300084_DB'. Error: " . $db->error . "</p>";
        //cerrar la conexión
        $db->close();
    }
}
