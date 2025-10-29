class Ciudad {
    constructor(nombre, pais, gentilicio, poblacion, coordenadas) {
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


    nombre() {
        return this.nombre;
    }

    pais() {
        return this.pais;
    }

    obtenerInfoSecundaria() {
        return `
          <ul>
            <li><strong>Gentilicio:</strong> ${this.gentilicio}</li>
            <li><strong>Población:</strong> ${this.poblacion.toLocaleString()} habitantes</li>
          </ul>`;
    }

    coordenadasPunto() {
        const msg = document.createElement("p");
        msg.textContent = `Coordenadas: Latitud ${this.coordenadas.lat}, Longitud ${this.coordenadas.lng}`;
        document.body.appendChild(msg);
    }
}
let jerez = new Ciudad("Jerez de la Frontera", "España", "Jerezano");
jerez.rellenar(213688, { lat: 36.685, lng: -6.126 });
document.getElementById("nombreCiudad").textContent = jerez.obtenerNombreCiudad();
