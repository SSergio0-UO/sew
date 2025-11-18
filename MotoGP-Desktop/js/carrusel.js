class Carrusel {
    #busqueda;
    #actual;
    #maximo;
    #jsonFotografias;
    #fotos;

    constructor() {
        this.#busqueda = "AngelNieto";
        this.#actual = 0;
        this.#maximo = 5;
    }


    getFotografias() {
        const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

        $.getJSON(flickrAPI, {
            tags: this.#busqueda,   // término de búsqueda (MotoGP)
            tagmode: "any",
            format: "json"
        })
            .done((data) => {
                this.#jsonFotografias = data; // Guardamos el JSON completo
                this.#procesarJSONFotografias(); // Método para procesar y mostrar
            })
            .fail((jqxhr, textStatus, error) => {
                console.error("Error al obtener las imágenes:", textStatus, error);
            });
    }

    #procesarJSONFotografias() {

        // Extraer las 5 primeras fotos

        const fotos = [];
        for (let i = 0; i < this.#maximo; i++) {
            const urlGrande = this.#jsonFotografias.items[i].media.m.replace("_m", "_z");
            const foto = `<img src=${urlGrande} alt=${this.#jsonFotografias.items[i].title} title=${this.#jsonFotografias.items[i].title} />`;
            fotos[i] = foto;
        }
        this.#fotos = fotos;
        this.#mostrarFotografias();

    }

    #mostrarFotografias() {

        const main = $('main');
        const article = $('<article></article>');
        const h2 = $('<h2>Imágenes del circuito Angel Nieto</h2>');


        article.append(h2);
        article.append(this.#fotos[this.#actual]);

        main.append(article);

        setInterval(this.#cambiarFotografia.bind(this), 3000);

    }

    #cambiarFotografia() {

        this.#actual = this.#actual >= this.#maximo - 1 ? 0 : this.#actual + 1;
        $('article img').replaceWith(this.#fotos[this.#actual]);


    }
}

