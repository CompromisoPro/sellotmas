# -*- coding: utf-8 -*-
"""
Analiza el archivo de cuestionarios SelloPRO para entender:
1. Cuántos criterios hay por ámbito
2. Cuáles criterios aplican a qué tipo de empresa
3. Dónde hay diferencias en las descripciones de estrellas
"""
import csv
import json
from collections import defaultdict

# Leer el archivo CSV
archivo = r"c:\Users\acarreno\Downloads\Base Sello pro, Herramientas.xlsx - Base Formularios.csv"

# Estructura para almacenar datos
criterios = defaultdict(lambda: {
    'ambito': '',
    'estrellas': {},  # {1: {tipo_empresa: descripcion, ...}, 2: {...}, ...}
    'tipos_empresa': set()
})

tipos_empresa = []

with open(archivo, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    
    # Leer header
    header = next(reader)
    tipos_empresa = header[3:]  # Desde la columna 4 en adelante son los tipos
    
    print("=" * 80)
    print("TIPOS DE EMPRESA ENCONTRADOS:")
    print("=" * 80)
    for i, tipo in enumerate(tipos_empresa):
        print(f"  {i+1}. {tipo}")
    
    print(f"\nTotal: {len(tipos_empresa)} tipos de cuestionario")
    print()
    
    # Leer datos
    for row in reader:
        if len(row) < 4:
            continue
            
        ambito = row[0].strip()
        criterio = row[1].strip().replace('\n', ' ').replace('  ', ' ')
        
        # Limpiar criterio de saltos de línea
        criterio = ' '.join(criterio.split())
        
        if not ambito or not criterio:
            continue
            
        try:
            estrella = int(row[2].strip())
        except:
            continue
        
        # Guardar info del criterio
        key = (ambito, criterio)
        criterios[key]['ambito'] = ambito
        
        if estrella not in criterios[key]['estrellas']:
            criterios[key]['estrellas'][estrella] = {}
        
        # Guardar descripción por tipo de empresa
        for i, tipo in enumerate(tipos_empresa):
            if i + 3 < len(row):
                desc = row[i + 3].strip()
                if desc and desc.lower() != 'x':
                    criterios[key]['estrellas'][estrella][tipo] = desc
                    criterios[key]['tipos_empresa'].add(tipo)

# Análisis
print("=" * 80)
print("RESUMEN POR ÁMBITO:")
print("=" * 80)

ambitos = defaultdict(list)
for (ambito, criterio), data in criterios.items():
    ambitos[ambito].append(criterio)

for ambito, lista_criterios in sorted(ambitos.items()):
    print(f"\n{ambito}: {len(lista_criterios)} criterios")
    for c in sorted(set(lista_criterios)):
        print(f"  - {c}")

print("\n" + "=" * 80)
print("TOTAL DE CRITERIOS ÚNICOS:", len(criterios))
print("=" * 80)

# Análisis de diferencias
print("\n" + "=" * 80)
print("CRITERIOS CON DIFERENCIAS ENTRE TIPOS DE EMPRESA:")
print("(donde la descripción de una estrella varía según el tipo)")
print("=" * 80)

criterios_con_diferencias = []
criterios_universales = []

for (ambito, criterio), data in criterios.items():
    tiene_diferencia = False
    
    for estrella, descripciones in data['estrellas'].items():
        # Ver si hay más de una descripción única
        valores_unicos = set(descripciones.values())
        if len(valores_unicos) > 1:
            tiene_diferencia = True
            break
    
    if tiene_diferencia:
        criterios_con_diferencias.append((ambito, criterio, data))
    else:
        criterios_universales.append((ambito, criterio, data))

print(f"\nCriterios UNIVERSALES (misma descripción para todos): {len(criterios_universales)}")
print(f"Criterios CON DIFERENCIAS: {len(criterios_con_diferencias)}")

print("\n--- Criterios con diferencias ---")
for ambito, criterio, data in criterios_con_diferencias:
    print(f"\n[{ambito}] {criterio}")
    for estrella in sorted(data['estrellas'].keys()):
        descripciones = data['estrellas'][estrella]
        valores_unicos = list(set(descripciones.values()))
        if len(valores_unicos) > 1:
            print(f"  Estrella {estrella}: {len(valores_unicos)} variantes")
            for i, v in enumerate(valores_unicos[:3]):  # Mostrar máx 3
                print(f"    Var {i+1}: {v[:80]}...")

# Criterios que NO aplican a todos
print("\n" + "=" * 80)
print("CRITERIOS QUE NO APLICAN A TODOS LOS TIPOS:")
print("=" * 80)

for (ambito, criterio), data in criterios.items():
    tipos_que_aplica = data['tipos_empresa']
    if len(tipos_que_aplica) < len(tipos_empresa):
        tipos_faltantes = set(tipos_empresa) - tipos_que_aplica
        print(f"\n[{ambito}] {criterio}")
        print(f"  Aplica a: {len(tipos_que_aplica)}/{len(tipos_empresa)} tipos")
        print(f"  NO aplica a: {', '.join(sorted(tipos_faltantes))}")

# Guardar resumen en JSON para usar después
resumen = {
    'tipos_empresa': tipos_empresa,
    'total_criterios': len(criterios),
    'criterios_universales': len(criterios_universales),
    'criterios_con_diferencias': len(criterios_con_diferencias),
    'criterios': []
}

for (ambito, criterio), data in criterios.items():
    # Determinar si tiene diferencias
    tiene_diferencia = False
    for estrella, descripciones in data['estrellas'].items():
        if len(set(descripciones.values())) > 1:
            tiene_diferencia = True
            break
    
    criterio_info = {
        'ambito': ambito,
        'criterio': criterio,
        'tiene_diferencias': tiene_diferencia,
        'tipos_que_aplica': list(data['tipos_empresa']),
        'aplica_a_todos': len(data['tipos_empresa']) == len(tipos_empresa),
        'estrellas': {}
    }
    
    for estrella, descripciones in data['estrellas'].items():
        valores_unicos = list(set(descripciones.values()))
        if len(valores_unicos) == 1:
            criterio_info['estrellas'][str(estrella)] = {'universal': valores_unicos[0]}
        else:
            criterio_info['estrellas'][str(estrella)] = {'por_tipo': descripciones}
    
    resumen['criterios'].append(criterio_info)

with open('resumen_cuestionarios.json', 'w', encoding='utf-8') as f:
    json.dump(resumen, f, ensure_ascii=False, indent=2)

print("\n" + "=" * 80)
print("Resumen guardado en: resumen_cuestionarios.json")
print("=" * 80)

