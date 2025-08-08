import requests
from datetime import datetime

API_KEY = "ef0a06800e2efe129d8e688acf083343"  # Tu API Key de OpenWeather
CIUDAD = "Caguas,PR"
URL = f"http://api.openweathermap.org/data/2.5/forecast?q={CIUDAD}&appid={API_KEY}&lang=es&units=metric"

# Diccionario de iconos según descripción
ICONOS = {
    "cielo claro": "☀️",
    "algo de nubes": "⛅",
    "nubes dispersas": "🌤️",
    "muy nuboso": "☁️",
    "nubes": "☁️",
    "lluvia ligera": "🌦️",
    "lluvia": "🌧️",
    "tormenta": "⛈️",
    "nieve": "❄️",
    "neblina": "🌫️"
}

response = requests.get(URL)
data = response.json()

if "list" not in data:
    print("❌ Error: No se pudo obtener el pronóstico. Revisa tu API Key o el nombre de la ciudad.")
    print(data)
    exit()

dias_mostrados = set()
lineas_txt = []
lineas_md = []

# Encabezados para Markdown
lineas_md.append(f"# Pronóstico 5 días — {CIUDAD}\n")
lineas_md.append("| Fecha | Clima | Temp °C | Temp °F | Lluvia |\n")
lineas_md.append("|-------|-------|---------|---------|--------|\n")

print(f"Pronóstico 5 días — {CIUDAD}")
for item in data["list"]:
    fecha = item["dt_txt"].split(" ")[0]
    if fecha not in dias_mostrados:
        dias_mostrados.add(fecha)
        descripcion = item["weather"][0]["description"].lower()
        icono = ICONOS.get(descripcion, "🌍")  # Icono por defecto si no está en la lista
        tmin_c = item["main"]["temp_min"]
        tmax_c = item["main"]["temp_max"]
        tmin_f = (tmin_c * 9/5) + 32
        tmax_f = (tmax_c * 9/5) + 32
        pop = item.get("pop", 0) * 100
        fecha_fmt = datetime.strptime(fecha, "%Y-%m-%d").strftime("%a %d %b")

        # Consola
        print(f"{fecha_fmt}: {icono} {descripcion.capitalize()}, {tmin_c:.0f}°C-{tmax_c:.0f}°C "
              f"({tmin_f:.0f}°F-{tmax_f:.0f}°F), Lluvia: {pop:.0f}%")

        # TXT
        lineas_txt.append(
            f"{fecha_fmt}: {icono} {descripcion.capitalize()}, {tmin_c:.0f}°C-{tmax_c:.0f}°C "
            f"({tmin_f:.0f}°F-{tmax_f:.0f}°F), Lluvia: {pop:.0f}%"
        )

        # Markdown
        lineas_md.append(
            f"| {fecha_fmt} | {icono} {descripcion.capitalize()} | {tmin_c:.0f}°C-{tmax_c:.0f}°C "
            f"| {tmin_f:.0f}°F-{tmax_f:.0f}°F | {pop:.0f}% |\n"
        )

# Guardar en TXT
with open("pronostico_salida.txt", "w", encoding="utf-8") as f:
    f.write(f"Pronóstico 5 días — {CIUDAD}\n\n" + "\n".join(lineas_txt))

# Guardar en Markdown
with open("pronostico_salida.md", "w", encoding="utf-8") as f:
    f.writelines(lineas_md)

print("\n✅ Pronóstico guardado en 'pronostico_salida.txt' y 'pronostico_salida.md'")
