import requests
from datetime import datetime
from collections import defaultdict
from colorama import Fore, Back, Style, init
from tabulate import tabulate

init(autoreset=True)

API_KEY = "ef0a06800e2efe129d8e688acf083343"  # tu key
CIUDAD = "Caguas,PR"
URL = f"http://api.openweathermap.org/data/2.5/forecast?q={CIUDAD}&appid={API_KEY}&lang=es&units=metric"

ICONOS = {
    "cielo claro": "☀️", "algo de nubes": "⛅", "nubes dispersas": "🌤️",
    "muy nuboso": "☁️", "nubes": "☁️", "llovizna": "🌦️", "lluvia ligera": "🌦️",
    "lluvia": "🌧️", "tormenta": "⛈️", "nieve": "❄️", "niebla": "🌫️"
}
LLUVIA_ALERTA = 60   # %
CALOR_ALERTA  = 34.0 # °C

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
    hora = int(it["dt_txt"].split(" ")[1].split(":")[0])
    return abs(hora - 12)

elegidos = []
for fecha, items in sorted(por_dia.items()):
    elegido = sorted(items, key=score_hora)[0]
    elegidos.append((fecha, elegido))
    if len(elegidos) == 5:
        break

# --- Construir tabla con alertas ---
rows      = []
rows_md   = []
rows_txt  = []
headers   = ["Día", "Clima", "Temp °C", "Temp °F", "Lluvia"]

for fecha, it in elegidos:
    desc = it["weather"][0]["description"].lower()
    icono = ICONOS.get(desc, "🌍")
    tmin_c = round(it["main"]["temp_min"], 1)
    tmax_c = round(it["main"]["temp_max"], 1)
    tmin_f, tmax_f = c_to_f(tmin_c), c_to_f(tmax_c)
    pop = round(it.get("pop", 0) * 100)

    fecha_str = datetime.strftime(fecha, "%a %d %b")
    # Etiquetas con emojis para MD/TXT
    alerta_pop  = " ⚠️" if pop >= LLUVIA_ALERTA else ""
    alerta_cal  = " 🔥" if tmax_c >= CALOR_ALERTA else ""
    desc_show   = f"{icono} {desc.capitalize()}{alerta_pop}{alerta_cal}"

    # ---- Coloreado por alertas (solo consola) ----
    fecha_col = Fore.YELLOW + fecha_str + Style.RESET_ALL
    temp_c_txt = f"{tmin_c}–{tmax_c}°C"
    temp_f_txt = f"{tmin_f}–{tmax_f}°F"
    lluvia_txt = f"{pop}%"

    # colorear temp si hay calor extremo
    if tmax_c >= CALOR_ALERTA:
        temp_c_col = Back.RED + Fore.WHITE + temp_c_txt + Style.RESET_ALL
        temp_f_col = Back.RED + Fore.WHITE + temp_f_txt + Style.RESET_ALL
    else:
        temp_c_col = Fore.GREEN + temp_c_txt + Style.RESET_ALL
        temp_f_col = Fore.GREEN + temp_f_txt + Style.RESET_ALL

    # colorear lluvia si alta
    if pop >= LLUVIA_ALERTA:
        lluvia_col = Back.YELLOW + Fore.BLACK + lluvia_txt + Style.RESET_ALL
    else:
        lluvia_col = Fore.BLUE + lluvia_txt + Style.RESET_ALL

    rows.append([fecha_col, desc_show, temp_c_col, temp_f_col, lluvia_col])

    # Versiones planas para archivos
    rows_txt.append(
        f"{fecha_str}: {desc_show} | {temp_c_txt} ({temp_f_txt}) | Lluvia {lluvia_txt}"
    )
    rows_md.append([
        fecha_str, desc_show, temp_c_txt, temp_f_txt, lluvia_txt
    ])

# --- Imprimir tabla pro (con colores) ---
print(Fore.CYAN + f"\n📍 Pronóstico 5 días — {CIUDAD}\n" + Style.RESET_ALL)
print(tabulate(rows, headers=headers, tablefmt="fancy_grid"))

# --- Guardar TXT ---
with open("pronostico_salida.txt", "w", encoding="utf-8") as f:
    f.write(f"Pronóstico 5 días — {CIUDAD}\n\n")
    f.write("\n".join(rows_txt))

# --- Guardar Markdown (con emojis, sin colores) ---
with open("pronostico_salida.md", "w", encoding="utf-8") as f:
    f.write(f"# Pronóstico 5 días — {CIUDAD}\n\n")
    f.write(tabulate(rows_md, headers=headers, tablefmt="github"))
    f.write("\n")

print(Fore.MAGENTA + "\n✅ Guardado: pronostico_salida.txt y pronostico_salida.md\n")
