import os, requests, datetime, statistics
from collections import defaultdict, Counter

API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not API_KEY:
    raise SystemExit("Falta OPENWEATHER_API_KEY en variables de entorno.")

LAT, LON = 18.2341, -66.0485  # Caguas, PR
URL = "https://api.openweathermap.org/data/2.5/forecast"
params = {"lat": LAT, "lon": LON, "appid": API_KEY, "units": "metric", "lang": "es"}

r = requests.get(URL, params=params, timeout=15)
r.raise_for_status()
data = r.json()["list"]  # 3 horas por item, 5 días

# Agrupar por día local
dias = defaultdict(list)
for item in data:
    ts = datetime.datetime.fromtimestamp(item["dt"])
    key = ts.date()
    dias[key].append(item)

def p_lluvia(it):
    # OpenWeather a veces trae 'pop' (probability of precipitation)
    return int(round(it.get("pop", 0) * 100))

salida = []
for fecha, items in list(dias.items())[:5]:  # próximos 5 días
    temps = [x["main"]["temp"] for x in items]
    tmins = [x["main"]["temp_min"] for x in items]
    tmaxs = [x["main"]["temp_max"] for x in items]
    pops  = [p_lluvia(x) for x in items]
    descs = [x["weather"][0]["description"] for x in items]

    desc_principal = Counter(descs).most_common(1)[0][0].capitalize()
    tmin = round(min(tmins))
    tmax = round(max(tmaxs))
    pop_dia = max(pops) if pops else 0
    salida.append((fecha.strftime("%a %d %b"), desc_principal, tmin, tmax, pop_dia))

# Mostrar bonito
print("Pronóstico 5 días – Caguas, PR")
for dia, desc, tmin, tmax, pop in salida:
    print(f"{dia}: {desc}, {tmin}°C–{tmax}°C  • Prob. lluvia: {pop}%")
