class Noticias {
    constructor() {
        this.lista = [];
    }

    async obtenerNoticias() {
        const response = await fetch('https://api.thenewsapi.com/v1/news/all?api_token=TU_API_KEY&search=MotoGP&language=es');
        const data = await response.json();
        this.lista = data.data;
        this.mostrarNoticias();
    }

    mostrarNoticias() {
        const contenedor = document.getElementById('lista-noticias');
        contenedor.innerHTML = '';
        this.lista.forEach(noticia => {
            const article = document.createElement('article');
            article.innerHTML = `<h3>${noticia.title}</h3><p>${noticia.description}</p>${noticia.url}Leer más</a>`;
            contenedor.appendChild(article);
        });

    }
}

document.addEventListener('DOMContentLoaded', () => {
    const noticias = new Noticias();
    noticias.obtenerNoticias();
});