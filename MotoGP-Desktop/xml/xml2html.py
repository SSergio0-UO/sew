import xml.etree.ElementTree as ET

class Html:
    """Clase para generar código HTML"""
    def __init__(self, titulo="Info Circuito"):
        # Crear estructura básica del HTML
        self.head = f"""<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titulo}</title>
<link rel="stylesheet" href="estilo/estilo.css">
</head>"""
        self.body_content = ""

    def addTitulo(self, texto, nivel=1):
        self.body_content += f"<h{nivel}>{texto}</h{nivel}>\n"

    def addParrafo(self, texto):
        self.body_content += f"<p>{texto}</p>\n"

    def addLista(self, items, ordenada=False):
        tag = "ol" if ordenada else "ul"
        self.body_content += f"<{tag}>\n"
        for item in items:
            self.body_content += f"  <li>{item}</li>\n"
        self.body_content += f"</{tag}>\n"

    def escribir(self, nombre_archivo):
        html_completo = f"""<!DOCTYPE html>
<html lang="es">
{self.head}
<body>
{self.body_content}
</body>
</html>
"""
        with open(nombre_archivo, "w", encoding="utf-8") as f:
            f.write(html_completo)
        print(f"Archivo '{nombre_archivo}' generado correctamente.")


def main():
    # Cargar XML
    tree = ET.parse("circuitoEsquema.xml")
    root = tree.getroot()
    ns = {'ns': 'http://www.uniovi.es'}

    # Crear objeto Html
    html = Html("Información del Circuito")

    # Nombre del circuito
    nombre = root.find('ns:nombre', ns).text
    html.addTitulo(nombre, nivel=1)

    # Datos principales
    longitud = root.find('ns:longitud-pista', ns).text
    unidad_long = root.find('ns:longitud-pista', ns).attrib.get('uds', '')
    anchura = root.find('ns:anchura', ns).text
    unidad_anch = root.find('ns:anchura', ns).attrib.get('uds', '')
    fecha = root.find('ns:fecha', ns).text
    hora = root.find('ns:hora', ns).text
    vueltas = root.find('ns:numero-vueltas', ns).text
    localidad = root.find('ns:localidad', ns).text
    pais = root.find('ns:pais', ns).text
    patrocinador = root.find('ns:patrocinador', ns).text

    html.addParrafo(f"Longitud de la pista: {longitud} {unidad_long}")
    html.addParrafo(f"Anchura de la pista: {anchura} {unidad_anch}")
    html.addParrafo(f"Fecha: {fecha}")
    html.addParrafo(f"Hora: {hora}")
    html.addParrafo(f"Número de vueltas: {vueltas}")
    html.addParrafo(f"Localidad: {localidad}")
    html.addParrafo(f"País: {pais}")
    html.addParrafo(f"Patrocinador: {patrocinador}")

    # Referencias (links)
    referencias = [ref.text for ref in root.findall('.//ns:referencias/ns:referencia', ns)]
    if referencias:
        html.addTitulo("Referencias", nivel=2)
        html.addLista([f'<a href="{r}" target="_blank">{r}</a>' for r in referencias])

    # Fotografías
    fotos = root.findall('.//ns:fotografias/ns:fotografia', ns)
    if fotos:
        html.addTitulo("Fotografías", nivel=2)
        for f in fotos:
            archivo = f.attrib.get('archivo', '')
            descripcion = f.text
            html.body_content += f'<figure><img src="{archivo}" alt="{descripcion}"><figcaption>{descripcion}</figcaption></figure>\n'

    # Videos
    videos = root.findall('.//ns:videos/ns:video', ns)
    if videos:
        html.addTitulo("Videos", nivel=2)
        for v in videos:
            archivo = v.attrib.get('archivo', '')
            descripcion = v.text
            html.body_content += f'<video controls src="{archivo}">{descripcion}</video>\n'

    # Vencedor y clasificación
    ganador = root.find('.//ns:vencedor/ns:nombre', ns).text
    tiempo = root.find('.//ns:vencedor/ns:tiempo', ns).text
    html.addTitulo("Vencedor", nivel=2)
    html.addParrafo(f"{ganador} - Tiempo: {tiempo}")

    clasificacion = [n.text for n in root.findall('.//ns:clasificacion/ns:nombre', ns)]
    if clasificacion:
        html.addTitulo("Clasificación", nivel=2)
        html.addLista(clasificacion, ordenada=True)

    # Escribir archivo HTML
    html.escribir("InfoCircuito.html")


if __name__ == "__main__":
    main()
