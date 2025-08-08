from collections import Counter
from datetime import datetime
import requests

# Configuración
API_KEY = "TU_API_KEY_AQUI"  # Reemplaza con tu API key de OpenWeather
CIUDAD = "Caguas,PR"
URL = f"https://api.openweathermap.org/data/2.5/forecast?q={CIUDAD}&appid={API_KEY}&units=metric&lang=es"

# Obtener datos de la API
respuesta = requests.get(URL)
data = respuesta.json()

dias = {}

# Agrupar datos por fecha
for item in data["list"]:
    fecha = datetime.fromtimestamp(item["dt"])
    fecha_str = fecha.date()

    if fecha_str not in dias:
        dias[fecha_str] = []

    dias[fecha_str].append({
        "temp": item["main"]["temp"],
        "temp_min": item["main"]["temp_min"],
        "temp_max": item["main"]["temp_max"],
        "pop": item.get("pop", 0) * 100,
        "weather": item["weather"]
    })

# Mostrar pronóstico para los próximos 5 días
print(f"\nPronóstico 5 días — {CIUDAD}\n")

for fecha, items in list(dias.items())[:5]:
    temp_min_c = min(x['temp_min'] for x in items)
    temp_max_c = max(x['temp_max'] for x in items)

    # Conversión a Fahrenheit
    temp_min_f = (temp_min_c * 9/5) + 32
    temp_max_f = (temp_max_c * 9/5) + 32

    # Promedio de probabilidad de lluvia
    pop = int(sum(x.get("pop", 0) for x in items) / len(items))

    # Descripción más común
    descs = [x['weather'][0]['description'] for x in items]
    clima_dia = Counter(descs).most_common(1)[0][0].capitalize()

    # Mostrar resultado
    print(
        fecha.strftime("%a %d %b"),
        f": {clima_dia}, "
        f"{temp_min_c}°C/{temp_min_f:.1f}°F – "
        f"{temp_max_c}°C/{temp_max_f:.1f}°F • "
        f"Lluvia: {pop}%"
    )
