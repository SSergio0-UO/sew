<?php
class Configuracion{
    private $servername = "localhost";
    private $username = "DBUSER2025";
    private $password = "DBPSWD2025";

    public function crearBase(){
        // Conexión al SGBD local con XAMPP con el usuario creado 
        $db = new mysqli($this->$servername,$this->$username,$this->$password);
             
        //comprobamos conexión
        if($db->connect_error) {
            exit ("<p>ERROR de conexión:".$db->connect_error."</p>");  
        } else {echo "<p>Conexión establecida con " . $db->host_info . "</p>";}
                   
        // Se crea la base de datos de trabajo "agenda" utilizando ordenación en español
        $cadenaSQL = "CREATE DATABASE IF NOT EXISTS UO300084_DB COLLATE utf8_spanish_ci";
        if($db->query($cadenaSQL) === TRUE){
            echo "<p>Base de datos 'UO300084_DB' creada con éxito</p>";
        } else { 
            echo "<p>ERROR en la creación de la Base de Datos 'UO300084_DB'. Error: " . $db->error . "</p>";
        exit();
        }
        $db->close();
    }

    public function reiniciarBase(){
        $this->borrarBase();
        $this->crearBase(); 
    }

    public function exportarDatos(){
        $db = new mysqli($this->$servername,$this->$username,$this->$password, 'UO300084_DB');
        $sql_usuario = "SELECT * FROM usuario";
        $sql_observacion = "SELECT * FROM observaciones";
        $sql_resultado = "SELECT * FROM resultados";

        if (!file_exists('archivo.csv')) {
            $fp = fopen($'archivo.csv', 'w');
        } else {
            $fp = fopen($'archivo.csv', 'a');

        }
        $this->exportarTabla($file,$sql_usuario);
        $this->exportarTabla($file,$sql_observacion);
        $this->exportarTabla($file,$sql_resultado);
        fclose($file);
        $db->close();

    }

    private function exportarTabla($file, $sql, $db){

        $resultado = $db->query($sql);

        $columnas = array();
        // Obtener nombres de columnas
        $columnas = array();
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


    public function borrarBase(){
        // Conexión al SGBD local. En XAMPP el usuario debe estar creado previamente 
        $db = new mysqli($servername,$username,$password,$database);

        // compruebo la conexion
        if($db->connect_error) {
            exit ("<p>ERROR de conexión:".$db->connect_error."</p>");  
        } else {echo "<p>Conexión establecida con " . $db->host_info . "</p>";}

        //Elimina la base de datos agenda
        $consulta  = "DROP DATABASE UO300084_DB ;";

        //POR SEGURIDAD: para evitar inyección de código NUNCA ejecutar consultas que provengan directamente de campos de texto del usuario
        //Debe usarse en esos casos $db->prepare()
        if($db->query($consulta))
          echo "<p>Eliminada la base de datos 'UO300084_DB'</p>";
        else
          echo "<p>No se ha podido eliminar la base de datos 'UO300084_DB'. Error: " . $db->error . "</p>";
      //cerrar la conexión
      $db->close(); 
    }
}

?>