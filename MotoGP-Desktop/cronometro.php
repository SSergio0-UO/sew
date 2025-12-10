<?php


class Cronometro
{
    private $tiempo;
    private $inicio;

    public function __construct()
    {
        $this->tiempo = 0;
    }

    public function arrancar()
    {
        $this->inicio = microtime(true);
    }

    public function parar()
    {
        $ahora = microtime(true);
        $this->tiempo = $ahora - $this->inicio;
    }

    public function mostrar()
    {
        $min = floor($this->tiempo / 60);
        $seg = $this->tiempo - ($min * 60);
        return sprintf("%02d:%04.1f", $min, $seg);
    }

    public function getTiempo()
    {
        return $this->tiempo;
    }
}

// Inicializar cronómetro en sesión
if (!isset($_SESSION['cron'])) {
    $_SESSION['cron'] = new Cronometro();
}

$cron = $_SESSION['cron'];
