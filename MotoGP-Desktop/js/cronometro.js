class Cronometro {
    constructor() {
        this.tiempo = 0;
        this.inicio;
        this.corriendo;
        this.display = document.querySelector('main p');
    }

    arrancar() {
        try {
            this.inicio = Temporal.Now.instant();
        } catch (err) {
            this.inicio = new Date();
        }

        this.corriendo = setInterval(this.actualizar.bind(this), 100);
    }

    actualizar() {
        try {
            const ahora = Temporal.Now.instant();
            const duracion = ahora.since(this.inicio);
            this.tiempo = duracion.total({ unit: "seconds" });
        } catch (err) {
            const ahora = new Date();
            this.tiempo = (ahora - this.inicio) / 1000;
        }
        this.mostrar();
    }

    mostrar() {
        const totalSegundos = this.tiempo;

        const minutos = Math.floor(totalSegundos / 60);
        const segundos = Math.floor(totalSegundos % 60);
        const decimas = Math.floor((totalSegundos * 10) % 10);

        const texto = String(minutos).padStart(2, "0") + ':' + String(segundos).padStart(2, "0") + '.' + decimas;

        this.display.textContent = texto;

    }

    parar() {
        clearInterval(this.corriendo);
        this.corriendo = null;
    }

    reiniciar() {
        this.parar();
        this.tiempo = 0;
        this.mostrar();
    }


}

