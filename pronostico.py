import requests
from datetime import datetime
from collections import defaultdict
from colorama import Fore, Style, init
from tabulate import tabulate

init(autoreset=True)

API_KEY = "ef0a06800e2efe129d8e688acf083343"  # tu key
CIUDAD = "Caguas,PR"
URL = f"http://api.openweathermap.org/data/2.5/forecast?q={CIUDAD}&appid={API_KEY}&lang=es&units=metric"

ICONOS = {
    "cielo claro": "☀️",
    "algo de nubes": "⛅",
    "nubes dispersas": "🌤️",
    "muy nuboso": "☁️",
    "nubes": "☁️",
    "llovizna": "🌦️",
    "lluvia ligera": "🌦️",
    "lluvia": "🌧️",
    "tormenta": "⛈️",
    "nieve": "❄️",
    "niebla": "🌫️",
}

def c_to_f(c): return round((c*9/5)+32, 1)

# --- Llamada a la API ---
resp = requests.get(URL, timeout=20)
data = resp.json()
if "list" not in data:
    print("❌ Error: revisa tu API Key o la ciudad.\nRespuesta:", data)
    raise SystemExit(1)

# --- Agrupar por día y elegir el pronóstico más cercano a las 12:00 ---
por_dia = defaultdict(list)
for it in data["list"]:
    dt = datetime.fromtimestamp(it["dt"])
    por_dia[dt.date()].append(it)

def score_hora(it):
    # preferimos medio día (12:00); menor diferencia gana
    hora = int(it["dt_txt"].split(" ")[1].split(":")[0])
    return abs(hora - 12)

elegidos = []
for fecha, items in sorted(por_dia.items()):
    elegido = sorted(items, key=score_hora)[0]
    elegidos.append((fecha, elegido))
    if len(elegidos) == 5:  # solo 5 días
        break

# --- Construir tabla ---
rows = []
rows_md = []
rows_txt = []

for fecha, it in elegidos:
    desc = it["weather"][0]["description"].lower()
    icono = ICONOS.get(desc, "🌍")
    tmin_c = round(it["main"]["temp_min"], 1)
    tmax_c = round(it["main"]["temp_max"], 1)
    tmin_f, tmax_f = c_to_f(tmin_c), c_to_f(tmax_c)
    pop = round(it.get("pop", 0) * 100)

    fecha_str = datetime.strftime(fecha, "%a %d %b")

    # Colores (opcional): fecha amarilla, temps verdes, lluvia azul
    fecha_col = Fore.YELLOW + fecha_str + Style.RESET_ALL
    clima_col = f"{icono} {desc.capitalize()}"
    temp_c_col = Fore.GREEN + f"{tmin_c}–{tmax_c}°C" + Style.RESET_ALL
    temp_f_col = Fore.GREEN + f"{tmin_f}–{tmax_f}°F" + Style.RESET_ALL
    lluvia_col = Fore.BLUE + f"{pop}%" + Style.RESET_ALL

    rows.append([fecha_col, clima_col, temp_c_col, temp_f_col, lluvia_col])

    # planas para guardar
    rows_txt.append(f"{fecha_str}: {icono} {desc.capitalize()} | {tmin_c}–{tmax_c}°C ({tmin_f}–{tmax_f}°F) | Lluvia {pop}%")
    rows_md.append([fecha_str, f"{icono} {desc.capitalize()}", f"{tmin_c}–{tmax_c}°C", f"{tmin_f}–{tmax_f}°F", f"{pop}%"])

# --- Imprimir tabla bonita ---
headers = ["Día", "Clima", "Temp °C", "Temp °F", "Lluvia"]
print(Fore.CYAN + f"\n📍 Pronóstico 5 días — {CIUDAD}\n" + Style.RESET_ALL)
print(tabulate(rows, headers=headers, tablefmt="fancy_grid"))

# --- Guardar TXT ---
with open("pronostico_salida.txt", "w", encoding="utf-8") as f:
    f.write(f"Pronóstico 5 días — {CIUDAD}\n\n")
    f.write("\n".join(rows_txt))

# --- Guardar Markdown ---
with open("pronostico_salida.md", "w", encoding="utf-8") as f:
    f.write(f"# Pronóstico 5 días — {CIUDAD}\n\n")
    f.write(tabulate(rows_md, headers=headers, tablefmt="github"))
    f.write("\n")

print(Fore.MAGENTA + "\n✅ Guardado: pronostico_salida.txt y pronostico_salida.md\n")
