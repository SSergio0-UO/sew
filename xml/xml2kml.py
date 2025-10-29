import xml.etree.ElementTree as ET

def verXML(archivoXML):
    tree = ET.parse(archivoXML)
    return tree

def getRaiz(tree):
    return tree.getroot()

def generarKML(raiz, archivoKML):
    kml_header = '''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
<Placemark>
<name>circuitokml</name>
<LineString>
<extrude>1</extrude>
<tessellate>1</tessellate>
<coordinates>
'''

    kml_footer = '''</coordinates>
<altitudeMode>relativeToGround</altitudeMode>
</LineString>
</Placemark>
</Document>
</kml>'''

    ns = '{http://www.uniovi.es}'
    puntos = raiz.findall(f'.//{ns}puntos-anonimos/{ns}punto')
    

    longitud_origen = raiz.findtext(f'.//{ns}punto-origen/{ns}longitud-origen')
    latitud_origen = raiz.findtext(f'.//{ns}punto-origen/{ns}latitud-origen')
    altitud_origen = raiz.findtext(f'.//{ns}punto-origen/{ns}altitud-origen')

    puntosText =f'{longitud_origen},{latitud_origen},{altitud_origen} \n'

    for punto in puntos:
        longitud = punto.find(f'.//{ns}longitud').text.strip()
        latitud = punto.find(f'.//{ns}latitud').text.strip()
        altitud = punto.find(f'.//{ns}altitud').text.strip()
        puntosText += f"{longitud},{latitud},{altitud}\n"

    puntosText +=f'{longitud_origen},{latitud_origen},{altitud_origen}\n'

    with open(archivoKML, 'w', encoding='utf-8') as archivo:
        archivo.write(kml_header + puntosText + kml_footer)

def main():
    miArchivoXML = input('Introduzca un archivo XML = ')
    archivoKMLsalida = input('Introduzca el nombre del archivo KML de salida = ')
    tree = verXML(miArchivoXML)
    raiz = getRaiz(tree)
    generarKML(raiz, archivoKMLsalida)

if __name__ == "__main__":
    main()
