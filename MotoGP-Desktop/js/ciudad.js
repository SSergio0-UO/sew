class Ciudad {

    #jsonMeteorologiaCarrera;
    #jsonMeteorologiaEntreno12;
    #jsonMeteorologiaEntreno3;

    constructor(nombre, pais, gentilicio) {
        this.nombre = nombre;
        this.pais = pais;
        this.gentilicio = gentilicio;
        this.poblacion = null;
        this.coordenadas = { lat: 36.685, lng: -6.126 };
        this.fechaCarrera = '2025-11-27';
        this.fechaEntreno12 = '2025-11-25';
        this.fechaEntreno3 = '2025-11-26';
        this.horaEntreno1 = 11;
        this.horaEntreno2 = 15;
        this.horaEntreno3 = 10
        this.horaCarrera = 14;

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


    getMeteorologiaCarrera() {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.coordenadas.lat}&longitude=${this.coordenadas.lng}&hourly=temperature_2m,apparent_temperature,precipitation,relativehumidity_2m,windspeed_10m,winddirection_10m&daily=sunrise,sunset&start_date=${this.fechaCarrera}&end_date=${this.fechaCarrera}&timezone=auto`;
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json'
        }).done(data => {
            this.#jsonMeteorologiaCarrera = data;
            this.#procesarJSONCarrera();
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.error(`Error al obtener los datos meteorológicos: ${textStatus}`, errorThrown);
        });


    }


    #procesarJSONCarrera() {
        if (!this.#jsonMeteorologiaCarrera) {
            console.error("No hay datos meteorológicos para procesar");
            return;
        }

        const datos = this.#jsonMeteorologiaCarrera;

        const temperatura = datos.hourly.temperature_2m[this.horaCarrera];
        const humedad = datos.hourly.relativehumidity_2m[this.horaCarrera];
        const viento = datos.hourly.windspeed_10m[this.horaCarrera];
        const direccionViento = datos.hourly.winddirection_10m[this.horaCarrera];
        const precipitacion = datos.hourly.precipitation[this.horaCarrera];
        const amanecer = datos.daily.sunrise[0];
        const atardecer = datos.daily.sunset[0];

        // Crear HTML dinámico con jQuery
        const main = $("main");
        const article = $('<article></article>');
        const h2 = $('<h2>Meteorología de la carrera</h2>');
        const info = $(`
        <ul>
            <li>Temperatura: ${temperatura} °C</li>
            <li>Humedad: ${humedad} %</li>
            <li>Viento: ${viento} km/h (${direccionViento}°)</li>
            <li>Precipitación: ${precipitacion} mm</li>
            <li>Amanecer: ${amanecer}</li>
            <li>Atardecer: ${atardecer}</li>
        </ul>
    `);

        article.append(h2);
        article.append(info);
        main.append(article);
    }

    getMeteorologiaEntrenos() {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.coordenadas.lat}&longitude=${this.coordenadas.lng}&hourly=temperature_2m,apparent_temperature,precipitation,relativehumidity_2m,windspeed_10m,winddirection_10m&daily=sunrise,sunset&start_date=${this.fechaEntreno12}&end_date=${this.fechaEntreno12}&timezone=auto`;
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json'
        }).done(data => {
            this.#jsonMeteorologiaEntreno12 = data;
            if (this.#jsonMeteorologiaEntreno3) this.#procesarJSONEntrenos();
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.error(`Error al obtener los datos meteorológicos: ${textStatus}`, errorThrown);
        });

        const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${this.coordenadas.lat}&longitude=${this.coordenadas.lng}&hourly=temperature_2m,apparent_temperature,precipitation,relativehumidity_2m,windspeed_10m,winddirection_10m&daily=sunrise,sunset&start_date=${this.fechaEntreno3}&end_date=${this.fechaEntreno3}&timezone=auto`;
        $.ajax({
            url: url2,
            method: 'GET',
            dataType: 'json'
        }).done(data => {
            this.#jsonMeteorologiaEntreno3 = data;
            if (this.#jsonMeteorologiaEntreno12) this.#procesarJSONEntrenos();
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.error(`Error al obtener los datos meteorológicos: ${textStatus}`, errorThrown);
        });



    }
    #procesarJSONEntrenos() {

        if (!this.#jsonMeteorologiaEntreno12 && !this.#jsonMeteorologiaEntreno3) {
            console.error("No hay datos meteorológicos para procesar");
            return;
        }

        const datos12 = this.#jsonMeteorologiaEntreno12;
        const datos3 = this.#jsonMeteorologiaEntreno3;

        // Temperatura
        const temperatura1 = datos12.hourly.temperature_2m[this.horaEntreno1];
        const temperatura2 = datos12.hourly.temperature_2m[this.horaEntreno2];
        const temperatura3 = datos3.hourly.temperature_2m[this.horaEntreno3];
        const temp_media = ((temperatura1 + temperatura2 + temperatura3) / 3).toFixed(2);

        // Viento
        const viento1 = datos12.hourly.windspeed_10m[this.horaEntreno1];
        const viento2 = datos12.hourly.windspeed_10m[this.horaEntreno2];
        const viento3 = datos3.hourly.windspeed_10m[this.horaEntreno3];
        const viento_media = ((viento1 + viento2 + viento3) / 3).toFixed(2);

        // Dirección del viento
        const direccion1 = datos12.hourly.winddirection_10m[this.horaEntreno1];
        const direccion2 = datos12.hourly.winddirection_10m[this.horaEntreno2];
        const direccion3 = datos3.hourly.winddirection_10m[this.horaEntreno3];
        const direccion_media = ((direccion1 + direccion2 + direccion3) / 3).toFixed(2);

        // Precipitación
        const precipitacion1 = datos12.hourly.precipitation[this.horaEntreno1];
        const precipitacion2 = datos12.hourly.precipitation[this.horaEntreno2];
        const precipitacion3 = datos3.hourly.precipitation[this.horaEntreno3];
        const precipitacion_media = ((precipitacion1 + precipitacion2 + precipitacion3) / 3).toFixed(2);

        // Humedad
        const humedad1 = datos12.hourly.relativehumidity_2m[this.horaEntreno1];
        const humedad2 = datos12.hourly.relativehumidity_2m[this.horaEntreno2];
        const humedad3 = datos3.hourly.relativehumidity_2m[this.horaEntreno3];
        const humedad_media = ((humedad1 + humedad2 + humedad3) / 3).toFixed(2);

        // Crear HTML dinámico con jQuery
        const main = $("main");
        const article = $('<article></article>');
        const h2 = $('<h2>Meteorología de los entrenos</h2>');

        const info = $(`
    <ul>
        <li>Temperatura media: ${temp_media} °C</li>
        <li>Humedad media: ${humedad_media} %</li>
        <li>Viento medio: ${viento_media} km/h (Dirección: ${direccion_media}°)</li>
        <li>Precipitación media: ${precipitacion_media} mm</li>
    </ul>
                        `);

        article.append(h2);
        article.append(info);
        main.append(article);
    }
}

