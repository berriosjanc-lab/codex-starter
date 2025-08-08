import os, requests

API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not API_KEY:
    raise SystemExit("Falta la variable OPENWEATHER_API_KEY en el entorno.")

URL = "https://api.openweathermap.org/data/2.5/weather"
params = {
    "lat": 18.2341,  # Caguas, PR
    "lon": -66.0485,
    "appid": API_KEY,
    "units": "metric",
    "lang": "es",
}

try:
    r = requests.get(URL, params=params, timeout=10)
    r.raise_for_status()
    data = r.json()
    desc = data["weather"][0]["description"].capitalize()
    temp = round(data["main"]["temp"])
    sens = round(data["main"]["feels_like"])
    hum  = data["main"]["humidity"]
    print(f"Clima en Caguas: {desc}, {temp}°C (sensación {sens}°C, humedad {hum}%)")
except requests.RequestException as e:
    print("No se pudo obtener el clima:", e)
