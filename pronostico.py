import requests

# === CONFIGURACIÓN ===
API_KEY = "ef0a06800e2efe129d8e688acf083343"
CIUDAD = "Caguas,PR"
URL = f"http://api.openweathermap.org/data/2.5/forecast?q={CIUDAD}&appid={API_KEY}&lang=es&units=metric"

# === FUNCIÓN PARA CONVERTIR °C A °F ===
def celsius_a_fahrenheit(c):
    return (c * 9/5) + 32

# === OBTENER DATOS DEL CLIMA ===
respuesta = requests.get(URL)
data = respuesta.json()

if "list" not in data:
    print("Error: No se recibieron datos válidos. Verifica tu API Key o la ciudad ingresada.")
else:
    print(f"\nPronóstico 5 días — {CIUDAD}\n")
    
    # Usaremos un set para mostrar solo un pronóstico por día
    dias_mostrados = set()

    for item in data["list"]:
        fecha = item["dt_txt"].split(" ")[0]
        
        if fecha not in dias_mostrados:
            dias_mostrados.add(fecha)
            
            descripcion = item["weather"][0]["description"].capitalize()
            temp_min_c = item["main"]["temp_min"]
            temp_max_c = item["main"]["temp_max"]
            temp_min_f = celsius_a_fahrenheit(temp_min_c)
            temp_max_f = celsius_a_fahrenheit(temp_max_c)
            prob_lluvia = item.get("pop", 0) * 100

            print(f"{fecha}: {descripcion}, "
                  f"{temp_min_c:.0f}°C-{temp_max_c:.0f}°C ({temp_min_f:.0f}°F-{temp_max_f:.0f}°F), "
                  f"Lluvia: {prob_lluvia:.0f}%")
