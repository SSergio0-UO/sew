import xml.etree.ElementTree as ET

class Svg(object):
    """Genera archivos SVG con líneas, polilíneas y texto"""
    def __init__(self):
        self.raiz = ET.Element('svg', xmlns="http://www.w3.org/2000/svg", version="1.1")

    def addLine(self, x1, y1, x2, y2, stroke="black", strokeWidth=1):
        ET.SubElement(self.raiz, 'line', 
                      x1=str(x1), y1=str(y1), x2=str(x2), y2=str(y2),
                      stroke=stroke, **{'stroke-width': str(strokeWidth)})

    def addPolyline(self, points, stroke="black", strokeWidth=1, fill="none"):
        ET.SubElement(self.raiz, 'polyline',
                      points=points,
                      stroke=stroke,
                      **{'stroke-width': str(strokeWidth)},
                      fill=fill)

    def addText(self, texto, x, y, fontFamily="Verdana", fontSize=12, style=""):
        ET.SubElement(self.raiz, 'text', x=str(x), y=str(y),
                      fontFamily=fontFamily, fontSize=str(fontSize),
                      style=style).text = texto

    def escribir(self, nombreArchivoSVG):
        arbol = ET.ElementTree(self.raiz)
        ET.indent(arbol)
        arbol.write(nombreArchivoSVG, encoding='utf-8', xml_declaration=True)


def main():
    # Cargar XML
    tree = ET.parse("circuitoEsquema.xml")
    root = tree.getroot()
    ns = {'ns': 'http://www.uniovi.es'}

    # Extraer distancias y altitudes
    distancias = []
    altitudes = []

    for punto in root.findall('.//ns:puntos-anonimos/ns:punto', ns):
        d = float(punto.find('ns:distancia', ns).text)
        a = float(punto.find('ns:coordenada/ns:altitud', ns).text)
        distancias.append(d)
        altitudes.append(a)

    # Calcular distancia acumulada
    dist_acum = 0
    distancias_acum = []
    for d in distancias:
        distancias_acum.append(dist_acum)
        dist_acum += d
    max_dist_acum = distancias_acum[-1]

    # Escalado para SVG
    ancho_svg = 800
    alto_svg = 400

    max_alt = max(altitudes)
    min_alt = min(altitudes)
    rango_alt = max_alt - min_alt
    if rango_alt == 0:
        rango_alt = 1  # Evitar división por cero

    # Coordenadas SVG
    puntos_svg = []
    for d_acum, a in zip(distancias_acum, altitudes):
        x = 25 + (d_acum / max_dist_acum) * (ancho_svg - 50)
        y = 25 + (max_alt - a) / rango_alt * (alto_svg - 50)  # invertido
        puntos_svg.append((x, y))

    # Crear SVG
    svg = Svg()

    # Dibujar ejes
    svg.addLine(25, 25, 25, alto_svg-25, stroke="black", strokeWidth=2)  # eje Y
    svg.addLine(25, alto_svg-25, ancho_svg-25, alto_svg-25, stroke="black", strokeWidth=2)  # eje X

    # Polilínea altimetría cerrada (relleno)
    puntos_relleno = [(puntos_svg[0][0], alto_svg-25)] + puntos_svg + [(puntos_svg[-1][0], alto_svg-25)]
    puntos_str = " ".join(f"{x},{y}" for x, y in puntos_relleno)
    svg.addPolyline(points=puntos_str, stroke="green", strokeWidth=2, fill="#c0ffc0")

    # Guardar SVG
    svg.escribir("altimetria.svg")
    print("Archivo 'altimetria.svg' generado correctamente.")


if __name__ == "__main__":
    main()
