import requests
from datetime import datetime
from colorama import Fore, Style, init

# Inicializar colorama
init(autoreset=True)

# 🔑 API Key de OpenWeather
API_KEY = "ef0a06800e2efe129d8e688acf083343"
CIUDAD = "Caguas,PR"
UNITS = "metric"  # métrico para °C

# 🌐 URL API
url = f"http://api.openweathermap.org/data/2.5/forecast?q={CIUDAD}&appid={API_KEY}&units={UNITS}&lang=es"

# 📥 Obtener datos
response = requests.get(url)
data = response.json()

# Iconos según condición
ICONOS = {
    "cielo claro": "☀️",
    "algo de nubes": "⛅",
    "nubes dispersas": "🌤️",
    "nubes": "☁️",
    "lluvia ligera": "🌦️",
    "lluvia": "🌧️",
    "tormenta": "⛈️",
    "nieve": "❄️",
    "niebla": "🌫️"
}

# Función para °C a °F
def c_to_f(celsius):
    return round((celsius * 9/5) + 32, 1)

# 📋 Procesar pronóstico
salida_txt = []
salida_md = ["# Pronóstico de 5 días — " + CIUDAD + "\n"]

print(Fore.CYAN + f"\n📍 Pronóstico de 5 días para {CIUDAD}\n" + Style.RESET_ALL)

# Filtrar un pronóstico por día (cada 24 horas)
dias_mostrados = set()
for item in data["list"]:
    fecha = datetime.fromtimestamp(item["dt"])
    dia = fecha.strftime("%a %d %b")
    
    if dia in dias_mostrados:
        continue
    dias_mostrados.add(dia)

    clima = item["weather"][0]["description"]
    temp_min_c = round(item["main"]["temp_min"], 1)
    temp_max_c = round(item["main"]["temp_max"], 1)
    temp_min_f = c_to_f(temp_min_c)
    temp_max_f = c_to_f(temp_max_c)
    lluvia = item.get("pop", 0) * 100

    icono = ICONOS.get(clima.lower(), "🌍")

    linea = (
        f"{Fore.YELLOW}{dia}{Style.RESET_ALL} {icono} | "
        f"{Fore.CYAN}{clima.capitalize()}{Style.RESET_ALL} | "
        f"{Fore.GREEN}{temp_min_c}°C/{temp_min_f}°F - {temp_max_c}°C/{temp_max_f}°F{Style.RESET_ALL} | "
        f"{Fore.BLUE}Prob. lluvia: {lluvia:.0f}%{Style.RESET_ALL}"
    )

    print(linea)

    salida_txt.append(f"{dia} {icono} | {clima.capitalize()} | {temp_min_c}°C/{temp_min_f}°F - {temp_max_c}°C/{temp_max_f}°F | Lluvia: {lluvia:.0f}%")
    salida_md.append(f"- **{dia}** {icono} | {clima.capitalize()} | {temp_min_c}°C/{temp_min_f}°F - {temp_max_c}°C/{temp_max_f}°F | 🌧️ {lluvia:.0f}%")

# 💾 Guardar archivos
with open("pronostico_salida.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(salida_txt))

with open("pronostico_salida.md", "w", encoding="utf-8") as f:
    f.write("\n".join(salida_md))

print(Fore.MAGENTA + "\n✅ Pronóstico guardado en 'pronostico_salida.txt' y 'pronostico_salida.md'\n")
