class Ciudad {
    constructor(nombre, pais, gentilicio) {
        this.nombre = nombre;
        this.pais = pais;
        this.gentilicio = gentilicio;
        this.poblacion = null;
        this.coordenadas = { lat: 0, lng: 0 };
    }

    rellenar(poblacion, coordenadas) {
        this.poblacion = poblacion;
        this.coordenadas = coordenadas;
    }


    getNombre() {
        return this.nombre;
    }

    getPais() {
        return this.pais;
    }

    obtenerInfoSecundaria() {
        return `
            <li><strong>Gentilicio:</strong> ${this.gentilicio}</li>
            <li><strong>Población:</strong> ${this.poblacion.toLocaleString()} habitantes</li>
          `;
    }

    coordenadasPunto() {
        const msg = document.createElement("p");
        msg.textContent = `Coordenadas: Latitud ${this.coordenadas.lat}, Longitud ${this.coordenadas.lng}`;
        document.body.appendChild(msg);
    }
}

