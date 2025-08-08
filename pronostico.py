import os, requests, datetime
from collections import defaultdict, Counter

API_KEY = os.getenv("OPENWEATHER_API_KEY") or ""
if not API_KEY:
    raise SystemExit("Falta OPENWEATHER_API_KEY en variables de entorno.")

LAT, LON = 18.2341, -66.0485  # Caguas, PR
URL = "https://api.openweathermap.org/data/2.5/forecast"
params = {"lat": LAT, "lon": LON, "appid": API_KEY, "units": "metric", "lang": "es"}

r = requests.get(URL, params=params, timeout=15)
r.raise_for_status()
data = r.json()["list"]  # cada 3 h

dias = defaultdict(list)
for it in data:
    key = datetime.datetime.fromtimestamp(it["dt"]).date()
    dias[key].append(it)

def pop(it): return int(round(it.get("pop", 0)*100))

rows = []
for fecha, items in list(dias.items())[:5]:
    tmins = [x["main"]["temp_min"] for x in items]
    tmaxs = [x["main"]["temp_max"] for x in items]
    pops  = [pop(x) for x in items]
    descs = [x["weather"][0]["description"] for x in items]

    tmin, tmax = round(min(tmins)), round(max(tmaxs))
    prob_lluvia = max(pops) if pops else 0
    desc = Counter(descs).most_common(1)[0][0].capitalize()

    alerta = ""
    if prob_lluvia >= 60: alerta += " ⚠️"
    if tmax >= 34: alerta += " 🔥"
    rows.append((fecha.strftime("%a %d %b"), desc, tmin, tmax, prob_lluvia, alerta))

# Consola
print("Pronóstico 5 días – Caguas, PR")
for d, desc, tmin, tmax, p, alert in rows:
    print(f"{d}: {desc}, {tmin}°C–{tmax}°C • Lluvia: {p}%{alert}")

# Guardar TXT y Markdown (tabla)
with open("pronostico.txt", "w", encoding="utf-8") as f:
    f.write("Pronóstico 5 días – Caguas, PR\n")
    for d, desc, tmin, tmax, p, alert in rows:
        f.write(f"{d}: {desc}, {tmin}°C–{tmax}°C • Lluvia: {p}%{alert}\n")

with open("pronostico.md", "w", encoding="utf-8") as f:
    f.write("| Día | Condición | Min | Max | Lluvia | Alertas |\n")
    f.write("|---|---|---:|---:|---:|:---:|\n")
    for d, desc, tmin, tmax, p, alert in rows:
        f.write(f"| {d} | {desc} | {tmin}°C | {tmax}°C | {p}% | {alert.strip()} |\n")
