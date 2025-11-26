class Circuito {
    #archivoHTML;
    #archivo;
    constructor() {
        this.comprobarApiFile();

        const inputFile = $("input[type='file']").first();;
        inputFile.on("change", (evento) => {
            this.#archivo = evento.target.files[0];
            this.leerArchivoHTML();
        });
    }

    comprobarApiFile() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            document.body.appendChild(document.createElement("p"))
                .innerText = "Este navegador NO soporta la API File y este programa puede no funcionar correctamente !!!.";
        }
    }

    leerArchivoHTML() {
        const lector = new FileReader();
        lector.onload = (evento) => {
            this.#archivoHTML = lector.result;
            this.introducirArchivo();
        }
        lector.readAsText(this.#archivo);
    }

    introducirArchivo() {
        // 1. Parseamos el HTML leído usando DOMParser
        const parser = new DOMParser();
        const docHTML = parser.parseFromString(this.#archivoHTML, "text/html");

        // 2. Llamamos al método que representa la info en circuito.html
        this.representarEnDOM(docHTML);

    }

    representarEnDOM(docHTML) {
        const inputFile = document.querySelector("input[type='file']");
        const destino = $(inputFile).parent();
        destino.empty();

        // ---------- TÍTULO DEL CIRCUITO ----------
        const titulo = docHTML.querySelector("h1");
        if (titulo) $("<h2>").text(titulo.textContent).appendTo(destino);

        // ---------- PARÁMETROS DEL CIRCUITO ----------
        const parrafos = docHTML.querySelectorAll("body > p");
        parrafos.forEach(p => {
            $("<p>").text(p.textContent).appendTo(destino);
        });


        // ---------- REFERENCIAS ----------
        const referenciasTitulo = docHTML.querySelector("h2:nth-of-type(1)");
        const referenciasLista = docHTML.querySelector("ul");

        if (referenciasTitulo && referenciasLista) {
            $("<h3>").text(referenciasTitulo.textContent).appendTo(destino);

            const ul = $("<ul>");
            referenciasLista.querySelectorAll("li").forEach(li => {
                const a = li.querySelector("a");
                $("<li>").append(
                    $("<a>")
                        .attr("href", a.getAttribute("href"))
                        .attr("target", "_blank")
                        .text(a.textContent)
                ).appendTo(ul);
            });

            destino.append(ul);
        }

        // ---------- FOTOGRAFÍAS ----------
        const fotosTitulo = docHTML.querySelector("h2:nth-of-type(2)");
        const figura = docHTML.querySelector("figure");

        if (fotosTitulo && figura) {
            $("<h3>").text(fotosTitulo.textContent).appendTo(destino);

            const img = figura.querySelector("img");
            const caption = figura.querySelector("figcaption");

            const nuevaFigura = $("<figure>");
            $("<img>")
                .attr("src", img.getAttribute("src"))
                .attr("alt", img.getAttribute("alt"))
                .appendTo(nuevaFigura);

            $("<figcaption>")
                .text(caption.textContent)
                .appendTo(nuevaFigura);

            destino.append(nuevaFigura);
        }

        // ---------- VIDEOS ----------
        const videosTitulo = docHTML.querySelector("h2:nth-of-type(3)");
        const video = docHTML.querySelector("video");

        if (videosTitulo && video) {
            $("<h3>").text(videosTitulo.textContent).appendTo(destino);

            $("<video>")
                .attr("controls", true)
                .attr("src", video.getAttribute("src"))
                .append("Video del circuito")
                .appendTo(destino);
        }

        // ---------- VENCEDOR ----------
        const vencedorTitulo = docHTML.querySelector("h2:nth-of-type(4)");
        const vencedorParrafo = docHTML.querySelector("h2:nth-of-type(4) + p");

        if (vencedorTitulo && vencedorParrafo) {
            $("<h3>").text(vencedorTitulo.textContent).appendTo(destino);
            $("<p>").text(vencedorParrafo.textContent).appendTo(destino);
        }

        // ---------- CLASIFICACIÓN ----------
        const clasificacionTitulo = docHTML.querySelector("h2:nth-of-type(5)");
        const clasificacionLista = docHTML.querySelector("ol");

        if (clasificacionTitulo && clasificacionLista) {

            $("<h3>").text(clasificacionTitulo.textContent).appendTo(destino);

            const ol = $("<ol>");
            clasificacionLista.querySelectorAll("li").forEach(li => {
                $("<li>").text(li.textContent).appendTo(ol);
            });

            destino.append(ol);
        }
    }

}
class CargadorSVG2 {
    #archivo;
    #archivoSVG;
    constructor() {
        this.inputFile = $("input[type='file']").eq(1);;
        inputFile.on("change", (evento) => {
            this.#archivo = evento.target.files[0];
            this.leerArchivoSVG();
        });
    }

    leerArchivoSVG() {
        const lector = new FileReader();
        lector.onload = (evento) => {
            this.#archivoSVG = lector.result;
            this.insertarSVG();
        }
        lector.readAsText(this.#archivo);
    }

    insertarSVG() {
        const destino = $(this.inputFile).parent();
        destino.empty();
        // Insertamos el contenido del SVG
        const svg = $(this.#archivoSVG);
        destino.append(svg);

    }

}
class CargadorSVG {
    #archivo;     // archivo seleccionado
    #contenido;   // contenido del SVG

    constructor() {
        // Seleccionamos el segundo input[type="file"] (el que cargará el SVG)
        this.inputFile = $("input[type='file']").eq(1);

        // Listener para cuando el usuario elija un archivo
        this.inputFile.on("change", (evento) => {
            this.#archivo = evento.target.files[0];
            if (this.#archivo) this.leerArchivoSVG();
        });
    }

    // Método que lee el archivo SVG usando FileReader
    leerArchivoSVG() {
        const lector = new FileReader();
        lector.onload = () => {
            this.#contenido = lector.result;
            this.insertarSVG();
        };
        lector.readAsText(this.#archivo);
    }

    // Método que inserta el SVG dentro del mismo <p> que contiene el input
    insertarSVG() {
        // Seleccionamos el <p> que contiene el input
        const $par = this.inputFile.parent();

        $par.empty();

        const $h2 = $("<h2>").text("Altimetría del circuito:");

        const $svg = $(this.#contenido);

        $par.append($h2, $svg);
    }
}

class CargadorKML {
    #archivo;     // archivo seleccionado
    #contenido;   // contenido del SVG
    #mapa;         // referencia al mapa
    #layer;
    constructor() {
        // Seleccionamos el segundo input[type="file"] (el que cargará el SVG)
        this.inputFile = $("input[type='file']").eq(2);

        // Listener para cuando el usuario elija un archivo
        this.inputFile.on("change", (evento) => {
            this.#archivo = evento.target.files[0];
            if (this.#archivo) this.leerArchivoKML();
        });
    }

    leerArchivoKML() {
        const lector = new FileReader();
        lector.onload = () => {
            this.#contenido = lector.result;
            this.insertarCapaKML();
        };
        lector.readAsText(this.#archivo);
    }

    insertarCapaKML() {

        // Creamos un nuevo div para el mapa dinámicamente
        const $divMapa = $("<div>");

        // Insertamos el div después del <p> que contiene el input
        this.inputFile.parent().empty().append($divMapa);

        // Inicializamos Google Maps en el div recién creado
        this.#mapa = new google.maps.Map($divMapa[0], {
            zoom: 15,
            center: { lat: 0, lng: 0 } // luego se puede centrar en el KML
        });

        // Convertimos el KML en Blob y URL para KmlLayer
        const blob = new Blob([this.#contenido], { type: "application/vnd.google-earth.kml+xml" });
        const urlKML = URL.createObjectURL(blob);

        // Añadimos la capa KML al mapa
        this.#layer = new google.maps.KmlLayer({
            url: urlKML,
            map: this.#mapa,
            preserveViewport: false
        });
    }
}

let circuito = new Circuito();
let cargadorSVG = new CargadorSVG();