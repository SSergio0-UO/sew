class Memoria {
    constructor() {
        // Atributos del juego
        this.tablero_bloqueado = true;
        this.primera_carta = null;
        this.segunda_carta = null;

        // Instanciar cronómetro (Ejercicio 4)
        this.cronometro = new Cronometro();

        // Inicialización del juego
        this.barajarCartas();
        this.tablero_bloqueado = false;

        // Arrancar cronómetro
        this.cronometro.arrancar();
    }

    // Baraja las cartas del tablero (Ejercicio 2)
    barajarCartas() {
        const main = document.querySelector('main');
        const cartas = Array.from(main.querySelectorAll('article'));

        // Algoritmo Fisher-Yates
        for (let i = cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            main.appendChild(cartas[j]);
            cartas.splice(j, 1);
        }
    }

    // Reinicia atributos internos (Ejercicio 2)
    reiniciarAtributos() {
        this.tablero_bloqueado = false;
        this.primera_carta = null;
        this.segunda_carta = null;
    }

    // Marca cartas emparejadas como reveladas (Ejercicio 2)
    deshabilitarCartas() {
        this.primera_carta.dataset.estado = "revelada";
        this.segunda_carta.dataset.estado = "revelada";

        this.comprobarJuego();
        this.reiniciarAtributos();
    }

    // Comprueba si el juego ha terminado (Ejercicio 2 + 4)
    comprobarJuego() {
        const cartas = document.querySelectorAll('main article');
        const todasReveladas = Array.from(cartas).every(carta => carta.dataset.estado === 'revelada');

        if (todasReveladas) {
            this.cronometro.parar(); // Detener cronómetro
            alert('¡Juego completado!');
        }
    }

    // Pone las cartas bocabajo si no son iguales (Ejercicio 3)
    cubrirCartas() {
        setTimeout(() => {
            this.primera_carta.dataset.estado = "null";
            this.segunda_carta.dataset.estado = "null";
            this.reiniciarAtributos();
        }, 1500);
    }

    // Comprueba si las dos cartas volteadas son iguales (Ejercicio 3)
    comprobarPareja() {
        const img1 = this.primera_carta.querySelector('img').getAttribute('src');
        const img2 = this.segunda_carta.querySelector('img').getAttribute('src');

        img1 === img2 ? this.deshabilitarCartas() : this.cubrirCartas();
    }

    // Lógica principal al voltear una carta (Ejercicio 3)
    voltearCarta(carta) {
        if (this.tablero_bloqueado || carta.dataset.estado === 'volteada' || carta.dataset.estado === 'revelada') {
            return;
        }

        carta.dataset.estado = "volteada";

        if (!this.primera_carta) {
            this.primera_carta = carta;
            return;
        }

        this.segunda_carta = carta;
        this.tablero_bloqueado = true;

        this.comprobarPareja();
    }
}